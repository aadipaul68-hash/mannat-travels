import React, { useEffect, useState, useRef } from 'react';
import {
  X,
  MapPin,
  Check,
  Phone,
  MessageCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Bed,
  Utensils,
  Share2,
  AlertCircle,
  Sparkles,
  Search,
  Menu,
  ChevronRight as ArrowRightIcon
} from 'lucide-react';
import { TourItem, SITE_INFO, getWhatsAppBookingUrl, getDestinationImage } from '../data/mannatData';

interface TourDetailModalProps {
  tour: TourItem | null;
  theme?: 'dark' | 'light';
  allTours?: TourItem[];
  onSelectTour?: (tour: TourItem) => void;
  onClose: () => void;
  onOpenQuote?: () => void;
}

export const TourDetailModal: React.FC<TourDetailModalProps> = ({
  tour,
  theme = 'dark',
  allTours = [],
  onSelectTour,
  onClose,
  onOpenQuote,
}) => {
  const isDark = theme === 'dark';

  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'itinerary' | 'stay-meals' | 'policies'>('overview');
  const [tierPlan, setTierPlan] = useState<'budget' | 'mid-range' | 'premium'>('budget');
  const [openItineraryIndex, setOpenItineraryIndex] = useState<number | null>(0); // First day open by default
  const [showShareToast, setShowShareToast] = useState(false);
  
  // Search & Menu drawer states
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Section anchor refs for smooth tab scrolling inside the modal
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);
  const itineraryRef = useRef<HTMLDivElement>(null);
  const stayMealsRef = useRef<HTMLDivElement>(null);
  const policiesRef = useRef<HTMLDivElement>(null);

  const fallbackImage = tour
    ? getDestinationImage(`${tour.title} ${tour.destination || ''} ${tour.route || ''}`)
    : '/images/chardham.jpg';

  const galleryList: string[] = tour
    ? Array.isArray(tour.galleryImages) && tour.galleryImages.length > 0
      ? tour.galleryImages.filter(Boolean)
      : tour.image
      ? [tour.image]
      : [fallbackImage]
    : [];

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchStartXRef.current - touchEndX;
    const diffY = touchStartYRef.current - touchEndY;

    // Only switch photos if horizontal swipe is significantly stronger than vertical scroll
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 45) {
      if (diffX > 0) {
        handleNextImage();
      } else {
        handlePrevImage();
      }
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  // Reset states only when a different tour is opened
  useEffect(() => {
    if (!tour) return;
    setCurrentImageIndex(0);
    setActiveTab('overview');
    setOpenItineraryIndex(0);
    setIsSearchOpen(false);
    setIsMenuOpen(false);
    setSearchQuery('');
  }, [tour?.id]);

  useEffect(() => {
    if (!tour) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isSearchOpen) {
          setIsSearchOpen(false);
        } else if (isMenuOpen) {
          setIsMenuOpen(false);
        } else {
          onClose();
        }
      }
      if (e.key === 'ArrowLeft') handlePrevImage();
      if (e.key === 'ArrowRight') handleNextImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [tour, onClose, isSearchOpen, isMenuOpen]);

  // Focus search input when search is opened
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isSearchOpen]);

  if (!tour) return null;

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? galleryList.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === galleryList.length - 1 ? 0 : prev + 1));
  };

  const scrollToSection = (tab: 'overview' | 'itinerary' | 'stay-meals' | 'policies') => {
    setActiveTab(tab);
    setIsMenuOpen(false);
    let targetEl: HTMLElement | null = null;
    if (tab === 'overview') targetEl = overviewRef.current;
    if (tab === 'itinerary') targetEl = itineraryRef.current;
    if (tab === 'stay-meals') targetEl = stayMealsRef.current;
    if (tab === 'policies') targetEl = policiesRef.current;

    if (targetEl && contentContainerRef.current) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: tour.title,
        text: `Check out ${tour.title} on Mannat Tour and Travels`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2500);
    }
  };

  const currentDisplayImage = galleryList[currentImageIndex] || tour.image;
  const availableSeats = Number(tour.availableSeats || 0);
  const isUrgent = availableSeats >= 1 && availableSeats <= 6;
  const basePrice = Number(tour.price || 0);
  const originalPrice = Number(tour.originalPrice || 0);

  // Dynamic pricing multipliers based on selected tier
  const tierPriceMultiplier = tierPlan === 'budget' ? 1 : tierPlan === 'mid-range' ? 1.25 : 1.55;
  const currentPrice = Math.round(basePrice * tierPriceMultiplier);
  const currentOriginalPrice = originalPrice > 0 ? Math.round(originalPrice * tierPriceMultiplier) : Math.round(currentPrice * 1.2);

  const hotelRatingText = tierPlan === 'budget' ? '2★ / Standard Deluxe Hotel' : tierPlan === 'mid-range' ? '3★ Deluxe Resort / Hotel' : '4★ Luxury Mountain Resort';

  const boarding = tour.boardingLocation || tour.boardingPoints || 'Muzaffarnagar, Meerut & Delhi NCR';
  const whatsappUrl = getWhatsAppBookingUrl({
    ...tour,
    price: currentPrice,
  });

  const places = Array.isArray(tour.placesCovered) && tour.placesCovered.length > 0
    ? tour.placesCovered
    : typeof tour.route === 'string' && tour.route.includes('-')
    ? tour.route.split('-').map((p) => p.trim()).filter(Boolean)
    : [tour.destination || 'Scenic & Holy Locations'];

  const routeDisplay = places.length > 1 ? places.join('  →  ') : tour.route || tour.destination || 'Customised Route';

  // Determine if Detailed Itinerary is visible
  const isItineraryVisible = tour.showItinerary !== false && Array.isArray(tour.itinerary) && tour.itinerary.length > 0;

  let inclusions = Array.isArray(tour.inclusions) && tour.inclusions.length > 0
    ? tour.inclusions
    : [
        'Deluxe AC 2x2 Pushback Coach / Sanitized Cab Travel',
        'Sanitized Hotel Stay (Twin / Triple Sharing)',
        'Pure Satvik Vegetarian Meals (Breakfast & Dinner)',
        'Darshan Coordination & 24/7 Tour Manager Support'
      ];

  const exclusions = [
    'Personal shopping, pooja samagri & individual donations',
    'VIP darshan special slips or paid camera permits',
    'Any personal laundry, room service or medical expenses'
  ];

  // Search filtered tours
  const searchResults = searchQuery.trim()
    ? allTours.filter((t) => {
        const q = searchQuery.toLowerCase();
        return (
          t.title.toLowerCase().includes(q) ||
          (t.destination && t.destination.toLowerCase().includes(q)) ||
          (t.route && t.route.toLowerCase().includes(q)) ||
          (t.category && t.category.toLowerCase().includes(q))
        );
      })
    : [];

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-0 sm:p-4 overflow-hidden"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`w-full max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl h-[100dvh] sm:h-auto sm:max-h-[92vh] sm:rounded-2xl overflow-hidden shadow-2xl flex flex-col relative transition-colors duration-300 ${
          isDark
            ? 'bg-[#0E1422] text-slate-100 border border-amber-500/25'
            : 'bg-white text-slate-800 border border-slate-200'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ✦ 1. TOP BRAND HEADER WITH SEARCH & MENU BUTTONS ON UPPER RIGHT (Exact User Request) ✦ */}
        <div
          className={`px-3 sm:px-4 py-2.5 flex items-center justify-between shrink-0 sticky top-0 z-30 transition-colors border-b ${
            isDark
              ? 'bg-[#0B101D] border-slate-800'
              : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          {/* Brand Logo (Left) */}
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-xl sm:text-2xl tracking-tight flex items-center gap-1.5">
              <span className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#f1683a] to-amber-500 text-slate-950 flex items-center justify-center text-xs font-black shadow-sm">
                ✦
              </span>
              <span className={isDark ? 'text-white' : 'text-slate-900'}>Mannat</span>
              <span className="font-sans font-extrabold text-lg sm:text-xl text-[#f1683a]">Tours</span>
            </span>
          </div>

          {/* Upper Right Action Buttons: Search | Menu | Share | Close */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* 🔍 Search Button (Search for places to visit like Holidify) */}
            <button
              type="button"
              onClick={() => {
                setIsSearchOpen(!isSearchOpen);
                if (isMenuOpen) setIsMenuOpen(false);
              }}
              title="Search packages & destinations"
              className={`p-2 rounded-lg flex items-center gap-1.5 text-xs font-semibold transition cursor-pointer border ${
                isSearchOpen
                  ? isDark
                    ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                    : 'bg-[#ea384d] text-white border-[#ea384d]'
                  : isDark
                  ? 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 border-slate-700 hover:border-amber-400'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
              }`}
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Search</span>
            </button>

            {/* 🍔 Menu Button (Navigation & Quick links) */}
            <button
              type="button"
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
                if (isSearchOpen) setIsSearchOpen(false);
              }}
              title="Quick Menu"
              className={`p-2 rounded-lg flex items-center gap-1.5 text-xs font-semibold transition cursor-pointer border ${
                isMenuOpen
                  ? isDark
                    ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                    : 'bg-[#ea384d] text-white border-[#ea384d]'
                  : isDark
                  ? 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 border-slate-700 hover:border-amber-400'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
              }`}
            >
              <Menu className="w-4 h-4" />
              <span className="hidden sm:inline">Menu</span>
            </button>

            {/* Share Button */}
            <button
              type="button"
              onClick={handleShare}
              title="Share package"
              className={`p-2 rounded-lg transition cursor-pointer border ${
                isDark
                  ? 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 border-slate-700'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
              }`}
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Close Modal Button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              title="Close"
              className={`p-2 rounded-lg transition cursor-pointer border ${
                isDark
                  ? 'bg-slate-800 hover:bg-red-950 text-slate-200 hover:text-red-400 border-slate-700'
                  : 'bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-500 border-slate-200'
              }`}
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* ✦ EXPANDABLE SEARCH BAR DROPDOWN (When Search Button is clicked) ✦ */}
        {isSearchOpen && (
          <div
            className={`p-3 border-b animate-in fade-in slide-in-from-top-2 duration-200 z-30 ${
              isDark ? 'bg-[#080D1A] border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="relative">
              <Search
                className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${
                  isDark ? 'text-amber-400' : 'text-slate-400'
                }`}
              />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search places, temples (e.g. Kedarnath, Ayodhya, Nainital)..."
                className={`w-full pl-9 pr-8 py-2 rounded-xl text-xs sm:text-sm font-medium focus:outline-none border ${
                  isDark
                    ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500 focus:border-amber-400'
                    : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#ea384d]'
                }`}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Live Search Suggestions Dropdown */}
            {searchQuery.trim() && (
              <div
                className={`mt-2 max-h-56 overflow-y-auto rounded-xl border divide-y ${
                  isDark
                    ? 'bg-slate-900 border-slate-800 divide-slate-800 text-slate-200'
                    : 'bg-white border-slate-200 divide-slate-100 text-slate-800'
                }`}
              >
                {searchResults.length > 0 ? (
                  searchResults.map((resultTour) => (
                    <button
                      key={resultTour.id}
                      type="button"
                      onClick={() => {
                        if (onSelectTour) onSelectTour(resultTour);
                        setIsSearchOpen(false);
                      }}
                      className={`w-full p-2.5 text-left flex items-center justify-between gap-3 transition cursor-pointer ${
                        isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <img
                          src={resultTour.image}
                          alt={resultTour.title}
                          className="w-10 h-10 rounded-lg object-cover shrink-0"
                        />
                        <div className="truncate">
                          <div className="font-bold text-xs truncate">{resultTour.title}</div>
                          <div className="text-[11px] text-slate-400 flex items-center gap-2">
                            <span>{resultTour.duration}</span>
                            <span>•</span>
                            <span className="text-amber-400 font-semibold">
                              ₹{resultTour.price.toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>
                      </div>
                      <ArrowRightIcon className="w-4 h-4 text-slate-400 shrink-0" />
                    </button>
                  ))
                ) : (
                  <div className="p-3 text-center text-xs text-slate-500">
                    No matching tour packages found for "{searchQuery}"
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ✦ EXPANDABLE MENU DRAWER (When Menu Button is clicked) ✦ */}
        {isMenuOpen && (
          <div
            className={`p-4 border-b space-y-3 animate-in fade-in slide-in-from-top-2 duration-200 z-30 ${
              isDark ? 'bg-[#080D1A] border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Quick Section Links:
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => scrollToSection('overview')}
                className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition cursor-pointer ${
                  isDark
                    ? 'bg-slate-900 border-slate-800 text-slate-200 hover:border-amber-400'
                    : 'bg-white border-slate-200 text-slate-800 hover:border-[#ea384d]'
                }`}
              >
                1. Overview
              </button>
              {isItineraryVisible && (
                <button
                  type="button"
                  onClick={() => scrollToSection('itinerary')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition cursor-pointer ${
                    isDark
                      ? 'bg-slate-900 border-slate-800 text-slate-200 hover:border-amber-400'
                      : 'bg-white border-slate-200 text-slate-800 hover:border-[#ea384d]'
                  }`}
                >
                  2. Itinerary
                </button>
              )}
              <button
                type="button"
                onClick={() => scrollToSection('stay-meals')}
                className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition cursor-pointer ${
                  isDark
                    ? 'bg-slate-900 border-slate-800 text-slate-200 hover:border-amber-400'
                    : 'bg-white border-slate-200 text-slate-800 hover:border-[#ea384d]'
                }`}
              >
                3. Stay & Meals
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('policies')}
                className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition cursor-pointer ${
                  isDark
                    ? 'bg-slate-900 border-slate-800 text-slate-200 hover:border-amber-400'
                    : 'bg-white border-slate-200 text-slate-800 hover:border-[#ea384d]'
                }`}
              >
                4. Policies
              </button>
            </div>

            {/* Quick Actions inside Menu */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/60">
              <a
                href={`tel:${SITE_INFO.phone}`}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Call Us</span>
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
              {onOpenQuote && (
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onOpenQuote();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Get Free Quotes</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* ✦ 2. SUB-NAVIGATION TABS (Overview | Itinerary | Stay & Meals | Policies) ✦ */}
        <div
          className={`px-4 flex items-center gap-6 sm:gap-8 text-xs sm:text-sm font-semibold overflow-x-auto shrink-0 scrollbar-none sticky top-[49px] z-20 border-b transition-colors ${
            isDark
              ? 'bg-[#0B101D] border-slate-800 text-slate-400'
              : 'bg-white border-slate-200 text-slate-600'
          }`}
        >
          <button
            type="button"
            onClick={() => scrollToSection('overview')}
            className={`py-2.5 border-b-2 whitespace-nowrap transition cursor-pointer ${
              activeTab === 'overview'
                ? isDark
                  ? 'border-[#f1683a] text-amber-400 font-bold'
                  : 'border-[#ea384d] text-[#ea384d] font-bold'
                : isDark
                ? 'border-transparent hover:text-white'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Overview
          </button>
          {isItineraryVisible && (
            <button
              type="button"
              onClick={() => scrollToSection('itinerary')}
              className={`py-2.5 border-b-2 whitespace-nowrap transition cursor-pointer ${
                activeTab === 'itinerary'
                  ? isDark
                    ? 'border-[#f1683a] text-amber-400 font-bold'
                    : 'border-[#ea384d] text-[#ea384d] font-bold'
                  : isDark
                  ? 'border-transparent hover:text-white'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              Itinerary
            </button>
          )}
          <button
            type="button"
            onClick={() => scrollToSection('stay-meals')}
            className={`py-2.5 border-b-2 whitespace-nowrap transition cursor-pointer ${
              activeTab === 'stay-meals'
                ? isDark
                  ? 'border-[#f1683a] text-amber-400 font-bold'
                  : 'border-[#ea384d] text-[#ea384d] font-bold'
                : isDark
                ? 'border-transparent hover:text-white'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Stay & Meals
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('policies')}
            className={`py-2.5 border-b-2 whitespace-nowrap transition cursor-pointer ${
              activeTab === 'policies'
                ? isDark
                  ? 'border-[#f1683a] text-amber-400 font-bold'
                  : 'border-[#ea384d] text-[#ea384d] font-bold'
                : isDark
                ? 'border-transparent hover:text-white'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Policies
          </button>
        </div>

        {/* ✦ 3. SCROLLABLE BODY CONTENT ✦ */}
        <div
          ref={contentContainerRef}
          className={`overflow-y-auto flex-1 divide-y transition-colors ${
            isDark ? 'divide-slate-800' : 'divide-slate-100'
          }`}
        >
          {/* Top Big Hero Image with Left & Right Arrow Scrollers */}
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative w-full h-64 xs:h-72 sm:h-80 md:h-96 bg-slate-950 overflow-hidden select-none group"
          >
            {/* Ambient Blurred Background for Full Framing */}
            <div
              className="absolute inset-0 bg-cover bg-center filter blur-md opacity-35 scale-110 pointer-events-none"
              style={{ backgroundImage: `url(${currentDisplayImage})` }}
            />

            {/* Main Crisp Destination Photo */}
            <img
              src={currentDisplayImage}
              alt={tour.title}
              className="relative z-1 w-full h-full object-cover object-center transition-all duration-300"
              onError={(e) => {
                const fallback = getDestinationImage(tour.title + ' ' + (tour.destination || ''));
                if (!e.currentTarget.src.includes(fallback)) {
                  e.currentTarget.src = fallback;
                }
              }}
            />

            {/* Subtle Gradient Overlays for contrast */}
            <div className="absolute inset-0 z-2 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

            {/* Left Arrow Button */}
            {galleryList.length > 1 && (
              <button
                type="button"
                onClick={handlePrevImage}
                aria-label="Previous Photo"
                className={`absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition shadow-xl z-20 cursor-pointer active:scale-95 ${
                  isDark
                    ? 'bg-black/80 hover:bg-[#f1683a] text-white border border-white/20'
                    : 'bg-white/95 hover:bg-white text-slate-800 shadow-[0_4px_14px_rgba(0,0,0,0.35)]'
                }`}
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
              </button>
            )}

            {/* Right Arrow Button */}
            {galleryList.length > 1 && (
              <button
                type="button"
                onClick={handleNextImage}
                aria-label="Next Photo"
                className={`absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition shadow-xl z-20 cursor-pointer active:scale-95 ${
                  isDark
                    ? 'bg-black/80 hover:bg-[#f1683a] text-white border border-white/20'
                    : 'bg-white/95 hover:bg-white text-slate-800 shadow-[0_4px_14px_rgba(0,0,0,0.35)]'
                }`}
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
              </button>
            )}

            {/* Carousel Indicator Dots */}
            {galleryList.length > 1 && (
              <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                {galleryList.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`transition-all rounded-full ${
                      currentImageIndex === idx
                        ? 'w-5 h-1.5 sm:h-2 bg-[#f1683a]'
                        : 'w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/50 hover:bg-white/80'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Image Counter Badge */}
            <div className="absolute bottom-2.5 right-2.5 flex items-center gap-2 z-10">
              <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-black/80 text-white backdrop-blur-md border border-white/10 shadow-sm">
                {currentImageIndex + 1} / {galleryList.length} Photos
              </span>
            </div>

            {/* Top Badges */}
            <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 sm:gap-2 z-10">
              <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold bg-[#f1683a] text-white shadow-sm">
                {tour.badge || tour.category}
              </span>
              {isUrgent && (
                <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold bg-amber-500 text-slate-950 animate-pulse shadow-sm">
                  {availableSeats} Seats Left!
                </span>
              )}
            </div>
          </div>

          {/* ✦ Horizontal Photo Thumbnails Strip (Tap to view any destination photo) ✦ */}
          {galleryList.length > 1 && (
            <div
              className={`px-3 py-2 border-b flex items-center gap-2 overflow-x-auto scrollbar-none transition-colors shrink-0 ${
                isDark ? 'bg-[#090E1A] border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 shrink-0">
                Photos:
              </span>
              {galleryList.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`relative w-14 h-10 sm:w-16 sm:h-11 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    currentImageIndex === idx
                      ? 'border-[#f1683a] scale-105 shadow-md shadow-[#f1683a]/30'
                      : 'border-transparent opacity-65 hover:opacity-100 hover:border-slate-500'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const fallback = getDestinationImage(tour.title + ' ' + (tour.destination || ''));
                      if (!e.currentTarget.src.includes(fallback)) {
                        e.currentTarget.src = fallback;
                      }
                    }}
                  />
                </button>
              ))}
            </div>
          )}

          {/* ✦ 4. MAIN PACKAGE OVERVIEW SECTION ✦ */}
          <div ref={overviewRef} className="p-4 sm:p-6 space-y-4">
            {/* Title & Duration */}
            <div>
              <h1
                className={`text-xl sm:text-2xl font-bold font-serif leading-tight ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                {tour.title}
              </h1>
              <div
                className={`text-xs sm:text-sm font-semibold mt-1 ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                Duration: <span className={isDark ? 'text-amber-400' : 'text-slate-800'}>{tour.duration}</span>
              </div>
            </div>

            {/* Route Breadcrumb Strip: Port Blair(2N) → Havelock(2N) → Neil Island(1N) */}
            <div
              className={`text-xs sm:text-sm font-medium leading-relaxed p-2.5 rounded-lg border ${
                isDark
                  ? 'bg-slate-900/80 border-slate-800 text-slate-300'
                  : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}
            >
              <span
                className={`font-semibold block mb-0.5 text-xs uppercase tracking-wider ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                Route & Stops:
              </span>
              <span className="text-[#f1683a] font-semibold">{routeDisplay}</span>
            </div>

            {/* Category Tier Selector Pills */}
            <div>
              <div
                className={`text-xs font-semibold mb-2 uppercase tracking-wider ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                Select Package Tier:
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setTierPlan('budget')}
                  className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition border cursor-pointer ${
                    tierPlan === 'budget'
                      ? isDark
                        ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md font-bold'
                        : 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : isDark
                      ? 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500'
                      : 'bg-white text-slate-700 border-slate-300 hover:border-slate-500'
                  }`}
                >
                  Budget
                </button>
                <button
                  type="button"
                  onClick={() => setTierPlan('mid-range')}
                  className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition border cursor-pointer ${
                    tierPlan === 'mid-range'
                      ? isDark
                        ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md font-bold'
                        : 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : isDark
                      ? 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500'
                      : 'bg-white text-slate-700 border-slate-300 hover:border-slate-500'
                  }`}
                >
                  Mid-Range
                </button>
                <button
                  type="button"
                  onClick={() => setTierPlan('premium')}
                  className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition border cursor-pointer ${
                    tierPlan === 'premium'
                      ? isDark
                        ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md font-bold'
                        : 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : isDark
                      ? 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500'
                      : 'bg-white text-slate-700 border-slate-300 hover:border-slate-500'
                  }`}
                >
                  Premium
                </button>
              </div>
            </div>

            {/* Stay Rating and Price Details */}
            <div className="pt-2">
              <div
                className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                  isDark ? 'text-amber-300/80' : 'text-slate-500'
                }`}
              >
                <Bed className={`w-3.5 h-3.5 ${isDark ? 'text-amber-400' : 'text-slate-600'}`} />
                <span>STAY: {hotelRatingText}</span>
              </div>

              <div className="flex items-baseline gap-2.5 mt-1.5">
                <span
                  className={`text-2xl sm:text-3xl font-extrabold ${
                    isDark ? 'text-amber-400' : 'text-slate-900'
                  }`}
                >
                  ₹ {currentPrice.toLocaleString('en-IN')}
                </span>
                {currentOriginalPrice > currentPrice && (
                  <span
                    className={`text-sm line-through ${
                      isDark ? 'text-slate-500' : 'text-slate-400'
                    }`}
                  >
                    ₹ {currentOriginalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  / person all-inclusive
                </span>
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="pt-1">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#ff4d67] via-[#ea384d] to-[#e62e43] hover:opacity-95 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-[#ea384d]/25 transition cursor-pointer text-center"
              >
                <Sparkles className="w-4 h-4 fill-white" />
                <span>Get Customized Offers</span>
              </a>

              <p
                className={`text-[11px] sm:text-xs text-center mt-2.5 leading-relaxed px-2 ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                100% verified mountain drivers, transparent itinerary, satvik meals & instantaneous quotes direct from our Muzaffarnagar desk.
              </p>
            </div>
          </div>

          {/* ✦ 5. DETAILED ITINERARY SECTION (Only rendered when enabled and non-empty) ✦ */}
          {isItineraryVisible && (
            <div ref={itineraryRef} className="p-4 sm:p-6 space-y-4">
              <div
                className={`flex items-center justify-between border-b pb-2 ${
                  isDark ? 'border-slate-800' : 'border-slate-200'
                }`}
              >
                <h2
                  className={`text-lg sm:text-xl font-bold font-serif ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  Detailed Itinerary
                </h2>
                {Array.isArray(tour.itinerary) && tour.itinerary.length > 0 && (
                  <span className={`text-xs font-semibold ${isDark ? 'text-amber-400' : 'text-slate-500'}`}>
                    {tour.itinerary.length} Days Schedule
                  </span>
                )}
              </div>

              <div className="space-y-3">
                {tour.itinerary!.map((dayItem, idx) => {
                  const isOpen = openItineraryIndex === idx;
                  return (
                    <div
                      key={idx}
                      className={`border rounded-xl overflow-hidden transition-all ${
                        isDark
                          ? 'border-slate-800 bg-[#0B101D] hover:border-amber-500/30'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenItineraryIndex(isOpen ? null : idx)}
                        className={`w-full p-3.5 sm:p-4 text-left flex items-center justify-between gap-3 transition cursor-pointer ${
                          isDark ? 'hover:bg-slate-800/60' : 'hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`px-2 py-0.5 rounded font-bold text-xs shrink-0 ${
                              isDark
                                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            Day {dayItem.day}
                          </span>
                          <span
                            className={`font-bold text-xs sm:text-sm line-clamp-1 ${
                              isDark ? 'text-white' : 'text-slate-900'
                            }`}
                          >
                            {dayItem.title}
                          </span>
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                            isDark ? 'text-slate-400' : 'text-slate-500'
                          } ${isOpen ? 'rotate-180 text-[#f1683a]' : ''}`}
                        />
                      </button>

                      {isOpen && (
                        <div
                          className={`px-4 pb-4 pt-1 text-xs sm:text-sm leading-relaxed border-t ${
                            isDark
                              ? 'border-slate-800/80 bg-slate-950/40 text-slate-300'
                              : 'border-slate-100 bg-slate-50/50 text-slate-600'
                          }`}
                        >
                          {dayItem.desc}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ✦ 6. STAY & MEALS SECTION ✦ */}
          <div ref={stayMealsRef} className="p-4 sm:p-6 space-y-4">
            <h2
              className={`text-lg sm:text-xl font-bold font-serif border-b pb-2 flex items-center gap-2 ${
                isDark ? 'text-white border-slate-800' : 'text-slate-900 border-slate-200'
              }`}
            >
              <Utensils className="w-5 h-5 text-[#f1683a]" />
              <span>Stay & Meals Overview</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                className={`p-4 rounded-xl border space-y-2.5 ${
                  isDark
                    ? 'bg-emerald-950/30 border-emerald-800/40 text-emerald-200'
                    : 'bg-emerald-50/80 border-emerald-200/80 text-emerald-900'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-emerald-400">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Inclusions (What's Included)</span>
                </div>
                <ul
                  className={`space-y-1.5 text-xs sm:text-sm ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
                  {inclusions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className={`p-4 rounded-xl border space-y-2.5 ${
                  isDark
                    ? 'bg-rose-950/30 border-rose-800/40 text-rose-200'
                    : 'bg-rose-50/80 border-rose-200/80 text-rose-900'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-rose-400">
                  <AlertCircle className="w-4 h-4 text-rose-400" />
                  <span>Exclusions (Not Included)</span>
                </div>
                <ul
                  className={`space-y-1.5 text-xs sm:text-sm ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
                  {exclusions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold">✕</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Boarding Point */}
            <div
              className={`p-3.5 rounded-xl border text-xs sm:text-sm flex items-start gap-2.5 ${
                isDark
                  ? 'bg-amber-950/20 border-amber-500/20 text-slate-300'
                  : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <Clock className="w-4 h-4 text-[#f1683a] shrink-0 mt-0.5" />
              <div>
                <strong
                  className={`block font-semibold mb-0.5 ${
                    isDark ? 'text-amber-300' : 'text-slate-900'
                  }`}
                >
                  Boarding & Departure Points:
                </strong>
                <span>{boarding}</span>
              </div>
            </div>
          </div>

          {/* ✦ 7. POLICIES & TERMS ✦ */}
          <div ref={policiesRef} className="p-4 sm:p-6 space-y-3">
            <h2
              className={`text-lg sm:text-xl font-bold font-serif border-b pb-2 ${
                isDark ? 'text-white border-slate-800' : 'text-slate-900 border-slate-200'
              }`}
            >
              Booking Policies & Verification
            </h2>
            <ul
              className={`text-xs sm:text-sm space-y-2 list-disc pl-4 ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              <li>Token advance of ₹1,000 to ₹5,000 locks your seats or vehicle booking.</li>
              <li>Balance amount payable at the time of boarding or upon arrival in hotel.</li>
              <li>Government valid Photo ID (Aadhaar Card / Voter ID) mandatory for all passengers.</li>
              <li>Dedicated customer manager available 24/7 during the entire journey.</li>
            </ul>
          </div>
        </div>

        {/* ✦ 8. BOTTOM STICKY BAR ✦ */}
        <div
          className={`p-3 sm:p-4 border-t flex items-center justify-between gap-3 shrink-0 shadow-lg transition-colors ${
            isDark
              ? 'bg-[#0B101D] border-slate-800'
              : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <a
              href={`tel:${SITE_INFO.phone}`}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border font-bold text-xs sm:text-sm transition cursor-pointer ${
                isDark
                  ? 'border-slate-700 bg-slate-800 hover:bg-slate-700 text-white'
                  : 'border-slate-300 hover:bg-slate-100 text-slate-800'
              }`}
            >
              <Phone className="w-4 h-4 text-[#f1683a]" />
              <span className="hidden sm:inline">Call Us:</span>
              <span>{SITE_INFO.phone}</span>
            </a>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 sm:px-8 py-2.5 rounded-xl bg-gradient-to-r from-[#ff4d67] to-[#ea384d] hover:opacity-95 text-white font-bold text-xs sm:text-sm transition shadow-md shadow-[#ea384d]/30 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        {/* Toast for copy link */}
        {showShareToast && (
          <div className="absolute top-14 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-3 py-1.5 rounded-full shadow-lg z-50 border border-slate-700">
            Link copied to clipboard!
          </div>
        )}
      </div>
    </div>
  );
};
