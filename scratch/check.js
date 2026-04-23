const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const products = await prisma.product.count()
  const latest = await prisma.product.findFirst()
  console.log('Count:', products)
  console.log('Sample:', latest)
  await prisma.$disconnect()
}

main().catch(console.error)
