import React, { useState } from 'react';
import { Phone, MessageCircle, Menu, X, Calendar, MapPin } from 'lucide-react';
import { COMPANY_INFO } from '../data/travelData';

interface NavbarProps {
  onOpenBooking: (prefill?: { pickup?: string; destination?: string; vehicle?: string }) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0d1424]/95 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Zone 1: Single text element wordmark (strict Top Bar contract) */}
          <a href="#" className="flex flex-col">
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-white font-['Outfit',sans-serif]">
              Mannat Tour N Travels
            </span>
            <span className="text-[11px] uppercase tracking-wider text-amber-400 font-medium">
              Uttarakhand Taxi & Yatra Services
            </span>
          </a>

          {/* Zone 2: Clean 4-6 text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
            <a href="#spiritual-bus" className="text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1 font-semibold">
              <span>Spiritual Bus Tours</span>
            </a>
            <a href="#packages" className="hover:text-amber-400 transition-colors">
              Tour Packages
            </a>
            <a href="#fleet" className="hover:text-amber-400 transition-colors">
              Fleet & Rates
            </a>
            <a href="#calculator" className="hover:text-amber-400 transition-colors">
              Fare Estimator
            </a>
            <a href="#chardham" className="hover:text-amber-400 transition-colors">
              Char Dham Guide
            </a>
            <a href="#testimonials" className="hover:text-amber-400 transition-colors">
              Reviews
            </a>
            <a href="#contact" className="hover:text-amber-400 transition-colors">
              Contact
            </a>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${COMPANY_INFO.phoneRaw1}`}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-200 bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 rounded-lg transition-colors whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{COMPANY_INFO.phone1}</span>
            </a>
            <button
              onClick={() => onOpenBooking()}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-md shadow-amber-400/20 transition-all whitespace-nowrap font-medium"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Cab / Tour</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={`https://wa.me/${COMPANY_INFO.phoneRaw1}?text=${encodeURIComponent(COMPANY_INFO.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 rounded-lg"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white bg-slate-800/80 border border-slate-700 rounded-lg"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0d1424] border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-2 text-sm font-medium text-slate-200">
            <a
              href="#spiritual-bus"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md bg-amber-400/10 text-amber-400 font-semibold"
            >
              🚌 Spiritual Bus Tours (आध्यात्मिक बस यात्रा)
            </a>
            <a
              href="#packages"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-800"
            >
              Tour Packages
            </a>
            <a
              href="#fleet"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-800"
            >
              Fleet & Rates
            </a>
            <a
              href="#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-800"
            >
              Fare Estimator
            </a>
            <a
              href="#chardham"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-800"
            >
              Char Dham Yatra Guide
            </a>
            <a
              href="#testimonials"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-800"
            >
              Customer Reviews
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-800"
            >
              Contact & Address
            </a>
          </div>

          <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-2">
            <a
              href={`tel:${COMPANY_INFO.phoneRaw1}`}
              className="flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-white bg-slate-800 rounded-lg"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call Us</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-slate-950 bg-amber-400 rounded-lg font-medium"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Cab</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
