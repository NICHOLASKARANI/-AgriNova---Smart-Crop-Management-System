import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  total: { type: Number, required: true },
  status: { type: String, default: 'pending' },
  items: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
})

export const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema)
