import React, { useState } from 'react';
import { X, Calendar, MapPin, Check, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { TourPackage } from '../data/travelData';

interface PackageModalProps {
  pkg: TourPackage | null;
  onClose: () => void;
  onBook: (pkg: TourPackage) => void;
}

export const PackageModal: React.FC<PackageModalProps> = ({ pkg, onClose, onBook }) => {
  if (!pkg) return null;

  const [activeDay, setActiveDay] = useState(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#0d1424] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 to-[#16213b] border-b border-slate-800 flex items-start justify-between">
          <div className="space-y-1 pr-6">
            <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider flex items-center gap-2">
              <span>{pkg.duration}</span>
              <span aria-hidden="true">·</span>
              <span>Pickup: {pkg.pickupDrop}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-['Outfit',sans-serif]">
              {pkg.title}
            </h2>
            <p className="text-xs text-slate-300">
              {pkg.highlight}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
          
          {/* Pricing bar */}
          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-slate-400 text-xs">Per Person (Hotel + Meals + Cab):</span>
              <div className="text-xl font-bold text-amber-400 font-['Outfit',sans-serif] tabular-nums">
                ₹{pkg.pricePerPerson.toLocaleString()} <span className="text-xs text-slate-400 font-normal">/ person</span>
              </div>
            </div>
            <div>
              <span className="text-slate-400 text-xs">Vehicle Only (All Inclusive):</span>
              <div className="text-xl font-bold text-white font-['Outfit',sans-serif] tabular-nums">
                ₹{pkg.vehiclePrice.toLocaleString()} <span className="text-xs text-slate-400 font-normal">/ dedicated cab</span>
              </div>
            </div>
            <button
              onClick={() => {
                onClose();
                onBook(pkg);
              }}
              className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold rounded-lg text-xs transition-colors flex items-center gap-1.5 font-medium"
            >
              <span>Book This Package</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Day by Day Itinerary Navigator */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white font-['Outfit',sans-serif] uppercase tracking-wider">
              Day-by-Day Detailed Itinerary
            </h3>
            
            <div className="flex gap-2 overflow-x-auto pb-2">
              {pkg.itinerary.map((item) => (
                <button
                  key={item.day}
                  onClick={() => setActiveDay(item.day)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
                    activeDay === item.day
                      ? 'bg-amber-400 text-slate-950'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Day {item.day}
                </button>
              ))}
            </div>

            {/* Active Day Detail */}
            {pkg.itinerary.find(i => i.day === activeDay) && (
              <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-400 font-mono">DAY {activeDay}</span>
                  <span className="text-slate-400">Night Halt: <strong className="text-white">{pkg.itinerary.find(i => i.day === activeDay)?.halt}</strong></span>
                </div>
                <h4 className="text-sm font-semibold text-white">
                  {pkg.itinerary.find(i => i.day === activeDay)?.title}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {pkg.itinerary.find(i => i.day === activeDay)?.desc}
                </p>
              </div>
            )}
          </div>

          {/* Inclusions & Exclusions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Check className="w-4 h-4" /> What is Included
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {pkg.inclusions.map((inc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-400">✓</span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" /> What is Excluded
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {pkg.exclusions.map((exc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-rose-400">✕</span>
                    <span>{exc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onBook(pkg);
            }}
            className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold rounded-xl text-xs transition-colors flex items-center gap-2 font-medium"
          >
            <span>Proceed to Book / Inquire</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
