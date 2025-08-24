"use client"

import { motion } from 'framer-motion'
import React from 'react'

interface AccentShapeProps {
  variant?: 'grid-dots' | 'triangles' | 'rings';
  className?: string;
  animate?: boolean;
  size?: number;
}

/**
 * Subtle decorative SVG accents – keep usage sparing for visual polish.
 * Uses currentColor for stroke/fill so color + opacity can be controlled via Tailwind utility classes.
 */
const AccentShape: React.FC<AccentShapeProps> = ({
  variant = 'grid-dots',
  className = '',
  animate = false,
  size = 64,
}) => {
  const common = {
    width: size,
    height: size,
    role: 'img',
    'aria-hidden': true,
    focusable: false,
    className: `pointer-events-none select-none ${className}`,
  } as const

  const floatAnim = animate ? {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.2, ease: 'easeOut' }
  } : {}

  switch (variant) {
    case 'triangles':
      return (
        <motion.svg {...common} viewBox="0 0 64 64" {...floatAnim}>
          <g fill="currentColor" fillOpacity="0.12">
            <path d="M8 48L24 16l16 32H8z" />
            <path d="M36 50l8-18 8 18h-16z" fillOpacity={0.18} />
            <path d="M10 54h44v2H10z" fillOpacity={0.08} />
          </g>
        </motion.svg>
      )
    case 'rings':
      return (
        <motion.svg {...common} viewBox="0 0 64 64" {...floatAnim}>
          <g stroke="currentColor" strokeWidth="2" fill="none">
            <circle cx="32" cy="32" r="6" opacity="0.3" />
            <circle cx="32" cy="32" r="14" opacity="0.22" />
            <circle cx="32" cy="32" r="22" opacity="0.15" />
            <circle cx="32" cy="32" r="30" opacity="0.08" />
          </g>
        </motion.svg>
      )
    default: // grid-dots
      return (
        <motion.svg {...common} viewBox="0 0 64 64" {...floatAnim}>
          <g fill="currentColor">
            {Array.from({ length: 4 }).map((_, y) => (
              Array.from({ length: 4 }).map((_, x) => (
                <circle
                  key={`${x}-${y}`}
                  cx={8 + x * 16}
                  cy={8 + y * 16}
                  r={2.5}
                  opacity={(0.55 - (x + y) * 0.06).toFixed(2) as any}
                />
              ))
            ))}
          </g>
        </motion.svg>
      )
  }
}

export default AccentShape
