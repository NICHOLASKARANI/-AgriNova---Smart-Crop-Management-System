import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://agrinova_user:AgriNova2024Secure@cluster0.hqzbmb3.mongodb.net/agrinova?retryWrites=true&w=majority&appName=Cluster0'

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI environment variable')
}

let cached = (global as any).mongoose

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null }
}

export async function connectDB() {
  if (cached.conn) {
    console.log('? Using existing MongoDB connection')
    return cached.conn
  }

  if (!cached.promise) {
    console.log('?? Connecting to MongoDB Atlas...')
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('? MongoDB connected successfully to:', mongoose.connection.name)
      console.log('?? Database:', mongoose.connection.db?.databaseName)
      return mongoose
    }).catch((err) => {
      console.error('? MongoDB connection error:', err.message)
      console.log('?? Falling back to in-memory storage')
      throw err
    })
  }
  
  cached.conn = await cached.promise
  return cached.conn
}

// Check connection status
export async function isDBConnected() {
  try {
    const conn = await connectDB()
    return conn.connection.readyState === 1
  } catch {
    return false
  }
}

// Get database stats
export async function getDBStats() {
  try {
    const conn = await connectDB()
    const stats = await conn.connection.db?.stats()
    return {
      collections: stats?.collections || 0,
      objects: stats?.objects || 0,
      dataSize: stats?.dataSize || 0,
      storageSize: stats?.storageSize || 0
    }
  } catch (error) {
    console.error('Error getting DB stats:', error)
    return null
  }
}
