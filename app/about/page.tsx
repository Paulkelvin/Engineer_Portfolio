'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, ChevronUp, ArrowRight, GraduationCap, Award, Briefcase, Leaf, Zap, Shield, Globe, Building2, Users, Sparkles } from 'lucide-react'
import AccentShape from '@/components/decor/AccentShape'

const AboutPage = () => {
  const [expandedTimeline, setExpandedTimeline] = useState<number | null>(null)

  const timelineData = [
    {
      id: 1,
      type: 'Education',
      title: 'M.S. Civil Engineering',
      institution: 'MIT',
      year: '2010',
      description: 'Specialized in structural engineering and sustainable design',
      icon: GraduationCap,
    },
    {
      id: 2,
      type: 'Certification',
      title: 'LEED Accredited Professional',
      institution: 'USGBC',
      year: '2012',
      description: 'Leadership in Energy and Environmental Design certification',
      icon: Award,
    },
    {
      id: 3,
      type: 'Experience',
      title: 'Senior Engineer',
      institution: 'AECOM',
      year: '2015-2020',
      description: 'Led major infrastructure projects worth $500M+',
      icon: Briefcase,
    },
    {
      id: 4,
      type: 'Experience',
      title: 'Principal Engineer',
      institution: 'Smith Engineering Group',
      year: '2020-Present',
      description: 'Founding partner specializing in sustainable infrastructure',
      icon: Briefcase,
    },
  ]

  const skills = [
    { name: 'Revit', percentage: 95, icon: Building2, examples: '3D modeling, BIM coordination' },
    { name: 'Geotechnical Analysis', percentage: 90, icon: Shield, examples: 'Soil testing, foundation design' },
    { name: 'Structural Design', percentage: 92, icon: Zap, examples: 'Steel, concrete, timber structures' },
    { name: 'Project Management', percentage: 88, icon: Briefcase, examples: 'Team leadership, scheduling' },
    { name: 'Sustainable Design', percentage: 94, icon: Leaf, examples: 'Green building, LEED projects' },
    { name: 'AutoCAD', percentage: 96, icon: Building2, examples: '2D drafting, technical drawings' },
    { name: 'Construction Oversight', percentage: 89, icon: Shield, examples: 'Quality control, safety' },
    { name: 'Infrastructure Planning', percentage: 91, icon: Globe, examples: 'Urban development, transportation' },
    { name: 'Cost Estimation', percentage: 87, icon: Briefcase, examples: 'Budget planning, value engineering' },
    { name: 'Environmental Impact', percentage: 93, icon: Leaf, examples: 'EIA studies, compliance' },
    { name: 'Risk Assessment', percentage: 85, icon: Shield, examples: 'Safety analysis, mitigation' },
    { name: 'Client Relations', percentage: 90, icon: Users, examples: 'Stakeholder management, presentations' },
  ]

  const interests = [
    {
      title: 'Sustainable Technology',
      description: 'Exploring cutting-edge green building materials and renewable energy integration',
      icon: Leaf,
    },
    {
      title: 'Smart Cities',
      description: 'Developing intelligent infrastructure systems for future urban environments',
      icon: Globe,
    },
    {
      title: 'Innovation in Construction',
      description: 'Advancing construction methodologies through automation and AI integration',
      icon: Zap,
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
                 <div className="absolute inset-0 z-0">
           <Image
             src="/images/hero/about-hero.png"
             alt="Civil engineering site survey and planning"
             fill
             className="object-cover"
             priority
             loading="eager"
           />
           <div className="absolute inset-0 bg-black/60" />
         </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white"
        >
          <h1 className="hero-heading mb-3 heading-accent">Meet <span className="gradient-text">Ayodele</span> Adeyemi</h1>
          <p className="hero-sub text-gray-200">Passionate about building resilient, sustainable infrastructure across Nigeria & Africa</p>
        </motion.div>
      </section>

      {/* Bio Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <AccentShape variant="rings" size={110} className="text-primary/40 absolute -mt-24 right-4 opacity-25" />
          <AccentShape variant="orbits" size={130} className="text-secondary/40 absolute mt-8 -left-6 opacity-15" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="heading-badge">Background</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-8 leading-tight heading-accent">
              My <span className="gradient-text">Engineering Journey</span>
            </h2>
            <div className="text-base md:text-lg text-gray-600 leading-relaxed md:leading-loose space-y-4 md:space-y-6">
              <p>
                My passion for civil engineering began at an early age, fascinated by how structures 
                could shape communities and improve lives. This curiosity evolved into a 15-year career 
                dedicated to creating innovative, sustainable infrastructure solutions that stand the test of time.
              </p>
              <p>
                I believe that great engineering isn't just about solving technical challenges—it's about 
                understanding the human impact of our work. Every bridge, building, and road I design 
                considers environmental sustainability, community needs, and long-term resilience.
              </p>
              <p>
                My approach combines cutting-edge technology with proven engineering principles, always 
                pushing the boundaries of what's possible while maintaining the highest standards of safety 
                and quality. I'm committed to mentoring the next generation of engineers and sharing 
                knowledge that advances our entire industry.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="heading-badge">Timeline</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 md:mb-5 leading-tight heading-accent">
              Professional <span className="gradient-text">Journey</span>
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed md:leading-snug">
              A timeline of key education, certifications, and milestone projects.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-4">
            {timelineData.map((item, index) => {
              const IconComponent = item.icon
              const isExpanded = expandedTimeline === item.id
              
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedTimeline(isExpanded ? null : item.id)}
                    className="w-full p-6 text-left hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm text-primary font-semibold">{item.type}</div>
                          <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
                          <div className="text-gray-600">{item.institution} • {item.year}</div>
                        </div>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </button>
                  
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-6 pb-6 border-t border-gray-100"
                    >
                      <p className="text-gray-600 mt-4">{item.description}</p>
                    </motion.div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="heading-badge">Skills</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 md:mb-5 leading-tight heading-accent">
              Technical <span className="gradient-text">Expertise</span>
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed md:leading-snug">
              Combined design, analysis, and delivery capabilities built through complex project execution.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => {
              const IconComponent = skill.icon
              const level = Math.min(5, Math.max(1, Math.round(skill.percentage / 20)))
              const levelLabel = ['Foundational','Working','Proficient','Advanced','Expert'][level-1]
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  <div className="bg-gray-50 p-6 rounded-xl ring-1 ring-gray-100 hover:ring-primary/30 hover:shadow-md transition-all duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-3 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800 leading-tight">{skill.name}</h3>
                          <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-medium tracking-wide bg-primary/10 text-primary">
                            {levelLabel}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Level Indicator */}
                    <div className="flex items-center space-x-1 mb-4" aria-label={`Skill level: ${levelLabel}`}>
                      {[1,2,3,4,5].map(i => (
                        <div
                          key={i}
                          className="h-2.5 flex-1 rounded-full bg-gradient-to-r from-primary to-secondary"
                        />
                      ))}
                    </div>

                    <p className="text-xs text-gray-600 line-clamp-2">
                      {skill.examples}
                    </p>

                    {/* Tooltip (full examples) */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-10">
                      {skill.examples}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Interests Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="hero-heading mb-3 md:mb-5 text-gray-800 text-center heading-accent">Areas of <span className="gradient-text">Interest</span></h2>
            <p className="paragraph-lead max-w-2xl mx-auto text-center">
              Emerging technologies and innovations shaping resilient, low-impact infrastructure.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {interests.map((interest, index) => {
              const IconComponent = interest.icon
              return (
                <motion.div
                  key={interest.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 ring-1 ring-gray-100"
                >
                  <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center relative">
                    <IconComponent className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 heading-accent">{interest.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto">{interest.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 md:mb-6">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Let's discuss how we can bring your infrastructure vision to life with sustainable, 
              innovative engineering solutions.
            </p>
            <Link href="/services" className="btn-secondary text-lg px-8 py-4 inline-flex items-center">
              Explore My Services
              <ArrowRight className="ml-2 h-6 w-6" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
