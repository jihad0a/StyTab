import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { products, Product } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';
import { Search, SlidersHorizontal, Loader2, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Products() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category') || 'ALL';
  const initialFilter = queryParams.get('filter') || '';

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  
  const [visibleProducts, setVisibleProducts] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveCategory(initialCategory);
    setVisibleProducts(6);
  }, [initialCategory, initialFilter]);

  const categories = ['ALL', 'DROP SHOULDER', 'OVERSIZED', 'GRAPHIC', 'ESSENTIAL'];
  
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'ALL' || p.category === activeCategory;
      
      let matchesFilter = true;
      if (initialFilter === 'new-arrival') matchesFilter = !!p.isNew;
      if (initialFilter === 'best-seller') matchesFilter = p.price > 50; // Mock best seller logic

      return matchesSearch && matchesCategory && matchesFilter;
    });
  }, [searchQuery, activeCategory, initialFilter]);

  const displayedProducts = filteredProducts.slice(0, visibleProducts);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleProducts < filteredProducts.length && !isLoading) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [visibleProducts, filteredProducts.length, isLoading]);

  const loadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleProducts(prev => prev + 3);
      setIsLoading(false);
    }, 800);
  };

  const getPageTitle = () => {
    if (initialFilter === 'new-arrival') return 'NEW ARRIVALS';
    if (initialFilter === 'best-seller') return 'BEST SELLERS';
    if (activeCategory !== 'ALL') return activeCategory;
    return 'ALL ARCHIVE';
  };

  return (
    <main className="pt-24 px-4 md:px-6 max-w-7xl mx-auto pb-20">
      <div className="space-y-12">
        {/* Title & Stats */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-1 h-8 bg-primary mb-2" />
            <h1 className="font-headline text-3xl md:text-5xl font-black tracking-tight md:tracking-tighter uppercase leading-none text-on-surface">
              {getPageTitle()}
            </h1>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-3 text-on-surface/40 text-[10px] font-black tracking-[0.2em] uppercase"
          >
            <span>{filteredProducts.length} Products Found</span>
          </motion.div>
        </div>

        {/* Categories Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex gap-2 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4 md:mx-0 md:px-0"
        >
          {categories.map((cat, i) => (
            <motion.button
              key={cat}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveCategory(cat);
                setVisibleProducts(6);
              }}
              className={`flex-none px-6 py-3 rounded-full text-[10px] font-black font-headline tracking-widest uppercase transition-all border whitespace-nowrap leading-none ${activeCategory === cat ? 'bg-primary border-primary text-on-primary' : 'bg-surface border-on-surface/10 text-on-surface/60 hover:border-primary hover:text-primary'}`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="group max-w-2xl"
        >
          <div className="relative flex items-center">
            <Search className="absolute left-4 text-on-surface/40 group-focus-within:text-primary transition-colors" size={20} />
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface border border-on-surface/5 rounded-xl py-4 pl-12 pr-4 text-on-surface placeholder:text-on-surface/30 focus:ring-1 focus:ring-primary focus:bg-surface transition-all font-bold tracking-widest uppercase text-xs" 
              placeholder="SEARCH THE ARCHIVE..." 
              type="text" 
            />
          </div>
        </motion.div>

        {/* Product Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12"
        >
          <AnimatePresence mode="popLayout">
            {displayedProducts.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="will-change-transform"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="py-20 text-center opacity-40">
            <p className="font-headline font-bold uppercase tracking-widest">No products found in this archive</p>
          </div>
        )}

        {/* Infinite Scroll Loader */}
        <div ref={loaderRef} className="mt-16 flex justify-center py-10">
          {visibleProducts < filteredProducts.length ? (
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="animate-spin text-primary" size={32} />
              <span className="text-[10px] font-bold tracking-[0.2em] text-on-surface/40 uppercase">Loading more archive...</span>
            </div>
          ) : filteredProducts.length > 0 && (
            <span className="text-[10px] font-bold tracking-[0.2em] text-on-surface/20 uppercase">End of archive</span>
          )}
        </div>
      </div>
    </main>
  );
}
