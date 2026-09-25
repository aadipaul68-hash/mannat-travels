import React from 'react';
import { MessageCircle, Phone, Calendar } from 'lucide-react';
import { COMPANY_INFO } from '../data/travelData';

interface FloatingActionsProps {
  onOpenBooking: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onOpenBooking }) => {
  return (
    <>
      {/* Floating WhatsApp Action Button */}
      <aside aria-label="Quick contact" className="fixed bottom-20 sm:bottom-6 right-5 z-40">
        <a
          href={`https://wa.me/${COMPANY_INFO.phoneRaw1}?text=${encodeURIComponent(COMPANY_INFO.whatsappMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center w-14 h-14 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-full shadow-2xl shadow-emerald-500/40 transition-transform hover:scale-105"
          aria-label="Chat with Mannat Travels on WhatsApp"
        >
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-400"></span>
          </span>
          <MessageCircle className="w-7 h-7 fill-slate-950 text-slate-950" />
          
          {/* Tooltip on hover */}
          <span className="hidden sm:group-hover:block absolute right-16 px-3 py-1.5 bg-slate-900 border border-slate-700 text-white text-xs font-medium rounded-lg whitespace-nowrap shadow-lg">
            Chat 24/7 on WhatsApp
          </span>
        </a>
      </aside>

      {/* Mobile Sticky Quick Bar (Complying with <= 15% mobile viewport height cap) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0d1424]/95 backdrop-blur-md border-t border-slate-800 p-2.5 flex items-center gap-2">
        <a
          href={`tel:${COMPANY_INFO.phoneRaw1}`}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-white bg-slate-800 rounded-xl active:bg-slate-700 transition-colors"
        >
          <Phone className="w-4 h-4 text-amber-400" />
          <span>Call 24/7</span>
        </a>
        <button
          onClick={onOpenBooking}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-slate-950 bg-amber-400 rounded-xl active:bg-amber-300 transition-colors font-medium shadow-md shadow-amber-400/20"
        >
          <Calendar className="w-4 h-4" />
          <span>Book Cab / Tour</span>
        </button>
      </div>
    </>
  );
};
