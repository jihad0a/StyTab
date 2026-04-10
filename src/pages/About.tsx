import React from 'react';

export default function About() {
  return (
    <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto space-y-16">
      <section className="space-y-6">
        <div className="w-1 h-12 bg-primary mb-4" />
        <h1 className="font-headline text-3xl md:text-7xl font-black tracking-tight md:tracking-tighter uppercase leading-none text-on-surface">
          ARCHITECTURAL <br /> STREETWEAR
        </h1>
        <p className="text-on-surface/60 text-lg leading-relaxed font-body">
          StyTab was founded on the principle of structural integrity in fashion. We don't just make T-shirts; we engineer silhouettes that define the modern urban landscape.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-4">
          <h2 className="font-headline text-2xl font-bold uppercase tracking-tight text-on-surface">OUR PHILOSOPHY</h2>
          <p className="text-on-surface/60 text-sm leading-relaxed">
            Every drop is a study in proportion and materiality. We source the highest grade heavyweight cotton to ensure our oversized fits maintain their shape, drop after drop.
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="font-headline text-2xl font-bold uppercase tracking-tight text-on-surface">THE ARCHIVE</h2>
          <p className="text-on-surface/60 text-sm leading-relaxed">
            Our collections are released in limited quantities. Once a drop is archived, it is never restocked. This ensures the exclusivity and value of every StyTab piece in your collection.
          </p>
        </div>
      </section>

      <section className="relative h-[400px] rounded-2xl overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1600&auto=format&fit=crop" 
          className="w-full h-full object-cover" 
          alt="Studio" 
        />
        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
      </section>
    </main>
  );
}
