import { connectDB } from '../db/mongodb'
import { SmartField } from '../db/models/SmartField'
import { User } from '../db/models/User'

export class PersistenceService {
  static async ensureConnection() {
    await connectDB()
    return true
  }

  static async saveField(fieldData: any) {
    await this.ensureConnection()
    try {
      const field = new SmartField(fieldData)
      await field.save()
      console.log('? Field saved to MongoDB:', field.name)
      return field.toObject()
    } catch (error) {
      console.error('Error saving field:', error)
      throw error
    }
  }

  static async updateField(fieldId: string, updateData: any) {
    await this.ensureConnection()
    try {
      const field = await SmartField.findByIdAndUpdate(fieldId, updateData, { new: true })
      console.log('? Field updated in MongoDB:', field?.name)
      return field?.toObject()
    } catch (error) {
      console.error('Error updating field:', error)
      throw error
    }
  }

  static async deleteField(fieldId: string) {
    await this.ensureConnection()
    try {
      await SmartField.findByIdAndDelete(fieldId)
      console.log('? Field deleted from MongoDB:', fieldId)
      return true
    } catch (error) {
      console.error('Error deleting field:', error)
      throw error
    }
  }

  static async getAllFields() {
    await this.ensureConnection()
    try {
      const fields = await SmartField.find().sort({ createdAt: -1 }).lean()
      console.log(`? Retrieved ${fields.length} fields from MongoDB`)
      return fields
    } catch (error) {
      console.error('Error fetching fields:', error)
      return []
    }
  }

  static async getFieldsByAgent(agentId: string) {
    await this.ensureConnection()
    try {
      const fields = await SmartField.find({ agentId }).sort({ createdAt: -1 }).lean()
      console.log(`? Retrieved ${fields.length} fields for agent ${agentId}`)
      return fields
    } catch (error) {
      console.error('Error fetching agent fields:', error)
      return []
    }
  }

  static async saveUser(userData: any) {
    await this.ensureConnection()
    try {
      const user = new User(userData)
      await user.save()
      console.log('? User saved to MongoDB:', user.email)
      return user.toObject()
    } catch (error) {
      console.error('Error saving user:', error)
      throw error
    }
  }

  static async findUserByEmail(email: string) {
    await this.ensureConnection()
    try {
      const user = await User.findOne({ email }).lean()
      return user
    } catch (error) {
      console.error('Error finding user:', error)
      return null
    }
  }

  static async findUserById(id: string) {
    await this.ensureConnection()
    try {
      const user = await User.findById(id).lean()
      return user
    } catch (error) {
      console.error('Error finding user by ID:', error)
      return null
    }
  }
}
