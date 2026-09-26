import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Phone, MessageCircle } from 'lucide-react';
import { SITE_INFO } from '../data/mannatData';

export interface AdiyogiSlide {
  id: string;
  image: string;
  title: string;
  topic: string;
  author: string;
  destinationName: string;
  destinationState: string;
  description: string;
  ctaText?: string;
  ctaLink?: string;
}

export const ADIYOGI_SLIDES: AdiyogiSlide[] = [
  {
    id: 'slide-1',
    image: '/images/adiyogi/banner-1.jpg',
    title: 'MANNAT TOUR',
    topic: '& TRAVELS',
    author: 'Explore more with Us',
    destinationName: 'CHAR DHAM YATRA',
    destinationState: 'Uttarakhand Devbhoomi',
    description:
      'Join us as we traverse the sacred CHARDHAM, where every step is a pilgrimage, and every prayer echoes through the HIMALAYAN VALLEYS. Uttarakhand’s Char Dham invites you to embark on a SPIRITUAL sojourn, immersing yourself in the DIVINE AURA of these revered shrines and the timeless serenity of the Himalayas.',
    ctaText: 'SEE MORE',
    ctaLink: '#popular-tours',
  },
  {
    id: 'slide-2',
    image: '/images/adiyogi/banner-2.jpg',
    title: 'SHIMLA & MANALI',
    topic: '& HIMALAYAS',
    author: 'Luxury Hill Holidays',
    destinationName: 'MANALI & SOLANG',
    destinationState: 'Himachal Pradesh',
    description:
      'Snow-clad Himalayan peaks, Rohtang Pass adventures, tranquil cedar pine forests, and refreshing mountain air. Experience handpicked resort stays, cozy dinners, and guided sightseeing across the queen of hill stations.',
    ctaText: 'SEE MORE',
    ctaLink: '#popular-tours',
  },
  {
    id: 'slide-3',
    image: '/images/adiyogi/banner-3.jpg',
    title: 'KAINCHI DHAM',
    topic: '& NAINITAL LAKES',
    author: 'Sacred Ashram & Hill Retreat',
    destinationName: 'KAINCHI DHAM',
    destinationState: 'Kumaon Hills',
    description:
      'Experience divine blessings at revered Neem Karoli Baba Kainchi Dham Ashram, Maa Naina Devi temple, and serene yachting on emerald Naini Lake. Relax among pine trees and mountain temples with all-inclusive deluxe travel.',
    ctaText: 'SEE MORE',
    ctaLink: '#popular-tours',
  },
  {
    id: 'slide-4',
    image: '/images/adiyogi/banner-4.jpg',
    title: 'RISHIKESH & HARIDWAR',
    topic: '& GANGA AARTI',
    author: 'Spiritual Riverbank Tours',
    destinationName: 'RISHIKESH & HARIDWAR',
    destinationState: 'Sacred Ganges',
    description:
      'Witness the mesmerizing evening Ganga Aarti at Har Ki Pauri and Triveni Ghat, suspension bridges across the holy Ganges, ancient ashrams, and thrilling river rafting adventures in the world yoga capital Rishikesh.',
    ctaText: 'SEE MORE',
    ctaLink: '#popular-tours',
  },
];

interface AdiyogiHeroSliderProps {
  onOpenQuoteModal: () => void;
}

export const AdiyogiHeroSlider: React.FC<AdiyogiHeroSliderProps> = ({ onOpenQuoteModal }) => {
  const [slides, setSlides] = useState<AdiyogiSlide[]>(ADIYOGI_SLIDES);
  const [animationClass, setAnimationClass] = useState<'' | 'next' | 'prev'>('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const autoNextRef = useRef<NodeJS.Timeout | null>(null);

  const handleNext = () => {
    setSlides((prev) => {
      const [first, ...rest] = prev;
      return [...rest, first];
    });
    setAnimationClass('next');
    resetAnimation();
  };

  const handlePrev = () => {
    setSlides((prev) => {
      const last = prev[prev.length - 1];
      const rest = prev.slice(0, prev.length - 1);
      return [last, ...rest];
    });
    setAnimationClass('prev');
    resetAnimation();
  };

  const resetAnimation = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setAnimationClass('');
    }, 1500);

    // Reset auto next
    if (autoNextRef.current) clearTimeout(autoNextRef.current);
    autoNextRef.current = setTimeout(() => {
      handleNext();
    }, 3000);
  };

  useEffect(() => {
    autoNextRef.current = setTimeout(() => {
      handleNext();
    }, 3000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (autoNextRef.current) clearTimeout(autoNextRef.current);
    };
  }, []);

  const activeSlide = slides[0];

  return (
    <section className="relative overflow-hidden w-full select-none" id="hero">
      <div className={`adiyogi-carousel ${animationClass}`}>
        
        {/* Main Full-Screen Slides List */}
        <div className="list">
          {slides.map((slide, index) => {
            const isFirst = index === 0;
            return (
              <div
                key={slide.id}
                className="item"
                style={{
                  display: isFirst || index === 1 ? 'block' : 'none',
                  zIndex: isFirst ? 1 : 0,
                }}
              >
                <img
                  src={slide.image}
                  alt={`${slide.title} ${slide.topic}`}
                  loading={isFirst ? 'eager' : 'lazy'}
                />

                {isFirst && (
                  <div className="content">
                    <div className="author">{slide.author}</div>
                    <div className="title font-serif">{slide.title}</div>
                    <div className="topic font-serif">{slide.topic}</div>
                    <div className="des">{slide.description}</div>

                    <div className="buttons">
                      <a
                        href={slide.ctaLink || '#popular-tours'}
                        className="btn-luxury-primary !px-7 !py-3.5 !text-xs font-bold"
                      >
                        <span>{slide.ctaText || 'SEE MORE'}</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </a>
                      <button
                        type="button"
                        onClick={onOpenQuoteModal}
                        className="btn-luxury-outline !px-7 !py-3.5 !text-xs font-bold cursor-pointer"
                      >
                        <span>GET FREE QUOTE</span>
                      </button>
                      <a
                        href={`https://wa.me/${SITE_INFO.whatsappRaw}?text=${encodeURIComponent(
                          `Hello Mannat Tours! I would like to inquire about ${slide.title} ${slide.topic}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden sm:inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-emerald-500/40 bg-emerald-950/50 hover:bg-emerald-900/70 text-emerald-300 text-xs font-bold uppercase tracking-wider transition backdrop-blur-md"
                      >
                        <MessageCircle className="w-4 h-4 fill-emerald-400 text-emerald-400" />
                        <span>WHATSAPP</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Floating Thumbnails Strip at bottom right (Adiyogi style) */}
        <div className="adiyogi-thumbnail">
          {slides.slice(1).concat(slides.slice(0, 1)).map((slide) => (
            <div
              key={`thumb-${slide.id}`}
              className="item"
              onClick={handleNext}
              title={`View ${slide.title}`}
            >
              <img src={slide.image} alt={slide.destinationName} />
              <div className="content">
                <div className="title">{slide.destinationName}</div>
                <div className="description">{slide.destinationState}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Navigation Arrows (< >) */}
        <div className="adiyogi-arrows">
          <button id="prev" onClick={handlePrev} aria-label="Previous Slide">
            &lt;
          </button>
          <button id="next" onClick={handleNext} aria-label="Next Slide">
            &gt;
          </button>
        </div>

        {/* Auto Progress Bar */}
        <div className="time" />
      </div>
    </section>
  );
};
