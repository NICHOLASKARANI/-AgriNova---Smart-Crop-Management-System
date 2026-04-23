'use client'

import Link from 'next/link'
import { useState } from 'react'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa'

export default function AdvancedFooter() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-3xl animate-pulse">??</span>
              <h3 className="text-xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                AgriNova
              </h3>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              SmartSeason Field Monitoring System - Empowering African farmers with AI-powered agricultural intelligence.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-green-400 transition transform hover:scale-110">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition transform hover:scale-110">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition transform hover:scale-110">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition transform hover:scale-110">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition transform hover:scale-110">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><Link href="/" className="hover:text-green-400 transition flex items-center gap-2">?? Home</Link></li>
              <li><Link href="/about" className="hover:text-green-400 transition flex items-center gap-2">?? About Us</Link></li>
              <li><Link href="/features" className="hover:text-green-400 transition flex items-center gap-2">?? Features</Link></li>
              <li><Link href="/pricing" className="hover:text-green-400 transition flex items-center gap-2">?? Pricing</Link></li>
              <li><Link href="/faq" className="hover:text-green-400 transition flex items-center gap-2">? FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-green-400 transition flex items-center gap-2">?? Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="flex items-center gap-3">
                <FaPhone className="text-green-400" />
                <a href="tel:+254714694493" className="hover:text-green-400 transition">
                  +254 714 694 493
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-green-400" />
                <a href="mailto:karaninicholas700@gmail.com" className="hover:text-green-400 transition break-all">
                  karaninicholas700@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-green-400" />
                <span>Nairobi, Kenya</span>
              </li>
            </ul>
            
            {/* Business Hours */}
            <div className="mt-4 pt-4 border-t border-gray-700">
              <h4 className="text-sm font-semibold mb-2">Business Hours</h4>
              <p className="text-gray-400 text-xs">Monday - Friday: 8:00 AM - 6:00 PM</p>
              <p className="text-gray-400 text-xs">Saturday: 9:00 AM - 4:00 PM</p>
              <p className="text-gray-400 text-xs">Sunday: Closed</p>
            </div>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-300 text-sm mb-3">
              Subscribe to get latest updates and farming insights.
            </p>
            <form onSubmit={handleSubscribe} className="mb-4">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 px-3 py-2 rounded-l-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-green-500 to-blue-500 px-4 py-2 rounded-r-lg hover:shadow-lg transition"
                >
                  Subscribe
                </button>
              </div>
            </form>
            {subscribed && (
              <p className="text-green-400 text-sm animate-pulse">? Subscribed successfully!</p>
            )}
            
            {/* App Stores */}
            <div className="mt-4">
              <h4 className="text-sm font-semibold mb-2">Download App</h4>
              <div className="flex gap-2">
                <button className="bg-gray-800 px-3 py-2 rounded-lg text-xs hover:bg-gray-700 transition flex items-center gap-2">
                  ?? App Store
                </button>
                <button className="bg-gray-800 px-3 py-2 rounded-lg text-xs hover:bg-gray-700 transition flex items-center gap-2">
                  ?? Google Play
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Partners Section */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <h3 className="text-center text-sm font-semibold mb-4">Trusted Partners</h3>
          <div className="flex flex-wrap justify-center gap-8">
            {['AGRA', 'FAO', 'USAID', 'World Bank', 'IFAD', 'UNDP'].map((partner, i) => (
              <span key={i} className="text-gray-400 text-xs hover:text-green-400 transition cursor-pointer">
                {partner}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-xs">
              ? {currentYear} AgriNova. All rights reserved. | Smart Farming for Sustainable Future
            </p>
            <div className="flex gap-6 text-xs">
              <Link href="/privacy" className="text-gray-400 hover:text-green-400 transition">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-green-400 transition">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-green-400 transition">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
