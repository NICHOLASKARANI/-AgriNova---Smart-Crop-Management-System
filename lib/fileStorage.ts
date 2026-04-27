// Simple file-based storage that works on Vercel
import fs from 'fs'
import path from 'path'

const dataFilePath = path.join(process.cwd(), 'data', 'users.json')

// Ensure data directory exists
if (!fs.existsSync(path.join(process.cwd(), 'data'))) {
  fs.mkdirSync(path.join(process.cwd(), 'data'), { recursive: true })
}

// Initialize users file if it doesn't exist
if (!fs.existsSync(dataFilePath)) {
  fs.writeFileSync(dataFilePath, JSON.stringify([], null, 2))
}

export const fileStorage = {
  getUsers: () => {
    try {
      const data = fs.readFileSync(dataFilePath, 'utf8')
      return JSON.parse(data)
    } catch (error) {
      return []
    }
  },
  
  saveUsers: (users: any[]) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2))
  },
  
  addUser: (user: any) => {
    const users = fileStorage.getUsers()
    users.push(user)
    fileStorage.saveUsers(users)
    console.log('? User saved:', user.email)
    return user
  },
  
  findUserByEmail: (email: string) => {
    const users = fileStorage.getUsers()
    return users.find((u: any) => u.email === email)
  }
}
