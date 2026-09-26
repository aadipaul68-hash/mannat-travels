import React, { useState, useEffect } from 'react';
import { X, Send, Sparkles, CheckCircle2, MessageSquare, Minimize2 } from 'lucide-react';
import { SITE_INFO } from '../data/mannatData';

interface AdiyogiPopupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdiyogiPopupModal: React.FC<AdiyogiPopupModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [destination, setDestination] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  // Controls whether the popup is in mini/compact badge view or expanded full view
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Trigger entrance transition after mount
      const t = setTimeout(() => setIsMounted(true), 50);
      return () => clearTimeout(t);
    } else {
      setIsMounted(false);
      setIsExpanded(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isExpanded) {
          setIsExpanded(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isExpanded, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Namaste Mannat Tour & Travels 🙏\nI would like to CONTACT YOU regarding an upcoming tour / pilgrimage inquiry:\n\n👤 *Name:* ${name || 'Guest'}\n📞 *Phone:* ${phone}\n📍 *Destination:* ${destination || 'Custom Tour / Yatra'}\n📅 *Travel Date:* ${travelDate || 'Flexible'}\n\nPlease contact me back on WhatsApp / Call with details. Thank you!`;
    const whatsappUrl = `https://wa.me/${SITE_INFO.whatsappRaw}?text=${encodeURIComponent(msg)}`;
    setIsSuccess(true);
    window.open(whatsappUrl, '_blank');
    setTimeout(() => {
      setIsSuccess(false);
      setIsExpanded(false);
      onClose();
    }, 2500);
  };

  return (
    <div
      aria-label="Contact Us Popup"
      className={`fixed z-[9999] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] select-none ${
        /* Positioned bottom right above WhatsApp icon */
        isExpanded
          ? 'bottom-4 right-3 sm:right-6 left-3 sm:left-auto w-auto sm:w-[370px] max-h-[88vh]'
          : 'bottom-36 sm:bottom-24 right-3 sm:right-6 w-auto'
      } ${
        /* Smooth Slide-in from right transition */
        isMounted
          ? 'opacity-100 translate-x-0 scale-100'
          : 'opacity-0 translate-x-12 scale-95 pointer-events-none'
      }`}
    >
      {/* ✦ 1. COMPACT MINI PILL VIEW (छोटा सा पिल बटन) ✦ */}
      {!isExpanded ? (
        <div className="relative group">
          {/* Glowing pulse aura */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#f1683a] to-amber-500 rounded-full blur opacity-65 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>

          <div className="relative bg-[#0B101A]/95 backdrop-blur-md border border-[#f1683a] rounded-full pl-2 pr-2.5 py-1.5 shadow-2xl flex items-center gap-2 text-slate-100 transition-all duration-300 hover:scale-105">
            {/* Clickable area */}
            <button
              type="button"
              onClick={() => setIsExpanded(true)}
              className="flex items-center gap-2 text-left cursor-pointer group-hover:text-amber-300 transition-colors"
              title="Click to expand Contact Us"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#f1683a] to-amber-500 flex items-center justify-center text-slate-950 font-bold shadow-md shrink-0">
                <MessageSquare className="w-3.5 h-3.5 text-slate-950" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif font-bold text-xs text-white tracking-wide">
                  Contact Us
                </span>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </div>
            </button>

            {/* Close small badge */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Dismiss contact popup"
              className="w-5 h-5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center text-[10px] transition-colors shrink-0 ml-0.5"
              title="Close"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      ) : (
        /* ✦ 2. EXPANDED FULL FORM (स्मूथ ट्रांज़िशन के साथ बड़ा रूप) ✦ */
        <div className="bg-[#0B101A] border-2 border-[#f1683a] rounded-2xl shadow-2xl overflow-hidden text-slate-100 transition-all duration-500 animate-in fade-in zoom-in-95">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#172133] via-[#0E1422] to-[#172133] px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#f1683a]/20 border border-[#f1683a]/50 flex items-center justify-center text-[#f1683a] text-xs shrink-0">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm text-white">
                  Contact Us (हमसे संपर्क करें)
                </h3>
                <span className="text-[10px] text-emerald-400 font-semibold block leading-tight">
                  ✦ 24/7 Response on WhatsApp & Call
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Minimize button back to small pill */}
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                aria-label="Minimize"
                title="Minimize back to small pill"
                className="w-6 h-6 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors text-xs"
              >
                <Minimize2 className="w-3 h-3" />
              </button>

              {/* Close completely */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                title="Close"
                className="w-6 h-6 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors text-xs"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Form Body */}
          <div className="p-4 overflow-y-auto max-h-[75vh]">
            {isSuccess ? (
              <div className="py-6 text-center space-y-2">
                <CheckCircle2 className="w-9 h-9 text-emerald-400 mx-auto" />
                <h4 className="font-bold text-white text-sm">Message Forwarded!</h4>
                <p className="text-xs text-slate-400">Opening WhatsApp to connect you with our tour manager...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2.5">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-0.5">
                    Your Name (आपका नाम) <span className="text-[#f1683a]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#f1683a] placeholder:text-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-0.5">
                    Phone Number (मोबाइल नंबर) <span className="text-[#f1683a]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 9897216666"
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#f1683a] placeholder:text-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-0.5">
                    Destination / Yatra (स्थान)
                  </label>
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="e.g. Kainchi Dham, Kedarnath, Ayodhya, Shimla"
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#f1683a] placeholder:text-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-0.5">
                    Travel Date (यात्रा की तारीख) <span className="text-[#f1683a]">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#f1683a]"
                  />
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-lg bg-[#f1683a] hover:bg-[#d95325] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-lg shadow-[#f1683a]/30 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message (संदेश भेजें)</span>
                  </button>
                </div>

                <div className="text-center pt-0.5">
                  <span className="text-[10px] text-slate-400">
                    Or Call Direct: <a href={`tel:${SITE_INFO.phone}`} className="text-amber-400 hover:underline font-bold">{SITE_INFO.phone}</a>
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
