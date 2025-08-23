'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'
import { Mail, Phone, MapPin, Linkedin, Github, Send, CheckCircle, Map } from 'lucide-react'
import TestimonialCarousel, { TestimonialItem } from '@/components/TestimonialCarousel'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: '',
    file: null as File | null
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  // Testimonial carousel state removed (now using shared carousel component)

  const services = [
    'Structural Design',
    'Site Development',
    'Sustainable Consulting',
    'Project Management',
    'Geotechnical Surveys',
    'BIM Modeling',
    'Infrastructure Planning',
    'Construction Oversight'
  ]

  const testimonials: TestimonialItem[] = [
    {
      name: 'Tola Balogun',
      role: 'Development Director',
      company: 'UrbanGrowth Nigeria',
      photo: '/images/testimonials/client-4.png',
      quote: 'Ayodele provided actionable engineering insights that streamlined approvals and shaved weeks off our project schedule.',
      location: 'Abuja, Nigeria'
    },
    {
      name: 'Chinedu Eze',
      role: 'City Planner',
      company: 'Enugu Urban Works',
      photo: '/images/testimonials/client-5.png',
      quote: 'Exceptional attention to sustainability and lifecycle performance—his recommendations elevated the entire concept.',
      location: 'Enugu, Nigeria'
    }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, file: e.target.files![0] }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset form after showing success
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        service: '',
        message: '',
        file: null
      })
    }, 5000)
  }

  // Navigation handlers no longer required since carousel component manages state

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
                 <div className="absolute inset-0 z-0">
           <Image
             src="/images/hero/contact-hero.png"
             alt="Professional meeting and collaboration space"
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
          <h1 className="hero-heading mb-3 md:mb-4">Connect with Ayodele</h1>
          <p className="hero-sub text-gray-200 max-w-3xl mx-auto px-2">
            Ready to discuss your next engineering project? Let's explore how we can bring your vision to life.
          </p>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4 md:mb-6">Get In Touch</h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and I'll get back to you within 24 hours to discuss your project requirements.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                    Service Interest
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200"
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200"
                    placeholder="Tell me about your project, timeline, budget, and any specific requirements..."
                  />
                </div>

                <div>
                  <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">
                    Attach Files (Optional)
                  </label>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.dwg,.rvt"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary file:text-white hover:file:bg-blue-700"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Accepted formats: PDF, DOC, Images, CAD files (max 10MB)
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary text-lg py-4 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="loading-spinner"></div>
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>

              {/* Success Message */}
              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                      <div>
                        <h3 className="text-green-800 font-medium">Message Sent Successfully!</h3>
                        <p className="text-green-700 text-sm">Thank you for your inquiry. I'll get back to you within 24 hours.</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Contact Information & Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Contact Details */}
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">Email</div>
                      <a href="mailto:ayodele.adeyemi@engineering.ng" className="text-primary hover:text-blue-700 transition-colors duration-200">
                        ayodele.adeyemi@engineering.ng
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">Phone</div>
                      <a href="tel:+2348031234567" className="text-primary hover:text-blue-700 transition-colors duration-200">
                        +234 803 123 4567
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">Office</div>
                      <div className="text-gray-600">12 Adeola Odeku Street<br />Victoria Island, Lagos</div>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-6">
                  <h4 className="font-medium text-gray-800 mb-3">Connect on Social Media</h4>
                  <div className="flex space-x-4">
                    <a
                      href="https://linkedin.com/in/ayodele-adeyemi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-gray-100 hover:bg-primary hover:text-white rounded-lg transition-all duration-200"
                      aria-label="LinkedIn Profile"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a
                      href="https://github.com/ayodele-adeyemi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-gray-100 hover:bg-primary hover:text-white rounded-lg transition-all duration-200"
                      aria-label="GitHub Profile"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Interactive Map Placeholder */}
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Project Locations</h3>
                <div className="bg-gray-100 rounded-lg p-8 text-center">
                  <div className="text-gray-500 mb-4">
                    <Map className="h-16 w-16 mx-auto" />
                  </div>
                  <p className="text-gray-600 mb-4">
                    Interactive map showing key project locations and office
                  </p>
                  <p className="text-sm text-gray-500">
                    (Placeholder for Google Maps or similar mapping service integration)
                  </p>
                </div>
              </div>

              {/* Profile Photo section removed per request */}
            </motion.div>
          </div>
        </div>
      </section>
      {/* Testimonials Section (Carousel) */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <TestimonialCarousel
            items={testimonials}
            heading="What Clients Say"
            subheading="Voices from partners and planners across Nigerian projects"
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Let's discuss how we can bring your infrastructure vision to life with innovative, 
              sustainable engineering solutions. No project is too big or too small.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:ayodele.adeyemi@engineering.ng"
                className="btn-secondary text-lg px-8 py-4 inline-flex items-center"
              >
                <Mail className="mr-2 h-6 w-6" />
                Send Direct Email
              </a>
              <a
                href="tel:+2348031234567"
                className="btn-secondary text-lg px-8 py-4 inline-flex items-center"
              >
                <Phone className="mr-2 h-6 w-6" />
                Call Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage
