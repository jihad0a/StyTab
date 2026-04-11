import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { products } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';
import { Link } from 'react-router-dom';

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1600&auto=format&fit=crop',
    title: 'DROP SHOULDER ESSENTIALS',
    subtitle: 'Premium heavyweight cotton, engineered for the perfect silhouette.'
  },
  {
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1600&auto=format&fit=crop',
    title: 'OVERSIZED BOX TEES',
    subtitle: 'The ultimate street luxury. Heavyweight fabric, structured fit.'
  },
  {
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1600&auto=format&fit=crop',
    title: 'GRAPHIC NOIR SERIES',
    subtitle: 'Bold statements. Minimalist aesthetic. High-fashion editorial tees.'
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const featuredProducts = products.slice(0, 2);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="pt-[60px]">
      {/* Hero Slider */}
      <section className="relative h-[85vh] w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${heroSlides[currentSlide].image}')` }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/10 to-transparent" />
        <div className="absolute bottom-16 left-6 right-6 space-y-4 max-w-7xl mx-auto">
          <motion.span 
            key={`label-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-3 py-1 bg-primary/20 border border-primary/30 text-primary font-headline text-[10px] tracking-widest font-bold uppercase rounded-sm backdrop-blur-sm"
          >
            NEW DROP
          </motion.span>
          <motion.h1 
            key={`title-${currentSlide}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-headline text-3xl sm:text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tight sm:tracking-tighter uppercase drop-shadow-lg"
          >
            {heroSlides[currentSlide].title.split(' ').map((word, i) => (
              <React.Fragment key={i}>
                {word} {i === 1 && <br className="hidden sm:block" />}
              </React.Fragment>
            ))}
          </motion.h1>
          <motion.p 
            key={`subtitle-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/90 max-w-[280px] text-xs sm:text-sm leading-relaxed drop-shadow-md"
          >
            {heroSlides[currentSlide].subtitle}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 pt-4"
          >
            <Link to="/products" className="bg-primary text-on-primary px-8 py-4 sm:py-3 rounded-full text-center font-headline font-bold text-xs tracking-wider uppercase transition-all hover:brightness-110 active:scale-95 shadow-lg">
              SHOP NOW
            </Link>
            <Link to="/about" className="bg-black text-white px-6 py-4 sm:py-3 rounded-full text-center font-headline font-bold text-xs tracking-wider uppercase transition-all hover:bg-black/80 active:scale-95 shadow-lg">
              VIEW LOOKBOOK
            </Link>
          </motion.div>
          
          <div className="flex gap-2 mt-8">
            {heroSlides.map((_, i) => (
              <button 
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-2 h-2 rounded-full transition-all ${currentSlide === i ? 'bg-primary w-4' : 'bg-white/40'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="bg-primary py-3 overflow-hidden whitespace-nowrap">
        <div className="animate-marquee gap-8 items-center">
          <span className="font-headline font-black text-on-primary text-xs tracking-widest uppercase">
            FREE DELIVERY ON ALL ORDERS • NEW COLLECTION AVAILABLE • PREMIUM DROP SHOULDER FITS • FREE DELIVERY ON ALL ORDERS • NEW COLLECTION AVAILABLE • PREMIUM DROP SHOULDER FITS
          </span>
        </div>
      </section>

      {/* Category Pills */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="px-6 py-8 max-w-7xl mx-auto"
      >
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {['ALL', 'DROP SHOULDER', 'OVERSIZED', 'GRAPHIC', 'ESSENTIAL'].map((cat, i) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Link 
                to={`/products?category=${cat}`}
                className={`flex-none px-6 py-2 rounded-full text-xs font-bold font-headline tracking-widest uppercase transition-all border border-on-surface/10 text-on-surface/70 hover:border-primary hover:text-primary hover:bg-primary/5`}
              >
                {cat}
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Featured Products */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="px-6 py-12 space-y-12 max-w-7xl mx-auto"
      >
        <div className="flex justify-between items-end">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="font-headline text-3xl font-black text-on-surface tracking-tighter uppercase">BEST SELLERS</h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="h-1 bg-primary mt-2" 
            />
          </motion.div>
          <Link to="/collection?filter=best-seller" className="text-[10px] font-black tracking-[0.2em] uppercase text-on-surface/40 hover:text-primary transition-colors">
            VIEW ALL
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {products.slice(0, 2).map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8, ease: "easeOut" }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Brand Story Section */}
      <section className="px-6 py-16 md:py-24 bg-surface overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-6 md:space-y-8"
          >
            <div className="space-y-3 md:space-y-4">
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-primary font-headline font-bold text-[10px] tracking-[0.3em] uppercase"
              >
                OUR PHILOSOPHY
              </motion.span>
              <h2 className="font-headline text-3xl md:text-5xl font-black text-on-surface leading-[0.9] uppercase tracking-tight md:tracking-tighter">ARCHITECTURAL <br /> STREETWEAR</h2>
            </div>
            <p className="text-on-surface/60 text-xs md:text-sm leading-relaxed max-w-md">
              StyTab is more than a brand; it's an engineering project. We focus on the geometry of the human form, creating silhouettes that command space while providing unparalleled comfort.
            </p>
            <div className="grid grid-cols-2 gap-6 md:gap-8 pt-2 md:pt-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <div className="text-2xl md:text-3xl font-headline font-black text-primary uppercase tracking-tighter">300GSM</div>
                <div className="text-[9px] md:text-[10px] font-bold text-on-surface/40 uppercase tracking-widest">Heavyweight Cotton</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <div className="text-2xl md:text-3xl font-headline font-black text-primary uppercase tracking-tighter">01/24</div>
                <div className="text-[9px] md:text-[10px] font-bold text-on-surface/40 uppercase tracking-widest">Archive Series</div>
              </motion.div>
            </div>
            <Link to="/about" className="inline-block border-b-2 border-primary pb-1 text-[10px] font-black tracking-[0.2em] uppercase text-on-surface hover:text-primary transition-colors">
              READ OUR STORY
            </Link>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative mt-8 lg:mt-0"
          >
            <div className="aspect-square bg-surface-container rounded-3xl overflow-hidden shadow-2xl">
              <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8 }}
                src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1200&auto=format&fit=crop" 
                alt="Brand Story" 
                className="w-full h-full object-cover"
              />
            </div>
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="absolute -bottom-8 -left-8 w-48 h-48 bg-primary rounded-2xl p-6 flex flex-col justify-end shadow-xl hidden md:flex"
            >
              <div className="text-on-primary font-headline font-black text-4xl leading-none uppercase">EST.<br />2024</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="px-6 py-24 space-y-12 max-w-7xl mx-auto"
      >
        <div className="flex justify-between items-end">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="font-headline text-3xl font-black text-on-surface tracking-tighter uppercase">NEW ARRIVALS</h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="h-1 bg-primary mt-2" 
            />
          </motion.div>
          <Link to="/collection?filter=new-arrival" className="text-[10px] font-black tracking-[0.2em] uppercase text-on-surface/40 hover:text-primary transition-colors">
            VIEW ALL
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.filter(p => p.isNew).slice(0, 3).map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8, ease: "easeOut" }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Promotional Banner */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="mx-6 my-12 md:my-16 max-w-7xl md:mx-auto"
      >
        <div className="bg-surface-container rounded-2xl overflow-hidden relative border border-on-surface/5 shadow-sm p-8 md:p-12 text-center space-y-6 group">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <span className="text-primary font-headline font-bold text-[10px] tracking-[0.3em] uppercase">LIMITED SEASONAL</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="font-headline text-3xl md:text-4xl font-black text-on-surface leading-none uppercase tracking-tighter"
          >
            ARCHIVE SALE <br /> UP TO 40% OFF
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="text-on-surface/60 text-[10px] md:text-xs max-w-[240px] mx-auto leading-relaxed"
          >
            Final stock of our 01/24 collection. Never to be restocked.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            <Link to="/products" className="inline-block bg-primary text-on-primary px-8 md:px-10 py-4 rounded-full font-headline font-black text-[10px] tracking-[0.2em] uppercase shadow-xl active:scale-95 transition-all hover:brightness-110 hover:px-12">
              SHOP THE SALE
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Quality Section */}
      <section className="px-6 py-16 md:py-24 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
        {[
          {
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
            title: "PREMIUM QUALITY",
            desc: "Every piece is crafted from 100% long-staple cotton for durability and a superior hand-feel."
          },
          {
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>,
            title: "SUSTAINABLE PRODUCTION",
            desc: "We produce in limited batches to minimize waste and ensure ethical manufacturing standards."
          },
          {
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16v-2"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
            title: "GLOBAL SHIPPING",
            desc: "Fast, reliable shipping to over 50 countries worldwide with real-time tracking."
          }
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2, duration: 0.8 }}
            className="space-y-4 group"
          >
            <motion.div 
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="w-12 h-12 bg-surface-container rounded-xl flex items-center justify-center text-primary transition-colors group-hover:bg-primary group-hover:text-on-primary"
            >
              {item.icon}
            </motion.div>
            <h3 className="font-headline font-black text-lg uppercase tracking-tight">{item.title}</h3>
            <p className="text-on-surface/60 text-xs leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
