import React, { useState } from 'react';
import { Calendar, MapPin, Check, ArrowRight, Clock, Star, Info, Shield } from 'lucide-react';
import { TOUR_PACKAGES, TourPackage, COMPANY_INFO } from '../data/travelData';

interface PackagesSectionProps {
  onSelectPackage: (pkg: TourPackage) => void;
  onBookPackage: (pkg: TourPackage) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({ onSelectPackage, onBookPackage }) => {
  const [filter, setFilter] = useState<'all' | 'spiritual' | 'hill-station' | 'adventure'>('all');

  const filteredPackages = filter === 'all' 
    ? TOUR_PACKAGES 
    : TOUR_PACKAGES.filter(p => p.category === filter);

  return (
    <section id="packages" className="py-16 sm:py-20 bg-[#0d1424] border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
              <span>Himalayan Pilgrimages & Curated Holidays</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-['Outfit',sans-serif]">
              Top Uttarakhand Tour Packages
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Complete all-inclusive packages with dedicated private vehicles, certified mountain drivers, deluxe hotels, satvik meals, and VIP darshan assistance.
            </p>
          </div>

          {/* Functional Category Filter (Permitted Filter Tabs) */}
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto shrink-0">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                filter === 'all' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              All Packages
            </button>
            <button
              onClick={() => setFilter('spiritual')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                filter === 'spiritual' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Char Dham & Pilgrimage
            </button>
            <button
              onClick={() => setFilter('hill-station')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                filter === 'hill-station' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Hill Stations
            </button>
            <button
              onClick={() => setFilter('adventure')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                filter === 'adventure' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Wildlife & Adventure
            </button>
          </div>
        </div>

        {/* Package Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="group bg-[#111a2f] border border-slate-800 hover:border-amber-400/50 rounded-2xl overflow-hidden flex flex-col transition-all duration-200 hover:shadow-xl hover:shadow-black/40"
            >
              {/* Card Visual Header / Gradient Accent */}
              <div className="relative h-44 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 p-5 flex flex-col justify-between overflow-hidden border-b border-slate-800/80">
                
                {/* Visual mountain backdrop pattern */}
                <div className="absolute inset-0 opacity-15 pointer-events-none">
                  <svg className="w-full h-full object-cover" viewBox="0 0 400 180" fill="none">
                    <path d="M0 180L70 90L130 140L210 60L290 130L360 40L400 80V180H0Z" fill="#f59e0b" />
                  </svg>
                </div>

                <div className="relative z-10 flex items-start justify-between gap-2">
                  <div className="text-xs text-slate-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{pkg.duration}</span>
                  </div>
                  <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5" />
                    Verified Route
                  </span>
                </div>

                <div className="relative z-10 space-y-1">
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors font-['Outfit',sans-serif] line-clamp-1">
                    {pkg.title}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-slate-400 truncate">
                    <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>{pkg.pickupDrop}</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                
                <div>
                  <p className="text-xs text-amber-300 font-medium mb-2 line-clamp-2">
                    {pkg.highlight}
                  </p>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {pkg.overview}
                  </p>
                </div>

                {/* Key Inclusions preview */}
                <div className="space-y-1.5 pt-2 border-t border-slate-800/60">
                  <div className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
                    Package Inclusions
                  </div>
                  {pkg.inclusions.slice(0, 3).map((inc, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                      <span className="line-clamp-1">{inc}</span>
                    </div>
                  ))}
                  {pkg.inclusions.length > 3 && (
                    <div className="text-[11px] text-amber-400/90 font-medium">
                      + {pkg.inclusions.length - 3} more complimentary amenities
                    </div>
                  )}
                </div>

                {/* Pricing & Actions */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-slate-400">Starting From</div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-bold text-white font-['Outfit',sans-serif] tabular-nums">
                        ₹{pkg.pricePerPerson.toLocaleString()}
                      </span>
                      <span className="text-[11px] text-slate-400">/ person</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectPackage(pkg)}
                      className="px-3 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                      title="View full day-by-day plan"
                    >
                      Itinerary
                    </button>
                    <button
                      onClick={() => onBookPackage(pkg)}
                      className="px-3.5 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-1 font-medium"
                    >
                      <span>Book</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Customized Tour Callout */}
        <div className="mt-12 bg-gradient-to-r from-slate-900 via-[#16213b] to-slate-900 border border-slate-700/80 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-lg sm:text-xl font-bold text-white font-['Outfit',sans-serif]">
              Need a Custom Itinerary for your Family or Group?
            </h3>
            <p className="text-sm text-slate-300 max-w-xl">
              We design personalized tour routes, flexible night halts, senior citizen accessibility, and helicopter darshan add-ons.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`https://wa.me/${COMPANY_INFO.phoneRaw1}?text=${encodeURIComponent('Hello Mannat Travels, I want to customize a tour package in Uttarakhand.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all"
            >
              Plan Custom Trip
            </a>
            <a
              href={`tel:${COMPANY_INFO.phoneRaw1}`}
              className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all"
            >
              Talk to Specialist
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
