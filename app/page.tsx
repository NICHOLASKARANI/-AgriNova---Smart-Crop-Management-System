'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [counters, setCounters] = useState({
    farmers: 0,
    acres: 0,
    accuracy: 0,
    countries: 0
  })
  const statsRef = useRef(null)

  useEffect(() => {
    window.addEventListener('scroll', () => setScrolled(window.scrollY > 50))
    
    // Intersection Observer for number animation
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateNumbers()
          observer.disconnect()
        }
      })
    }, { threshold: 0.5 })
    
    if (statsRef.current) observer.observe(statsRef.current)
    
    return () => window.removeEventListener('scroll', () => setScrolled(window.scrollY > 50))
  }, [])

  const animateNumbers = () => {
    const targets = { farmers: 50000, acres: 2000000, accuracy: 98, countries: 15 }
    const duration = 2000
    const stepTime = 20
    const steps = duration / stepTime
    
    let currentStep = 0
    const interval = setInterval(() => {
      currentStep++
      if (currentStep >= steps) {
        setCounters(targets)
        clearInterval(interval)
      } else {
        setCounters({
          farmers: Math.floor(targets.farmers * (currentStep / steps)),
          acres: Math.floor(targets.acres * (currentStep / steps)),
          accuracy: Math.floor(targets.accuracy * (currentStep / steps)),
          countries: Math.floor(targets.countries * (currentStep / steps))
        })
      }
    }, stepTime)
  }

  const features = [
    { icon: '??', title: 'AI Crop Prediction', desc: '95% accurate yield forecasts using machine learning', color: 'from-purple-500 to-pink-500' },
    { icon: '??', title: 'Real-time Analytics', desc: 'Live field monitoring with instant insights', color: 'from-blue-500 to-cyan-500' },
    { icon: '???', title: 'Weather Intelligence', desc: 'Hyper-local weather predictions and alerts', color: 'from-green-500 to-emerald-500' },
    { icon: '??', title: 'Pest Detection', desc: 'AI-powered pest identification and control', color: 'from-red-500 to-orange-500' },
    { icon: '??', title: 'Smart Irrigation', desc: 'Water optimization with soil sensors', color: 'from-cyan-500 to-blue-500' },
    { icon: '??', title: 'Market Insights', desc: 'Real-time crop prices and demand forecasts', color: 'from-yellow-500 to-orange-500' },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation - keeping your existing structure */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="text-3xl animate-bounce">??</div>
              <h1 className={`text-2xl font-bold ${scrolled ? 'text-green-600' : 'text-white'}`}>AgriNova</h1>
              <span className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-xs px-2 py-1 rounded-full">AI-Powered</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className={`${scrolled ? 'text-gray-700' : 'text-white'} hover:text-green-500 transition`}>Features</a>
              <a href="#how-it-works" className={`${scrolled ? 'text-gray-700' : 'text-white'} hover:text-green-500 transition`}>How It Works</a>
              <a href="#testimonials" className={`${scrolled ? 'text-gray-700' : 'text-white'} hover:text-green-500 transition`}>Success Stories</a>
            </div>
            <div className="flex items-center space-x-3">
              <Link href="/login" className={`px-4 py-2 rounded-lg ${scrolled ? 'text-gray-700 hover:text-green-600' : 'text-white hover:text-green-200'} transition`}>
                Sign In
              </Link>
              <Link href="/register" className="px-5 py-2 rounded-lg bg-gradient-to-r from-green-500 to-blue-500 text-white font-medium hover:shadow-lg transition transform hover:scale-105">
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - keeping your structure */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-green-800 to-blue-900">
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <div className="animate-fade-in-up">
            <div className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <span className="text-white/90 text-sm">?? The Future of Agriculture is Here</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Smart Farming with
              <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent"> Artificial Intelligence</span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-10">
              Join 50,000+ farmers using AI-powered insights to increase yields, reduce costs, and make data-driven decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register" className="group px-8 py-3 rounded-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold hover:shadow-2xl transition-all transform hover:scale-105">
                Start Free Trial
                <span className="inline-block ml-2 group-hover:translate-x-1 transition">?</span>
              </Link>
              <button className="px-8 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold hover:bg-white/20 transition-all">
                Watch Demo
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Animated Stats Section */}
      <section ref={statsRef} className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Farmers Worldwide</h2>
            <p className="text-gray-600">Real-time platform growth and impact metrics</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
              <div className="text-4xl mb-3">?????</div>
              <div className="text-3xl font-bold text-gray-900">{counters.farmers.toLocaleString()}+</div>
              <div className="text-gray-600 text-sm mt-1">Active Farmers</div>
              <div className="text-green-600 text-xs mt-2 font-semibold animate-pulse">? +45% growth</div>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
              <div className="text-4xl mb-3">??</div>
              <div className="text-3xl font-bold text-gray-900">{counters.acres.toLocaleString()}+</div>
              <div className="text-gray-600 text-sm mt-1">Acres Managed</div>
              <div className="text-green-600 text-xs mt-2 font-semibold animate-pulse">? +78% growth</div>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
              <div className="text-4xl mb-3">??</div>
              <div className="text-3xl font-bold text-gray-900">{counters.accuracy}%</div>
              <div className="text-gray-600 text-sm mt-1">Prediction Accuracy</div>
              <div className="text-green-600 text-xs mt-2 font-semibold animate-pulse">? +12% improvement</div>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
              <div className="text-4xl mb-3">??</div>
              <div className="text-3xl font-bold text-gray-900">{counters.countries}+</div>
              <div className="text-gray-600 text-sm mt-1">Countries</div>
              <div className="text-green-600 text-xs mt-2 font-semibold animate-pulse">Global reach</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - keeping your existing structure */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Intelligent Features for Modern Agriculture</h2>
            <p className="text-gray-600 text-lg">Powered by advanced machine learning and computer vision</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2">
                <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>
                <div className="p-6">
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                  <button className="mt-4 text-green-600 font-semibold group-hover:translate-x-2 transition inline-block">
                    Learn More ?
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - keeping your structure */}
      <section id="how-it-works" className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How AgriNova Works</h2>
            <p className="text-gray-600">Simple 4-step process to smarter farming</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Connect Fields', desc: 'Add your fields and crop data', icon: '??' },
              { step: '02', title: 'AI Analysis', desc: 'Our AI analyzes patterns', icon: '??' },
              { step: '03', title: 'Get Insights', desc: 'Receive actionable recommendations', icon: '??' },
              { step: '04', title: 'Optimize Yield', desc: 'Implement AI suggestions', icon: '??' },
            ].map((item, idx) => (
              <div key={idx} className="text-center group">
                <div className="relative">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition transform">
                    {item.icon}
                  </div>
                  {idx < 3 && <div className="hidden md:block absolute top-10 -right-4 text-2xl text-gray-400">?</div>}
                </div>
                <div className="text-4xl font-bold text-green-600 mb-2">{item.step}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer - keeping your structure */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="text-2xl">??</div>
                <span className="text-white font-bold text-xl">AgriNova</span>
              </div>
              <p className="text-gray-400 text-sm">Empowering farmers with AI-powered smart technology for sustainable agriculture.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#features" className="hover:text-white transition">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition">How It Works</a></li>
                <li><Link href="/register" className="hover:text-white transition">Sign Up</Link></li>
                <li><Link href="/login" className="hover:text-white transition">Login</Link></li>
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
              <h4 className="font-semibold mb-3">Newsletter</h4>
              <p className="text-gray-400 text-sm mb-3">Get latest updates and insights</p>
              <form className="flex">
                <input type="email" placeholder="Your email" className="flex-1 px-3 py-2 rounded-l-lg text-gray-900" />
                <button className="bg-green-600 px-4 py-2 rounded-r-lg hover:bg-green-700 transition">Subscribe</button>
              </form>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>? 2026 AgriNova. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out; }
      `}</style>
    </div>
  )
}
