import React, { useState } from 'react';
import { Compass, CheckCircle2, AlertTriangle, ShieldCheck, HeartPulse, Mountain, Plane, Calendar, ExternalLink } from 'lucide-react';
import { COMPANY_INFO } from '../data/travelData';

export const YatraGuideSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'circuit' | 'registration' | 'helicopter' | 'preparation'>('circuit');

  const dhams = [
    {
      name: 'Yamunotri Dham',
      altitude: '3,291 m (10,797 ft)',
      river: 'Yamuna River',
      trek: '6 km from Janki Chatti',
      significance: 'Seat of Goddess Yamuna. Taking a holy bath in the hot water spring of Surya Kund and cooking rice wrapped in muslin cloth.',
      step: '01'
    },
    {
      name: 'Gangotri Dham',
      altitude: '3,100 m (10,170 ft)',
      river: 'Bhagirathi River',
      trek: 'Directly motorable',
      significance: 'Origin of the sacred river Ganga brought down to Earth by King Bhagirath. Pristine deodar forests and Bhagirath Shila.',
      step: '02'
    },
    {
      name: 'Kedarnath Dham',
      altitude: '3,583 m (11,755 ft)',
      river: 'Mandakini River',
      trek: '16-18 km from Gaurikund',
      significance: 'The supreme Jyotirlinga of Lord Shiva situated against the majestic Kedar Dome peaks. Helicopter and pony options available.',
      step: '03'
    },
    {
      name: 'Badrinath Dham',
      altitude: '3,300 m (10,827 ft)',
      river: 'Alaknanda River',
      trek: 'Directly motorable',
      significance: 'Abode of Lord Badri Vishal (Lord Vishnu). Features natural thermal hot springs at Tapt Kund and historic Mana Village.',
      step: '04'
    }
  ];

  return (
    <section id="chardham" className="py-16 sm:py-20 bg-[#0b101b] border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
            Sacred Pilgrimage Advisory & Knowledge Center
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-['Outfit',sans-serif]">
            Char Dham Yatra Essential Guide
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Everything you need for a safe, spiritual, and comfortable pilgrimage: traditional route sequence, registration protocols, helicopter guidelines, and mountain safety.
          </p>
        </div>

        {/* Tab Navigator */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 bg-slate-900 border border-slate-800 rounded-xl gap-1">
            <button
              onClick={() => setActiveTab('circuit')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'circuit' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              The 4 Dhams Circuit
            </button>
            <button
              onClick={() => setActiveTab('registration')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'registration' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Govt Registration
            </button>
            <button
              onClick={() => setActiveTab('helicopter')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'helicopter' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Helicopter Tickets
            </button>
            <button
              onClick={() => setActiveTab('preparation')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'preparation' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Health & Packing
            </button>
          </div>
        </div>

        {/* Tab 1: The 4 Dhams Circuit */}
        {activeTab === 'circuit' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {dhams.map((dham) => (
              <div
                key={dham.name}
                className="bg-[#111a2f] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-amber-400/40 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-amber-400 font-semibold font-mono">
                    <span>STEP {dham.step}</span>
                    <span className="text-slate-400 font-normal">{dham.altitude}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white font-['Outfit',sans-serif]">
                    {dham.name}
                  </h3>
                  <div className="space-y-1 text-xs text-slate-300">
                    <div>
                      <span className="text-slate-500">Holy River: </span>
                      <span className="text-amber-300 font-medium">{dham.river}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Accessibility: </span>
                      <span className="text-white">{dham.trek}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed pt-2 border-t border-slate-800/80">
                    {dham.significance}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Govt Biometric Registration */}
        {activeTab === 'registration' && (
          <div className="bg-[#111a2f] border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-amber-400/10 text-amber-400 rounded-xl shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white font-['Outfit',sans-serif]">
                  Mandatory Uttarakhand Tourist Care Registration
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  Every yatri must register on the Uttarakhand Government portal before beginning the journey. Registration generates a unique Yatra Pass QR code required at checkposts.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800">
                <div className="text-xs font-bold text-amber-400 mb-1">Step 1: ID Verification</div>
                <p className="text-xs text-slate-400">Keep Aadhaar Card / Voter ID and individual mobile numbers ready for each traveler.</p>
              </div>
              <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800">
                <div className="text-xs font-bold text-amber-400 mb-1">Step 2: Slot Selection</div>
                <p className="text-xs text-slate-400">Choose dates for Yamunotri, Gangotri, Kedarnath, and Badrinath as per your itinerary.</p>
              </div>
              <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800">
                <div className="text-xs font-bold text-amber-400 mb-1">Step 3: Free Assistance</div>
                <p className="text-xs text-slate-400">Mannat Travels team assists all our booked passengers with registration at zero extra cost.</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Kedarnath Helicopter Guidelines */}
        {activeTab === 'helicopter' && (
          <div className="bg-[#111a2f] border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-sky-400/10 text-sky-400 rounded-xl shrink-0">
                <Plane className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white font-['Outfit',sans-serif]">
                  Kedarnath Helicopter Ticket Guidance
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  Avoid fraudulent third-party booking websites. Official tickets are sold exclusively through the IRCTC HeliYatra portal.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800">
                <div className="text-xs font-bold text-sky-400 mb-1">Sirsi Helipad</div>
                <div className="text-xs text-slate-300">Flight Time: ~7 mins</div>
                <p className="text-xs text-slate-400 mt-1">Closest helipad with frequent sorties and modern passenger terminals.</p>
              </div>
              <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800">
                <div className="text-xs font-bold text-sky-400 mb-1">Phata Helipad</div>
                <div className="text-xs text-slate-300">Flight Time: ~9 mins</div>
                <p className="text-xs text-slate-400 mt-1">Central location with multiple aviation operators operating simultaneously.</p>
              </div>
              <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800">
                <div className="text-xs font-bold text-sky-400 mb-1">Guptkashi Helipad</div>
                <div className="text-xs text-slate-300">Flight Time: ~14 mins</div>
                <p className="text-xs text-slate-400 mt-1">Ideal for pilgrims staying in luxury resort properties in Guptkashi.</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Health & Packing */}
        {activeTab === 'preparation' && (
          <div className="bg-[#111a2f] border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-emerald-400/10 text-emerald-400 rounded-xl shrink-0">
                <HeartPulse className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white font-['Outfit',sans-serif]">
                  High Altitude Health & Packing Essentials
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  Kedarnath sits at nearly 12,000 feet where temperatures can drop below freezing even in May and June.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs text-slate-300">
              <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-white uppercase tracking-wider text-[11px]">Clothing & Gear</div>
                <ul className="space-y-1 text-slate-400 list-disc list-inside">
                  <li>Thermal innerwear (2 pairs) & fleece jacket</li>
                  <li>Waterproof windcheater / rain poncho</li>
                  <li>Sturdy trekking shoes with firm mountain grip</li>
                  <li>Woolen gloves, monkey cap & UV sunglasses</li>
                </ul>
              </div>
              <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-white uppercase tracking-wider text-[11px]">Medical & Fitness</div>
                <ul className="space-y-1 text-slate-400 list-disc list-inside">
                  <li>Personal prescribed medications with 5 days buffer</li>
                  <li>Portable oxygen spray can (available in Haridwar)</li>
                  <li>Stay hydrated; drink warm water every 30 mins</li>
                  <li>Walk briskly for 30 minutes daily before your trip</li>
                </ul>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
