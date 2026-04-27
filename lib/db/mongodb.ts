import mongoose from 'mongoose'

// MongoDB connection string
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
    console.log('? Using cached MongoDB connection')
    return cached.conn
  }

  if (!cached.promise) {
    console.log('?? Connecting to MongoDB Atlas...')
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 10000,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('? MongoDB connected successfully!')
        console.log('?? Database:', mongoose.connection.db?.databaseName)
        return mongoose
      })
      .catch((err) => {
        console.error('? MongoDB connection error:', err.message)
        console.log('?? Continuing with limited functionality...')
        return null
      })
  }
  
  cached.conn = await cached.promise
  return cached.conn
}
