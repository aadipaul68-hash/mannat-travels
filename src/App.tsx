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
} from 'lucide-react';
import { AdiyogiHeroSlider } from './components/AdiyogiHeroSlider';
import { AdiyogiPopupModal } from './components/AdiyogiPopupModal';
import { AdiyogiContactSection } from './components/AdiyogiContactSection';
import { TourDetailModal } from './components/TourDetailModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import {
  SITE_INFO,
  POPULAR_TOURS_DEFAULT,
  BUS_TOURS,
  HOLIDAY_PACKAGES,
  FEATURED_DESTINATIONS,
  TourItem,
  getWhatsAppBookingUrl,
  getGeneralWhatsAppUrl,
} from './data/mannatData';

const POPULAR_STORAGE_KEY = 'mannat_popular_tours_v1';
const BUS_STORAGE_KEY = 'mannat_bus_tours_v1';
const HOLIDAY_STORAGE_KEY = 'mannat_holiday_packages_v1';

export default function App() {
  // Manage state with LocalStorage persistence so additions/deletions/hide persist!
  const [popularTours, setPopularTours] = useState<TourItem[]>(() => {
    try {
      const saved = localStorage.getItem(POPULAR_STORAGE_KEY);
      return saved ? JSON.parse(saved) : POPULAR_TOURS_DEFAULT;
    } catch {
      return POPULAR_TOURS_DEFAULT;
    }
  });

  const [busTours, setBusTours] = useState<TourItem[]>(() => {
    try {
      const saved = localStorage.getItem(BUS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : BUS_TOURS;
    } catch {
      return BUS_TOURS;
    }
  });

  const [holidayPackages, setHolidayPackages] = useState<TourItem[]>(() => {
    try {
      const saved = localStorage.getItem(HOLIDAY_STORAGE_KEY);
      return saved ? JSON.parse(saved) : HOLIDAY_PACKAGES;
    } catch {
      return HOLIDAY_PACKAGES;
    }
  });

  const [selectedTour, setSelectedTour] = useState<TourItem | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isQuotePopupOpen, setIsQuotePopupOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

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

  return (
    <div className="min-h-screen flex flex-col bg-[#080B11] text-slate-100 font-sans selection:bg-[#f1683a] selection:text-white">
      
      {/* ✦ Header Glass ✦ */}
      <header className="header-glass fixed top-0 left-0 w-full z-50 transition-all duration-300">
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
          <nav className="hidden md:flex items-center space-x-6 text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-300">
            <a href="#hero" className="hover:text-[#f1683a] transition-colors py-1">
              Home
            </a>
            <a href="#popular-tours" className="hover:text-[#f1683a] transition-colors py-1">
              Tours
            </a>
            <a href="#packages-section" className="hover:text-[#f1683a] transition-colors py-1 text-amber-300">
              Packages
            </a>
            <a href="#bus-tours-section" className="hover:text-[#f1683a] transition-colors py-1">
              Bus Tours
            </a>
            <a href="#why-choose" className="hover:text-[#f1683a] transition-colors py-1">
              Why Us
            </a>
            <a href="#destinations" className="hover:text-[#f1683a] transition-colors py-1">
              Destinations
            </a>
            <a href="#contact" className="hover:text-[#f1683a] transition-colors py-1 text-[#f1683a]">
              Contact Us
            </a>
          </nav>

          {/* Header Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Manage Packages Button (Admin Trigger) */}
            <button
              onClick={() => setIsAdminModalOpen(true)}
              title="Manage, Add, Edit, Delete or Hide Packages"
              className="px-3 py-2 rounded-lg border border-amber-500/40 bg-amber-950/40 hover:bg-amber-900/60 text-amber-300 text-xs font-bold uppercase tracking-wider transition flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Manage Packages</span>
            </button>

            <button
              onClick={() => setIsQuotePopupOpen(true)}
              className="px-3.5 py-2 rounded-lg border border-[#f1683a]/40 bg-[#f1683a]/15 hover:bg-[#f1683a] text-white text-xs font-bold uppercase tracking-wider transition cursor-pointer"
            >
              Get Free Quote
            </button>
            <a
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-emerald-500/30 bg-emerald-950/30 hover:bg-emerald-900/50 hover:border-emerald-400 text-emerald-300 text-xs font-semibold tracking-wider uppercase transition shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
              <span>WhatsApp</span>
            </a>
            <a href={`tel:${SITE_INFO.phone}`} className="btn-luxury-primary">
              <Phone className="w-3 h-3 stroke-[2.5]" />
              <span>{SITE_INFO.phone}</span>
            </a>
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="p-2 text-amber-300 bg-amber-950/40 border border-amber-500/40 rounded-lg text-xs font-bold"
              aria-label="Manage Packages"
            >
              <Settings className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsQuotePopupOpen(true)}
              className="px-2.5 py-1.5 text-xs bg-[#f1683a] text-white font-bold rounded"
            >
              Quote
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#080B11]/98 border-b border-amber-500/20 px-6 py-6 space-y-4">
            <a
              href="#hero"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-white hover:text-amber-400 py-1"
            >
              Home
            </a>
            <a
              href="#popular-tours"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-300 hover:text-amber-400 py-1"
            >
              Popular Tours
            </a>
            <a
              href="#packages-section"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-amber-300 hover:text-amber-400 py-1"
            >
              Holiday Packages Page
            </a>
            <a
              href="#bus-tours-section"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-300 hover:text-amber-400 py-1"
            >
              Bus Tours & Yatras
            </a>
            <a
              href="#why-choose"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-300 hover:text-amber-400 py-1"
            >
              Why Choose Us
            </a>
            <a
              href="#destinations"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-300 hover:text-amber-400 py-1"
            >
              Featured Destinations
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[#f1683a] hover:text-amber-400 py-1 font-bold"
            >
              Plan Your Tour Right Now
            </a>

            <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAdminModalOpen(true);
                }}
                className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded-lg uppercase tracking-wider text-xs flex items-center justify-center gap-2"
              >
                <Settings className="w-4 h-4" />
                <span>Manage / Add / Delete Packages</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsQuotePopupOpen(true);
                }}
                className="w-full py-3 bg-[#f1683a] text-white font-bold rounded-lg uppercase tracking-wider text-xs"
              >
                Get Free Quote Popup
              </button>
              <a href={`tel:${SITE_INFO.phone}`} className="btn-luxury-primary w-full text-center">
                Call: {SITE_INFO.phone}
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ✦ EXACT ADIYOGI HERO BANNER SLIDER WITH FLOATING THUMBNAILS & ANIMATIONS ✦ */}
      <AdiyogiHeroSlider onOpenQuoteModal={() => setIsQuotePopupOpen(true)} />

      {/* ✦ Popular Tours Section ✦ */}
      <section id="popular-tours" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-amber-400 font-semibold block mb-2">
              Curated Journeys
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Popular Tours
            </h2>
            <div className="w-16 h-0.5 bg-amber-500 mt-4 mb-4" />
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
              Experience hand-picked holiday itineraries and divine pilgrimages across the snow peaks of Himachal and the tranquil valleys of Uttarakhand.
            </p>
          </div>

          {/* Quick Edit Bar */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="px-4 py-2 rounded-lg border border-amber-500/40 bg-amber-950/40 hover:bg-amber-900/60 text-amber-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Edit / Add Tours</span>
            </button>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
            {visiblePopularTours.map((tour) => {
              const price = Number(tour.price || 0);
              const originalPrice = Number(tour.originalPrice || 0);
              const hasDiscount = originalPrice > price;
              const whatsappUrl = getWhatsAppBookingUrl(tour);

              return (
                <div key={tour.id} className="luxury-card flex flex-col group overflow-hidden">
                  {/* Image Banner */}
                  <div
                    className="relative aspect-[4/3] overflow-hidden bg-slate-900 cursor-pointer"
                    onClick={() => setSelectedTour(tour)}
                  >
                    <img
                      src={tour.image}
                      alt={tour.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E1422] via-transparent to-black/20 pointer-events-none" />
                    <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-semibold tracking-wider uppercase text-amber-300 border border-amber-500/30">
                      {tour.duration || 'Multi-Day'}
                    </div>
                    <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-xs px-2.5 py-0.5 rounded text-[11px] text-slate-300 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      <span className="truncate max-w-[200px]">{tour.destination}</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3
                        onClick={() => setSelectedTour(tour)}
                        className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-amber-300 transition-colors mb-2 cursor-pointer line-clamp-2"
                      >
                        {tour.title}
                      </h3>
                      <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                        {tour.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-800/80">
                      <div className="flex items-baseline justify-between mb-4">
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-slate-500 block font-semibold">
                            Starting from
                          </span>
                          <div className="flex items-baseline gap-1.5 flex-wrap">
                            {hasDiscount && (
                              <span className="text-xs text-slate-500 line-through">
                                ₹{originalPrice.toLocaleString('en-IN')}
                              </span>
                            )}
                            <span className="text-lg font-bold text-amber-400">
                              ₹{price.toLocaleString('en-IN')}
                            </span>
                            <span className="text-[10px] text-slate-400">/ person</span>
                          </div>
                        </div>

                        {tour.availableSeats && Number(tour.availableSeats) <= 6 && (
                          <span className="text-[10px] text-red-400 font-bold bg-red-950/40 border border-red-800/50 px-2 py-0.5 rounded">
                            Only {tour.availableSeats} Left
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedTour(tour)}
                          className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded text-xs font-semibold uppercase tracking-wider bg-slate-800/90 hover:bg-amber-500 hover:text-slate-950 text-white transition-all duration-200 cursor-pointer active:scale-95"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>DETAILS</span>
                        </button>
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded text-xs font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white transition-all duration-200 text-center active:scale-95 shadow-sm"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-white" />
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
      </section>

      {/* ✦ Dedicated Bus Tours & Yatras Section ✦ */}
      <section id="bus-tours-section" className="py-24 bg-[#0B101A] border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-[#f1683a] font-semibold block mb-2">
                Deluxe 2x2 AC Bus Pilgrimages
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
                Upcoming Spiritual Bus Tours
              </h2>
              <div className="w-16 h-0.5 bg-[#f1683a] mt-4 mb-4" />
              <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
                Departing regularly from Muzaffarnagar (Central Bus Stand), Meerut Bypass, and Delhi NCR with pure satvik food and experienced yatra managers.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsAdminModalOpen(true)}
                className="px-4 py-2 rounded-lg border border-[#f1683a]/40 bg-[#f1683a]/15 hover:bg-[#f1683a] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Manage Bus Tours</span>
              </button>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visibleBusTours.map((tour) => {
                const whatsappUrl = getWhatsAppBookingUrl(tour);
                return (
                  <div key={tour.id} className="luxury-card flex flex-col group overflow-hidden">
                    <div
                      className="relative aspect-[16/10] overflow-hidden bg-slate-900 cursor-pointer"
                      onClick={() => setSelectedTour(tour)}
                    >
                      <img
                        src={tour.image}
                        alt={tour.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0E1422] via-transparent to-black/20" />
                      <div className="absolute top-3 left-3 bg-[#f1683a] text-white font-bold px-2.5 py-0.5 rounded text-[11px]">
                        {tour.badge || 'Bus Yatra'}
                      </div>
                      <div className="absolute top-3 right-3 bg-black/75 text-amber-300 text-[11px] px-2.5 py-1 rounded font-mono border border-amber-500/30">
                        {tour.departureDate}
                      </div>
                      <div className="absolute bottom-3 left-3 text-xs text-slate-300 flex items-center gap-1.5">
                        <Bus className="w-3.5 h-3.5 text-[#f1683a]" />
                        <span>{tour.busType}</span>
                      </div>
                    </div>

                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <h3
                          onClick={() => setSelectedTour(tour)}
                          className="font-serif text-lg font-bold text-white group-hover:text-amber-300 transition-colors cursor-pointer mb-2"
                        >
                          {tour.title}
                        </h3>
                        <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">
                          {tour.description}
                        </p>
                      </div>

                      <div className="space-y-1.5 pt-2 border-t border-slate-800 text-xs text-slate-300">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Duration:</span>
                          <span className="text-white font-medium">{tour.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Available Seats:</span>
                          <span className="text-emerald-400 font-bold">{tour.availableSeats} of {tour.totalSeats} seats</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Route:</span>
                          <span className="text-slate-300 text-right truncate max-w-[220px]">{tour.route}</span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-slate-500 block uppercase tracking-wider">Per Seat Fare</span>
                          <div className="flex items-baseline gap-1.5">
                            {tour.originalPrice && tour.originalPrice > tour.price && (
                              <span className="text-xs text-slate-500 line-through">₹{tour.originalPrice}</span>
                            )}
                            <span className="text-xl font-bold text-amber-400">₹{tour.price.toLocaleString('en-IN')}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedTour(tour)}
                            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs font-semibold cursor-pointer"
                          >
                            Details
                          </button>
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-bold flex items-center gap-1"
                          >
                            <MessageCircle className="w-3.5 h-3.5 fill-white" />
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
        </div>
      </section>

      {/* ✦ Holiday Packages Section ✦ */}
      <section id="packages-section" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[#f1683a] font-semibold block mb-2">
              Tailor-Made Vacations
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Holiday Packages & Custom Tours
            </h2>
            <div className="w-16 h-0.5 bg-[#f1683a] mt-4 mb-4" />
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
              From Kainchi Dham & Nainital to Kashmir Houseboats, Manali snow adventures, and Goa beach holidays.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="px-4 py-2 rounded-lg border border-[#f1683a]/40 bg-[#f1683a]/15 hover:bg-[#f1683a] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Manage Holiday Packages</span>
            </button>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleHolidayPackages.map((pkg) => {
              const whatsappUrl = `https://wa.me/${SITE_INFO.whatsappRaw}?text=${encodeURIComponent(
                pkg.whatsappText || `Namaste Mannat Travels, mujhe ${pkg.title} package book karna hai.`
              )}`;
              return (
                <div key={pkg.id} className="luxury-card flex flex-col justify-between p-5 space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-amber-400 font-bold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30">
                        {pkg.badge || pkg.category}
                      </span>
                      <span className="text-slate-400 font-mono text-[11px]">{pkg.duration}</span>
                    </div>

                    <h3 className="font-serif text-base font-bold text-white leading-snug">
                      {pkg.title}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-3">
                      {pkg.description}
                    </p>

                    <div className="p-2.5 rounded-lg bg-slate-900 text-[11px] text-slate-300 space-y-1">
                      <div className="truncate"><strong className="text-slate-400">Route:</strong> {pkg.route}</div>
                      <div><strong className="text-slate-400">Vehicle:</strong> {pkg.vehicle}</div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 block">Package Rate</span>
                      <div className="text-base font-bold text-amber-400">
                        ₹{pkg.price.toLocaleString('en-IN')} <span className="text-[10px] text-slate-400 font-normal">/ person</span>
                      </div>
                    </div>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-[#f1683a] hover:bg-[#d95325] text-white font-bold text-xs rounded transition flex items-center gap-1"
                    >
                      <span>Inquire</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
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
                  <a href="#bus-tours-section" className="hover:text-amber-300 transition">
                    Upcoming Bus Tours
                  </a>
                </li>
                <li>
                  <a href="#destinations" className="hover:text-amber-300 transition">
                    Destinations
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
            <p className="text-[11px]">
              Crafted for Unforgettable Himalayan Journeys & Holy Pilgrimages.
            </p>
          </div>
        </div>
      </footer>

      {/* ✦ Tour Details Modal ✦ */}
      <TourDetailModal tour={selectedTour} onClose={() => setSelectedTour(null)} />

      {/* ✦ EXACT ADIYOGI POPUP MODAL ("Get free quotes from us !") ✦ */}
      <AdiyogiPopupModal
        isOpen={isQuotePopupOpen}
        onClose={() => setIsQuotePopupOpen(false)}
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

    </div>
  );
}
