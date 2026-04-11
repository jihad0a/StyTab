import React, { useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { products } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, TrendingUp } from 'lucide-react';

export default function Collection() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filter = queryParams.get('filter') || 'new-arrival';

  const collectionData = useMemo(() => {
    if (filter === 'best-seller') {
      return {
        title: 'BEST SELLERS',
        subtitle: 'THE MOST COVETED PIECES IN OUR ARCHIVE',
        description: 'A curated selection of our most popular silhouettes, engineered for the perfect fit and lasting durability.',
        icon: TrendingUp,
        items: products.filter(p => p.price > 50),
        accent: 'bg-primary/10 text-primary'
      };
    }
    return {
      title: 'NEW ARRIVALS',
      subtitle: 'THE LATEST DROP FROM THE NOIR EDITORIAL',
      description: 'Fresh silhouettes and architectural designs. Experience the cutting edge of modern streetwear.',
      icon: Sparkles,
      items: products.filter(p => p.isNew),
      accent: 'bg-primary/10 text-primary'
    };
  }, [filter]);

  return (
    <main className="pt-24 pb-20">
      {/* Editorial Header */}
      <section className="px-6 py-12 md:py-24 max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row gap-12 items-start md:items-center">
          <div className="flex-1 space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${collectionData.accent} text-[10px] font-black tracking-[0.2em] uppercase`}
            >
              <collectionData.icon size={14} />
              {filter === 'best-seller' ? 'TRENDING NOW' : 'JUST DROPPED'}
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-headline text-3xl md:text-8xl font-black tracking-tight md:tracking-tighter uppercase leading-[0.85] text-on-surface"
            >
              {collectionData.title.split(' ').map((word, i) => (
                <React.Fragment key={i}>
                  {word} <br className="hidden md:block" />
                </React.Fragment>
              ))}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-on-surface/60 text-sm md:text-lg max-w-md leading-relaxed"
            >
              {collectionData.description}
            </motion.p>
          </div>
          <div className="flex-1 w-full aspect-[4/5] md:aspect-square rounded-3xl overflow-hidden bg-surface-container relative group">
            <img 
              src={collectionData.items[0]?.image || 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1200'} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              alt="Collection Hero"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent opacity-60" />
            <div className="absolute bottom-8 left-8 right-8">
              <div className="text-[10px] font-black tracking-[0.3em] text-on-surface/40 uppercase mb-2">Featured Piece</div>
              <div className="text-2xl font-headline font-black text-on-surface uppercase tracking-tight">{collectionData.items[0]?.name}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="px-6 max-w-7xl mx-auto"
      >
        <div className="flex justify-between items-end mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-2"
          >
            <h2 className="font-headline text-2xl font-black uppercase tracking-tight">THE COLLECTION</h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="h-1 bg-primary" 
            />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-[10px] font-black tracking-[0.2em] text-on-surface/40 uppercase"
          >
            {collectionData.items.length} PIECES
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {collectionData.items.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="mt-32 px-6 max-w-7xl mx-auto"
      >
        <div className="bg-on-surface text-surface rounded-[2rem] p-12 md:p-20 overflow-hidden relative group">
          <div className="relative z-10 space-y-8 max-w-xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="font-headline text-4xl md:text-6xl font-black uppercase leading-none tracking-tighter"
            >
              EXPLORE THE <br /> FULL ARCHIVE
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-surface/60 text-sm md:text-lg leading-relaxed"
            >
              Discover our complete range of architectural streetwear, from essential basics to limited edition drops.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
            >
              <Link 
                to="/products" 
                className="inline-flex items-center gap-4 bg-primary text-on-primary px-10 py-5 rounded-full font-headline font-black text-xs tracking-widest uppercase hover:brightness-110 transition-all group"
              >
                VIEW ALL PRODUCTS
                <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 hidden lg:block">
            <motion.img 
              whileHover={{ scale: 1.1, rotate: 2 }}
              transition={{ duration: 1.5 }}
              src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1200" 
              className="w-full h-full object-cover grayscale"
              alt="Decorative"
            />
          </div>
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl" 
          />
        </div>
      </motion.section>
    </main>
  );
}
