'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Download, Ruler, Zap, Wrench, ChevronDown, Calculator, ExternalLink } from 'lucide-react'
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
  unitSystem: 'metric'
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

interface Results {
  deflectionMax: number
  shearMax: number
  momentMax: number
  safetyFactor: number
}

function computeResults(i: BeamInputs): Results | null {
  if (i.length <= 0 || i.loadValue <= 0) return null
  const E = MATERIALS[i.material].E
  const yieldStress = MATERIALS[i.material].yield
  const I = calcMomentOfInertia(i)
  const L = i.length
  const P = i.loadValue * 1000 // convert kN to N
  const w = i.loadValue * 1000 // kN/m to N/m

  let deflectionMax = 0
  let shearMax = 0
  let momentMax = 0

  if (i.support === 'Simply Supported') {
    if (i.loadType === 'Point Load') {
      const a = i.loadPosition
      const b = L - a
      // Max deflection at somewhere between; use standard for center if central: δmax = P a b (L^2 - a b)/(3 E I L)
      deflectionMax = (P * a * b * (Math.pow(L,2) - a * b)) / (3 * E * I * L)
      shearMax = P * Math.max(a,b)/L // reaction approx
      momentMax = P * a * b / L
    } else { // UDL
      deflectionMax = (5 * w * Math.pow(L,4)) / (384 * E * I)
      shearMax = w * L / 2
      momentMax = w * Math.pow(L,2) / 8
    }
  } else if (i.support === 'Cantilever') {
    if (i.loadType === 'Point Load') {
      // Point load at free end (assume if position near end)
      deflectionMax = P * Math.pow(L,3) / (3 * E * I)
      shearMax = P
      momentMax = P * L
    } else {
      deflectionMax = w * Math.pow(L,4) / (8 * E * I)
      shearMax = w * L
      momentMax = w * Math.pow(L,2) / 2
    }
  } else if (i.support === 'Fixed Both Ends') {
    if (i.loadType === 'Point Load') {
      // Approx central load assumption
      deflectionMax = (P * Math.pow(L,3)) / (192 * E * I)
      shearMax = P/2
      momentMax = P * L / 8
    } else {
      deflectionMax = (w * Math.pow(L,4)) / (384 * E * I)
      shearMax = w * L / 2
      momentMax = w * Math.pow(L,2) / 12
    }
  }

  // Section modulus Z for rectangular or circular
  let Z: number
  if (i.sectionShape === 'Rectangular') {
    Z = (i.width * Math.pow(i.height,2)) / 6
  } else {
    Z = Math.PI * Math.pow(i.diameter,3) / 32
  }
  const bendingStress = momentMax / Z // Pa
  const safetyFactor = yieldStress / bendingStress

  return { deflectionMax, shearMax, momentMax, safetyFactor }
}

export default function BeamCalculatorPage() {
  const [inputs, setInputs] = useState<BeamInputs>(defaultInputs)
  const [results, setResults] = useState<Results | null>(() => computeResults(defaultInputs))
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1) // 1: Span, 2: Section, 3: Loading, 4: Results
  const chartRef = useRef<HTMLCanvasElement | null>(null)
  const chartRefMoment = useRef<HTMLCanvasElement | null>(null)
  const chartRefDeflect = useRef<HTMLCanvasElement | null>(null)
  const charts = useRef<Chart[]>([])

  // Update results real-time
  useEffect(() => {
    const r = computeResults(inputs)
    setResults(r)
  }, [inputs])

  const numericHandler = (field: keyof BeamInputs) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    setInputs(prev => {
      let next: BeamInputs = { ...prev, [field]: isNaN(value) ? 0 : value }
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
  const isStepValid = (s: number) => {
    if (s === 1) {
      return inputs.length > 0 && !!inputs.support
    }
    if (s === 2) {
      if (inputs.sectionShape === 'Rectangular') return inputs.width > 0 && inputs.height > 0 && !!inputs.material
      return inputs.diameter > 0 && !!inputs.material
    }
    if (s === 3) {
      if (inputs.loadType === 'Point Load') return inputs.loadValue > 0 && inputs.loadPosition >= 0 && inputs.loadPosition <= inputs.length
      return inputs.loadValue > 0
    }
    return true
  }

  const goNext = () => setStep(s => Math.min(4, s + (isStepValid(s) ? 1 : 0)))
  const goPrev = () => setStep(s => Math.max(1, s - 1))

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

  // Render charts
  useEffect(() => {
    const createChart = (ctx: CanvasRenderingContext2D, label: string, data: number[], color: string) => new Chart(ctx, {
      type: 'line',
      data: { labels: diagramData.xs.map(x => x.toFixed(2)), datasets: [{ label, data, borderColor: color, tension: 0.3, pointRadius: 0 }] },
      options: { responsive: true, animation: { duration: 600 }, plugins: { legend: { display: true } }, scales: { x: { ticks: { maxTicksLimit: 6 } } } }
    })

    charts.current.forEach(c => c.destroy())
    charts.current = []
    if (chartRef.current) charts.current.push(createChart(chartRef.current.getContext('2d')!, 'Shear (kN)', diagramData.shear, '#0d6efd'))
    if (chartRefMoment.current) charts.current.push(createChart(chartRefMoment.current.getContext('2d')!, 'Moment (kN·m)', diagramData.moment, '#6610f2'))
    if (chartRefDeflect.current) charts.current.push(createChart(chartRefDeflect.current.getContext('2d')!, 'Deflection (mm)', diagramData.deflect, '#198754'))
  }, [diagramData])

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
    }
    // capture charts sequentially
    const chartCanvases = [chartRef.current, chartRefMoment.current, chartRefDeflect.current]
    let y = 160
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
      if (isStepValid(step)) goNext()
      return
    }
    setLoading(true)
    setTimeout(() => setLoading(false), 600)
  }

  const unit = inputs.unitSystem === 'metric' ? 'm' : 'ft'

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative h-[320px] md:h-[420px] w-full overflow-hidden">
        <Image src="https://source.unsplash.com/random/1920x500/?beam-engineering" alt="Beam engineering" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">Beam Deflection & Load Calculator</h1>
          <p className="max-w-2xl text-sm md:text-lg text-gray-200 leading-relaxed">Quickly analyze beam performance with inputs for load, material, and supports. Get deflection, shear, moment, and safety factor results with visual diagrams.</p>
        </motion.div>
      </div>

      <div className="section-padding pb-24 container-custom">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Wizard */}
          <motion.form onSubmit={onSubmit} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full lg:w-1/3 bg-white rounded-2xl shadow-xl ring-1 ring-gray-100 p-6 space-y-6 sticky top-24 self-start h-fit">
            {/* Step indicator */}
            <ol className="flex lg:block items-center justify-between lg:space-y-3 text-xs" aria-label="Beam calculator steps">
              {steps.map(s => {
                const state = s.id === step ? 'current' : s.id < step ? 'complete' : 'upcoming'
                return (
                  <li key={s.id} className="flex-1 lg:flex-none">
                    <button type="button" onClick={() => s.id < step && setStep(s.id)} aria-current={s.id===step? 'step':undefined} className={`group flex items-center gap-2 w-full py-2 pr-2 lg:p-0 ${state!=='upcoming'?'cursor-pointer':'cursor-default'}`}> 
                      <span className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold ring-2 transition ${state==='current'?'bg-primary text-white ring-primary': state==='complete'?'bg-primary/10 text-primary ring-primary/40':'bg-gray-100 text-gray-500 ring-gray-300'}`}>{s.id}</span>
                      <span className="hidden lg:flex flex-col text-left">
                        <span className={`font-medium tracking-tight ${state==='current'?'text-gray-800':'text-gray-600'}`}>{s.title}</span>
                        <span className="text-[10px] text-gray-500 font-normal leading-tight">{s.desc}</span>
                      </span>
                    </button>
                  </li>
                )
              })}
            </ol>

            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent lg:hidden" />

            {/* Step content */}
            {step === 1 && (
              <div className="space-y-4">
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
              </div>
            )}
            {step === 2 && (
              <div className="space-y-4">
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
              </div>
            )}
            {step === 3 && (
              <div className="space-y-4">
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
              </div>
            )}
            {step === 4 && (
              <div className="space-y-5">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2"><Calculator className="h-5 w-5 text-primary" /> Results & Export</h2>
                <div className="text-xs grid grid-cols-2 gap-3 p-3 rounded-lg bg-gray-50">
                  <div><span className="font-medium text-gray-700">L:</span> {inputs.length.toFixed(2)} {unit}</div>
                  <div><span className="font-medium text-gray-700">Support:</span> {inputs.support}</div>
                  <div><span className="font-medium text-gray-700">Material:</span> {inputs.material}</div>
                  <div><span className="font-medium text-gray-700">Section:</span> {inputs.sectionShape}</div>
                  <div><span className="font-medium text-gray-700">Load:</span> {inputs.loadValue} {inputs.loadType==='Point Load'?'kN':'kN/m'}</div>
                  {inputs.loadType==='Point Load' && <div><span className="font-medium text-gray-700">Pos:</span> {inputs.loadPosition} {unit}</div>}
                </div>
                <button type="submit" disabled={loading} className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary text-white font-medium tracking-wide shadow hover:shadow-lg transition disabled:opacity-60 disabled:cursor-not-allowed">
                  {loading && <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
                  <span>Recalculate</span>
                </button>
                <button type="button" onClick={handleExportPDF} className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gray-100 text-gray-700 font-medium tracking-wide hover:bg-gray-200 transition">
                  <Download className="h-4 w-4" /> Export PDF
                </button>
                <a href="/contact" className="block text-center text-sm text-primary hover:text-blue-700 font-medium transition">Contact for Custom Analysis →</a>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="pt-2 flex gap-3">
              {step > 1 && <button type="button" onClick={goPrev} className="flex-1 px-4 py-2 rounded-md bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition">Back</button>}
              {step < 4 && <button type="button" onClick={goNext} disabled={!isStepValid(step)} className="flex-1 px-4 py-2 rounded-md bg-primary text-white text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:shadow transition">Next</button>}
            </div>
          </motion.form>

          {/* Results & Charts */}
          <div className="flex-1 space-y-10">
            {step < 4 && (
              <div className="p-8 rounded-2xl bg-gradient-to-r from-primary/5 to-secondary/5 text-sm text-gray-600 ring-1 ring-gray-100">
                Complete steps 1–3 to view calculated results. Current step: <span className="font-semibold text-gray-800">{steps.find(s=>s.id===step)?.title}</span>
              </div>
            )}
            {step === 4 && (
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10">
                <div className="text-[10px] uppercase tracking-wide text-gray-500 font-semibold mb-1">Max Deflection</div>
                <div className="text-lg font-bold text-gray-800">{results ? (results.deflectionMax*1000).toFixed(2) : '--'} mm</div>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10">
                <div className="text-[10px] uppercase tracking-wide text-gray-500 font-semibold mb-1">Max Shear</div>
                <div className="text-lg font-bold text-gray-800">{results ? (results.shearMax/1000).toFixed(2) : '--'} kN</div>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10">
                <div className="text-[10px] uppercase tracking-wide text-gray-500 font-semibold mb-1">Max Moment</div>
                <div className="text-lg font-bold text-gray-800">{results ? (results.momentMax/1000).toFixed(2) : '--'} kN·m</div>
              </div>
              <div className={`p-4 rounded-xl ${results && results.safetyFactor < 1 ? 'bg-red-100' : 'bg-gradient-to-br from-primary/10 to-secondary/10'}`}>
                <div className="text-[10px] uppercase tracking-wide text-gray-500 font-semibold mb-1">Safety Factor</div>
                <div className={`text-lg font-bold ${results && results.safetyFactor < 1 ? 'text-red-600' : 'text-gray-800'}`}>{results ? results.safetyFactor.toFixed(2) : '--'}</div>
                {results && results.safetyFactor < 1 && <div className="text-[10px] text-red-600 font-medium mt-1">Increase section / reduce load</div>}
              </div>
            </motion.div>
            )}

            {step === 4 && (
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
            {step === 4 && (
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="bg-white rounded-xl shadow ring-1 ring-gray-100 p-4">
              <h3 className="font-semibold mb-2 text-sm">Deflection Curve</h3>
              <canvas ref={chartRefDeflect} className="h-56" />
            </motion.div>
            )}

            <div className="text-xs text-gray-500 leading-relaxed pt-4">
              <p>Note: Formulas use standard simplified beam theory for demonstration. For critical structural design, consult detailed codes and perform advanced analysis.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
