import React, { useState } from 'react';
import { Bus, Calendar, MapPin, Users, Check, Clock, ShieldCheck, Sparkles, ArrowRight, HeartHandshake, Phone, Ticket } from 'lucide-react';
import { SPIRITUAL_BUS_TOURS, SpiritualBusTour, COMPANY_INFO } from '../data/travelData';

interface SpiritualBusSectionProps {
  onBookBusSeat: (tour: SpiritualBusTour, date?: string) => void;
}

export const SpiritualBusSection: React.FC<SpiritualBusSectionProps> = ({ onBookBusSeat }) => {
  const [selectedTour, setSelectedTour] = useState<SpiritualBusTour>(SPIRITUAL_BUS_TOURS[0]);
  const [selectedDate, setSelectedDate] = useState<string>(SPIRITUAL_BUS_TOURS[0].nextDepartureDates[0]);

  const handleTourChange = (tour: SpiritualBusTour) => {
    setSelectedTour(tour);
    setSelectedDate(tour.nextDepartureDates[0]);
  };

  return (
    <section id="spiritual-bus" className="py-16 sm:py-24 bg-gradient-to-b from-[#0b101b] via-[#0f172a] to-[#0b101b] border-b border-slate-800 relative overflow-hidden">
      
      {/* Decorative Traditional Temple Glow / Aura Pattern */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with Hindi & English Spiritual Dignity */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>पवित्र आध्यात्मिक बस यात्रा · Spiritual Group Bus Tours</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-['Outfit',sans-serif]">
              Char Dham & Temple Group Bus Tours
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Affordable, comfortable, and devotional 2x2 luxury pushback AC coach yatras with pure satvik food, dedicated yatra escort, bhajan sessions, and verified mountain captains.
            </p>
          </div>

          {/* Quick Stats Trust Pill */}
          <div className="flex items-center gap-3 p-3 bg-slate-900/90 border border-slate-800 rounded-2xl shrink-0">
            <div className="p-2 bg-amber-400/10 text-amber-400 rounded-xl">
              <Bus className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white font-['Outfit',sans-serif]">Regular Fixed Departures</div>
              <div className="text-[11px] text-emerald-400 font-medium">Individual Seat Booking Available</div>
            </div>
          </div>
        </div>

        {/* Feature Cards Grid (4 Bus Tours) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Left Column: Interactive Tour Selector Cards */}
          <div className="lg:col-span-7 space-y-4">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Select Spiritual Circuit
            </div>

            <div className="space-y-3">
              {SPIRITUAL_BUS_TOURS.map((tour) => {
                const isSelected = selectedTour.id === tour.id;
                return (
                  <div
                    key={tour.id}
                    onClick={() => handleTourChange(tour)}
                    className={`cursor-pointer p-4 sm:p-5 rounded-2xl border transition-all text-left ${
                      isSelected
                        ? 'bg-[#152038] border-amber-400/80 shadow-lg shadow-amber-400/10 ring-1 ring-amber-400/30'
                        : 'bg-[#111a2f]/80 border-slate-800 hover:border-slate-700 hover:bg-[#131d34]'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
                      <div>
                        <span className="text-[11px] font-semibold text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full inline-block mb-1">
                          {tour.badgeText}
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-white font-['Outfit',sans-serif]">
                          {tour.title}
                        </h3>
                        <div className="text-xs text-amber-300/80 font-medium mt-0.5">
                          {tour.hindiTitle}
                        </div>
                      </div>

                      <div className="text-left sm:text-right shrink-0">
                        <div className="text-xs text-slate-400">Seat Fare</div>
                        <div className="text-lg sm:text-xl font-bold text-amber-400 font-['Outfit',sans-serif] tabular-nums">
                          ₹{tour.pricePerSeat.toLocaleString()} <span className="text-xs text-slate-400 font-normal">/ seat</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 py-3 text-xs text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{tour.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Bus className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                        <span className="truncate">{tour.busType.split('(')[0]}</span>
                      </div>
                      <div className="flex items-center gap-1.5 col-span-2 sm:col-span-1">
                        <Calendar className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{tour.departureSchedule.split('(')[0]}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {tour.keyTemples.slice(0, 4).map((temple, i) => (
                        <span key={i} className="text-[11px] px-2 py-0.5 bg-slate-900/90 text-slate-300 border border-slate-800 rounded-md">
                          🛕 {temple}
                        </span>
                      ))}
                      {tour.keyTemples.length > 4 && (
                        <span className="text-[11px] text-amber-400 font-medium">
                          +{tour.keyTemples.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Tour Booking & Seat Reservation Card */}
          <div className="lg:col-span-5 bg-[#121c32] border border-slate-700/80 rounded-2xl p-6 sm:p-7 shadow-2xl space-y-6 sticky top-24">
            
            <div className="border-b border-slate-800 pb-4">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-emerald-400 font-medium flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Booking Open for 2026 Season
                </span>
                <span className="text-slate-400 font-mono text-[11px]">Seat Ref: BUS-{selectedTour.id.slice(0, 4).toUpperCase()}</span>
              </div>
              
              <h3 className="text-xl font-bold text-white font-['Outfit',sans-serif] mt-1">
                {selectedTour.title}
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {selectedTour.overview}
              </p>
            </div>

            {/* Departure Dates Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Select Upcoming Yatra Departure Date:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {selectedTour.nextDepartureDates.map((dateStr, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedDate(dateStr)}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                      selectedDate === dateStr
                        ? 'border-amber-400 bg-amber-400/10 text-white font-semibold'
                        : 'border-slate-800 bg-slate-900/70 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-[11px] text-amber-400">Batch {idx + 1}</div>
                    <div className="truncate">{dateStr}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Boarding Points */}
            <div className="space-y-1.5 text-xs">
              <div className="text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                Boarding / Pickup Hubs:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedTour.pickupPoints.map((pt, i) => (
                  <span key={i} className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg text-slate-300 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    <span>{pt}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Inclusions Checkmarks */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Seat Inclusions
              </div>
              <div className="space-y-1.5 text-xs text-slate-300">
                {selectedTour.includedAmenities.slice(0, 4).map((amenity, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price & Action */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-400">All-Inclusive Seat Fare:</span>
                <div className="text-2xl font-bold text-amber-400 font-['Outfit',sans-serif] tabular-nums">
                  ₹{selectedTour.pricePerSeat.toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-500">Per Person (Hotel + Food + AC Coach)</div>
              </div>

              <button
                type="button"
                onClick={() => onBookBusSeat(selectedTour, selectedDate)}
                className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold rounded-xl text-xs transition-all flex items-center gap-2 shadow-lg shadow-amber-400/20 font-medium"
              >
                <Ticket className="w-4 h-4" />
                <span>Reserve Seat</span>
              </button>
            </div>

            <div className="text-center pt-1">
              <a
                href={`https://wa.me/${COMPANY_INFO.phoneRaw1}?text=${encodeURIComponent(`Hello Mannat Travels! I want to inquire about spiritual bus seat booking for "${selectedTour.title}" on date: ${selectedDate}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-emerald-400 hover:underline inline-flex items-center gap-1.5"
              >
                <span>Ask bus seat layout & availability on WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>

        {/* Why Choose Mannat Travels Bus Tours Banner */}
        <div className="p-6 sm:p-8 bg-[#111a2f] border border-slate-800 rounded-2xl grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-amber-400/10 text-amber-400 rounded-xl shrink-0">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white font-['Outfit',sans-serif]">Senior Citizen Friendly</div>
              <p className="text-xs text-slate-400 mt-1">
                Low step boarding, frequent tea & restroom halts, luggage handling support, and wheelchair coordination.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-emerald-400/10 text-emerald-400 rounded-xl shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white font-['Outfit',sans-serif]">Pure Satvik Meals</div>
              <p className="text-xs text-slate-400 mt-1">
                Freshly prepared onion-garlic free satvik meals at verified clean dining halts across the Himalayan route.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-sky-400/10 text-sky-400 rounded-xl shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white font-['Outfit',sans-serif]">Dedicated Yatra Escort</div>
              <p className="text-xs text-slate-400 mt-1">
                A knowledgeable spiritual tour manager travels on board for temple history, darshan queues, and pooja arrangements.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-purple-400/10 text-purple-400 rounded-xl shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white font-['Outfit',sans-serif]">Hill Certified Drivers</div>
              <p className="text-xs text-slate-400 mt-1">
                Heavy vehicle Himalayan certified captains with round-the-clock emergency support and GPS telemetry.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
