import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AgriNova - AI-Powered Smart Crop Management',
  description: 'Revolutionize farming with machine learning predictions and intelligent crop tracking',
  keywords: 'crop management, AI agriculture, smart farming, crop tracking',
  authors: [{ name: 'AgriNova Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#4CAF50',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Add visible class to animated elements on scroll
              if (typeof window !== 'undefined') {
                const observer = new IntersectionObserver((entries) => {
                  entries.forEach(entry => {
                    if (entry.isIntersecting) {
                      entry.target.classList.add('visible');
                    }
                  });
                }, { threshold: 0.1 });
                
                document.addEventListener('DOMContentLoaded', () => {
                  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
                });
              }
            `,
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
