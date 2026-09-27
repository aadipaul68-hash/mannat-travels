import React, { useEffect, useState } from 'react';
import { X, Calendar, MapPin, Check, Phone, MessageCircle, Play, Image as ImageIcon, Video, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { TourItem, SITE_INFO, getWhatsAppBookingUrl } from '../data/mannatData';

interface TourDetailModalProps {
  tour: TourItem | null;
  onClose: () => void;
}

export const TourDetailModal: React.FC<TourDetailModalProps> = ({ tour, onClose }) => {
  const [activeMediaTab, setActiveMediaTab] = useState<'photos' | 'video'>('photos');
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const galleryList: string[] = tour
    ? Array.isArray(tour.galleryImages) && tour.galleryImages.length > 0
      ? tour.galleryImages
      : [tour.image, '/images/kaichi-dham.jpg', '/images/ayodhya-banner.jpg']
    : [];

  useEffect(() => {
    if (!tour) return;
    setCurrentImageIndex(0);
    setActiveMediaTab('photos');
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

  const currentDisplayImage = galleryList[currentImageIndex] || tour.image;

  const availableSeats = Number(tour.availableSeats || 0);
  const isUrgent = availableSeats >= 1 && availableSeats <= 6;
  const price = Number(tour.price || 0);
  const originalPrice = Number(tour.originalPrice || 0);
  const hasDiscount = originalPrice > price && price > 0;
  const boarding = tour.boardingLocation || tour.boardingPoints || 'Muzaffarnagar, Meerut & Delhi NCR';
  const whatsappUrl = getWhatsAppBookingUrl(tour);

  const places = Array.isArray(tour.placesCovered) && tour.placesCovered.length > 0
    ? tour.placesCovered
    : typeof tour.route === 'string' && tour.route.includes('-')
    ? tour.route.split('-').map(p => p.trim()).filter(Boolean)
    : [tour.destination || 'Scenic & Holy Locations'];

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

  // Helper to extract YouTube video embed URL
  const getEmbedVideoUrl = (url?: string) => {
    if (!url) return null;
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };

  const embedUrl = getEmbedVideoUrl(tour.videoUrl || 'https://www.youtube.com/watch?v=F0Z7mYmE1gY');

  return (
    <div
      className="fixed inset-0 z-[100] overflow-y-auto bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-[#0E1422] border border-amber-500/30 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl my-4 sm:my-6 flex flex-col text-slate-100 max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner with image and Left/Right Arrow Scrollers */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] bg-slate-900 shrink-0 group select-none overflow-hidden">
          <img
            src={currentDisplayImage}
            alt={tour.title}
            className="w-full h-full object-cover transition-all duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E1422] via-[#0E1422]/40 to-transparent" />
          
          {/* Close Modal Button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-3 right-3 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition border border-white/20 z-20 cursor-pointer"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Left Arrow Scroller for photo switching */}
          {galleryList.length > 1 && (
            <button
              type="button"
              onClick={handlePrevImage}
              aria-label="Previous Photo"
              title="Previous photo"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/75 hover:bg-[#f1683a] text-white flex items-center justify-center transition-all duration-200 border border-white/25 hover:border-[#f1683a] shadow-xl hover:scale-110 z-20 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          )}

          {/* Right Arrow Scroller for photo switching */}
          {galleryList.length > 1 && (
            <button
              type="button"
              onClick={handleNextImage}
              aria-label="Next Photo"
              title="Next photo"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/75 hover:bg-[#f1683a] text-white flex items-center justify-center transition-all duration-200 border border-white/25 hover:border-[#f1683a] shadow-xl hover:scale-110 z-20 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          )}

          {/* Badges on Top Left */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
            <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold bg-amber-500 text-slate-950 shadow-sm">
              {tour.badge || tour.category}
            </span>
            {isUrgent && (
              <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold bg-red-600 text-white animate-pulse">
                Only {availableSeats} Seats Left!
              </span>
            )}
            {galleryList.length > 1 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-black/60 text-slate-200 backdrop-blur-md border border-white/10">
                {currentImageIndex + 1} / {galleryList.length} Photos
              </span>
            )}
          </div>

          {/* Title & Info on Bottom of Photo Banner */}
          <div className="absolute bottom-3 left-3 right-3 sm:left-5 sm:right-5 z-10">
            <h2 className="font-serif text-lg sm:text-2xl font-bold text-white drop-shadow-md">
              {tour.title}
            </h2>
            <div className="flex items-center gap-2 text-[11px] sm:text-xs text-amber-300 mt-1">
              <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 shrink-0" />
              <span>{tour.destination}</span>
              <span aria-hidden="true">·</span>
              <span>{tour.duration}</span>
            </div>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1 text-xs sm:text-sm">
          
          {/* Optional Video Preview Switcher */}
          {tour.videoUrl && (
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveMediaTab('photos')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                      activeMediaTab === 'photos'
                        ? 'bg-amber-500 text-slate-950 shadow-sm'
                        : 'bg-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Photos View</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveMediaTab('video')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                      activeMediaTab === 'video'
                        ? 'bg-[#f1683a] text-white shadow-sm'
                        : 'bg-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Watch Video Tour (वीडियो)</span>
                  </button>
                </div>
              </div>

              {activeMediaTab === 'video' && (
                <div className="rounded-xl overflow-hidden aspect-video bg-black/90 border border-slate-800 relative">
                  {embedUrl ? (
                    <iframe
                      src={embedUrl}
                      title={`${tour.title} Video Preview`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-2">
                      <Video className="w-8 h-8 text-[#f1683a]" />
                      <span>Video tour available on WhatsApp inquiry</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Price Bar */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/90 border border-amber-500/20 flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">
                Tour Package Rate
              </span>
              <div className="flex items-baseline gap-2">
                {hasDiscount && (
                  <span className="text-xs text-slate-500 line-through">
                    ₹{originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-xl sm:text-2xl font-bold text-amber-400">
                  ₹{price.toLocaleString('en-IN')}
                </span>
                <span className="text-[11px] text-slate-400">/ person all-inclusive</span>
              </div>
            </div>

            <div className="text-right text-xs">
              <span className="text-slate-400 block">Departure Date:</span>
              <span className="text-white font-semibold">{tour.departureDate || 'Upcoming Batch'}</span>
            </div>
          </div>

          {/* Places Covered Route Strip */}
          <div>
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-bold mb-2">
              Route & Darshan Places Covered
            </span>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {places.map((place, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-200 text-xs flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f1683a]" />
                  <span>{place}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Day Wise Itinerary */}
          {Array.isArray(tour.itinerary) && tour.itinerary.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-serif font-bold text-base text-white border-b border-slate-800 pb-2 flex items-center justify-between">
                <span>Detailed Day-by-Day Schedule</span>
                <span className="text-xs font-sans text-amber-400 font-semibold">{tour.itinerary.length} Days Itinerary</span>
              </h3>
              
              <div className="space-y-2.5">
                {tour.itinerary.map((dayItem, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/30 transition">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold text-[11px]">
                        Day {dayItem.day}
                      </span>
                      <h4 className="font-bold text-white text-xs sm:text-sm">
                        {dayItem.title}
                      </h4>
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed pl-1">
                      {dayItem.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Inclusions & Exclusions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Inclusions */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-emerald-900/30 space-y-2">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                <Check className="w-4 h-4" />
                <span>What Is Included</span>
              </div>
              <ul className="space-y-1.5 text-slate-300 text-xs">
                {inclusions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Exclusions */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-rose-900/30 space-y-2">
              <div className="flex items-center gap-1.5 text-rose-400 font-bold text-xs uppercase tracking-wider">
                <X className="w-4 h-4" />
                <span>Exclusions (Not Included)</span>
              </div>
              <ul className="space-y-1.5 text-slate-300 text-xs">
                {exclusions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-rose-400 font-bold">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Boarding Point Info */}
          <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/20 text-xs text-amber-200 flex items-start gap-2.5">
            <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-white mb-0.5">Boarding & Pickup Hubs:</strong>
              <span>{boarding}</span>
            </div>
          </div>

        </div>

        {/* Modal Footer CTA */}
        <div className="p-3.5 sm:p-4 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <a
              href={`tel:${SITE_INFO.phone}`}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Call: {SITE_INFO.phone}</span>
            </a>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-[#f1683a] hover:bg-[#d95325] text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-[#f1683a]/30 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Book Seat on WhatsApp</span>
          </a>
        </div>

      </div>
    </div>
  );
};
