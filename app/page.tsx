'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Home() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () => setScrolled(window.scrollY > 50))
    return () => window.removeEventListener('scroll', () => setScrolled(window.scrollY > 50))
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <span className="text-3xl">??</span>
              <h1 className={`text-2xl font-bold ${scrolled ? 'text-green-600' : 'text-white'}`}>AgriNova</h1>
              <span className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-xs px-2 py-1 rounded-full">AI-Powered</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login" className={`px-4 py-2 rounded-lg ${scrolled ? 'text-gray-700 hover:text-green-600' : 'text-white hover:text-green-200'} transition`}>Sign In</Link>
              <Link href="/register" className="px-5 py-2 rounded-lg bg-gradient-to-r from-green-500 to-blue-500 text-white font-medium hover:shadow-lg transition transform hover:scale-105">Get Started</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-green-800 to-blue-900">
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Smart Farming with
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent"> Artificial Intelligence</span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-10">
            Join thousands of farmers using AI-powered insights to increase yields, reduce costs, and make data-driven decisions.
          </p>
          <Link href="/register" className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold hover:shadow-2xl transition-all transform hover:scale-105">
            Start Free Trial ?
          </Link>
        </div>
      </section>

      {/* Stats Section - No Question Marks */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Platform Impact</h2>
            <p className="text-gray-600">Real-time growth metrics</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <div className="text-4xl mb-2">?????</div>
              <div className="text-3xl font-bold text-gray-900">50,000+</div>
              <div className="text-gray-600">Active Farmers</div>
              <div className="text-green-600 text-xs mt-2">+45% growth</div>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <div className="text-4xl mb-2">??</div>
              <div className="text-3xl font-bold text-gray-900">2M+</div>
              <div className="text-gray-600">Acres Managed</div>
              <div className="text-green-600 text-xs mt-2">+78% growth</div>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <div className="text-4xl mb-2">??</div>
              <div className="text-3xl font-bold text-gray-900">98%</div>
              <div className="text-gray-600">Accuracy Rate</div>
              <div className="text-green-600 text-xs mt-2">+12% growth</div>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <div className="text-4xl mb-2">??</div>
              <div className="text-3xl font-bold text-gray-900">24/7</div>
              <div className="text-gray-600">AI Support</div>
              <div className="text-green-600 text-xs mt-2">Always available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Intelligent Features</h2>
            <p className="text-gray-600 text-lg">Powered by advanced machine learning</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: '??', title: 'AI Crop Prediction', desc: '95% accurate yield forecasts', color: 'from-purple-500 to-pink-500' },
              { icon: '??', title: 'Real-time Analytics', desc: 'Live field monitoring', color: 'from-blue-500 to-cyan-500' },
              { icon: '???', title: 'Weather Intelligence', desc: 'Hyper-local predictions', color: 'from-green-500 to-emerald-500' }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2">
                <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>
                <div className="p-6">
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Farming?</h2>
          <p className="text-white/90 text-lg mb-8">Join thousands of farmers using AI-powered crop management</p>
          <Link href="/register" className="inline-block px-8 py-3 rounded-full bg-white text-green-600 font-semibold hover:shadow-xl transition transform hover:scale-105">
            Get Started Now ?
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">??</span>
                <span className="font-bold text-xl">AgriNova</span>
              </div>
              <p className="text-gray-400 text-sm">Empowering farmers with AI-powered smart technology.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/" className="hover:text-white">Home</Link></li>
                <li><Link href="/register" className="hover:text-white">Register</Link></li>
                <li><Link href="/login" className="hover:text-white">Login</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Contact</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>?? Nairobi, Kenya</li>
                <li>?? +254 714 694 493</li>
                <li>?? karaninicholas700@gmail.com</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">? 2026 AgriNova. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}
