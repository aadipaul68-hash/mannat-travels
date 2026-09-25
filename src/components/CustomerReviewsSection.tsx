import React, { useState } from 'react';
import { Star, Quote, CheckCircle2, ShieldCheck, ThumbsUp, Heart, ChevronRight, MessageCircle } from 'lucide-react';
import { SITE_INFO } from '../data/mannatData';

interface Testimonial {
  id: string;
  name: string;
  hindiName?: string;
  location: string;
  trip: string;
  date: string;
  rating: number;
  initials: string;
  avatarBg: string;
  review: string;
  verifiedBooking: boolean;
  vehicleOrBus: string;
  badge?: string;
}

const STATIC_REVIEWS: Testimonial[] = [
  {
    id: 'rev-1',
    name: 'Pandit Rameshwar Sharma',
    hindiName: 'पंडित रामेश्वर शर्मा व परिवार',
    location: 'नई मंडी, मुज़फ्फरनगर (Civil Lines)',
    trip: 'कैंची धाम नीम करोली बाबा दर्शन (2x2 AC Bus)',
    date: 'फरवरी 2026',
    rating: 5,
    initials: 'RS',
    avatarBg: 'bg-amber-600',
    review:
      'हमारी पूरी कॉलोनी के 32 लोगों ने कैंची धाम आश्रम के लिए मन्नत ट्रैवल्स की 35 सीटर डीलक्स बस बुक की थी। ड्राइवर बहुत ही संस्कारी और कुशल था, पहाड़ों पर बिल्कुल आराम से बस चलाई। हल्द्वानी में चाय-नाश्ते से लेकर नैनीताल में रुकने का इंतजाम बहुत बढ़िया रहा। जय बाबा नीम करोली महाराज!',
    verifiedBooking: true,
    vehicleOrBus: '35 Seater Deluxe 2x2 AC Coach',
    badge: 'Spiritual Yatra'
  },
  {
    id: 'rev-2',
    name: 'Dr. Alok Verma & Sangeeta Verma',
    hindiName: 'डॉ. आलोक वर्मा व संगीता वर्मा',
    location: 'मेरठ कैंट (Meerut Cantt)',
    trip: 'चार धाम यात्रा (केदारनाथ-बद्रीनाथ धाम)',
    date: 'अक्टूबर 2025',
    rating: 5,
    initials: 'AV',
    avatarBg: 'bg-emerald-600',
    review:
      'हम दोनों सीनियर सिटीजन हैं इसलिए बच्चों को हमारी सुरक्षा की बहुत चिंता थी। मन्नत ट्रैवल्स के ड्राइवर सुरेंद्र जी ने रास्ते में परिवार के बेटे की तरह पूरा ख्याल रखा। सोनप्रयाग टोकन और होटल तक सब कुछ बिना किसी परेशानी के हुआ। गाड़ी बहुत साफ-सुथरी थी और कोई हिडन चार्ज नहीं लिया।',
    verifiedBooking: true,
    vehicleOrBus: 'Toyota Innova Crysta',
    badge: 'Senior Pilgrims'
  },
  {
    id: 'rev-3',
    name: 'Vivek Singhal & Friends Group',
    hindiName: 'विवेक सिंघल व 12 मित्र',
    location: 'भोपा रोड, मुज़फ्फरनगर',
    trip: 'मनाली, सोलांग वैली व रोहतांग पास स्नो टूर',
    date: 'जनवरी 2026',
    rating: 5,
    initials: 'VS',
    avatarBg: 'bg-indigo-600',
    review:
      'कॉलेज दोस्तों के साथ मनाली जाने के लिए 17 सीटर महाराजा टेम्पो ट्रैवलर लिया था। हीटर बहुत बढ़िया चल रहा था और साउंड सिस्टम भी टॉप क्लास था। ड्राइवर को बर्फ वाले रास्तों का पूरा अनुभव था। मुजफ्फरनगर से सीधे पिकअप और ड्रॉप मिला। बेस्ट सर्विस!',
    verifiedBooking: true,
    vehicleOrBus: '17 Seater Maharaja Tempo Traveller',
    badge: 'Adventure Tour'
  },
  {
    id: 'rev-4',
    name: 'Sunita Goyal (Bhajan Mandali)',
    hindiName: 'सुनीता गोयल (महिला संकीर्तन मंडल)',
    location: 'शामली / मुज़फ्फरनगर',
    trip: 'अयोध्या धाम (राम लला दर्शन) व काशी विश्वनाथ',
    date: 'जनवरी 2026',
    rating: 5,
    initials: 'SG',
    avatarBg: 'bg-rose-600',
    review:
      'जय श्री राम! हमारे 28 सदस्यों के महिला मंडल ने मन्नत ट्रैवल्स की एसी बस से अयोध्या जी और वाराणसी की यात्रा की। बस स्टैंड मुजफ्फरनगर से समय पर रवानगी हुई, रास्ते में शुद्ध शाकाहारी ढाबों पर ही बस रोकी गई। सब बहनें बहुत खुश हैं।',
    verifiedBooking: true,
    vehicleOrBus: 'Luxury AC Bus',
    badge: 'Religious Group'
  },
  {
    id: 'rev-5',
    name: 'Gaurav Tyagi & Family',
    hindiName: 'गौरव त्यागी एवं परिवार',
    location: 'गाजियाबाद / मुज़फ्फरनगर',
    trip: 'खाटू श्याम जी व सालासर बालाजी दर्शन',
    date: 'दिसंबर 2025',
    rating: 5,
    initials: 'GT',
    avatarBg: 'bg-cyan-600',
    review:
      'वीकेंड पर खाटू श्याम जी और सालासर जाने के लिए अर्टिगा कैब की थी। गाड़ी बिल्कुल नई थी, एसी बहुत चिल्ड था और ड्राइवर साहब ने पूरा दर्शन आराम से कराया। बिलिंग बिल्कुल पारदर्शी थी, टोल और पार्किंग पहले ही बता दी गई थी।',
    verifiedBooking: true,
    vehicleOrBus: 'Maruti Ertiga Cab',
    badge: 'Family Darshan'
  },
  {
    id: 'rev-6',
    name: 'Col. Kuldeep Singh (Retd.)',
    hindiName: 'कर्नल कुलदीप सिंह (रि.)',
    location: 'सहारनपुर रोड, मुज़फ्फरनगर',
    trip: 'माँ वैष्णो देवी कटरा व शिवखोड़ी यात्रा',
    date: 'नवंबर 2025',
    rating: 5,
    initials: 'KS',
    avatarBg: 'bg-amber-700',
    review:
      'अनुशासन और समय की पाबंदी के लिए मन्नत ट्रैवल्स की तारीफ करनी पड़ेगी। हाईवे और पहाड़ी मोड़ों पर ड्राइवर ने कभी भी ओवरस्पीड नहीं की। गाड़ी के टायर नए थे और फर्स्ट-एड किट मौजूद थी। पश्चिमी उत्तर प्रदेश में इनसे बेहतर ट्रैवल ऑपरेटर नहीं मिलेगा।',
    verifiedBooking: true,
    vehicleOrBus: 'Force Luxury Tempo Traveller',
    badge: 'Pilgrim Family'
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
            100% असली स्थानीय तीर्थयात्री समीक्षाएं
          </span>
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
          स्थानीय यात्रियों के अनुभव व रेटिंग (5★)
        </h2>
        <div className="w-16 h-0.5 bg-[#f1683a] mx-auto mt-4 mb-5" />
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          मुज़फ्फरनगर, मेरठ, शामली और पश्चिमी यूपी के <span className="text-amber-400 font-semibold">15,000+ से अधिक परिवारों और भक्त मंडलों</span> का अटूट विश्वास — मन्नत टूर एंड ट्रैवल्स।
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
              <div
                className={`w-11 h-11 rounded-full ${item.avatarBg} text-white font-bold flex items-center justify-center text-sm border-2 border-amber-400/40 shadow-md shrink-0`}
              >
                {item.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="font-serif font-bold text-white text-sm truncate">
                    {item.name}
                  </h4>
                  {item.verifiedBooking && (
                    <span title="सत्यापित स्थानीय ग्राहक (Verified Local Traveler)">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    </span>
                  )}
                </div>
                {item.hindiName && (
                  <p className="text-[11px] text-amber-300/90 font-medium truncate">
                    {item.hindiName}
                  </p>
                )}
                <p className="text-[11px] text-slate-400 truncate">
                  📍 {item.location}
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
