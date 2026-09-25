import React, { useState } from 'react';
import { Star, Quote, CheckCircle2, ShieldCheck, ThumbsUp, Heart, ChevronRight, MessageCircle } from 'lucide-react';
import { SITE_INFO } from '../data/mannatData';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  trip: string;
  date: string;
  rating: number;
  avatar: string;
  review: string;
  verifiedBooking: boolean;
  vehicleOrBus: string;
  badge?: string;
}

const STATIC_REVIEWS: Testimonial[] = [
  {
    id: 'rev-1',
    name: 'Pandit Rameshwar Sharma & Family',
    location: 'Muzaffarnagar (Civil Lines)',
    trip: 'Kainchi Dham Neem Karoli Baba Darshan (AC Coach)',
    date: 'February 2026',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    review:
      'We booked the 35-seater 2x2 AC Bus for our family group to Kainchi Dham Ashram. From the morning tea in Haldwani to peaceful darshan and night halt in Nainital, Mannat Travels organized everything flawlessly. The driver was very respectful and handled mountain turns smoothly.',
    verifiedBooking: true,
    vehicleOrBus: '2x2 AC Pushback Coach',
    badge: 'Spiritual Yatra'
  },
  {
    id: 'rev-2',
    name: 'Dr. Alok Verma & Sangeeta Verma',
    location: 'Meerut Cantt',
    trip: 'Complete Char Dham Yatra (Kedarnath & Badrinath)',
    date: 'October 2025',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    review:
      'Being senior citizens, our safety was our children\'s biggest concern. Mannat Tour\'s driver Surendra Ji took care of my parents like family. Clean sanitised car, zero rash driving, and on-time hotel check-ins. Truly 5-star pilgrimage experience!',
    verifiedBooking: true,
    vehicleOrBus: 'Innova Crysta Luxury',
    badge: 'Senior Pilgrims'
  },
  {
    id: 'rev-3',
    name: 'Vivek Singhal & Friends (Group of 12)',
    location: 'Noida Sector 62 / Muzaffarnagar',
    trip: 'Manali & Rohtang Pass Winter Snow Expedition',
    date: 'January 2026',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
    review:
      'Booked a 17-seater Tempo Traveller with premium sound system and heating. The vehicle had high-end pushback seats and spotless curtains. The driver had hill driving permits and knew all secluded photography points in Solang Valley.',
    verifiedBooking: true,
    vehicleOrBus: '17 Seater Maharaja Tempo',
    badge: 'Adventure Tour'
  },
  {
    id: 'rev-4',
    name: 'Sunita Goyal & Bhajan Mandali',
    location: 'Shamli / Muzaffarnagar',
    trip: 'Ayodhya Ram Mandir & Varanasi Ganga Aarti Yatra',
    date: 'January 2026',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    review:
      'Jai Shri Ram! Our 30-member ladies group went to Ayodhya Ram Lalla darshan with Mannat Travels. Very punctual pickup from Muzaffarnagar Bus Stand, safe night driving, and excellent halts for pure vegetarian food. 100% recommended!',
    verifiedBooking: true,
    vehicleOrBus: 'Deluxe AC Bus',
    badge: 'Religious Group'
  },
  {
    id: 'rev-5',
    name: 'Rohan Mehra & Priya Mehra',
    location: 'Delhi NCR',
    trip: 'Kashmir Paradise Holiday (Srinagar & Gulmarg)',
    date: 'December 2025',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    review:
      'Our honeymoon in Gulmarg and Dal Lake Houseboat was organized to perfection. Transparent billing with zero hidden costs, pickup from Srinagar Airport was seamless, and the warm hospitality of the coordinator was exemplary.',
    verifiedBooking: true,
    vehicleOrBus: 'Private SUV Cab',
    badge: 'Holiday Package'
  },
  {
    id: 'rev-6',
    name: 'Col. Kuldeep Singh (Retd.)',
    location: 'Dehradun / Saharanpur',
    trip: 'Vaishno Devi Katra & Shivkhori Darshan',
    date: 'November 2025',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    review:
      'Disciplined service and highly professional staff. The tempo traveller was spotless, tires were brand new, and the driver obeyed speed limits throughout the highway and mountain stretches. Best travel agency in Western UP.',
    verifiedBooking: true,
    vehicleOrBus: 'Luxury Force Traveller',
    badge: 'Family Darshan'
  }
];

export const CustomerReviewsSection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'spiritual' | 'holiday'>('all');

  const filteredReviews = STATIC_REVIEWS.filter((item) => {
    if (filter === 'spiritual') {
      return (
        item.badge?.includes('Spiritual') ||
        item.badge?.includes('Religious') ||
        item.badge?.includes('Pilgrim') ||
        item.badge?.includes('Darshan')
      );
    }
    if (filter === 'holiday') {
      return item.badge?.includes('Adventure') || item.badge?.includes('Holiday');
    }
    return true;
  });

  return (
    <section id="reviews" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative">
      {/* Background Subtle Glows matching the luxury dark aesthetic */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 mb-4">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span className="text-[11px] uppercase tracking-[0.25em] text-amber-400 font-bold">
            Verified Social Proof
          </span>
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
          Customer Reviews & Ratings
        </h2>
        <div className="w-16 h-0.5 bg-[#f1683a] mx-auto mt-4 mb-5" />
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Over <span className="text-amber-400 font-semibold">15,000+ satisfied yatris</span> and holiday travelers trust
          Mannat Tour & Travels for comfortable AC buses, mountain-certified chauffeurs, and transparent pricing.
        </p>

        {/* Aggregate Rating Banner */}
        <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-4 sm:gap-8 px-6 py-4 rounded-2xl bg-[#0B0F19] border border-amber-500/20 shadow-xl">
          <div className="flex items-center gap-3">
            <span className="font-serif text-3xl sm:text-4xl font-black text-amber-400">5.0</span>
            <div>
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5 text-left font-medium">100% 5-Star Experience</p>
            </div>
          </div>
          <div className="hidden sm:block w-px h-8 bg-slate-800" />
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>15,000+ Happy Yatris</span>
          </div>
          <div className="hidden sm:block w-px h-8 bg-slate-800" />
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <ThumbsUp className="w-4 h-4 text-[#f1683a] shrink-0" />
            <span>Muzaffarnagar & Meerut’s #1 Choice</span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
              filter === 'all'
                ? 'bg-[#f1683a] text-white shadow-lg shadow-[#f1683a]/25'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            All Reviews ({STATIC_REVIEWS.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('spiritual')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
              filter === 'spiritual'
                ? 'bg-[#f1683a] text-white shadow-lg shadow-[#f1683a]/25'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Spiritual Yatras
          </button>
          <button
            type="button"
            onClick={() => setFilter('holiday')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
              filter === 'holiday'
                ? 'bg-[#f1683a] text-white shadow-lg shadow-[#f1683a]/25'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Holidays & Adventure
          </button>
        </div>
      </div>

      {/* Testimonials Grid in Dark Luxury Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {filteredReviews.map((item) => (
          <div
            key={item.id}
            className="group rounded-2xl bg-gradient-to-b from-[#0F1523] to-[#0A0D16] border border-amber-500/15 p-6 sm:p-7 flex flex-col justify-between hover:border-amber-500/40 hover:shadow-2xl hover:shadow-amber-500/5 transition-all duration-300 relative overflow-hidden"
          >
            {/* Top golden accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent group-hover:via-[#f1683a] transition-all" />

            {/* Quote Icon watermark */}
            <div className="absolute top-4 right-4 text-amber-500/10 group-hover:text-amber-500/20 transition-colors pointer-events-none">
              <Quote className="w-10 h-10 stroke-[1]" />
            </div>

            <div>
              {/* Header: Rating & Badge */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                {item.badge && (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400">
                    {item.badge}
                  </span>
                )}
              </div>

              {/* Trip Tag */}
              <div className="mb-3">
                <span className="text-xs font-semibold text-[#f1683a] block">
                  {item.trip}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  {item.date} • {item.vehicleOrBus}
                </span>
              </div>

              {/* Review Text */}
              <p className="text-slate-300 text-sm leading-relaxed italic mb-6">
                "{item.review}"
              </p>
            </div>

            {/* Author Profile */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3">
              <img
                src={item.avatar}
                alt={item.name}
                className="w-11 h-11 rounded-full object-cover border border-amber-500/30"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="font-serif font-bold text-white text-sm truncate">
                    {item.name}
                  </h4>
                  {item.verifiedBooking && (
                    <span title="Verified Traveler">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 truncate">
                  {item.location}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA Card */}
      <div className="mt-14 rounded-2xl bg-gradient-to-r from-[#0C111C] via-[#141B2D] to-[#0C111C] border border-amber-500/25 p-8 text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-amber-500/5 pointer-events-none" />
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2">
          Experience the Mannat Travels Standard for Yourself
        </h3>
        <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto mb-6">
          Whether you want a seat on our upcoming AC Bus to Kainchi Dham or an exclusive family cab to Char Dham, we ensure 100% comfort, safety, and joy.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={`https://wa.me/${SITE_INFO.whatsappRaw}?text=${encodeURIComponent(
              'Hello Mannat Travels! I saw the customer reviews on your website and would like to inquire about booking a tour.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#f1683a] to-amber-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#f1683a]/30 hover:scale-105 transition-transform"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Chat on WhatsApp ({SITE_INFO.phone})</span>
          </a>
          <a
            href={`tel:${SITE_INFO.phone}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-amber-500/30 text-white font-bold text-xs uppercase tracking-wider hover:bg-slate-800 transition-colors"
          >
            <span>Call 24/7 Helpline</span>
          </a>
        </div>
      </div>
    </section>
  );
};
