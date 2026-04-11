import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ShoppingBag, Truck } from 'lucide-react';
import { motion } from 'motion/react';

export default function OrderSuccess() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <main className="min-h-[80vh] pt-24 pb-12 px-6 flex flex-col items-center justify-center max-w-lg mx-auto">
      <motion.div 
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          type: 'spring', 
          damping: 12, 
          stiffness: 200,
          delay: 0.2
        }}
        className="relative mb-8"
      >
        <motion.div 
          animate={{ 
            boxShadow: [
              "0 0 0 0px rgba(245, 158, 11, 0)",
              "0 0 0 20px rgba(245, 158, 11, 0.1)",
              "0 0 0 40px rgba(245, 158, 11, 0)"
            ]
          }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-24 h-24 rounded-full border-4 border-primary flex items-center justify-center bg-surface-container-low shadow-2xl shadow-primary/20"
        >
          <motion.div
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Check size={48} className="text-primary" strokeWidth={3} />
          </motion.div>
        </motion.div>
        <div className="absolute -inset-4 bg-primary/5 blur-3xl rounded-full -z-10" />
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full flex flex-col items-center"
      >
        <motion.div variants={itemVariants} className="text-center space-y-4 mb-10">
          <h1 className="font-headline text-4xl font-extrabold uppercase tracking-tight text-on-surface leading-none">Order Confirmed</h1>
          <p className="font-body text-on-surface/60 max-w-[280px] mx-auto text-sm leading-relaxed">
            Thank you for your order. We will contact you shortly regarding your shipment details.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="w-full bg-surface-container-low rounded-xl p-6 border border-on-surface/5 space-y-6 shadow-xl">
          <div className="flex justify-between items-baseline">
            <span className="text-xs tracking-widest text-on-surface/40 uppercase">Reference</span>
            <span className="font-headline font-bold text-primary tracking-tight">Order ID: #12345</span>
          </div>
          
          <motion.div 
            whileHover={{ x: 5 }}
            className="bg-surface-container rounded-lg p-4 flex items-center gap-4"
          >
            <Truck className="text-primary" />
            <div className="flex-1">
              <p className="text-[10px] uppercase tracking-widest text-on-surface/40">Estimated Delivery</p>
              <p className="text-sm font-bold text-on-surface">Oct 24 — Oct 26, 2024</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="w-full mt-10 space-y-4">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/products')}
            className="w-full py-5 rounded-full bg-primary text-on-primary font-headline font-extrabold uppercase tracking-widest text-sm shadow-lg shadow-primary/20"
          >
            CONTINUE SHOPPING
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-5 rounded-full border border-primary/40 bg-transparent font-headline font-extrabold text-primary uppercase tracking-widest text-sm hover:bg-primary/5"
          >
            TRACK ORDER
          </motion.button>
        </motion.div>
      </motion.div>
    </main>
  );
}
