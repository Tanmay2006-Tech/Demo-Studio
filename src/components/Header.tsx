import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ActiveView } from '../types';
import { ArrowRight, Menu, X, MessageCircle } from 'lucide-react';

interface HeaderProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  openInquiryForm: () => void;
}

export default function Header({ activeView, setActiveView, openInquiryForm }: HeaderProps) {
  const [localTime, setLocalTime] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      const formatter = new Intl.DateTimeFormat('en-US', options);
      setLocalTime(formatter.format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: 'home' as ActiveView, label: 'The Studio', index: '01' },
    { id: 'services' as ActiveView, label: 'Services', index: '02' },
    { id: 'portfolio' as ActiveView, label: 'Website Concepts', index: '03' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-studio-cream/95 backdrop-blur-md border-b border-studio-border px-6 py-4 md:px-12">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and Studio identity */}
        <div className="flex flex-col cursor-pointer" onClick={() => { setActiveView('home'); setMobileMenuOpen(false); }}>
          <span className="font-serif text-xl md:text-2xl font-bold tracking-tight text-studio-dark">
            TANMAY STUDIO
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-studio-clay">
            EDITORIAL WEB DESIGN
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className="group relative px-4 py-2 flex items-baseline space-x-1 font-sans text-sm font-medium transition-all duration-300 rounded-full"
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavigationPill"
                    className="absolute inset-0 bg-studio-dark/5 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="font-mono text-[10px] text-studio-accent/70 group-hover:text-studio-accent font-light">
                  {item.index}.
                </span>
                <span className={`text-studio-dark group-hover:text-studio-accent transition-colors ${isActive ? 'font-semibold text-studio-accent' : ''}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Studio Info, Local Time and Call to Action */}
        <div className="hidden lg:flex items-center space-x-8">
          <div className="flex flex-col text-right font-mono text-[10px] tracking-wider text-studio-clay">
            <span>STUDIO / JAMMU, IN</span>
            <span className="text-studio-dark font-medium">{localTime} IST</span>
          </div>
          
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="https://wa.me/917006107969"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 border border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 px-5 py-2.5 rounded-full font-sans text-xs font-semibold tracking-wide uppercase transition-all cursor-pointer"
          >
            <MessageCircle size={14} className="fill-current" />
            <span>Chat on WhatsApp</span>
          </motion.a>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={openInquiryForm}
            className="flex items-center space-x-2 bg-studio-dark hover:bg-studio-accent text-studio-cream px-5 py-2.5 rounded-full font-sans text-xs font-semibold tracking-wide uppercase shadow-sm transition-colors cursor-pointer"
          >
            <span>Start Inquiry</span>
            <ArrowRight size={14} className="text-studio-cream" />
          </motion.button>
        </div>

        {/* Mobile menu and CTA triggers */}
        <div className="flex items-center md:hidden space-x-4">
          <button
            onClick={openInquiryForm}
            className="bg-studio-dark text-studio-cream px-4 py-2 rounded-full font-sans text-[11px] font-semibold uppercase tracking-wide cursor-pointer"
          >
            Inquire
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-studio-dark p-1 cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-full left-0 w-full bg-studio-cream border-b border-studio-border-dark px-6 py-8 flex flex-col space-y-6 md:hidden shadow-lg z-50"
        >
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveView(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-baseline space-x-2 font-serif text-xl text-left py-2 border-b border-studio-border/50 ${activeView === item.id ? 'text-studio-accent font-semibold' : 'text-studio-dark'}`}
              >
                <span className="font-mono text-xs text-studio-accent/70 font-light">
                  {item.index} //
                </span>
                <span>{item.label}</span>
              </button>
            ))}

            {/* Mobile WhatsApp Button */}
            <a
              href="https://wa.me/917006107969"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 bg-[#25D366] text-white py-3.5 rounded-lg font-sans text-xs font-bold uppercase tracking-wider shadow-sm transition-colors mt-2"
            >
              <MessageCircle size={14} className="fill-current" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
          
          <div className="flex items-center justify-between pt-4 font-mono text-[10px] text-studio-clay">
            <div className="flex flex-col">
              <span>STUDIO / JAMMU, IN</span>
              <span className="text-studio-dark font-medium">{localTime} IST</span>
            </div>
            
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openInquiryForm();
              }}
              className="flex items-center space-x-1.5 text-studio-accent hover:text-studio-dark font-sans text-[11px] font-bold uppercase tracking-wider"
            >
              <span>Send briefing</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
}
