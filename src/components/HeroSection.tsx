import React, { useState } from 'react';
import { MapPin, Calendar, Users, Car, ShieldCheck, Clock, Award, ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { COMPANY_INFO, VEHICLE_FLEET } from '../data/travelData';

interface HeroSectionProps {
  onOpenBooking: (prefill?: { pickup?: string; destination?: string; vehicle?: string; tripType?: string }) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  const [tripType, setTripType] = useState<'outstation' | 'roundtrip' | 'chardham' | 'airport'>('chardham');
  const [pickup, setPickup] = useState('Haridwar / Dehradun');
  const [destination, setDestination] = useState('Kedarnath & Badrinath (Do Dham)');
  const [date, setDate] = useState('2026-05-15');
  const [vehicleId, setVehicleId] = useState('ertiga-suv');

  const selectedVehicle = VEHICLE_FLEET.find(v => v.id === vehicleId) || VEHICLE_FLEET[1];

  const handleQuickEstimate = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenBooking({
      pickup,
      destination,
      vehicle: selectedVehicle.name,
      tripType: tripType.toUpperCase()
    });
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#0b101b] via-[#111a2f] to-[#0b101b] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-800">
      
      {/* Background Mountain Silhouette & Starry Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full object-cover" viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 600L210 320L380 440L620 210L860 410L1120 180L1320 340L1440 260V600H0Z" fill="url(#mountainGrad1)" />
          <path d="M0 600L180 420L340 490L530 360L720 480L980 290L1210 430L1440 370V600H0Z" fill="url(#mountainGrad2)" opacity="0.6" />
          <defs>
            <linearGradient id="mountainGrad1" x1="720" y1="180" x2="720" y2="600" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38bdf8" />
              <stop offset="1" stopColor="#0b101b" />
            </linearGradient>
            <linearGradient id="mountainGrad2" x1="720" y1="290" x2="720" y2="600" gradientUnits="userSpaceOnUse">
              <stop stopColor="#f59e0b" />
              <stop offset="1" stopColor="#0b101b" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Bold Value Proposition & Social Proof */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Clean unboxed trust markers (Zero-Pill Discipline) */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-amber-300">
              <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
                <Award className="w-4 h-4" /> Uttarakhand Tourism Approved
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-300">10+ Years Himalayan Mastery</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-300">15,000+ Happy Pilgrims</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-white font-['Outfit',sans-serif] leading-[1.15] text-balance">
              Sacred Himalayan Journeys & Premier Mountain Cabs
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Experience the divine Char Dham Yatra, Kedarnath, Badrinath, and serene Uttarakhand hill stations with verified mountain drivers, sanitized luxury cabs, and 100% transparent pricing.
            </p>

            {/* Quick Proof Metrics adjacent to hero claims */}
            <div className="grid grid-cols-3 gap-3 pt-2 max-w-lg">
              <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl">
                <div className="text-xl sm:text-2xl font-bold text-amber-400 font-['Outfit',sans-serif] tabular-nums">4.9 / 5</div>
                <div className="text-xs text-slate-400 mt-0.5">500+ Verified Reviews</div>
              </div>
              <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl">
                <div className="text-xl sm:text-2xl font-bold text-sky-400 font-['Outfit',sans-serif] tabular-nums">100%</div>
                <div className="text-xs text-slate-400 mt-0.5">Hill Certified Drivers</div>
              </div>
              <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl">
                <div className="text-xl sm:text-2xl font-bold text-emerald-400 font-['Outfit',sans-serif] tabular-nums">24 / 7</div>
                <div className="text-xs text-slate-400 mt-0.5">Helpline & Road Support</div>
              </div>
            </div>

            {/* Direct Instant Action */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="#spiritual-bus"
                className="flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-lg shadow-amber-400/20 transition-all font-medium"
              >
                <span>🚌 View Spiritual Bus Tours</span>
              </a>
              <a
                href={`https://wa.me/${COMPANY_INFO.phoneRaw1}?text=${encodeURIComponent('Hello Mannat Travels! I want to book a taxi/tour for Char Dham/Uttarakhand.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-4 py-3 text-sm font-semibold text-white bg-emerald-700/80 hover:bg-emerald-600/90 rounded-xl shadow-md transition-all font-medium"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp</span>
              </a>
              <a
                href={`tel:${COMPANY_INFO.phoneRaw1}`}
                className="flex items-center gap-2.5 px-4 py-3 text-sm font-semibold text-white bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 rounded-xl transition-all"
              >
                <Clock className="w-4 h-4 text-amber-400" />
                <span>+91 95826 78085</span>
              </a>
            </div>

            <div className="text-xs text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Zero cancellation penalty up to 24 hrs before journey · Clean AC cars · GPS tracking</span>
            </div>
          </div>

          {/* Right Column: Instant Booking & Fare Estimator Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#121c32]/95 border border-slate-700/80 rounded-2xl p-5 sm:p-6 shadow-2xl shadow-black/50 backdrop-blur-md">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <h3 className="text-base font-semibold text-white font-['Outfit',sans-serif]">
                  Instant Cab & Yatra Booking
                </h3>
                <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Instant Confirmation
                </span>
              </div>

              {/* Functional Segmented Trip Type Selector */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 p-1 bg-slate-900/90 rounded-xl mt-4 text-xs font-medium">
                <button
                  type="button"
                  onClick={() => {
                    setTripType('chardham');
                    setDestination('Kedarnath & Badrinath (Do Dham)');
                  }}
                  className={`py-2 px-1 rounded-lg text-center transition-colors truncate ${tripType === 'chardham' ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm' : 'text-slate-400 hover:text-white'}`}
                >
                  Char Dham
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTripType('outstation');
                    setDestination('Mussoorie / Dhanaulti');
                  }}
                  className={`py-2 px-1 rounded-lg text-center transition-colors truncate ${tripType === 'outstation' ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm' : 'text-slate-400 hover:text-white'}`}
                >
                  Outstation
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTripType('roundtrip');
                    setDestination('Nainital & Jim Corbett');
                  }}
                  className={`py-2 px-1 rounded-lg text-center transition-colors truncate ${tripType === 'roundtrip' ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm' : 'text-slate-400 hover:text-white'}`}
                >
                  Round Trip
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTripType('airport');
                    setPickup('Dehradun Airport (Jolly Grant)');
                    setDestination('Rishikesh / Tapovan');
                  }}
                  className={`py-2 px-1 rounded-lg text-center transition-colors truncate ${tripType === 'airport' ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm' : 'text-slate-400 hover:text-white'}`}
                >
                  Airport Cab
                </button>
              </div>

              <form onSubmit={handleQuickEstimate} className="mt-4 space-y-3.5">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Pickup Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-amber-400" />
                    <input
                      type="text"
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      placeholder="e.g. Haridwar Railway Station, Dehradun"
                      required
                      className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Destination / Yatra Circuit
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-emerald-400" />
                    <input
                      type="text"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      placeholder="e.g. Kedarnath, Badrinath, Mussoorie"
                      required
                      className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Travel Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className="w-full pl-9 pr-2 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Select Vehicle
                    </label>
                    <div className="relative">
                      <Car className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                      <select
                        value={vehicleId}
                        onChange={(e) => setVehicleId(e.target.value)}
                        className="w-full pl-9 pr-2 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                      >
                        {VEHICLE_FLEET.map((v) => (
                          <option key={v.id} value={v.id}>
                            {v.name.split('(')[0]} ({v.seats})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Live transparent fare hint */}
                <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-400">Estimated Rate: </span>
                    <span className="text-white font-semibold tabular-nums">
                      ₹{selectedVehicle.perKmRate}/km
                    </span>
                    <span className="text-slate-500"> or ₹{selectedVehicle.outstationPerDayRate.toLocaleString()}/day</span>
                  </div>
                  <span className="text-emerald-400 text-[11px] font-medium">All Hills Permitted</span>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold rounded-xl text-sm transition-all shadow-md shadow-amber-400/20"
                >
                  <span>Check Exact Fare & Book Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="mt-3 text-center">
                <span className="text-[11px] text-slate-400">
                  Prefer instant call? Call{' '}
                  <a href={`tel:${COMPANY_INFO.phoneRaw1}`} className="text-amber-400 font-semibold hover:underline">
                    {COMPANY_INFO.phone1}
                  </a>
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
