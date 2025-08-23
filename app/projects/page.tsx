'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, ExternalLink, Download, Play, MapPin, Calendar, DollarSign, Users, Award, Building2, Leaf } from 'lucide-react'

const ProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [activeFilter, setActiveFilter] = useState('All')

  const filters = ['All', 'Bridges', 'Buildings', 'Roads', 'Sustainable', 'Infrastructure']

  const projects = [
    {
      id: 1,
      title: 'Hudson River Bridge Renovation',
      category: 'Bridges',
      tags: ['Bridges', 'Infrastructure'],
  image: '/images/projects/placeholder.png',
      budget: '$25M',
      timeline: '24 Months',
      team: '45 Engineers',
      location: 'New York, NY',
      description: 'Complete renovation of a historic bridge spanning the Hudson River, incorporating modern seismic retrofitting while preserving architectural heritage.',
      problem: 'Aging infrastructure with seismic vulnerabilities and deteriorating structural elements.',
      solution: 'Implemented innovative carbon fiber reinforcement, seismic isolation bearings, and corrosion-resistant materials.',
      role: 'Lead Structural Engineer',
      challenges: 'Working within strict historical preservation guidelines while meeting modern safety standards.',
      outcomes: {
        'Seismic Rating': 'Improved from D to A',
        'Load Capacity': 'Increased by 40%',
        'Lifespan': 'Extended by 50+ years',
        'Cost Savings': '25% under budget'
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
      title: 'Green Office Complex',
      category: 'Buildings',
      tags: ['Buildings', 'Sustainable'],
      image: '/images/projects/placeholder.png',
      budget: '$45M',
      timeline: '18 Months',
      team: '60 Engineers',
      location: 'San Francisco, CA',
      description: 'LEED Platinum certified office complex featuring advanced sustainable technologies, green roofs, and renewable energy integration.',
      problem: 'Need for large-scale commercial development with minimal environmental impact in a dense urban area.',
      solution: 'Designed with passive solar principles, rainwater harvesting, and integrated renewable energy systems.',
      role: 'Sustainable Design Lead',
      challenges: 'Balancing sustainability goals with commercial viability and tenant requirements.',
      outcomes: {
        'Energy Efficiency': 'Reduced by 40%',
        'Water Usage': 'Decreased by 35%',
        'Carbon Footprint': 'Offset by 60%',
        'LEED Score': '95/100 points'
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
      title: 'Smart Highway System',
      category: 'Roads',
      tags: ['Roads', 'Infrastructure'],
      image: '/images/projects/placeholder.png',
      budget: '$180M',
      timeline: '36 Months',
      team: '120 Engineers',
      location: 'Los Angeles, CA',
      description: 'Intelligent transportation system with embedded sensors, dynamic traffic management, and autonomous vehicle infrastructure.',
      problem: 'Chronic traffic congestion and outdated transportation infrastructure unable to handle growing urban mobility demands.',
      solution: 'Implemented smart traffic signals, embedded sensors, and dedicated autonomous vehicle lanes with real-time data analytics.',
      role: 'Infrastructure Planning Director',
      challenges: 'Coordinating multiple stakeholders, managing extensive utility relocations, and ensuring minimal disruption during construction.',
      outcomes: {
        'Traffic Flow': 'Improved by 35%',
        'Travel Time': 'Reduced by 25%',
        'Safety': 'Accidents decreased by 30%',
        'Capacity': 'Increased by 50%'
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
      title: 'Solar Farm Infrastructure',
      category: 'Sustainable',
      tags: ['Sustainable', 'Infrastructure'],
      image: '/images/projects/placeholder.png',
      budget: '$75M',
      timeline: '20 Months',
      team: '35 Engineers',
      location: 'Phoenix, AZ',
      description: 'Large-scale solar energy facility with innovative tracking systems and energy storage integration.',
      problem: 'Need for renewable energy infrastructure to meet growing electricity demands while reducing carbon emissions.',
      solution: 'Designed dual-axis solar tracking system with battery storage and smart grid integration for optimal energy production.',
      role: 'Renewable Energy Specialist',
      challenges: 'Optimizing panel placement for maximum efficiency while managing environmental impact and land use.',
      outcomes: {
        'Energy Production': 'Increased by 45%',
        'Efficiency': 'Improved by 30%',
        'Carbon Offset': '50,000 tons/year',
        'ROI': 'Achieved in 8 years'
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
      title: 'Underground Metro Station',
      category: 'Infrastructure',
      tags: ['Infrastructure', 'Buildings'],
      image: '/images/projects/placeholder.png',
      budget: '$320M',
      timeline: '48 Months',
      team: '85 Engineers',
      location: 'Chicago, IL',
      description: 'State-of-the-art underground transportation hub with advanced ventilation systems and emergency protocols.',
      problem: 'Need for expanded public transportation capacity in dense urban environment with complex underground conditions.',
      solution: 'Designed deep-bore tunnel system with innovative ventilation, emergency egress, and passenger flow optimization.',
      role: 'Tunnel Engineering Lead',
      challenges: 'Managing groundwater, coordinating with existing infrastructure, and ensuring passenger safety in emergency scenarios.',
      outcomes: {
        'Passenger Capacity': 'Increased by 60%',
        'Safety Rating': 'Exceeded by 25%',
        'Construction Time': 'Completed 2 months early',
        'Cost Efficiency': '15% under budget'
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
      title: 'Coastal Protection System',
      category: 'Infrastructure',
      tags: ['Infrastructure', 'Sustainable'],
      image: '/images/projects/placeholder.png',
      budget: '$95M',
      timeline: '28 Months',
      team: '55 Engineers',
      location: 'Miami, FL',
      description: 'Comprehensive coastal defense system combining natural and engineered solutions for climate resilience.',
      problem: 'Increasing coastal erosion and vulnerability to storm surges due to climate change and rising sea levels.',
      solution: 'Implemented hybrid approach with artificial reefs, seawalls, and natural dune restoration for sustainable protection.',
      role: 'Coastal Engineering Specialist',
      challenges: 'Balancing protection needs with environmental preservation and public access requirements.',
      outcomes: {
        'Storm Protection': 'Enhanced by 70%',
        'Erosion Control': 'Reduced by 80%',
        'Environmental Impact': 'Minimized by 60%',
        'Public Access': 'Maintained 100%'
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
      title: 'Sports Stadium Complex',
      category: 'Buildings',
      tags: ['Buildings', 'Infrastructure'],
      image: '/images/projects/placeholder.png',
      budget: '$650M',
      timeline: '42 Months',
      team: '95 Engineers',
      location: 'Dallas, TX',
      description: 'Multi-purpose sports and entertainment venue with retractable roof and advanced crowd management systems.',
      problem: 'Need for modern sports facility with flexible configurations, excellent acoustics, and efficient crowd flow.',
      solution: 'Designed innovative roof system, optimized seating arrangements, and integrated technology for enhanced fan experience.',
      role: 'Structural Design Lead',
      challenges: 'Creating large-span structures, managing complex roof mechanics, and ensuring rapid evacuation capabilities.',
      outcomes: {
        'Seating Capacity': '65,000 seats',
        'Roof Operation': '15 minutes',
        'Evacuation Time': 'Under 8 minutes',
        'Acoustic Quality': 'Exceeded standards by 30%'
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
      title: 'Water Treatment Plant',
      category: 'Infrastructure',
      tags: ['Infrastructure', 'Sustainable'],
      image: '/images/projects/placeholder.png',
      budget: '$280M',
      timeline: '38 Months',
      team: '70 Engineers',
      location: 'Denver, CO',
      description: 'Advanced water purification facility with membrane filtration and energy recovery systems.',
      problem: 'Aging water infrastructure unable to meet growing demand and new water quality standards.',
      solution: 'Implemented cutting-edge membrane technology, energy recovery systems, and smart monitoring for optimal performance.',
      role: 'Water Systems Engineer',
      challenges: 'Integrating new technologies with existing systems while maintaining continuous operation.',
      outcomes: {
        'Water Quality': 'Improved by 95%',
        'Energy Efficiency': 'Increased by 40%',
        'Treatment Capacity': 'Doubled',
        'Operating Costs': 'Reduced by 25%'
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
          <h1 className="text-4xl md:text-6xl font-bold mb-3 md:mb-4">Our Projects</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
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
              Explore our diverse range of engineering achievements across multiple sectors
            </p>
            
            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                    activeFilter === filter
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
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
