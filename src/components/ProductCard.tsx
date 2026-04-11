import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Product, useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { motion } from 'motion/react';

export const ProductCard: React.FC<{ product: Product }> = memo(({ product }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  return (
    <div className="group">
      <div className="bg-surface-container-low rounded-xl overflow-hidden aspect-[3/4] relative shadow-md will-change-transform">
        <Link to={`/product/${product.id}`}>
          <img 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" 
            src={product.image} 
            loading="lazy"
            decoding="async"
          />
        </Link>
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className={`absolute top-4 right-4 bg-surface-container-low/80 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:text-primary ${isWishlisted ? 'opacity-100 text-primary' : ''} will-change-transform`}
        >
          <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
        </motion.button>
      </div>
      <div className="mt-6 space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[10px] text-primary font-bold tracking-[0.2em] uppercase">{product.category}</p>
            <Link to={`/product/${product.id}`}>
              <h3 className="font-headline text-lg font-extrabold text-on-surface uppercase tracking-tight hover:text-primary transition-colors">
                {product.name}
              </h3>
            </Link>
          </div>
          <span className="text-primary font-headline font-black text-xl">${product.price}</span>
        </div>
        <div className="flex gap-2 pt-2">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => addToCart(product, product.sizes[0])}
            className="flex-1 border border-primary text-primary px-4 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-colors will-change-transform"
          >
            ADD TO CART
          </motion.button>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 will-change-transform"
          >
            <Link 
              to={`/product/${product.id}`}
              className="block w-full bg-primary text-on-primary px-4 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-md text-center"
            >
              VIEW
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';
