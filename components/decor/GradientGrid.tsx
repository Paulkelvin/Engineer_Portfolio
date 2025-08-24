"use client";
import React from 'react'
import { motion } from 'framer-motion'

interface Props {
  className?: string
  stroke?: string
  opacity?: number
}

// Subtle animated gradient grid background (masked fade)
export const GradientGrid: React.FC<Props> = ({ className = '', stroke = 'rgba(255,255,255,0.15)', opacity = 1 }) => {
  const rows = 16
  const cols = 24
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden [mask-image:radial-gradient(circle_at_center,rgba(0,0,0,.7),transparent_75%)] ${className}`} aria-hidden="true">
      <svg className="w-[250%] h-[250%] -translate-x-1/4 -translate-y-1/4" viewBox={`0 0 ${cols} ${rows}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id="gridStroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={stroke} />
            <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
          </linearGradient>
        </defs>
        {Array.from({ length: rows + 1 }).map((_, r) => (
          <line key={r} x1={0} y1={r} x2={cols} y2={r} stroke="url(#gridStroke)" strokeWidth={0.02} />
        ))}
        {Array.from({ length: cols + 1 }).map((_, c) => (
          <line key={c} y1={0} x1={c} y2={rows} x2={c} stroke="url(#gridStroke)" strokeWidth={0.02} />
        ))}
        {/* Floating pulse nodes */}
        <motion.g initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.6, repeat: Infinity, repeatDelay: 4 } } }}>
          {Array.from({ length: 8 }).map((_, i) => {
            const x = (i * 3 + 2) % cols
            const y = (i * 5 + 3) % rows
            return (
              <motion.circle
                key={i}
                cx={x}
                cy={y}
                r={0.12}
                fill="#3b82f6"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: i * 0.8, ease: 'easeInOut' }}
              />
            )
          })}
        </motion.g>
      </svg>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 mix-blend-overlay" style={{ opacity }} />
    </div>
  )
}

export default GradientGrid
