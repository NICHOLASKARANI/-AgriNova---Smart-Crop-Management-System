import mongoose from 'mongoose'

export interface IResetToken {
  userId: mongoose.Types.ObjectId
  token: string
  expiresAt: Date
  used: boolean
  createdAt: Date
}

const resetTokenSchema = new mongoose.Schema<IResetToken>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  token: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true, default: () => new Date(Date.now() + 3600000) },
  used: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
})

export const ResetToken = mongoose.models.ResetToken || mongoose.model<IResetToken>('ResetToken', resetTokenSchema)
