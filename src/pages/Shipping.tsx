import React from 'react';

export default function Shipping() {
  return (
    <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto space-y-12">
      <div className="space-y-6">
        <div className="w-1 h-8 bg-primary" />
        <h1 className="font-headline text-5xl font-black tracking-tighter uppercase text-on-surface">SHIPPING POLICY</h1>
      </div>

      <div className="space-y-8 divide-y divide-on-surface/5">
        <section className="pt-8 space-y-4">
          <h2 className="font-headline text-xl font-bold uppercase tracking-tight text-on-surface">DOMESTIC SHIPPING</h2>
          <p className="text-on-surface/60 text-sm leading-relaxed">
            All domestic orders are processed within 2-3 business days. Standard shipping typically takes 3-5 business days for delivery. We offer free standard shipping on all orders.
          </p>
        </section>

        <section className="pt-8 space-y-4">
          <h2 className="font-headline text-xl font-bold uppercase tracking-tight text-on-surface">INTERNATIONAL SHIPPING</h2>
          <p className="text-on-surface/60 text-sm leading-relaxed">
            We ship worldwide. International shipping rates and delivery times vary by destination. Please note that customers are responsible for any customs duties or taxes incurred.
          </p>
        </section>

        <section className="pt-8 space-y-4">
          <h2 className="font-headline text-xl font-bold uppercase tracking-tight text-on-surface">ORDER TRACKING</h2>
          <p className="text-on-surface/60 text-sm leading-relaxed">
            Once your order has shipped, you will receive a confirmation email with a tracking number. You can track your package directly through our carrier's website.
          </p>
        </section>
      </div>
    </main>
  );
}
