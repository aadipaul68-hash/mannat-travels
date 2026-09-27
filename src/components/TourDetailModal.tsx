import React, { useEffect, useState, useRef } from 'react';
import {
  X,
  MapPin,
  Check,
  Phone,
  MessageCircle,
  Play,
  Clock,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Star,
  ShieldCheck,
  Sparkles,
  Calendar,
  Bed,
  Utensils,
  Share2,
  AlertCircle
} from 'lucide-react';
import { TourItem, SITE_INFO, getWhatsAppBookingUrl } from '../data/mannatData';

interface TourDetailModalProps {
  tour: TourItem | null;
  onClose: () => void;
  onOpenQuote?: () => void;
}

export const TourDetailModal: React.FC<TourDetailModalProps> = ({ tour, onClose, onOpenQuote }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'itinerary' | 'stay-meals' | 'policies'>('overview');
  const [tierPlan, setTierPlan] = useState<'budget' | 'mid-range' | 'premium'>('budget');
  const [openItineraryIndex, setOpenItineraryIndex] = useState<number | null>(0); // First day open by default
  const [showShareToast, setShowShareToast] = useState(false);

  // Section anchor refs for smooth tab scrolling inside the modal
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);
  const itineraryRef = useRef<HTMLDivElement>(null);
  const stayMealsRef = useRef<HTMLDivElement>(null);
  const policiesRef = useRef<HTMLDivElement>(null);

  const galleryList: string[] = tour
    ? Array.isArray(tour.galleryImages) && tour.galleryImages.length > 0
      ? tour.galleryImages
      : [tour.image, '/images/kaichi-dham.jpg', '/images/ayodhya-banner.jpg']
    : [];

  useEffect(() => {
    if (!tour) return;
    setCurrentImageIndex(0);
    setActiveTab('overview');
    setOpenItineraryIndex(0);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrevImage();
      if (e.key === 'ArrowRight') handleNextImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [tour, onClose, galleryList.length]);

  if (!tour) return null;

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? galleryList.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === galleryList.length - 1 ? 0 : prev + 1));
  };

  const scrollToSection = (tab: 'overview' | 'itinerary' | 'stay-meals' | 'policies') => {
    setActiveTab(tab);
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
    price: currentPrice
  });

  const places = Array.isArray(tour.placesCovered) && tour.placesCovered.length > 0
    ? tour.placesCovered
    : typeof tour.route === 'string' && tour.route.includes('-')
    ? tour.route.split('-').map((p) => p.trim()).filter(Boolean)
    : [tour.destination || 'Scenic & Holy Locations'];

  // Route arrows formatted nicely like: Port Blair(2N) → Havelock(2N) → Neil Island(1N)
  const routeDisplay = places.length > 1 ? places.join('  →  ') : tour.route || tour.destination || 'Customised Route';

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

  return (
    <div
      className="fixed inset-0 z-[100] overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-0 sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white text-slate-800 w-full max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl min-h-screen sm:min-h-0 sm:rounded-2xl overflow-hidden shadow-2xl flex flex-col sm:max-h-[92vh] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ✦ 1. TOP BRAND HEADER (Exact Holidify Style with Logo & Clean Navigation) ✦ */}
        <div className="bg-white border-b border-slate-200 px-4 py-2.5 flex items-center justify-between shrink-0 sticky top-0 z-30 shadow-xs">
          {/* Brand Logo */}
          <div className="flex items-center gap-2">
            <span className="text-[#ea384d] font-bold text-xl sm:text-2xl tracking-tight font-serif flex items-center gap-1">
              <span className="w-6 h-6 rounded-full bg-[#ea384d] text-white flex items-center justify-center text-xs">✦</span>
              Mannat<span className="text-slate-800 font-sans font-semibold text-lg sm:text-xl">Tours</span>
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={handleShare}
              title="Share package"
              className="p-2 rounded-full hover:bg-slate-100 text-slate-600 transition cursor-pointer"
            >
              <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="p-1.5 sm:p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ✦ 2. SUB-NAVIGATION TABS (Overview | Itinerary | Stay & Meals | Policies) ✦ */}
        <div className="bg-white border-b border-slate-200 px-4 flex items-center gap-6 sm:gap-8 text-xs sm:text-sm font-semibold text-slate-600 overflow-x-auto shrink-0 scrollbar-none sticky top-[49px] z-20">
          <button
            type="button"
            onClick={() => scrollToSection('overview')}
            className={`py-2.5 border-b-2 whitespace-nowrap transition cursor-pointer ${
              activeTab === 'overview'
                ? 'border-[#ea384d] text-[#ea384d] font-bold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Overview
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('itinerary')}
            className={`py-2.5 border-b-2 whitespace-nowrap transition cursor-pointer ${
              activeTab === 'itinerary'
                ? 'border-[#ea384d] text-[#ea384d] font-bold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Itinerary
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('stay-meals')}
            className={`py-2.5 border-b-2 whitespace-nowrap transition cursor-pointer ${
              activeTab === 'stay-meals'
                ? 'border-[#ea384d] text-[#ea384d] font-bold'
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
                ? 'border-[#ea384d] text-[#ea384d] font-bold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Policies
          </button>
        </div>

        {/* ✦ 3. SCROLLABLE BODY CONTENT (Holidify Exact Visual Hierarchy) ✦ */}
        <div ref={contentContainerRef} className="overflow-y-auto flex-1 divide-y divide-slate-100">
          
          {/* Top Big Hero Image with Left & Right Arrow Scrollers */}
          <div className="relative aspect-[16/10] sm:aspect-[16/8] bg-slate-900 w-full overflow-hidden select-none">
            <img
              src={currentDisplayImage}
              alt={tour.title}
              className="w-full h-full object-cover transition-all duration-300"
            />

            {/* Left Arrow Scroller */}
            {galleryList.length > 1 && (
              <button
                type="button"
                onClick={handlePrevImage}
                aria-label="Previous Photo"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center transition shadow-lg z-10 cursor-pointer active:scale-95"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            )}

            {/* Right Arrow Scroller */}
            {galleryList.length > 1 && (
              <button
                type="button"
                onClick={handleNextImage}
                aria-label="Next Photo"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center transition shadow-lg z-10 cursor-pointer active:scale-95"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            )}

            {/* Image Counter & Badge */}
            <div className="absolute bottom-3 right-3 flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-black/60 text-white backdrop-blur-md">
                {currentImageIndex + 1} / {galleryList.length} Photos
              </span>
            </div>

            <div className="absolute top-3 left-3 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#ea384d] text-white shadow-sm">
                {tour.badge || tour.category}
              </span>
              {isUrgent && (
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500 text-slate-950 animate-pulse shadow-sm">
                  Only {availableSeats} Seats Left!
                </span>
              )}
            </div>
          </div>

          {/* ✦ 4. MAIN PACKAGE OVERVIEW SECTION (Title, Route, Tier Pills, Price, Offers) ✦ */}
          <div ref={overviewRef} className="p-4 sm:p-6 space-y-4">
            
            {/* Title & Duration */}
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                {tour.title}
              </h1>
              <div className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
                Duration: <span className="text-slate-800">{tour.duration}</span>
              </div>
            </div>

            {/* Route Breadcrumb Strip: Port Blair(2N) → Havelock(2N) → Neil Island(1N) */}
            <div className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <span className="font-semibold text-slate-900 block mb-0.5 text-xs text-slate-500 uppercase tracking-wider">
                Route & Stops:
              </span>
              <span className="text-[#ea384d] font-semibold">{routeDisplay}</span>
            </div>

            {/* Category Tier Selector Pills: Budget | Mid-Range | Premium */}
            <div>
              <div className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">
                Select Package Tier:
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setTierPlan('budget')}
                  className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition border cursor-pointer ${
                    tierPlan === 'budget'
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
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
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
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
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-300 hover:border-slate-500'
                  }`}
                >
                  Premium
                </button>
              </div>
            </div>

            {/* Stay Rating and Price Details */}
            <div className="pt-2">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Bed className="w-3.5 h-3.5 text-slate-600" />
                <span>STAY: {hotelRatingText}</span>
              </div>

              <div className="flex items-baseline gap-2.5 mt-1.5">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  ₹ {currentPrice.toLocaleString('en-IN')}
                </span>
                {currentOriginalPrice > currentPrice && (
                  <span className="text-sm text-slate-400 line-through">
                    ₹ {currentOriginalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-xs text-slate-500">/ person</span>
              </div>
            </div>

            {/* Big Primary Action: "Get Customized Offers" (Pink-Red gradient button from Holidify screenshot) */}
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

              {/* Informative reassurance caption like screenshot */}
              <p className="text-[11px] sm:text-xs text-slate-500 text-center mt-2.5 leading-relaxed px-2">
                100% verified mountain drivers, transparent itinerary, satvik meals & instantaneous quotes direct from our Muzaffarnagar desk.
              </p>
            </div>

          </div>

          {/* ✦ 5. DETAILED ITINERARY SECTION (Accordion Style Day by Day) ✦ */}
          <div ref={itineraryRef} className="p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                Detailed Itinerary
              </h2>
              {Array.isArray(tour.itinerary) && tour.itinerary.length > 0 && (
                <span className="text-xs font-semibold text-slate-500">
                  {tour.itinerary.length} Days Schedule
                </span>
              )}
            </div>

            {Array.isArray(tour.itinerary) && tour.itinerary.length > 0 ? (
              <div className="space-y-3">
                {tour.itinerary.map((dayItem, idx) => {
                  const isOpen = openItineraryIndex === idx;
                  return (
                    <div
                      key={idx}
                      className="border border-slate-200 rounded-xl overflow-hidden transition-all bg-white"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenItineraryIndex(isOpen ? null : idx)}
                        className="w-full p-3.5 sm:p-4 text-left flex items-center justify-between gap-3 hover:bg-slate-50 transition cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold text-xs shrink-0">
                            Day {dayItem.day}
                          </span>
                          <span className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-1">
                            {dayItem.title}
                          </span>
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                            isOpen ? 'rotate-180 text-[#ea384d]' : ''
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                          {dayItem.desc}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-slate-50 text-slate-600 text-xs sm:text-sm leading-relaxed border border-slate-200">
                <p className="font-semibold text-slate-800 mb-1">Customised Tour Program Available</p>
                <p>{tour.description || 'Full detailed schedule including scenic transfers, hotel check-ins, VIP darshan passes, and local mountain sightseeing provided on WhatsApp inquiry.'}</p>
              </div>
            )}
          </div>

          {/* ✦ 6. STAY & MEALS SECTION (Inclusions & In-house Services) ✦ */}
          <div ref={stayMealsRef} className="p-4 sm:p-6 space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">
              <Utensils className="w-5 h-5 text-[#ea384d]" />
              <span>Stay & Meals Overview</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200/80 space-y-2.5">
                <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Inclusions (What's Included)</span>
                </div>
                <ul className="space-y-1.5 text-slate-700 text-xs sm:text-sm">
                  {inclusions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-rose-50/80 border border-rose-200/80 space-y-2.5">
                <div className="flex items-center gap-1.5 text-rose-800 font-bold text-xs uppercase tracking-wider">
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                  <span>Exclusions (Not Included)</span>
                </div>
                <ul className="space-y-1.5 text-slate-700 text-xs sm:text-sm">
                  {exclusions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold">✕</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Boarding Point */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm flex items-start gap-2.5 text-slate-700">
              <Clock className="w-4 h-4 text-[#ea384d] shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block font-semibold mb-0.5">
                  Boarding & Departure Points:
                </strong>
                <span>{boarding}</span>
              </div>
            </div>
          </div>

          {/* ✦ 7. POLICIES & TERMS ✦ */}
          <div ref={policiesRef} className="p-4 sm:p-6 space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b border-slate-200 pb-2">
              Booking Policies & Verification
            </h2>
            <ul className="text-xs sm:text-sm text-slate-600 space-y-2 list-disc pl-4">
              <li>Token advance of ₹1,000 to ₹5,000 locks your seats or vehicle booking.</li>
              <li>Balance amount payable at the time of boarding or upon arrival in hotel.</li>
              <li>Government valid Photo ID (Aadhaar Card / Voter ID) mandatory for all passengers.</li>
              <li>Dedicated customer manager available 24/7 during the entire journey.</li>
            </ul>
          </div>

        </div>

        {/* ✦ 8. BOTTOM STICKY BAR (Direct Call & WhatsApp Action) ✦ */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-center justify-between gap-3 shrink-0 shadow-lg">
          <div className="flex items-center gap-2">
            <a
              href={`tel:${SITE_INFO.phone}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-800 font-bold text-xs sm:text-sm transition cursor-pointer"
            >
              <Phone className="w-4 h-4 text-[#ea384d]" />
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
          <div className="absolute top-14 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-3 py-1.5 rounded-full shadow-lg z-50 animate-fade-in">
            Link copied to clipboard!
          </div>
        )}

      </div>
    </div>
  );
};
