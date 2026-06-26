import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import ServicesView from './components/ServicesView';
import PortfolioView from './components/PortfolioView';
import { ActiveView, PortfolioItem, PricingPackage, Inquiry } from './types';
import { Check, X, FileText, Send, Calendar, Clock, Inbox, Sparkles } from 'lucide-react';

// Static Portfolio Data
const portfolioData: PortfolioItem[] = [
  {
    id: '01',
    title: 'The Hearth',
    client: 'The Hearth Boulangerie',
    category: 'Culinary',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80',
    description: 'A warm, tactile, type-focused digital brochure for an artisanal heritage bakery.',
    brandStory: 'The Hearth has baked wood-fired heritage loaves in Gandhi Nagar, Jammu since 1994. To translate their highly tactile physical atmosphere (burlap bags of flour, rising sourdough, warm brass lighting) into web space, we structured an asymmetrical layout centering large serif typography and detailed food macro-photography. The site features a live baking schedule and custom flour sourcing logs.',
    colorPalette: ['#F7F3EE', '#4E3C30', '#B58A63', '#2C2723'],
    features: ['Live heritage grain sourcing log', 'Dynamic daily sourdough baking schedule', 'Bespoke wholesale inquiry module', 'Optimized localized SEO architecture'],
    typography: 'Playfair Display + Inter'
  },
  {
    id: '02',
    title: 'Atelier Noir',
    client: 'Atelier Noir Architects',
    category: 'Architectural',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    description: 'A dark, high-contrast structural portfolio showcasing upscale residential landmarks.',
    brandStory: 'Atelier Noir is a prestigious architectural studio designing bespoke Brutalist-inspired luxury residences. Their website mimics structural honesty: strict wireframe borders, an ultra-minimal charcoal color field, and an asymmetrical layout that allows their high-contrast, black-and-white architectural photography to stand out. It includes structured visual blueprints and spatial layout diagrams.',
    colorPalette: ['#111111', '#FFFFFF', '#8C8C8C', '#2A2A2A'],
    features: ['Fullscreen staggered blueprint browser', 'High-fidelity project category mapping', 'Detailed structural metrics specs sheet', 'Dynamic team profile slideshow'],
    typography: 'Outfit + Space Grotesk'
  },
  {
    id: '03',
    title: 'L\'Aura',
    client: 'L\'Aura Skin Atelier',
    category: 'Boutique',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=1000&q=80',
    description: 'An airy, delicate, editorial retail concept for botanical skincare treatments.',
    brandStory: 'L\'Aura offers custom, botanical skincare formulations and luxury facial therapy in a calming, off-white oasis. We designed a web experience that feels like a breath of fresh air: generous line heights, slow fade-in interactions, and soft macro shots of botany and textured clays. The site integrates a curated product catalog and a reservation desk for local treatments.',
    colorPalette: ['#FAF8F5', '#8C9A86', '#D1C2B4', '#3E3C3A'],
    features: ['Tactile treatment reservation engine', 'Curated botanical ingredients encyclopedia', 'Interactive skin evaluation questionnaire', 'E-commerce layout with Stripe checkout'],
    typography: 'Cormorant Garamond + Inter'
  },
  {
    id: '04',
    title: 'Scribe & Co',
    client: 'Scribe Independent Literary Agency',
    category: 'Corporate',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1000&q=80',
    description: 'A text-heavy, high-contrast, classical layout representing literary archives.',
    brandStory: 'Scribe & Co represents visionary novelists and historians. Their digital landmark is built as a celebration of the written word. It utilizes high-contrast newspaper typography pairings, physical book jacket frames, and detailed author catalogs. The interface reads like a luxurious publication, emphasizing deep reading margins, tactile letter spacings, and editorial journal entries.',
    colorPalette: ['#FCFAF7', '#1A1917', '#EAE3DA', '#5A544C'],
    features: ['Author biography & manuscript portfolio', 'Classical styled literary review journal', 'Bespoke manuscript submission module', 'Dynamic agent roster directories'],
    typography: 'Lora + Fira Code'
  }
];

// Static Pricing Data
const pricingPackages: PricingPackage[] = [
  {
    id: 'showcase',
    name: 'The Showcase',
    price: 15000,
    subtitle: 'IDEAL FOR BOUTIQUES, CAFES, & CREATIVE STUDIOS',
    description: 'A meticulous, visual-first presentation of your local business, brand narrative, and service list designed to anchor your physical presence on the digital map.',
    deliverables: [
      'Bespoke Single-Page or 3-Page layout',
      'Original editorial copywriting and visual tone',
      '100% mobile-optimized responsive design',
      'Google Maps & basic localized SEO setup',
      'Tactile inquiry/contact form with registry log',
      'Custom DNS and domain configuration guide'
    ],
    timeline: '3 - 4 WEEKS'
  },
  {
    id: 'editorial',
    name: 'The Editorial',
    price: 30000,
    subtitle: 'FOR Upscale ARCHITECTS, PRACTICES, & FIRMS',
    description: 'A full-scale digital archive showcasing rich project histories, author bios, or treatment plans, backed by customizable grids, brand narratives, and CMS journals.',
    deliverables: [
      'Comprehensive Multi-Page architecture (up to 8 pages)',
      'Asymmetrical grid portfolios & category filters',
      'Brand-voice visual copywriting and content direction',
      'Advanced localized SEO & speed index audit',
      'Interactive service calculator or reservation desk',
      'CMS setup for digital journals or project archives',
      '30 days of direct post-launch support & updates'
    ],
    timeline: '5 - 6 WEEKS',
    badge: 'MOST POPULAR'
  },
  {
    id: 'bespoke',
    name: 'Custom Commission',
    price: 50000,
    subtitle: 'FOR DYNAMIC E-COMMERCE & RESERVATIONS',
    description: 'A bespoke commission creating fully dynamic stores, custom reservation pipelines, or highly personalized interactive estimators matching complex workflows.',
    deliverables: [
      'Bespoke high-fidelity digital application layout',
      'Advanced checkout integrations (Stripe, Shopify headless)',
      'Highly interactive product search & material swatches',
      'Dynamic inventory sync & client portal structures',
      'Unlimited pages and complete creative control',
      '60 days of direct premium post-launch maintenance'
    ],
    timeline: '8+ WEEKS'
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
    budget: '₹5,000 - ₹15,000',
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
      budget: '₹15,000 - ₹35,000',
    });
    setIsInquiryModalOpen(true);
  };

  // Inquire from Pricing selection
  const handleInquireFromPricing = (packageName: string, estimatedPrice: number) => {
    setModalFormData({
      name: '',
      email: '',
      businessName: '',
      description: `Inquiry regarding the "${packageName}" configuration. Sizing estimate: ₹${estimatedPrice.toLocaleString('en-IN')}.`,
      budget: estimatedPrice < 20000 
        ? '₹5,000 - ₹15,000' 
        : estimatedPrice < 40000 
          ? '₹15,000 - ₹35,000' 
          : '₹35,000 - ₹50,000+',
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
          budget: '₹5,000 - ₹15,000',
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
            budget: '₹5,000 - ₹15,000',
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

                  {/* Pricing Category */}
                  <div className="flex flex-col space-y-1">
                    <label htmlFor="modal-budget" className="font-mono text-[9px] uppercase tracking-wider text-studio-clay">Budget Target Sizing</label>
                    <select
                      id="modal-budget"
                      value={modalFormData.budget}
                      onChange={(e) => setModalFormData(p => ({ ...p, budget: e.target.value }))}
                      className="bg-stone-50 border border-studio-border rounded-lg px-3.5 py-2.5 font-sans text-xs focus:outline-none focus:border-studio-gold cursor-pointer"
                    >
                      <option value="₹5,000 - ₹15,000">₹5,000 — ₹15,000 (The Showcase Studio Website)</option>
                      <option value="₹15,000 - ₹35,000">₹15,000 — ₹35,000 (The Editorial Brand Experience)</option>
                      <option value="₹35,000 - ₹50,000+">₹35,000 — ₹50,000+ (Custom Commission / E-Commerce)</option>
                    </select>
                  </div>

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

      {/* Editorial Navigation Footer */}
      <Footer 
        setActiveView={setActiveView} 
        openInquiryForm={() => {
          setModalFormData({
            name: '',
            email: '',
            businessName: '',
            description: '',
            budget: '₹5,000 - ₹15,000',
          });
          setIsInquiryModalOpen(true);
        }}
      />
    </div>
  );
}
