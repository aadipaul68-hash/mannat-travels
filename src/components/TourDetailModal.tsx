import React, { useEffect, useState } from 'react';
import { X, Calendar, MapPin, Check, Phone, MessageCircle, Play, Image as ImageIcon, Video, Clock } from 'lucide-react';
import { TourItem, SITE_INFO, getWhatsAppBookingUrl } from '../data/mannatData';

interface TourDetailModalProps {
  tour: TourItem | null;
  onClose: () => void;
}

export const TourDetailModal: React.FC<TourDetailModalProps> = ({ tour, onClose }) => {
  const [activeMediaTab, setActiveMediaTab] = useState<'photos' | 'video'>('photos');
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string>('');

  useEffect(() => {
    if (!tour) return;
    setSelectedGalleryImg(tour.image);
    setActiveMediaTab('photos');
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
  }, [tour, onClose]);

  if (!tour) return null;

  const availableSeats = Number(tour.availableSeats || 0);
  const isUrgent = availableSeats >= 1 && availableSeats <= 6;
  const price = Number(tour.price || 0);
  const originalPrice = Number(tour.originalPrice || 0);
  const hasDiscount = originalPrice > price && price > 0;
  const boarding = tour.boardingLocation || tour.boardingPoints || 'Muzaffarnagar, Meerut & Delhi NCR';
  const whatsappUrl = getWhatsAppBookingUrl(tour);

  const galleryList = Array.isArray(tour.galleryImages) && tour.galleryImages.length > 0
    ? tour.galleryImages
    : [tour.image, '/images/kaichi-dham.jpg', '/images/ayodhya-banner.jpg'];

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
        {/* Banner with image */}
        <div className="relative aspect-[16/8] sm:aspect-[21/9] bg-slate-900 shrink-0">
          <img
            src={selectedGalleryImg || tour.image}
            alt={tour.title}
            className="w-full h-full object-cover transition-all duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E1422] via-[#0E1422]/50 to-transparent" />
          
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-3 right-3 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition border border-white/20 z-10"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold bg-amber-500 text-slate-950 shadow-sm">
              {tour.badge || tour.category}
            </span>
            {isUrgent && (
              <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold bg-red-600 text-white animate-pulse">
                Only {availableSeats} Seats Left!
              </span>
            )}
          </div>

          <div className="absolute bottom-3 left-3 right-3 sm:left-5 sm:right-5">
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
          
          {/* Media Switcher Tabs: Photos & Videos */}
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
                  <span>Photos ({galleryList.length})</span>
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
                  <span>Video Preview (वीडियो)</span>
                </button>
              </div>

              <span className="text-[11px] text-slate-400 hidden sm:inline">
                Click any thumbnail to preview
              </span>
            </div>

            {activeMediaTab === 'photos' ? (
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {galleryList.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedGalleryImg(imgUrl)}
                    className={`relative aspect-video rounded-lg overflow-hidden border-2 transition ${
                      selectedGalleryImg === imgUrl
                        ? 'border-amber-400 ring-2 ring-amber-400/40'
                        : 'border-slate-800 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            ) : (
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

          {/* Description */}
          <div>
            <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-amber-400 mb-1.5">
              Tour Overview & Experience (विस्तृत विवरण)
            </h3>
            <p className="text-slate-300 leading-relaxed text-xs sm:text-sm bg-slate-900/50 p-3.5 rounded-xl border border-slate-800">
              {tour.description}
            </p>
          </div>

          {/* Day-by-Day Itinerary (दिनवार कार्यक्रम) */}
          {tour.itinerary && tour.itinerary.length > 0 && (
            <div>
              <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-amber-400 mb-2.5 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Day-by-Day Tour Schedule (दिनवार यात्रा कार्यक्रम)</span>
              </h3>
              <div className="space-y-2">
                {tour.itinerary.map((step) => (
                  <div key={step.day} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
                    <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-xs shrink-0">
                      Day {step.day}
                    </span>
                    <div className="space-y-0.5">
                      <h4 className="text-white font-bold text-xs">{step.title}</h4>
                      <p className="text-slate-400 text-[11px] leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Stops */}
          <div>
            <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-amber-400 mb-2">
              Places & Temples Covered (दर्शन एवं दर्शनीय स्थल)
            </h3>
            <div className="flex flex-wrap gap-2">
              {places.map((place, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-xs flex items-center gap-1.5"
                >
                  <span className="text-amber-400">✦</span>
                  <span>{place}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Boarding Info */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-2.5 text-xs">
            <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">Boarding & Pickup Hubs:</strong>
              <div className="text-slate-400 mt-0.5">{boarding}</div>
            </div>
          </div>

          {/* Inclusions & Exclusions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Check className="w-4 h-4" /> Inclusions
              </div>
              <ul className="space-y-1 text-xs text-slate-300">
                {inclusions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                <span>✕</span> Exclusions
              </div>
              <ul className="space-y-1 text-xs text-slate-300">
                {exclusions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-400">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Footer actions */}
        <div className="p-3.5 sm:p-4 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2.5">
          <a
            href={`tel:${SITE_INFO.phone}`}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-slate-700 bg-slate-800 text-white text-xs font-bold uppercase tracking-wider hover:bg-slate-700 transition"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>Call {SITE_INFO.phone}</span>
          </a>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-white transition"
            >
              Close
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxury-primary flex items-center gap-1.5 !px-4 !py-2 text-xs"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-slate-950" />
              <span>Book on WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
