import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PortfolioItem } from '../types';
import { X, ArrowRight, BookOpen, Layers, Type, Compass, Check } from 'lucide-react';

interface PortfolioViewProps {
  portfolioItems: PortfolioItem[];
  selectedItem: PortfolioItem | null;
  setSelectedItem: (item: PortfolioItem | null) => void;
  openInquiryFormWithContext: (projectName: string) => void;
}

export default function PortfolioView({ portfolioItems, selectedItem, setSelectedItem, openInquiryFormWithContext }: PortfolioViewProps) {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Boutique' | 'Culinary' | 'Fitness'>('All');

  const filters: Array<'All' | 'Boutique' | 'Culinary' | 'Fitness'> = [
    'All', 'Boutique', 'Culinary', 'Fitness'
  ];

  const filteredItems = activeFilter === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

  return (
    <div className="flex flex-col space-y-24 px-6 md:px-12 pb-24 max-w-7xl mx-auto w-full">
      {/* 1. Header Section */}
      <motion.section 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pt-16 flex flex-col space-y-4 max-w-3xl"
      >
        <span className="font-mono text-xs text-studio-accent uppercase tracking-[0.2em] font-medium">
          03 // WEBSITE CONCEPTS
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-studio-dark leading-tight">
          Website Concepts
        </h1>
        <p className="font-sans text-base md:text-lg text-studio-clay font-light leading-relaxed max-w-2xl">
          Premium website experiences created to demonstrate what's possible for local businesses. Never fake client work. Each concept represents a custom brand language, optimized typography, and modern high-performance design layout.
        </p>
      </motion.section>

      {/* 2. Navigation Filters */}
      <section className="border-y border-studio-border py-4 flex flex-wrap items-center gap-3">
        <span className="font-mono text-[10px] uppercase text-studio-clay/70 mr-4 tracking-wider font-semibold">FILTER CATALOGUE //</span>
        <div className="flex flex-wrap items-center gap-2">
          {filters.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className="group relative px-4 py-2 font-sans text-xs uppercase tracking-wider rounded-full border border-studio-border/60 text-studio-clay hover:text-studio-dark transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {isActive && (
                  <motion.span
                    layoutId="activeFilterPill"
                    className="absolute inset-0 bg-studio-dark -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  />
                )}
                <span className={`relative z-10 transition-colors duration-300 ${isActive ? 'text-studio-cream font-semibold' : ''}`}>
                  {filter}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Portfolio Staggered Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              key={item.id}
              className={`flex flex-col space-y-5 group cursor-pointer ${index % 2 === 1 ? 'md:pt-12' : ''}`}
              onClick={() => setSelectedItem(item)}
            >
              {/* Image box */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100 border border-studio-border shadow-md group-hover:shadow-lg transition-all duration-500">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-studio-dark/90 backdrop-blur-md text-studio-cream font-mono text-[9px] tracking-wider uppercase px-3 py-1 rounded-full font-medium">
                  {item.category}
                </div>
                <div className="absolute top-4 right-4 bg-studio-cream/90 backdrop-blur-md text-studio-dark font-mono text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                  {item.year}
                </div>
              </div>

              {/* Title & info caption */}
              <div className="flex flex-col space-y-2 border-b border-studio-border pb-5">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-serif text-xl md:text-2xl font-bold text-studio-dark group-hover:text-studio-accent transition-colors">
                    {item.title}
                  </h3>
                  <span className="font-mono text-xs text-studio-accent font-medium">INDEX_{item.id}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-studio-clay font-light">
                  <span>{item.client}</span>
                  <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-studio-accent inline-flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                    <span>Inspect format</span>
                    <ArrowRight size={10} />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </section>

      {/* 4. Fullscreen Editorial Modal Case Study */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-studio-dark/70 backdrop-blur-md p-4 md:p-10 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="bg-studio-cream text-studio-dark max-w-5xl w-full rounded-2xl overflow-hidden shadow-2xl border border-studio-accent/20 flex flex-col max-h-[90vh]"
            >
              {/* Modal sticky bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-studio-border-dark bg-studio-cream sticky top-0 z-10">
                <div className="flex flex-col">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-studio-accent font-bold">CASE DOSSIER // INDEX_{selectedItem.id}</span>
                  <span className="font-serif text-sm font-semibold text-studio-dark">{selectedItem.title} Case Study</span>
                </div>
                
                <button
                  onClick={() => setSelectedItem(null)}
                  className="bg-studio-dark/5 hover:bg-studio-dark text-studio-dark hover:text-studio-cream p-1.5 rounded-full transition-colors cursor-pointer"
                  title="Close study"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable contents */}
              <div className="overflow-y-auto p-6 md:p-10 space-y-12">
                {/* Visual Banner */}
                <div className="relative aspect-[21/9] rounded-xl overflow-hidden bg-stone-200 border border-studio-border shadow-md">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Grid Split metadata and Brand Story */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-4 flex flex-col space-y-6 bg-stone-50 border border-studio-border p-6 rounded-xl font-mono text-xs">
                    <span className="text-[10px] tracking-wider text-studio-accent font-bold uppercase border-b border-studio-border pb-3">METRICS dossier</span>
                    <div className="flex justify-between py-1.5 border-b border-studio-border/50">
                      <span className="text-studio-clay">CLIENT:</span>
                      <span className="text-studio-dark font-semibold">{selectedItem.client}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-studio-border/50">
                      <span className="text-studio-clay">CATEGORY:</span>
                      <span className="text-studio-dark font-semibold">{selectedItem.category}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-studio-border/50">
                      <span className="text-studio-clay">LAUNCH YEAR:</span>
                      <span className="text-studio-dark font-semibold">{selectedItem.year}</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-studio-clay">TYPOGRAPHY:</span>
                      <span className="text-studio-dark font-semibold">{selectedItem.typography}</span>
                    </div>
                  </div>

                  <div className="lg:col-span-8 flex flex-col space-y-4">
                    <span className="font-mono text-[10px] tracking-widest text-studio-accent uppercase font-bold flex items-center space-x-1">
                      <Compass size={12} />
                      <span>THE DESIGN BRIEF</span>
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-studio-dark">{selectedItem.description}</h3>
                    <p className="font-sans text-sm text-studio-clay leading-relaxed font-light">
                      {selectedItem.brandStory}
                    </p>
                  </div>
                </div>

                {/* Styling Details System (Color Palette, Typo pairings, built features) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-studio-border">
                  {/* Color palette */}
                  <div className="flex flex-col space-y-4">
                    <span className="font-mono text-[9px] tracking-widest text-studio-accent uppercase font-bold flex items-center space-x-1">
                      <Layers size={12} />
                      <span>COLOR PALETTE</span>
                    </span>
                    <div className="flex flex-col space-y-2">
                      {selectedItem.colorPalette.map((colorHex, idx) => (
                        <div key={idx} className="flex items-center space-x-3 bg-stone-50 border border-studio-border p-2.5 rounded-lg">
                          <div 
                            className="w-6 h-6 rounded-md shadow-sm shrink-0" 
                            style={{ backgroundColor: colorHex }}
                          ></div>
                          <span className="font-mono text-xs uppercase text-studio-dark font-medium">{colorHex}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Built Features list */}
                  <div className="flex flex-col space-y-4 md:col-span-2">
                    <span className="font-mono text-[9px] tracking-widest text-studio-accent uppercase font-bold flex items-center space-x-1">
                      <BookOpen size={12} />
                      <span>ENGINEERED FEATURES</span>
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {selectedItem.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start space-x-2.5 bg-stone-50 border border-studio-border p-3.5 rounded-xl text-xs text-studio-clay font-light">
                          <Check size={14} className="text-studio-gold shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Call to Action at bottom of modal */}
                <div className="pt-8 border-t border-studio-border flex flex-col sm:flex-row items-center justify-between gap-6 bg-stone-50 p-6 rounded-xl">
                  <div className="flex flex-col space-y-1">
                    <span className="font-serif text-base font-bold text-studio-dark">Seek a similar feel for your brand?</span>
                    <span className="font-sans text-xs text-studio-clay font-light">Let's co-create a tailored website concept based on the editorial language of {selectedItem.title}.</span>
                  </div>
                  
                  <button
                    onClick={() => {
                      setSelectedItem(null);
                      openInquiryFormWithContext(selectedItem.title);
                    }}
                    className="bg-studio-dark hover:bg-studio-accent text-studio-cream font-sans text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-lg cursor-pointer transition-colors shrink-0 flex items-center space-x-1.5"
                  >
                    <span>Inquire with this aesthetic</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
