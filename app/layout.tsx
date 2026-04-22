import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AgriNova - AI-Powered Smart Crop Management System',
  description: 'Revolutionize farming with artificial intelligence. Get real-time crop insights, yield predictions, and smart recommendations.',
  keywords: 'smart farming, AI agriculture, crop management, precision agriculture',
  authors: [{ name: 'AgriNova Team' }],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: { url: '/favicon.svg', type: 'image/svg+xml' },
  },
  openGraph: {
    title: 'AgriNova - Smart Farming with AI',
    description: 'Join 50,000+ farmers using AI to increase yields',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
