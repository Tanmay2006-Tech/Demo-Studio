import { ActiveView } from '../types';
import { ArrowUp, Instagram, Mail, MapPin, Globe, MessageCircle } from 'lucide-react';

interface FooterProps {
  setActiveView: (view: ActiveView) => void;
  openInquiryForm: () => void;
}

export default function Footer({ setActiveView, openInquiryForm }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-studio-dark text-studio-cream pt-20 pb-12 px-6 md:px-12 border-t border-studio-accent/25">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 pb-16 border-b border-studio-cream/10">
          {/* Studio Description Column */}
          <div className="md:col-span-2 flex flex-col space-y-6">
            <h3 className="font-serif text-2xl font-bold tracking-tight">TANMAY STUDIO</h3>
            <p className="font-sans text-sm text-studio-cream/70 leading-relaxed max-w-md">
              We design and engineer bespoke web experiences for local landmarks, upscale boutiques, and independent creators. Our websites marry classical editorial layouts with high-performance engineering.
            </p>
            <div className="flex items-center space-x-6 text-studio-cream/50 pt-2">
              <a href="mailto:hello@tanmaystudio.in" className="hover:text-studio-gold transition-colors" title="Email us">
                <Mail size={18} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-studio-gold transition-colors" title="Instagram">
                <Instagram size={18} />
              </a>
              <span className="font-mono text-xs tracking-wider flex items-center space-x-1">
                <MapPin size={12} className="text-studio-gold" />
                <span>JAMMU, IN // 32.73° N, 74.86° E</span>
              </span>
            </div>
            
            <div className="pt-2">
              <a 
                href="https://wa.me/917006107969" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center space-x-2 bg-[#25D366] hover:bg-[#20ba56] text-white px-5 py-2.5 rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
              >
                <MessageCircle size={14} className="fill-current" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Navigation Links Column */}
          <div className="flex flex-col space-y-4">
            <span className="font-mono text-[10px] tracking-[0.2em] text-studio-gold uppercase font-bold">DIRECTORY</span>
            <nav className="flex flex-col space-y-2.5 text-sm font-medium text-studio-cream/75">
              <button onClick={() => { setActiveView('home'); scrollToTop(); }} className="text-left hover:text-studio-cream transition-colors cursor-pointer">
                01. The Studio
              </button>
              <button onClick={() => { setActiveView('services'); scrollToTop(); }} className="text-left hover:text-studio-cream transition-colors cursor-pointer">
                02. Services & Pricing
              </button>
              <button onClick={() => { setActiveView('portfolio'); scrollToTop(); }} className="text-left hover:text-studio-cream transition-colors cursor-pointer">
                03. Website Concepts
              </button>
              <button onClick={openInquiryForm} className="text-left hover:text-studio-gold text-studio-gold transition-colors cursor-pointer">
                04. Start Inquiry
              </button>
              <a href="https://wa.me/917006107969" target="_blank" rel="noopener noreferrer" className="text-left text-[#25D366] hover:underline transition-colors flex items-center space-x-1.5 cursor-pointer">
                <span>05. Chat on WhatsApp</span>
              </a>
            </nav>
          </div>

          {/* Capabilities and Focus Column */}
          <div className="flex flex-col space-y-4">
            <span className="font-mono text-[10px] tracking-[0.2em] text-studio-gold uppercase font-bold">CAPABILITIES</span>
            <ul className="flex flex-col space-y-2 text-xs font-mono text-studio-cream/60 uppercase tracking-wider">
              <li>Editorial Design System</li>
              <li>React & NextJS Engineering</li>
              <li>SEO & Search Strategy</li>
              <li>Brand Voice Copywriting</li>
              <li>E-Commerce Curation</li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Metadata and Credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-10 text-xs font-mono text-studio-cream/40">
          <div className="flex flex-col sm:flex-row sm:space-x-6 items-center text-center sm:text-left space-y-2 sm:space-y-0">
            <span>© {new Date().getFullYear()} TANMAY STUDIO. ALL RIGHTS PRESERVED.</span>
            <span className="hidden sm:inline">//</span>
            <span>CRAFTED IN JAMMU FOR RADICAL LOCAL CREATIVES</span>
          </div>
          
          <button
            onClick={scrollToTop}
            className="mt-6 sm:mt-0 flex items-center space-x-1 bg-studio-cream/5 hover:bg-studio-cream/15 hover:text-studio-cream text-studio-cream/60 px-3.5 py-2 rounded-full border border-studio-cream/10 transition-all cursor-pointer group"
          >
            <span>Top of Page</span>
            <ArrowUp size={12} className="group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
