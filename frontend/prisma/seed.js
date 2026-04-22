const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')

  // Clean existing data
  await prisma.prediction.deleteMany().catch(() => {})
  await prisma.update.deleteMany().catch(() => {})
  await prisma.field.deleteMany().catch(() => {})
  await prisma.user.deleteMany().catch(() => {})

  console.log('Cleaned existing data')

  // Create users
  const adminPassword = await bcrypt.hash('admin123', 10)
  const agentPassword = await bcrypt.hash('agent123', 10)

  const admin = await prisma.user.create({
    data: {
      email: 'admin@agrinova.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN',
    },
  })

  const agent1 = await prisma.user.create({
    data: {
      email: 'john@agrinova.com',
      name: 'John Field Agent',
      password: agentPassword,
      role: 'FIELD_AGENT',
    },
  })

  const agent2 = await prisma.user.create({
    data: {
      email: 'sarah@agrinova.com',
      name: 'Sarah Agent',
      password: agentPassword,
      role: 'FIELD_AGENT',
    },
  })

  console.log('Created users')

  // Create fields
  const fields = [
    {
      name: 'North Field',
      cropType: 'Corn',
      plantingDate: new Date('2024-03-15'),
      currentStage: 'GROWING',
      location: 'North Region',
      size: 45.5,
      agentId: agent1.id,
    },
    {
      name: 'South Valley',
      cropType: 'Wheat',
      plantingDate: new Date('2024-02-20'),
      currentStage: 'READY',
      location: 'South Region',
      size: 32.0,
      agentId: agent1.id,
    },
    {
      name: 'East Garden',
      cropType: 'Tomatoes',
      plantingDate: new Date('2024-04-01'),
      currentStage: 'PLANTED',
      location: 'East Region',
      size: 12.5,
      agentId: agent2.id,
    },
    {
      name: 'West Field',
      cropType: 'Soybeans',
      plantingDate: new Date('2024-01-10'),
      currentStage: 'HARVESTED',
      location: 'West Region',
      size: 28.0,
      agentId: agent2.id,
    },
  ]

  for (const fieldData of fields) {
    const field = await prisma.field.create({
      data: fieldData,
    })

    await prisma.update.create({
      data: {
        fieldId: field.id,
        userId: field.agentId,
        newStage: field.currentStage,
        notes: `Initial update for ${field.name}`,
        healthScore: Math.floor(Math.random() * 30) + 70,
        weatherData: JSON.stringify({
          temperature: Math.floor(Math.random() * 15) + 20,
          humidity: Math.floor(Math.random() * 40) + 50,
          rainfall: Math.random() * 10,
        }),
      },
    })
  }

  console.log('Created fields and updates')
  console.log('\n✅ Database seeded successfully!')
  console.log('\n📝 Demo Credentials:')
  console.log('Admin: admin@agrinova.com / admin123')
  console.log('Agent 1: john@agrinova.com / agent123')
  console.log('Agent 2: sarah@agrinova.com / agent123')
}

main()
  .catch((e) => {
    console.error('Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })