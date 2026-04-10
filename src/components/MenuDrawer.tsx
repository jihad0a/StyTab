import React from 'react';
import { motion } from 'motion/react';
import { X, Home, ShoppingBag, Zap, Info, Mail, Instagram, Facebook, MessageCircle, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MenuDrawerProps {
  onClose: () => void;
}

const navLinks = [
  { name: 'HOME', path: '/', icon: Home },
  { name: 'BEST SELLER', path: '/collection?filter=best-seller', icon: ShoppingBag },
  { name: 'NEW ARRIVALS', path: '/collection?filter=new-arrival', icon: Zap },
  { name: 'WISHLIST', path: '#', icon: Heart, isWishlist: true },
  { name: 'ABOUT US', path: '/about', icon: Info },
  { name: 'CONTACT', path: '/contact', icon: Mail },
];

export default function MenuDrawer({ onClose }: MenuDrawerProps) {
  return (
    <div className="fixed inset-0 z-[100] flex justify-start">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative h-full w-[85%] max-w-[400px] bg-surface flex flex-col p-8 shadow-2xl"
      >
        <div className="flex items-center justify-between mb-12">
          <span className="font-headline text-xl font-bold text-primary tracking-[-0.05em] leading-none uppercase">THE NOIR EDITORIAL</span>
          <button onClick={onClose} className="p-2 -mr-2 text-on-surface/70 hover:text-on-surface transition-colors active:scale-90 duration-150">
            <X size={32} />
          </button>
        </div>

        <nav className="flex flex-col flex-grow divide-y divide-primary/10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={(e) => {
                if (link.isWishlist) {
                  e.preventDefault();
                  onClose();
                  window.dispatchEvent(new CustomEvent('open-wishlist'));
                } else {
                  onClose();
                }
              }}
              className="group py-6 flex items-center justify-between text-on-surface/60 hover:text-primary hover:pl-4 transition-all duration-500"
            >
              <div className="flex items-center space-x-4">
                <link.icon size={24} />
                <span className="font-headline text-2xl font-extrabold uppercase leading-none tracking-tight">{link.name}</span>
              </div>
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                whileHover={{ opacity: 1, x: 0 }}
                className="text-primary"
              >
                →
              </motion.span>
            </Link>
          ))}
        </nav>

        <div className="pt-8 mt-auto flex flex-col space-y-8">
          <div className="flex items-center space-x-8">
            <a href="#" className="text-on-surface/40 hover:text-primary transition-colors"><Instagram size={24} /></a>
            <a href="#" className="text-on-surface/40 hover:text-primary transition-colors"><Facebook size={24} /></a>
            <a href="#" className="text-on-surface/40 hover:text-primary transition-colors"><MessageCircle size={24} /></a>
          </div>
          
          <div className="space-y-4">
            <p className="font-body text-[10px] tracking-[0.2em] text-on-surface/40 uppercase">© 2024 StyTab STREETWEAR. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
