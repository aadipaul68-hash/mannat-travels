import React, { useState } from 'react';
import { X, CheckCircle2, Phone, Calendar, User, MapPin, Car, MessageCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO, VEHICLE_FLEET } from '../data/travelData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefill?: {
    pickup?: string;
    destination?: string;
    vehicle?: string;
    estimatedFare?: number;
    tripType?: string;
  };
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, prefill }) => {
  if (!isOpen) return null;

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [pickup, setPickup] = useState(prefill?.pickup || 'Dehradun / Haridwar');
  const [destination, setDestination] = useState(prefill?.destination || 'Kedarnath Dham');
  const [date, setDate] = useState('2026-05-15');
  const [vehicle, setVehicle] = useState(prefill?.vehicle || VEHICLE_FLEET[1].name);
  const [passengers, setPassengers] = useState('4');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const refCode = `MNT-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(refCode);
    setSubmitted(true);
  };

  const whatsappInquiryText = `Hello Mannat Travels! Booking Inquiry (${bookingRef || 'NEW'}):
- Name: ${fullName || 'Guest'}
- Phone: ${phone}
- Route: ${pickup} to ${destination}
- Date: ${date}
- Vehicle: ${vehicle}
- Passengers: ${passengers}
- Notes: ${notes || 'Standard booking'}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#0d1424] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Modal Top */}
        <div className="p-5 bg-gradient-to-r from-slate-900 to-[#16213b] border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white font-['Outfit',sans-serif]">
              {submitted ? 'Booking Request Received' : 'Book Cab / Tour Package'}
            </h3>
            <span className="text-xs text-slate-400">
              {submitted ? 'Our mountain travel coordinator will connect shortly' : 'Prompt response within 15 minutes · Zero booking fee'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {submitted ? (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-2">
                <h4 className="text-xl font-bold text-white font-['Outfit',sans-serif]">
                  Thank You, {fullName}!
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                  Your trip request has been registered under Reference ID <strong className="text-amber-400 font-mono">{bookingRef}</strong>.
                </p>
              </div>

              {/* Trip Summary Card */}
              <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 text-left text-xs space-y-2 max-w-md mx-auto">
                <div className="flex justify-between">
                  <span className="text-slate-400">Route:</span>
                  <span className="text-white font-medium">{pickup} ➔ {destination}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Travel Date:</span>
                  <span className="text-white font-medium">{date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Vehicle:</span>
                  <span className="text-white font-medium">{vehicle}</span>
                </div>
                {prefill?.estimatedFare && (
                  <div className="flex justify-between border-t border-slate-800 pt-2 font-semibold">
                    <span className="text-amber-400">Estimated Total:</span>
                    <span className="text-amber-400 font-mono text-sm">₹{prefill.estimatedFare.toLocaleString()}</span>
                  </div>
                )}
              </div>

              <div className="space-y-3 max-w-md mx-auto">
                <a
                  href={`https://wa.me/${COMPANY_INFO.phoneRaw1}?text=${encodeURIComponent(whatsappInquiryText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-400/20"
                >
                  <MessageCircle className="w-4 h-4 fill-slate-950" />
                  <span>Send Details on WhatsApp</span>
                </a>

                <a
                  href={`tel:${COMPANY_INFO.phoneRaw1}`}
                  className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Call Dispatch Desk ({COMPANY_INFO.phone1})</span>
                </a>

                <button
                  onClick={onClose}
                  className="text-xs text-slate-400 hover:text-slate-200"
                >
                  Back to Website
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              
              {prefill?.estimatedFare && (
                <div className="p-3 bg-amber-400/10 border border-amber-400/30 rounded-xl flex items-center justify-between text-xs">
                  <span className="text-slate-300">Selected Estimate:</span>
                  <span className="text-amber-400 font-bold font-mono text-sm">₹{prefill.estimatedFare.toLocaleString()}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Ramesh Chandra"
                      className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Mobile Number (WhatsApp) *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 w-4 h-4 text-emerald-400" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 9876543210"
                      className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Pickup Location *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-amber-400" />
                    <input
                      type="text"
                      required
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      placeholder="e.g. Haridwar, Dehradun Airport"
                      className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Destination / Tour Circuit *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-emerald-400" />
                    <input
                      type="text"
                      required
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      placeholder="e.g. Kedarnath & Badrinath"
                      className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Travel Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full pl-9 pr-2 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Vehicle Type
                  </label>
                  <select
                    value={vehicle}
                    onChange={(e) => setVehicle(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    {VEHICLE_FLEET.map((v) => (
                      <option key={v.id} value={v.name}>
                        {v.name.split('(')[0]}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Passengers
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={passengers}
                    onChange={(e) => setPassengers(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Special Requests / Luggage / Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Need baby seat, carrier for extra bags, senior citizen assistance..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                ></textarea>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero advance needed for initial booking inquiry. Pay after driver assignment.</span>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-md shadow-amber-400/20 font-medium"
              >
                <span>Submit Booking Request</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
