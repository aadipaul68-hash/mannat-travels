import React, { useState, useEffect } from 'react';
import { X, Send, Sparkles, CheckCircle2, MessageSquare, ChevronUp, Minimize2, PhoneCall } from 'lucide-react';
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

  /* ✦ CASE 1: COMPACT MINI POPUP BADGE (Right side से छोटा सा पॉपअप) ✦ */
  if (!isExpanded) {
    return (
      <aside
        aria-label="Contact Us Popup"
        /* Positioned right side above WhatsApp button */
        className="fixed bottom-36 sm:bottom-24 right-3 sm:right-6 z-[9999] animate-in slide-in-from-right-5 duration-300 select-none"
      >
        <div className="relative group">
          {/* Subtle warm glow ring */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#f1683a] to-amber-500 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-300 animate-pulse"></div>
          
          <div className="relative bg-[#0B101A] border border-[#f1683a] rounded-full pl-2 pr-2.5 py-1.5 shadow-2xl flex items-center gap-2 text-slate-100">
            {/* Clickable mini pill button */}
            <button
              type="button"
              onClick={() => setIsExpanded(true)}
              className="flex items-center gap-2 text-left cursor-pointer group-hover:text-amber-300 transition"
              title="Click to open Contact Us form"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#f1683a] to-amber-500 flex items-center justify-center text-slate-950 font-bold shadow-md shrink-0">
                <MessageSquare className="w-3.5 h-3.5 text-slate-950" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif font-bold text-xs text-white">
                  Contact Us
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              </div>
            </button>

            {/* Close small badge */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Dismiss contact popup"
              className="w-5 h-5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center text-[10px] transition shrink-0 ml-0.5"
              title="Close"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      </aside>
    );
  }

  /* ✦ CASE 2: EXPANDED FULL POPUP (Right side से बड़ा पॉपअप फॉर्म) ✦ */
  return (
    <div
      className="fixed inset-x-2 bottom-16 sm:inset-x-auto sm:bottom-4 sm:right-6 sm:left-auto z-[9999] sm:max-w-[370px] w-auto max-h-[85vh] overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-[#0B101A] border-2 border-[#f1683a] rounded-2xl shadow-2xl overflow-hidden text-slate-100 animate-in slide-in-from-right-6 duration-200">
        
        {/* Header - Contact Us ! */}
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
              className="w-6 h-6 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition text-xs"
            >
              <Minimize2 className="w-3 h-3" />
            </button>

            {/* Close completely */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              title="Close"
              className="w-6 h-6 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition text-xs"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-4">
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
                  className="w-full py-2.5 rounded-lg bg-[#f1683a] hover:bg-[#d95325] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition shadow-lg shadow-[#f1683a]/30 cursor-pointer"
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
    </div>
  );
};
