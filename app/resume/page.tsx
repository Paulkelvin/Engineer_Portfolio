'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'
import { ChevronDown, ChevronUp, Download, Mail, Phone, MapPin, Linkedin, Github, Award, GraduationCap, Briefcase, Building2, Leaf, Zap, Shield } from 'lucide-react'

const ResumePage = () => {
  const [expandedExperience, setExpandedExperience] = useState<number | null>(null)

  const experience = [
    {
      id: 1,
      title: 'Principal Engineer & Founding Partner',
      company: 'Smith Engineering Group',
      period: '2020 - Present',
      location: 'New York, NY',
      achievements: [
        'Led 15+ major infrastructure projects worth $2.5B+',
        'Reduced project costs by 20% through innovative design solutions',
        'Achieved 100% client satisfaction rate across all projects',
        'Mentored 25+ junior engineers and established best practices'
      ],
      metrics: {
        'Projects Delivered': '15+',
        'Total Value': '$2.5B+',
        'Cost Savings': '20%',
        'Client Satisfaction': '100%'
      }
    },
    {
      id: 2,
      title: 'Senior Structural Engineer',
      company: 'AECOM',
      period: '2015 - 2020',
      location: 'New York, NY',
      achievements: [
        'Managed structural design for 8 high-rise buildings and 3 major bridges',
        'Implemented BIM workflows reducing design time by 30%',
        'Led seismic retrofit projects improving safety ratings by 40%',
        'Collaborated with international teams on $500M+ projects'
      ],
      metrics: {
        'Buildings Designed': '8',
        'Bridges Designed': '3',
        'Design Efficiency': '+30%',
        'Safety Improvement': '40%'
      }
    },
    {
      id: 3,
      title: 'Project Engineer',
      company: 'Turner Construction',
      period: '2012 - 2015',
      location: 'Boston, MA',
      achievements: [
        'Oversaw construction of 5 commercial buildings and 2 hospitals',
        'Managed $150M+ in construction value with zero safety incidents',
        'Coordinated multi-disciplinary teams of 50+ professionals',
        'Reduced project delays by 25% through improved scheduling'
      ],
      metrics: {
        'Projects Managed': '7',
        'Construction Value': '$150M+',
        'Safety Record': '0 Incidents',
        'Delay Reduction': '25%'
      }
    },
    {
      id: 4,
      title: 'Design Engineer',
      company: 'HNTB Corporation',
      period: '2010 - 2012',
      location: 'Chicago, IL',
      achievements: [
        'Designed structural elements for 3 major highway interchanges',
        'Developed innovative foundation solutions saving $2M+',
        'Created standardized design templates improving efficiency by 35%',
        'Participated in LEED certification process for sustainable projects'
      ],
      metrics: {
        'Interchanges Designed': '3',
        'Cost Savings': '$2M+',
        'Efficiency Gain': '35%',
        'LEED Projects': '5+'
      }
    }
  ]

  const education = [
    {
      degree: 'Master of Science in Civil Engineering',
      school: 'Massachusetts Institute of Technology',
      year: '2010',
      gpa: '3.9/4.0',
      focus: 'Structural Engineering & Sustainable Design',
      icon: GraduationCap
    },
    {
      degree: 'Bachelor of Science in Civil Engineering',
      school: 'University of Illinois at Urbana-Champaign',
      year: '2008',
      gpa: '3.8/4.0',
      focus: 'Structural Analysis & Construction Management',
      icon: GraduationCap
    }
  ]

  const certifications = [
    {
      name: 'LEED Accredited Professional (BD+C)',
      issuer: 'US Green Building Council',
      year: '2012',
      icon: Leaf
    },
    {
      name: 'Professional Engineer (PE)',
      issuer: 'New York State',
      year: '2013',
      icon: Building2
    },
    {
      name: 'Structural Engineer (SE)',
      issuer: 'Illinois State',
      year: '2014',
      icon: Shield
    },
    {
      name: 'Project Management Professional (PMP)',
      issuer: 'Project Management Institute',
      year: '2016',
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
      title: 'Engineer of the Year',
      organization: 'American Society of Civil Engineers',
      year: '2022',
      description: 'Recognized for outstanding contributions to sustainable infrastructure development',
      image: '/images/projects/placeholder.png'
    },
    {
      title: 'Excellence in Design',
      organization: 'Structural Engineers Association',
      year: '2021',
      description: 'Awarded for innovative bridge design incorporating sustainable materials',
      image: '/images/projects/placeholder.png'
    },
    {
      title: 'Sustainability Champion',
      organization: 'Green Building Council',
      year: '2020',
      description: 'Honored for leadership in implementing LEED standards across multiple projects',
      image: '/images/projects/placeholder.png'
    },
    {
      title: 'Young Engineer Achievement',
      organization: 'Engineering News-Record',
      year: '2019',
      description: 'Recognized as one of the top 20 young engineers under 35',
      image: '/images/projects/placeholder.png'
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
      <section className="section-padding bg-white">
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
              className="mb-12"
            >
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
                              <div className="text-gray-600 text-sm">{edu.year} • GPA: {edu.gpa}</div>
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
                        <div className="flex items-center space-x-1 mb-3" aria-label={`Skill level: ${levelLabel}`}>
                          {[1,2,3,4,5].map(i => (
                            <div key={i} className={`h-2.5 flex-1 rounded-full ${i <= (skill.level||1) ? 'bg-gradient-to-r from-primary to-secondary' : 'bg-gray-200'}`} />
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
