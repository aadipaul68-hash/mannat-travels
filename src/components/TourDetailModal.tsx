import React, { useEffect } from 'react';
import { X, Calendar, MapPin, Check, Phone, MessageCircle } from 'lucide-react';
import { TourItem, SITE_INFO, getWhatsAppBookingUrl } from '../data/mannatData';

interface TourDetailModalProps {
  tour: TourItem | null;
  onClose: () => void;
}

export const TourDetailModal: React.FC<TourDetailModalProps> = ({ tour, onClose }) => {
  useEffect(() => {
    if (!tour) return;
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
  const boarding = tour.boardingLocation || tour.boardingPoints || 'Muzaffarnagar & Delhi NCR';
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

  return (
    <div
      className="fixed inset-0 z-[100] overflow-y-auto bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-[#0E1422] border border-amber-500/30 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl my-6 flex flex-col text-slate-100 max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner with image */}
        <div className="relative aspect-[16/8] sm:aspect-[21/9] bg-slate-900 shrink-0">
          <img
            src={tour.image || 'https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=1200&q=80'}
            alt={tour.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E1422] via-[#0E1422]/50 to-transparent" />
          
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition border border-white/20"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-slate-950 shadow-sm">
              {tour.badge || tour.category}
            </span>
            {isUrgent && (
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-600 text-white animate-pulse">
                Only {availableSeats} Seats Left!
              </span>
            )}
          </div>

          <div className="absolute bottom-3 left-4 right-4">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-white drop-shadow-md">
              {tour.title}
            </h2>
            <div className="flex items-center gap-2 text-xs text-amber-300 mt-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{tour.destination}</span>
              <span aria-hidden="true">·</span>
              <span>{tour.duration}</span>
            </div>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
          
          {/* Price Bar */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-amber-500/20 flex flex-wrap items-center justify-between gap-3">
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
                <span className="text-2xl font-bold text-amber-400">
                  ₹{price.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-slate-400">/ person all-inclusive</span>
              </div>
            </div>

            <div className="text-right text-xs">
              <span className="text-slate-400 block">Departure Date:</span>
              <span className="text-white font-semibold">{tour.departureDate || 'Upcoming Batch'}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-amber-400 mb-2">
              Tour Overview
            </h3>
            <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
              {tour.description}
            </p>
          </div>

          {/* Key Stops */}
          <div>
            <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-amber-400 mb-2">
              Places & Temples Covered
            </h3>
            <div className="flex flex-wrap gap-2">
              {places.map((place, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-xs flex items-center gap-1.5"
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
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Check className="w-4 h-4" /> Inclusions
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {inclusions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                <span>✕</span> Exclusions
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
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
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <a
            href={`tel:${SITE_INFO.phone}`}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-700 bg-slate-800 text-white text-xs font-bold uppercase tracking-wider hover:bg-slate-700 transition"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>Call {SITE_INFO.phone}</span>
          </a>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white transition"
            >
              Close
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxury-primary flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              <span>Book on WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
