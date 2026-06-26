import { useState } from 'react';
import { motion } from 'motion/react';
import { PricingPackage, CustomQuoteOptions } from '../types';
import { Check, ArrowRight, Sparkles, HelpCircle, Info } from 'lucide-react';

interface ServicesViewProps {
  packages: PricingPackage[];
  onSelectPackage: (packageName: string, estimatedPrice: number) => void;
}

export default function ServicesView({ packages, onSelectPackage }: ServicesViewProps) {
  // Quote Planner States
  const [pages, setPages] = useState(5);
  const [options, setOptions] = useState<CustomQuoteOptions>({
    customCopy: true,
    seoSetup: false,
    prioritySupport: true,
    domainConfig: true,
  });
  const [ecommerce, setEcommerce] = useState(false);

  // Surcharges / Prices in INR (₹)
  const BASE_PRICE = 4999; // base price for a 1-page site: ₹4,999
  const PRICE_PER_PAGE = 1000; // ₹1,000
  const PRICE_COPY = 1500; // ₹1,500
  const PRICE_SEO = 1000; // ₹1,000
  const PRICE_SUPPORT = 1000; // ₹1,000
  const PRICE_DOMAIN = 500; // ₹500
  const PRICE_ECOMMERCE = 5000; // ₹5,000

  // Calculate live total
  const calculateTotal = () => {
    let total = BASE_PRICE;
    
    // add pages (page 1 is free as part of base)
    if (pages > 1) {
      total += (pages - 1) * PRICE_PER_PAGE;
    }
    
    if (options.customCopy) total += PRICE_COPY;
    if (options.seoSetup) total += PRICE_SEO;
    if (options.prioritySupport) total += PRICE_SUPPORT;
    if (options.domainConfig) total += PRICE_DOMAIN;
    if (ecommerce) total += PRICE_ECOMMERCE;
    
    return total;
  };

  const handleOptionToggle = (key: keyof CustomQuoteOptions) => {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const currentTotal = calculateTotal();

  const handleInquireCustom = () => {
    const configDescription = `Custom Site Config: ${pages} pages, ${options.customCopy ? 'With Copywriting, ' : ''}${options.seoSetup ? 'With SEO, ' : ''}${options.prioritySupport ? 'With Priority Support, ' : ''}${options.domainConfig ? 'With Domain Config, ' : ''}${ecommerce ? 'With E-Commerce' : ''}`;
    onSelectPackage(configDescription, currentTotal);
  };

  return (
    <div className="flex flex-col space-y-24 md:space-y-36 px-6 md:px-12 pb-24 max-w-7xl mx-auto w-full">
      {/* 1. Header Section */}
      <section className="pt-16 flex flex-col space-y-4 max-w-3xl">
        <span className="font-mono text-xs text-studio-accent uppercase tracking-[0.2em] font-medium">
          02 // SERVICE DIRECTORY
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-studio-dark leading-tight">
          Transparent offerings. Uncompromising quality.
        </h1>
        <p className="font-sans text-base md:text-lg text-studio-clay font-light leading-relaxed max-w-2xl">
          We maintain absolute transparency with our pricing. Each configuration is carefully outlined to let you make informed decisions for your business. No secret surcharges, no subscription locks.
        </p>
      </section>

      {/* 2. Directory Brochure Cards */}
      <motion.section 
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
            }
          }
        }}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start"
      >
        {packages.map((pkg, index) => (
          <motion.div 
            key={pkg.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } }
            }}
            whileHover={{ y: -8, boxShadow: "0 12px 30px -10px rgba(154, 123, 102, 0.15)" }}
            className={`bg-white rounded-2xl border ${pkg.badge ? 'border-studio-accent/40 shadow-lg' : 'border-studio-border'} p-8 md:p-10 flex flex-col space-y-8 relative overflow-hidden transition-shadow duration-300`}
          >
            {pkg.badge && (
              <div className="absolute top-4 right-4 bg-studio-accent text-studio-cream font-mono text-[9px] font-semibold uppercase px-2.5 py-1 rounded-full tracking-wider">
                {pkg.badge}
              </div>
            )}
            
            <div className="flex flex-col space-y-2">
              <span className="font-mono text-[10px] tracking-widest text-studio-clay uppercase font-semibold">
                PACKAGE // {pkg.id.toUpperCase()}
              </span>
              <h3 className="font-serif text-2xl font-bold text-studio-dark">{pkg.name}</h3>
              <p className="font-sans text-xs text-studio-clay font-light">{pkg.subtitle}</p>
            </div>

            <div className="flex items-baseline space-x-2 border-y border-studio-border py-4">
              <span className="font-sans text-xs font-mono text-studio-clay">FLAT FEE /</span>
              <span className="font-serif text-3xl font-extrabold text-studio-dark">
                {pkg.price === 450000 ? 'From ₹4,50,000' : `₹${pkg.price.toLocaleString('en-IN')}`}
              </span>
            </div>

            <p className="font-sans text-sm text-studio-clay font-light leading-relaxed">
              {pkg.description}
            </p>

            <div className="flex flex-col space-y-4">
              <span className="font-mono text-[9px] uppercase tracking-wider text-studio-accent font-bold">DELIVERABLES</span>
              <ul className="flex flex-col space-y-3">
                {pkg.deliverables.map((item, index) => (
                  <li key={index} className="flex items-start space-x-3 text-sm text-studio-clay font-light">
                    <Check size={14} className="text-studio-accent shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 mt-auto border-t border-studio-border flex justify-between items-center">
              <div className="flex flex-col font-mono text-[9px] text-studio-clay uppercase tracking-wider">
                <span>ESTIMATED TIMELINE</span>
                <span className="text-studio-dark font-semibold">{pkg.timeline}</span>
              </div>
              
              <button
                onClick={() => onSelectPackage(pkg.name, pkg.price)}
                className="bg-studio-dark hover:bg-studio-accent text-studio-cream font-sans text-[10px] font-bold uppercase tracking-wider px-5 py-2.5 rounded-full flex items-center space-x-1 cursor-pointer transition-colors"
              >
                <span>Select Package</span>
                <ArrowRight size={12} />
              </button>
            </div>
          </motion.div>
        ))}
      </motion.section>

      {/* 3. Interactive Quote Planner Section */}
      <section className="bg-[#1C1815] text-studio-cream rounded-3xl p-8 md:p-16 border border-studio-accent/25">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Sizing & Surcharges Panel */}
          <div className="lg:col-span-7 flex flex-col space-y-8">
            <div className="flex flex-col space-y-2">
              <span className="font-mono text-[10px] tracking-[0.25em] text-studio-gold uppercase font-bold flex items-center space-x-1.5">
                <Sparkles size={12} />
                <span>INTERACTIVE LABS</span>
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-studio-cream">
                Assemble a Bespoke Sizing Quote
              </h2>
              <p className="font-sans text-sm text-studio-cream/60 leading-relaxed font-light max-w-xl">
                Use our live calculator to specify exactly what your business requires. Adjust page counts, copywriting scope, and advanced features to see a real-time, transparent fee estimation.
              </p>
            </div>

            {/* Slider for page count */}
            <div className="flex flex-col space-y-3 bg-white/5 border border-white/5 p-6 rounded-2xl">
              <div className="flex justify-between items-baseline">
                <span className="font-sans text-sm font-medium text-studio-cream">Number of Pages</span>
                <span className="font-serif text-lg font-bold text-studio-gold">
                  {pages} {pages === 1 ? 'Page' : 'Pages'}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                value={pages}
                onChange={(e) => setPages(parseInt(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-studio-gold focus:outline-none"
              />
              <div className="flex justify-between font-mono text-[9px] text-studio-cream/40">
                <span>1 PAGE (STUDIO PAGE)</span>
                <span>15 PAGES (COMPREHENSIVE DIRECTORY)</span>
              </div>
            </div>

            {/* Features Checkbox list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Custom Copywriting */}
              <button
                onClick={() => handleOptionToggle('customCopy')}
                className={`flex items-start space-x-3.5 p-4 rounded-xl border text-left cursor-pointer transition-colors ${options.customCopy ? 'border-studio-gold bg-studio-gold/5 text-studio-cream' : 'border-white/10 hover:border-white/25 text-studio-cream/70'}`}
              >
                <div className={`w-4 h-4 rounded border mt-0.5 flex items-center justify-center shrink-0 ${options.customCopy ? 'border-studio-gold bg-studio-gold' : 'border-white/30'}`}>
                  {options.customCopy && <Check size={10} className="text-studio-dark font-bold" />}
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-xs font-semibold">Brand Copywriting</span>
                  <span className="font-mono text-[9px] text-studio-cream/50">+₹1,500 // Full visual tone & copy</span>
                </div>
              </button>

              {/* Advanced SEO */}
              <button
                onClick={() => handleOptionToggle('seoSetup')}
                className={`flex items-start space-x-3.5 p-4 rounded-xl border text-left cursor-pointer transition-colors ${options.seoSetup ? 'border-studio-gold bg-studio-gold/5 text-studio-cream' : 'border-white/10 hover:border-white/25 text-studio-cream/70'}`}
              >
                <div className={`w-4 h-4 rounded border mt-0.5 flex items-center justify-center shrink-0 ${options.seoSetup ? 'border-studio-gold bg-studio-gold' : 'border-white/30'}`}>
                  {options.seoSetup && <Check size={10} className="text-studio-dark font-bold" />}
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-xs font-semibold">Advanced SEO Setup</span>
                  <span className="font-mono text-[9px] text-studio-cream/50">+₹1,000 // Keyword indexation & maps</span>
                </div>
              </button>

              {/* Priority Support */}
              <button
                onClick={() => handleOptionToggle('prioritySupport')}
                className={`flex items-start space-x-3.5 p-4 rounded-xl border text-left cursor-pointer transition-colors ${options.prioritySupport ? 'border-studio-gold bg-studio-gold/5 text-studio-cream' : 'border-white/10 hover:border-white/25 text-studio-cream/70'}`}
              >
                <div className={`w-4 h-4 rounded border mt-0.5 flex items-center justify-center shrink-0 ${options.prioritySupport ? 'border-studio-gold bg-studio-gold font-bold' : 'border-white/30'}`}
                >
                  {options.prioritySupport && <Check size={10} className="text-studio-dark font-bold" />}
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-xs font-semibold">Priority 30-Day Launch Care</span>
                  <span className="font-mono text-[9px] text-studio-cream/50">+₹1,000 // Express support & edits</span>
                </div>
              </button>

              {/* Domain Config */}
              <button
                onClick={() => handleOptionToggle('domainConfig')}
                className={`flex items-start space-x-3.5 p-4 rounded-xl border text-left cursor-pointer transition-colors ${options.domainConfig ? 'border-studio-gold bg-studio-gold/5 text-studio-cream' : 'border-white/10 hover:border-white/25 text-studio-cream/70'}`}
              >
                <div className={`w-4 h-4 rounded border mt-0.5 flex items-center justify-center shrink-0 ${options.domainConfig ? 'border-studio-gold bg-studio-gold' : 'border-white/30'}`}>
                  {options.domainConfig && <Check size={10} className="text-studio-dark font-bold" />}
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-xs font-semibold">Custom DNS & Domain Setup</span>
                  <span className="font-mono text-[9px] text-studio-cream/50">+₹500 // Mapping & email routing</span>
                </div>
              </button>

              {/* E-Commerce (Bespoke Add-on) */}
              <button
                onClick={() => setEcommerce(!ecommerce)}
                className={`flex items-start space-x-3.5 p-4 rounded-xl border text-left cursor-pointer sm:col-span-2 transition-colors ${ecommerce ? 'border-studio-gold bg-studio-gold/5 text-studio-cream' : 'border-white/10 hover:border-white/25 text-studio-cream/70'}`}
              >
                <div className={`w-4 h-4 rounded border mt-0.5 flex items-center justify-center shrink-0 ${ecommerce ? 'border-studio-gold bg-studio-gold' : 'border-white/30'}`}>
                  {ecommerce && <Check size={10} className="text-studio-dark font-bold" />}
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-xs font-semibold flex items-center space-x-1.5">
                    <span>E-Commerce Curation & Setup</span>
                    <span className="font-mono text-[8px] bg-studio-gold/20 text-studio-gold uppercase px-1.5 py-0.5 rounded tracking-wide">HIGH COMMISSION</span>
                  </span>
                  <span className="font-mono text-[9px] text-studio-cream/50">+₹5,000 // Digital checkout, secure payments, inventory system, and product catalog</span>
                </div>
              </button>
            </div>
          </div>

          {/* Sizing Quote Totalizer Card */}
          <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col space-y-6">
            <span className="font-mono text-[10px] tracking-wider text-studio-gold uppercase font-bold text-center border-b border-white/5 pb-4">
              SURCHARGE & TIMELINE RECEIPT
            </span>

            <div className="flex flex-col space-y-3 font-mono text-[11px] text-studio-cream/60">
              <div className="flex justify-between">
                <span>STUDIO BASE LAYOUT:</span>
                <span className="text-studio-cream font-medium">₹{BASE_PRICE.toLocaleString('en-IN')}</span>
              </div>
              
              {pages > 1 && (
                <div className="flex justify-between">
                  <span>PAGES SURCHARGE ({pages - 1} extra):</span>
                  <span className="text-studio-cream font-medium">+₹{((pages - 1) * PRICE_PER_PAGE).toLocaleString('en-IN')}</span>
                </div>
              )}
              
              {options.customCopy && (
                <div className="flex justify-between">
                  <span>BRAND VOICE COPYWRITING:</span>
                  <span className="text-studio-cream font-medium">+₹{PRICE_COPY.toLocaleString('en-IN')}</span>
                </div>
              )}
              
              {options.seoSetup && (
                <div className="flex justify-between">
                  <span>ADVANCED SEO AUDIT:</span>
                  <span className="text-studio-cream font-medium">+₹{PRICE_SEO.toLocaleString('en-IN')}</span>
                </div>
              )}
              
              {options.prioritySupport && (
                <div className="flex justify-between">
                  <span>PRIORITY 30-DAY CARE:</span>
                  <span className="text-studio-cream font-medium">+₹{PRICE_SUPPORT.toLocaleString('en-IN')}</span>
                </div>
              )}
              
              {options.domainConfig && (
                <div className="flex justify-between">
                  <span>DNS & CUSTOM DOMAIN MAP:</span>
                  <span className="text-studio-cream font-medium">+₹{PRICE_DOMAIN.toLocaleString('en-IN')}</span>
                </div>
              )}

              {ecommerce && (
                <div className="flex justify-between">
                  <span>E-COMMERCE CHECKOUT BUILD:</span>
                  <span className="text-studio-cream font-medium">+₹{PRICE_ECOMMERCE.toLocaleString('en-IN')}</span>
                </div>
              )}
            </div>

            <div className="border-t border-white/10 pt-4 flex items-baseline justify-between">
              <span className="font-serif text-base text-studio-cream font-bold">Estimated Quote:</span>
              <div className="overflow-hidden">
                <motion.span
                  key={currentTotal}
                  initial={{ opacity: 0.7, scale: 0.9, y: 5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 350, damping: 14 }}
                  className="font-serif text-3xl font-black text-studio-gold block"
                >
                  ₹{currentTotal.toLocaleString('en-IN')}
                </motion.span>
              </div>
            </div>

            <div className="flex items-start space-x-2 bg-studio-gold/10 text-studio-gold p-3 rounded-lg text-xs font-light">
              <Info size={14} className="shrink-0 mt-0.5" />
              <span>Includes complete responsive visual audits and domain hosting direction.</span>
            </div>

            <button
              onClick={handleInquireCustom}
              className="w-full bg-studio-gold text-studio-dark hover:bg-studio-cream hover:text-studio-dark font-sans text-xs font-bold uppercase tracking-wider py-4 rounded-lg cursor-pointer transition-colors text-center flex items-center justify-center space-x-2"
            >
              <span>Submit Custom Dossier Sizing</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
