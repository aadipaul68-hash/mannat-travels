import React from 'react';
import { Phone, Mail, MapPin, Shield, Award, Clock } from 'lucide-react';
import { COMPANY_INFO } from '../data/travelData';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-[#080d17] border-t border-slate-800 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <span className="text-xl font-bold text-white font-['Outfit',sans-serif]">
                {COMPANY_INFO.name}
              </span>
              <p className="text-xs text-amber-400 mt-1">
                {COMPANY_INFO.tagline}
              </p>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Your most trusted travel partner for sacred Char Dham Yatra pilgrimages, Dehradun & Jolly Grant airport taxis, outstation hill cabs, and luxury tempo traveller group rentals.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Award className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{COMPANY_INFO.authorizedBy}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-semibold text-white uppercase tracking-wider">
              Quick Links
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#spiritual-bus" className="text-amber-400 hover:underline font-semibold flex items-center gap-1">
                  <span>Spiritual Bus Tours (बस यात्रा)</span>
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-amber-400 transition-colors">
                  Char Dham Yatra Packages
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-amber-400 transition-colors">
                  Kedarnath & Badrinath Tours
                </a>
              </li>
              <li>
                <a href="#fleet" className="hover:text-amber-400 transition-colors">
                  Innova & Tempo Traveller Fleet
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-amber-400 transition-colors">
                  Route Fare Estimator
                </a>
              </li>
              <li>
                <a href="#chardham" className="hover:text-amber-400 transition-colors">
                  Yatra Registration Guide
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-amber-400 transition-colors">
                  Pilgrim Reviews & FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-semibold text-white uppercase tracking-wider">
              24/7 Dispatch Office & Contacts
            </div>

            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-slate-300">
                  {COMPANY_INFO.address}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <div className="flex gap-2">
                  <a href={`tel:${COMPANY_INFO.phoneRaw1}`} className="text-white hover:text-amber-400">
                    {COMPANY_INFO.phone1}
                  </a>
                  <span>·</span>
                  <a href={`tel:${COMPANY_INFO.phoneRaw2}`} className="text-white hover:text-amber-400">
                    {COMPANY_INFO.phone2}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="text-white hover:text-amber-400">
                  {COMPANY_INFO.email}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Operating 24 Hours / 365 Days across Uttarakhand</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <div>
            © {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span>Dehradun</span>
            <span aria-hidden="true">·</span>
            <span>Haridwar</span>
            <span aria-hidden="true">·</span>
            <span>Rishikesh</span>
            <span aria-hidden="true">·</span>
            <span>Kedarnath</span>
            <span aria-hidden="true">·</span>
            <span>Badrinath</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
