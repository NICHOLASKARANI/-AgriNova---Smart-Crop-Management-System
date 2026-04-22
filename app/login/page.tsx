'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    // Simple client-side authentication for demo
    if (email === 'admin@agrinova.com' && password === 'admin123') {
      document.cookie = 'session=admin; path=/; max-age=86400'
      router.push('/admin')
    } else if (email === 'john@agrinova.com' && password === 'agent123') {
      document.cookie = 'session=agent; path=/; max-age=86400'
      router.push('/agent')
    } else {
      setError('Invalid credentials. Use admin@agrinova.com/admin123 or john@agrinova.com/agent123')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-5xl mb-2">??</div>
          <h1 className="text-3xl font-bold text-green-600 mb-2">AgriNova</h1>
          <p className="text-gray-600">Smart Crop Management System</p>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              placeholder="admin@agrinova.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              placeholder="????????"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-semibold"
          >
            Sign In
          </button>
        </form>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm font-semibold text-gray-700 mb-2 text-center">Demo Credentials:</p>
          <div className="space-y-1 text-sm">
            <p><span className="font-medium">Admin:</span> admin@agrinova.com / admin123</p>
            <p><span className="font-medium">Agent:</span> john@agrinova.com / agent123</p>
          </div>
        </div>
      </div>
    </div>
  )
}
