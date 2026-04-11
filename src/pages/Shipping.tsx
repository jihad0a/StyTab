import React from 'react';
import { motion } from 'motion/react';

export default function Shipping() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto space-y-12">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-6"
      >
        <motion.div 
          initial={{ height: 0 }}
          animate={{ height: 32 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-1 h-8 bg-primary" 
        />
        <h1 className="font-headline text-5xl font-black tracking-tighter uppercase text-on-surface">SHIPPING POLICY</h1>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8 divide-y divide-on-surface/5"
      >
        {[
          {
            title: "DOMESTIC SHIPPING",
            content: "All domestic orders are processed within 2-3 business days. Standard shipping typically takes 3-5 business days for delivery. We offer free standard shipping on all orders."
          },
          {
            title: "INTERNATIONAL SHIPPING",
            content: "We ship worldwide. International shipping rates and delivery times vary by destination. Please note that customers are responsible for any customs duties or taxes incurred."
          },
          {
            title: "ORDER TRACKING",
            content: "Once your order has shipped, you will receive a confirmation email with a tracking number. You can track your package directly through our carrier's website."
          }
        ].map((section, i) => (
          <motion.section key={i} variants={itemVariants} className="pt-8 space-y-4">
            <h2 className="font-headline text-xl font-bold uppercase tracking-tight text-on-surface">{section.title}</h2>
            <p className="text-on-surface/60 text-sm leading-relaxed">
              {section.content}
            </p>
          </motion.section>
        ))}
      </motion.div>
    </main>
  );
}
