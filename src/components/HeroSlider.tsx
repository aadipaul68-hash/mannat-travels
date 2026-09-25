import React, { useState, useEffect, useCallback } from 'react';
import { Sparkles, Phone, MessageCircle, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_SLIDES, SITE_INFO } from '../data/mannatData';

interface HeroSliderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const activeSlide = HERO_SLIDES[currentSlide];

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-[#080B11] text-white select-none pt-24 pb-16 sm:pb-24"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Images with smooth transitions */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-50 z-0' : 'opacity-0 -z-10'
              }`}
            >
              <div
                className={`w-full h-full bg-cover bg-center transition-transform duration-7000 ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
                style={{ backgroundImage: `url('${slide.image}')` }}
              />
            </div>
          );
        })}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080B11] via-[#080B11]/60 to-[#080B11]/80 z-[1]" />
        <div className="absolute inset-0 hero-glow pointer-events-none z-[1]" />
      </div>

      {/* Main Slide Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 flex flex-col justify-center">
        <div className="mb-4 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-amber-400/30 bg-black/50 backdrop-blur-md text-amber-300 text-xs font-semibold tracking-widest uppercase mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{activeSlide.label}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-4 sm:mb-6 max-w-4xl drop-shadow-md">
            {activeSlide.title}
          </h1>

          <p className="text-slate-300 text-base sm:text-xl font-normal leading-relaxed max-w-2xl mb-8 sm:mb-10">
            {activeSlide.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-10">
            <a href={activeSlide.ctaLink} className="btn-luxury-primary">
              <span>{activeSlide.ctaText}</span>
            </a>
            <a
              href={`tel:${SITE_INFO.phone}`}
              className="btn-luxury-outline hidden sm:inline-flex"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Call {SITE_INFO.phone}</span>
            </a>
            <a
              href={`https://wa.me/${SITE_INFO.whatsappRaw}?text=${encodeURIComponent(
                `Hello Mannat Tours! I would like to inquire about ${activeSlide.title}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-lg border border-emerald-500/40 bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 text-xs font-bold tracking-wider uppercase transition shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-emerald-400 text-emerald-400" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div
          className="p-3 sm:p-4 rounded-2xl bg-[#0D131F]/90 backdrop-blur-md border border-amber-500/30 shadow-2xl max-w-3xl mb-8"
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            <div className="sm:col-span-7 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search destination (Shimla, Manali, Nainital, Kedarnath)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 text-white placeholder:text-slate-400 text-xs sm:text-sm font-medium border border-slate-700 focus:outline-none focus:border-amber-400"
              />
            </div>
            <div className="sm:col-span-5">
              <select
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900/90 text-white text-xs sm:text-sm font-medium border border-slate-700 focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="All">All Tour Categories</option>
                <option value="Spiritual Tours">Spiritual Pilgrimages</option>
                <option value="Outstation Holidays">Hill Stations & Holidays</option>
                <option value="Weekend Tours">Weekend Tours</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Slider Nav Arrows */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous slide"
        className="w-11 h-11 rounded-full border border-amber-400/40 bg-black/50 hover:bg-amber-500 hover:text-black text-amber-300 backdrop-blur-md flex items-center justify-center transition-all duration-200 absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 cursor-pointer shadow-lg active:scale-90"
      >
        <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
      </button>
      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next slide"
        className="w-11 h-11 rounded-full border border-amber-400/40 bg-black/50 hover:bg-amber-500 hover:text-black text-amber-300 backdrop-blur-md flex items-center justify-center transition-all duration-200 absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 cursor-pointer shadow-lg active:scale-90"
      >
        <ChevronRight className="w-5 h-5 stroke-[2.5]" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {HERO_SLIDES.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}: ${slide.title}`}
            className={`transition-all duration-300 rounded-full h-2 ${
              index === currentSlide
                ? 'w-8 bg-amber-400 shadow-sm shadow-amber-400/50'
                : 'w-2 bg-white/30 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-6 sm:bottom-8 right-6 sm:right-10 z-20">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-400/30 bg-black/60 backdrop-blur-md font-mono text-xs shadow-xl">
          <span className="font-bold text-amber-400">0{currentSlide + 1}</span>
          <span className="text-slate-500">/</span>
          <span className="text-slate-400">0{HERO_SLIDES.length}</span>
        </div>
      </div>
    </section>
  );
};
