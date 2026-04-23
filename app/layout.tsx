import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AdvancedFooter from '@/components/AdvancedFooter'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AgriNova - SmartSeason Field Monitoring System',
  description: 'AI-powered crop management and field monitoring system for modern agriculture',
  keywords: 'smart farming, AI agriculture, crop monitoring, field management',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <main className="flex-1">
            {children}
          </main>
          <AdvancedFooter />
        </div>
      </body>
    </html>
  )
}
