import React, { useEffect } from 'react';
import {
  X,
  Home,
  Compass,
  Package,
  Bus,
  Award,
  MapPin,
  Star,
  Phone,
  MessageCircle,
  Sparkles,
  Sun,
  Moon,
  User,
  Lock,
  Search,
  ChevronRight
} from 'lucide-react';
import { SITE_INFO, getGeneralWhatsAppUrl } from '../data/mannatData';

interface MenuDrawerProps {
  isOpen: boolean;
  theme?: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenSearch: () => void;
  onOpenQuote: () => void;
  onOpenCustomerAuth: () => void;
  onOpenAdmin: () => void;
  onClose: () => void;
}

export const MenuDrawer: React.FC<MenuDrawerProps> = ({
  isOpen,
  theme = 'dark',
  onToggleTheme,
  onOpenSearch,
  onOpenQuote,
  onOpenCustomerAuth,
  onOpenAdmin,
  onClose,
}) => {
  const isDark = theme === 'dark';

  useEffect(() => {
    if (isOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = prevOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const navLinks = [
    { label: 'Home', href: '#hero', icon: Home, badge: 'Main' },
    { label: 'Popular Tours & Yatra', href: '#popular-tours', icon: Compass, badge: 'Featured' },
    { label: 'Holiday Packages', href: '#packages-section', icon: Package, badge: 'All-Inclusive' },
    { label: 'Spiritual Bus Tours', href: '#bus-tours-section', icon: Bus, badge: 'AC Coach' },
    { label: 'Why Choose Us', href: '#why-choose', icon: Award },
    { label: 'Destinations', href: '#destinations', icon: MapPin },
    { label: 'Customer Reviews', href: '#reviews', icon: Star, badge: '4.9 ★' },
    { label: 'Contact & Office', href: '#contact', icon: Phone },
  ];

  return (
    <div
      className="fixed inset-0 z-[115] bg-black/80 backdrop-blur-md flex justify-end animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`w-full max-w-sm sm:max-w-md h-full flex flex-col shadow-2xl transition-all duration-300 animate-in slide-in-from-right border-l ${
          isDark
            ? 'bg-[#0B101D] text-slate-100 border-amber-500/25'
            : 'bg-white text-slate-800 border-slate-200'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div
          className={`p-4 sm:p-5 flex items-center justify-between border-b ${
            isDark ? 'border-slate-800 bg-[#080D1A]' : 'border-slate-200 bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#f1683a] to-amber-500 text-slate-950 flex items-center justify-center text-sm font-black shadow-sm">
              ✦
            </span>
            <div>
              <div className="font-serif font-bold text-lg sm:text-xl tracking-tight leading-none">
                <span className={isDark ? 'text-white' : 'text-slate-900'}>Mannat</span>{' '}
                <span className="text-[#f1683a]">Tours</span>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
                Menu & Quick Links
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className={`p-2 rounded-xl border transition cursor-pointer ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Action Buttons Strip */}
        <div
          className={`p-3.5 border-b grid grid-cols-2 gap-2 text-xs font-semibold ${
            isDark ? 'border-slate-800 bg-[#0E1527]' : 'border-slate-100 bg-slate-50/50'
          }`}
        >
          {/* Quick Search */}
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenSearch();
            }}
            className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 transition cursor-pointer ${
              isDark
                ? 'bg-slate-900 border-slate-700 hover:border-amber-400 text-amber-300'
                : 'bg-white border-slate-200 hover:border-slate-400 text-slate-800'
            }`}
          >
            <Search className="w-4 h-4 text-amber-400" />
            <span>Search Tours</span>
          </button>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 transition cursor-pointer ${
              isDark
                ? 'bg-slate-900 border-slate-700 hover:border-amber-400 text-amber-300'
                : 'bg-white border-slate-200 hover:border-slate-400 text-slate-800'
            }`}
          >
            {isDark ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-indigo-600" />
                <span>Dark Mode</span>
              </>
            )}
          </button>
        </div>

        {/* Scrollable Navigation Links */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1.5 divide-y divide-slate-800/20">
          <div className="space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
              Explore Sections:
            </div>
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={onClose}
                  className={`flex items-center justify-between p-3 rounded-xl transition cursor-pointer group ${
                    isDark
                      ? 'hover:bg-slate-900 text-slate-300 hover:text-white'
                      : 'hover:bg-slate-100 text-slate-700 hover:text-slate-950'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`p-2 rounded-lg transition ${
                        isDark
                          ? 'bg-slate-900 group-hover:bg-amber-500/20 text-amber-400'
                          : 'bg-slate-100 group-hover:bg-amber-100 text-[#f1683a]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="font-semibold text-sm">{link.label}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {link.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400">
                        {link.badge}
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </a>
              );
            })}
          </div>

          {/* Account & Admin Quick Links */}
          <div className="pt-3 space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
              Account & Portal:
            </div>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenCustomerAuth();
              }}
              className={`w-full flex items-center justify-between p-3 rounded-xl transition cursor-pointer ${
                isDark
                  ? 'hover:bg-slate-900 text-slate-300 hover:text-white'
                  : 'hover:bg-slate-100 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                  <User className="w-4 h-4" />
                </span>
                <span className="font-semibold text-sm">Customer Login / Account</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenAdmin();
              }}
              className={`w-full flex items-center justify-between p-3 rounded-xl transition cursor-pointer ${
                isDark
                  ? 'hover:bg-slate-900 text-slate-300 hover:text-white'
                  : 'hover:bg-slate-100 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-lg bg-amber-950/40 text-amber-400 border border-amber-500/30">
                  <Lock className="w-4 h-4" />
                </span>
                <span className="font-semibold text-sm">Admin Control Panel</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-950 border border-amber-800 text-amber-400">
                PIN
              </span>
            </button>
          </div>
        </div>

        {/* Drawer Bottom Contact Strip */}
        <div
          className={`p-4 border-t space-y-2.5 shrink-0 ${
            isDark ? 'border-slate-800 bg-[#080D1A]' : 'border-slate-200 bg-slate-50'
          }`}
        >
          <div className="grid grid-cols-2 gap-2">
            <a
              href={`tel:${SITE_INFO.phone}`}
              className="py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-400 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition"
            >
              <Phone className="w-3.5 h-3.5 text-[#f1683a]" />
              <span>Call Us</span>
            </a>

            <a
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>WhatsApp</span>
            </a>
          </div>

          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenQuote();
            }}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#ff4d67] via-[#ea384d] to-[#e62e43] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#ea384d]/25 transition cursor-pointer"
          >
            <Sparkles className="w-4 h-4 fill-white" />
            <span>Get Free Customized Quotes</span>
          </button>

          <p className="text-[11px] text-center text-slate-400">
            Mannat Tours & Travels • Muzaffarnagar & Delhi NCR
          </p>
        </div>
      </div>
    </div>
  );
};
