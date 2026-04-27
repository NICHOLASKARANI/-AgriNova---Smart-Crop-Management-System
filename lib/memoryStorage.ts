// In-memory storage for when MongoDB is unavailable
const users: any[] = []

export const memoryStorage = {
  users,
  
  findUserByEmail: (email: string) => {
    return users.find(u => u.email === email)
  },
  
  createUser: (user: any) => {
    const newUser = { ...user, _id: Date.now().toString() }
    users.push(newUser)
    console.log('? User saved to memory:', user.email)
    return newUser
  }
}
