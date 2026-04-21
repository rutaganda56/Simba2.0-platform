'use client';

import { useTranslations } from 'next-intl';
import { useCart } from '@/lib/store';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Link } from '@/routing';
import { useRouter } from '@/routing';

interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  province: string;
  district: string;
  sector: string;
  address: string;
  paymentMethod: string;
  momoNumber?: string;
}

const PROVINCES = ['Kigali', 'Northern', 'Southern', 'Eastern', 'Western'];
const DISTRICTS = ['Kicukiro', 'Nyarugenge', 'Gasabo', 'Muhanga', 'Butare'];
const SECTORS = ['Sector 1', 'Sector 2', 'Sector 3', 'Sector 4', 'Sector 5'];

export default function CheckoutPage() {
  const t = useTranslations();
  const { items, getTotal, clearCart } = useCart();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    province: '',
    district: '',
    sector: '',
    address: '',
    paymentMethod: '',
  });
  const [orderId, setOrderId] = useState('');

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t('cart.empty')}
          </h1>
          <Link href="/products">
            <Button>{t('cart.continueShop')}</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.firstName || !formData.email || !formData.phone) {
        alert('Please fill all required fields');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!formData.paymentMethod) {
        alert('Please select a payment method');
        return;
      }
      if (formData.paymentMethod === 'momo' && !formData.momoNumber) {
        alert('Please enter MTN MoMo number');
        return;
      }
      setStep(3);
      handleConfirmOrder();
    }
  };

  const handleConfirmOrder = () => {
    const newOrderId = `ORD-${Date.now()}`;
    setOrderId(newOrderId);
    clearCart();
    setTimeout(() => {
      router.push('/checkout/success?order=' + newOrderId);
    }, 2000);
  };

  const subtotal = getTotal();
  const shipping = subtotal > 50000 ? 0 : 5000;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Steps */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-8">
            {[1, 2, 3].map((s) => (
              <motion.div
                key={s}
                className="flex items-center flex-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    s <= step
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-300 dark:bg-slate-700 text-gray-600 dark:text-gray-400'
                  }`}
                  whileHover={{ scale: 1.1 }}
                >
                  {s}
                </motion.div>
                {s < 3 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      s < step ? 'bg-green-600' : 'bg-gray-300 dark:bg-slate-700'
                    }`}
                  />
                )}
              </motion.div>
            ))}
          </div>

          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>{t('checkout.step1')}</span>
            <span>{t('checkout.step2')}</span>
            <span>{t('checkout.step3')}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {step === 1 && (
                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        {t('checkout.step1')}
                      </h2>

                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          name="firstName"
                          placeholder={t('checkout.firstName')}
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="col-span-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        />
                        <input
                          type="text"
                          name="lastName"
                          placeholder={t('checkout.lastName')}
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="col-span-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        />
                      </div>

                      <input
                        type="email"
                        name="email"
                        placeholder={t('checkout.email')}
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      />

                      <input
                        type="tel"
                        name="phone"
                        placeholder={t('checkout.phone')}
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      />

                      <div className="grid grid-cols-3 gap-4">
                        <select
                          name="province"
                          value={formData.province}
                          onChange={handleInputChange}
                          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        >
                          <option value="">{t('checkout.province')}</option>
                          {PROVINCES.map((p) => (
                            <option key={p} value={p}>{p}</option>
                          ))}
                        </select>
                        <select
                          name="district"
                          value={formData.district}
                          onChange={handleInputChange}
                          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        >
                          <option value="">{t('checkout.district')}</option>
                          {DISTRICTS.map((d) => (
                            <option key={d} value={d}>{d}</option>
                          ))}
                        </select>
                        <select
                          name="sector"
                          value={formData.sector}
                          onChange={handleInputChange}
                          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        >
                          <option value="">{t('checkout.sector')}</option>
                          {SECTORS.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>

                      <input
                        type="text"
                        name="address"
                        placeholder={t('checkout.address')}
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      />
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        {t('checkout.paymentMethod')}
                      </h2>

                      {['momo', 'airtel', 'cod'].map((method) => (
                        <label
                          key={method}
                          className="flex items-center p-4 border border-gray-300 dark:border-slate-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800"
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method}
                            checked={formData.paymentMethod === method}
                            onChange={handleInputChange}
                            className="mr-4"
                          />
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {t(`checkout.${method}`)}
                          </span>
                        </label>
                      ))}

                      {formData.paymentMethod === 'momo' && (
                        <input
                          type="tel"
                          name="momoNumber"
                          placeholder={t('checkout.enterMomoNumber')}
                          value={formData.momoNumber || ''}
                          onChange={(e) =>
                            setFormData({ ...formData, momoNumber: e.target.value })
                          }
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white mt-4"
                        />
                      )}
                    </div>
                  )}

                  {step === 3 && (
                    <motion.div
                      className="text-center space-y-4"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="text-6xl mx-auto mb-4"
                      >
                        ✓
                      </motion.div>
                      <h2 className="text-3xl font-bold text-green-600 dark:text-green-400">
                        {t('checkout.orderConfirmed')}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        {t('checkout.orderNumber')}: <span className="font-bold">{orderId}</span>
                      </p>
                    </motion.div>
                  )}
                </motion.div>

                {/* Buttons */}
                {step < 3 && (
                  <div className="flex gap-4 mt-8">
                    {step > 1 && (
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => setStep(step - 1)}
                      >
                        {t('checkout.back')}
                      </Button>
                    )}
                    <Button
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      onClick={handleNext}
                    >
                      {step === 2 ? t('checkout.confirmOrder') : t('checkout.next')}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <Card className="h-fit sticky top-24">
            <CardHeader>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Order Summary
              </h3>
            </CardHeader>
            <CardContent className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    {item.name} x {item.quantity}
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {(item.price * item.quantity).toLocaleString()} {t('common.rwf')}
                  </span>
                </div>
              ))}

              <div className="border-t border-gray-200 dark:border-slate-700 pt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span>{subtotal.toLocaleString()} {t('common.rwf')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">{t('cart.shipping')}</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-600 dark:text-green-400">Free</span>
                    ) : (
                      `${shipping.toLocaleString()} ${t('common.rwf')}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t border-gray-200 dark:border-slate-700 pt-2">
                  <span>Total</span>
                  <span className="text-green-600 dark:text-green-400">
                    {total.toLocaleString()} {t('common.rwf')}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
