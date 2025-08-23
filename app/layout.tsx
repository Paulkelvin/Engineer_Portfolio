import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ayodele Adeyemi - Civil Engineer Portfolio',
  description: 'Portfolio showcasing innovative Nigerian civil engineering projects, sustainable infrastructure solutions, and comprehensive engineering services.',
  keywords: 'nigerian civil engineer, infrastructure nigeria, sustainable construction africa, structural design, project management, COREN',
  authors: [{ name: 'Ayodele Adeyemi' }],
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
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <div className="min-h-screen bg-background">
            <Navigation />
            <main className="pt-16">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
