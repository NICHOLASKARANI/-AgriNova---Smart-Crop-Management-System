'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  User, Settings, ShoppingBag, Heart, Bell, MessageCircle, 
  CreditCard, LogOut, Sun, Moon, Activity, TrendingUp,
  Package, Star, Clock, Shield, Edit2, Camera
} from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()
  const [darkMode, setDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [editingProfile, setEditingProfile] = useState(false)
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    location: ''
  })

  // User data
  const [orders, setOrders] = useState([
    { id: 'ORD-001', date: '2024-01-15', total: 299, status: 'Delivered', items: 3 },
    { id: 'ORD-002', date: '2024-02-20', total: 459, status: 'Processing', items: 2 },
    { id: 'ORD-003', date: '2024-03-10', total: 149, status: 'Shipped', items: 1 }
  ])

  const [wishlist, setWishlist] = useState([
    { id: 1, name: 'Smart Irrigation System', price: 299, image: '??' },
    { id: 2, name: 'AI Crop Sensor', price: 149, image: '??' }
  ])

  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Your order ORD-002 has been shipped', time: '2 hours ago', read: false },
    { id: 2, message: 'New AI crop prediction available', time: '1 day ago', read: true },
    { id: 3, message: 'Special discount on irrigation systems', time: '2 days ago', read: false }
  ])

  const [messages, setMessages] = useState([
    { id: 1, from: 'Support Team', message: 'How can we help you today?', time: '10:30 AM', unread: true },
    { id: 2, from: 'AI Assistant', message: 'Your fields are healthy', time: 'Yesterday', unread: false }
  ])

  useEffect(() => {
    // Check authentication
    const session = document.cookie.includes('session')
    if (!session) {
      router.push('/login')
      return
    }
    
    // Load user data from session
    const sessionCookie = document.cookie.split(';').find(c => c.includes('session'))
    if (sessionCookie) {
      try {
        const sessionData = JSON.parse(decodeURIComponent(sessionCookie.split('=')[1]))
        setUser(sessionData)
        setProfileData({
          name: sessionData.name || 'User',
          email: sessionData.email || '',
          phone: '+254 700 123 456',
          location: 'Nairobi, Kenya'
        })
      } catch (e) {
        console.error('Error parsing session')
      }
    }
    setLoading(false)
  }, [router])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const handleLogout = () => {
    document.cookie = 'session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
    router.push('/login')
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setEditingProfile(false)
    // In production, save to API
  }

  const markNotificationRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ))
  }

  const unreadNotifications = notifications.filter(n => !n.read).length
  const unreadMessages = messages.filter(m => m.unread).length

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${darkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg z-20">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-8">
            <span className="text-2xl">??</span>
            <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">AgriNova</span>
          </div>
          
          <nav className="space-y-2">
            {[
              { id: 'overview', icon: <Activity size={20} />, label: 'Overview' },
              { id: 'profile', icon: <User size={20} />, label: 'Profile' },
              { id: 'orders', icon: <ShoppingBag size={20} />, label: 'Orders' },
              { id: 'wishlist', icon: <Heart size={20} />, label: 'Wishlist' },
              { id: 'notifications', icon: <Bell size={20} />, label: 'Notifications', badge: unreadNotifications },
              { id: 'messages', icon: <MessageCircle size={20} />, label: 'Messages', badge: unreadMessages },
              { id: 'payments', icon: <CreditCard size={20} />, label: 'Payments' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition ${
                  activeTab === item.id 
                    ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.badge > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">{item.badge}</span>
                )}
              </button>
            ))}
          </nav>
          
          <div className="absolute bottom-6 left-0 right-0 px-6 space-y-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        {/* Top Navbar */}
        <div className="bg-white dark:bg-gray-800 shadow-sm px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white capitalize">{activeTab}</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                {user?.name?.[0] || 'U'}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{user?.name || 'User'}</p>
                <p className="text-xs text-gray-500">{user?.email || ''}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl">??</div>
                    <TrendingUp className="text-green-500" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{orders.length}</div>
                  <div className="text-gray-600 dark:text-gray-400">Total Orders</div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                  <div className="text-3xl mb-4">??</div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{wishlist.length}</div>
                  <div className="text-gray-600 dark:text-gray-400">Wishlist Items</div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                  <div className="text-3xl mb-4">??</div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{unreadNotifications}</div>
                  <div className="text-gray-600 dark:text-gray-400">Unread Notifications</div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                  <div className="text-3xl mb-4">??</div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{unreadMessages}</div>
                  <div className="text-gray-600 dark:text-gray-400">Unread Messages</div>
                </div>
              </div>
              
              {/* Recent Activity */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {orders.slice(0, 3).map((order) => (
                    <div key={order.id} className="flex items-center justify-between py-3 border-b dark:border-gray-700">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{order.id}</p>
                        <p className="text-sm text-gray-500">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">${order.total}</p>
                        <p className={`text-xs px-2 py-1 rounded-full inline-block ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>{order.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Profile Settings</h2>
                <button
                  onClick={() => setEditingProfile(!editingProfile)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:shadow-lg transition"
                >
                  <Edit2 size={16} />
                  <span>{editingProfile ? 'Cancel' : 'Edit Profile'}</span>
                </button>
              </div>
              
              {editingProfile ? (
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  <button type="submit" className="px-6 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:shadow-lg transition">Save Changes</button>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-4xl text-white">
                      {profileData.name?.[0] || 'U'}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{profileData.name}</h3>
                      <p className="text-gray-500">{profileData.email}</p>
                      <p className="text-gray-500">{profileData.phone}</p>
                      <p className="text-gray-500">{profileData.location}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
              <div className="p-6 border-b dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Order History</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y dark:divide-gray-700">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{order.id}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{order.date}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{order.items}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-green-600">${order.total}</td>
                        <td className="px-6 py-4"><span className={`text-xs px-2 py-1 rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>{order.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Wishlist Tab */}
          {activeTab === 'wishlist' && (
            <div className="grid md:grid-cols-3 gap-6">
              {wishlist.map((item) => (
                <div key={item.id} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 hover:shadow-lg transition">
                  <div className="text-5xl mb-4">{item.image}</div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.name}</h3>
                  <p className="text-2xl font-bold text-green-600 mb-4">${item.price}</p>
                  <button className="w-full py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:shadow-lg transition">Add to Cart</button>
                </div>
              ))}
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div key={notification.id} onClick={() => markNotificationRead(notification.id)} className={`bg-white dark:bg-gray-800 rounded-xl shadow p-4 cursor-pointer hover:shadow-lg transition ${!notification.read ? 'border-l-4 border-green-500' : ''}`}>
                  <p className="text-gray-900 dark:text-white">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                </div>
              ))}
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === 'messages' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
              <div className="p-6 border-b dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Support Chat</h2>
              </div>
              <div className="h-96 overflow-y-auto p-6 space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.from === 'Support Team' ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-md p-3 rounded-lg ${msg.from === 'Support Team' ? 'bg-gray-100 dark:bg-gray-700' : 'bg-gradient-to-r from-green-500 to-blue-500 text-white'}`}>
                      <p className="text-sm font-semibold">{msg.from}</p>
                      <p className="text-sm">{msg.message}</p>
                      <p className="text-xs mt-1 opacity-75">{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t dark:border-gray-700">
                <div className="flex space-x-2">
                  <input type="text" placeholder="Type your message..." className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600" />
                  <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:shadow-lg transition">Send</button>
                </div>
              </div>
            </div>
          )}

          {/* Payments Tab */}
          {activeTab === 'payments' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Payment Methods</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">??</div>
                    <div>
                      <p className="font-semibold">VISA ???? 4242</p>
                      <p className="text-sm text-gray-500">Expires 12/25</p>
                    </div>
                  </div>
                  <button className="text-green-600 hover:text-green-700">Edit</button>
                </div>
                <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-green-500 hover:text-green-500 transition">+ Add New Payment Method</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
