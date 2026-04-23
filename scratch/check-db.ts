import prisma from './lib/prisma'

async function check() {
  const users = await prisma.user.count()
  const products = await prisma.product.count()
  const latestProduct = await prisma.product.findFirst()
  console.log({ users, products, latestProduct })
}

check().catch(console.error)
