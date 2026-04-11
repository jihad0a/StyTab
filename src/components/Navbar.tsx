import React, { useState } from 'react';
import { Menu, Search, ShoppingCart, X, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { motion, AnimatePresence } from 'motion/react';
import CartDrawer from './CartDrawer';
import MenuDrawer from './MenuDrawer';
import WishlistDrawer from './WishlistDrawer';

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
      <header className="fixed top-0 z-50 w-full h-[60px] flex justify-between items-center px-6 bg-surface/80 backdrop-blur-xl border-b border-primary/20 shadow-sm">
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
        
        <Link to="/" className="text-2xl font-black text-on-surface tracking-[-0.05em] font-headline uppercase">
          StyTab
        </Link>

        <div className="flex items-center gap-4">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsWishlistOpen(true)}
            className="relative text-on-surface/70 hover:text-primary transition-all duration-300 cursor-pointer group"
          >
            <motion.div
              key={wishlist.length}
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 0.3 }}
            >
              <Heart size={24} className={wishlist.length > 0 ? 'text-primary' : ''} fill={wishlist.length > 0 ? 'currentColor' : 'none'} />
            </motion.div>
            {wishlist.length > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-primary text-on-primary text-[8px] font-bold w-3 h-3 flex items-center justify-center rounded-full"
              >
                {wishlist.length}
              </motion.span>
            )}
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsCartOpen(true)}
            className="relative duration-150 cursor-pointer group"
          >
            <motion.div
              key={totalItems}
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 0.3 }}
            >
              <ShoppingCart size={24} className="text-on-surface/70 group-hover:text-primary" />
            </motion.div>
            {totalItems > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-primary text-on-primary text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full"
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
