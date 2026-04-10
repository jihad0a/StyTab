import React from 'react';

export default function Returns() {
  return (
    <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto space-y-12">
      <div className="space-y-6">
        <div className="w-1 h-8 bg-primary" />
        <h1 className="font-headline text-5xl font-black tracking-tighter uppercase text-on-surface">RETURNS & EXCHANGES</h1>
      </div>

      <div className="space-y-8 divide-y divide-on-surface/5">
        <section className="pt-8 space-y-4">
          <h2 className="font-headline text-xl font-bold uppercase tracking-tight text-on-surface">OUR POLICY</h2>
          <p className="text-on-surface/60 text-sm leading-relaxed">
            We accept returns within 14 days of delivery. To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging.
          </p>
        </section>

        <section className="pt-8 space-y-4">
          <h2 className="font-headline text-xl font-bold uppercase tracking-tight text-on-surface">HOW TO RETURN</h2>
          <p className="text-on-surface/60 text-sm leading-relaxed">
            To start a return, you can contact us at returns@stytab.com. If your return is accepted, we’ll send you a return shipping label, as well as instructions on how and where to send your package.
          </p>
        </section>

        <section className="pt-8 space-y-4">
          <h2 className="font-headline text-xl font-bold uppercase tracking-tight text-on-surface">REFUNDS</h2>
          <p className="text-on-surface/60 text-sm leading-relaxed">
            We will notify you once we’ve received and inspected your return, and let you know if the refund was approved or not. If approved, you’ll be automatically refunded on your original payment method.
          </p>
        </section>
      </div>
    </main>
  );
}
