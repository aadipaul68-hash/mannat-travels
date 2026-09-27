import React, { useState, useEffect, useRef } from 'react';
import { Search, X, MapPin, ArrowRight, Sparkles, Clock, Compass } from 'lucide-react';
import { TourItem, getDestinationImage } from '../data/mannatData';

interface SearchModalProps {
  isOpen: boolean;
  theme?: 'dark' | 'light';
  allTours: TourItem[];
  onClose: () => void;
  onSelectTour: (tour: TourItem) => void;
}

const POPULAR_SEARCH_TAGS = [
  'Char Dham',
  'Kedarnath',
  'Kainchi Dham',
  'Ayodhya',
  'Nainital',
  'Mussoorie',
  'Haridwar',
  'Khatu Shyam',
  'Shimla Manali'
];

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  theme = 'dark',
  allTours,
  onClose,
  onSelectTour,
}) => {
  const isDark = theme === 'dark';
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = prevOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();
  const searchResults = trimmed
    ? allTours.filter((tour) => {
        const titleMatch = tour.title.toLowerCase().includes(trimmed);
        const destMatch = tour.destination?.toLowerCase().includes(trimmed);
        const routeMatch = tour.route?.toLowerCase().includes(trimmed);
        const catMatch = tour.category?.toLowerCase().includes(trimmed);
        const placesMatch = Array.isArray(tour.placesCovered)
          ? tour.placesCovered.some((p) => p.toLowerCase().includes(trimmed))
          : false;
        return titleMatch || destMatch || routeMatch || catMatch || placesMatch;
      })
    : [];

  return (
    <div
      className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-md flex items-start justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl my-auto transition-colors border ${
          isDark
            ? 'bg-[#0E1422] text-slate-100 border-amber-500/30'
            : 'bg-white text-slate-800 border-slate-200'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Search Input Box */}
        <div
          className={`p-4 sm:p-5 flex items-center gap-3 border-b ${
            isDark ? 'border-slate-800 bg-[#0B101D]' : 'border-slate-200 bg-slate-50'
          }`}
        >
          <div className="relative flex-1 flex items-center">
            <Search
              className={`w-5 h-5 absolute left-3.5 pointer-events-none ${
                isDark ? 'text-amber-400' : 'text-slate-400'
              }`}
            />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tours, temples & packages (e.g. Kedarnath, Ayodhya, Nainital)..."
              className={`w-full pl-11 pr-10 py-3 rounded-xl text-sm sm:text-base font-medium focus:outline-none border transition ${
                isDark
                  ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500 focus:border-amber-400 focus:ring-1 focus:ring-amber-400'
                  : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#f1683a] focus:ring-1 focus:ring-[#f1683a]'
              }`}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-3.5 p-1 rounded-full text-slate-400 hover:text-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className={`p-2.5 rounded-xl border transition cursor-pointer shrink-0 ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div
          className={`px-4 sm:px-5 py-3 border-b text-xs flex items-center gap-2 overflow-x-auto scrollbar-none ${
            isDark ? 'border-slate-800 bg-[#090E1A]' : 'border-slate-100 bg-slate-50/60'
          }`}
        >
          <span className="text-slate-400 shrink-0 font-semibold flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>Popular:</span>
          </span>
          {POPULAR_SEARCH_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setQuery(tag)}
              className={`px-2.5 py-1 rounded-full whitespace-nowrap transition cursor-pointer border ${
                query.toLowerCase() === tag.toLowerCase()
                  ? isDark
                    ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                    : 'bg-[#f1683a] text-white border-[#f1683a] font-bold'
                  : isDark
                  ? 'bg-slate-900 text-slate-300 border-slate-700 hover:border-amber-400 hover:text-white'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Search Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-5 space-y-3">
          {trimmed ? (
            searchResults.length > 0 ? (
              <div className="space-y-2.5">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Found {searchResults.length} {searchResults.length === 1 ? 'Package' : 'Packages'}:
                </div>
                {searchResults.map((tour) => (
                  <div
                    key={tour.id}
                    onClick={() => {
                      onSelectTour(tour);
                      onClose();
                    }}
                    className={`p-3 sm:p-3.5 rounded-xl border flex items-center justify-between gap-3 transition cursor-pointer group ${
                      isDark
                        ? 'bg-slate-900/80 border-slate-800 hover:border-amber-500/50 hover:bg-slate-800/80'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={tour.image}
                        alt={tour.title}
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover shrink-0"
                        onError={(e) => {
                          const fallback = getDestinationImage(tour.title + ' ' + (tour.destination || ''));
                          if (e.currentTarget.src !== fallback) {
                            e.currentTarget.src = fallback;
                          }
                        }}
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 shrink-0">
                            {tour.category || 'Tour'}
                          </span>
                          <span className="text-xs text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {tour.duration}
                          </span>
                        </div>
                        <h4
                          className={`font-serif font-bold text-sm sm:text-base truncate group-hover:text-amber-400 transition-colors ${
                            isDark ? 'text-white' : 'text-slate-900'
                          }`}
                        >
                          {tour.title}
                        </h4>
                        <p className="text-xs text-slate-400 truncate flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#f1683a] shrink-0" />
                          <span>{tour.route || tour.destination}</span>
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-base sm:text-lg font-extrabold text-[#f1683a]">
                        ₹{tour.price.toLocaleString('en-IN')}
                      </div>
                      <div className="text-[10px] text-slate-400">per person</div>
                      <div className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>View</span>
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center space-y-3">
                <Search className="w-10 h-10 mx-auto text-slate-500" />
                <h4 className="font-serif font-bold text-base sm:text-lg">No packages found for "{query}"</h4>
                <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto">
                  Try searching for another destination, or contact our Muzaffarnagar desk directly for a customized itinerary!
                </p>
                <div className="pt-2">
                  <a
                    href="https://wa.me/918445778445?text=Hello%20Mannat%20Tours,%20I%20am%20looking%20for%20a%20customized%20package."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Ask on WhatsApp (Custom Package)</span>
                  </a>
                </div>
              </div>
            )
          ) : (
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Featured Packages:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {allTours.slice(0, 6).map((tour) => (
                  <div
                    key={tour.id}
                    onClick={() => {
                      onSelectTour(tour);
                      onClose();
                    }}
                    className={`p-2.5 rounded-xl border flex items-center gap-3 transition cursor-pointer group ${
                      isDark
                        ? 'bg-slate-900/60 border-slate-800 hover:border-amber-500/40 hover:bg-slate-800/60'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <img
                      src={tour.image}
                      alt={tour.title}
                      className="w-12 h-12 rounded-lg object-cover shrink-0"
                      onError={(e) => {
                        const fallback = getDestinationImage(tour.title + ' ' + (tour.destination || ''));
                        if (e.currentTarget.src !== fallback) {
                          e.currentTarget.src = fallback;
                        }
                      }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-xs truncate group-hover:text-amber-400 transition-colors">
                        {tour.title}
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center justify-between mt-0.5">
                        <span>{tour.duration}</span>
                        <span className="font-bold text-amber-400">
                          ₹{tour.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
