export interface User {
  id: string
  name: string
  email: string
  password: string
  role: 'admin' | 'user' | 'moderator'
  verified: boolean
  createdAt: string
  subscription: 'free' | 'premium'
  avatar?: string
  businessName?: string
  phone?: string
}

// In-memory user store (replace with database in production)
let users: User[] = []

// Initialize with demo users
const initUsers = () => {
  if (users.length === 0) {
    users.push({
      id: '1',
      name: 'Admin User',
      email: 'admin@agrinova.com',
      password: '$2a$10$hash', // Will be set properly
      role: 'admin',
      verified: true,
      createdAt: new Date().toISOString(),
      subscription: 'premium'
    })
  }
}

export const userStore = {
  users,
  initUsers,
  findById: (id: string) => users.find(u => u.id === id),
  findByEmail: (email: string) => users.find(u => u.email === email),
  create: (user: User) => { users.push(user); return user },
  update: (id: string, data: Partial<User>) => {
    const index = users.findIndex(u => u.id === id)
    if (index !== -1) { users[index] = { ...users[index], ...data }; return users[index] }
    return null
  }
}
