"use client";
import { useEffect, useState, useRef, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { X } from 'lucide-react'

/**
 * BeamPromo: non-invasive promotional popup for Beam Calculator.
 * Triggers (current): time (12–24s random), scroll (25–40%), exit intent (after 6s arm).
 * Frequency: only on first or second show (new key 'beamPromoShows').
 * Fixes:
 *  - Visit counter now increments ONLY when the promo actually becomes visible.
 *  - Migrates legacy inflated 'beamPromoVisits' counts so popup reappears if you were locked out prematurely.
 *  - Adds reset (?resetPromo=1) & force (?forcePromo=1) URL params for testing.
 * UX: Framer Motion for smoother mount/unmount (scale+opacity) and subtle backdrop blur.
 */
const BeamPromo = () => {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const exitArmedRef = useRef(false)

  // Show gating & triggers
  useEffect(() => {
    if (typeof window === 'undefined') return
    const legacyKey = 'beamPromoVisits'
    const showsKey = 'beamPromoShows'
    const search = window.location.search
    const force = search.includes('forcePromo=1')
    const reset = search.includes('resetPromo=1')

    if (reset) {
      localStorage.removeItem(legacyKey)
      localStorage.removeItem(showsKey)
    }

    // Migration: if we previously stored inflated visits but no shows yet
    if (!localStorage.getItem(showsKey)) {
      const legacy = parseInt(localStorage.getItem(legacyKey) || '0', 10)
      if (legacy > 0) {
        // If legacy >=2 we treat it as 1 show to allow one more legitimate show
        const derivedShows = legacy >= 2 ? 1 : legacy
        localStorage.setItem(showsKey, String(derivedShows))
      }
    }

    const showsRaw = parseInt(localStorage.getItem(showsKey) || '0', 10)
    const shows = force ? 0 : showsRaw
    if (shows >= 2 && !force) return

    let didIncrement = false
    const show = () => {
      if (didIncrement || visible || dismissed) return
      setVisible(true)
      if (!force) {
        localStorage.setItem(showsKey, String(shows + 1))
      }
      didIncrement = true
    }

    const delay = 12000 + Math.random() * 12000
    const scrollThreshold = 0.25 + Math.random() * 0.15
    timerRef.current = setTimeout(show, delay)

    const onScroll = () => {
      if (visible || dismissed) return
      const scrollProgress = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight
      if (scrollProgress >= scrollThreshold) {
        show()
        window.removeEventListener('scroll', onScroll)
      }
    }
    window.addEventListener('scroll', onScroll)

    const armExitTimer = setTimeout(() => { exitArmedRef.current = true }, 6000)
    const onMouseLeave = (e: MouseEvent) => {
      if (!exitArmedRef.current || visible || dismissed) return
      if (e.clientY <= 0) show()
    }
    document.addEventListener('mouseleave', onMouseLeave)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('mouseleave', onMouseLeave)
      clearTimeout(armExitTimer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const close = useCallback(() => {
    setVisible(false)
    setDismissed(true)
  }, [])

  const handleNoThanks = () => {
    setShowInfo(true)
    setTimeout(() => {
      setShowInfo(false)
      close()
    }, 2500)
  }

  return (
    <div className="fixed z-[70] bottom-4 right-4 max-w-xs w-full sm:max-w-sm pointer-events-none">
      <AnimatePresence initial={false}>
        {visible && !showInfo && (
          <motion.div
            key="promo"
            role="dialog"
            aria-label="Beam Calculator Promotion"
            initial={{ opacity: 0, y: 24, scale: 0.9, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 12, scale: 0.92, filter: 'blur(4px)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 28, mass: 0.7 }}
            className="relative group rounded-xl shadow-xl bg-white/95 backdrop-blur border border-blue-100 p-5 pr-7 text-sm leading-relaxed ring-1 ring-blue-200/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 pointer-events-auto"
            style={{ boxShadow: '0 8px 28px -4px rgba(0,123,255,0.25), 0 2px 6px -1px rgba(0,0,0,0.1)' }}
          >
            <button
              aria-label="Close promotion"
              onClick={close}
              className="absolute top-2 right-2 p-1 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition"
            >
              <X className="h-4 w-4" />
            </button>
            <h4 className="font-semibold mb-2 text-gray-800 text-base">Ready to test your beam designs?</h4>
            <p className="text-gray-600 mb-4">Try our <span className="font-semibold text-primary">Free Beam Calculator</span> now!</p>
            <div className="flex flex-col xs:flex-row gap-2">
              <Link
                href="/services/beam-calculator"
                className="flex-1 inline-flex items-center justify-center px-4 py-2 rounded-md bg-primary text-white font-medium text-sm shadow hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 transition"
                aria-label="Go to Beam Calculator"
                onClick={close}
              >
                Yes, Try It
              </Link>
              <button
                onClick={handleNoThanks}
                className="text-xs text-gray-500 hover:text-gray-700 underline decoration-dotted focus:outline-none"
                aria-label="Dismiss promotion"
              >
                No, Thanks
              </button>
            </div>
          </motion.div>
        )}
        {showInfo && (
          <motion.div
            key="info"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="relative rounded-lg bg-white/95 backdrop-blur border border-blue-100 px-4 py-3 text-xs shadow-md pointer-events-auto"
          >
            <p className="text-gray-600"><span className="font-semibold text-primary">Tip:</span> Beam Calculator lives under <span className="font-medium">Services › Beam Calculator</span> anytime.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default BeamPromo
