import { Variants } from 'framer-motion'

// Reusable motion variants for subtle micro-animations
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22,0.68,0,1] } }
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5 } }
}

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05
    }
  }
}

export const scaleHover = {
  whileHover: { y: -6, rotate: 0.4, scale: 1.03, transition: { type: 'spring', stiffness: 260, damping: 18 } },
  whileTap: { scale: 0.97 }
}

export const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.96, filter: 'blur(4px)' },
  show: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.55, ease: [0.16,0.84,0.44,1] } }
}

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22,0.68,0,1] } }
}

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22,0.68,0,1] } }
}

export const springBounce = {
  whileHover: { scale: 1.05, transition: { type: 'spring', stiffness: 300, damping: 16 } },
  whileTap: { scale: 0.95 }
}

// Utility to disable animation when prefers-reduced-motion is set (optional hook substitute)
export const maybe = (prefersReduced: boolean, variant: Variants): Variants => prefersReduced ? { show: { opacity: 1 } } as Variants : variant
