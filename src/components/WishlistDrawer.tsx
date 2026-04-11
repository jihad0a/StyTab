import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Heart, ShoppingBag } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

interface WishlistDrawerProps {
  onClose: () => void;
}

export default function WishlistDrawer({ onClose }: WishlistDrawerProps) {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative h-full w-[85%] max-w-[400px] bg-surface flex flex-col shadow-2xl"
      >
        <div className="flex justify-between items-center p-6 border-b border-on-surface/5">
          <div className="flex items-center gap-2">
            <Heart size={24} className="text-primary" fill="currentColor" />
            <h2 className="text-2xl font-black tracking-[-0.05em] uppercase text-on-surface">WISHLIST</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-on-surface/5 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-8 space-y-8 no-scrollbar">
          {wishlist.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50"
            >
              <Heart size={48} />
              <p className="font-headline font-bold uppercase tracking-widest">Your wishlist is empty</p>
              <button 
                onClick={onClose}
                className="text-primary font-bold uppercase text-xs tracking-widest underline underline-offset-4"
              >
                Explore Archive
              </button>
            </motion.div>
          ) : (
            <AnimatePresence mode="popLayout">
              {wishlist.map((product, i) => (
                <motion.div 
                  key={product.id}
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex gap-4 items-start group"
                >
                  <div className="w-20 h-24 flex-shrink-0 bg-surface-container-high rounded-md overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-all group-hover:scale-110" />
                  </div>
                  <div className="flex-1 flex flex-col gap-1">
                    <div className="flex justify-between items-start">
                      <Link to={`/product/${product.id}`} onClick={onClose}>
                        <h3 className="font-bold text-sm tracking-tight text-on-surface uppercase hover:text-primary transition-colors">{product.name}</h3>
                      </Link>
                      <button 
                        onClick={() => removeFromWishlist(product.id)}
                        className="text-on-surface/40 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-[10px] font-bold text-on-surface/40 uppercase tracking-widest">{product.category}</p>
                    <div className="flex justify-between items-end mt-4">
                      <span className="font-headline font-bold text-primary">${product.price}</span>
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          addToCart(product, product.sizes[0]);
                          removeFromWishlist(product.id);
                        }}
                        className="bg-primary text-on-primary px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md hover:brightness-110 transition-all"
                      >
                        MOVE TO CART
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        <div className="p-6 bg-surface border-t border-on-surface/5">
          <button 
            onClick={onClose}
            className="w-full border border-primary/40 py-4 rounded-full text-primary font-bold text-sm tracking-widest uppercase hover:bg-primary/5 transition-all"
          >
            CONTINUE BROWSING
          </button>
        </div>
      </motion.div>
    </div>
  );
}
