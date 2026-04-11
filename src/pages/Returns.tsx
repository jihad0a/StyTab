import React from 'react';
import { motion } from 'motion/react';

export default function Returns() {
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
        <h1 className="font-headline text-5xl font-black tracking-tighter uppercase text-on-surface">RETURNS & EXCHANGES</h1>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8 divide-y divide-on-surface/5"
      >
        {[
          {
            title: "OUR POLICY",
            content: "We accept returns within 14 days of delivery. To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging."
          },
          {
            title: "HOW TO RETURN",
            content: "To start a return, you can contact us at returns@stytab.com. If your return is accepted, we’ll send you a return shipping label, as well as instructions on how and where to send your package."
          },
          {
            title: "REFUNDS",
            content: "We will notify you once we’ve received and inspected your return, and let you know if the refund was approved or not. If approved, you’ll be automatically refunded on your original payment method."
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
