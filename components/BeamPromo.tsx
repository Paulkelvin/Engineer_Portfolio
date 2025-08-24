"use client";
import { useCallback, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'

/* Advanced BeamPromo algorithm
   - Multi-signal scoring (time, scroll depth, interaction, exit intent, idle-return)
   - Gating: deny paths, max shows, cooldowns, opt-out
   - Versioned persistent state
   - Accessible & respectful
*/

interface PromoStateV2 {
  version: 2
  shows: number
  engaged: number
  dismissed: number
  optOut: boolean
  lastAction: 'dismiss' | 'engage' | null
  lastShownAt: number | null
  nextEligibleAt: number | null
}

const STORAGE_KEY = 'beamPromoState'
const STATE_VERSION = 2
const MAX_SHOWS = 2
const DISMISS_COOLDOWN_MS = 12 * 60 * 60 * 1000 // 12h
const ENGAGE_COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000 // 7d
const EXIT_INTENT_ARM_MS = 6000
const SCORE_THRESHOLD = 60
const EXIT_INTENT_SCORE = 60 // immediate show (>= threshold)
const TIME_SCORE = 30
const SCROLL_SCORE = 30
const INTERACTION_SCORE = 25
const IDLE_RETURN_SCORE = 20

// Adaptive delay bounds
const MIN_DELAY = 8000
const MAX_DELAY = 18000

const DENY_PATHS = ['/services/beam-calculator']

function loadState(): PromoStateV2 {
  if (typeof window === 'undefined') return defaultState()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState()
    const parsed = JSON.parse(raw)
    if (parsed.version !== STATE_VERSION) return defaultState() // simple migration strategy
    return { ...defaultState(), ...parsed }
  } catch {
    return defaultState()
  }
}

function saveState(st: PromoStateV2) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(st)) } catch {}
}

function defaultState(): PromoStateV2 {
  return { version: STATE_VERSION, shows: 0, engaged: 0, dismissed: 0, optOut: false, lastAction: null, lastShownAt: null, nextEligibleAt: null }
}

const BeamPromo = () => {
  const pathname = usePathname()
  const [state, setState] = useState<PromoStateV2>(() => loadState())
  const [visible, setVisible] = useState(false)
  const [closing, setClosing] = useState(false)
  const [flashMsg, setFlashMsg] = useState<string>('')
  const [score, setScore] = useState(0)
  const firedRef = useRef(false)
  const armedExitRef = useRef(false)
  const interactionsRef = useRef(0)
  const scrollTriggeredRef = useRef(false)
  const idleRef = useRef<number | null>(null)
  const cleanupFns = useRef<(() => void)[]>([])

  // Query params (force/reset/optout)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    if (params.get('resetPromo') === '1') {
      const fresh = defaultState()
      setState(fresh); saveState(fresh)
    }
    if (params.get('optOutPromo') === '1') {
      const next = { ...state, optOut: true }
      setState(next); saveState(next)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const suppressed = !!pathname && DENY_PATHS.some(p => pathname.startsWith(p))

  // Eligibility gating
  const eligible = (() => {
    if (suppressed) return false
    if (state.optOut) return false
    if (state.shows >= MAX_SHOWS) return false
    if (state.nextEligibleAt && Date.now() < state.nextEligibleAt) return false
    return true
  })()

  // Fire popup
  const fire = useCallback(() => {
    if (firedRef.current || !eligible) return
    firedRef.current = true
    setVisible(true)
    setState(prev => {
      const next: PromoStateV2 = { ...prev, shows: prev.shows + 1, lastShownAt: Date.now(), lastAction: null }
      saveState(next)
      return next
    })
    // Cleanup listeners
    cleanupFns.current.forEach(fn => fn())
    cleanupFns.current = []
  }, [eligible])

  // Add score & maybe fire
  const addScore = useCallback((pts: number) => {
    if (firedRef.current) return
    setScore(s => {
      const next = Math.min(100, s + pts)
      if (next >= SCORE_THRESHOLD) fire()
      return next
    })
  }, [fire])

  // Arm triggers
  useEffect(() => {
    if (!eligible) return
    if (firedRef.current) return
    if (typeof window === 'undefined') return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // Adaptive delay: base on (approx words ~ body text length / 5) — simple fallback
    const text = document.body.innerText || ''
    const words = Math.max(50, text.split(/\s+/).length)
    const estReadSec = Math.min(180, words / 200 * 60)
    const baseDelay = Math.min(MAX_DELAY, Math.max(MIN_DELAY, estReadSec * 400)) // convert to ms heuristic
    const delay = baseDelay + Math.random()*1500
    const timeTimer = window.setTimeout(() => addScore(TIME_SCORE), delay)
    cleanupFns.current.push(() => clearTimeout(timeTimer))

    const scrollHandler = () => {
      if (scrollTriggeredRef.current) return
      const depth = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight
      const threshold = 0.33 + Math.random()*0.12
      if (depth >= threshold) {
        scrollTriggeredRef.current = true
        addScore(SCROLL_SCORE)
        window.removeEventListener('scroll', scrollHandler)
      }
    }
    window.addEventListener('scroll', scrollHandler, { passive: true })
    cleanupFns.current.push(() => window.removeEventListener('scroll', scrollHandler))

    const clickHandler = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (target && target.closest('a')) {
        interactionsRef.current += 1
        if (interactionsRef.current === 2) addScore(INTERACTION_SCORE)
      }
    }
    document.addEventListener('click', clickHandler)
    cleanupFns.current.push(() => document.removeEventListener('click', clickHandler))

    const blurHandler = () => { idleRef.current = Date.now() }
    const focusHandler = () => {
      if (idleRef.current && Date.now() - idleRef.current < 25000) {
        addScore(IDLE_RETURN_SCORE)
      }
      idleRef.current = null
    }
    window.addEventListener('blur', blurHandler)
    window.addEventListener('focus', focusHandler)
    cleanupFns.current.push(() => { window.removeEventListener('blur', blurHandler); window.removeEventListener('focus', focusHandler) })

    const armTimer = window.setTimeout(() => { armedExitRef.current = true }, EXIT_INTENT_ARM_MS)
    cleanupFns.current.push(() => clearTimeout(armTimer))
    const mouseHandler = (e: MouseEvent) => {
      if (!armedExitRef.current || firedRef.current) return
      if (e.clientY <= 8) { addScore(EXIT_INTENT_SCORE) }
    }
    document.addEventListener('mousemove', mouseHandler)
    cleanupFns.current.push(() => document.removeEventListener('mousemove', mouseHandler))

    // Force param
    const params = new URLSearchParams(window.location.search)
    if (params.get('forcePromo') === '1') {
      addScore(SCORE_THRESHOLD) // immediate
    }

    // Reduced motion: skip incremental animation by front-loading some score (but not full)
    if (prefersReduced) addScore(20)

    return () => {
      cleanupFns.current.forEach(fn => fn())
      cleanupFns.current = []
    }
  }, [eligible, addScore])

  // Auto close if navigated to suppressed path when visible
  useEffect(() => {
    if (visible && suppressed) {
      setClosing(true)
      setTimeout(() => { setVisible(false); setClosing(false) }, 280)
    }
  }, [visible, suppressed])

  // Actions
  const close = useCallback((action: 'dismiss' | 'engage' | 'optout') => {
    setClosing(true)
    setTimeout(() => { setVisible(false); setClosing(false) }, 260)
    setState(prev => {
      let next: PromoStateV2 = { ...prev }
      if (action === 'dismiss') {
        next.dismissed += 1
        next.lastAction = 'dismiss'
        next.nextEligibleAt = Date.now() + DISMISS_COOLDOWN_MS
      } else if (action === 'engage') {
        next.engaged += 1
        next.lastAction = 'engage'
        next.nextEligibleAt = Date.now() + ENGAGE_COOLDOWN_MS
      } else if (action === 'optout') {
        next.optOut = true
        next.lastAction = 'dismiss'
        next.nextEligibleAt = Date.now() + ENGAGE_COOLDOWN_MS
      }
      saveState(next)
      return next
    })
    if (action === 'dismiss') {
      setFlashMsg('Find it later under Services → Beam Calculator')
      setTimeout(() => setFlashMsg(''), 2600)
    }
  }, [])

  if (!eligible && !visible) return null

  return (
    <>
      <AnimatePresence>
        {visible && !suppressed && (
          <motion.aside
            key="beamPromo"
            role="dialog"
            aria-label="Beam calculator promotion"
            initial={{ opacity: 0, y: 36, scale: .9, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 20, scale: .94, filter: 'blur(3px)' }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className={`fixed z-[70] bottom-4 right-4 w-[320px] max-w-[92vw] rounded-2xl shadow-xl ring-1 ring-blue-100 bg-white/90 backdrop-blur-md p-5 flex flex-col gap-4 text-sm ${closing?'pointer-events-none':''}`}
            style={{ boxShadow: '0 8px 28px -4px rgba(0,123,255,0.25),0 2px 6px -1px rgba(0,0,0,0.1)' }}
          >
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center text-[11px] font-bold tracking-wide">BEAM</div>
              <div className="flex-1 leading-snug text-gray-700">
                Ready to test your beam designs? Try our <span className="font-semibold text-primary">free Beam Calculator</span> now.
              </div>
              <button aria-label="Dismiss promotion" onClick={() => close('dismiss')} className="text-gray-400 hover:text-gray-600 transition text-base leading-none">×</button>
            </div>
            <div className="flex gap-2">
              <a href="/services/beam-calculator" onClick={() => close('engage')} className="flex-1 inline-flex items-center justify-center px-3 py-2 rounded-md bg-primary text-white text-xs font-medium shadow hover:bg-primary/90 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40">Try It</a>
              <button onClick={() => close('dismiss')} className="px-3 py-2 rounded-md bg-gray-100 text-gray-600 text-xs font-medium hover:bg-gray-200 transition">Later</button>
            </div>
            <div className="flex items-center justify-between">
              <button onClick={() => close('optout')} className="text-[10px] text-gray-400 hover:text-gray-600 underline decoration-dotted">Don’t show again</button>
              <div className="text-[10px] text-gray-400">Score {score}</div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {flashMsg && (
          <motion.div
            key="beamPromoFlash"
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.35 }}
            className="fixed bottom-4 right-4 z-[69] rounded-md bg-primary text-white text-[11px] font-medium px-3 py-2 shadow"
          >
            {flashMsg}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default BeamPromo
