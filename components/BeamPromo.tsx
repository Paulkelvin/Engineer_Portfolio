"use client";
import { useEffect, useState, useRef, useCallback } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'

/**
 * BeamPromo: non-invasive promotional popup for Beam Calculator.
 * Triggers: time (15-30s random), scroll (30-50%), exit intent after 10s.
 * Frequency: only on first or second visit (localStorage counter 'beamPromoVisits').
 */
const BeamPromo = () => {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const exitArmedRef = useRef(false)

  // Determine if we should show based on visit count
  useEffect(() => {
    if (typeof window === 'undefined') return
    const key = 'beamPromoVisits'
    const visits = parseInt(localStorage.getItem(key) || '0', 10)
    if (visits >= 2) return // do not show again
    localStorage.setItem(key, String(visits + 1))

  // Random timer trigger 12-24s (adjusted)
  const delay = 12000 + Math.random() * 12000
    timerRef.current = setTimeout(() => setVisible(true), delay)

    // Scroll trigger 25-40% (slightly earlier)
    const onScroll = () => {
      if (visible || dismissed) return
      const scrollProgress = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight
      if (scrollProgress >= (0.25 + Math.random() * 0.15)) {
        setVisible(true)
        window.removeEventListener('scroll', onScroll)
      }
    }
    window.addEventListener('scroll', onScroll)

  // Exit intent after 6s (earlier)
  const armExitTimer = setTimeout(() => { exitArmedRef.current = true }, 6000)
    const onMouseLeave = (e: MouseEvent) => {
      if (!exitArmedRef.current || visible || dismissed) return
      if (e.clientY <= 0) { setVisible(true) }
    }
    document.addEventListener('mouseleave', onMouseLeave)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('mouseleave', onMouseLeave)
      clearTimeout(armExitTimer)
    }
  }, [visible, dismissed])

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

  if (!visible && !showInfo) return null

  return (
    <div className="fixed z-[70] bottom-4 right-4 max-w-xs w-full sm:max-w-sm animate-in">
      {/* Popup */}
      {visible && !showInfo && (
        <div
          role="dialog"
          aria-label="Beam Calculator Promotion"
          className="relative group rounded-xl shadow-xl bg-white border border-blue-100 p-5 pr-7 text-sm leading-relaxed ring-1 ring-blue-200/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 transition transform data-[state=closed]:opacity-0"
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
        </div>
      )}

      {/* Info tooltip */}
      {showInfo && (
        <div className="relative rounded-lg bg-white border border-blue-100 px-4 py-3 text-xs shadow-md animate-fade">
          <p className="text-gray-600"><span className="font-semibold text-primary">Tip:</span> Beam Calculator lives under <span className="font-medium">Services › Beam Calculator</span> anytime.</p>
        </div>
      )}
      <style jsx>{`
        .animate-in { animation: slideIn 0.6s cubic-bezier(.22,.68,0,1); }
        .animate-fade { animation: fadeOut 2.6s forwards; }
        @keyframes slideIn { from { opacity:0; transform: translateY(20px) scale(.95); } to { opacity:1; transform: translateY(0) scale(1); } }
        @keyframes fadeOut { 0% { opacity:1; } 75% { opacity:1; } 100% { opacity:0; transform: translateY(4px); } }
      `}</style>
    </div>
  )
}

export default BeamPromo
