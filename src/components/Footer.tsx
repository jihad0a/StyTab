import { Instagram, Facebook, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-surface pt-20 pb-10 px-6 border-t border-on-surface/5">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="text-4xl font-black text-on-surface tracking-[-0.05em] font-headline uppercase">StyTab</div>
            <div className="space-y-4">
              <h4 className="font-headline font-bold text-xs tracking-widest text-on-surface uppercase">STAY IN THE DROP</h4>
              <p className="text-on-surface/60 text-sm">Access to exclusive releases and editorial content.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  className="flex-1 bg-surface-container-high border-none rounded-sm px-4 py-4 text-xs font-headline font-bold text-on-surface placeholder:text-on-surface/30 focus:ring-1 focus:ring-primary" 
                  placeholder="EMAIL ADDRESS" 
                  type="email" 
                />
                <button className="bg-primary text-on-primary px-8 py-4 rounded-sm font-headline font-black text-xs tracking-widest uppercase shadow-md hover:brightness-110 transition-all">
                  SUBSCRIBE
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10">
            <div className="space-y-4">
              <h5 className="font-headline font-bold text-[10px] tracking-widest text-on-surface uppercase">SHOP</h5>
              <ul className="space-y-2">
                <li><Link to="/collection?filter=new-arrival" className="text-on-surface/60 text-xs hover:text-primary transition-colors uppercase">NEW ARRIVALS</Link></li>
                <li><Link to="/collection?filter=best-seller" className="text-on-surface/60 text-xs hover:text-primary transition-colors uppercase">BEST SELLERS</Link></li>
                <li><button onClick={() => window.dispatchEvent(new CustomEvent('open-wishlist'))} className="text-on-surface/60 text-xs hover:text-primary transition-colors uppercase">WISHLIST</button></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h5 className="font-headline font-bold text-[10px] tracking-widest text-on-surface uppercase">SUPPORT</h5>
              <ul className="space-y-2">
                <li><Link to="/shipping" className="text-on-surface/60 text-xs hover:text-primary transition-colors uppercase">SHIPPING</Link></li>
                <li><Link to="/returns" className="text-on-surface/60 text-xs hover:text-primary transition-colors uppercase">RETURNS</Link></li>
                <li><Link to="/contact" className="text-on-surface/60 text-xs hover:text-primary transition-colors uppercase">CONTACT</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-8 border-t border-on-surface/5">
          <div className="flex gap-6">
            <a href="#" className="text-on-surface/40 hover:text-primary transition-colors"><Instagram size={20} /></a>
            <a href="#" className="text-on-surface/40 hover:text-primary transition-colors"><Facebook size={20} /></a>
            <a href="#" className="text-on-surface/40 hover:text-primary transition-colors"><MessageCircle size={20} /></a>
          </div>
          <p className="text-[10px] font-medium tracking-[0.2em] text-on-surface/30 uppercase text-center">
            © 2024 StyTab STREETWEAR. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
