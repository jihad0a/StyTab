import React, { useState } from 'react';
import { Menu, Search, ShoppingCart, X, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { motion, AnimatePresence } from 'motion/react';
import CartDrawer from './CartDrawer';
import MenuDrawer from './MenuDrawer';
import WishlistDrawer from './WishlistDrawer';

import Logo from './Logo';

export default function Navbar() {
  const { totalItems } = useCart();
  const { wishlist } = useWishlist();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  React.useEffect(() => {
    const handleOpenWishlist = () => setIsWishlistOpen(true);
    window.addEventListener('open-wishlist', handleOpenWishlist);
    return () => window.removeEventListener('open-wishlist', handleOpenWishlist);
  }, []);

  return (
    <>
      <header className="fixed top-0 z-50 w-full h-[60px] flex justify-between items-center px-6 bg-surface/90 backdrop-blur-md border-b border-on-surface/5 shadow-sm">
        <div className="flex items-center gap-4">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(true)}
            className="text-on-surface/70 hover:text-primary transition-all duration-300 cursor-pointer active:scale-95"
          >
            <Menu size={24} />
          </motion.button>
        </div>
        
        <Link to="/" className="flex items-center justify-center h-8 md:h-10">
          <Logo className="h-full hover:scale-105 transition-transform duration-300 drop-shadow-[0_2px_8px_rgba(255,255,255,0.2)]" />
        </Link>

        <div className="flex items-center gap-4">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsWishlistOpen(true)}
            className="relative text-on-surface/70 hover:text-primary transition-all duration-300 cursor-pointer group will-change-transform"
          >
            <motion.div
              key={wishlist.length}
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 0.3 }}
              className="will-change-transform"
            >
              <Heart size={24} className={wishlist.length > 0 ? 'text-primary' : ''} fill={wishlist.length > 0 ? 'currentColor' : 'none'} />
            </motion.div>
            {wishlist.length > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-primary text-on-primary text-[8px] font-bold w-3 h-3 flex items-center justify-center rounded-full will-change-transform"
              >
                {wishlist.length}
              </motion.span>
            )}
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsCartOpen(true)}
            className="relative duration-150 cursor-pointer group will-change-transform"
          >
            <motion.div
              key={totalItems}
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 0.3 }}
              className="will-change-transform"
            >
              <ShoppingCart size={24} className="text-on-surface/70 group-hover:text-primary" />
            </motion.div>
            {totalItems > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-primary text-on-primary text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full will-change-transform"
              >
                {totalItems}
              </motion.span>
            )}
          </motion.button>
        </div>
      </header>

      <AnimatePresence>
        {isCartOpen && <CartDrawer onClose={() => setIsCartOpen(false)} />}
        {isMenuOpen && <MenuDrawer onClose={() => setIsMenuOpen(false)} />}
        {isWishlistOpen && <WishlistDrawer onClose={() => setIsWishlistOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
