import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'Indramayuku - Temukan & Review Tempat Terbaik di Indramayu',
  description: 'Platform review tempat, kuliner, wisata, hotel, dan bisnis lokal di Indramayu. Temukan pengalaman terbaik di Kota Mangga!',
  keywords: 'indramayu, review, kuliner indramayu, wisata indramayu, restoran indramayu, hotel indramayu, mangga gedong gincu',
  openGraph: {
    title: 'Indramayuku - Review Tempat di Indramayu',
    description: 'Temukan & review tempat terbaik di Indramayu',
    locale: 'id_ID',
    type: 'website',
    siteName: 'Indramayuku',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        <Toaster position="bottom-center" toastOptions={{
          style: { fontFamily: 'Plus Jakarta Sans', borderRadius: '12px' }
        }} />
      </body>
    </html>
  )
}
