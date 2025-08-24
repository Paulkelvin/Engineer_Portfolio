'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, ExternalLink, Download, Play, MapPin, Calendar, DollarSign, Users, Award, Building2, Leaf } from 'lucide-react'
import { useRef, useEffect } from 'react'

const ProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [activeFilter, setActiveFilter] = useState('All')

  // Refs for auto-centering active filter on mobile
  const filterContainerRef = useRef<HTMLDivElement | null>(null)
  const filterRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  const filters = ['All', 'Bridges', 'Buildings', 'Roads', 'Sustainable', 'Infrastructure']

  const projects = [
    {
      id: 1,
      title: 'Third Mainland Bridge Rehabilitation',
      category: 'Bridges',
      tags: ['Bridges', 'Infrastructure'],
  image: '/images/projects/placeholder.png',
      budget: '₦18B',
      timeline: '24 Months',
      team: '45 Engineers',
      location: 'Lagos, Nigeria',
      description: 'Comprehensive rehabilitation of Africa’s busiest bridge corridor, enhancing structural durability and traffic safety while minimizing disruption.',
      problem: 'Progressive deterioration, chloride ingress and bearing fatigue impacting serviceability and safety.',
      solution: 'Applied carbon fiber wrapping, replaced bearings, introduced cathodic protection and optimized traffic phasing.',
      role: 'Lead Structural Engineer',
      challenges: 'Maintaining traffic flow (180k+ vehicles/day) while executing substructure strengthening in a marine environment.',
      outcomes: {
        'Structural Capacity': 'Increased by 35%',
        'Traffic Disruption': 'Reduced by 45%',
        'Design Life': 'Extended 30+ yrs',
        'Budget Variance': '12% under'
      },
  gallery: Array(5).fill('/images/projects/placeholder.png'),
      phases: [
        { name: 'Assessment', duration: '3 months', image: '/images/projects/bridge-inspection.png' },
        { name: 'Design', duration: '6 months', image: '/images/projects/bridge-design.png' },
        { name: 'Construction', duration: '12 months', image: '/images/projects/bridge-construction.png' },
        { name: 'Testing', duration: '3 months', image: '/images/projects/bridge-testing.png' }
      ]
    },
    {
      id: 2,
      title: 'Abuja Green Office Complex',
      category: 'Buildings',
      tags: ['Buildings', 'Sustainable'],
      image: '/images/projects/placeholder.png',
      budget: '₦34B',
      timeline: '18 Months',
      team: '60 Engineers',
      location: 'Abuja, Nigeria',
      description: 'High‑performance commercial hub targeting EDGE/LEED standards with passive cooling, PV integration and smart water reuse.',
      problem: 'Rising cooling loads and water scarcity driving OPEX in emerging business district.',
      solution: 'Optimized orientation, high albedo envelope, hybrid PV + battery microgrid and rain / grey water recycling.',
      role: 'Sustainable Design Lead',
      challenges: 'Balancing capex constraints with lifecycle efficiency gains for mixed tenant profiles.',
      outcomes: {
        'Energy Use Intensity': '-42%',
        'Water Consumption': '-38%',
        'Operational Carbon': '-58%',
        'Green Certification': 'EDGE/LEED Platinum'
      },
      gallery: [
        '/images/projects/placeholder.png',
        '/images/projects/placeholder.png',
        '/images/projects/placeholder.png',
        '/images/projects/placeholder.png',
        '/images/projects/placeholder.png'
      ],
      phases: [
        { name: 'Site Analysis', duration: '2 months', image: '/images/projects/placeholder.png' },
        { name: 'Sustainable Design', duration: '8 months', image: '/images/projects/placeholder.png' },
        { name: 'Construction', duration: '15 months', image: '/images/projects/placeholder.png' },
        { name: 'Certification', duration: '1 month', image: '/images/projects/placeholder.png' }
      ]
    },
    {
      id: 3,
      title: 'Lagos–Ibadan Expressway ITS Upgrade',
      category: 'Roads',
      tags: ['Roads', 'Infrastructure'],
      image: '/images/projects/placeholder.png',
      budget: '₦140B',
      timeline: '36 Months',
      team: '120 Engineers',
      location: 'Ogun / Oyo States, Nigeria',
      description: 'Intelligent transport deployment adding real‑time traffic sensing, variable message signs and incident response integration.',
      problem: 'Severe congestion, crash response delays and limited data for capacity planning.',
      solution: 'Deployed fiber backbone, weigh‑in‑motion, ANPR cameras, central control algorithms and solar backup.',
      role: 'Infrastructure Planning Director',
      challenges: 'Coordinating federal/state concessions while phasing installations under live traffic.',
      outcomes: {
        'Average Speed': '+28%',
        'Incident Clearance': '-40% time',
        'Crash Rate': '-32%',
        'Throughput': '+33%'
      },
      gallery: [
        '/images/projects/placeholder.png',
        '/images/projects/placeholder.png',
        '/images/projects/placeholder.png',
        '/images/projects/placeholder.png',
        '/images/projects/placeholder.png'
      ],
      phases: [
        { name: 'Planning', duration: '6 months', image: '/images/projects/placeholder.png' },
        { name: 'Design', duration: '12 months', image: '/images/projects/placeholder.png' },
        { name: 'Construction', duration: '30 months', image: '/images/projects/placeholder.png' },
        { name: 'Testing', duration: '6 months', image: '/images/projects/placeholder.png' }
      ]
    },
    {
      id: 4,
      title: 'Kano Solar Farm Infrastructure',
      category: 'Sustainable',
      tags: ['Sustainable', 'Infrastructure'],
      image: '/images/projects/placeholder.png',
      budget: '₦58B',
      timeline: '20 Months',
      team: '35 Engineers',
      location: 'Kano, Nigeria',
      description: 'Utility‑scale PV + storage plant leveraging dual‑axis trackers and grid‑stabilizing battery systems.',
      problem: 'Grid instability and unmet industrial demand with rising diesel generation costs.',
      solution: 'Optimized tracker layout, BESS integration and SCADA for dispatchable renewable output.',
      role: 'Renewable Energy Specialist',
      challenges: 'Dust mitigation and harmonic control for grid compliance in arid environment.',
      outcomes: {
        'Capacity Factor': '+18%',
        'Energy Yield': '+33%',
        'Carbon Offset': '55,000 t/yr',
        'Payback': '7.2 years'
      },
      gallery: [
        '/images/projects/placeholder.png',
        '/images/projects/placeholder.png',
        '/images/projects/placeholder.png',
        '/images/projects/placeholder.png',
        '/images/projects/placeholder.png'
      ],
      phases: [
        { name: 'Site Selection', duration: '3 months', image: '/images/projects/placeholder.png' },
        { name: 'System Design', duration: '6 months', image: '/images/projects/placeholder.png' },
        { name: 'Installation', duration: '14 months', image: '/images/projects/placeholder.png' },
        { name: 'Commissioning', duration: '3 months', image: '/images/projects/placeholder.png' }
      ]
    },
    {
      id: 5,
      title: 'Lagos Blue Line Underground Station',
      category: 'Infrastructure',
      tags: ['Infrastructure', 'Buildings'],
      image: '/images/projects/placeholder.png',
      budget: '₦250B',
      timeline: '48 Months',
      team: '85 Engineers',
      location: 'Lagos, Nigeria',
      description: 'Underground mass transit station integrating natural ventilation stacks and advanced egress modelling.',
      problem: 'Capacity shortfalls and evacuation bottlenecks in expanding urban rail network.',
      solution: 'Implemented deep diaphragm walls, smoke management CFD and optimized passenger circulation.',
      role: 'Tunnel Engineering Lead',
      challenges: 'Challenging water table and adjacent heritage structures during excavation.',
      outcomes: {
        'Passenger Capacity': '+55%',
        'Safety Compliance': '+22%',
        'Schedule Performance': '2 months early',
        'Cost Efficiency': '15% under'
      },
      gallery: [
        '/images/projects/placeholder.png',
        '/images/projects/placeholder.png',
        '/images/projects/placeholder.png',
        '/images/projects/placeholder.png',
        '/images/projects/placeholder.png'
      ],
      phases: [
        { name: 'Geotechnical', duration: '4 months', image: '/images/projects/placeholder.png' },
        { name: 'Tunnel Design', duration: '10 months', image: '/images/projects/placeholder.png' },
        { name: 'Excavation', duration: '24 months', image: '/images/projects/placeholder.png' },
        { name: 'Station Build', duration: '18 months', image: '/images/projects/placeholder.png' }
      ]
    },
    {
      id: 6,
      title: 'Lekki Coastal Protection System',
      category: 'Infrastructure',
      tags: ['Infrastructure', 'Sustainable'],
      image: '/images/projects/placeholder.png',
      budget: '₦72B',
      timeline: '28 Months',
      team: '55 Engineers',
      location: 'Lagos, Nigeria',
      description: 'Hybrid grey-green defence system integrating revetments, dune nourishment and artificial reef modules.',
      problem: 'Accelerated erosion and surge risk threatening shoreline assets.',
      solution: 'Combined geotextile tubes, reef attenuation and dune restoration with monitoring.',
      role: 'Coastal Engineering Specialist',
      challenges: 'Balancing property protection with public access and ecosystem integrity.',
      outcomes: {
        'Storm Attenuation': '+65%',
        'Erosion Reduction': '-78%',
        'Habitat Impact': 'Minimized 55%',
        'Public Access': 'Maintained'
      },
      gallery: [
        '/images/projects/placeholder.png',
        '/images/projects/placeholder.png',
        '/images/projects/placeholder.png',
        '/images/projects/placeholder.png',
        '/images/projects/placeholder.png'
      ],
      phases: [
        { name: 'Assessment', duration: '4 months', image: '/images/projects/placeholder.png' },
        { name: 'Design', duration: '8 months', image: '/images/projects/placeholder.png' },
        { name: 'Construction', duration: '20 months', image: '/images/projects/placeholder.png' },
        { name: 'Monitoring', duration: '4 months', image: '/images/projects/placeholder.png' }
      ]
    },
    {
      id: 7,
      title: 'National Sports Stadium Complex',
      category: 'Buildings',
      tags: ['Buildings', 'Infrastructure'],
      image: '/images/projects/placeholder.png',
      budget: '₦480B',
      timeline: '42 Months',
      team: '95 Engineers',
      location: 'Abuja, Nigeria',
      description: 'Multi‑purpose arena with retractable roof, modular seating and integrated evacuation analytics.',
      problem: 'Demand for flexible national venue balancing acoustics, comfort and rapid turnover.',
      solution: 'Engineered long‑span trusses, adaptive roof kinematics and crowd flow simulation.',
      role: 'Structural Design Lead',
      challenges: 'Precision roof mechanics and large-span vibration control.',
      outcomes: {
        'Seating Capacity': '65,000',
        'Roof Operation': '15 min',
        'Evacuation Time': '< 8 min',
        'Acoustic Performance': '+28% over baseline'
      },
      gallery: [
        '/images/projects/placeholder.png',
        '/images/projects/placeholder.png',
        '/images/projects/placeholder.png',
        '/images/projects/placeholder.png',
        '/images/projects/placeholder.png'
      ],
      phases: [
        { name: 'Concept Design', duration: '6 months', image: '/images/projects/placeholder.png' },
        { name: 'Detailed Design', duration: '12 months', image: '/images/projects/placeholder.png' },
        { name: 'Construction', duration: '36 months', image: '/images/projects/placeholder.png' },
        { name: 'Testing', duration: '6 months', image: '/images/projects/placeholder.png' }
      ]
    },
    {
      id: 8,
      title: 'Port Harcourt Water Treatment Plant',
      category: 'Infrastructure',
      tags: ['Infrastructure', 'Sustainable'],
      image: '/images/projects/placeholder.png',
      budget: '₦210B',
      timeline: '38 Months',
      team: '70 Engineers',
      location: 'Port Harcourt, Nigeria',
      description: 'Advanced membrane filtration and energy recovery facility boosting potable supply resilience.',
      problem: 'Aging assets and demand growth exceeding safe yield capacity.',
      solution: 'Installed ultrafiltration trains, biogas CHP and digital water quality monitoring.',
      role: 'Water Systems Engineer',
      challenges: 'Brownfield tie‑ins while maintaining uninterrupted service.',
      outcomes: {
        'Water Quality': '↑ 95%',
        'Energy Efficiency': '+40%',
        'Capacity': '2x',
        'OPEX': '-25%'
      },
      gallery: [
        '/images/projects/placeholder.png',
        '/images/projects/placeholder.png',
        '/images/projects/placeholder.png',
        '/images/projects/placeholder.png',
        '/images/projects/placeholder.png'
      ],
      phases: [
        { name: 'Assessment', duration: '3 months', image: '/images/projects/placeholder.png' },
        { name: 'Process Design', duration: '8 months', image: '/images/projects/placeholder.png' },
        { name: 'Construction', duration: '30 months', image: '/images/projects/placeholder.png' },
        { name: 'Commissioning', duration: '5 months', image: '/images/projects/placeholder.png' }
      ]
    }
  ]

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.tags.includes(activeFilter))

  const nextImage = () => {
    if (selectedProject) {
      const project = projects.find(p => p.id === selectedProject)
      if (project) {
        setCurrentImageIndex((prev) => (prev + 1) % project.gallery.length)
      }
    }
  }

  const prevImage = () => {
    if (selectedProject) {
      const project = projects.find(p => p.id === selectedProject)
      if (project) {
        setCurrentImageIndex((prev) => (prev - 1 + project.gallery.length) % project.gallery.length)
      }
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Bridges': return Building2
      case 'Buildings': return Building2
      case 'Roads': return MapPin
      case 'Sustainable': return Leaf
      case 'Infrastructure': return Building2
      default: return Building2
    }
  }

  const getFilterIcon = (filter: string) => {
    if (filter === 'All') return Award
    return getCategoryIcon(filter)
  }

  // Auto-scroll active filter into center on mobile
  useEffect(() => {
    if (typeof window === 'undefined') return
    const btn = filterRefs.current[activeFilter]
    if (btn && filterContainerRef.current) {
      btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
    }
  }, [activeFilter])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
                 <div className="absolute inset-0 z-0">
           <Image
             src="/images/hero/projects-hero.png"
             alt="Civil engineering projects showcase"
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
          <h1 className="hero-heading mb-3 md:mb-4 heading-accent">My <span className="gradient-text">Project</span> Portfolio</h1>
          <p className="hero-sub text-gray-200 max-w-3xl mx-auto">
            Showcasing innovative engineering solutions that transform communities and build sustainable futures
          </p>
        </motion.div>
      </section>

      {/* Filter Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 md:mb-3">
              Project Portfolio
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4 md:mb-8">
              Explore my diverse engineering work across bridges, transport, energy, and infrastructure in Nigeria
            </p>
            
            {/* Filter Controls */}
            {/* Mobile: horizontal scrollable pill bar */}
            <div className="md:hidden relative -mx-4 px-4">
              <div className="pointer-events-none absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-white to-transparent" />
              <div className="pointer-events-none absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-white to-transparent" />
              <div
                ref={filterContainerRef}
                className="flex overflow-x-auto no-scrollbar space-x-3 snap-x snap-mandatory py-1"
                role="tablist"
                aria-label="Project categories"
              >
                {filters.map((filter) => {
                  const Icon = getFilterIcon(filter)
                  const active = activeFilter === filter
                  return (
                    <button
                      key={filter}
                      ref={(el) => { filterRefs.current[filter] = el }}
                      onClick={() => setActiveFilter(filter)}
                      role="tab"
                      aria-selected={active}
                      className={`snap-start flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${active ? 'bg-primary text-white shadow-lg scale-[1.03]' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:scale-95'}`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{filter}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Desktop: centered multi-line pills */}
            <div className="hidden md:flex flex-wrap justify-center gap-3">
              {filters.map((filter) => {
                const active = activeFilter === filter
                return (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${active ? 'bg-primary text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    {filter}
                  </button>
                )
              })}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="wait">
              {filteredProjects.map((project, index) => {
                const IconComponent = getCategoryIcon(project.category)
                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="card group cursor-pointer overflow-hidden"
                    onClick={() => setSelectedProject(project.id)}
                  >
                    <div className="relative overflow-hidden">
                      <Image
                        src={project.image}
                        alt={`${project.title} project`}
                        width={400}
                        height={300}
                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute top-4 left-4">
                        <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg">
                          <IconComponent className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium text-gray-800">{project.category}</span>
                        </div>
                      </div>
                      <div className="absolute top-4 right-4">
                        <div className="bg-primary/90 text-white px-3 py-1 rounded-lg text-sm font-medium">
                          {project.budget}
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-primary transition-colors duration-200">
                        {project.title}
                      </h3>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>{project.timeline}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Users className="h-4 w-4" />
                          <span>{project.team}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span>{project.location}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <DollarSign className="h-4 w-4" />
                          <span>{project.budget}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {project.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2">
                          {project.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <button className="text-primary font-semibold hover:text-blue-700 transition-colors duration-200">
                          View Details →
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl max-w-7xl w-full max-h-[95vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-3xl font-bold text-gray-800">
                    {projects.find(p => p.id === selectedProject)?.title}
                  </h2>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  >
                    <X className="h-6 w-6 text-gray-600" />
                  </button>
                </div>

                {selectedProject && (
                  <div className="space-y-8">
                    {/* Project Overview */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Project Overview</h3>
                        <p className="text-gray-600 leading-relaxed mb-6">
                          {projects.find(p => p.id === selectedProject)?.description}
                        </p>
                        
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-2xl font-bold text-primary">
                              {projects.find(p => p.id === selectedProject)?.budget}
                            </div>
                            <div className="text-sm text-gray-600">Budget</div>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-2xl font-bold text-secondary">
                              {projects.find(p => p.id === selectedProject)?.timeline}
                            </div>
                            <div className="text-sm text-gray-600">Timeline</div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Project Details</h3>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-gray-800">Problem Statement</h4>
                            <p className="text-gray-600">{projects.find(p => p.id === selectedProject)?.problem}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">Innovative Solution</h4>
                            <p className="text-gray-600">{projects.find(p => p.id === selectedProject)?.solution}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">My Role</h4>
                            <p className="text-gray-600">{projects.find(p => p.id === selectedProject)?.role}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">Key Challenges</h4>
                            <p className="text-gray-600">{projects.find(p => p.id === selectedProject)?.challenges}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Project Gallery */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">Project Gallery</h3>
                      <div className="relative">
                        <div className="relative h-96 rounded-xl overflow-hidden">
                          <Image
                            src={projects.find(p => p.id === selectedProject)?.gallery[currentImageIndex] || ''}
                            alt={`Project gallery image ${currentImageIndex + 1}`}
                            fill
                            className="object-cover"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-black/20" />
                          
                          {/* Navigation Arrows */}
                          <button
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors duration-200"
                          >
                            <ChevronLeft className="h-6 w-6 text-gray-600" />
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors duration-200"
                          >
                            <ChevronRight className="h-6 w-6 text-gray-600" />
                          </button>
                        </div>
                        
                        {/* Thumbnail Navigation */}
                        <div className="flex space-x-2 mt-4 overflow-x-auto">
                          {projects.find(p => p.id === selectedProject)?.gallery.map((image, idx) => (
                            <button
                              key={idx}
                              onClick={() => setCurrentImageIndex(idx)}
                              className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden ${
                                idx === currentImageIndex ? 'ring-2 ring-primary' : ''
                              }`}
                            >
                              <Image
                                src={image}
                                alt={`Thumbnail ${idx + 1}`}
                                width={80}
                                height={64}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Project Outcomes */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">Quantified Outcomes</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Object.entries(projects.find(p => p.id === selectedProject)?.outcomes || {}).map(([key, value]) => (
                          <div key={key} className="bg-gradient-to-br from-primary/10 to-secondary/10 p-4 rounded-lg text-center">
                            <div className="text-2xl font-bold text-primary mb-1">{value}</div>
                            <div className="text-sm text-gray-600">{key}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Project Phases */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">Project Timeline</h3>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {projects.find(p => p.id === selectedProject)?.phases.map((phase, idx) => (
                          <div key={idx} className="text-center">
                            <div className="relative mb-4">
                              <Image
                                src={phase.image}
                                alt={`${phase.name} phase`}
                                width={200}
                                height={150}
                                className="w-full h-32 object-cover rounded-lg"
                                loading="lazy"
                              />
                              <div className="absolute top-2 left-2 bg-primary text-white px-2 py-1 rounded text-xs font-medium">
                                Phase {idx + 1}
                              </div>
                            </div>
                            <h4 className="font-semibold text-gray-800 mb-1">{phase.name}</h4>
                            <p className="text-sm text-gray-600">{phase.duration}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 3D Model Placeholder */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">3D Model Viewer</h3>
                      <div className="bg-gray-100 rounded-lg p-8 text-center">
                        <div className="text-gray-500 mb-4">
                          <Building2 className="h-16 w-16 mx-auto" />
                        </div>
                        <p className="text-gray-600 mb-4">
                          Interactive 3D model viewer would be embedded here
                        </p>
                        <p className="text-sm text-gray-500">
                          (Placeholder for Sketchfab, Forge Viewer, or similar 3D visualization tool)
                        </p>
                      </div>
                    </div>

                    {/* Additional Resources */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">Additional Resources</h3>
                      <div className="flex space-x-4">
                        <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                          <Download className="h-4 w-4" />
                          <span>Download Case Study</span>
                        </button>
                        <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                          <Play className="h-4 w-4" />
                          <span>Watch Video</span>
                        </button>
                        <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                          <ExternalLink className="h-4 w-4" />
                          <span>View Documentation</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ProjectsPage
