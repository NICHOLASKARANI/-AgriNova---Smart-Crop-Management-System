'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Product {
  id: string
  name: string
  description: string
  price: number
  seller: string
  category: string
  image: string
  rating: number
}

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('all')
  const [products] = useState<Product[]>([
    {
      id: '1',
      name: 'Organic Fertilizer',
      description: 'Premium organic fertilizer for all crops',
      price: 45,
      seller: 'Green Farms Ltd',
      category: 'Supplies',
      image: '??',
      rating: 4.8
    },
    {
      id: '2',
      name: 'Irrigation System',
      description: 'Smart drip irrigation system',
      price: 299,
      seller: 'AgriTech Solutions',
      category: 'Equipment',
      image: '??',
      rating: 4.9
    },
    {
      id: '3',
      name: 'Crop Consulting',
      description: 'Expert crop management consulting',
      price: 150,
      seller: 'Farm Experts',
      category: 'Services',
      image: '?????',
      rating: 4.7
    }
  ])

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = category === 'all' || p.category === category
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl">??</span>
              <span className="text-xl font-bold text-green-600">AgriNova Marketplace</span>
            </Link>
            <Link href="/admin" className="text-gray-600 hover:text-green-600 transition">
              ? Back to Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All Categories</option>
              <option value="Supplies">Supplies</option>
              <option value="Equipment">Equipment</option>
              <option value="Services">Services</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 p-8 text-center">
                <div className="text-6xl">{product.image}</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-green-600">${product.price}</span>
                  <span className="text-sm text-gray-500">? {product.rating}</span>
                </div>
                <p className="text-sm text-gray-500 mb-4">Seller: {product.seller}</p>
                <button className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-2 rounded-lg hover:shadow-lg transition">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
