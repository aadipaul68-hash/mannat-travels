import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Phone,
  MessageCircle,
  Menu,
  X,
  MapPin,
  Eye,
  Bus,
  ShieldCheck,
  Award,
  Clock,
  ArrowRight,
  Settings,
  Lock,
  Sun,
  Moon,
  User,
  Search,
} from 'lucide-react';
import { AdiyogiHeroSlider } from './components/AdiyogiHeroSlider';
import { AdiyogiPopupModal } from './components/AdiyogiPopupModal';
import { AdiyogiContactSection } from './components/AdiyogiContactSection';
import { TourDetailPage } from './components/TourDetailPage';
import { AdminPanelModal } from './components/AdminPanelModal';
import { CustomerAuthModal } from './components/CustomerAuthModal';
import { CustomerReviewsSection } from './components/CustomerReviewsSection';
import { SearchModal } from './components/SearchModal';
import { MenuDrawer } from './components/MenuDrawer';
import {
  SITE_INFO,
  POPULAR_TOURS_DEFAULT,
  BUS_TOURS,
  HOLIDAY_PACKAGES,
  FEATURED_DESTINATIONS,
  TourItem,
  getWhatsAppBookingUrl,
  getGeneralWhatsAppUrl,
  ensureTourHasValidImages,
  getDestinationImage,
} from './data/mannatData';

const POPULAR_STORAGE_KEY = 'mannat_popular_tours_v2';
const BUS_STORAGE_KEY = 'mannat_bus_tours_v2';
const HOLIDAY_STORAGE_KEY = 'mannat_holiday_packages_v2';

export default function App() {
  // Manage state with LocalStorage persistence so additions/deletions/hide persist!
  // Safely deduplicate by id and ensure every single package has authentic destination images
  const [popularTours, setPopularTours] = useState<TourItem[]>(() => {
    try {
      const saved = localStorage.getItem(POPULAR_STORAGE_KEY);
      const rawList: TourItem[] = saved ? JSON.parse(saved) : POPULAR_TOURS_DEFAULT;
      const seen = new Set<string>();
      return rawList
        .filter((item) => {
          if (!item || !item.id || seen.has(item.id)) return false;
          seen.add(item.id);
          return true;
        })
        .map(ensureTourHasValidImages);
    } catch {
      return POPULAR_TOURS_DEFAULT.map(ensureTourHasValidImages);
    }
  });

  const [busTours, setBusTours] = useState<TourItem[]>(() => {
    try {
      const saved = localStorage.getItem(BUS_STORAGE_KEY);
      const rawList: TourItem[] = saved ? JSON.parse(saved) : BUS_TOURS;
      const seen = new Set<string>();
      return rawList
        .filter((item) => {
          if (!item || !item.id || seen.has(item.id)) return false;
          seen.add(item.id);
          return true;
        })
        .map(ensureTourHasValidImages);
    } catch {
      return BUS_TOURS.map(ensureTourHasValidImages);
    }
  });

  const [holidayPackages, setHolidayPackages] = useState<TourItem[]>(() => {
    try {
      const saved = localStorage.getItem(HOLIDAY_STORAGE_KEY);
      const rawList: TourItem[] = saved ? JSON.parse(saved) : HOLIDAY_PACKAGES;
      const seen = new Set<string>();
      return rawList
        .filter((item) => {
          if (!item || !item.id || seen.has(item.id)) return false;
          seen.add(item.id);
          return true;
        })
        .map(ensureTourHasValidImages);
    } catch {
      return HOLIDAY_PACKAGES.map(ensureTourHasValidImages);
    }
  });

  const [selectedTour, setSelectedTour] = useState<TourItem | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isQuotePopupOpen, setIsQuotePopupOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isCustomerAuthOpen, setIsCustomerAuthOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false);

  // Theme Mode: Dark (default luxury black/gold) or Light (clean ivory/warm amber)
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const savedTheme = localStorage.getItem('mannat_theme_mode');
      return (savedTheme as 'dark' | 'light') || 'dark';
    } catch {
      return 'dark';
    }
  });

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    try {
      localStorage.setItem('mannat_theme_mode', nextTheme);
    } catch (e) {
      console.error(e);
    }
  };

  // Sync state changes to localStorage
  useEffect(() => {
    localStorage.setItem(POPULAR_STORAGE_KEY, JSON.stringify(popularTours));
  }, [popularTours]);

  useEffect(() => {
    localStorage.setItem(BUS_STORAGE_KEY, JSON.stringify(busTours));
  }, [busTours]);

  useEffect(() => {
    localStorage.setItem(HOLIDAY_STORAGE_KEY, JSON.stringify(holidayPackages));
  }, [holidayPackages]);

  // Auto-trigger the Adiyogi quote popup after 4 seconds (like on the live site)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsQuotePopupOpen(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  // Sync URL query with selectedTour for true full-page routing (Holidify.com style)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tourSlug = params.get('package');
    if (tourSlug) {
      const all = [...popularTours, ...busTours, ...holidayPackages];
      const found = all.find((t) => t.id === tourSlug);
      if (found) {
        setSelectedTour(found);
      }
    }

    const handlePopState = () => {
      const p = new URLSearchParams(window.location.search);
      const slug = p.get('package');
      if (slug) {
        const all = [...popularTours, ...busTours, ...holidayPackages];
        const found = all.find((t) => t.id === slug);
        if (found) setSelectedTour(found);
      } else {
        setSelectedTour(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [popularTours, busTours, holidayPackages]);

  const handleOpenTour = (tour: TourItem) => {
    setSelectedTour(tour);
    try {
      window.history.pushState({ tourId: tour.id }, '', `?package=${encodeURIComponent(tour.id)}`);
    } catch {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseTour = () => {
    setSelectedTour(null);
    try {
      window.history.pushState({}, '', window.location.pathname);
    } catch {}
  };

  const handleResetToDefaults = () => {
    if (window.confirm('Reset all packages back to initial default list?')) {
      setPopularTours(POPULAR_TOURS_DEFAULT);
      setBusTours(BUS_TOURS);
      setHolidayPackages(HOLIDAY_PACKAGES);
      localStorage.removeItem(POPULAR_STORAGE_KEY);
      localStorage.removeItem(BUS_STORAGE_KEY);
      localStorage.removeItem(HOLIDAY_STORAGE_KEY);
    }
  };

  // Only display ACTIVE (not hidden) items to visitors
  const visiblePopularTours = popularTours.filter((t) => t.status !== 'hidden');
  const visibleBusTours = busTours.filter((t) => t.status !== 'hidden');
  const visibleHolidayPackages = holidayPackages.filter((t) => t.status !== 'hidden');

  // ✦ HOLIDIFY-STYLE FULL PAGE VIEW (No Popup, Complete Dedicated Webpage) ✦
  if (selectedTour) {
    return (
      <div className={`min-h-screen w-full transition-colors duration-300 ${theme === 'light' ? 'light-theme bg-[#F8FAFC] text-slate-800' : 'bg-[#080B11] text-slate-100'}`}>
        <TourDetailPage
          tour={selectedTour}
          theme={theme}
          allTours={[...visiblePopularTours, ...visibleBusTours, ...visibleHolidayPackages]}
          onSelectTour={handleOpenTour}
          onBack={handleCloseTour}
          onOpenSearch={() => setIsSearchModalOpen(true)}
          onOpenMenu={() => setIsMenuDrawerOpen(true)}
          onOpenQuote={() => setIsQuotePopupOpen(true)}
          onOpenCustomerAuth={() => setIsCustomerAuthOpen(true)}
          onOpenAdmin={() => setIsAdminModalOpen(true)}
          onToggleTheme={toggleTheme}
        />

        {/* Search Modal */}
        <SearchModal
          isOpen={isSearchModalOpen}
          theme={theme}
          allTours={[...visiblePopularTours, ...visibleBusTours, ...visibleHolidayPackages]}
          onClose={() => setIsSearchModalOpen(false)}
          onSelectTour={(tour) => {
            handleOpenTour(tour);
            setIsSearchModalOpen(false);
          }}
        />

        {/* Menu Drawer */}
        <MenuDrawer
          isOpen={isMenuDrawerOpen}
          theme={theme}
          onToggleTheme={toggleTheme}
          onOpenSearch={() => {
            setIsMenuDrawerOpen(false);
            setIsSearchModalOpen(true);
          }}
          onOpenQuote={() => {
            setIsMenuDrawerOpen(false);
            setIsQuotePopupOpen(true);
          }}
          onOpenCustomerAuth={() => {
            setIsMenuDrawerOpen(false);
            setIsCustomerAuthOpen(true);
          }}
          onOpenAdmin={() => {
            setIsMenuDrawerOpen(false);
            setIsAdminModalOpen(true);
          }}
          onClose={() => setIsMenuDrawerOpen(false)}
        />

        {/* Adiyogi Free Quote Popup */}
        <AdiyogiPopupModal
          isOpen={isQuotePopupOpen}
          onClose={() => setIsQuotePopupOpen(false)}
        />

        {/* Customer Login Modal */}
        <CustomerAuthModal
          isOpen={isCustomerAuthOpen}
          onClose={() => setIsCustomerAuthOpen(false)}
        />

        {/* Admin Panel Modal */}
        <AdminPanelModal
          isOpen={isAdminModalOpen}
          onClose={() => setIsAdminModalOpen(false)}
          popularTours={popularTours}
          setPopularTours={setPopularTours}
          busTours={busTours}
          setBusTours={setBusTours}
          holidayPackages={holidayPackages}
          setHolidayPackages={setHolidayPackages}
          onResetToDefaults={handleResetToDefaults}
        />
      </div>
    );
  }

  return (
    <div className={`min-h-screen w-full max-w-[100vw] overflow-x-clip flex flex-col font-sans selection:bg-[#f1683a] selection:text-white transition-colors duration-300 ${theme === 'light' ? 'light-theme bg-[#F8FAFC] text-slate-800' : 'bg-[#080B11] text-slate-100'}`}>
      
      {/* ✦ Header Glass (Scrolls up naturally with page) ✦ */}
      <header className="header-glass absolute top-0 left-0 w-full z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="/" className="flex items-center gap-3.5 group">
            <div className="w-10 h-10 rounded-full border border-amber-400/40 bg-black/40 backdrop-blur-md flex items-center justify-center text-[#f1683a] text-lg shadow-sm group-hover:scale-105 transition-all duration-300">
              ✦
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-xl sm:text-2xl tracking-[0.16em] text-white uppercase group-hover:text-amber-300 transition-colors">
                MANNAT <span className="text-gold-gradient">TOURS</span>
              </span>
              <span className="text-[9px] uppercase tracking-[0.28em] text-slate-400 font-medium">
                Luxury Travel & Pilgrimages
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center space-x-5 text-xs font-semibold tracking-wider uppercase text-slate-300">
            <a href="#hero" className="hover:text-[#f1683a] transition-colors py-1">
              Home
            </a>
            <a href="#bus-tours-section" className="hover:text-[#f1683a] transition-colors py-1 text-amber-300 font-bold">
              Bus Tours
            </a>
            <a href="#popular-tours" className="hover:text-[#f1683a] transition-colors py-1">
              Popular Tours
            </a>
            <a href="#packages-section" className="hover:text-[#f1683a] transition-colors py-1">
              Packages
            </a>
            <a href="#why-choose" className="hover:text-[#f1683a] transition-colors py-1">
              Why Us
            </a>
            <a href="#destinations" className="hover:text-[#f1683a] transition-colors py-1">
              Destinations
            </a>
            <a href="#reviews" className="hover:text-[#f1683a] transition-colors py-1 text-amber-300">
              Reviews
            </a>
            <a href="#contact" className="hover:text-[#f1683a] transition-colors py-1 text-[#f1683a]">
              Contact Us
            </a>
          </nav>

          {/* Header Action Buttons (Desktop - Upper Right) */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* 🔍 Search Button (Upper Right) */}
            <button
              onClick={() => setIsSearchModalOpen(true)}
              title="Search Tours & Packages"
              className={`px-3 py-2 rounded-xl border flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition cursor-pointer shadow-sm ${
                theme === 'dark'
                  ? 'border-amber-500/40 bg-slate-900/90 text-amber-300 hover:bg-amber-500 hover:text-slate-950 hover:border-amber-400'
                  : 'border-slate-300 bg-white text-slate-800 hover:bg-[#f1683a] hover:text-white hover:border-[#f1683a]'
              }`}
            >
              <Search className="w-4 h-4 text-[#f1683a]" />
              <span>Search</span>
            </button>

            {/* ☰ Menu Button (Upper Right) */}
            <button
              onClick={() => setIsMenuDrawerOpen(true)}
              title="Open Menu & All Pages"
              className={`px-3 py-2 rounded-xl border flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition cursor-pointer shadow-sm ${
                theme === 'dark'
                  ? 'border-amber-500/40 bg-slate-900/90 text-amber-300 hover:bg-slate-800 hover:border-amber-300'
                  : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-100 shadow-sm'
              }`}
            >
              <Menu className="w-4 h-4 text-amber-400" />
              <span>Menu</span>
            </button>

            {/* Theme Toggle Button (Dark / Light) */}
            <button
              onClick={toggleTheme}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
              className={`p-2 rounded-xl border transition cursor-pointer flex items-center gap-1.5 text-xs font-semibold ${
                theme === 'dark'
                  ? 'border-amber-500/40 bg-slate-900/80 text-amber-300 hover:bg-slate-800'
                  : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-100 shadow-sm'
              }`}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600" />
              )}
            </button>

            {/* Customer Login Button (ग्राहक लॉगिन) */}
            <button
              onClick={() => setIsCustomerAuthOpen(true)}
              title="Customer Login / Member Account"
              className="px-2.5 py-2 rounded-xl border border-amber-400/40 bg-slate-900/90 hover:bg-slate-800 text-amber-300 text-xs font-bold uppercase tracking-wider transition flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <User className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden lg:inline">Login</span>
            </button>
          </div>

          {/* Header Action Buttons (Mobile - Upper Right) */}
          <div className="flex items-center gap-1.5 md:hidden">
            {/* 🔍 Search Button (Upper Right Mobile) */}
            <button
              onClick={() => setIsSearchModalOpen(true)}
              className={`p-2 rounded-lg border text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                theme === 'dark'
                  ? 'text-amber-300 bg-slate-900/90 border-amber-500/40 hover:bg-slate-800'
                  : 'text-slate-800 bg-white border-slate-300 shadow-sm'
              }`}
              aria-label="Search Packages"
              title="Search Packages"
            >
              <Search className="w-4 h-4 text-[#f1683a]" />
              <span className="text-[11px] font-bold">Search</span>
            </button>

            {/* ☰ Menu Button (Upper Right Mobile) */}
            <button
              onClick={() => setIsMenuDrawerOpen(true)}
              className={`p-2 rounded-lg border text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                theme === 'dark'
                  ? 'text-slate-200 bg-slate-900/90 border-amber-500/40 hover:bg-slate-800'
                  : 'text-slate-800 bg-white border-slate-300 shadow-sm'
              }`}
              aria-label="Open Menu"
              title="Menu"
            >
              <Menu className="w-4 h-4 text-amber-400" />
              <span className="text-[11px] font-bold">Menu</span>
            </button>

            {/* Quick Quote Button */}
            <button
              onClick={() => setIsQuotePopupOpen(true)}
              className="px-2.5 py-2 text-xs bg-[#f1683a] text-white font-bold rounded-lg shadow-sm active:scale-95 cursor-pointer"
            >
              Quote
            </button>
          </div>
        </div>
      </header>

      {/* ✦ EXACT ADIYOGI HERO BANNER SLIDER WITH FLOATING THUMBNAILS & ANIMATIONS ✦ */}
      <AdiyogiHeroSlider onOpenQuoteModal={() => setIsQuotePopupOpen(true)} />

      {/* ✦ Dedicated Bus Tours & Yatras Section (Placed Before Popular Tours as Requested) ✦ */}
      <section id="bus-tours-section" className="py-12 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-14">
          <div>
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#f1683a] font-semibold block mb-1.5">
              Deluxe 2x2 AC Bus Pilgrimages
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Upcoming Spiritual Bus Tours
            </h2>
            <div className="w-12 sm:w-16 h-0.5 bg-[#f1683a] mt-2.5 mb-3" />
            <p className="text-slate-400 text-xs sm:text-base max-w-2xl leading-relaxed">
              Departing regularly from Muzaffarnagar (Central Bus Stand), Meerut Bypass, and Delhi NCR with pure satvik food and experienced yatra managers.
            </p>
          </div>
        </div>

        {visibleBusTours.length === 0 ? (
          <div className="p-12 text-center text-slate-400 luxury-card">
            <p className="mb-4">No active bus tours currently displayed.</p>
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="btn-luxury-primary"
            >
              Add or Unhide Bus Tours
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-8">
            {visibleBusTours.map((tour) => {
              const whatsappUrl = getWhatsAppBookingUrl(tour);
              return (
                <div key={tour.id} className="luxury-card flex flex-row sm:flex-col group overflow-hidden sm:h-auto">
                  <div
                    className="relative w-36 sm:w-full h-full sm:aspect-[16/10] shrink-0 overflow-hidden bg-slate-900 cursor-pointer"
                    onClick={() => handleOpenTour(tour)}
                  >
                    <img
                      src={tour.image}
                      alt={tour.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        const fallback = getDestinationImage(tour.title + ' ' + (tour.destination || ''));
                        if (e.currentTarget.src !== fallback) {
                          e.currentTarget.src = fallback;
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E1422] via-transparent to-black/20" />
                    <div className="absolute top-2 left-2 bg-[#f1683a] text-white font-bold px-1.5 py-0.5 rounded text-[9px] sm:text-[11px]">
                      {tour.badge || 'Bus Yatra'}
                    </div>
                    <div className="absolute bottom-1.5 left-1.5 text-[9px] sm:text-xs text-slate-300 flex items-center gap-1 bg-black/70 px-1.5 py-0.5 rounded backdrop-blur-xs">
                      <Bus className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#f1683a]" />
                      <span>{tour.busType}</span>
                    </div>
                  </div>

                  <div className="p-2.5 sm:p-5 flex-1 flex flex-col justify-between space-y-2 sm:space-y-4">
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[9px] sm:text-[11px] text-amber-300 font-mono">
                          📅 {tour.departureDate}
                        </span>
                        <span className="text-[9px] sm:text-xs text-emerald-400 font-bold">
                          {tour.availableSeats} seats left
                        </span>
                      </div>
                      <h3
                        onClick={() => handleOpenTour(tour)}
                        className="font-serif text-xs sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors cursor-pointer line-clamp-1 leading-snug"
                      >
                        {tour.title}
                      </h3>
                      <p className="hidden sm:block text-slate-400 text-xs leading-relaxed line-clamp-2 mt-1">
                        {tour.description}
                      </p>
                    </div>

                    <div className="hidden sm:block space-y-1.5 pt-2 border-t border-slate-800 text-xs text-slate-300">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Duration:</span>
                        <span className="text-white font-medium">{tour.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Route:</span>
                        <span className="text-slate-300 text-right truncate max-w-[220px]">{tour.route}</span>
                      </div>
                    </div>

                    <div className="pt-1.5 sm:pt-3 border-t border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="hidden sm:block text-[10px] text-slate-500 uppercase tracking-wider">Per Seat Fare</span>
                        <div className="flex items-baseline gap-1">
                          {tour.originalPrice && tour.originalPrice > tour.price && (
                            <span className="text-[10px] sm:text-xs text-slate-500 line-through">₹{tour.originalPrice}</span>
                          )}
                          <span className="text-sm sm:text-xl font-bold text-amber-400">₹{tour.price.toLocaleString('en-IN')}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenTour(tour)}
                          className="px-2 py-1 sm:px-3 sm:py-2 bg-slate-800 hover:bg-slate-700 text-white rounded text-[10px] sm:text-xs font-semibold cursor-pointer"
                        >
                          Info
                        </button>
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 sm:px-3.5 sm:py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[10px] sm:text-xs font-bold flex items-center gap-1"
                        >
                          <MessageCircle className="w-3 h-3 fill-white" />
                          <span>Book</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ✦ Popular Tours Section ✦ */}
      <section id="popular-tours" className="py-12 sm:py-20 bg-[#0B101A] border-t border-slate-900 w-full">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-14">
            <div>
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-amber-400 font-semibold block mb-1.5">
                Curated Journeys
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
                Popular Tours
              </h2>
              <div className="w-12 sm:w-16 h-0.5 bg-amber-500 mt-2.5 mb-3" />
              <p className="text-slate-400 text-xs sm:text-base max-w-2xl leading-relaxed">
                Experience hand-picked holiday itineraries and divine pilgrimages across the snow peaks of Himachal and the tranquil valleys of Uttarakhand.
              </p>
            </div>
          </div>

          {visiblePopularTours.length === 0 ? (
            <div className="p-12 text-center text-slate-400 luxury-card">
              <p className="mb-4">All popular tours are currently hidden.</p>
              <button
                onClick={() => setIsAdminModalOpen(true)}
                className="btn-luxury-primary"
              >
                Open Manager to Unhide or Add Tours
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-7">
              {visiblePopularTours.map((tour) => {
                const price = Number(tour.price || 0);
                const originalPrice = Number(tour.originalPrice || 0);
                const hasDiscount = originalPrice > price;
                const whatsappUrl = getWhatsAppBookingUrl(tour);

                return (
                  <div key={tour.id} className="luxury-card flex flex-row sm:flex-col group overflow-hidden h-36 sm:h-auto">
                    {/* Image Banner: half height / compact on mobile */}
                    <div
                      className="relative w-36 sm:w-full h-full sm:aspect-[4/3] shrink-0 overflow-hidden bg-slate-900 cursor-pointer"
                      onClick={() => handleOpenTour(tour)}
                    >
                      <img
                        src={tour.image}
                        alt={tour.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          const fallback = getDestinationImage(tour.title + ' ' + (tour.destination || ''));
                          if (e.currentTarget.src !== fallback) {
                            e.currentTarget.src = fallback;
                          }
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0E1422] via-transparent to-black/20 pointer-events-none" />
                      <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-md px-1.5 py-0.5 rounded text-[9px] sm:text-[11px] font-semibold tracking-wider uppercase text-amber-300 border border-amber-500/30">
                        {tour.duration || 'Multi-Day'}
                      </div>
                      <div className="absolute bottom-1.5 left-1.5 bg-black/70 backdrop-blur-xs px-1.5 py-0.5 rounded text-[9px] sm:text-[11px] text-slate-300 flex items-center gap-1">
                        <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400" />
                        <span className="truncate max-w-[100px] sm:max-w-[200px]">{tour.destination}</span>
                      </div>
                    </div>

                    {/* Card Content: compact half-height design */}
                    <div className="p-2.5 sm:p-5 flex-1 flex flex-col justify-between overflow-hidden">
                      <div>
                        <h3
                          onClick={() => handleOpenTour(tour)}
                          className="font-serif text-xs sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors mb-0.5 sm:mb-2 cursor-pointer line-clamp-1 sm:line-clamp-2 leading-snug"
                        >
                          {tour.title}
                        </h3>
                        <p className="hidden sm:block text-slate-400 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">
                          {tour.description}
                        </p>
                      </div>

                      <div className="pt-1.5 sm:pt-4 border-t border-slate-800/80">
                        <div className="flex items-baseline justify-between mb-1.5 sm:mb-4">
                          <div>
                            <span className="hidden sm:block text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                              Starting from
                            </span>
                            <div className="flex items-baseline gap-1 flex-wrap">
                              {hasDiscount && (
                                <span className="text-[10px] sm:text-xs text-slate-500 line-through">
                                  ₹{originalPrice.toLocaleString('en-IN')}
                                </span>
                              )}
                              <span className="text-sm sm:text-lg font-bold text-amber-400">
                                ₹{price.toLocaleString('en-IN')}
                              </span>
                              <span className="text-[9px] sm:text-[10px] text-slate-400">/ person</span>
                            </div>
                          </div>

                          {tour.availableSeats && Number(tour.availableSeats) <= 6 && (
                            <span className="text-[9px] text-red-400 font-bold bg-red-950/40 border border-red-800/50 px-1.5 py-0.5 rounded">
                              {tour.availableSeats} left
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleOpenTour(tour)}
                            className="inline-flex items-center justify-center gap-1 px-2 py-1 sm:py-2 rounded text-[10px] sm:text-xs font-semibold uppercase tracking-wider bg-slate-800/90 hover:bg-amber-500 hover:text-slate-950 text-white transition-all cursor-pointer active:scale-95"
                          >
                            <Eye className="w-3 h-3" />
                            <span>INFO</span>
                          </button>
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1 px-2 py-1 sm:py-2 rounded text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white transition-all text-center active:scale-95 shadow-sm"
                          >
                            <MessageCircle className="w-3 h-3 fill-white" />
                            <span>BOOK</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="mt-12 text-center">
            <a href="#packages-section" className="btn-luxury-outline inline-flex">
              <span>VIEW ALL TOURS & CUSTOM PACKAGES →</span>
            </a>
          </div>
        </div>
      </section>

      {/* ✦ Holiday Packages Section ✦ */}
      <section id="packages-section" className="py-12 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-14">
          <div>
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#f1683a] font-semibold block mb-1.5">
              Tailor-Made Vacations
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Holiday Packages & Custom Tours
            </h2>
            <div className="w-12 sm:w-16 h-0.5 bg-[#f1683a] mt-2.5 mb-3" />
            <p className="text-slate-400 text-xs sm:text-base max-w-2xl leading-relaxed">
              From Kainchi Dham & Nainital to Kashmir Houseboats, Manali snow adventures, and Goa beach holidays.
            </p>
          </div>
        </div>

        {visibleHolidayPackages.length === 0 ? (
          <div className="p-12 text-center text-slate-400 luxury-card">
            <p className="mb-4">No active holiday packages currently displayed.</p>
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="btn-luxury-primary"
            >
              Add or Unhide Packages
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
            {visibleHolidayPackages.map((pkg) => {
              const whatsappUrl = `https://wa.me/${SITE_INFO.whatsappRaw}?text=${encodeURIComponent(
                pkg.whatsappText || `Namaste Mannat Travels, mujhe ${pkg.title} package book karna hai.`
              )}`;
              return (
                <div key={pkg.id} className="luxury-card flex flex-row sm:flex-col group overflow-hidden sm:h-auto">
                  {/* Destination Image Banner */}
                  <div
                    className="relative w-36 sm:w-full h-full sm:aspect-[16/10] shrink-0 overflow-hidden bg-slate-900 cursor-pointer"
                    onClick={() => handleOpenTour(pkg)}
                  >
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        const fallback = getDestinationImage(pkg.title + ' ' + (pkg.destination || ''));
                        if (e.currentTarget.src !== fallback) {
                          e.currentTarget.src = fallback;
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E1422] via-transparent to-black/20" />
                    <div className="absolute top-2 left-2 bg-[#f1683a] text-white font-bold px-1.5 py-0.5 rounded text-[9px] sm:text-[11px]">
                      {pkg.badge || pkg.category}
                    </div>
                    <div className="absolute bottom-1.5 left-1.5 text-[9px] sm:text-xs text-slate-300 flex items-center gap-1 bg-black/70 px-1.5 py-0.5 rounded backdrop-blur-xs">
                      <Clock className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#f1683a]" />
                      <span>{pkg.duration}</span>
                    </div>
                  </div>

                  <div className="p-2.5 sm:p-5 flex-1 flex flex-col justify-between space-y-2 sm:space-y-4">
                    <div>
                      <h3
                        onClick={() => handleOpenTour(pkg)}
                        className="font-serif text-xs sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors cursor-pointer line-clamp-1 leading-snug"
                      >
                        {pkg.title}
                      </h3>
                      <p className="hidden sm:block text-xs text-slate-400 line-clamp-2 mt-1">
                        {pkg.description}
                      </p>
                      <div className="mt-2 text-[10px] sm:text-xs text-slate-300 space-y-0.5">
                        <div className="truncate"><strong className="text-slate-400">Route:</strong> {pkg.route}</div>
                      </div>
                    </div>

                    <div className="pt-2 sm:pt-3 border-t border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="hidden sm:block text-[10px] text-slate-500">Package Rate</span>
                        <div className="text-sm sm:text-base font-bold text-amber-400">
                          ₹{pkg.price.toLocaleString('en-IN')} <span className="text-[9px] sm:text-[10px] text-slate-400 font-normal">/ person</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenTour(pkg)}
                          className="px-2 py-1 sm:px-3 sm:py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded text-[10px] sm:text-xs font-semibold cursor-pointer"
                        >
                          Info
                        </button>
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-[#f1683a] hover:bg-[#d95325] text-white font-bold text-[10px] sm:text-xs rounded transition flex items-center gap-1 active:scale-95"
                        >
                          <span>Book</span>
                          <ArrowRight className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ✦ Why Choose Us Section ✦ */}
      <section id="why-choose" className="py-24 bg-[#0B101A] border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-amber-400 font-semibold block mb-2">
              The Mannat Difference
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Why Choose Mannat Tours
            </h2>
            <div className="w-16 h-0.5 bg-amber-500 mx-auto mt-4 mb-5" />
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              We combine regional Himalayan expertise with uncompromised guest safety, reliable luxury coaches, and sincere hospitality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="luxury-card p-8 group relative">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-700/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 group-hover:border-amber-400 transition-all duration-300">
                <Bus className="w-7 h-7 stroke-[1.8]" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-3 group-hover:text-amber-300 transition-colors">
                Comfortable Travel
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Spacious pushback AC luxury coaches and sanitized private sedans operated by verified, seasoned hill road captains.
              </p>
            </div>

            <div className="luxury-card p-8 group relative">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-700/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 group-hover:border-amber-400 transition-all duration-300">
                <ShieldCheck className="w-7 h-7 stroke-[1.8]" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-3 group-hover:text-amber-300 transition-colors">
                Trusted Service
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Transparent pricing with zero hidden charges, vetted quality stays, and deep-rooted respect for pilgrimage traditions.
              </p>
            </div>

            <div className="luxury-card p-8 group relative">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-700/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 group-hover:border-amber-400 transition-all duration-300">
                <Award className="w-7 h-7 stroke-[1.8]" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-3 group-hover:text-amber-300 transition-colors">
                Custom Tour Packages
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Bespoke itineraries tailored around your family's schedule, preferred hotel category, and sacred temple darshan needs.
              </p>
            </div>

            <div className="luxury-card p-8 group relative">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-700/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 group-hover:border-amber-400 transition-all duration-300">
                <Clock className="w-7 h-7 stroke-[1.8]" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-3 group-hover:text-amber-300 transition-colors">
                24/7 Support
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Direct hotline to our dedicated tour coordinators for on-trip logistics, weather updates, and immediate assistance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ✦ Featured Destinations ✦ */}
      <section id="destinations" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#f1683a] font-semibold block mb-2">
            Sacred & Scenic
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Featured Destinations
          </h2>
          <div className="w-16 h-0.5 bg-[#f1683a] mx-auto mt-4 mb-5" />
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            From the tranquil riverbanks of the Ganges to the snow peaks of Himachal, explore our top destinations departing directly from Western UP and Delhi NCR.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {FEATURED_DESTINATIONS.map((dest, i) => {
            const destUrl = `https://wa.me/${SITE_INFO.whatsappRaw}?text=${encodeURIComponent(
              `Hello Mannat Tours! I would like to inquire about tour packages for ${dest.name} (${dest.state}).`
            )}`;
            return (
              <a
                key={i}
                href={destUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-900 border border-amber-500/20 hover:border-[#f1683a] transition-all duration-300 block shadow-lg hover:-translate-y-1"
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#f1683a] font-semibold block mb-1">
                    {dest.state}
                  </span>
                  <h3 className="font-serif text-lg sm:text-2xl font-bold text-white group-hover:text-amber-300 transition-colors">
                    {dest.name}
                  </h3>
                  <span className="text-[11px] text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 mt-1">
                    <span>Plan Trip</span>
                    <ArrowRight className="w-3 h-3 text-[#f1683a]" />
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* ✦ Customer Reviews (5-Star Testimonials) ✦ */}
      <CustomerReviewsSection />

      {/* ✦ EXACT ADIYOGI "PLAN YOUR TOUR RIGHT NOW" CONTACT SECTION ✦ */}
      <AdiyogiContactSection />

      {/* ✦ Exact Footer ✦ */}
      <footer className="bg-[#05080E] border-t border-slate-900 text-slate-400 text-xs py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
            
            <div className="space-y-4 md:col-span-1">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full border border-amber-400/40 bg-black flex items-center justify-center text-amber-400 text-sm">
                  ✦
                </div>
                <span className="font-serif font-bold text-xl text-white tracking-widest uppercase">
                  MANNAT <span className="text-gold-gradient">TOURS</span>
                </span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Premier luxury travel and sacred pilgrimage organizers from Muzaffarnagar, Western Uttar Pradesh & Delhi NCR.
              </p>
              <div className="pt-2 flex items-center gap-3">
                <a
                  href={`tel:${SITE_INFO.phone}`}
                  className="px-3 py-1.5 rounded bg-slate-900 hover:bg-[#f1683a] hover:text-white text-white text-xs font-bold transition"
                >
                  Call: {SITE_INFO.phone}
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest text-[#f1683a] font-bold mb-4">
                Quick Navigation
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a href="#hero" className="hover:text-amber-300 transition">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#bus-tours-section" className="hover:text-amber-300 transition">
                    Upcoming Spiritual Bus Tours
                  </a>
                </li>
                <li>
                  <a href="#popular-tours" className="hover:text-amber-300 transition">
                    Popular Tours
                  </a>
                </li>
                <li>
                  <a href="#packages-section" className="hover:text-amber-300 transition">
                    Holiday Packages
                  </a>
                </li>
                <li>
                  <a href="#destinations" className="hover:text-amber-300 transition">
                    Destinations
                  </a>
                </li>
                <li>
                  <a href="#reviews" className="hover:text-amber-300 transition">
                    Customer Reviews (5★)
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-amber-300 transition">
                    Contact & Booking
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest text-[#f1683a] font-bold mb-4">
                Sacred Yatras
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a href="#bus-tours-section" className="hover:text-amber-300 transition">
                    Neem Karoli Baba Kainchi Dham
                  </a>
                </li>
                <li>
                  <a href="#bus-tours-section" className="hover:text-amber-300 transition">
                    Shri Ram Mandir Ayodhya Dham
                  </a>
                </li>
                <li>
                  <a href="#popular-tours" className="hover:text-amber-300 transition">
                    Kedarnath & Badrinath Char Dham
                  </a>
                </li>
                <li>
                  <a href="#bus-tours-section" className="hover:text-amber-300 transition">
                    Maa Vaishno Devi Bhavan Yatra
                  </a>
                </li>
                <li>
                  <a href="#bus-tours-section" className="hover:text-amber-300 transition">
                    Braj Bhoomi Mathura Vrindavan
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest text-[#f1683a] font-bold mb-4">
                Office & Bookings
              </h4>
              <p className="text-slate-400 mb-2 leading-relaxed">
                Central Bus Stand Road, Muzaffarnagar, Uttar Pradesh 251001
              </p>
              <p className="text-slate-400 mb-1">
                <strong className="text-white">Hotline:</strong> {SITE_INFO.phoneFormatted}
              </p>
              <p className="text-slate-400 mb-4">
                <strong className="text-white">WhatsApp:</strong> +91 {SITE_INFO.phone}
              </p>
              <span className="text-[11px] text-[#f1683a] block font-semibold">
                Daily Boarding: Muzaffarnagar, Meerut & Delhi NCR
              </span>
            </div>

          </div>

          <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-slate-500 gap-2">
            <p>
              © {new Date().getFullYear()} Mannat Tour and Travels. All Rights Reserved.
            </p>
            <div className="flex items-center gap-4 text-[11px]">
              <span>Crafted for Unforgettable Himalayan Journeys & Holy Pilgrimages.</span>
              <button
                onClick={() => setIsAdminModalOpen(true)}
                className="text-slate-600 hover:text-amber-400/80 transition flex items-center gap-1 cursor-pointer"
                title="Admin Only Access"
              >
                <Lock className="w-3 h-3" />
                <span>Admin Login</span>
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Spacing for mobile bottom floating bar */}
      <div className="h-16 md:hidden" />

      {/* ✦ Mobile Floating Action Bar (Sticky at Bottom for smartphones) ✦ */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#080B11]/95 backdrop-blur-lg border-t border-amber-500/20 px-3 py-2 flex items-center justify-between gap-2 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
        <a
          href={`tel:${SITE_INFO.phone}`}
          className="flex-1 py-2.5 px-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-400 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition active:scale-95"
        >
          <Phone className="w-3.5 h-3.5 text-amber-400" />
          <span>Call Now</span>
        </a>

        <a
          href={getGeneralWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2.5 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-sm active:scale-95"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-white" />
          <span>WhatsApp</span>
        </a>

        <button
          type="button"
          onClick={() => setIsQuotePopupOpen(true)}
          className="flex-1 py-2.5 px-2 rounded-xl bg-gradient-to-r from-[#f1683a] to-amber-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-sm active:scale-95 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Get Quote</span>
        </button>
      </div>

      {/* ✦ EXACT ADIYOGI POPUP MODAL ("Get free quotes from us !") ✦ */}
      <AdiyogiPopupModal
        isOpen={isQuotePopupOpen}
        onClose={() => setIsQuotePopupOpen(false)}
      />

      {/* ✦ CUSTOMER LOGIN & MEMBER AUTH MODAL (Google & Email/Password) ✦ */}
      <CustomerAuthModal
        isOpen={isCustomerAuthOpen}
        onClose={() => setIsCustomerAuthOpen(false)}
      />

      {/* ✦ ADMIN PANEL MODAL (Add, Edit, Delete, Hide/Unhide) ✦ */}
      <AdminPanelModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        popularTours={popularTours}
        setPopularTours={setPopularTours}
        busTours={busTours}
        setBusTours={setBusTours}
        holidayPackages={holidayPackages}
        setHolidayPackages={setHolidayPackages}
        onResetToDefaults={handleResetToDefaults}
      />

      {/* ✦ HOMEPAGE SEARCH MODAL (Upper Right Search Button) ✦ */}
      <SearchModal
        isOpen={isSearchModalOpen}
        theme={theme}
        allTours={[...visiblePopularTours, ...visibleBusTours, ...visibleHolidayPackages]}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectTour={(tour) => {
          handleOpenTour(tour);
          setIsSearchModalOpen(false);
        }}
      />

      {/* ✦ HOMEPAGE MENU DRAWER (Upper Right Menu Button) ✦ */}
      <MenuDrawer
        isOpen={isMenuDrawerOpen}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenSearch={() => {
          setIsMenuDrawerOpen(false);
          setIsSearchModalOpen(true);
        }}
        onOpenQuote={() => {
          setIsMenuDrawerOpen(false);
          setIsQuotePopupOpen(true);
        }}
        onOpenCustomerAuth={() => {
          setIsMenuDrawerOpen(false);
          setIsCustomerAuthOpen(true);
        }}
        onOpenAdmin={() => {
          setIsMenuDrawerOpen(false);
          setIsAdminModalOpen(true);
        }}
        onClose={() => setIsMenuDrawerOpen(false)}
      />

    </div>
  );
}
