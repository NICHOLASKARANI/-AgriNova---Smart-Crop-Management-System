const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting production seed...')
  
  // Check if admin exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: 'admin@agrinova.com' }
  })
  
  if (!existingAdmin) {
    const adminPassword = await bcrypt.hash('admin123', 10)
    await prisma.user.create({
      data: {
        email: 'admin@agrinova.com',
        name: 'Admin User',
        password: adminPassword,
        role: 'ADMIN',
      },
    })
    console.log('✅ Admin user created')
  }
  
  // Check if agent exists
  const existingAgent = await prisma.user.findUnique({
    where: { email: 'john@agrinova.com' }
  })
  
  if (!existingAgent) {
    const agentPassword = await bcrypt.hash('agent123', 10)
    await prisma.user.create({
      data: {
        email: 'john@agrinova.com',
        name: 'John Field Agent',
        password: agentPassword,
        role: 'FIELD_AGENT',
      },
    })
    console.log('✅ Agent user created')
  }
  
  console.log('✨ Production seed completed!')
  console.log('📝 Demo Credentials:')
  console.log('   Admin: admin@agrinova.com / admin123')
  console.log('   Agent: john@agrinova.com / agent123')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })