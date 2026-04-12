import { Instagram, Facebook, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-surface text-on-surface pt-20 pb-10 px-6 border-t border-on-surface/5">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <Logo height={48} className="-ml-2" />
            <div className="space-y-4">
              <h4 className="font-headline font-bold text-xs tracking-widest text-on-surface uppercase">STAY IN THE DROP</h4>
              <p className="text-on-surface/60 text-sm">Access to exclusive releases and editorial content.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.input 
                  whileFocus={{ scale: 1.02 }}
                  className="flex-1 bg-surface-container-high border-none rounded-sm px-4 py-4 text-xs font-headline font-bold text-on-surface placeholder:text-on-surface/30 focus:ring-1 focus:ring-primary outline-none transition-all" 
                  placeholder="EMAIL ADDRESS" 
                  type="email" 
                />
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary text-on-primary px-8 py-4 rounded-sm font-headline font-black text-xs tracking-widest uppercase shadow-md hover:brightness-110 transition-all"
                >
                  SUBSCRIBE
                </motion.button>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <h5 className="font-headline font-bold text-[10px] tracking-widest text-on-surface uppercase">SHOP</h5>
              <ul className="space-y-2">
                <li><Link to="/collection?filter=new-arrival" className="text-on-surface/60 text-xs hover:text-primary transition-colors uppercase block">NEW ARRIVALS</Link></li>
                <li><Link to="/collection?filter=best-seller" className="text-on-surface/60 text-xs hover:text-primary transition-colors uppercase block">BEST SELLERS</Link></li>
                <li><button onClick={() => window.dispatchEvent(new CustomEvent('open-wishlist'))} className="text-on-surface/60 text-xs hover:text-primary transition-colors uppercase block text-left">WISHLIST</button></li>
              </ul>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <h5 className="font-headline font-bold text-[10px] tracking-widest text-on-surface uppercase">SUPPORT</h5>
              <ul className="space-y-2">
                <li><Link to="/shipping" className="text-on-surface/60 text-xs hover:text-primary transition-colors uppercase block">SHIPPING</Link></li>
                <li><Link to="/returns" className="text-on-surface/60 text-xs hover:text-primary transition-colors uppercase block">RETURNS</Link></li>
                <li><Link to="/contact" className="text-on-surface/60 text-xs hover:text-primary transition-colors uppercase block">CONTACT</Link></li>
              </ul>
            </motion.div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-center gap-8 pt-8 border-t border-on-surface/5"
        >
          <div className="flex gap-6">
            <motion.a whileHover={{ scale: 1.2, rotate: 5, color: '#E1306C' }} href="#" className="text-on-surface/40 transition-colors"><Instagram size={20} /></motion.a>
            <motion.a whileHover={{ scale: 1.2, rotate: -5, color: '#1877F2' }} href="#" className="text-on-surface/40 transition-colors"><Facebook size={20} /></motion.a>
            <motion.a whileHover={{ scale: 1.2, rotate: 5, color: '#25D366' }} href="#" className="text-on-surface/40 transition-colors"><MessageCircle size={20} /></motion.a>
          </div>
          <p className="text-[10px] font-medium tracking-[0.2em] text-on-surface/30 uppercase text-center">
            © 2026 StyTab STREETWEAR. ALL RIGHTS RESERVED.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
