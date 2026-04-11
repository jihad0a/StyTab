import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products, useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Star, ChevronDown, Plus, Minus, Check, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const product = products.find(p => p.id === id);

  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<string | null>('description');
  const [mainImage, setMainImage] = useState(product?.image || '');

  if (!product) return <div className="pt-32 text-center">Product not found</div>;

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize);
  };

  // Mock additional images for thumbnails
  const thumbnails = [
    product.image,
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1200&auto=format&fit=crop'
  ];

  return (
    <main className="pt-16 pb-32 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Product Images */}
        <motion.section 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6 max-w-md mx-auto lg:mx-0"
        >
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-surface-container shadow-xl will-change-transform">
            <AnimatePresence mode="wait">
              <motion.img 
                key={mainImage}
                initial={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                src={mainImage} 
                alt={product.name} 
                className="w-full h-full object-cover" 
                loading="eager"
                decoding="async"
              />
            </AnimatePresence>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar justify-center">
            {thumbnails.map((img, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                onClick={() => setMainImage(img)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-20 h-24 flex-shrink-0 rounded-lg border-2 overflow-hidden cursor-pointer transition-all ${mainImage === img ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'} will-change-transform`}
              >
                <img src={img} className="w-full h-full object-cover" alt="thumbnail" loading="lazy" decoding="async" />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Product Info */}
        <div className="px-6 lg:px-0 space-y-8">
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center gap-2"
            >
              <span className="inline-block w-0.5 h-4 bg-primary" />
              <span className="text-xs font-bold tracking-widest text-primary font-headline uppercase">{product.category}</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl font-black tracking-tighter text-on-surface font-headline leading-tight uppercase"
            >
              {product.name}
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="flex text-primary">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <span className="text-xs text-on-surface/40 font-medium tracking-wide">24 REVIEWS</span>
              </div>
              <div className="flex items-center gap-2">
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-2 h-2 rounded-full bg-green-500" 
                />
                <span className="text-[10px] font-bold text-green-500 uppercase tracking-tighter">In Stock</span>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex items-baseline gap-4"
            >
              <span className="text-3xl font-black text-primary font-headline tracking-tight">${product.price}</span>
              <span className="text-xl text-on-surface/20 line-through font-headline tracking-tight">${product.price + 25}</span>
            </motion.div>
          </div>

          {/* Size Selector */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="space-y-4"
          >
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold tracking-widest text-on-surface/60 uppercase">SELECT SIZE</span>
              <button className="text-[10px] font-bold text-primary underline underline-offset-4 uppercase">Size Guide</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size, i) => (
                <motion.button 
                  key={size}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + i * 0.05 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 flex items-center justify-center rounded-lg border transition-all text-xs font-bold ${selectedSize === size ? 'bg-primary border-primary text-on-primary' : 'bg-surface-container-low border-on-surface/5 text-on-surface hover:border-primary'}`}
                >
                  {size}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Quantity & Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="space-y-4"
          >
            <div className="flex gap-3">
              <div className="flex items-center justify-between px-4 w-1/3 h-14 rounded-full border border-on-surface/10 bg-surface-container-low">
                <motion.button whileTap={{ scale: 0.8 }} onClick={() => setQuantity(q => Math.max(1, q - 1))} className="text-primary"><Minus size={16} /></motion.button>
                <span className="font-bold text-sm text-on-surface">{quantity}</span>
                <motion.button whileTap={{ scale: 0.8 }} onClick={() => setQuantity(q => q + 1)} className="text-primary"><Plus size={16} /></motion.button>
              </div>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="flex-1 h-14 rounded-full border-2 border-primary text-primary font-black text-xs tracking-widest hover:bg-primary/5 transition-all"
              >
                ADD TO CART
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleWishlist(product)}
                className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all ${isWishlisted ? 'bg-primary border-primary text-on-primary' : 'border-on-surface/10 text-on-surface/40 hover:border-primary hover:text-primary'}`}
              >
                <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
              </motion.button>
            </div>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => { handleAddToCart(); navigate('/checkout'); }}
              className="w-full h-14 rounded-full bg-primary text-on-primary font-black text-xs tracking-widest shadow-lg shadow-primary/20 transition-all"
            >
              BUY NOW
            </motion.button>
          </motion.div>

          {/* Accordions */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="pt-10 divide-y divide-primary/10"
          >
            {['description', 'delivery', 'size guide'].map((section) => (
              <div key={section} className="py-5">
                <button 
                  onClick={() => setActiveAccordion(activeAccordion === section ? null : section)}
                  className="w-full flex justify-between items-center group"
                >
                  <span className="text-xs font-black tracking-widest font-headline uppercase text-on-surface">{section}</span>
                  <motion.div
                    animate={{ rotate: activeAccordion === section ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="text-on-surface/40" size={20} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {activeAccordion === section && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 text-sm text-on-surface/60 leading-relaxed">
                        {section === 'description' ? product.description : 'Standard shipping takes 3-5 business days. Returns are accepted within 14 days of delivery.'}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Reviews Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-20 px-6 py-16 bg-surface-container rounded-3xl"
      >
        <div className="mb-12 flex flex-col items-center text-center">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-black tracking-tighter font-headline mb-2 text-on-surface uppercase"
          >
            REVIEWS
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl font-black text-primary font-headline mb-4"
          >
            4.9
          </motion.div>
          <div className="flex text-primary mb-2">
            {[1, 2, 3, 4, 5].map(i => <Star key={i} fill="currentColor" />)}
          </div>
          <span className="text-[10px] font-bold text-on-surface/40 tracking-widest uppercase">Based on 24 reviews</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { name: 'Marcus J.', date: '2 DAYS AGO', text: "The weight of this fabric is incredible. Truly premium street luxury. Best oversized fit I've found." },
            { name: 'Elena S.', date: '1 WEEK AGO', text: "Perfect architectural cut. Holds its shape perfectly after washing." }
          ].map((review, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="p-8 rounded-2xl bg-surface-container-low border border-on-surface/5 shadow-sm space-y-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm font-black tracking-tight text-on-surface uppercase">{review.name}</div>
                  <div className="text-[10px] font-medium text-on-surface/30 uppercase tracking-widest">{review.date}</div>
                </div>
                <div className="flex text-primary scale-75 origin-right">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} fill="currentColor" />)}
                </div>
              </div>
              <p className="text-sm text-on-surface/70 leading-relaxed italic">"{review.text}"</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </main>
  );
}
