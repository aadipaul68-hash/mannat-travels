import React, { useState } from 'react';
import { Calculator, ArrowRight, Check, MapPin, Car, Fuel, Shield, MessageCircle, Info } from 'lucide-react';
import { POPULAR_ROUTES, VEHICLE_FLEET, COMPANY_INFO } from '../data/travelData';

interface FareCalculatorProps {
  onOpenBooking: (details: { pickup: string; destination: string; vehicle: string; estimatedFare: number; tripType: string }) => void;
}

export const FareCalculator: React.FC<FareCalculatorProps> = ({ onOpenBooking }) => {
  const [selectedRouteId, setSelectedRouteId] = useState(POPULAR_ROUTES[2].id); // Haridwar to Sonprayag
  const [selectedVehicleId, setSelectedVehicleId] = useState('ertiga-suv');
  const [isRoundTrip, setIsRoundTrip] = useState(true);
  const [numberOfDays, setNumberOfDays] = useState(3);

  const selectedRoute = POPULAR_ROUTES.find(r => r.id === selectedRouteId) || POPULAR_ROUTES[0];
  const selectedVehicle = VEHICLE_FLEET.find(v => v.id === selectedVehicleId) || VEHICLE_FLEET[1];

  // Calculate realistic distance and price
  const multiplier = isRoundTrip ? 2 : 1;
  const effectiveKm = selectedRoute.distanceKm * multiplier;
  
  // Base fare based on rate per km
  const baseKilometerFare = effectiveKm * selectedVehicle.perKmRate;
  
  // Hill minimum / day base guarantee check
  const minDayGuarantee = numberOfDays * selectedVehicle.outstationPerDayRate;
  const estimatedCabFare = Math.max(baseKilometerFare, minDayGuarantee);
  
  // Driver allowance (₹400/day standard hill allowance)
  const driverAllowance = numberOfDays * 400;
  
  // Estimated toll and state permits
  const tollAndPermits = isRoundTrip ? 900 : 500;
  
  const totalEstimatedFare = estimatedCabFare + driverAllowance + tollAndPermits;

  const handleBookEstimate = () => {
    onOpenBooking({
      pickup: selectedRoute.from,
      destination: selectedRoute.to,
      vehicle: selectedVehicle.name,
      estimatedFare: totalEstimatedFare,
      tripType: isRoundTrip ? 'Round Trip' : 'One Way'
    });
  };

  return (
    <section id="calculator" className="py-16 sm:py-20 bg-[#0d1424] border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
            Fair & Transparent Estimator
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-['Outfit',sans-serif]">
            Instant Route & Cab Fare Estimator
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Calculate exact mountain taxi fares between major hubs like Dehradun, Jolly Grant Airport, Haridwar, Rishikesh, Sonprayag, and Badrinath.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls form */}
          <div className="lg:col-span-7 bg-[#111a2f] border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-6">
            
            {/* Trip Mode Switcher */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Journey Type
              </label>
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-900 rounded-xl">
                <button
                  type="button"
                  onClick={() => setIsRoundTrip(true)}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg transition-colors ${
                    isRoundTrip ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Round Trip / Multiday Yatra
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsRoundTrip(false);
                    setNumberOfDays(1);
                  }}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg transition-colors ${
                    !isRoundTrip ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  One-Way Point Drop
                </button>
              </div>
            </div>

            {/* Popular Route Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Select Popular Route
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-amber-400" />
                <select
                  value={selectedRouteId}
                  onChange={(e) => setSelectedRouteId(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  {POPULAR_ROUTES.map((route) => (
                    <option key={route.id} value={route.id}>
                      {route.from} ➔ {route.to} ({route.distanceKm} km · ~{route.durationHours})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Vehicle Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Select Vehicle Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {VEHICLE_FLEET.slice(0, 4).map((veh) => (
                  <button
                    key={veh.id}
                    type="button"
                    onClick={() => setSelectedVehicleId(veh.id)}
                    className={`p-3 text-left border rounded-xl transition-all ${
                      selectedVehicleId === veh.id
                        ? 'border-amber-400 bg-amber-400/10 text-white'
                        : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold text-white truncate">{veh.name.split('/')[0]}</div>
                    <div className="text-[11px] text-amber-300 mt-1">₹{veh.perKmRate}/km</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{veh.seats}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Duration (if round trip) */}
            {isRoundTrip && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Total Duration of Trip: <span className="text-amber-400 font-bold">{numberOfDays} Days</span>
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  {[2, 3, 4, 5, 7, 10].map((days) => (
                    <button
                      key={days}
                      type="button"
                      onClick={() => setNumberOfDays(days)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                        numberOfDays === days
                          ? 'bg-amber-400 text-slate-950 border-amber-400'
                          : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {days} Days
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 flex items-start gap-2.5 text-xs text-slate-400">
              <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <span>
                All mountain rates include seasoned hill chauffeur, sanitized vehicle, passenger insurance assistance, and emergency 24/7 route backup.
              </span>
            </div>

          </div>

          {/* Fare Summary & Instant Action Card */}
          <div className="lg:col-span-5 bg-[#121c32] border border-amber-400/40 rounded-2xl p-6 sm:p-7 shadow-xl shadow-black/40 space-y-6">
            
            <div className="border-b border-slate-800 pb-4">
              <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                Transparent Quote Summary
              </div>
              <div className="text-xl font-bold text-white font-['Outfit',sans-serif] mt-1">
                {selectedRoute.from} ➔ {selectedRoute.to}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                <span>{effectiveKm} km total</span>
                <span aria-hidden="true">·</span>
                <span>{selectedVehicle.name.split(' ')[0]}</span>
                <span aria-hidden="true">·</span>
                <span>{isRoundTrip ? `${numberOfDays} Days Roundtrip` : 'One-Way Drop'}</span>
              </div>
            </div>

            {/* Line Items */}
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Estimated Vehicle Base ({effectiveKm} km @ ₹{selectedVehicle.perKmRate}/km)</span>
                <span className="text-white font-semibold font-mono tabular-nums">₹{estimatedCabFare.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Driver Food & Night Allowance ({numberOfDays} days)</span>
                <span className="text-white font-semibold font-mono tabular-nums">₹{driverAllowance.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Estimated Tolls, State Border & Hill Green Cess</span>
                <span className="text-white font-semibold font-mono tabular-nums">₹{tollAndPermits.toLocaleString()}</span>
              </div>
            </div>

            {/* Total Fare highlight */}
            <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400">Total Estimated Fare</span>
                <div className="text-2xl sm:text-3xl font-bold text-amber-400 font-['Outfit',sans-serif] tabular-nums">
                  ₹{totalEstimatedFare.toLocaleString()}
                </div>
                <div className="text-[11px] text-emerald-400 font-medium">Zero Hidden Charges</div>
              </div>
              <div className="text-right text-xs text-slate-400">
                <div>Advance Deposit:</div>
                <div className="text-sm font-semibold text-white">Just 20%</div>
                <div className="text-[10px]">Rest pay to driver</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-2.5">
              <button
                onClick={handleBookEstimate}
                className="w-full py-3 px-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-md shadow-amber-400/20"
              >
                <span>Book Cab at ₹{totalEstimatedFare.toLocaleString()}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/${COMPANY_INFO.phoneRaw1}?text=${encodeURIComponent(`Hello Mannat Travels! I want to confirm taxi from ${selectedRoute.from} to ${selectedRoute.to} in ${selectedVehicle.name} (${numberOfDays} days, ₹${totalEstimatedFare.toLocaleString()}).`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm on WhatsApp Instantly</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
