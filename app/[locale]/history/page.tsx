'use client'

import { useTranslations } from 'next-intl'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getUserOrders } from '@/actions/orders'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

export default function HistoryPage() {
  const t = useTranslations()
  const { data: session, status } = useSession()
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'authenticated') {
      getUserOrders().then(data => {
        setOrders(data)
        setLoading(false)
      })
    } else if (status === 'unauthenticated') {
      setLoading(false)
    }
  }, [status])

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center max-w-md border-0 shadow-xl">
          <h2 className="text-2xl font-bold mb-4">Please log in to view your order history</h2>
          <p className="text-gray-600 mb-6">You need an account to track your previous purchases at Simba.</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">Order History</h1>
          <p className="text-gray-600 dark:text-gray-400">View and track all your previous purchases at Simba Supermarket</p>
        </header>

        {orders.length === 0 ? (
          <Card className="p-12 text-center border-0 shadow-sm rounded-2xl">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">No orders yet</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Start shopping to see your history here!</p>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-sm overflow-hidden rounded-2xl hover:shadow-md transition-shadow">
                  <CardHeader className="bg-white dark:bg-slate-800 border-b border-gray-100 dark:border-slate-700 p-6">
                    <div className="flex flex-wrap justify-between items-center gap-4">
                      <div>
                        <p className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-1">Order Number</p>
                        <CardTitle className="text-lg font-mono">{order.id}</CardTitle>
                      </div>
                      <div className="flex gap-8">
                        <div>
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Date</p>
                          <p className="font-semibold">{new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Total</p>
                          <p className="font-extrabold text-teal-700 dark:text-teal-400">{order.total.toLocaleString()} RWF</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Status</p>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            order.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : 
                            order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' : 
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 bg-gray-50/50 dark:bg-slate-800/50">
                    <div className="space-y-4">
                      {order.items.map((item: any) => (
                        <div key={item.id} className="flex items-center gap-4">
                          <div className="relative w-16 h-16 bg-white rounded-lg overflow-hidden border border-gray-100 p-2">
                            <Image 
                              src={item.product.image} 
                              alt={item.product.name} 
                              fill 
                              className="object-contain"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900 dark:text-white line-clamp-1">{item.product.name}</h4>
                            <p className="text-sm text-gray-500">{item.quantity} x {item.price.toLocaleString()} RWF</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gray-900 dark:text-white">{(item.quantity * item.price).toLocaleString()} RWF</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-700 grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div>
                         <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Shipping Details</p>
                         <p className="font-medium text-gray-900 dark:text-white">{order.firstName} {order.lastName}</p>
                         <p className="text-sm text-gray-600 dark:text-gray-400">{order.address}</p>
                         <p className="text-sm text-gray-600 dark:text-gray-400">{order.phone}</p>
                       </div>
                       <div>
                         <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Payment</p>
                         <p className="font-medium text-gray-900 dark:text-white capitalize">{order.paymentMethod}</p>
                         {order.momoNumber && <p className="text-sm text-gray-600 dark:text-gray-400">MoMo: {order.momoNumber}</p>}
                       </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
