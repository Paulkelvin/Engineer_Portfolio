import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import BeamPromo from '@/components/BeamPromo'
const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400','500','600','700','800'] })

export const metadata: Metadata = {
  title: 'Ayodele Adeyemi - Civil Engineer Portfolio',
  description: 'Portfolio showcasing innovative Nigerian civil engineering projects, sustainable infrastructure solutions, and comprehensive engineering services.',
  keywords: 'nigerian civil engineer, infrastructure nigeria, sustainable construction africa, structural design, project management, COREN',
  authors: [{ name: 'Ayodele Adeyemi' }],
  other: {
    'beam-calculator-promo:title': 'Beam Calculator Promotion | Ayodele Adeyemi',
    'beam-calculator-promo:description': 'Explore the interactive beam deflection & load calculator built for rapid structural checks and reporting.'
  },
  openGraph: {
    title: 'Ayodele Adeyemi - Civil Engineer Portfolio',
    description: 'Innovative civil engineering projects and sustainable infrastructure solutions across Nigeria and West Africa.',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/images/profile/headshot.png',
        width: 400,
        height: 400,
  alt: 'Ayodele Adeyemi - Nigerian Civil Engineer',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${plusJakarta.className} antialiased overflow-x-hidden bg-[#f4f6f9]`}>        
          <Navigation />
          <main className="pt-14 md:pt-16 relative">
            {children}
            <BeamPromo />
          </main>
          <Footer />
      </body>
    </html>
  )
}
