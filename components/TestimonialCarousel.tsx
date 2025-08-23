"use client";

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export interface TestimonialItem {
  name: string
  role: string
  company?: string
  quote: string
  photo: string
  location?: string
}

interface Props {
  items: TestimonialItem[]
  heading?: string
  subheading?: string
  accent?: 'primary' | 'secondary'
}

const accentClasses: Record<string, string> = {
  primary: 'from-primary/90 to-primary',
  secondary: 'from-secondary/90 to-secondary'
}

export const TestimonialCarousel = ({ items, heading = 'Client Testimonials', subheading, accent = 'primary' }: Props) => {
  const [index, setIndex] = useState(0)
  const current = items[index]

  const next = () => setIndex(i => (i + 1) % items.length)
  const prev = () => setIndex(i => (i - 1 + items.length) % items.length)

  return (
    <div className="w-full">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 md:mb-4">
          {heading}
        </h2>
        {subheading && (
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subheading}</p>
        )}
      </div>

      <div className="relative max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.name + index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45 }}
            className="rounded-3xl bg-white shadow-xl ring-1 ring-gray-100 p-6 sm:p-10 overflow-hidden"
          >
            <div className="absolute -top-14 -right-14 w-44 h-44 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl" />
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden ring-4 ring-white shadow-lg mx-auto md:mx-0">
                <Image src={current.photo} alt={current.name} width={200} height={200} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <blockquote className="relative text-base sm:text-lg md:text-xl leading-relaxed text-gray-700 font-medium mb-6 pl-8">
                  <span aria-hidden="true" className="absolute left-0 top-0 text-5xl md:text-6xl leading-none text-primary/30 select-none">“</span>
                  <span className="relative z-10 block pt-1">{current.quote}</span>
                </blockquote>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <div className="text-lg font-semibold text-gray-900">{current.name}</div>
                    <div className="text-sm text-primary font-medium">{current.role}{current.company ? ' • ' + current.company : ''}</div>
                    {current.location && <div className="text-xs text-gray-500 mt-1">{current.location}</div>}
                  </div>
                  <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r ${accentClasses[accent]} text-white text-xs font-semibold tracking-wide shadow`}> 
                    <span>Satisfied Client</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        {items.length > 1 && (
          <>
            <button onClick={prev} aria-label="Previous testimonial" className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 p-4 md:p-5 rounded-full bg-white/95 shadow-lg ring-1 ring-gray-200 hover:bg-gray-50 transition group active:scale-95">
              <ChevronLeft className="h-5 w-5 text-gray-700 group-active:translate-x-[-2px] transition" />
            </button>
            <button onClick={next} aria-label="Next testimonial" className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 p-4 md:p-5 rounded-full bg-white/95 shadow-lg ring-1 ring-gray-200 hover:bg-gray-50 transition group active:scale-95">
              <ChevronRight className="h-5 w-5 text-gray-700 group-active:translate-x-[2px] transition" />
            </button>
          </>
        )}

        {/* Dots */}
        {items.length > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${i === index ? 'bg-primary w-8' : 'bg-gray-300 w-2.5 hover:bg-gray-400'}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default TestimonialCarousel
