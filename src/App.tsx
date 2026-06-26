import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import ServicesView from './components/ServicesView';
import PortfolioView from './components/PortfolioView';
import { ActiveView, PortfolioItem, PricingPackage, Inquiry } from './types';
import { Check, X, FileText, Send, Calendar, Clock, Inbox, Sparkles, MessageCircle } from 'lucide-react';

// Static Portfolio Data
const portfolioData: PortfolioItem[] = [
  {
    id: '01',
    title: 'Artisan Café',
    client: 'Concept Website Blueprint',
    category: 'Culinary',
    year: 'Demo Concept',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
    description: 'A warm, tactile, type-focused digital brochure for local cafés & bakeries.',
    brandStory: 'This concept website mimics the warm physical atmosphere of an artisanal café—complete with rising dough macro-photography, a dynamic daily baking schedule, and an integrated, frictionless table reservation engine. Perfect for bringing Gandhi Nagar or Channi Himmat cafés online to drive foot traffic.',
    colorPalette: ['#F7F3EE', '#4E3C30', '#B58A63', '#2C2723'],
    features: ['Live daily baking countdown schedule', 'Tactile interactive specialty menu', 'Direct WhatsApp online ordering module', 'Google Maps localized local SEO mapping'],
    typography: 'Playfair Display + Inter'
  },
  {
    id: '02',
    title: 'Luxe Salon',
    client: 'Concept Website Blueprint',
    category: 'Boutique',
    year: 'Demo Concept',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80',
    description: 'An elegant, luxury-focused portfolio layout designed for premium salons & spas.',
    brandStory: 'Designed for high-end styling salons, spas, and personal wellness clinics. This layout focuses on high-fidelity visual catalogs of styling works, clean pricing lists with smooth tab structures, and a direct digital booking desk that eliminates booking friction and increases trust.',
    colorPalette: ['#FAF8F5', '#8C9A86', '#D1C2B4', '#3E3C3A'],
    features: ['Service price breakdown interactive lists', 'Stylist specialty grids & bio slots', 'Calming beauty treatment consultation form', '100% mobile-optimized booking journey'],
    typography: 'Cormorant Garamond + Inter'
  },
  {
    id: '03',
    title: 'Elite Fitness Studio',
    client: 'Concept Website Blueprint',
    category: 'Fitness',
    year: 'Demo Concept',
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1200&q=80',
    description: 'A dark, energetic, high-contrast portal designed for modern gyms & fitness centers.',
    brandStory: 'A bold, high-contrast, technical grid built to elevate gym brands and yoga/fitness studios. Includes structured pricing tables, interactive membership package customizers, weekly live timetables, and direct contact CTAs.',
    colorPalette: ['#111111', '#FFFFFF', '#8C8C8C', '#2A2A2A'],
    features: ['Interactive membership plan matrices', 'Weekly class schedule timetable layout', 'Client transformations testimonial slider', 'Calorie & training goal target estimators'],
    typography: 'JetBrains Mono + Space Grotesk'
  }
];

// Static Pricing Data
const pricingPackages: PricingPackage[] = [
  {
    id: 'showcase',
    name: 'Starter',
    price: 4999,
    subtitle: 'IDEAL FOR CAFES, SALONS, & LOCAL BRANDS',
    description: 'A pristine, premium single-page or 3-page website layout designed to showcase your core services and establish digital authority in Jammu.',
    deliverables: [
      'Stunning 1 to 3 Page bespoke design',
      'Original copywriting and visual theme direction',
      'Fully responsive mobile-first architecture',
      'Google Maps & Google Business listing setup',
      'Frictionless contact/inquiry form with local logging',
      'Free high-contrast domain configuration guide'
    ],
    timeline: '3 - 7 DAYS'
  },
  {
    id: 'editorial',
    name: 'Business',
    price: 9999,
    subtitle: 'THE ULTIMATE LOCAL BRAND ACCELERATOR',
    description: 'A full-scale, multi-page brand experience showcasing rich services, reviews, and interactive consultation tools to double your client inquiries.',
    deliverables: [
      'Comprehensive Multi-Page architecture (up to 8 pages)',
      'Beautiful portfolio grids & category filters',
      'Full brand voice visual copywriting direction',
      'Advanced Jammu SEO & local map ranking setup',
      'Interactive appointment reservation form',
      'Direct WhatsApp chat integration',
      '30 days of free direct post-launch support & updates'
    ],
    timeline: '1 WEEK',
    badge: 'MOST POPULAR ⭐'
  },
  {
    id: 'bespoke',
    name: 'Premium',
    price: 19999,
    subtitle: 'FOR DYNAMIC E-COMMERCE & CLIENT PORTALS',
    description: 'A robust, custom-engineered platform supporting secure e-commerce checkout, catalogs, or custom reservation pipelines for advanced businesses.',
    deliverables: [
      'Bespoke high-fidelity digital application layout',
      'Secure e-commerce digital catalog and cart setup',
      'Integrated payment gateways (Stripe, UPI, or Razorpay)',
      'Dynamic inventory or custom booking slots',
      'Unlimited sub-pages and full creative control',
      '60 days of premium direct technical maintenance'
    ],
    timeline: '1 - 2 WEEKS'
  }
];

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState<PortfolioItem | null>(null);
  
  // Inquiry Registry list (persisted client side)
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  
  // Interactive Modal controls
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [isRegistryOpen, setIsRegistryOpen] = useState(false);
  
  // Form values inside General Modal
  const [modalFormData, setModalFormData] = useState({
    name: '',
    email: '',
    businessName: '',
    description: '',
    budget: 'Free Concept Demo',
  });
  const [modalSubmitting, setModalSubmitting] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);

  // Load inquiries from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('tanmay_studio_inquiries');
    if (saved) {
      try {
        setInquiries(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse inquiries', e);
      }
    }
  }, []);

  // Save inquiries to localStorage
  const saveInquiries = (updated: Inquiry[]) => {
    setInquiries(updated);
    localStorage.setItem('tanmay_studio_inquiries', JSON.stringify(updated));
  };

  // Callback to handle a new inquiry submission
  const handleNewInquiry = (data: { name: string; email: string; businessName: string; description: string; budget: string }) => {
    const newInquiry: Inquiry = {
      id: Math.random().toString(36).substring(2, 7).toUpperCase(),
      name: data.name,
      email: data.email,
      businessName: data.businessName || 'Independent Creator / Private Client',
      projectDescription: data.description || 'No description supplied.',
      budgetEstimate: data.budget,
      submittedAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }) + ' IST',
      status: 'new'
    };
    const updated = [newInquiry, ...inquiries];
    saveInquiries(updated);
  };

  // Inquire from Portfolio Case Study aesthetic selection
  const handleInquireFromPortfolio = (projectName: string) => {
    setModalFormData({
      name: '',
      email: '',
      businessName: '',
      description: `We seek a website concept inspired by the visual language of the "${projectName}" case study.`,
      budget: 'Free Concept Demo',
    });
    setIsInquiryModalOpen(true);
  };

  // Inquire from Pricing selection
  const handleInquireFromPricing = (packageName: string) => {
    setModalFormData({
      name: '',
      email: '',
      businessName: '',
      description: `Inquiry regarding the "${packageName}" custom service blueprint.`,
      budget: 'Free Concept Demo',
    });
    setIsInquiryModalOpen(true);
  };

  // Handle Modal Submit
  const handleModalSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!modalFormData.name || !modalFormData.email) return;

    setModalSubmitting(true);
    setTimeout(() => {
      handleNewInquiry({
        name: modalFormData.name,
        email: modalFormData.email,
        businessName: modalFormData.businessName,
        description: modalFormData.description,
        budget: modalFormData.budget,
      });
      setModalSubmitting(false);
      setModalSuccess(true);
      
      // Clear and reset modal form
      setTimeout(() => {
        setModalSuccess(false);
        setIsInquiryModalOpen(false);
        setModalFormData({
          name: '',
          email: '',
          businessName: '',
          description: '',
          budget: 'Free Concept Demo',
        });
      }, 3500);
    }, 1200);
  };

  // Mark inquiry as reviewed
  const handleReviewInquiry = (id: string) => {
    const updated = inquiries.map(inq => 
      inq.id === id ? { ...inq, status: 'reviewed' as const } : inq
    );
    saveInquiries(updated);
  };

  // Delete an inquiry
  const handleDeleteInquiry = (id: string) => {
    const updated = inquiries.filter(inq => inq.id !== id);
    saveInquiries(updated);
  };

  return (
    <div className="min-h-screen bg-studio-cream text-studio-dark font-sans flex flex-col selection:bg-studio-accent/20 selection:text-studio-dark">
      {/* Editorial Navigation Header */}
      <Header 
        activeView={activeView} 
        setActiveView={(view) => {
          setActiveView(view);
          setSelectedPortfolioItem(null);
        }} 
        openInquiryForm={() => {
          setModalFormData({
            name: '',
            email: '',
            businessName: '',
            description: '',
            budget: 'Free Concept Demo',
          });
          setIsInquiryModalOpen(true);
        }}
      />

      {/* Main Display Container with custom animation layouts */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {activeView === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <HomeView 
                setActiveView={setActiveView} 
                onInquirySubmit={handleNewInquiry}
                featuredWorks={portfolioData.slice(0, 2)}
                onSelectPortfolioItem={(item) => {
                  setSelectedPortfolioItem(item);
                  setActiveView('portfolio');
                }}
              />
            </motion.div>
          )}

          {activeView === 'services' && (
            <motion.div
              key="services"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <ServicesView 
                packages={pricingPackages}
                onSelectPackage={handleInquireFromPricing}
              />
            </motion.div>
          )}

          {activeView === 'portfolio' && (
            <motion.div
              key="portfolio"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <PortfolioView 
                portfolioItems={portfolioData}
                selectedItem={selectedPortfolioItem}
                setSelectedItem={setSelectedPortfolioItem}
                openInquiryFormWithContext={handleInquireFromPortfolio}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Persistent floating trigger for Local Inquiry Registry */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsRegistryOpen(true)}
          className="relative flex items-center space-x-2 bg-[#1C1815] text-studio-gold border border-studio-accent/20 px-4 py-3 rounded-full shadow-lg cursor-pointer hover:bg-studio-dark transition-colors"
          title="Open Submitted Inquiries Registry"
        >
          <Inbox size={16} />
          <span className="font-mono text-[10px] tracking-wider uppercase font-bold">Registry</span>
          {inquiries.filter(i => i.status === 'new').length > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-studio-gold text-studio-dark font-mono text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
              {inquiries.filter(i => i.status === 'new').length}
            </span>
          )}
        </motion.button>
      </div>

      {/* General Partnership Inquiry Overlay Modal */}
      <AnimatePresence>
        {isInquiryModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-studio-dark/70 backdrop-blur-md p-4 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.96, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 20 }}
              className="bg-studio-cream text-studio-dark rounded-2xl border border-studio-accent/20 p-6 md:p-10 max-w-lg w-full relative shadow-2xl"
            >
              <button
                onClick={() => setIsInquiryModalOpen(false)}
                className="absolute top-4 right-4 bg-studio-dark/5 hover:bg-studio-dark text-studio-dark hover:text-studio-cream p-1 rounded-full transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              {modalSuccess ? (
                <div className="text-center py-8 flex flex-col items-center justify-center space-y-4">
                  <div className="w-12 h-12 bg-studio-gold/10 text-studio-gold border border-studio-gold/30 rounded-full flex items-center justify-center">
                    <Check size={24} />
                  </div>
                  <h3 className="font-serif text-xl font-bold">Briefing Catalogued</h3>
                  <p className="font-sans text-xs text-studio-clay font-light max-w-xs leading-relaxed">
                    We have received your design credentials and logged them locally. The director will coordinate your evaluation dossier immediately.
                  </p>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-studio-accent font-bold pt-2">RESPONSE WITHIN 48 HOURS</span>
                </div>
              ) : (
                <form onSubmit={handleModalSubmit} className="flex flex-col space-y-4">
                  <div className="flex flex-col space-y-1">
                    <span className="font-mono text-[9px] tracking-widest text-studio-accent uppercase font-bold flex items-center space-x-1">
                      <Sparkles size={11} />
                      <span>DIRECT BRAND INQUIRY</span>
                    </span>
                    <h3 className="font-serif text-2xl font-bold">Transcend the Template</h3>
                    <p className="font-sans text-xs text-studio-clay font-light">Provide some baseline details about your physical business and goals.</p>
                  </div>

                  {/* Name input */}
                  <div className="flex flex-col space-y-1">
                    <label htmlFor="modal-name" className="font-mono text-[9px] uppercase tracking-wider text-studio-clay">Your Name *</label>
                    <input
                      type="text"
                      id="modal-name"
                      required
                      value={modalFormData.name}
                      onChange={(e) => setModalFormData(p => ({ ...p, name: e.target.value }))}
                      placeholder="e.g., Charlotte Perriand"
                      className="bg-stone-50 border border-studio-border rounded-lg px-3.5 py-2.5 font-sans text-xs focus:outline-none focus:border-studio-gold"
                    />
                  </div>

                  {/* Email input */}
                  <div className="flex flex-col space-y-1">
                    <label htmlFor="modal-email" className="font-mono text-[9px] uppercase tracking-wider text-studio-clay">Email Address *</label>
                    <input
                      type="email"
                      id="modal-email"
                      required
                      value={modalFormData.email}
                      onChange={(e) => setModalFormData(p => ({ ...p, email: e.target.value }))}
                      placeholder="e.g., cp@architecture-interne.fr"
                      className="bg-stone-50 border border-studio-border rounded-lg px-3.5 py-2.5 font-sans text-xs focus:outline-none focus:border-studio-gold"
                    />
                  </div>

                  {/* Business Name */}
                  <div className="flex flex-col space-y-1">
                    <label htmlFor="modal-business" className="font-mono text-[9px] uppercase tracking-wider text-studio-clay">Business Name & Location</label>
                    <input
                      type="text"
                      id="modal-business"
                      value={modalFormData.businessName}
                      onChange={(e) => setModalFormData(p => ({ ...p, businessName: e.target.value }))}
                      placeholder="e.g., L'Atelier Lumineux, Tokyo"
                      className="bg-stone-50 border border-studio-border rounded-lg px-3.5 py-2.5 font-sans text-xs focus:outline-none focus:border-studio-gold"
                    />
                  </div>

                  {/* Budget Category Hidden/Hardcoded */}

                  {/* Description input */}
                  <div className="flex flex-col space-y-1">
                    <label htmlFor="modal-desc" className="font-mono text-[9px] uppercase tracking-wider text-studio-clay">Project Brief Outline</label>
                    <textarea
                      id="modal-desc"
                      rows={3}
                      value={modalFormData.description}
                      onChange={(e) => setModalFormData(p => ({ ...p, description: e.target.value }))}
                      placeholder="Share a short summary of the vision..."
                      className="bg-stone-50 border border-studio-border rounded-lg px-3.5 py-2.5 font-sans text-xs focus:outline-none focus:border-studio-gold resize-none"
                    />
                  </div>

                  <div className="text-center pt-1">
                    <span className="font-sans text-[10px] text-studio-accent font-medium leading-normal block">
                      🎁 Free demo website available before purchase. No obligation.
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={modalSubmitting}
                    className="w-full bg-studio-dark text-studio-cream hover:bg-studio-accent font-sans text-xs font-bold uppercase tracking-wider py-3.5 rounded-lg cursor-pointer transition-colors flex items-center justify-center space-x-2 mt-2"
                  >
                    {modalSubmitting ? 'Lodging Credentials...' : 'Submit Credentials'}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Local Inquiries Registry Drawer (Admin view to see submissions) */}
      <AnimatePresence>
        {isRegistryOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-studio-dark/50 backdrop-blur-sm flex justify-end"
          >
            {/* Overlay click to close */}
            <div className="absolute inset-0" onClick={() => setIsRegistryOpen(false)}></div>
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35 }}
              className="relative w-full max-w-lg bg-studio-cream h-full border-l border-studio-border-dark flex flex-col shadow-2xl z-10"
            >
              {/* Drawer header */}
              <div className="p-6 border-b border-studio-border flex items-center justify-between">
                <div className="flex items-center space-x-2 text-studio-dark">
                  <FileText size={18} className="text-studio-accent" />
                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] tracking-wider uppercase font-bold">SUBMISSIONS ARCHIVE</span>
                    <span className="font-serif text-sm font-semibold text-studio-clay">{inquiries.length} Active Dossiers Logged</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsRegistryOpen(false)}
                  className="p-1 hover:bg-stone-100 rounded-full cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Drawer Scroll body */}
              <div className="flex-grow overflow-y-auto p-6 space-y-6">
                {inquiries.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-studio-clay py-20">
                    <Inbox size={40} className="stroke-1 text-studio-accent/45" />
                    <div className="flex flex-col space-y-1">
                      <span className="font-serif text-base font-bold text-studio-dark">Registry is Empty</span>
                      <p className="font-sans text-xs text-studio-clay font-light max-w-xs leading-relaxed">
                        No briefing credentials have been submitted yet in this session. Submit the forms on the home or pricing screens to populate this dossier log.
                      </p>
                    </div>
                  </div>
                ) : (
                  inquiries.map((inq) => (
                    <div 
                      key={inq.id}
                      className="bg-white rounded-xl border border-studio-border p-5 flex flex-col space-y-4 shadow-sm hover:shadow transition-shadow"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                          <span className="font-serif text-base font-bold text-studio-dark">{inq.name}</span>
                          <span className="font-sans text-[11px] text-studio-accent font-medium">{inq.email}</span>
                        </div>
                        <span className="font-mono text-[9px] font-bold uppercase px-2 py-0.5 rounded-full bg-studio-cream text-studio-clay">
                          ID: {inq.id}
                        </span>
                      </div>

                      <div className="border-t border-studio-border pt-3 flex flex-col space-y-2 text-xs font-light">
                        <div className="flex justify-between font-mono text-[9px] text-studio-clay">
                          <span>BUSINESS //</span>
                          <span className="text-studio-dark font-semibold">{inq.businessName}</span>
                        </div>
                        <div className="flex justify-between font-mono text-[9px] text-studio-clay">
                          <span>BUDGET SIZE //</span>
                          <span className="text-studio-gold font-bold">{inq.budgetEstimate}</span>
                        </div>
                        <div className="flex justify-between font-mono text-[9px] text-studio-clay">
                          <span>SUBMITTED AT //</span>
                          <span className="text-studio-dark">{inq.submittedAt}</span>
                        </div>
                      </div>

                      <p className="font-sans text-[11px] bg-stone-50 border border-studio-border p-3 rounded-lg text-studio-clay italic font-light leading-relaxed">
                        "{inq.projectDescription}"
                      </p>

                      <div className="flex items-center justify-between pt-2">
                        {inq.status === 'new' ? (
                          <button
                            onClick={() => handleReviewInquiry(inq.id)}
                            className="text-[10px] font-mono uppercase font-bold text-studio-gold hover:text-studio-dark transition-colors flex items-center space-x-1 cursor-pointer"
                          >
                            <Clock size={11} />
                            <span>Mark Reviewed</span>
                          </button>
                        ) : (
                          <span className="text-[10px] font-mono uppercase text-emerald-600 flex items-center space-x-1 font-semibold">
                            <Check size={11} />
                            <span>Reviewed</span>
                          </span>
                        )}
                        
                        <button
                          onClick={() => handleDeleteInquiry(inq.id)}
                          className="text-[10px] font-mono uppercase text-red-600 hover:text-red-800 transition-colors cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp CTA */}
      <motion.a
        href="https://wa.me/917006107969"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white hover:bg-[#20ba56] px-5 py-3.5 rounded-full flex items-center space-x-2.5 shadow-xl border border-white/20 transition-all font-sans text-xs font-bold tracking-wider uppercase cursor-pointer"
        id="floating-whatsapp-btn"
      >
        <MessageCircle size={16} className="fill-current" />
        <span>Chat on WhatsApp</span>
      </motion.a>

      {/* Editorial Navigation Footer */}
      <Footer 
        setActiveView={setActiveView} 
        openInquiryForm={() => {
          setModalFormData({
            name: '',
            email: '',
            businessName: '',
            description: '',
            budget: 'Free Concept Demo',
          });
          setIsInquiryModalOpen(true);
        }}
      />
    </div>
  );
}
