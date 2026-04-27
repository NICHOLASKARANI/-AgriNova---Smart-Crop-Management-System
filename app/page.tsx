'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon, TrendingUp, Shield, Users, Zap, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Counter animation
  const [counters, setCounters] = useState({ farmers: 0, acres: 0, accuracy: 0, countries: 0 })
  const statsRef = useRef(null)
  const isInView = useInView(statsRef, { once: true, threshold: 0.3 })

  useEffect(() => {
    window.addEventListener('scroll', () => setScrolled(window.scrollY > 50))
    return () => window.removeEventListener('scroll', () => setScrolled(window.scrollY > 50))
  }, [])

  useEffect(() => {
    if (isInView) {
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
      
      return () => clearInterval(interval)
    }
  }, [isInView])

  const navLinks = ['Features', 'About', 'Testimonials', 'Contact']

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        
        {/* Navigation */}
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center space-x-2">
                <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }} className="text-3xl">??</motion.div>
                <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">AgriNova</span>
                <span className="hidden sm:inline-block text-xs bg-gradient-to-r from-green-500 to-blue-500 text-white px-2 py-1 rounded-full">AI-Powered</span>
              </Link>
              
              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-8">
                {navLinks.map((link) => (
                  <a key={link} href={`#${link.toLowerCase()}`} className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition">{link}</a>
                ))}
                <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <Link href="/register" className="px-5 py-2 rounded-lg bg-gradient-to-r from-green-500 to-blue-500 text-white font-medium hover:shadow-lg transition transform hover:scale-105">
                  Get Started
                </Link>
              </div>
              
              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center space-x-3">
                <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <button onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X className="text-gray-700 dark:text-gray-300" /> : <Menu className="text-gray-700 dark:text-gray-300" />}</button>
              </div>
            </div>
          </div>
          
          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-700">
                <div className="px-4 py-4 space-y-3">
                  {navLinks.map((link) => (
                    <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setIsOpen(false)} className="block text-gray-700 dark:text-gray-300 hover:text-green-600 transition">{link}</a>
                  ))}
                  <Link href="/register" onClick={() => setIsOpen(false)} className="block px-5 py-2 rounded-lg bg-gradient-to-r from-green-500 to-blue-500 text-white text-center font-medium">Get Started</Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-green-800 to-blue-900">
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                Smart Farming with
                <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent"> Artificial Intelligence</span>
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto mb-10">
                Join thousands of farmers using AI-powered insights to increase yields, reduce costs, and make data-driven decisions.
              </p>
              <Link href="/register" className="inline-flex items-center px-8 py-3 rounded-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold hover:shadow-2xl transition-all transform hover:scale-105">
                Start Free Trial <ChevronRight className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Animated Statistics Section */}
        <section ref={statsRef} className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Platform Impact</h2>
              <p className="text-gray-600 dark:text-gray-400">Real-time growth metrics</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: counters.farmers.toLocaleString(), label: 'Active Farmers', icon: '?????', trend: '+45%' },
                { value: counters.acres.toLocaleString(), label: 'Acres Managed', icon: '??', trend: '+78%' },
                { value: `${counters.accuracy}%`, label: 'Accuracy Rate', icon: '??', trend: '+12%' },
                { value: `${counters.countries}+`, label: 'Countries', icon: '??', trend: 'Global' }
              ].map((stat, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
                  <div className="text-5xl mb-3">{stat.icon}</div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                  <div className="text-gray-600 dark:text-gray-400 mt-1">{stat.label}</div>
                  <div className="text-green-600 dark:text-green-400 text-xs mt-2 font-semibold">{stat.trend} growth</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Intelligent Features</h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">Powered by advanced machine learning</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: '??', title: 'AI Crop Prediction', desc: '95% accurate yield forecasts using machine learning algorithms', color: 'from-purple-500 to-pink-500' },
                { icon: '??', title: 'Real-time Analytics', desc: 'Live field monitoring with instant insights and alerts', color: 'from-blue-500 to-cyan-500' },
                { icon: '???', title: 'Weather Intelligence', desc: 'Hyper-local weather predictions and climate impact analysis', color: 'from-green-500 to-emerald-500' },
                { icon: '??', title: 'Pest Detection', desc: 'AI-powered pest identification and early warning system', color: 'from-red-500 to-orange-500' },
                { icon: '??', title: 'Smart Irrigation', desc: 'Water optimization with soil moisture sensors', color: 'from-cyan-500 to-blue-500' },
                { icon: '??', title: 'Market Insights', desc: 'Real-time crop prices and demand forecasting', color: 'from-yellow-500 to-orange-500' }
              ].map((feature, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} viewport={{ once: true }} className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2">
                  <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>
                  <div className="p-6">
                    <div className="text-5xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">About AgriNova</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">AgriNova is revolutionizing agriculture through artificial intelligence and smart technology. Our platform empowers farmers with data-driven insights to maximize yields, reduce costs, and promote sustainable farming practices.</p>
                <div className="space-y-4">
                  {[
                    { icon: <TrendingUp className="w-5 h-5 text-green-600" />, text: 'Increase crop yields by up to 40%' },
                    { icon: <Shield className="w-5 h-5 text-green-600" />, text: 'Reduce water usage with smart irrigation' },
                    { icon: <Users className="w-5 h-5 text-green-600" />, text: 'Join 50,000+ satisfied farmers' },
                    { icon: <Zap className="w-5 h-5 text-green-600" />, text: 'Real-time AI-powered insights' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-3"><div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">{item.icon}</div><span className="text-gray-700 dark:text-gray-300">{item.text}</span></div>
                  ))}
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl p-8 text-white text-center">
                <div className="text-6xl mb-4">??</div>
                <h3 className="text-2xl font-bold mb-2">Our Mission</h3>
                <p>To empower farmers worldwide with accessible AI technology for sustainable and profitable agriculture.</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">What Farmers Say</h2>
              <p className="text-gray-600 dark:text-gray-400">Trusted by agricultural professionals worldwide</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: 'Dr. Sarah Kimani', role: 'Farm Director, Kenya', quote: 'AgriNova transformed our farming operations. The AI predictions are incredibly accurate!', rating: 5 },
                { name: 'James Mwangi', role: 'AgriTech CEO', quote: 'The best investment we made for our farm. Increased yield by 40% in first season.', rating: 5 },
                { name: 'Grace Omondi', role: 'Smallholder Farmer', quote: 'Finally, technology that works for small-scale farmers. Game-changer!', rating: 5 }
              ].map((testimonial, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} viewport={{ once: true }} className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
                  <div className="flex items-center gap-4 mb-4"><div className="w-14 h-14 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-2xl text-white">{testimonial.name[0]}</div><div><h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4><p className="text-gray-600 dark:text-gray-400 text-sm">{testimonial.role}</p><div className="flex text-yellow-400 text-sm">{Array(testimonial.rating).fill('?').join('')}</div></div></div>
                  <p className="text-gray-700 dark:text-gray-300 italic">"{testimonial.quote}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Farming?</h2>
            <p className="text-white/90 text-lg mb-8">Join thousands of farmers using AI-powered crop management</p>
            <Link href="/register" className="inline-flex items-center px-8 py-3 rounded-full bg-white text-green-600 font-semibold hover:shadow-xl transition transform hover:scale-105">
              Get Started Now <ChevronRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div><div className="flex items-center space-x-2 mb-4"><div className="text-2xl">??</div><span className="font-bold text-xl">AgriNova</span></div><p className="text-gray-400 text-sm">Empowering farmers with AI-powered smart technology for sustainable agriculture.</p></div>
              <div><h4 className="font-semibold mb-3">Quick Links</h4><ul className="space-y-2 text-gray-400 text-sm"><li><Link href="#features" className="hover:text-white">Features</Link></li><li><Link href="#about" className="hover:text-white">About</Link></li><li><Link href="#testimonials" className="hover:text-white">Testimonials</Link></li></ul></div>
              <div><h4 className="font-semibold mb-3">Contact</h4><ul className="space-y-2 text-gray-400 text-sm"><li>?? Nairobi, Kenya</li><li>?? +254 714 694 493</li><li>?? karaninicholas700@gmail.com</li></ul></div>
              <div><h4 className="font-semibold mb-3">Legal</h4><ul className="space-y-2 text-gray-400 text-sm"><li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li><li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li></ul></div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">? 2026 AgriNova. All rights reserved.</div>
          </div>
        </footer>
      </div>
    </div>
  )
}
