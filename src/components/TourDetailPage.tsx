import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  Phone,
  MessageCircle,
  Star,
  Clock,
  MapPin,
  Calendar,
  Users,
  ShieldCheck,
  Check,
  X,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Share2,
  Compass,
  Bus,
  BedDouble,
  Utensils,
  Award,
  HelpCircle,
  Camera,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Sun,
  Moon,
  Info
} from 'lucide-react';
import {
  TourItem,
  SITE_INFO,
  getWhatsAppBookingUrl,
  getDestinationImage,
  getDestinationGallery
} from '../data/mannatData';

interface TourDetailPageProps {
  tour: TourItem;
  theme?: 'dark' | 'light';
  allTours?: TourItem[];
  onSelectTour: (tour: TourItem) => void;
  onBack: () => void;
  onOpenQuote?: () => void;
  onOpenCustomerAuth?: () => void;
  onOpenAdmin?: () => void;
  onToggleTheme?: () => void;
}

export const TourDetailPage: React.FC<TourDetailPageProps> = ({
  tour,
  theme = 'dark',
  allTours = [],
  onSelectTour,
  onBack,
  onOpenQuote,
  onOpenCustomerAuth,
  onOpenAdmin,
  onToggleTheme
}) => {
  const isDark = theme === 'dark';

  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<'overview' | 'itinerary' | 'hotels' | 'inclusions' | 'route' | 'policies' | 'faqs'>('overview');
  const [tierPlan, setTierPlan] = useState<'budget' | 'mid-range' | 'luxury'>('mid-range');
  const [openItineraryIndex, setOpenItineraryIndex] = useState<number | null>(0);
  const [expandAllDays, setExpandAllDays] = useState(false);
  const [guestCount, setGuestCount] = useState(2);
  const [showShareToast, setShowShareToast] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Quick inquiry form in sidebar
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquirySent, setInquirySent] = useState(false);

  // Scroll section refs
  const overviewRef = useRef<HTMLDivElement>(null);
  const itineraryRef = useRef<HTMLDivElement>(null);
  const hotelsRef = useRef<HTMLDivElement>(null);
  const inclusionsRef = useRef<HTMLDivElement>(null);
  const routeRef = useRef<HTMLDivElement>(null);
  const policiesRef = useRef<HTMLDivElement>(null);
  const faqsRef = useRef<HTMLDivElement>(null);

  // Scroll to top when tour changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setOpenItineraryIndex(0);
    setExpandAllDays(false);
  }, [tour?.id]);

  // Gallery resolution
  const fallbackImage = getDestinationImage(`${tour.title} ${tour.destination || ''} ${tour.route || ''}`);
  const galleryList: string[] = Array.isArray(tour.galleryImages) && tour.galleryImages.length > 0
    ? tour.galleryImages.filter(Boolean)
    : getDestinationGallery(`${tour.title} ${tour.destination || ''}`, tour.image || fallbackImage);

  // Ensure at least 4 images for the Holidify 5-photo collage
  const collageImages: string[] = [...galleryList];
  while (collageImages.length < 5) {
    collageImages.push(collageImages[collageImages.length % galleryList.length] || fallbackImage);
  }

  // Pricing calculations
  const basePrice = Number(tour.price || 0);
  const originalPrice = Number(tour.originalPrice || 0);
  const tierMultiplier = tierPlan === 'budget' ? 1 : tierPlan === 'mid-range' ? 1.25 : 1.55;
  const currentPricePerPerson = Math.round(basePrice * tierMultiplier);
  const currentOriginalPrice = originalPrice > 0
    ? Math.round(originalPrice * tierMultiplier)
    : Math.round(currentPricePerPerson * 1.25);
  const totalPrice = currentPricePerPerson * guestCount;
  const savingsPerPerson = currentOriginalPrice > currentPricePerPerson ? currentOriginalPrice - currentPricePerPerson : 0;

  // Boarding & Places
  const boarding = tour.boardingLocation || tour.boardingPoints || 'Muzaffarnagar, Meerut & Delhi NCR';
  const places = Array.isArray(tour.placesCovered) && tour.placesCovered.length > 0
    ? tour.placesCovered
    : typeof tour.route === 'string' && tour.route.includes('-')
    ? tour.route.split('-').map((p) => p.trim()).filter(Boolean)
    : [tour.destination || 'Holy & Scenic Spots'];

  // Inclusions & Exclusions
  const inclusions = Array.isArray(tour.inclusions) && tour.inclusions.length > 0
    ? tour.inclusions
    : [
        'Comfortable Deluxe 2x2 AC Pushback Coach / Private Sedan Cab',
        'Clean Sanitized Hotel / Resort Stay (Twin / Triple Sharing)',
        'Pure Satvik Vegetarian Breakfast & Delicious Dinners',
        'Temple VIP Darshan Coordination & Experienced Tour Captain',
        'All State Border Toll Taxes, Parking & Road Permits'
      ];

  const exclusions = [
    'Personal shopping, pooja samagri & individual donations',
    'VIP priority fast-track entry passes or specialized camera permits',
    'Room service, laundry, extra alcoholic beverages, or personal medical expenses',
    'Any additional activities like paragliding, river rafting, pony / helicopter ride'
  ];

  // Itinerary items
  const itinerary = Array.isArray(tour.itinerary) && tour.itinerary.length > 0
    ? tour.itinerary
    : [
        {
          day: 1,
          title: 'Departure & Scenic Journey into Devbhoomi',
          desc: 'Morning departure from Muzaffarnagar / Meerut in Deluxe 2x2 AC Tourist Coach. Enjoy a scenic journey through lush green foothills, devotional bhajans on board, arrival at destination, hotel check-in, and evening local aarti or relaxation.'
        },
        {
          day: 2,
          title: 'Holy Darshan, Sacred Temples & Local Sightseeing',
          desc: 'Early morning holy bath, priority darshan at the main revered temple / shrine, attend divine aarti, participate in temple prasad distribution, visit surrounding sacred spots, viewpoints, and evening cultural leisure.'
        },
        {
          day: 3,
          title: 'Morning Spiritual Blessings & Comfortable Return',
          desc: 'Final morning aarti and blessings, delicious buffet breakfast, check-out, souvenir shopping for sacred prasad and local handicrafts, followed by a comfortable journey back with safe drop-off at your boarding point.'
        }
      ];

  // Similar tours for bottom section
  const relatedTours = allTours
    .filter((t) => t.id !== tour.id)
    .slice(0, 3);

  // Smooth scroll to sections
  const scrollTo = (section: 'overview' | 'itinerary' | 'hotels' | 'inclusions' | 'route' | 'policies' | 'faqs') => {
    setActiveTab(section);
    let el: HTMLElement | null = null;
    if (section === 'overview') el = overviewRef.current;
    if (section === 'itinerary') el = itineraryRef.current;
    if (section === 'hotels') el = hotelsRef.current;
    if (section === 'inclusions') el = inclusionsRef.current;
    if (section === 'route') el = routeRef.current;
    if (section === 'policies') el = policiesRef.current;
    if (section === 'faqs') el = faqsRef.current;

    if (el) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // WhatsApp Booking Link
  const customWhatsAppUrl = getWhatsAppBookingUrl({
    ...tour,
    price: currentPricePerPerson,
    boardingLocation: `${boarding} (${guestCount} Guests, ${tierPlan.toUpperCase()} Plan)`
  });

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: tour.title,
        text: `Check out ${tour.title} on Mannat Tour and Travels`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2500);
    }
  };

  const handleQuickInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryPhone.trim()) return;

    const msg = `Namaste Mannat Travels 🙏\nI want a callback for:\n\n*Tour:* ${tour.title}\n*Name:* ${inquiryName || 'Guest'}\n*Phone:* ${inquiryPhone}\n*Guests:* ${guestCount}\n*Tier:* ${tierPlan}\n\nPlease call me back with the best rate!`;
    const waUrl = `https://wa.me/${SITE_INFO.whatsappRaw}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
    setInquirySent(true);
    setTimeout(() => setInquirySent(false), 4000);
  };

  return (
    <div className={`min-h-screen w-full transition-colors duration-200 ${isDark ? 'bg-[#080C15] text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* ✦ 1. HOLIDIFY-STYLE TOP NAVBAR ✦ */}
      <header className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors ${
        isDark ? 'bg-[#0A0F1D]/95 border-slate-800' : 'bg-white/95 border-slate-200 shadow-xs'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Back button & Brand Logo */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={onBack}
              className={`p-2 rounded-xl border flex items-center gap-1.5 text-xs sm:text-sm font-bold transition cursor-pointer active:scale-95 ${
                isDark
                  ? 'border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-white hover:border-[#f1683a]'
                  : 'border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-800'
              }`}
            >
              <ArrowLeft className="w-4 h-4 text-[#f1683a]" />
              <span className="hidden sm:inline">All Packages</span>
            </button>

            <div
              onClick={onBack}
              className="flex items-center gap-2 cursor-pointer select-none"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#f1683a] to-amber-500 text-slate-950 flex items-center justify-center text-sm font-black shadow-sm">
                ✦
              </div>
              <div className="leading-tight">
                <span className="font-serif font-bold text-lg sm:text-xl tracking-tight block">
                  Mannat <span className="text-[#f1683a]">Tours</span>
                </span>
                <span className="text-[10px] text-slate-400 tracking-wider hidden sm:block">
                  Luxury Pilgrimages & Holidays
                </span>
              </div>
            </div>
          </div>

          {/* Right Header Hotline & Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {onToggleTheme && (
              <button
                type="button"
                onClick={onToggleTheme}
                aria-label="Toggle Dark / Light Theme"
                className={`p-2 rounded-xl border transition cursor-pointer ${
                  isDark ? 'border-slate-800 bg-slate-900 text-amber-400' : 'border-slate-200 bg-slate-100 text-slate-700'
                }`}
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            )}

            <button
              type="button"
              onClick={handleShare}
              title="Share package"
              className={`p-2 rounded-xl border transition cursor-pointer ${
                isDark ? 'border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-300' : 'border-slate-200 bg-slate-100 text-slate-700'
              }`}
            >
              <Share2 className="w-4 h-4" />
            </button>

            <a
              href={`tel:${SITE_INFO.phone}`}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-700 bg-slate-900/80 hover:border-amber-400 text-white text-xs font-bold transition"
            >
              <Phone className="w-3.5 h-3.5 text-[#f1683a]" />
              <span>{SITE_INFO.phone}</span>
            </a>

            <a
              href={customWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md shadow-emerald-950/40 active:scale-95 transition"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Book via WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      {/* Share Toast */}
      {showShareToast && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white px-4 py-2 rounded-xl shadow-2xl text-xs font-bold flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>Package link copied to clipboard!</span>
        </div>
      )}

      {/* ✦ 2. BREADCRUMB & HEADER TITLE SECTION ✦ */}
      <div className={`border-b ${isDark ? 'bg-[#0C1222] border-slate-800/80' : 'bg-white border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          
          {/* Breadcrumb path */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-2 overflow-x-auto whitespace-nowrap scrollbar-none">
            <button onClick={onBack} className="hover:text-amber-400 transition cursor-pointer">
              Home
            </button>
            <span>/</span>
            <button onClick={onBack} className="hover:text-amber-400 transition cursor-pointer">
              Packages
            </button>
            <span>/</span>
            <span className="text-amber-400 font-medium">
              {tour.destination || 'North India'}
            </span>
            <span>/</span>
            <span className={`truncate max-w-[200px] sm:max-w-none ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              {tour.title}
            </span>
          </nav>

          {/* Title & Metadata */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold bg-[#f1683a] text-white shadow-xs">
                  {tour.badge || tour.category || 'Featured'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <Star className="w-3 h-3 fill-emerald-400 text-emerald-400" />
                  <span>4.9 / 5.0 (140+ Reviews)</span>
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-mono font-medium ${
                  isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'
                }`}>
                  Duration: {tour.duration}
                </span>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                {tour.title}
              </h1>

              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 mt-2 flex-wrap">
                <MapPin className="w-4 h-4 text-[#f1683a] shrink-0" />
                <span><strong>Starting / Boarding:</strong> {boarding}</span>
              </div>
            </div>

            {/* Price Preview on Desktop Header */}
            <div className="hidden lg:flex items-center gap-4 shrink-0 pl-6 border-l border-slate-800">
              <div className="text-right">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-semibold">
                  Starting Price
                </span>
                <div className="flex items-baseline gap-2">
                  {currentOriginalPrice > currentPricePerPerson && (
                    <span className="text-sm text-slate-500 line-through">
                      ₹{currentOriginalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  <span className="text-2xl font-black text-amber-400">
                    ₹{currentPricePerPerson.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-slate-400 font-normal">/ person</span>
                </div>
              </div>

              <a
                href={customWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#ea384d] hover:bg-[#d42d41] text-white font-bold text-xs rounded-xl shadow-lg transition active:scale-95"
              >
                Instant Book →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ✦ 3. HOLIDIFY-STYLE 5-PHOTO COLLAGE SHOWCASE ✦ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Desktop View: 5-Photo Holidify Grid Collage */}
        <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-3 h-[420px] rounded-2xl overflow-hidden relative shadow-2xl">
          
          {/* Main Huge Hero Photo (Col 1-2, Row 1-2) */}
          <div
            onClick={() => {
              setLightboxIndex(0);
              setLightboxOpen(true);
            }}
            className="col-span-2 row-span-2 relative group cursor-pointer overflow-hidden bg-slate-950"
          >
            <img
              src={collageImages[0]}
              alt={tour.title}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              onError={(e) => {
                if (!e.currentTarget.src.includes(fallbackImage)) {
                  e.currentTarget.src = fallbackImage;
                }
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
            <div className="absolute bottom-4 left-4 text-white">
              <span className="text-xs uppercase tracking-wider font-semibold text-amber-400 block mb-1">
                Main Destination
              </span>
              <p className="font-serif text-lg font-bold">{tour.destination || tour.title}</p>
            </div>
          </div>

          {/* Photo 2 (Top Middle) */}
          <div
            onClick={() => {
              setLightboxIndex(1);
              setLightboxOpen(true);
            }}
            className="relative group cursor-pointer overflow-hidden bg-slate-950"
          >
            <img
              src={collageImages[1]}
              alt={`${tour.title} preview 2`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                if (!e.currentTarget.src.includes(fallbackImage)) {
                  e.currentTarget.src = fallbackImage;
                }
              }}
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
          </div>

          {/* Photo 3 (Top Right) */}
          <div
            onClick={() => {
              setLightboxIndex(2);
              setLightboxOpen(true);
            }}
            className="relative group cursor-pointer overflow-hidden bg-slate-950"
          >
            <img
              src={collageImages[2]}
              alt={`${tour.title} preview 3`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                if (!e.currentTarget.src.includes(fallbackImage)) {
                  e.currentTarget.src = fallbackImage;
                }
              }}
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
          </div>

          {/* Photo 4 (Bottom Middle) */}
          <div
            onClick={() => {
              setLightboxIndex(3);
              setLightboxOpen(true);
            }}
            className="relative group cursor-pointer overflow-hidden bg-slate-950"
          >
            <img
              src={collageImages[3]}
              alt={`${tour.title} preview 4`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                if (!e.currentTarget.src.includes(fallbackImage)) {
                  e.currentTarget.src = fallbackImage;
                }
              }}
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
          </div>

          {/* Photo 5 (Bottom Right with "View All Photos" Overlay) */}
          <div
            onClick={() => {
              setLightboxIndex(4);
              setLightboxOpen(true);
            }}
            className="relative group cursor-pointer overflow-hidden bg-slate-950"
          >
            <img
              src={collageImages[4]}
              alt={`${tour.title} preview 5`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                if (!e.currentTarget.src.includes(fallbackImage)) {
                  e.currentTarget.src = fallbackImage;
                }
              }}
            />
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 flex flex-col items-center justify-center text-white transition-colors">
              <Camera className="w-6 h-6 mb-1 text-amber-400 group-hover:scale-110 transition-transform" />
              <span className="font-bold text-sm tracking-wide">
                View All {galleryList.length} Photos
              </span>
            </div>
          </div>
        </div>

        {/* Mobile View: Swipeable Banner + Horizontal Thumbnail Strip */}
        <div className="md:hidden space-y-2">
          <div
            onClick={() => {
              setLightboxIndex(0);
              setLightboxOpen(true);
            }}
            className="relative h-64 w-full rounded-2xl overflow-hidden shadow-lg cursor-pointer bg-slate-950"
          >
            <img
              src={galleryList[0] || fallbackImage}
              alt={tour.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                if (!e.currentTarget.src.includes(fallbackImage)) {
                  e.currentTarget.src = fallbackImage;
                }
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 text-white">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#f1683a]">
                {tour.badge || 'Featured'}
              </span>
              <p className="font-serif text-base font-bold mt-1">{tour.title}</p>
            </div>
            <button
              type="button"
              className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-black/80 text-white backdrop-blur-md border border-white/20 flex items-center gap-1.5"
            >
              <Camera className="w-3.5 h-3.5 text-amber-400" />
              <span>{galleryList.length} Photos</span>
            </button>
          </div>

          {/* Horizontal Thumbnails Bar */}
          {galleryList.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
              {galleryList.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setLightboxIndex(idx);
                    setLightboxOpen(true);
                  }}
                  className="w-16 h-12 rounded-xl overflow-hidden shrink-0 border border-slate-700/60 shadow-xs cursor-pointer active:scale-95"
                >
                  <img
                    src={img}
                    alt={`Photo ${idx + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      if (!e.currentTarget.src.includes(fallbackImage)) {
                        e.currentTarget.src = fallbackImage;
                      }
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ✦ 4. STICKY SUB-NAV TABS BAR (Holidify Anchor Navigation) ✦ */}
      <div className={`sticky top-16 z-30 border-y transition-colors ${
        isDark ? 'bg-[#0B101E]/95 border-slate-800' : 'bg-white/95 border-slate-200 shadow-xs'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 sm:gap-6 overflow-x-auto scrollbar-none py-1">
          <button
            type="button"
            onClick={() => scrollTo('overview')}
            className={`py-2.5 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition cursor-pointer ${
              activeTab === 'overview'
                ? 'border-[#f1683a] text-[#f1683a]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            type="button"
            onClick={() => scrollTo('itinerary')}
            className={`py-2.5 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition cursor-pointer ${
              activeTab === 'itinerary'
                ? 'border-[#f1683a] text-[#f1683a]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Day-by-Day Itinerary
          </button>
          <button
            type="button"
            onClick={() => scrollTo('hotels')}
            className={`py-2.5 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition cursor-pointer ${
              activeTab === 'hotels'
                ? 'border-[#f1683a] text-[#f1683a]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Stay & Meals
          </button>
          <button
            type="button"
            onClick={() => scrollTo('inclusions')}
            className={`py-2.5 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition cursor-pointer ${
              activeTab === 'inclusions'
                ? 'border-[#f1683a] text-[#f1683a]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Inclusions
          </button>
          <button
            type="button"
            onClick={() => scrollTo('route')}
            className={`py-2.5 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition cursor-pointer ${
              activeTab === 'route'
                ? 'border-[#f1683a] text-[#f1683a]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Route Map
          </button>
          <button
            type="button"
            onClick={() => scrollTo('policies')}
            className={`py-2.5 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition cursor-pointer ${
              activeTab === 'policies'
                ? 'border-[#f1683a] text-[#f1683a]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Policies
          </button>
          <button
            type="button"
            onClick={() => scrollTo('faqs')}
            className={`py-2.5 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition cursor-pointer ${
              activeTab === 'faqs'
                ? 'border-[#f1683a] text-[#f1683a]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            FAQs
          </button>
        </div>
      </div>

      {/* ✦ 5. TWO-COLUMN HOLIDIFY LAYOUT (Content 68% + Sticky Sidebar 32%) ✦ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ════════ LEFT COLUMN (68% on Desktop) ════════ */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Quick Inclusions Bar / Holidify Highlights Grid */}
            <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 sm:p-5 rounded-2xl border ${
              isDark ? 'bg-[#0E1528] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className="flex items-start gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0">
                  <Bus className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block font-semibold uppercase">Transport</span>
                  <span className="text-xs sm:text-sm font-bold block">{tour.busType || 'Deluxe 2x2 AC Bus'}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0">
                  <BedDouble className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block font-semibold uppercase">Stay</span>
                  <span className="text-xs sm:text-sm font-bold block">
                    {tierPlan === 'budget' ? 'Standard 2★' : tierPlan === 'mid-range' ? 'Deluxe 3★' : 'Luxury 4★'}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0">
                  <Utensils className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block font-semibold uppercase">Meals</span>
                  <span className="text-xs sm:text-sm font-bold block">Pure Satvik Food</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block font-semibold uppercase">Darshan</span>
                  <span className="text-xs sm:text-sm font-bold block">Guided VIP Support</span>
                </div>
              </div>
            </div>

            {/* SECTION 1: Overview & Places Covered */}
            <section ref={overviewRef} className="space-y-4">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#f1683a]" />
                <h2 className="font-serif text-2xl font-bold tracking-tight">
                  Package Overview
                </h2>
              </div>

              <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {tour.description}
              </p>

              {/* Places Covered Tag Pills */}
              <div className="pt-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Key Attractions & Holy Shrines Covered:
                </span>
                <div className="flex flex-wrap gap-2">
                  {places.map((place, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border ${
                        isDark ? 'bg-slate-900 border-slate-800 text-amber-300' : 'bg-slate-100 border-slate-200 text-slate-800'
                      }`}
                    >
                      <MapPin className="w-3 h-3 text-[#f1683a]" />
                      <span>{place}</span>
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 2: Detailed Day-by-Day Itinerary (The Holidify Signature Timeline) */}
            <section ref={itineraryRef} className="space-y-4 pt-6 border-t border-slate-800/80">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#f1683a]" />
                  <h2 className="font-serif text-2xl font-bold tracking-tight">
                    Day-by-Day Detailed Itinerary
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setExpandAllDays(!expandAllDays)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition cursor-pointer self-start sm:self-auto ${
                    isDark ? 'border-slate-700 bg-slate-900 hover:border-amber-400 text-amber-300' : 'border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  {expandAllDays ? 'Collapse All Days' : 'Expand All Days'}
                </button>
              </div>

              {/* Interactive Timeline */}
              <div className="space-y-3.5 relative pl-4 sm:pl-6 border-l-2 border-amber-500/30 ml-2">
                {itinerary.map((dayPlan, index) => {
                  const isOpen = expandAllDays || openItineraryIndex === index;
                  return (
                    <div
                      key={index}
                      className={`rounded-2xl border transition-all overflow-hidden ${
                        isOpen
                          ? isDark
                            ? 'bg-[#0E1528] border-amber-500/40 shadow-lg'
                            : 'bg-white border-amber-500/40 shadow-md'
                          : isDark
                          ? 'bg-[#0A0F1D] border-slate-800 hover:border-slate-700'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {/* Timeline Dot Marker */}
                      <div className="absolute -left-[9px] mt-4 w-4 h-4 rounded-full bg-[#f1683a] border-2 border-[#080C15] flex items-center justify-center text-[8px] text-white font-bold" />

                      {/* Day Header Trigger */}
                      <button
                        type="button"
                        onClick={() => setOpenItineraryIndex(isOpen ? null : index)}
                        className="w-full p-4 sm:p-5 flex items-center justify-between gap-3 text-left transition cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#f1683a] to-amber-500 text-slate-950 font-black text-sm flex items-center justify-center shrink-0 shadow-sm">
                            D{dayPlan.day}
                          </span>
                          <div>
                            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                              Day {dayPlan.day} Schedule
                            </span>
                            <h3 className="font-bold text-sm sm:text-base leading-snug">
                              {dayPlan.title}
                            </h3>
                          </div>
                        </div>

                        <div className="p-1.5 rounded-lg bg-slate-800/60 text-slate-400">
                          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </button>

                      {/* Day Body Content */}
                      {isOpen && (
                        <div className={`px-5 pb-5 pt-1 text-sm space-y-3.5 border-t ${
                          isDark ? 'border-slate-800/80 text-slate-300' : 'border-slate-100 text-slate-700'
                        }`}>
                          <p className="leading-relaxed text-xs sm:text-sm">
                            {dayPlan.desc}
                          </p>

                          <div className={`p-3 rounded-xl flex flex-wrap items-center gap-4 text-xs font-semibold ${
                            isDark ? 'bg-slate-900/90 text-slate-300' : 'bg-slate-50 text-slate-600'
                          }`}>
                            <span className="flex items-center gap-1.5 text-amber-400">
                              <Utensils className="w-3.5 h-3.5" />
                              <span>Meals: Satvik Breakfast & Dinner</span>
                            </span>
                            <span className="flex items-center gap-1.5 text-emerald-400">
                              <BedDouble className="w-3.5 h-3.5" />
                              <span>Stay: Verified Mountain Hotel</span>
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 3: Stay & Hotel Tier Customization */}
            <section ref={hotelsRef} className="space-y-4 pt-6 border-t border-slate-800/80">
              <div className="flex items-center gap-2">
                <BedDouble className="w-5 h-5 text-[#f1683a]" />
                <h2 className="font-serif text-2xl font-bold tracking-tight">
                  Hotels & Accommodations
                </h2>
              </div>

              {/* Interactive Hotel Plan Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setTierPlan('budget')}
                  className={`p-4 rounded-2xl border text-left transition cursor-pointer ${
                    tierPlan === 'budget'
                      ? 'border-[#f1683a] bg-[#f1683a]/10 ring-1 ring-[#f1683a]'
                      : isDark
                      ? 'border-slate-800 bg-[#0E1528] hover:border-slate-700'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <span className="text-xs font-bold text-amber-400 block mb-1">Standard Deluxe</span>
                  <p className="font-serif font-bold text-base">2★ Deluxe Hotels</p>
                  <p className="text-xs text-slate-400 mt-1">Clean sanitized rooms, hot water, pure veg dining.</p>
                </button>

                <button
                  type="button"
                  onClick={() => setTierPlan('mid-range')}
                  className={`p-4 rounded-2xl border text-left transition cursor-pointer relative ${
                    tierPlan === 'mid-range'
                      ? 'border-[#f1683a] bg-[#f1683a]/10 ring-1 ring-[#f1683a]'
                      : isDark
                      ? 'border-slate-800 bg-[#0E1528] hover:border-slate-700'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#f1683a] text-white">
                    Recommended
                  </span>
                  <span className="text-xs font-bold text-amber-400 block mb-1">Executive Comfort</span>
                  <p className="font-serif font-bold text-base">3★ Mountain Resorts</p>
                  <p className="text-xs text-slate-400 mt-1">Balcony valley views, fast wifi, gourmet buffet meals.</p>
                </button>

                <button
                  type="button"
                  onClick={() => setTierPlan('luxury')}
                  className={`p-4 rounded-2xl border text-left transition cursor-pointer ${
                    tierPlan === 'luxury'
                      ? 'border-[#f1683a] bg-[#f1683a]/10 ring-1 ring-[#f1683a]'
                      : isDark
                      ? 'border-slate-800 bg-[#0E1528] hover:border-slate-700'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <span className="text-xs font-bold text-amber-400 block mb-1">Luxury Supreme</span>
                  <p className="font-serif font-bold text-base">4★ Luxury Stays</p>
                  <p className="text-xs text-slate-400 mt-1">Premium luxury suites, central heating, VIP service.</p>
                </button>
              </div>
            </section>

            {/* SECTION 4: Inclusions & Exclusions */}
            <section ref={inclusionsRef} className="space-y-4 pt-6 border-t border-slate-800/80">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#f1683a]" />
                <h2 className="font-serif text-2xl font-bold tracking-tight">
                  Inclusions & Exclusions
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* What's Included */}
                <div className={`p-5 rounded-2xl border ${
                  isDark ? 'bg-[#0A1715] border-emerald-900/60' : 'bg-emerald-50/50 border-emerald-200'
                }`}>
                  <h3 className="font-bold text-base text-emerald-400 flex items-center gap-2 mb-3.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>What is Included:</span>
                  </h3>
                  <ul className="space-y-2.5 text-xs sm:text-sm">
                    {inclusions.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What's Excluded */}
                <div className={`p-5 rounded-2xl border ${
                  isDark ? 'bg-[#170E10] border-red-900/60' : 'bg-red-50/50 border-red-200'
                }`}>
                  <h3 className="font-bold text-base text-red-400 flex items-center gap-2 mb-3.5">
                    <X className="w-5 h-5 text-red-400" />
                    <span>What is Not Included:</span>
                  </h3>
                  <ul className="space-y-2.5 text-xs sm:text-sm">
                    {exclusions.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                        <span className="text-slate-400">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* SECTION 5: Route & Pickup Details */}
            <section ref={routeRef} className="space-y-4 pt-6 border-t border-slate-800/80">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#f1683a]" />
                <h2 className="font-serif text-2xl font-bold tracking-tight">
                  Route & Travel Details
                </h2>
              </div>

              <div className={`p-5 rounded-2xl border space-y-3 ${
                isDark ? 'bg-[#0E1528] border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Complete Travel Route:
                  </span>
                  <p className="font-serif font-bold text-base text-amber-300">
                    {tour.route || `${boarding} → ${tour.destination}`}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800/60 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block font-semibold">Primary Boarding Points:</span>
                    <span className="text-slate-200">{boarding}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">Vehicle Type:</span>
                    <span className="text-slate-200">{tour.busType || 'Air-Conditioned 2x2 Deluxe Bus'}</span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: Policies & Guarantee */}
            <section ref={policiesRef} className="space-y-4 pt-6 border-t border-slate-800/80">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#f1683a]" />
                <h2 className="font-serif text-2xl font-bold tracking-tight">
                  Booking & Cancellation Policies
                </h2>
              </div>

              <div className={`p-5 rounded-2xl border space-y-3 text-xs sm:text-sm ${
                isDark ? 'bg-[#0E1528] border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
              }`}>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 font-bold text-xs">
                    1
                  </div>
                  <div>
                    <strong className="block text-white">Token Advance Booking:</strong>
                    A nominal advance token of ₹1,000 to ₹5,000 confirms your seats or private vehicle reservation.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 font-bold text-xs">
                    2
                  </div>
                  <div>
                    <strong className="block text-white">Balance Settlement:</strong>
                    Remaining balance amount can be settled at boarding point or upon checking in to the hotel.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 font-bold text-xs">
                    3
                  </div>
                  <div>
                    <strong className="block text-white">Government ID Mandatory:</strong>
                    Aadhaar Card, Voter ID, or Passport required for hotel check-ins and pilgrim biometric slips.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 font-bold text-xs">
                    4
                  </div>
                  <div>
                    <strong className="block text-white">24/7 Dedicated Manager:</strong>
                    An experienced on-trip tour captain travels with you or is available 24/7 via mobile.
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: FAQs */}
            <section ref={faqsRef} className="space-y-4 pt-6 border-t border-slate-800/80">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#f1683a]" />
                <h2 className="font-serif text-2xl font-bold tracking-tight">
                  Frequently Asked Questions (FAQs)
                </h2>
              </div>

              <div className="space-y-2.5">
                {[
                  {
                    q: 'Can the tour departure date be customized for private groups / families?',
                    a: 'Yes, absolutely! If you are a group of 4 or more, we can arrange dedicated private sedans, Innova, Ertiga, or private Tempo Travellers on any date of your preference.'
                  },
                  {
                    q: 'Is pure vegetarian and Jain satvik food available during the trip?',
                    a: 'Yes! All meals included in our packages are 100% pure vegetarian, hygienic, and cooked without onion-garlic if requested by Jain pilgrims.'
                  },
                  {
                    q: 'Is this tour suitable for senior citizens and elderly parents?',
                    a: 'Yes, our tours are specifically planned with comfortable rest stops, pushback seating, luggage assistance, and VIP priority darshan coordination whenever available.'
                  },
                  {
                    q: 'What should I pack for this trip?',
                    a: 'Warm jackets/thermal layers (especially for Kedarnath, Badrinath, Shimla, Manali & Kashmir), comfortable sports/trekking shoes, personal medications, and valid Government ID.'
                  }
                ].map((faq, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border ${
                      isDark ? 'bg-[#0E1528] border-slate-800' : 'bg-white border-slate-200'
                    }`}
                  >
                    <h4 className="font-bold text-sm text-amber-300 mb-1.5 flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-[#f1683a] shrink-0" />
                      <span>{faq.q}</span>
                    </h4>
                    <p className={`text-xs sm:text-sm pl-6 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* ════════ RIGHT COLUMN: HOLIDIFY STICKY BOOKING CARD (32% on Desktop) ════════ */}
          <aside className="lg:col-span-4 sticky top-24 space-y-4">
            
            {/* Main Sticky Pricing & Booking Card */}
            <div className={`p-5 sm:p-6 rounded-3xl border shadow-2xl relative overflow-hidden transition-all ${
              isDark
                ? 'bg-gradient-to-b from-[#111A30] to-[#0A0F1D] border-amber-500/30'
                : 'bg-white border-slate-200 shadow-xl'
            }`}>
              
              {/* Card Header Badge */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#f1683a] text-white">
                  Limited Seats Offer
                </span>
                {savingsPerPerson > 0 && (
                  <span className="text-[11px] font-bold text-emerald-400">
                    Save ₹{savingsPerPerson.toLocaleString('en-IN')} / person
                  </span>
                )}
              </div>

              {/* Price Display */}
              <div className="mb-4">
                <span className="text-[10px] uppercase font-semibold text-slate-400 block tracking-wider">
                  Super Deal Price
                </span>
                <div className="flex items-baseline gap-2">
                  {currentOriginalPrice > currentPricePerPerson && (
                    <span className="text-base text-slate-500 line-through">
                      ₹{currentOriginalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  <span className="text-3xl sm:text-4xl font-black text-amber-400">
                    ₹{currentPricePerPerson.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-slate-400 font-normal">/ person</span>
                </div>
              </div>

              {/* Guest Counter */}
              <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 mb-4 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold block text-slate-200">Total Travelers</span>
                  <span className="text-[10px] text-slate-400">{guestCount} Guests Selected</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center cursor-pointer active:scale-95"
                  >
                    -
                  </button>
                  <span className="font-bold text-sm text-amber-400 w-4 text-center">
                    {guestCount}
                  </span>
                  <button
                    type="button"
                    onClick={() => setGuestCount(guestCount + 1)}
                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center cursor-pointer active:scale-95"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Total Fare calculation */}
              <div className="flex items-baseline justify-between mb-5 pb-4 border-b border-slate-800 text-sm">
                <span className="text-slate-400">Estimated Total Fare:</span>
                <span className="text-xl font-bold text-white">
                  ₹{totalPrice.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5">
                <a
                  href={customWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition active:scale-95 text-center"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Book via WhatsApp Now</span>
                </a>

                <a
                  href={`tel:${SITE_INFO.phone}`}
                  className="w-full py-3 px-4 rounded-xl border border-slate-700 hover:border-amber-400 bg-slate-800/80 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition active:scale-95 text-center"
                >
                  <Phone className="w-4 h-4 text-[#f1683a]" />
                  <span>Call Hotline: {SITE_INFO.phone}</span>
                </a>
              </div>

              {/* Quick Callback Request Box */}
              <div className="mt-5 pt-4 border-t border-slate-800/80">
                <span className="text-xs font-bold block mb-1 text-slate-200">
                  Need Customization or Group Discount?
                </span>
                <p className="text-[11px] text-slate-400 mb-2.5">
                  Leave your number and our tour specialist will call you in 5 minutes.
                </p>

                <form onSubmit={handleQuickInquiry} className="space-y-2">
                  <input
                    type="text"
                    placeholder="Your Name (Optional)"
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-amber-400"
                  />
                  <div className="flex gap-2">
                    <input
                      type="tel"
                      required
                      placeholder="10-digit Phone No."
                      value={inquiryPhone}
                      onChange={(e) => setInquiryPhone(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-amber-400"
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 rounded-lg bg-[#f1683a] hover:bg-[#d95325] text-white font-bold text-xs whitespace-nowrap active:scale-95 transition cursor-pointer"
                    >
                      Request
                    </button>
                  </div>
                </form>

                {inquirySent && (
                  <p className="text-xs font-bold text-emerald-400 mt-2">
                    ✓ Request sent! Our coordinator will contact you shortly.
                  </p>
                )}
              </div>

              {/* Trust badges footer */}
              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Verified Local Agency</span>
                </span>
                <span>Muzaffarnagar, UP</span>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* ✦ 6. RELATED / SIMILAR PACKAGES ✦ */}
      {relatedTours.length > 0 && (
        <section className={`border-t py-12 sm:py-16 ${
          isDark ? 'bg-[#070A12] border-slate-800/80' : 'bg-slate-100/60 border-slate-200'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold text-[#f1683a] uppercase tracking-wider block mb-1">
                  Recommended For You
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold">
                  Similar Popular Tour Packages
                </h2>
              </div>
              <button
                type="button"
                onClick={onBack}
                className="text-xs sm:text-sm font-bold text-amber-400 hover:underline cursor-pointer"
              >
                View All Packages →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedTours.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectTour(item)}
                  className={`group rounded-2xl border overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                    isDark
                      ? 'bg-[#0E1528] border-slate-800 hover:border-amber-400/50'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-[#f1683a] text-white">
                      {item.badge || item.category}
                    </div>
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] text-white bg-black/70 backdrop-blur-xs flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#f1683a]" />
                      <span>{item.duration}</span>
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <h3 className="font-serif font-bold text-base line-clamp-1 group-hover:text-amber-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Starting from</span>
                        <span className="font-bold text-amber-400 text-lg">
                          ₹{Number(item.price).toLocaleString('en-IN')}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-[#f1683a] group-hover:underline">
                        View Details →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ✦ 7. LIGHTBOX PHOTO VIEWER (Full Screen) ✦ */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-between p-4"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Lightbox Header */}
          <div className="w-full max-w-5xl flex items-center justify-between text-white py-2">
            <span className="font-serif font-bold text-sm sm:text-base">
              {tour.title} ({lightboxIndex + 1} / {galleryList.length})
            </span>
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Photo Container */}
          <div
            className="relative w-full max-w-5xl flex-1 flex items-center justify-center p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryList[lightboxIndex] || fallbackImage}
              alt={`Full view ${lightboxIndex + 1}`}
              className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl"
            />

            {/* Lightbox Nav Arrows */}
            {galleryList.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => setLightboxIndex((prev) => (prev === 0 ? galleryList.length - 1 : prev - 1))}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 hover:bg-[#f1683a] text-white flex items-center justify-center transition cursor-pointer"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={() => setLightboxIndex((prev) => (prev === galleryList.length - 1 ? 0 : prev + 1))}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 hover:bg-[#f1683a] text-white flex items-center justify-center transition cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Lightbox Thumbnails Strip */}
          <div
            className="w-full max-w-3xl flex items-center justify-center gap-2 overflow-x-auto py-2 scrollbar-none"
            onClick={(e) => e.stopPropagation()}
          >
            {galleryList.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setLightboxIndex(idx)}
                className={`w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition cursor-pointer ${
                  lightboxIndex === idx ? 'border-[#f1683a] scale-105' : 'border-transparent opacity-50 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ✦ 8. FULL SITE FOOTER ✦ */}
      <footer className={`border-t py-12 ${isDark ? 'bg-[#05080E] border-slate-800' : 'bg-slate-900 text-white border-slate-800'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-400 space-y-3">
          <p className="font-serif text-base font-bold text-white">
            {SITE_INFO.name} — Luxury Pilgrimages & Outstation Travels
          </p>
          <p>
            Office: {SITE_INFO.office} | Helpline: <a href={`tel:${SITE_INFO.phone}`} className="text-amber-400 underline">{SITE_INFO.phone}</a>
          </p>
          <p className="text-[11px] text-slate-500">
            © {new Date().getFullYear()} {SITE_INFO.name}. All Rights Reserved. Reg. Tour Operator Western Uttar Pradesh.
          </p>
        </div>
      </footer>
    </div>
  );
};
