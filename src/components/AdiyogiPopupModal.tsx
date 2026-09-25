import React, { useState, useEffect } from 'react';
import { X, Send, Sparkles, CheckCircle2 } from 'lucide-react';
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

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Namaste Mannat Tour & Travels 🙏\nI would like to get a FREE QUOTE for my upcoming tour:\n\n👤 *Name:* ${name || 'Guest'}\n📞 *Phone:* ${phone}\n📍 *Destination:* ${destination || 'Custom Yatra / Tour'}\n📅 *Travel Date:* ${travelDate || 'Flexible'}\n\nPlease share the detailed quote & available packages on WhatsApp. Thank you!`;
    const whatsappUrl = `https://wa.me/${SITE_INFO.whatsappRaw}?text=${encodeURIComponent(msg)}`;
    setIsSuccess(true);
    window.open(whatsappUrl, '_blank');
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2500);
  };

  return (
    <div
      className="fixed bottom-4 right-4 z-[9999] max-w-[340px] sm:max-w-[380px] w-full"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-[#0B101A] border-2 border-[#f1683a] rounded-2xl shadow-2xl overflow-hidden text-slate-100 animate-in slide-in-from-bottom-5 duration-300">
        
        {/* Header - Exact adiyogi title: "Get free quotes from us !" */}
        <div className="bg-gradient-to-r from-[#172133] via-[#0E1422] to-[#172133] px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#f1683a]/20 border border-[#f1683a]/50 flex items-center justify-center text-[#f1683a] text-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-sm sm:text-base text-white">
                Get free quotes from us !
              </h3>
              <span className="text-[10px] text-emerald-400 font-semibold block">
                ✦ Instant Quote on WhatsApp
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center text-sm transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body - Exact adiyogi fields: Your Name, Phone number, Destination, Travel date */}
        <div className="p-5">
          {isSuccess ? (
            <div className="py-8 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h4 className="font-bold text-white text-sm">Inquiry Forwarded!</h4>
              <p className="text-xs text-slate-400">Opening WhatsApp to connect you with our tour manager...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Your Name <span className="text-[#f1683a]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#f1683a] placeholder:text-slate-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Phone number <span className="text-[#f1683a]">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="phone number"
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#f1683a] placeholder:text-slate-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Destination
                </label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="your destination (e.g. Kedarnath, Shimla, Kainchi Dham)"
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#f1683a] placeholder:text-slate-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Travel date <span className="text-[#f1683a]">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#f1683a]"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-2.5 rounded-lg bg-[#f1683a] hover:bg-[#d95325] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition shadow-lg shadow-[#f1683a]/30 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
