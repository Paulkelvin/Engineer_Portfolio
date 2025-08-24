"use client"

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { Menu, X, Building2 } from 'lucide-react'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const pathname = usePathname()
  const navRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [isOpen])

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services', dropdown: [
      { name: 'Overview', href: '/services' },
      { name: 'Beam Calculator', href: '/services/beam-calculator' }
    ]},
    { name: 'Projects', href: '/projects' },
    { name: 'Resume', href: '/resume' },
    { name: 'Contact', href: '/contact' },
  ]

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 })

  return (
    <nav ref={navRef} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      {/* Scroll progress bar */}
      <motion.div style={{ scaleX }} className="h-0.5 origin-left bg-gradient-to-r from-primary via-secondary to-primary/60" />
      <div className="container-custom px-4">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Building2 className="h-6 w-6 md:h-8 md:w-8 text-primary transition-transform duration-300 group-hover:rotate-6" />
            <span className="text-base md:text-xl font-bold text-gray-800 tracking-tight">Ayodele Adeyemi</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const active = pathname === item.href
              if (item.dropdown) {
                const open = false // rely on group hover only
                return (
                  <motion.div key={item.name} whileHover={{ y: -2 }} className="px-3 relative group">
                    <Link href={item.href} className={`relative inline-flex items-center gap-1 text-sm font-medium tracking-wide transition-colors duration-200 ${active ? 'text-primary' : 'text-gray-600 group-hover:text-primary'}`}>
                      <span className="relative z-10 py-2">{item.name}</span>
                      <motion.span className="relative z-10 inline-block text-[10px] opacity-60">▾</motion.span>
                      {active && (
                        <motion.span layoutId="nav-active-pill" className="absolute inset-0 rounded-full bg-primary/10" transition={{ type: 'spring', stiffness: 300, damping: 24 }} />
                      )}
                    </Link>
                    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition">
                      <div className="bg-white rounded-xl shadow-lg ring-1 ring-gray-200 w-56 p-3 grid gap-1">
                        {item.dropdown.map(link => (
                          <Link key={link.href} href={link.href} className={`px-3 py-2 rounded-md text-sm font-medium transition bg-gradient-to-r from-transparent to-transparent hover:from-primary/5 hover:to-secondary/5 ${pathname===link.href?'text-primary':'text-gray-700 hover:text-primary'}`}>{link.name}</Link>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )
              }
              return (
                <motion.div key={item.name} whileHover={{ y: -2 }} className="px-3">
                  <Link href={item.href} className={`relative inline-flex items-center text-sm font-medium tracking-wide transition-colors duration-200 ${active ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}>
                    <span className="relative z-10 py-2">{item.name}</span>
                    {active && (<motion.span layoutId="nav-active-pill" className="absolute inset-0 rounded-full bg-primary/10" transition={{ type: 'spring', stiffness: 300, damping: 24 }} />)}
                  </Link>
                </motion.div>
              )
            })}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md bg-white/80 backdrop-blur shadow-sm ring-1 ring-gray-200 hover:ring-primary/40 transition active:scale-95"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? (
                <X className="h-5 w-5 text-gray-700" />
              ) : (
                <Menu className="h-5 w-5 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation (with elevated z-index to sit above overlay) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-200 shadow-sm relative z-50"
            >
              <div className="px-4 py-4 space-y-1">
                {navItems.map((item) => {
                  const active = pathname === item.href
                  if (!item.dropdown) {
                    return (
                      <div key={item.name}>
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${active ? 'text-primary bg-blue-50' : 'text-gray-700 hover:text-primary hover:bg-gray-50'}`}
                        >
                          {item.name}
                        </Link>
                      </div>
                    )
                  }
                  // Services dropdown (collapsible)
                  return (
                    <div key={item.name}>
                      <button
                        onClick={() => setMobileServicesOpen(o => !o)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${active ? 'text-primary bg-blue-50' : 'text-gray-700 hover:text-primary hover:bg-gray-50'}`}
                        aria-expanded={mobileServicesOpen}
                        aria-controls="mobile-services-submenu"
                      >
                        <span>{item.name}</span>
                        <span className={`transition-transform duration-300 text-xs ${mobileServicesOpen ? 'rotate-180' : ''}`}>▾</span>
                      </button>
                      {mobileServicesOpen && (
                        <div id="mobile-services-submenu" className="pl-3 pb-2 space-y-1">
                          {item.dropdown.map(link => (
                            <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className={`block px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 ${pathname===link.href?'text-primary bg-blue-50':'text-gray-600 hover:text-primary hover:bg-gray-50'}`}>{link.name}</Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Overlay to close menu when clicking outside */}
      <AnimatePresence>
        {isOpen && (
          <motion.button
            aria-label="Close menu"
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-14 md:hidden bg-black cursor-pointer z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navigation
