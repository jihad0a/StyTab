import React from 'react';
import { motion } from 'motion/react';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart, products } from '../context/CartContext';
import { Link } from 'react-router-dom';

interface CartDrawerProps {
  onClose: () => void;
}

export default function CartDrawer({ onClose }: CartDrawerProps) {
  const { cart, removeFromCart, updateQuantity, subtotal } = useCart();

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
            <span className="w-1 h-6 bg-primary" />
            <h2 className="text-2xl font-black tracking-[-0.05em] uppercase text-on-surface">StyTab CART</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-on-surface/5 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-8 space-y-8 no-scrollbar">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
              <ShoppingBag size={48} />
              <p className="font-headline font-bold uppercase tracking-widest">Your cart is empty</p>
              <button 
                onClick={onClose}
                className="text-primary font-bold uppercase text-xs tracking-widest underline underline-offset-4"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 items-start group">
                <div className="w-20 h-24 flex-shrink-0 bg-surface-container-high rounded-md overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-all duration-500" />
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-sm tracking-tight text-on-surface uppercase">{item.name}</h3>
                    <button 
                      onClick={() => removeFromCart(item.id, item.selectedSize)}
                      className="text-on-surface/40 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="text-[10px] font-bold text-on-surface/40 uppercase tracking-widest">Size: {item.selectedSize}</p>
                  <div className="flex justify-between items-end mt-2">
                    <div className="flex items-center bg-surface-container-high rounded-full px-2 py-1 gap-3">
                      <button 
                        onClick={() => updateQuantity(item.id, item.selectedSize, -1)}
                        className="text-on-surface/60 hover:text-primary transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.selectedSize, 1)}
                        className="text-on-surface/60 hover:text-primary transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <span className="font-headline font-bold text-primary">${item.price * item.quantity}</span>
                  </div>
                </div>
              </div>
            ))
          )}

          {cart.length > 0 && (
            <div className="pt-6 border-t border-on-surface/5">
              <p className="text-[10px] font-bold tracking-widest text-on-surface/40 uppercase mb-4">Complete the look</p>
              <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                {products.slice(0, 3).map(p => (
                  <Link key={p.id} to={`/product/${p.id}`} onClick={onClose} className="w-24 flex-shrink-0 group">
                    <div className="aspect-square bg-surface-container-high rounded mb-2 overflow-hidden">
                      <img src={p.image} className="w-full h-full object-cover transition-all" />
                    </div>
                    <p className="text-[9px] font-bold uppercase truncate text-on-surface">{p.name}</p>
                    <p className="text-[9px] text-primary font-bold">${p.price}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 bg-surface border-t border-on-surface/5 space-y-6">
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-bold tracking-widest text-on-surface/40 uppercase">Subtotal</span>
              <span className="text-2xl font-black text-primary tracking-tighter">${subtotal}</span>
            </div>
            <div className="flex flex-col gap-3">
              <Link 
                to="/checkout" 
                onClick={onClose}
                className="w-full bg-primary py-4 rounded-full text-on-primary font-black text-sm tracking-widest uppercase text-center shadow-lg shadow-primary/20 active:scale-95 transition-all"
              >
                CHECKOUT
              </Link>
              <button 
                onClick={onClose}
                className="w-full border border-primary/40 py-4 rounded-full text-primary font-bold text-sm tracking-widest uppercase hover:bg-primary/5 transition-all"
              >
                CONTINUE SHOPPING
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
