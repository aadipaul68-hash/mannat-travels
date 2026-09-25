import React, { useState } from 'react';
import { Send, Phone, MapPin, Calendar, CheckCircle2, Clock } from 'lucide-react';
import { SITE_INFO } from '../data/mannatData';

export const AdiyogiContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [destination, setDestination] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Namaste Mannat Tour & Travels 🙏\n*PLAN YOUR TOUR RIGHT NOW - Booking Inquiry*\n\n👤 *Name:* ${name}\n📞 *Phone:* ${phone}\n📍 *Destination:* ${destination || 'Sacred Pilgrimage / Tour'}\n📅 *Travel Date:* ${travelDate || 'Upcoming'}\n\nPlease contact me with itinerary options and group pricing. Thank you!`;
    const whatsappUrl = `https://wa.me/${SITE_INFO.whatsappRaw}?text=${encodeURIComponent(msg)}`;
    setSubmitted(true);
    window.open(whatsappUrl, '_blank');
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-[0.3em] text-[#f1683a] font-bold block mb-2">
          GET IN TOUCH
        </span>
        {/* Exact heading from adiyogi site */}
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
          Plan Your Tour Right Now
        </h2>
        <div className="w-16 h-1 bg-[#f1683a] mx-auto mt-4 mb-4" />
        <p className="text-slate-400 text-sm sm:text-base">
          Fill in your details below. Our tour coordinators will instantly assist you with seat bookings, custom coaches, and transparent rates.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch max-w-5xl mx-auto">
        
        {/* Contact Info Card */}
        <div className="lg:col-span-5 luxury-card p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            <h3 className="font-serif text-xl font-bold text-white">
              Quick Assistance & Bookings
            </h3>
            
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-[#f1683a]/15 border border-[#f1683a]/40 flex items-center justify-center text-[#f1683a] shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                    Direct Phone / Hotline
                  </span>
                  <a href={`tel:${SITE_INFO.phone}`} className="text-white hover:text-[#f1683a] font-bold text-base transition">
                    {SITE_INFO.phoneFormatted}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                    Office Hours
                  </span>
                  <p className="text-white font-medium">
                    24/7 Support Available for Pilgrims & Travelers
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                    Office Address
                  </span>
                  <p className="text-white font-medium">
                    {SITE_INFO.office}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800">
            <span className="text-[11px] text-[#f1683a] font-semibold block mb-1">
              ✦ Verified Bus Service & Private Cabs
            </span>
            <p className="text-xs text-slate-400">
              Pickups arranged across Muzaffarnagar, Meerut, Delhi NCR, and throughout Western Uttar Pradesh.
            </p>
          </div>
        </div>

        {/* Adiyogi Exact Form */}
        <div className="lg:col-span-7 luxury-card p-8 sm:p-10 border-t-4 border-t-[#f1683a]">
          <h3 className="font-serif text-2xl font-bold text-white mb-2">
            Send Inquiry
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm mb-6">
            Enter your details and receive complete yatra packages & seat confirmations immediately.
          </p>

          {submitted && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-950/70 border border-emerald-500/60 text-emerald-300 text-xs sm:text-sm flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Inquiry forwarded! Opening WhatsApp to connect with our booking officer.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Name <span className="text-[#f1683a]">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="type your name here"
                className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#f1683a] placeholder:text-slate-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Phone <span className="text-[#f1683a]">*</span>
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="type your phone number"
                className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#f1683a] placeholder:text-slate-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Destination
              </label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="your destination (e.g. Kedarnath, Kainchi Dham, Manali)"
                className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#f1683a] placeholder:text-slate-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Travel Date <span className="text-[#f1683a]">*</span>
              </label>
              <input
                type="date"
                required
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#f1683a]"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-4 py-3.5 rounded-lg bg-[#f1683a] hover:bg-[#d95325] text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition shadow-lg shadow-[#f1683a]/30 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>SUBMIT INQUIRY →</span>
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};
