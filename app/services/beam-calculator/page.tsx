'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, Ruler, Zap, Wrench, ChevronDown, Calculator, ExternalLink, ArrowRight } from 'lucide-react'
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from 'chart.js'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend)

// Material properties (Young's Modulus in GPa, Yield in MPa)
const MATERIALS = {
  Steel: { E: 200e9, yield: 250e6 },
  Concrete: { E: 30e9, yield: 40e6 },
  Wood: { E: 11e9, yield: 35e6 }
} as const

type MaterialKey = keyof typeof MATERIALS

type SupportType = 'Simply Supported' | 'Cantilever' | 'Fixed Both Ends'

type LoadType = 'Point Load' | 'Uniform Distributed Load'

interface BeamInputs {
  length: number // meters
  material: MaterialKey
  sectionShape: 'Rectangular' | 'Circular'
  width: number // m (rect)
  height: number // m (rect)
  diameter: number // m (circular)
  loadType: LoadType
  loadValue: number // kN or kN/m
  loadPosition: number // m from left (for point)
  support: SupportType
  unitSystem: 'metric' | 'imperial'
  loadFactor: number // ultimate load multiplier
  deflectionLimit: number // denominator for L/limit serviceability
}

const defaultInputs: BeamInputs = {
  length: 6,
  material: 'Steel',
  sectionShape: 'Rectangular',
  width: 0.25,
  height: 0.4,
  diameter: 0.3,
  loadType: 'Point Load',
  loadValue: 50,
  loadPosition: 3,
  support: 'Simply Supported',
  unitSystem: 'metric',
  loadFactor: 1.0,
  deflectionLimit: 360
}

function toImperialMeters(m: number) { return m * 3.28084 }
function fromImperialFeet(ft: number) { return ft / 3.28084 }

function calcMomentOfInertia(inputs: BeamInputs) {
  if (inputs.sectionShape === 'Rectangular') {
    return (inputs.width * Math.pow(inputs.height, 3)) / 12 // m^4
  }
  // Circular
  return Math.PI * Math.pow(inputs.diameter, 4) / 64
}

interface CalcWarning { code: string; message: string; severity: 'info' | 'warn' | 'error' }
interface Results {
  deflectionMax: number // absolute (m)
  shearMax: number
  momentMax: number
  safetyFactor: number
  deflectionRatio: number
  serviceabilityPass: boolean
  utilizationFlexure: number
  utilizationDeflection: number
  warnings: CalcWarning[]
}

function computeResults(i: BeamInputs): Results | null {
  if (i.length <= 0 || i.loadValue <= 0) return null
  const warnings: CalcWarning[] = []
  const E = MATERIALS[i.material].E
  const yieldStress = MATERIALS[i.material].yield
  const I = calcMomentOfInertia(i)
  if (I <= 0) {
    warnings.push({ code:'I_ZERO', message:'Section moment of inertia must be > 0.', severity:'error' })
    return { deflectionMax:0, shearMax:0, momentMax:0, safetyFactor:0, deflectionRatio:Infinity, serviceabilityPass:true, utilizationFlexure:0, utilizationDeflection:0, warnings }
  }
  const L = i.length
  const loadFactor = i.loadFactor || 1
  const baseVal = i.loadValue * 1000
  const P = baseVal * (i.loadType==='Point Load'? loadFactor:1)
  const w = baseVal * (i.loadType==='Uniform Distributed Load'? loadFactor:1)

  let deflectionMax = 0
  let shearMax = 0
  let momentMax = 0

  const unsupportedFixedPoint = i.support === 'Fixed Both Ends' && i.loadType === 'Point Load'
  if (unsupportedFixedPoint) {
    warnings.push({ code:'UNSUPPORTED', message:'Fixed both ends + point load not implemented. Switch load/support or use UDL.', severity:'error' })
  } else if (i.support === 'Simply Supported') {
    if (i.loadType === 'Point Load') {
      const a = clamp(i.loadPosition,0,L)
      if (a !== i.loadPosition) warnings.push({ code:'POS_CLAMP', message:'Load position clamped inside span.', severity:'warn' })
      const b = L - a
      deflectionMax = (P * a * b * (L*L - a * b)) / (3 * E * I * L)
      shearMax = P * Math.max(a,b)/L
      momentMax = P * a * b / L
    } else {
      deflectionMax = (5 * w * Math.pow(L,4)) / (384 * E * I)
      shearMax = w * L / 2
      momentMax = w * Math.pow(L,2) / 8
    }
  } else if (i.support === 'Cantilever') {
    if (i.loadType === 'Point Load') {
      // assume free-end if near end else approximate
      const a = clamp(i.loadPosition,0,L)
      if (Math.abs(a - L) > 1e-6) warnings.push({ code:'POINT_OFFSET', message:'Cantilever point load assumed at free end for formula.', severity:'info' })
      deflectionMax = P * Math.pow(L,3) / (3 * E * I)
      shearMax = P
      momentMax = P * L
    } else {
      deflectionMax = w * Math.pow(L,4) / (8 * E * I)
      shearMax = w * L
      momentMax = w * Math.pow(L,2) / 2
    }
  } else if (i.support === 'Fixed Both Ends') {
    // Only UDL implemented here
    if (i.loadType === 'Uniform Distributed Load') {
      deflectionMax = (w * Math.pow(L,4)) / (384 * E * I)
      shearMax = w * L / 2
      momentMax = w * Math.pow(L,2) / 12
    }
  }

  // Section modulus Z
  let Z: number
  if (i.sectionShape === 'Rectangular') {
    if (i.width <=0 || i.height <=0) warnings.push({ code:'SECTION_DIM', message:'Width/height must be > 0.', severity:'error' })
    Z = (i.width * Math.pow(i.height,2)) / 6
  } else {
    if (i.diameter <=0) warnings.push({ code:'SECTION_DIM', message:'Diameter must be > 0.', severity:'error' })
    Z = Math.PI * Math.pow(i.diameter,3) / 32
  }
  let bendingStress = 0
  if (Z > 0) bendingStress = momentMax / Z
  else warnings.push({ code:'Z_ZERO', message:'Section modulus invalid (check dimensions).', severity:'error' })

  const safetyFactor = bendingStress>0 ? yieldStress / bendingStress : 0
  if (safetyFactor === 0) warnings.push({ code:'SF_ZERO', message:'Safety factor could not be evaluated.', severity:'warn' })

  const deflectionRatio = deflectionMax>0 ? L / deflectionMax : Infinity
  const serviceabilityPass = deflectionMax>0 ? (L/deflectionMax) >= i.deflectionLimit : true
  const utilizationFlexure = bendingStress>0? bendingStress / yieldStress : 0
  const utilizationDeflection = deflectionMax>0 ? (deflectionMax / (L / i.deflectionLimit)) : 0

  if ((i.loadType==='Point Load'?P:w)*Math.pow(L,4) > 1e16) warnings.push({ code:'NUM_SCALE', message:'Large load/span may reduce numerical accuracy.', severity:'info' })

  return { deflectionMax: Math.abs(deflectionMax), shearMax: Math.abs(shearMax), momentMax: Math.abs(momentMax), safetyFactor, deflectionRatio, serviceabilityPass, utilizationFlexure, utilizationDeflection, warnings }
}

function clamp(v:number,min:number,max:number){ return Math.min(max, Math.max(min,v)) }

export default function BeamCalculatorPage() {
  const [inputs, setInputs] = useState<BeamInputs>(defaultInputs)
  const [results, setResults] = useState<Results | null>(null)
  const [loading, setLoading] = useState(false) // retained (not currently used extensively)
  const [step, setStep] = useState(1) // 1: Span, 2: Section, 3: Loading, 4: Results
  const [processing, setProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [autoFromShare, setAutoFromShare] = useState(false)
  const [sharedNotice, setSharedNotice] = useState('')
  const prevStepRef = useRef(step)
  const chartRef = useRef<HTMLCanvasElement | null>(null)
  const chartRefMoment = useRef<HTMLCanvasElement | null>(null)
  const chartRefDeflect = useRef<HTMLCanvasElement | null>(null)
  const charts = useRef<Chart[]>([])
  const searchParams = useSearchParams()
  const router = useRouter()

  // Scenario management
  interface Scenario { name: string; inputs: BeamInputs }
  const [scenarios, setScenarios] = useState<Scenario[]>([])
  const [scenarioName, setScenarioName] = useState('')
  const [shareCopied, setShareCopied] = useState(false)
  const shareTimerRef = useRef<NodeJS.Timeout | null>(null)
  const ariaMsgRef = useRef<string>('')
  const [, setAriaTick] = useState(0) // force rerender for aria live updates

  // Load from share URL (s param) or last inputs
  useEffect(() => {
    try {
      const s = searchParams?.get('s')
      if (s) {
        const decoded = JSON.parse(atob(s)) as Partial<BeamInputs>
        setInputs(prev => ({ ...prev, ...decoded }))
        setAutoFromShare(true)
        setSharedNotice('Shared scenario loaded. Running analysis…')
        setStep(4) // jump directly to results and trigger processing
        router.replace('/services/beam-calculator') // clean URL
      } else {
        const lastRaw = localStorage.getItem('beamCalc:last')
        if (lastRaw) {
          const parsed = JSON.parse(lastRaw)
          setInputs(prev => ({ ...prev, ...parsed }))
        }
      }
    } catch { /* ignore decode errors */ }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Persist last inputs
  useEffect(() => {
    try { localStorage.setItem('beamCalc:last', JSON.stringify(inputs)) } catch {}
  }, [inputs])

  // Load scenarios list
  useEffect(() => {
    try {
      const raw = localStorage.getItem('beamCalc:scenarios')
      if (raw) setScenarios(JSON.parse(raw))
    } catch {}
  }, [])

  const persistScenarios = (next: Scenario[]) => {
    setScenarios(next)
    try { localStorage.setItem('beamCalc:scenarios', JSON.stringify(next)) } catch {}
  }

  const saveScenario = () => {
    if (!scenarioName.trim()) return
    const existingIndex = scenarios.findIndex(s => s.name.toLowerCase() === scenarioName.trim().toLowerCase())
    const nextScenario: Scenario = { name: scenarioName.trim(), inputs }
    let next = [...scenarios]
    if (existingIndex >= 0) next[existingIndex] = nextScenario
    else next.push(nextScenario)
    persistScenarios(next)
    setScenarioName('')
    ariaAnnounce('Scenario saved')
  }

  const loadScenario = (name: string) => {
    const sc = scenarios.find(s => s.name === name)
    if (sc) { setInputs(sc.inputs); ariaAnnounce(`Scenario ${name} loaded`) }
  }

  const deleteScenario = (name: string) => {
    const next = scenarios.filter(s => s.name !== name)
    persistScenarios(next)
    ariaAnnounce(`Scenario ${name} deleted`)
  }

  // Share link builder
  const buildShareLink = () => {
    try {
      const json = JSON.stringify(inputs)
      const encoded = btoa(json)
      return `${window.location.origin}/services/beam-calculator?s=${encodeURIComponent(encoded)}`
    } catch { return window.location.href }
  }

  const copyShareLink = () => {
    const link = buildShareLink()
    navigator.clipboard.writeText(link).then(() => {
      setShareCopied(true)
      ariaAnnounce('Share link copied')
      if (shareTimerRef.current) clearTimeout(shareTimerRef.current)
      shareTimerRef.current = setTimeout(()=> setShareCopied(false), 2200)
    })
  }

  // Keyboard navigation for steps
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') { if (step < 4) { e.preventDefault(); goNext() } }
      if (e.key === 'ArrowLeft') { if (step > 1) { e.preventDefault(); goPrev() } }
      if (e.key === 'Enter' && (document.activeElement?.tagName !== 'TEXTAREA')) {
        if (step < 4) { e.preventDefault(); goNext() }
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [step])

  // Aria live announcements
  const ariaAnnounce = (msg: string) => {
    ariaMsgRef.current = msg
    setAriaTick(t=>t+1)
  }

  // Processing animation when entering results step or when recalculating
  useEffect(() => {
    if (step === 4) {
      setProcessing(true)
      setProgress(0)
      const start = performance.now()
      const animate = (t: number) => {
        const elapsed = t - start
        const pct = Math.min(100, elapsed / 900 * 100)
        setProgress(pct)
        if (pct < 100) requestAnimationFrame(animate)
      }
      requestAnimationFrame(animate)
      const timer = setTimeout(() => {
        const r = computeResults(inputs)
        setResults(r)
        setProcessing(false)
        if (autoFromShare) setSharedNotice('Shared scenario analysis complete.')
        ariaAnnounce('Calculation completed')
      }, 950)
      return () => clearTimeout(timer)
    } else {
      setSharedNotice('')
    }
  }, [step, inputs, autoFromShare])

  const numericHandler = (field: keyof BeamInputs) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    const value = parseFloat(raw)
    setInputs(prev => {
      if (raw === '') return { ...prev } // ignore empty to avoid flicker 0
      let next: BeamInputs = { ...prev, [field]: isNaN(value) ? prev[field] as any : value }
      // Clamp load position if length changed shorter
      if (field === 'length' && next.loadPosition > next.length) {
        next.loadPosition = parseFloat((next.length / 2).toFixed(2))
      }
      if (field === 'loadPosition' && next.loadPosition > next.length) {
        next.loadPosition = next.length
      }
      return next
    })
  }

  const updateField = (field: keyof BeamInputs) => (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const value = e.target.value as any
    setInputs(prev => ({ ...prev, [field]: value }))
  }

  const toggleUnits = () => {
    setInputs(prev => {
      if (prev.unitSystem === 'metric') {
        return { ...prev, unitSystem: 'imperial', length: toImperialMeters(prev.length), width: toImperialMeters(prev.width), height: toImperialMeters(prev.height), diameter: toImperialMeters(prev.diameter), loadValue: prev.loadType === 'Point Load' ? prev.loadValue : prev.loadValue } // keep load numeric (not converting for simplicity)
      }
      return { ...prev, unitSystem: 'metric', length: fromImperialFeet(prev.length), width: fromImperialFeet(prev.width), height: fromImperialFeet(prev.height), diameter: fromImperialFeet(prev.diameter) }
    })
  }

  // Step validation logic
  const [stepErrors, setStepErrors] = useState<string[]>([])

  const validateStep = (s:number): boolean => {
    const errs: string[] = []
    if (s === 1) {
      if (!(inputs.length > 0)) errs.push('Beam length must be > 0')
      if (!inputs.support) errs.push('Select a support type')
    }
    if (s === 2) {
      if (inputs.sectionShape === 'Rectangular') {
        if (!(inputs.width>0)) errs.push('Width must be > 0')
        if (!(inputs.height>0)) errs.push('Height must be > 0')
      } else {
        if (!(inputs.diameter>0)) errs.push('Diameter must be > 0')
      }
    }
    if (s === 3) {
      if (!(inputs.loadValue>0)) errs.push('Load value must be > 0')
      if (inputs.loadType === 'Point Load') {
        if (inputs.loadPosition < 0 || inputs.loadPosition > inputs.length) errs.push('Point load position must be inside span')
      }
      if (showAdvanced) {
        if (!(inputs.loadFactor>0)) errs.push('Load factor must be > 0')
        if (!(inputs.deflectionLimit>0)) errs.push('Deflection limit must be > 0')
      }
    }
    setStepErrors(errs)
    return errs.length === 0
  }

  const goNext = () => setStep(s => {
    const valid = validateStep(s)
    if (!valid) return s
    return Math.min(4, s + 1)
  })
  const goPrev = () => setStep(s => Math.max(1, s - 1))

  // Track previous step for splash animation
  useEffect(() => { prevStepRef.current = step }, [step])

  const steps = [
    { id: 1, title: 'Span & Support', desc: 'Beam length, units & support conditions' },
    { id: 2, title: 'Section & Material', desc: 'Geometry and material properties' },
    { id: 3, title: 'Loading', desc: 'Define load magnitude & position' },
    { id: 4, title: 'Results', desc: 'Review analysis & export report' }
  ]

  // Prepare diagram data
  const diagramData = useMemo(() => {
    const points = 40
    const xs = Array.from({ length: points + 1 }, (_, i) => (inputs.length * i) / points)
    let shear: number[] = []
    let moment: number[] = []
    let deflect: number[] = []
    const E = MATERIALS[inputs.material].E
    const I = calcMomentOfInertia(inputs)
    const L = inputs.length
    const P = inputs.loadValue * 1000
    const w = inputs.loadValue * 1000

    xs.forEach(x => {
      let V=0, M=0, y=0
      if (inputs.support === 'Simply Supported') {
        if (inputs.loadType === 'Point Load') {
          const a = inputs.loadPosition
          const b = L - a
          const R1 = P * b / L
          const R2 = P * a / L
          V = x < a ? R1 : R1 - P
          M = x < a ? R1 * x : R1 * x - P * (x - a)
          // deflection using piecewise formula central approximation (simplified)
          y = (P * a * (Math.pow(L,2) - a * a - x * x)) / (6 * E * I * L) // rough simplified demonstration
        } else {
          const wtot = w * L
          V = wtot/2 - w * x
          M = (wtot * x)/2 - (w * x * x)/2
          y = (5 * w * Math.pow(L,4))/(384 * E * I) * ( ( (x/L) * (1 - x/L) ) ) // scaled shape
        }
      } else if (inputs.support === 'Cantilever') {
        if (inputs.loadType === 'Point Load') {
          V = P
          M = P * (L - x)
          y = P * Math.pow(x,2) * (3*L - x)/(6*E*I)
        } else {
          V = w * (L - x)
            M = w * (Math.pow(L,2)/2 - Math.pow(x,2)/2)
          y = w * Math.pow(x,2) * (6*L*L - 4*L*x + x*x)/(24*E*I)
        }
      } else { // Fixed Both Ends (simplified distributions)
        if (inputs.loadType === 'Point Load') {
          V = P/2 - (x > L/2 ? P/2 : 0)
          M = P * L / 8 - (P * Math.abs(x - L/2))/2
          y = (P * Math.pow(L,3))/(192 * E * I) * (1 - Math.pow((2*x/L -1),2)) // parabolic shape
        } else {
          V = (w*L/2) - w * x
          M = w * ( (L*x)/2 - (x*x)/2 ) - (w*L*L)/12
          y = (w * Math.pow(L,4))/(384 * E * I) * (1 - Math.pow((2*x/L -1),2))
        }
      }
      shear.push(V/1000) // kN
      moment.push(M/1000) // kN*m
      deflect.push(y*1000) // mm
    })
    return { xs, shear, moment, deflect }
  }, [inputs])

  // Render charts only after processing completes & results ready
  useEffect(() => {
    const createChart = (ctx: CanvasRenderingContext2D, label: string, data: number[], color: string) => new Chart(ctx, {
      type: 'line',
      data: { labels: diagramData.xs.map(x => x.toFixed(2)), datasets: [{ label, data, borderColor: color, tension: 0.25, pointRadius: 0, borderWidth: 2 }] },
      options: { responsive: true, animation: { duration: 550, easing: 'easeOutQuart' }, plugins: { legend: { display: true } }, scales: { x: { ticks: { maxTicksLimit: 6 } } } }
    })
    if (step !== 4 || processing || !results || results.warnings.some(w=>w.severity==='error')) return
    charts.current.forEach(c => c.destroy())
    charts.current = []
    if (chartRef.current) charts.current.push(createChart(chartRef.current.getContext('2d')!, 'Shear (kN)', diagramData.shear, '#0d6efd'))
    if (chartRefMoment.current) charts.current.push(createChart(chartRefMoment.current.getContext('2d')!, 'Moment (kN·m)', diagramData.moment, '#6610f2'))
    if (chartRefDeflect.current) charts.current.push(createChart(chartRefDeflect.current.getContext('2d')!, 'Deflection (mm)', diagramData.deflect, '#198754'))
  }, [diagramData, step, processing, results])

  const handleExportPDF = async () => {
    const pdf = new jsPDF('p','pt','a4')
    pdf.setFontSize(18)
    pdf.text('Beam Deflection & Load Report', 40, 40)
    pdf.setFontSize(12)
    pdf.text(`Material: ${inputs.material} | Support: ${inputs.support} | Load: ${inputs.loadType}`, 40, 65)
    if (results) {
      pdf.text(`Max Deflection: ${results.deflectionMax.toExponential(3)} m`, 40, 85)
      pdf.text(`Max Shear: ${(results.shearMax/1000).toFixed(2)} kN`, 40, 100)
      pdf.text(`Max Moment: ${(results.momentMax/1000).toFixed(2)} kN·m`, 40, 115)
      pdf.text(`Safety Factor: ${results.safetyFactor.toFixed(2)}`, 40, 130)
      pdf.text(`Deflection Ratio L/${results.deflectionRatio.toFixed(0)} (Limit L/${inputs.deflectionLimit})`, 40, 145)
      if (results.warnings.length) {
        pdf.text('Warnings:', 40, 170)
        let y = 185
        results.warnings.slice(0,10).forEach(w => {
          pdf.text(`[${w.severity.toUpperCase()}] ${w.message.substring(0,90)}`, 50, y)
          y += 14
          if (y > 760) { pdf.addPage(); y = 60 }
        })
      }
    }
    // capture charts sequentially
    const chartCanvases = [chartRef.current, chartRefMoment.current, chartRefDeflect.current]
    let y = 160
    if (results?.warnings.length) y = 320 // shift down if warnings printed
    for (const c of chartCanvases) {
      if (!c) continue
      const canvasImg = c.toDataURL('image/png', 1.0)
      pdf.addImage(canvasImg, 'PNG', 40, y, 520, 150)
      y += 170
      if (y > 700) { pdf.addPage(); y = 60 }
    }
    pdf.save('beam-report.pdf')
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 4) {
      if (validateStep(step)) goNext()
      return
    }
    // Recalculate with processing feel
    if (!validateStep(3)) { setStep(3); return }
    setProcessing(true)
    setProgress(0)
    const start = performance.now()
    const animate = (t: number) => {
      const elapsed = t - start
      const pct = Math.min(100, elapsed / 900 * 100)
      setProgress(pct)
      if (pct < 100) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
    setTimeout(() => {
  setResults(computeResults(inputs))
      setProcessing(false)
    }, 950)
  }

  const unit = inputs.unitSystem === 'metric' ? 'm' : 'ft'

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative h-[320px] md:h-[420px] w-full overflow-hidden">
        <Image src="https://source.unsplash.com/random/1920x500/?beam-engineering" alt="Beam engineering" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="hero-heading mb-4 leading-tight heading-accent"><span className="gradient-text">Beam</span> Deflection & Load Calculator</h1>
          <p className="max-w-2xl text-sm md:text-lg text-gray-200 leading-relaxed">Quickly analyze beam performance with inputs for load, material, and supports. Get deflection, shear, moment, and safety factor results with visual diagrams.</p>
        </motion.div>
      </div>

      <div className="section-padding pb-24 container-custom">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Wizard */}
          <motion.form onSubmit={onSubmit} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full lg:w-1/3 bg-white rounded-2xl shadow-xl ring-1 ring-gray-100 p-6 space-y-6 sticky top-24 self-start h-fit">
            {/* Step indicator */}
            {/* Overall linear progress (mobile/desktop) */}
            <div className="w-full h-1 rounded-full bg-gray-100 overflow-hidden mb-4 relative">
              <div className="h-full bg-gradient-to-r from-primary via-secondary to-primary transition-all duration-500" style={{ width: `${((step-1)/(steps.length-1))*100}%` }} />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_50%,rgba(59,130,246,0.15),transparent_70%)] pointer-events-none" />
            </div>
            <ol className="flex lg:block items-center justify-between lg:space-y-3 text-xs relative" aria-label="Beam calculator steps">
              {steps.map(s => {
                const state = s.id === step ? 'current' : s.id < step ? 'complete' : 'upcoming'
                return (
                  <li key={s.id} className="flex-1 lg:flex-none">
                    <button type="button" onClick={() => s.id < step && setStep(s.id)} aria-current={s.id===step? 'step':undefined} className={`group flex items-center gap-2 w-full py-2 pr-2 lg:p-0 ${state!=='upcoming'?'cursor-pointer':'cursor-default'}`}> 
                      <span className={`relative flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-semibold ring-2 transition-all duration-300 ${state==='current'?'bg-primary text-white ring-primary shadow-md scale-110': state==='complete'?'bg-gradient-to-br from-primary/10 to-secondary/10 text-primary ring-primary/40':'bg-gray-100 text-gray-500 ring-gray-300'} `}>
                        <span className="relative z-10">{s.id}</span>
                        {state==='complete' && <span className="absolute inset-0 rounded-full bg-primary/30 animate-pulse-fast" aria-hidden="true" />}
                        {state==='complete' && <span className="absolute inset-0 rounded-full border-2 border-primary/40 animate-splash-ring" aria-hidden="true" />}
                      </span>
                      {s.id < 4 && <ArrowRight className="hidden lg:block h-4 w-4 text-gray-300 group-hover:text-primary transition" />}
                      <span className="hidden lg:flex flex-col text-left">
                        <span className={`font-medium tracking-tight ${state==='current'?'text-gray-800':'text-gray-600'}`}>{s.title}</span>
                        <span className="text-[10px] text-gray-500 font-normal leading-tight">{s.desc}</span>
                      </span>
                    </button>
                  </li>
                )
              })}
            </ol>
            {/* Scenario manager */}
            <div className="space-y-2 rounded-md bg-gray-50 border border-gray-200 p-3">
              <div className="flex items-center justify-between gap-2">
                <input value={scenarioName} onChange={e=>setScenarioName(e.target.value)} placeholder="Scenario name" className="flex-1 px-2 py-1.5 rounded border border-gray-300 bg-white text-[11px] focus:ring-2 focus:ring-primary focus:border-transparent" />
                <button type="button" onClick={saveScenario} className="px-3 py-1.5 rounded bg-primary text-white text-[11px] font-medium hover:shadow disabled:opacity-50" disabled={!scenarioName.trim()}>Save</button>
              </div>
              {scenarios.length>0 && (
                <div className="flex items-center gap-2">
                  <select onChange={e=> e.target.value && loadScenario(e.target.value)} className="flex-1 px-2 py-1.5 rounded border border-gray-300 bg-white text-[11px]">
                    <option value="">Load scenario…</option>
                    {scenarios.map(s=> <option key={s.name}>{s.name}</option>)}
                  </select>
                  <button type="button" onClick={()=> { const name = prompt('Delete which scenario? (exact name)') ; if (name) deleteScenario(name) }} className="px-2 py-1.5 rounded bg-gray-200 text-gray-700 text-[11px] font-medium hover:bg-gray-300">Del</button>
                </div>
              )}
              <div className="flex gap-2">
                <button type="button" onClick={copyShareLink} className="flex-1 text-[11px] px-2 py-1.5 rounded bg-gradient-to-r from-secondary/20 to-primary/20 text-gray-700 font-medium hover:from-secondary/30 hover:to-primary/30">{shareCopied? 'Link Copied' : 'Copy Share Link'}</button>
                <button type="button" onClick={()=> { setInputs(defaultInputs); ariaAnnounce('Inputs reset')}} className="px-2 py-1.5 rounded bg-gray-100 text-gray-600 text-[11px] hover:bg-gray-200">Reset</button>
              </div>
            </div>
            {step === 4 && (
              <div className="lg:hidden text-[11px] font-medium text-green-700 bg-green-50 border border-green-200 rounded-md px-3 py-2 -mt-1">All steps complete. Scroll to view graphs & export analysis below.</div>
            )}
            {step < 4 && (
              <div className="lg:hidden text-[11px] font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-md px-3 py-2 -mt-1">
                Complete steps 1–3 to view calculated results. Current step: <span className="text-primary">{steps.find(s=>s.id===step)?.title}</span>
              </div>
            )}

            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent lg:hidden" />

            {/* Step content with animated transitions */}
            <div className="relative min-h-[250px]">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div key="step1" initial={{opacity:0, x:-25}} animate={{opacity:1, x:0}} exit={{opacity:0, x:25}} transition={{duration:0.35, ease:'easeOut'}} className="space-y-4 absolute inset-0">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2"><Ruler className="h-5 w-5 text-primary" /> Span & Support</h2>
                  <button type="button" onClick={toggleUnits} className="text-xs px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition">{inputs.unitSystem === 'metric' ? 'Use Imperial' : 'Use Metric'}</button>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Beam Length ({unit})</label>
                  <input type="number" step="0.01" min={0.01} value={inputs.length} onChange={numericHandler('length')} className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent text-sm" required />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Support Type</label>
                  <select value={inputs.support} onChange={updateField('support')} className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent text-sm">
                    <option>Simply Supported</option>
                    <option>Cantilever</option>
                    <option>Fixed Both Ends</option>
                  </select>
                </div>
                  </motion.div>
                )}
                {step === 2 && (
                  <motion.div key="step2" initial={{opacity:0, x:-25}} animate={{opacity:1, x:0}} exit={{opacity:0, x:25}} transition={{duration:0.35, ease:'easeOut'}} className="space-y-4 absolute inset-0">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2"><Wrench className="h-5 w-5 text-primary" /> Section & Material</h2>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Material</label>
                  <select value={inputs.material} onChange={updateField('material')} className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent text-sm">
                    {Object.keys(MATERIALS).map(m => <option key={m}>{m}</option>)}
                  </select>
                </div>
                <div className="flex gap-2 text-xs">
                  <button type="button" onClick={() => setInputs(p => ({ ...p, sectionShape: 'Rectangular' }))} className={`flex-1 px-3 py-2 rounded-md border ${inputs.sectionShape==='Rectangular'?'bg-primary text-white border-primary':'border-gray-300 bg-gray-50 text-gray-700'} transition`}>Rectangular</button>
                  <button type="button" onClick={() => setInputs(p => ({ ...p, sectionShape: 'Circular' }))} className={`flex-1 px-3 py-2 rounded-md border ${inputs.sectionShape==='Circular'?'bg-primary text-white border-primary':'border-gray-300 bg-gray-50 text-gray-700'} transition`}>Circular</button>
                </div>
                {inputs.sectionShape === 'Rectangular' ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Width ({unit})</label>
                      <input type="number" step="0.01" min={0.001} value={inputs.width} onChange={numericHandler('width')} className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Height ({unit})</label>
                      <input type="number" step="0.01" min={0.001} value={inputs.height} onChange={numericHandler('height')} className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent text-sm" />
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Diameter ({unit})</label>
                    <input type="number" step="0.01" min={0.001} value={inputs.diameter} onChange={numericHandler('diameter')} className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent text-sm" />
                  </div>
                )}
                  </motion.div>
                )}
                {step === 3 && (
                  <motion.div key="step3" initial={{opacity:0, x:-25}} animate={{opacity:1, x:0}} exit={{opacity:0, x:25}} transition={{duration:0.35, ease:'easeOut'}} className="space-y-4 absolute inset-0">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2"><Zap className="h-5 w-5 text-primary" /> Loading</h2>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Load Type</label>
                  <select value={inputs.loadType} onChange={updateField('loadType')} className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent text-sm">
                    <option>Point Load</option>
                    <option>Uniform Distributed Load</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">{inputs.loadType==='Point Load' ? 'Load (kN)' : 'Load (kN/m)'}</label>
                  <input type="number" step="0.1" min={0.01} value={inputs.loadValue} onChange={numericHandler('loadValue')} className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent text-sm" />
                </div>
                {inputs.loadType === 'Point Load' && (
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Load Position ({unit})</label>
                    <input type="number" step="0.01" min={0} max={inputs.length} value={inputs.loadPosition} onChange={numericHandler('loadPosition')} className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent text-sm" />
                    <p className="text-[10px] text-gray-500 mt-1">0 – {inputs.length.toFixed(2)} {unit}</p>
                  </div>
                )}
                <div className="pt-2">
                  <button type="button" onClick={() => setShowAdvanced(a=>!a)} className="text-xs font-medium text-primary hover:text-blue-700 transition underline decoration-dotted">
                    {showAdvanced ? 'Hide' : 'Show'} Optional Advanced Settings
                  </button>
                  {showAdvanced && (
                    <div className="mt-3 space-y-3 p-3 rounded-md bg-gradient-to-r from-primary/5 to-secondary/5 ring-1 ring-gray-200">
                      <div>
                        <label className="block text-[11px] font-medium text-gray-700 mb-1">Load Factor (φ)</label>
                        <input type="number" step="0.05" min={0.5} max={2.5} value={inputs.loadFactor} onChange={numericHandler('loadFactor')} className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent text-xs" />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-gray-700 mb-1">Deflection Limit (L/x)</label>
                        <input type="number" step="10" min={60} max={1000} value={inputs.deflectionLimit} onChange={numericHandler('deflectionLimit')} className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent text-xs" />
                        <p className="text-[10px] text-gray-500 mt-1">Serviceability check compares actual against L/{inputs.deflectionLimit}</p>
                      </div>
                    </div>
                  )}
                </div>
                  </motion.div>
                )}
                {step === 4 && (
                  <motion.div key="step4" initial={{opacity:0, x:-25}} animate={{opacity:1, x:0}} exit={{opacity:0, x:25}} transition={{duration:0.4, ease:'easeOut'}} className="space-y-5 absolute inset-0">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2"><Calculator className="h-5 w-5 text-primary" /> Results & Export</h2>
                <div className="text-xs grid grid-cols-2 gap-3 p-3 rounded-lg bg-gray-50">
                  <div><span className="font-medium text-gray-700">L:</span> {inputs.length.toFixed(2)} {unit}</div>
                  <div><span className="font-medium text-gray-700">Support:</span> {inputs.support}</div>
                  <div><span className="font-medium text-gray-700">Material:</span> {inputs.material}</div>
                  <div><span className="font-medium text-gray-700">Section:</span> {inputs.sectionShape}</div>
                  <div><span className="font-medium text-gray-700">Load:</span> {inputs.loadValue} {inputs.loadType==='Point Load'?'kN':'kN/m'}</div>
                  {inputs.loadType==='Point Load' && <div><span className="font-medium text-gray-700">Pos:</span> {inputs.loadPosition} {unit}</div>}
                  <div><span className="font-medium text-gray-700">φ:</span> {inputs.loadFactor.toFixed(2)}</div>
                  <div><span className="font-medium text-gray-700">L/Limit:</span> {inputs.deflectionLimit}</div>
                </div>
                <button type="submit" disabled={processing} className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary text-white font-medium tracking-wide shadow hover:shadow-lg transition disabled:opacity-60 disabled:cursor-not-allowed">
                  {processing && <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
                  <span>{processing ? 'Processing...' : 'Recalculate'}</span>
                </button>
                <button type="button" onClick={handleExportPDF} className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gray-100 text-gray-700 font-medium tracking-wide hover:bg-gray-200 transition">
                  <Download className="h-4 w-4" /> Export PDF
                </button>
                <button type="button" onClick={copyShareLink} className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-secondary/10 text-secondary-800 font-medium tracking-wide hover:bg-secondary/20 transition">
                  <ExternalLink className="h-4 w-4" /> {shareCopied? 'Link Copied' : 'Copy Share Link'}
                </button>
                <a href="/contact" className="block text-center text-sm text-primary hover:text-blue-700 font-medium transition">Contact for Custom Analysis →</a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Navigation buttons */}
            <div className="pt-2 flex gap-3">
              {step > 1 && <button type="button" onClick={goPrev} className="flex-1 px-4 py-2 rounded-md bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition">Back</button>}
              {step < 4 && <button type="button" onClick={goNext} className="flex-1 px-4 py-2 rounded-md bg-primary text-white text-sm font-medium hover:shadow transition">Next</button>}
            </div>
            {stepErrors.length>0 && (
              <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-[11px] space-y-1" aria-live="assertive">
                {stepErrors.map(err => <p key={err}>• {err}</p>)}
              </div>
            )}
            <style jsx>{`
              @keyframes splashRing { 0% { transform: scale(.3); opacity: .9;} 60% { transform: scale(1.4); opacity:0;} 100% { transform: scale(1.6); opacity:0;} }
              @keyframes pulseFast { 0%,100% { opacity:.35;} 50% { opacity:.15;} }
              .animate-splash-ring { animation: splashRing .8s ease-out forwards; }
              .animate-pulse-fast { animation: pulseFast 1.2s ease-in-out infinite; mix-blend-mode: multiply; }
            `}</style>
          </motion.form>

          {/* Results & Charts */}
          <div className="flex-1 space-y-10">
            {step < 4 && (
              <div className="p-8 rounded-2xl bg-gradient-to-r from-primary/5 to-secondary/5 text-sm text-gray-600 ring-1 ring-gray-100">
                Complete steps 1–3 to view calculated results. Current step: <span className="font-semibold text-gray-800">{steps.find(s=>s.id===step)?.title}</span>
              </div>
            )}
            {step === 4 && processing && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-8 rounded-2xl bg-white shadow ring-1 ring-gray-100 flex flex-col items-center gap-4">
                <div className="relative w-14 h-14">
                  <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                </div>
                <div className="text-sm font-medium text-gray-700">Computing structural response…</div>
                <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary via-secondary to-primary transition-all duration-200" style={{ width: `${progress}%` }} />
                </div>
                <div className="text-[10px] tracking-wide text-gray-500 uppercase">Shear • Moment • Deflection • Safety</div>
                {sharedNotice && <div className="text-[11px] text-primary font-medium mt-1">{sharedNotice}</div>}
              </motion.div>
            )}
            {step === 4 && !processing && results && (
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10">
                  <div className="text-[10px] uppercase tracking-wide text-gray-500 font-semibold mb-1">Max Deflection</div>
                  <div className="text-lg font-bold text-gray-800">{(results.deflectionMax*1000).toFixed(2)} mm</div>
                  <div className="text-[10px] text-gray-600">L/{results.deflectionRatio.toFixed(0)}</div>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10">
                  <div className="text-[10px] uppercase tracking-wide text-gray-500 font-semibold mb-1">Max Shear</div>
                  <div className="text-lg font-bold text-gray-800">{(results.shearMax/1000).toFixed(2)} kN</div>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10">
                  <div className="text-[10px] uppercase tracking-wide text-gray-500 font-semibold mb-1">Max Moment</div>
                  <div className="text-lg font-bold text-gray-800">{(results.momentMax/1000).toFixed(2)} kN·m</div>
                </div>
                <div className={`p-4 rounded-xl ${results.safetyFactor < 1 ? 'bg-red-100' : 'bg-gradient-to-br from-primary/10 to-secondary/10'}`}>
                  <div className="text-[10px] uppercase tracking-wide text-gray-500 font-semibold mb-1">Safety Factor</div>
                  <div className={`text-lg font-bold ${results.safetyFactor < 1 ? 'text-red-600' : 'text-gray-800'}`}>{results.safetyFactor.toFixed(2)}</div>
                  {results.safetyFactor < 1 && <div className="text-[10px] text-red-600 font-medium mt-1">Increase section / reduce load</div>}
                </div>
                <div className={`p-4 rounded-xl ${results.serviceabilityPass ? 'bg-gradient-to-br from-green-100 to-green-50' : 'bg-red-100'}`}>
                  <div className="text-[10px] uppercase tracking-wide text-gray-500 font-semibold mb-1">Deflection Check</div>
                  <div className={`text-lg font-bold ${results.serviceabilityPass ? 'text-gray-800' : 'text-red-600'}`}>{results.serviceabilityPass ? 'OK' : 'Fail'}</div>
                  <div className="text-[10px] text-gray-600">Limit L/{inputs.deflectionLimit}</div>
                </div>
              </motion.div>
            )}

            {step === 4 && !processing && results && !results.warnings.some(w=>w.severity==='error') && (
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow ring-1 ring-gray-100 p-4">
                <h3 className="font-semibold mb-2 text-sm">Shear Force Diagram</h3>
                <canvas ref={chartRef} className="h-48" />
              </div>
              <div className="bg-white rounded-xl shadow ring-1 ring-gray-100 p-4">
                <h3 className="font-semibold mb-2 text-sm">Bending Moment Diagram</h3>
                <canvas ref={chartRefMoment} className="h-48" />
              </div>
            </motion.div>
            )}
            {step === 4 && !processing && results && !results.warnings.some(w=>w.severity==='error') && (
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="bg-white rounded-xl shadow ring-1 ring-gray-100 p-4">
              <h3 className="font-semibold mb-2 text-sm">Deflection Curve</h3>
              <canvas ref={chartRefDeflect} className="h-56" />
            </motion.div>
            )}
            {step === 4 && !processing && results && results.warnings.length>0 && (
              <div className="mt-2 space-y-1 text-[11px]">
                {results.warnings.map(w => (
                  <div key={w.code} className={`px-3 py-2 rounded-md border text-xs flex items-start gap-2 ${w.severity==='error'?'bg-red-50 border-red-200 text-red-700': w.severity==='warn'?'bg-amber-50 border-amber-200 text-amber-700':'bg-blue-50 border-blue-200 text-blue-700'}`}>[{w.severity.toUpperCase()}] {w.message}</div>
                ))}
              </div>
            )}

            <div className="text-xs text-gray-500 leading-relaxed pt-4">
              <p>Note: Formulas use standard simplified beam theory for demonstration. For critical structural design, consult detailed codes and perform advanced analysis.</p>
            </div>
          </div>
        </div>
  <div aria-live="polite" className="sr-only">{ariaMsgRef.current}</div>
      </div>
    </div>
  )
}
