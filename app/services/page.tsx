'use client'

import { motion } from 'framer-motion'
import TestimonialCarousel, { TestimonialItem } from '@/components/TestimonialCarousel'
import { useState } from 'react'
import Image from 'next/image'
import { ArrowRight, X, Building2, Map, Leaf, Users, Shield, Zap, Globe } from 'lucide-react'
import AccentShape from '@/components/decor/AccentShape'

const ServicesPage = () => {
  const [selectedService, setSelectedService] = useState<number | null>(null)
  // Testimonial carousel manages its own state now

  const services = [
    {
      id: 1,
      title: 'Structural Design',
      description: 'Comprehensive structural engineering solutions for buildings, bridges, and infrastructure projects.',
      icon: Building2,
             image: '/images/services/structural-design.png',
      benefits: [
        'Reduce construction timelines by 20%',
        'Optimize material usage and costs',
        'Ensure structural integrity and safety',
        'Comply with all building codes'
      ],
      gallery: [
        '/images/projects/placeholder.png',
        '/images/projects/placeholder.png',
        '/images/projects/placeholder.png'
      ]
    },
    {
      id: 2,
      title: 'Site Development',
      description: 'Complete site planning and development services from concept to completion.',
      icon: Map,
             image: '/images/services/site-development.png',
      benefits: [
        'Maximize land use efficiency',
        'Minimize environmental impact',
        'Streamline permitting process',
        'Optimize infrastructure layout'
      ],
      gallery: [
        '/images/projects/placeholder.png',
        '/images/projects/placeholder.png',
        '/images/projects/placeholder.png'
      ]
    },
    {
      id: 3,
      title: 'Sustainable Consulting',
      description: 'Expert guidance on green building practices and environmental sustainability.',
      icon: Leaf,
             image: '/images/services/sustainable-consulting.png',
      benefits: [
        'Achieve LEED certification goals',
        'Reduce energy consumption by 30%',
        'Implement renewable energy systems',
        'Minimize carbon footprint'
      ],
      gallery: [
        '/images/projects/placeholder.png',
        '/images/projects/placeholder.png',
        '/images/projects/placeholder.png'
      ]
    },
    {
      id: 4,
      title: 'Project Management',
      description: 'End-to-end project management ensuring on-time, on-budget delivery.',
      icon: Users,
             image: '/images/services/project-management.png',
      benefits: [
        'Deliver projects 15% under budget',
        'Meet aggressive timelines consistently',
        'Coordinate multi-disciplinary teams',
        'Manage stakeholder expectations'
      ],
      gallery: [
        '/images/projects/placeholder.png',
        '/images/projects/placeholder.png',
        '/images/projects/placeholder.png'
      ]
    },
    {
      id: 5,
      title: 'Geotechnical Surveys',
      description: 'Comprehensive soil analysis and foundation design recommendations.',
      icon: Shield,
             image: '/images/services/geotechnical-surveys.png',
      benefits: [
        'Prevent foundation failures',
        'Optimize foundation design',
        'Reduce construction risks',
        'Ensure long-term stability'
      ],
      gallery: [
        '/images/projects/placeholder.png',
        '/images/projects/placeholder.png',
        '/images/projects/placeholder.png'
      ]
    },
    {
      id: 6,
      title: 'BIM Modeling',
      description: 'Advanced Building Information Modeling for enhanced project coordination.',
      icon: Zap,
             image: '/images/services/bim-modeling.png',
      benefits: [
        'Improve collaboration by 40%',
        'Reduce design conflicts by 60%',
        'Enable virtual construction walkthroughs',
        'Facilitate facility management'
      ],
      gallery: [
        '/images/projects/placeholder.png',
        '/images/projects/placeholder.png',
        '/images/projects/placeholder.png'
      ]
    },
    {
      id: 7,
      title: 'Infrastructure Planning',
      description: 'Strategic planning for transportation, utilities, and urban development.',
      icon: Globe,
             image: '/images/services/infrastructure-planning.png',
      benefits: [
        'Plan for future growth needs',
        'Integrate smart city technologies',
        'Optimize traffic flow patterns',
        'Enhance community connectivity'
      ],
      gallery: [
        '/images/projects/placeholder.png',
        '/images/projects/placeholder.png',
        '/images/projects/placeholder.png'
      ]
    },
    {
      id: 8,
      title: 'Construction Oversight',
      description: 'Quality control and safety management during construction phases.',
      icon: Shield,
             image: '/images/services/construction-oversight.png',
      benefits: [
        'Maintain quality standards',
        'Ensure safety compliance',
        'Monitor progress and milestones',
        'Resolve construction issues promptly'
      ],
      gallery: [
        '/images/projects/placeholder.png',
        '/images/projects/placeholder.png',
        '/images/projects/placeholder.png'
      ]
    }
  ]

  const testimonials: TestimonialItem[] = [
    {
      name: 'Adeola Ogunleye',
      role: 'Project Director',
      company: 'MetroBuild Nigeria',
      photo: '/images/testimonials/client-1.png',
      quote: 'Ayodele\'s sustainable design strategies helped us reduce material costs while meeting EDGE certification targets ahead of schedule.',
      location: 'Abuja, Nigeria'
    },
    {
      name: 'Kunle Adebayo',
      role: 'CEO',
      company: 'InfraCore West Africa',
      photo: '/images/testimonials/client-2.png',
      quote: 'His proactive coordination on our bridge rehabilitation project cut downtime dramatically and improved safety compliance across contractors.',
      location: 'Port Harcourt, Nigeria'
    },
    {
      name: 'Chinwe Okonkwo',
      role: 'City Engineer',
      company: 'Lagos Metropolitan Authority',
      photo: '/images/testimonials/client-3.png',
      quote: 'Ayodele anticipated geotechnical risks early, saving the municipality significant remediation cost and schedule impacts.',
      location: 'Lagos, Nigeria'
    }
  ]

  // Removed manual testimonial navigation handlers

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
                 <div className="absolute inset-0 z-0">
           <Image
             src="/images/hero/services-hero.png"
             alt="Civil engineering services and consulting"
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
          <h1 className="hero-heading mb-3 md:mb-4 heading-accent">Comprehensive <span className="gradient-text">Civil Engineering</span> Services</h1>
          <p className="hero-sub text-gray-200 max-w-3xl mx-auto paragraph-lead">
            End‑to‑end delivery—planning, design, optimization and oversight—driven by sustainability and measurable project value.
          </p>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <AccentShape variant="triangles" size={90} className="text-primary/50 absolute -mt-20 left-4 opacity-30" />
          <AccentShape variant="orbits" size={120} className="text-secondary/50 absolute -mt-10 right-2 opacity-15" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="heading-badge">Capabilities</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 md:mb-5 heading-accent">
              Service <span className="gradient-text">Portfolio</span>
            </h2>
            <p className="paragraph-lead max-w-2xl mx-auto">
              Adaptive engineering solutions calibrated for performance, resilience and total lifecycle value.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Beam Calculator Teaser */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0 }}
              viewport={{ once: true }}
              className="card group cursor-pointer bg-gradient-to-br from-primary/5 to-secondary/5 flex flex-col justify-between"
              onClick={() => window.location.href='/services/beam-calculator'}
            >
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800">Beam Calculator</h3>
                  <span className="px-3 py-1 rounded-full bg-primary text-white text-xs font-semibold">New</span>
                </div>
                <p className="text-gray-600 mb-6 flex-1">Interactive tool to analyze deflection, shear, and moment for common beam scenarios. Showcase of engineering capability.</p>
                <div className="mt-auto inline-flex items-center text-primary font-semibold group-hover:text-blue-700 transition-colors">Try It Now →</div>
              </div>
              <div className="h-1 w-full bg-gradient-to-r from-primary via-secondary to-primary opacity-60 group-hover:opacity-100 transition" />
            </motion.div>
            {services.map((service, index) => {
              const IconComponent = service.icon
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card group cursor-pointer"
                  onClick={() => setSelectedService(service.id)}
                >
                  <div className="relative overflow-hidden rounded-t-xl">
                    <Image
                      src={service.image}
                      alt={`${service.title} service`}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute top-4 right-4 p-2 bg-primary/90 rounded-lg">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      {service.benefits.slice(0, 2).map((benefit, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                    
                    <button className="text-primary font-semibold hover:text-blue-700 transition-colors duration-200">
                      Learn More →
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section (Carousel) */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <TestimonialCarousel
            items={testimonials}
            heading="What Our Clients Say"
            subheading="Authentic feedback from partners across Nigeria's infrastructure landscape"
          />
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 md:mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-blue-100 mb-2 md:mb-8">
              Let's discuss how our engineering expertise can bring your vision to life. 
              Get a personalized quote for your project today.
            </p>
            <a
              href="/contact"
              className="btn-secondary text-lg px-8 py-4 inline-flex items-center"
            >
              Contact for Quote
              <ArrowRight className="ml-2 h-6 w-6" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {services.find(s => s.id === selectedService)?.title}
                </h2>
                <button
                  onClick={() => setSelectedService(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <X className="h-6 w-6 text-gray-600" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Service Overview</h3>
                  <p className="text-gray-600 mb-6">
                    {services.find(s => s.id === selectedService)?.description}
                  </p>

                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Benefits</h3>
                  <ul className="space-y-2 mb-6">
                    {services.find(s => s.id === selectedService)?.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-gray-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Project Gallery</h3>
                  <div className="space-y-4">
                    {services.find(s => s.id === selectedService)?.gallery.map((image, idx) => (
                      <Image
                        key={idx}
                        src={image}
                        alt={`${services.find(s => s.id === selectedService)?.title} gallery image ${idx + 1}`}
                        width={600}
                        height={400}
                        className="w-full h-48 object-cover rounded-lg"
                        loading="lazy"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default ServicesPage
