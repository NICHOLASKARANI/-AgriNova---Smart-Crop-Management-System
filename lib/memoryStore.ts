// Shared memory storage that persists across API requests
global.users = global.users || []
global.fields = global.fields || []

export const memoryStore = {
  users: global.users,
  fields: global.fields,
  
  addUser: (user) => {
    global.users.push(user)
    console.log('? User added:', user.email, 'Total users:', global.users.length)
    return user
  },
  
  findUserByEmail: (email) => {
    const user = global.users.find(u => u.email === email)
    console.log('?? Looking for user:', email, 'Found:', !!user)
    return user
  },
  
  getAllUsers: () => global.users,
  
  addField: (field) => {
    global.fields.push(field)
    return field
  },
  
  getFields: () => global.fields
}
