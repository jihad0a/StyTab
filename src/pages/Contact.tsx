import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { motion } from 'motion/react';

export default function Contact() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
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
    <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          <motion.div variants={itemVariants} className="space-y-6">
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: 32 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-1 bg-primary" 
            />
            <h1 className="font-headline text-5xl font-black tracking-tighter uppercase text-on-surface">GET IN TOUCH</h1>
            <p className="text-on-surface/60 max-w-md leading-relaxed">
              Have questions about a drop or your order? Our support team is available 24/7 to assist with your archive.
            </p>
          </motion.div>

          <div className="space-y-8">
            {[
              { icon: Mail, title: 'Email', value: 'support@stytab.com' },
              { icon: Phone, title: 'Phone', value: '+1 (555) 0123-4567' },
              { icon: MapPin, title: 'Studio', value: '123 Noir District, Fashion Ave\nNew York, NY 10001' }
            ].map((item, i) => (
              <motion.div 
                key={i}
                variants={itemVariants}
                className="flex items-start gap-6 group"
              >
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 transition-colors group-hover:bg-primary group-hover:text-on-primary"
                >
                  <item.icon size={20} />
                </motion.div>
                <div>
                  <h3 className="font-headline font-bold text-xs tracking-widest uppercase text-on-surface">
                    {item.title}
                  </h3>
                  <p className="text-on-surface/60 text-sm whitespace-pre-line">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-surface-container rounded-3xl p-8 md:p-12 border border-on-surface/5 shadow-xl"
        >
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-widest text-on-surface/40 uppercase ml-1">Name</label>
                <motion.input 
                  whileFocus={{ scale: 1.01, borderColor: 'var(--color-primary)' }}
                  className="w-full bg-surface-container-low border border-on-surface/5 rounded-lg p-4 text-sm focus:ring-1 focus:ring-primary outline-none transition-all" 
                  placeholder="Your Name" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-widest text-on-surface/40 uppercase ml-1">Email</label>
                <motion.input 
                  whileFocus={{ scale: 1.01, borderColor: 'var(--color-primary)' }}
                  className="w-full bg-surface-container-low border border-on-surface/5 rounded-lg p-4 text-sm focus:ring-1 focus:ring-primary outline-none transition-all" 
                  placeholder="Your Email" 
                  type="email" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold tracking-widest text-on-surface/40 uppercase ml-1">Subject</label>
              <motion.input 
                whileFocus={{ scale: 1.01, borderColor: 'var(--color-primary)' }}
                className="w-full bg-surface-container-low border border-on-surface/5 rounded-lg p-4 text-sm focus:ring-1 focus:ring-primary outline-none transition-all" 
                placeholder="Order Inquiry" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold tracking-widest text-on-surface/40 uppercase ml-1">Message</label>
              <motion.textarea 
                whileFocus={{ scale: 1.01, borderColor: 'var(--color-primary)' }}
                className="w-full bg-surface-container-low border border-on-surface/5 rounded-lg p-4 text-sm focus:ring-1 focus:ring-primary outline-none min-h-[150px] transition-all" 
                placeholder="How can we help?" 
              />
            </div>
            <motion.button 
              whileHover={{ scale: 1.02, brightness: 1.1 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-primary text-on-primary py-5 rounded-full font-headline font-black text-xs tracking-[0.2em] uppercase shadow-lg shadow-primary/20 transition-all"
            >
              SEND MESSAGE
            </motion.button>
          </form>
        </motion.section>
      </div>
    </main>
  );
}
