'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'
import { ChevronDown, ChevronUp, Download, Mail, Phone, MapPin, Linkedin, Github, Award, GraduationCap, Briefcase, Building2, Leaf, Zap, Shield } from 'lucide-react'
import AccentShape from '@/components/decor/AccentShape'

const ResumePage = () => {
  const [expandedExperience, setExpandedExperience] = useState<number | null>(null)

  const experience = [
    {
      id: 1,
      title: 'Principal Engineer & Managing Partner',
      company: 'Apex Infrastructure Consults',
      period: '2020 - Present',
      location: 'Lagos, Nigeria',
      achievements: [
        'Delivered 25+ transport, energy & water infrastructure projects worth ₦1.2T+',
        'Achieved average 14% capex savings through value engineering & lifecycle optimization',
        'Maintained 98% client retention rate across PPP & EPC engagements',
        'Established digital QA/QC workflows and mentored 30+ junior engineers'
      ],
      metrics: {
        'Projects Delivered': '25+',
        'Total Value': '₦1.2T+',
        'Avg Savings': '14%',
        'Client Retention': '98%'
      }
    },
    {
      id: 2,
      title: 'Senior Structural Engineer',
      company: 'GeoMatrix Engineering',
      period: '2015 - 2020',
      location: 'Abuja, Nigeria',
      achievements: [
        'Led structural design for 10 mid/high-rise buildings & 4 bridge rehabilitations',
        'Implemented BIM CDE reducing coordination clashes by 35%',
        'Introduced progressive collapse checks improving safety margins by 25%',
        'Supported delivery of ₦300B+ combined project value'
      ],
      metrics: {
        'Buildings Designed': '10',
        'Bridges Rehabilitated': '4',
        'Coordination Efficiency': '+35%',
        'Safety Improvement': '+25%'
      }
    },
    {
      id: 3,
      title: 'Project Engineer',
      company: 'Continental Builders Nigeria',
      period: '2012 - 2015',
      location: 'Port Harcourt, Nigeria',
      achievements: [
        'Oversaw delivery of 6 commercial facilities and 2 specialized healthcare structures',
        'Managed ₦120B+ cumulative construction value with zero lost-time incidents',
        'Coordinated multidisciplinary teams of 60+ professionals',
        'Reduced schedule overruns by 22% via critical path optimization'
      ],
      metrics: {
        'Projects Managed': '8',
        'Construction Value': '₦120B+',
        'Safety Record': '0 LTI',
        'Delay Reduction': '22%'
      }
    },
    {
      id: 4,
      title: 'Design Engineer',
      company: 'Westbridge Consulting',
      period: '2010 - 2012',
      location: 'Enugu, Nigeria',
      achievements: [
        'Produced structural packages for 2 interchange upgrades & 3 pedestrian bridges',
        'Optimized foundation systems saving ₦1.6B+',
        'Standardized design templates increasing efficiency 30%',
        'Supported early adoption of green building benchmarks'
      ],
      metrics: {
        'Interchanges': '2',
        'Cost Savings': '₦1.6B+',
        'Efficiency Gain': '30%',
        'Green Projects': '4+'
      }
    }
  ]

  const education = [
    {
      degree: 'Master of Engineering (Civil)',
      school: 'University of Lagos (UNILAG)',
      year: '2010',
      focus: 'Structural Engineering & Sustainable Systems',
      icon: GraduationCap
    },
    {
      degree: 'Bachelor of Engineering (Civil)',
      school: 'Ahmadu Bello University (ABU Zaria)',
      year: '2008',
      focus: 'Structural Analysis & Project Delivery',
      icon: GraduationCap
    }
  ]

  const certifications = [
    {
      name: 'COREN Registered Engineer',
      issuer: 'Council for the Regulation of Engineering in Nigeria',
      year: '2013',
      icon: Leaf
    },
    {
      name: 'Nigerian Society of Engineers (NSE) Corporate Member',
      issuer: 'NSE',
      year: '2012',
      icon: Building2
    },
    {
      name: 'Project Management Professional (PMP)',
      issuer: 'PMI',
      year: '2016',
      icon: Shield
    },
    {
      name: 'EDGE Expert (Green Building)',
      issuer: 'IFC',
      year: '2021',
      icon: Briefcase
    }
  ]

  const skills = [
    { name: 'Structural Design', level: 5, icon: Building2, category: 'Technical', examples: 'Steel, concrete, composite systems' },
    { name: 'BIM Modeling', level: 5, icon: Zap, category: 'Technical', examples: 'Revit coordination, clash detection' },
    { name: 'Project Management', level: 4, icon: Briefcase, category: 'Management', examples: 'Scheduling, stakeholder alignment' },
    { name: 'Sustainable Design', level: 5, icon: Leaf, category: 'Technical', examples: 'Energy modeling, water efficiency' },
    { name: 'Geotechnical Analysis', level: 4, icon: Shield, category: 'Technical', examples: 'Soil mechanics, foundation design' },
    { name: 'AutoCAD / Revit', level: 5, icon: Building2, category: 'Software', examples: '2D drafting, parametric families' },
    { name: 'Team Leadership', level: 4, icon: Briefcase, category: 'Management', examples: 'Mentoring, performance culture' },
    { name: 'Cost Estimation', level: 4, icon: Briefcase, category: 'Management', examples: 'Value engineering, budgeting' }
  ]

  const awards = [
    {
      title: 'Engineering Excellence Award',
      organization: 'Nigerian Society of Engineers',
      year: '2022',
      description: 'Recognized for outstanding leadership in sustainable infrastructure delivery',
      image: '/images/awards/engineering-award.png'
    },
    {
      title: 'Structural Innovation Award',
      organization: 'Council of Registered Engineers',
      year: '2021',
      description: 'Awarded for innovative long-span bridge and materials optimization',
      image: '/images/awards/design-award.png'
    },
    {
      title: 'Sustainability Champion',
      organization: 'Green Building Council Nigeria',
      year: '2020',
      description: 'Honored for advancing green building adoption across multiple urban projects',
      image: '/images/awards/sustainability-award.png'
    },
    {
      title: 'Young Engineer Achievement',
      organization: 'National Engineering Forum',
      year: '2019',
      description: 'Recognized among top emerging engineers under 35 for innovation impact',
      image: '/images/awards/achievement-award.png'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/resume-hero.png"
            alt="Professional resume background"
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
          <h1 className="hero-heading mb-3 md:mb-4">Professional Resume</h1>
          <p className="hero-sub text-gray-200">Comprehensive overview of my engineering career and achievements</p>
        </motion.div>
      </section>

      {/* Resume Content */}
      <section className="section-padding bg-white relative">
        <AccentShape variant="rings" size={120} className="text-primary/40 absolute -top-10 left-2 opacity-20" />
        <AccentShape variant="orbits" size={140} className="text-secondary/40 absolute top-1/2 -right-8 opacity-15" />
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-primary/10 to-secondary/10 p-8 rounded-2xl mb-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                <div className="text-center md:text-left">
                  <Image
                    src="/images/profile/headshot.png"
                    alt="Professional headshot"
                    width={150}
                    height={150}
                    className="rounded-full mx-auto md:mx-0 shadow-lg"
                    loading="lazy"
                  />
                </div>
                
                <div className="md:col-span-2 text-center md:text-left">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">Ayodele Adeyemi, COREN, NSE</h2>
                  <p className="text-xl text-gray-600 mb-6">
                    Principal Civil Engineer with 15+ years of experience in innovative infrastructure solutions, 
                    sustainable design, and project management. Specializing in structural engineering, 
                    green building practices, and complex infrastructure development.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center justify-center md:justify-start space-x-2">
                      <Mail className="h-4 w-4 text-primary" />
                      <span className="text-gray-600">ayodele.adeyemi@engineering.ng</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start space-x-2">
                      <Phone className="h-4 w-4 text-primary" />
                      <span className="text-gray-600">+234 803 123 4567</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start space-x-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="text-gray-600">Lagos, Nigeria</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            {/* Experience Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12 relative"
            >
              <AccentShape variant="grid-dots" size={80} className="text-primary/40 absolute -top-6 -left-4 opacity-25" />
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Briefcase className="h-6 w-6 text-primary mr-3" />
                Professional Experience
              </h3>
              
              <div className="space-y-4">
                {experience.map((exp, index) => {
                  const isExpanded = expandedExperience === exp.id
                  return (
                    <motion.div
                      key={exp.id}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-gray-50 rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedExperience(isExpanded ? null : exp.id)}
                        className="w-full p-6 text-left hover:bg-gray-100 transition-colors duration-200"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-lg font-bold text-gray-800">{exp.title}</h4>
                              <div className="text-sm text-gray-500">{exp.period}</div>
                            </div>
                            <div className="text-primary font-semibold mb-1">{exp.company}</div>
                            <div className="text-gray-600 text-sm">{exp.location}</div>
                          </div>
                          {isExpanded ? (
                            <ChevronUp className="h-5 w-5 text-gray-400 ml-4" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-400 ml-4" />
                          )}
                        </div>
                      </button>
                      
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="px-6 pb-6 border-t border-gray-200"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                            <div>
                              <h5 className="font-semibold text-gray-800 mb-3">Key Achievements</h5>
                              <ul className="space-y-2">
                                {exp.achievements.map((achievement, idx) => (
                                  <li key={idx} className="flex items-start space-x-2 text-gray-600">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <span>{achievement}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div>
                              <h5 className="font-semibold text-gray-800 mb-3">Quantified Impact</h5>
                              <div className="grid grid-cols-2 gap-3">
                                {Object.entries(exp.metrics).map(([key, value]) => (
                                  <div key={key} className="bg-white p-3 rounded-lg text-center">
                                    <div className="text-lg font-bold text-primary">{value}</div>
                                    <div className="text-xs text-gray-600">{key}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Education & Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <AccentShape variant="triangles" size={90} className="text-secondary/50 absolute -top-6 right-2 opacity-25" />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Education */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <GraduationCap className="h-6 w-6 text-primary mr-3" />
                    Education
                  </h3>
                  
                  <div className="space-y-4">
                    {education.map((edu, index) => {
                      const IconComponent = edu.icon
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="bg-gray-50 p-4 rounded-lg"
                        >
                          <div className="flex items-start space-x-3">
                            <IconComponent className="h-6 w-6 text-primary mt-1" />
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-800">{edu.degree}</h4>
                              <div className="text-primary font-medium">{edu.school}</div>
                              <div className="text-gray-600 text-sm">{edu.year}</div>
                              <div className="text-gray-500 text-sm">{edu.focus}</div>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>

                {/* Certifications */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <Award className="h-6 w-6 text-primary mr-3" />
                    Certifications
                  </h3>
                  
                  <div className="space-y-4">
                    {certifications.map((cert, index) => {
                      const IconComponent = cert.icon
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="bg-gray-50 p-4 rounded-lg"
                        >
                          <div className="flex items-start space-x-3">
                            <IconComponent className="h-6 w-6 text-primary mt-1" />
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-800">{cert.name}</h4>
                              <div className="text-primary font-medium">{cert.issuer}</div>
                              <div className="text-gray-600 text-sm">{cert.year}</div>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Skills Section - Redesigned */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <AccentShape variant="orbits" size={110} className="text-primary/30 absolute -top-8 left-1/2 -translate-x-1/2 opacity-25" />
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Technical Skills & Expertise</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {skills.map((skill, index) => {
                  const IconComponent = skill.icon
                  const labels = ['Foundational','Working','Proficient','Advanced','Expert']
                  const levelLabel = labels[(skill.level || 1) - 1]
                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className="group"
                    >
                      <div className="bg-gray-50 p-6 rounded-xl ring-1 ring-gray-100 hover:ring-primary/30 hover:shadow-md transition-all duration-300">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="p-3 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10">
                              <IconComponent className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-800 leading-tight">{skill.name}</h4>
                              <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-medium tracking-wide bg-primary/10 text-primary">{levelLabel}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1 mb-3" aria-label={`Skill level: Expert`}>
                          {[1,2,3,4,5].map(i => (
                            <div key={i} className="h-2.5 flex-1 rounded-full bg-gradient-to-r from-primary to-secondary" />
                          ))}
                        </div>
                        <p className="text-xs text-gray-600 line-clamp-2">{skill.examples}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Awards Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <AccentShape variant="rings" size={100} className="text-secondary/40 absolute -top-10 left-4 opacity-25" />
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Awards & Recognition</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {awards.map((award, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-xl"
                  >
                    <div className="flex items-start space-x-4">
                      <Image
                        src={award.image}
                        alt={`${award.title} award`}
                        width={80}
                        height={80}
                        className="rounded-lg flex-shrink-0"
                        loading="lazy"
                      />
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-800 mb-2">{award.title}</h4>
                        <div className="text-primary font-medium mb-1">{award.organization}</div>
                        <div className="text-gray-600 text-sm mb-2">{award.year}</div>
                        <p className="text-gray-600 text-sm">{award.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Download CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
                              <button className="btn-primary text-lg px-8 py-4">
                  <Download className="mr-2 h-6 w-6" />
                  Download PDF Resume
                </button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ResumePage
