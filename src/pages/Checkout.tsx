import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ArrowLeft, Check, CreditCard, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, subtotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    city: '',
    area: '',
    address: '',
    postalCode: '',
  });

  const deliveryCharge = 15;
  const total = subtotal + deliveryCharge;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate order processing
    setTimeout(() => {
      clearCart();
      navigate('/order-success');
    }, 1000);
  };

  if (cart.length === 0) {
    return (
      <div className="pt-32 text-center space-y-4">
        <p className="font-headline font-bold uppercase tracking-widest opacity-40">Your cart is empty</p>
        <button onClick={() => navigate('/products')} className="text-primary font-bold uppercase text-xs tracking-widest underline underline-offset-4">Go to Shop</button>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <main className="pt-24 pb-40 px-6 max-w-2xl mx-auto">
      <motion.header 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-4 mb-12"
      >
        <motion.button 
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(0,0,0,0.05)' }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate(-1)} 
          className="p-2 rounded-full"
        >
          <ArrowLeft size={24} />
        </motion.button>
        <h1 className="font-headline text-4xl font-extrabold tracking-tighter uppercase text-on-surface">CHECKOUT</h1>
      </motion.header>

      <motion.form 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        onSubmit={handleSubmit} 
        className="space-y-12"
      >
        {/* Delivery Details */}
        <motion.section variants={itemVariants} className="space-y-6">
          <h2 className="text-primary text-xs font-bold tracking-[0.2em] uppercase flex items-center gap-2">
            <span className="w-1 h-3 bg-primary inline-block" />
            DELIVERY DETAILS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { label: 'Full Name', key: 'fullName', placeholder: 'e.g. John Doe', type: 'text', required: true },
              { label: 'Mobile Number', key: 'mobile', placeholder: 'e.g. +1 234 567 890', type: 'tel', required: true },
              { label: 'Email Address (Optional)', key: 'email', placeholder: 'e.g. john@example.com', type: 'email', required: false, full: true },
              { label: 'City', key: 'city', placeholder: 'e.g. New York', type: 'text', required: true },
              { label: 'Area / Neighborhood', key: 'area', placeholder: 'e.g. Manhattan', type: 'text', required: true },
              { label: 'Full Delivery Address', key: 'address', placeholder: 'e.g. 123 Street Name, Apt 4B', type: 'text', required: true, full: true },
              { label: 'Postal Code', key: 'postalCode', placeholder: 'e.g. 10001', type: 'text', required: true },
            ].map((field) => (
              <div key={field.key} className={`space-y-2 ${field.full ? 'sm:col-span-2' : ''}`}>
                <label className="text-[10px] font-bold text-on-surface/40 uppercase tracking-widest ml-1">{field.label}</label>
                <motion.input 
                  whileFocus={{ scale: 1.01, borderColor: 'var(--color-primary)' }}
                  required={field.required}
                  type={field.type}
                  className="w-full bg-surface border border-on-surface/5 rounded-lg p-4 text-sm focus:ring-1 focus:ring-primary placeholder:text-on-surface/20 text-on-surface transition-all shadow-sm outline-none" 
                  placeholder={field.placeholder} 
                  value={formData[field.key as keyof typeof formData]}
                  onChange={(e) => setFormData({...formData, [field.key]: e.target.value})}
                />
              </div>
            ))}
          </div>
        </motion.section>

        {/* Order Summary */}
        <motion.section variants={itemVariants} className="space-y-6">
          <h2 className="text-primary text-xs font-bold tracking-[0.2em] uppercase flex items-center gap-2">
            <span className="w-1 h-3 bg-primary inline-block" />
            ORDER SUMMARY
          </h2>
          <div className="bg-surface rounded-xl p-6 border border-on-surface/5 shadow-sm space-y-6">
            <div className="flex -space-x-4 overflow-hidden pb-4 border-b border-on-surface/5">
              {cart.map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="w-12 h-12 rounded-lg bg-surface border border-on-surface/5 overflow-hidden ring-2 ring-white"
                >
                  <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                </motion.div>
              ))}
              {cart.length > 3 && (
                <div className="w-12 h-12 rounded-lg bg-on-surface/5 border border-on-surface/5 flex items-center justify-center ring-2 ring-white">
                  <span className="text-[10px] font-bold text-on-surface">+{cart.length - 3}</span>
                </div>
              )}
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface/60">Subtotal</span>
                <span className="text-on-surface font-medium">${subtotal}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface/60">Delivery Charge</span>
                <span className="text-on-surface font-medium">${deliveryCharge}</span>
              </div>
            </div>
            <div className="flex justify-between items-end pt-4 border-t border-on-surface/5">
              <span className="text-xs text-primary font-bold tracking-widest uppercase">Total</span>
              <motion.span 
                key={total}
                initial={{ scale: 1.2, color: 'var(--color-primary)' }}
                animate={{ scale: 1, color: 'var(--color-primary)' }}
                className="text-3xl font-headline font-black text-primary tracking-tighter"
              >
                ${total}
              </motion.span>
            </div>
          </div>
        </motion.section>

        {/* Payment Method */}
        <motion.section variants={itemVariants} className="space-y-6">
          <h2 className="text-primary text-xs font-bold tracking-[0.2em] uppercase flex items-center gap-2">
            <span className="w-1 h-3 bg-primary inline-block" />
            PAYMENT METHOD
          </h2>
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="bg-surface rounded-xl p-5 border border-primary/40 flex items-center justify-between relative overflow-hidden shadow-sm"
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-bl-full" />
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <CreditCard size={20} />
              </div>
              <div>
                <p className="font-headline font-bold text-sm text-on-surface">COD - Cash on Delivery</p>
                <p className="text-[10px] text-on-surface/40 uppercase tracking-tighter">Pay when you receive</p>
              </div>
            </div>
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-6 h-6 rounded-full bg-primary flex items-center justify-center"
            >
              <Check size={14} className="text-on-primary font-bold" />
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Bottom Action */}
        <motion.div variants={itemVariants} className="pt-10 space-y-8">
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold text-on-surface/40 uppercase tracking-widest text-center">Reviewing {cart.length} items in your cart</h3>
            <div className="flex justify-center -space-x-3">
              {cart.map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className="w-14 h-14 rounded-xl bg-surface border-2 border-surface shadow-lg overflow-hidden ring-1 ring-on-surface/5"
                >
                  <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <p className="text-[10px] text-center text-on-surface/40 uppercase tracking-[0.1em]">By confirming, you agree to our editorial terms</p>
            <motion.button 
              whileHover={{ scale: 1.02, brightness: 1.1 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full h-16 bg-primary rounded-full text-on-primary font-headline font-black text-sm tracking-[0.2em] uppercase shadow-2xl shadow-primary/30 transition-all"
            >
              CONFIRM ORDER & PAY
            </motion.button>
          </div>
        </motion.div>
      </motion.form>
    </main>
  );
}
