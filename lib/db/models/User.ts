import mongoose from 'mongoose'

export interface IUser {
  name: string
  email: string
  password: string
  role: 'admin' | 'user' | 'moderator'
  verified: boolean
  subscription: 'free' | 'premium'
  phone?: string
  location?: string
  lastLogin?: Date
  createdAt: Date
  updatedAt: Date
}

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user', 'moderator'], default: 'user' },
  verified: { type: Boolean, default: true },
  subscription: { type: String, enum: ['free', 'premium'], default: 'free' },
  phone: { type: String, default: '' },
  location: { type: String, default: '' },
  lastLogin: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

export const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema)
