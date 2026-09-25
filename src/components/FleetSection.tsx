import React from 'react';
import { Users, Briefcase, Wind, Check, ShieldCheck, Car, ArrowRight } from 'lucide-react';
import { VEHICLE_FLEET, VehicleOption } from '../data/travelData';

interface FleetSectionProps {
  onSelectVehicle: (vehicle: VehicleOption) => void;
}

export const FleetSection: React.FC<FleetSectionProps> = ({ onSelectVehicle }) => {
  return (
    <section id="fleet" className="py-16 sm:py-20 bg-[#0b101b] border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
            Verified Mountain Fleet & Transparent Rates
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-['Outfit',sans-serif]">
            Choose Your Travel Vehicle
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            From agile mountain sedans for couples to rugged luxury SUVs and spacious tempo travellers for group yatras — all inspected, GPS-tracked, and piloted by certified Himalayan drivers.
          </p>
        </div>

        {/* Fleet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VEHICLE_FLEET.map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-[#111a2f] border border-slate-800 hover:border-slate-700 rounded-2xl p-6 flex flex-col justify-between transition-all hover:shadow-xl hover:shadow-black/30"
            >
              <div className="space-y-4">
                
                {/* Vehicle Header */}
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-white font-['Outfit',sans-serif]">
                      {vehicle.name}
                    </h3>
                    <div className="text-xs text-amber-300/90 font-medium">
                      {vehicle.idealFor}
                    </div>
                  </div>
                  <div className="p-2.5 bg-slate-800/80 rounded-xl text-amber-400">
                    <Car className="w-5 h-5" />
                  </div>
                </div>

                {/* Specs row */}
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-800/80 text-xs text-slate-300">
                  <div className="flex flex-col items-center text-center p-2 bg-slate-900/60 rounded-lg">
                    <Users className="w-4 h-4 text-amber-400 mb-1" />
                    <span className="font-semibold text-white">{vehicle.seats.split(' ')[0]} Seats</span>
                    <span className="text-[10px] text-slate-500">Capacity</span>
                  </div>
                  <div className="flex flex-col items-center text-center p-2 bg-slate-900/60 rounded-lg">
                    <Briefcase className="w-4 h-4 text-sky-400 mb-1" />
                    <span className="font-semibold text-white">{vehicle.luggage.split(' ')[0]} Bags</span>
                    <span className="text-[10px] text-slate-500">Luggage</span>
                  </div>
                  <div className="flex flex-col items-center text-center p-2 bg-slate-900/60 rounded-lg">
                    <Wind className="w-4 h-4 text-emerald-400 mb-1" />
                    <span className="font-semibold text-white">Climate</span>
                    <span className="text-[10px] text-slate-500">AC/Heater</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-2">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Key Highlights
                  </div>
                  {vehicle.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Pricing & Booking Footer */}
              <div className="pt-5 mt-5 border-t border-slate-800 space-y-3">
                
                <div className="flex items-baseline justify-between text-xs">
                  <div>
                    <span className="text-slate-400">Outstation Rate:</span>
                    <div className="text-lg font-bold text-white font-['Outfit',sans-serif] tabular-nums">
                      ₹{vehicle.perKmRate} <span className="text-xs text-slate-400 font-normal">/ km</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400">Day Package:</span>
                    <div className="text-sm font-semibold text-amber-400 font-['Outfit',sans-serif] tabular-nums">
                      From ₹{vehicle.outstationPerDayRate.toLocaleString()} <span className="text-xs text-slate-400 font-normal">/ day</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onSelectVehicle(vehicle)}
                  className="w-full py-2.5 px-4 bg-slate-800 hover:bg-amber-400 hover:text-slate-950 text-white font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Book {vehicle.name.split(' ')[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

              </div>
            </div>
          ))}
        </div>

        {/* Quality Guarantee Box */}
        <div className="mt-12 p-6 bg-slate-900/80 border border-slate-800 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-400/10 text-amber-400 rounded-lg shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white font-['Outfit',sans-serif]">Zero Hidden Toll Surprises</div>
              <p className="text-xs text-slate-400 mt-1">
                State taxes, hill green cess, and parking allowances are clearly outlined in advance.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-emerald-400/10 text-emerald-400 rounded-lg shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white font-['Outfit',sans-serif]">Hill Certified Chauffeurs</div>
              <p className="text-xs text-slate-400 mt-1">
                Every driver has 5-10+ years traversing hairpin bends between Rishikesh, Joshimath & Badrinath.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-sky-400/10 text-sky-400 rounded-lg shrink-0">
              <Wind className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white font-['Outfit',sans-serif]">Immaculate Cleanliness</div>
              <p className="text-xs text-slate-400 mt-1">
                Daily interior sanitization, working seatbelts, fresh upholstery, and functional dual air blowers.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
