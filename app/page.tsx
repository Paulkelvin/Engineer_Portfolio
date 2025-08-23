'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Award, Building2, Users, TrendingUp } from 'lucide-react'

const HomePage = () => {
  const stats = [
    { number: '15+', label: 'Years Experience', icon: Award, color: 'text-blue-600' },
    { number: '100+', label: 'Projects Completed', icon: Building2, color: 'text-green-600' },
    { number: '5M+', label: 'Sq Ft Built', icon: TrendingUp, color: 'text-purple-600' },
    { number: '100%', label: 'Sustainable Focus', icon: Users, color: 'text-orange-600' },
  ]

  const featuredProjects = [
    {
      title: 'Hudson Bridge Renovation',
      image: '/images/contact/contact-page.png',
      category: 'Infrastructure',
      metric: 'Cost Savings: 25%',
    },
    {
      title: 'Green Office Complex',
      image: '/images/contact/contact-page.png',
      category: 'Commercial',
      metric: 'Energy Efficiency: 40%',
    },
    {
      title: 'Smart Highway System',
      image: '/images/contact/contact-page.png',
      category: 'Transportation',
      metric: 'Traffic Flow: +35%',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/home-hero.png"
            alt="Civil engineering infrastructure construction site"
            fill
            className="object-cover"
            priority
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-heading mb-2 md:mb-4"
          >
            Ayodele Adeyemi
            <span className="block text-2xl md:text-3xl font-medium text-blue-300 mt-1">
              Nigerian Civil Engineer
            </span>
          </motion.h1>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-sub mb-3 md:mb-4"
          >
            Innovating Sustainable Structures Worldwide
          </motion.h2>
          
          {/* Removed long paragraph per request */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/services" className="btn-primary">
              Explore Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link href="/projects" className="btn-secondary">
              View Projects
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-3 bg-white rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2 md:mb-4 leading-snug">
              Proven Track Record
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-normal">
              Numbers that speak to our commitment to excellence and innovation
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300"
                >
                  <div className={`${stat.color} mb-4 flex justify-center`}>
                    <IconComponent className="h-12 w-12" />
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Quick Bio Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-2xl md:text-4xl font-bold text-gray-800 leading-snug">
                Meet Your Engineering Partner
              </h2>
              <p className="text-base md:text-lg text-gray-600 leading-normal">
                With over 15 years of experience in civil engineering, I've dedicated my career to 
                creating sustainable, innovative infrastructure solutions. From iconic bridges to 
                smart city developments, every project reflects my commitment to excellence, 
                environmental responsibility, and cutting-edge technology.
              </p>
              <p className="text-base md:text-lg text-gray-600 leading-normal">
                My expertise spans structural design, sustainable consulting, and project management, 
                always with a focus on reducing environmental impact while maximizing efficiency and safety.
              </p>
              <Link href="/about" className="btn-primary">
                Learn More About Me
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative">
                                 <Image
                   src="/images/profile/portrait-alt.png"
                   alt="Professional civil engineer portrait"
                   width={400}
                   height={400}
                   className="rounded-2xl shadow-2xl"
                   loading="lazy"
                 />
                <div className="absolute -bottom-2 -right-2 bg-primary text-white p-3 rounded-xl shadow-lg">
                  <div className="text-xl font-bold">15+</div>
                  <div className="text-xs">Years</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Projects Teaser */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-8 leading-snug">
              Featured Projects
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-normal">
              A glimpse into some of our most innovative and impactful engineering solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-xl shadow-lg">
                  <Image
                    src={project.image}
                    alt={`${project.title} project image`}
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white md:transform md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-300">
                    <div className="text-sm text-blue-300 mb-2">{project.category}</div>
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <div className="text-sm text-green-300 font-semibold">{project.metric}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/projects" className="btn-primary text-lg px-8 py-4">
              View All Projects
              <ArrowRight className="ml-2 h-6 w-6" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
