import React, { useState } from 'react';
import { Star, ChevronDown, ChevronUp, Quote, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS, FAQS } from '../data/travelData';

export const TestimonialsSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section id="testimonials" className="py-16 sm:py-20 bg-[#0d1424] border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Testimonials Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
            Verified Pilgrim & Traveler Experiences
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-['Outfit',sans-serif]">
            Trusted by 15,000+ Yatris
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Read authentic reviews from families, elderly pilgrims, and adventure groups who explored the Himalayas with Mannat Tour N Travels.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-[#111a2f] border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-500 font-mono">{t.date}</span>
                </div>

                <p className="text-sm text-slate-300 italic leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white font-['Outfit',sans-serif] flex items-center gap-1.5">
                    <span>{t.name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="text-xs text-slate-400">
                    {t.city} · <span className="text-amber-400/90">{t.destination}</span>
                  </div>
                </div>
                <div className="text-xs font-mono text-slate-500">
                  {t.vehicle}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto space-y-6 pt-4">
          <div className="text-center space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-white font-['Outfit',sans-serif]">
              Frequently Asked Questions
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Clear answers regarding bookings, hill driving safety, taxes, and permits.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#111a2f] border border-slate-800 rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 text-sm font-semibold text-white hover:text-amber-400 transition-colors"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-amber-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
