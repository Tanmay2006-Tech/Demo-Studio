import { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'motion/react';
import { ActiveView, PortfolioItem } from '../types';
import { ArrowUpRight, ArrowRight, BookOpen, Star, Sparkles, CheckCircle2 } from 'lucide-react';

interface HomeViewProps {
  setActiveView: (view: ActiveView) => void;
  onInquirySubmit: (data: { name: string; email: string; businessName: string; description: string; budget: string }) => void;
  featuredWorks: PortfolioItem[];
  onSelectPortfolioItem: (item: PortfolioItem) => void;
}

export default function HomeView({ setActiveView, onInquirySubmit, featuredWorks, onSelectPortfolioItem }: HomeViewProps) {
  // Inquiry form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessName: '',
    description: '',
    budget: '₹5,000 - ₹15,000',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      onInquirySubmit(formData);
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        businessName: '',
        description: '',
        budget: '₹5,000 - ₹15,000',
      });
      // reset success state after 5 seconds
      setTimeout(() => setSubmitted(false), 8000);
    }, 1200);
  };

  const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.05,
      }
    }
  };

  const heroItemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 16,
      }
    }
  };

  const imageFrameVariants = {
    hidden: { opacity: 0, scale: 0.97, y: 15 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 15,
        delay: 0.35,
      }
    }
  };

  return (
    <div className="flex flex-col space-y-24 md:space-y-36 pb-24">
      {/* 1. Hero Section */}
      <section className="relative px-6 md:px-12 pt-16 md:pt-24 max-w-7xl mx-auto w-full">
        <motion.div 
          variants={heroContainerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <motion.span 
              variants={heroItemVariants}
              className="font-mono text-xs text-studio-accent uppercase tracking-[0.2em] font-medium flex items-center space-x-2"
            >
              <span>01 // INTRODUCTION</span>
            </motion.span>
            
            <motion.h1 
              variants={heroItemVariants}
              className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-studio-dark leading-[1.1] max-w-2xl"
            >
              We craft digital spaces for local landmarks & modern artisans.
            </motion.h1>
            
            <motion.p 
              variants={heroItemVariants}
              className="font-sans text-base md:text-lg text-studio-clay font-light leading-relaxed max-w-xl"
            >
              Premium, tailor-made web design for independent boutiques, culinary venues, architectural practices, and design agencies. We make websites that mirror the tangible qualities of your real-world presence.
            </motion.p>
            
            <motion.div 
              variants={heroItemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 pt-4"
            >
              <button
                onClick={() => {
                  const element = document.getElementById('inquiry-section');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-studio-dark text-studio-cream hover:bg-studio-accent font-sans text-sm font-semibold tracking-wide uppercase px-8 py-4 rounded-full flex items-center justify-center space-x-2 shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 duration-300 cursor-pointer"
              >
                <span>Initiate Briefing</span>
                <ArrowRight size={16} />
              </button>
              
              <button
                onClick={() => setActiveView('portfolio')}
                className="font-sans text-sm font-semibold tracking-wide text-studio-dark hover:text-studio-accent uppercase inline-flex items-center justify-center space-x-1 border-b border-studio-dark hover:border-studio-accent pb-1 transition-all cursor-pointer"
              >
                <span>View Selected Works</span>
                <ArrowUpRight size={16} />
              </button>
            </motion.div>
          </div>

          <motion.div 
            variants={imageFrameVariants}
            className="lg:col-span-5 relative"
          >
            {/* Elegant editorial double-frame image */}
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-stone-200 shadow-xl border border-studio-border">
              <img
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
                alt="Studio Desk Atmosphere"
                className="w-full h-full object-cover grayscale-[10%] hover:scale-[1.03] transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-studio-dark/5 pointer-events-none"></div>
            </div>
            
            {/* Hanging caption element */}
            <div className="absolute -bottom-6 -left-6 bg-studio-cream border border-studio-border-dark p-4 rounded-lg shadow-lg max-w-xs hidden sm:block">
              <p className="font-serif text-sm italic text-studio-dark">
                "Design is not what we apply to a surface; it is the skeleton we reveal."
              </p>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-studio-border text-[9px] font-mono tracking-wider uppercase text-studio-clay">
                <span>EDITORIAL VOL. 04</span>
                <span>EST. 2026</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. Philosophy / Value Proposition Section */}
      <section className="bg-[#FAF8F5] border-y border-studio-border py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col space-y-4 mb-16"
          >
            <span className="font-mono text-xs text-studio-accent uppercase tracking-[0.2em] font-medium">
              02 // PHILOSOPHY
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-studio-dark max-w-xl">
              An artisan approach to web architecture.
            </h2>
          </motion.div>

          <motion.div 
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                }
              }
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
          >
            {/* Philosophy Item 1 */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70, damping: 15 } }
              }}
              whileHover={{ y: -6 }}
              className="flex flex-col space-y-4 p-6 rounded-2xl border border-transparent hover:border-studio-border hover:bg-white transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full border border-studio-accent/20 bg-studio-cream flex items-center justify-center text-studio-accent font-mono text-sm font-semibold shadow-sm">
                I
              </div>
              <h3 className="font-serif text-xl font-semibold text-studio-dark">Deliberate Aesthetics</h3>
              <p className="font-sans text-sm text-studio-clay font-light leading-relaxed">
                We avoid template layouts, fast-fashion gradients, and heavy javascript libraries. Every layout is custom-drawn with generous whitespace, delicate grid lines, and structured editorial proportions.
              </p>
            </motion.div>

            {/* Philosophy Item 2 */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70, damping: 15 } }
              }}
              whileHover={{ y: -6 }}
              className="flex flex-col space-y-4 p-6 rounded-2xl border border-transparent hover:border-studio-border hover:bg-white transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full border border-studio-accent/20 bg-studio-cream flex items-center justify-center text-studio-accent font-mono text-sm font-semibold shadow-sm">
                II
              </div>
              <h3 className="font-serif text-xl font-semibold text-studio-dark">Physical Presence</h3>
              <p className="font-sans text-sm text-studio-clay font-light leading-relaxed">
                A digital presence shouldn’t feel like virtual space—it should convey materials. We integrate tactile photographic frames, organic off-white tones, and steady, structural layouts that anchor your real-world authority.
              </p>
            </motion.div>

            {/* Philosophy Item 3 */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70, damping: 15 } }
              }}
              whileHover={{ y: -6 }}
              className="flex flex-col space-y-4 p-6 rounded-2xl border border-transparent hover:border-studio-border hover:bg-white transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full border border-studio-accent/20 bg-studio-cream flex items-center justify-center text-studio-accent font-mono text-sm font-semibold shadow-sm">
                III
              </div>
              <h3 className="font-serif text-xl font-semibold text-studio-dark">Technical Permanence</h3>
              <p className="font-sans text-sm text-studio-clay font-light leading-relaxed">
                We design with high-performance frameworks, optimized SEO structures, and clean, standards-compliant CSS. Your website is an asset designed to work seamlessly for years, not a temporary marketing placeholder.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. Featured Works Section */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col space-y-4"
          >
            <span className="font-mono text-xs text-studio-accent uppercase tracking-[0.2em] font-medium">
              03 // THE ARCHIVE HIGHLIGHTS
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-studio-dark">
              Selected Digital Formats
            </h2>
          </motion.div>
          
          <button
            onClick={() => setActiveView('portfolio')}
            className="mt-4 sm:mt-0 font-sans text-xs font-bold tracking-wide text-studio-accent hover:text-studio-dark uppercase flex items-center space-x-1.5 border-b border-studio-accent hover:border-studio-dark pb-1 cursor-pointer transition-colors"
          >
            <span>See entire library</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Feature Staggered Portfolio Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {featuredWorks.map((item, index) => (
            <motion.div 
              key={item.id} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              className={`flex flex-col space-y-6 group cursor-pointer ${index % 2 === 1 ? 'md:pt-16' : ''}`}
              onClick={() => onSelectPortfolioItem(item)}
            >
              {/* Image Frame */}
              <div className="relative aspect-[3/2] rounded-xl overflow-hidden bg-stone-100 border border-studio-border shadow-md group-hover:shadow-lg transition-all duration-500">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 font-mono text-[9px] tracking-widest bg-studio-dark text-studio-cream px-2.5 py-1 rounded-full uppercase">
                  {item.category}
                </div>
              </div>
              
              {/* Caption details */}
              <div className="flex flex-col space-y-2 border-b border-studio-border pb-4">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-serif text-xl font-bold text-studio-dark group-hover:text-studio-accent transition-colors">
                    {item.title}
                  </h3>
                  <span className="font-mono text-xs text-studio-clay">{item.year}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-studio-clay font-light">
                  <span>{item.client}</span>
                  <span className="font-mono text-[10px] uppercase text-studio-accent flex items-center space-x-1 font-semibold group-hover:translate-x-1 transition-transform">
                    <span>Explore details</span>
                    <ArrowRight size={10} />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Let's Bring Your Business Online (Form Section) */}
      <section id="inquiry-section" className="relative px-6 md:px-12 pt-12 max-w-5xl mx-auto w-full">
        <div className="bg-[#1C1815] text-studio-cream rounded-3xl p-8 md:p-16 border border-studio-accent/20 relative overflow-hidden shadow-2xl">
          {/* Subtle background decoration */}
          <div className="absolute -top-36 -right-36 w-72 h-72 rounded-full bg-studio-accent/5 blur-3xl pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
            {/* Form Intro Column */}
            <div className="lg:col-span-5 flex flex-col space-y-6">
              <span className="font-mono text-[10px] tracking-[0.25em] text-studio-gold uppercase font-bold flex items-center space-x-1.5">
                <Sparkles size={12} />
                <span>PARTNERSHIP / BRIEFING</span>
              </span>
              
              <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-studio-cream leading-tight">
                Let's bring your business online.
              </h2>
              
              <p className="font-sans text-sm text-studio-cream/70 leading-relaxed font-light">
                Ready to transcend standard templates? Send us a short brief about your project, your brand story, and your timeline. We will review it and coordinate a 20-minute digital consultation within 48 business hours.
              </p>
              
              <div className="pt-6 border-t border-studio-cream/10 flex flex-col space-y-4 text-xs font-mono text-studio-cream/50">
                <div className="flex items-center space-x-2">
                  <Star size={12} className="text-studio-gold" />
                  <span>Bespoke craftsmanship, zero boilerplate</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star size={12} className="text-studio-gold" />
                  <span>Transparent cost structure</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star size={12} className="text-studio-gold" />
                  <span>Direct contact with senior director</span>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-7">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-studio-accent/10 border border-studio-gold/25 p-8 rounded-2xl flex flex-col items-center justify-center text-center space-y-4 h-full"
                >
                  <CheckCircle2 size={48} className="text-studio-gold" />
                  <h3 className="font-serif text-xl font-bold text-studio-cream">Briefing Lodged Successfully</h3>
                  <p className="font-sans text-xs text-studio-cream/80 max-w-sm leading-relaxed font-light">
                    Thank you. Your dossier has been logged into our local registry. We will evaluate your business requirements and email you back to arrange a digital meeting.
                  </p>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-studio-gold pt-2">
                    Evaluation Pending // Response in 48h
                  </span>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Your Name */}
                    <div className="flex flex-col space-y-1.5">
                      <label htmlFor="name" className="font-mono text-[10px] uppercase tracking-wider text-studio-cream/60">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g., Jean-Luc Godard"
                        className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 font-sans text-sm text-studio-cream placeholder:text-stone-600 focus:outline-none focus:border-studio-gold transition-colors focus:ring-1 focus:ring-studio-gold"
                      />
                    </div>

                    {/* Email Address */}
                    <div className="flex flex-col space-y-1.5">
                      <label htmlFor="email" className="font-mono text-[10px] uppercase tracking-wider text-studio-cream/60">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g., jl@boutiquecinema.fr"
                        className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 font-sans text-sm text-studio-cream placeholder:text-stone-600 focus:outline-none focus:border-studio-gold transition-colors focus:ring-1 focus:ring-studio-gold"
                      />
                    </div>
                  </div>

                  {/* Business Name */}
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="businessName" className="font-mono text-[10px] uppercase tracking-wider text-studio-cream/60">
                      Business Name & Location
                    </label>
                    <input
                      type="text"
                      id="businessName"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      placeholder="e.g., L'Etoile Boulangerie, Gandhi Nagar, Jammu"
                      className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 font-sans text-sm text-studio-cream placeholder:text-stone-600 focus:outline-none focus:border-studio-gold transition-colors focus:ring-1 focus:ring-studio-gold"
                    />
                  </div>

                  {/* Budget Estimate */}
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="budget" className="font-mono text-[10px] uppercase tracking-wider text-studio-cream/60">
                      Project Budget Estimate
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="bg-[#2B2521] border border-white/10 rounded-lg px-4 py-3 font-sans text-sm text-studio-cream focus:outline-none focus:border-studio-gold transition-colors cursor-pointer"
                    >
                      <option value="₹5,000 - ₹15,000">₹5,000 - ₹15,000 (The Showcase Studio Website)</option>
                      <option value="₹15,000 - ₹35,000">₹15,000 - ₹35,000 (The Editorial Brand Experience)</option>
                      <option value="₹35,000 - ₹50,000+">₹35,000 - ₹50,000+ (Custom Commission / E-Commerce)</option>
                    </select>
                  </div>

                  {/* Tell me about your business */}
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="description" className="font-mono text-[10px] uppercase tracking-wider text-studio-cream/60">
                      Tell us about your business & goals
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Provide some details on what your business represents and the kind of digital feel you seek to co-create..."
                      className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 font-sans text-sm text-studio-cream placeholder:text-stone-600 focus:outline-none focus:border-studio-gold transition-colors resize-none focus:ring-1 focus:ring-studio-gold"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-studio-gold text-studio-dark hover:bg-studio-cream hover:text-studio-dark font-sans text-xs font-bold uppercase tracking-wider py-4 rounded-lg transition-colors cursor-pointer flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center space-x-2">
                        <svg className="animate-spin h-4 w-4 text-studio-dark" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Lodging Dossier...</span>
                      </span>
                    ) : (
                      <span>Submit Project Briefing</span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
