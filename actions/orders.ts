'use server'

import prisma from "@/lib/prisma"
import { auth } from "@/auth"

export async function createOrder(data: {
  items: { id: string, name: string, price: number, quantity: number }[]
  total: number
  paymentMethod: string
  momoNumber?: string
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
}) {
  const session = await auth()
  const userId = session?.user?.id

  try {
    const order = await prisma.order.create({
      data: {
        userId,
        total: data.total,
        paymentMethod: data.paymentMethod,
        momoNumber: data.momoNumber,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        items: {
          create: data.items.map(item => ({
            productId: item.id,
            price: item.price,
            quantity: item.quantity,
          }))
        }
      }
    })

    return { success: true, orderId: order.id }
  } catch (error: any) {
    console.error("Order creation error:", error)
    return { success: false, error: error.message || "Unknown error occurred" }
  }
}

export async function getUserOrders() {
  const session = await auth()
  if (!session?.user?.id) return []

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: {
      items: {
        include: {
          product: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  })

  return orders
}
