import Link from 'next/link'
import { Building2, Mail, Linkedin, Github, MapPin, Phone } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">Ayodele Adeyemi</span>
            </div>
            <p className="text-gray-300 max-w-md">
              Innovative civil engineering solutions for sustainable infrastructure development across Nigeria & West Africa.
              Building resilient communities one project at a time.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://linkedin.com/in/ayodele-adeyemi"
                target="_blank"
                rel="noopener noreferrer"
                className="relative group p-3 rounded-xl bg-gradient-to-br from-gray-700 to-gray-800 hover:from-primary hover:to-blue-600 text-gray-200 hover:text-white shadow hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/40"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-5 w-5" />
                <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[10px] tracking-wide font-medium opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white px-2 py-1 rounded-md pointer-events-none">LinkedIn</span>
              </a>
              <a
                href="https://github.com/ayodele-adeyemi"
                target="_blank"
                rel="noopener noreferrer"
                className="relative group p-3 rounded-xl bg-gradient-to-br from-gray-700 to-gray-800 hover:from-secondary hover:to-green-600 text-gray-200 hover:text-white shadow hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary/40"
                aria-label="GitHub Profile"
              >
                <Github className="h-5 w-5" />
                <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[10px] tracking-wide font-medium opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white px-2 py-1 rounded-md pointer-events-none">GitHub</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-primary transition-colors duration-200">
                  About Me
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-primary transition-colors duration-200">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-gray-300 hover:text-primary transition-colors duration-200">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/resume" className="text-gray-300 hover:text-primary transition-colors duration-200">
                  Resume
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <a
                  href="mailto:ayodele.adeyemi@engineering.ng"
                  className="text-gray-300 hover:text-primary transition-colors duration-200"
                >
                  ayodele.adeyemi@engineering.ng
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary" />
                <span className="text-gray-300">+234 803 123 4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-gray-300">Lagos, Nigeria</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {currentYear} Ayodele Adeyemi. All rights reserved. | 
            <span className="text-primary"> Nigerian Civil Engineer Portfolio</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
