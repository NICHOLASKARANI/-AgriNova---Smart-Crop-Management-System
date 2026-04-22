'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const [isVisible, setIsVisible] = useState({})
  const router = useRouter()

  useEffect(() => {
    // Animate elements on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({ ...prev, [entry.target.id]: true }))
        }
      })
    })
    
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const features = [
    {
      icon: '??',
      title: 'AI-Powered Risk Prediction',
      description: 'Machine learning models predict crop risks with 95% accuracy',
      gradient: 'from-green-400 to-blue-500'
    },
    {
      icon: '??',
      title: 'Smart Field Analytics',
      description: 'Real-time insights and automated stage detection',
      gradient: 'from-purple-400 to-pink-500'
    },
    {
      icon: '??',
      title: 'Predictive Harvest Timing',
      description: 'AI calculates optimal harvest windows for maximum yield',
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      icon: '???',
      title: 'Weather Integration',
      description: 'Real-time weather data and climate impact analysis',
      gradient: 'from-blue-400 to-cyan-500'
    },
    {
      icon: '??',
      title: 'Mobile-Ready Dashboard',
      description: 'Access field data anywhere with responsive design',
      gradient: 'from-indigo-400 to-purple-500'
    },
    {
      icon: '??',
      title: 'ML Recommendations',
      description: 'Smart suggestions for crop management and optimization',
      gradient: 'from-red-400 to-pink-500'
    }
  ]

  const stats = [
    { value: '10K+', label: 'Fields Managed', icon: '??' },
    { value: '95%', label: 'Prediction Accuracy', icon: '??' },
    { value: '30%', label: 'Yield Increase', icon: '??' },
    { value: '24/7', label: 'AI Monitoring', icon: '??' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 backdrop-blur-lg bg-white/10 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="text-3xl">??</div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                AgriNova
              </h1>
              <span className="text-xs bg-white/20 px-2 py-1 rounded-full">AI-Powered</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="px-6 py-2 rounded-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-medium hover:shadow-lg transition-all transform hover:scale-105">
                Launch App
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-on-scroll" id="hero">
            <div className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <span className="text-white/80 text-sm">?? Next-Gen Agriculture Technology</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Smart Crop Management
              <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent"> with AI</span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-10">
              Revolutionize your farming with machine learning predictions, real-time analytics, and intelligent crop tracking.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/login" className="px-8 py-3 rounded-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold hover:shadow-2xl transition-all transform hover:scale-105">
                Get Started Free
              </Link>
              <button className="px-8 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold hover:bg-white/20 transition-all">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="animate-on-scroll backdrop-blur-lg bg-white/10 rounded-2xl p-6 text-center border border-white/20" id={`stat-${idx}`}>
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-white/70 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Intelligent Features</h2>
            <p className="text-xl text-white/70">Powered by advanced machine learning algorithms</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="group animate-on-scroll backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all transform hover:-translate-y-2" id={`feature-${idx}`}>
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
                <div className={`mt-4 h-1 w-12 bg-gradient-to-r ${feature.gradient} rounded-full group-hover:w-24 transition-all`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Demo Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="backdrop-blur-lg bg-white/10 rounded-3xl p-8 border border-white/20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30 mb-4">
                  <span className="text-green-400 text-sm">Live AI Demo</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">See AI in Action</h3>
                <p className="text-white/70 mb-6">
                  Our machine learning model analyzes crop health, predicts risks, and suggests optimal actions in real-time.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-white/80">95% prediction accuracy</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-white/80">Real-time risk assessment</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                    <span className="text-white/80">Smart harvest timing</span>
                  </div>
                </div>
              </div>
              <div className="bg-black/30 rounded-2xl p-6">
                <div className="text-center">
                  <div className="text-6xl mb-4">??</div>
                  <div className="text-white font-mono text-sm">AI Model: TensorFlow.js</div>
                  <div className="text-green-400 text-xs mt-2">? Active Learning</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="backdrop-blur-lg bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-3xl p-12 border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Farming?</h2>
            <p className="text-white/70 mb-8">Join thousands of farmers using AI-powered crop management</p>
            <Link href="/login" className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold hover:shadow-2xl transition-all transform hover:scale-105">
              Start Free Trial
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 backdrop-blur-lg bg-black/30 border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="text-2xl">??</div>
                <span className="text-white font-bold">AgriNova</span>
              </div>
              <p className="text-white/60 text-sm">Smart crop management powered by artificial intelligence.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li><Link href="#" className="hover:text-white transition">Features</Link></li>
                <li><Link href="#" className="hover:text-white transition">Pricing</Link></li>
                <li><Link href="#" className="hover:text-white transition">API</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li><Link href="#" className="hover:text-white transition">About</Link></li>
                <li><Link href="#" className="hover:text-white transition">Blog</Link></li>
                <li><Link href="#" className="hover:text-white transition">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li><Link href="#" className="hover:text-white transition">Privacy</Link></li>
                <li><Link href="#" className="hover:text-white transition">Terms</Link></li>
                <li><Link href="#" className="hover:text-white transition">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/40 text-sm">
            ? 2024 AgriNova. All rights reserved. Built with AI ??
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease-out;
        }
        .animate-on-scroll.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  )
}
