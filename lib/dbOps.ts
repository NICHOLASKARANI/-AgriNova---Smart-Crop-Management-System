import { db } from './index'

export interface User {
  id: string
  name: string
  email: string
  password: string
  role: string
  phone?: string
  location?: string
  created_at: string
  last_login?: string
}

export interface Order {
  id: string
  user_id: string
  total: number
  status: string
  items: number
  created_at: string
}

export const dbOps = {
  // User operations
  createUser: (user: Omit<User, 'created_at'>) => {
    const stmt = db.prepare(`
      INSERT INTO users (id, name, email, password, role, phone, location)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `)
    return stmt.run(user.id, user.name, user.email, user.password, user.role, user.phone || '', user.location || '')
  },
  
  findUserByEmail: (email: string): User | undefined => {
    const stmt = db.prepare('SELECT * FROM users WHERE email = ?')
    return stmt.get(email) as User | undefined
  },
  
  findUserById: (id: string): User | undefined => {
    const stmt = db.prepare('SELECT * FROM users WHERE id = ?')
    return stmt.get(id) as User | undefined
  },
  
  updateUser: (id: string, data: Partial<User>) => {
    const fields = Object.keys(data).map(key => `${key} = ?`).join(', ')
    const values = Object.values(data)
    const stmt = db.prepare(`UPDATE users SET ${fields} WHERE id = ?`)
    return stmt.run(...values, id)
  },
  
  updateLastLogin: (id: string) => {
    const stmt = db.prepare('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?')
    return stmt.run(id)
  },
  
  // Order operations
  createOrder: (order: Omit<Order, 'created_at'>) => {
    const stmt = db.prepare(`
      INSERT INTO orders (id, user_id, total, status, items)
      VALUES (?, ?, ?, ?, ?)
    `)
    return stmt.run(order.id, order.user_id, order.total, order.status, order.items)
  },
  
  getOrdersByUser: (userId: string): Order[] => {
    const stmt = db.prepare('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC')
    return stmt.all(userId) as Order[]
  },
  
  // Wishlist operations
  addToWishlist: (id: string, userId: string, productId: string, productName: string, productPrice: number) => {
    const stmt = db.prepare(`
      INSERT INTO wishlist (id, user_id, product_id, product_name, product_price)
      VALUES (?, ?, ?, ?, ?)
    `)
    return stmt.run(id, userId, productId, productName, productPrice)
  },
  
  getWishlist: (userId: string) => {
    const stmt = db.prepare('SELECT * FROM wishlist WHERE user_id = ? ORDER BY created_at DESC')
    return stmt.all(userId)
  },
  
  // Notification operations
  addNotification: (id: string, userId: string, message: string) => {
    const stmt = db.prepare(`
      INSERT INTO notifications (id, user_id, message)
      VALUES (?, ?, ?)
    `)
    return stmt.run(id, userId, message)
  },
  
  getNotifications: (userId: string) => {
    const stmt = db.prepare('SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC')
    return stmt.all(userId)
  },
  
  markNotificationRead: (id: string) => {
    const stmt = db.prepare('UPDATE notifications SET read = 1 WHERE id = ?')
    return stmt.run(id)
  }
}
