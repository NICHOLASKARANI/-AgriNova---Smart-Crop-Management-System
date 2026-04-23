'use client'

import { useState } from 'react'
import Link from 'next/link'

const courses = [
  {
    id: 1,
    title: 'Smart Farming Fundamentals',
    description: 'Learn the basics of AI-powered farming',
    duration: '4 weeks',
    level: 'Beginner',
    students: 1234,
    image: '??'
  },
  {
    id: 2,
    title: 'Business Growth Strategies',
    description: 'Scale your agribusiness with proven strategies',
    duration: '6 weeks',
    level: 'Intermediate',
    students: 892,
    image: '??'
  },
  {
    id: 3,
    title: 'Digital Marketing for Farmers',
    description: 'Reach more customers online',
    duration: '3 weeks',
    level: 'Beginner',
    students: 2156,
    image: '??'
  },
  {
    id: 4,
    title: 'Financial Management',
    description: 'Master your farm finances',
    duration: '5 weeks',
    level: 'Advanced',
    students: 567,
    image: '??'
  }
]

export default function Courses() {
  const [search, setSearch] = useState('')
  const [level, setLevel] = useState('all')

  const filteredCourses = courses.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase())
    const matchesLevel = level === 'all' || c.level === level
    return matchesSearch && matchesLevel
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">??</span>
              <h1 className="text-xl font-bold text-green-600">Learning Center</h1>
            </div>
            <Link href="/admin" className="text-gray-600 hover:text-green-600 transition">
              ? Back to Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Empower Your Business</h2>
          <p className="text-gray-600">Free courses to help you grow</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            />
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="all">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 p-8 text-center">
                <div className="text-6xl">{course.image}</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                <div className="flex justify-between text-sm mb-4">
                  <span className="text-gray-500">?? {course.duration}</span>
                  <span className="text-gray-500">?? {course.level}</span>
                  <span className="text-gray-500">?? {course.students}</span>
                </div>
                <button className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-2 rounded-lg hover:shadow-lg transition">
                  Start Learning ?
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
