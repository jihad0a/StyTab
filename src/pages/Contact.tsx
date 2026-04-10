import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Contact() {
  return (
    <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <section className="space-y-12">
          <div className="space-y-6">
            <div className="w-1 h-8 bg-primary" />
            <h1 className="font-headline text-5xl font-black tracking-tighter uppercase text-on-surface">GET IN TOUCH</h1>
            <p className="text-on-surface/60 max-w-md leading-relaxed">
              Have questions about a drop or your order? Our support team is available 24/7 to assist with your archive.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <Mail size={20} />
              </div>
              <div>
                <h3 className="font-headline font-bold text-xs tracking-widest uppercase text-on-surface">Email</h3>
                <p className="text-on-surface/60 text-sm">support@stytab.com</p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <Phone size={20} />
              </div>
              <div>
                <h3 className="font-headline font-bold text-xs tracking-widest uppercase text-on-surface">Phone</h3>
                <p className="text-on-surface/60 text-sm">+1 (555) 0123-4567</p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <h3 className="font-headline font-bold text-xs tracking-widest uppercase text-on-surface">Studio</h3>
                <p className="text-on-surface/60 text-sm">123 Noir District, Fashion Ave<br />New York, NY 10001</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface-container rounded-3xl p-8 md:p-12 border border-on-surface/5">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-widest text-on-surface/40 uppercase ml-1">Name</label>
                <input className="w-full bg-surface-container-low border border-on-surface/5 rounded-lg p-4 text-sm focus:ring-1 focus:ring-primary outline-none" placeholder="Your Name" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-widest text-on-surface/40 uppercase ml-1">Email</label>
                <input className="w-full bg-surface-container-low border border-on-surface/5 rounded-lg p-4 text-sm focus:ring-1 focus:ring-primary outline-none" placeholder="Your Email" type="email" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold tracking-widest text-on-surface/40 uppercase ml-1">Subject</label>
              <input className="w-full bg-surface-container-low border border-on-surface/5 rounded-lg p-4 text-sm focus:ring-1 focus:ring-primary outline-none" placeholder="Order Inquiry" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold tracking-widest text-on-surface/40 uppercase ml-1">Message</label>
              <textarea className="w-full bg-surface-container-low border border-on-surface/5 rounded-lg p-4 text-sm focus:ring-1 focus:ring-primary outline-none min-h-[150px]" placeholder="How can we help?" />
            </div>
            <button className="w-full bg-primary text-on-primary py-5 rounded-full font-headline font-black text-xs tracking-[0.2em] uppercase shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-all">
              SEND MESSAGE
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
