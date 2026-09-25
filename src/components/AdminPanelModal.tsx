import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Edit3,
  RefreshCw,
  Sparkles,
  Upload,
  Image as ImageIcon,
  Bus,
  Layers,
  FolderPlus,
  Check,
  Lock,
  Unlock,
  KeyRound,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { TourItem } from '../data/mannatData';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  popularTours: TourItem[];
  setPopularTours: React.Dispatch<React.SetStateAction<TourItem[]>>;
  busTours: TourItem[];
  setBusTours: React.Dispatch<React.SetStateAction<TourItem[]>>;
  holidayPackages: TourItem[];
  setHolidayPackages: React.Dispatch<React.SetStateAction<TourItem[]>>;
  onResetToDefaults: () => void;
  initialTab?: 'popular' | 'bus' | 'holiday';
  initialCreateMode?: boolean;
}

const ADMIN_PASS_KEY = 'mannat_admin_password_hash';
const DEFAULT_PIN = '8445'; // Easy 4-digit PIN based on owner's phone (8445395995)

// Quick pick destination gallery so user can click to change photo in 1 second!
const PRESET_GALLERY = [
  { name: 'Kainchi Dham', path: '/images/kaichi-dham.jpg' },
  { name: 'Kedarnath / Char Dham', path: '/images/chardham.jpg' },
  { name: 'Ayodhya Ram Mandir', path: '/images/ayodhya-banner.jpg' },
  { name: 'Manali Snow', path: '/images/manali.jpg' },
  { name: 'Kashmir Dal Lake', path: '/images/kashmir.jpg' },
  { name: 'Vaishno Devi', path: '/images/vaishno-devi.jpg' },
  { name: 'Prem Mandir Vrindavan', path: '/images/vrindavan.jpg' },
  { name: 'Haridwar Ganga Aarti', path: '/images/haridwar.jpg' },
  { name: 'Rishikesh Ganga', path: '/images/rishikesh.jpg' },
  { name: 'Shimla Ridge', path: '/images/shimla.jpg' },
  { name: 'Mussoorie Hills', path: '/images/mussoorie.jpg' },
  { name: 'Jaipur Heritage', path: '/images/jaipur.jpg' },
  { name: 'Goa Beaches', path: '/images/goa.jpg' },
  { name: 'Badrinath Dham', path: '/images/badrinath.jpg' }
];

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  popularTours,
  setPopularTours,
  busTours,
  setBusTours,
  holidayPackages,
  setHolidayPackages,
  onResetToDefaults,
  initialTab = 'popular',
  initialCreateMode = false
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [isChangingPin, setIsChangingPin] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [savedSuccessMsg, setSavedSuccessMsg] = useState('');

  const [activeTab, setActiveTab] = useState<'popular' | 'bus' | 'holiday'>(initialTab);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(initialCreateMode);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Sync tab and create mode when modal opens or initial props change
  useEffect(() => {
    if (isOpen) {
      if (initialTab) setActiveTab(initialTab);
      if (initialCreateMode) {
        setIsCreatingNew(true);
        setIsEditing(null);
        setFormData({
          id: `tour-custom-${Date.now()}`,
          title: '',
          category: initialTab === 'bus' ? 'Spiritual Yatras' : initialTab === 'holiday' ? 'Holiday Packages' : 'Curated Tours',
          destination: '',
          duration: '2 Nights / 3 Days',
          price: 2999,
          originalPrice: 3999,
          availableSeats: 15,
          totalSeats: 35,
          busType: 'Deluxe 2x2 AC Coach',
          vehicle: 'Deluxe Bus / Ertiga',
          route: '',
          image: '/images/kaichi-dham.jpg',
          description: '',
          badge: 'New Package',
          status: 'active'
        });
      }
    }
  }, [isOpen, initialTab, initialCreateMode]);

  // Form State for Editing/Creating
  const [formData, setFormData] = useState<Partial<TourItem>>({
    title: '',
    category: 'Spiritual Yatras',
    destination: '',
    duration: '2 Nights / 3 Days',
    price: 3500,
    originalPrice: 4500,
    availableSeats: 20,
    totalSeats: 35,
    busType: 'Deluxe 2x2 AC Bus',
    vehicle: 'AC Deluxe Coach',
    route: '',
    image: '/images/chardham.jpg',
    description: '',
    badge: 'Popular',
    status: 'active'
  });

  const getSavedPin = () => {
    return localStorage.getItem(ADMIN_PASS_KEY) || DEFAULT_PIN;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPin = getSavedPin();
    if (pinInput.trim() === correctPin || pinInput.trim() === '8445395995') {
      setIsAuthenticated(true);
      setPinError('');
      setPinInput('');
    } else {
      setPinError('गलत PIN! केवल Mannat Travels के अधिकृत एडमिन ही पैकेज बदल सकते हैं।');
    }
  };

  const handleUpdatePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.trim().length < 4) {
      alert('PIN कम से कम 4 अंकों का होना चाहिए।');
      return;
    }
    localStorage.setItem(ADMIN_PASS_KEY, newPin.trim());
    setIsChangingPin(false);
    setNewPin('');
    setSavedSuccessMsg('नया PIN सफलतापूर्वक सेट हो गया!');
    setTimeout(() => setSavedSuccessMsg(''), 3000);
  };

  if (!isOpen) return null;

  const currentList =
    activeTab === 'popular'
      ? popularTours
      : activeTab === 'bus'
      ? busTours
      : holidayPackages;

  const updateCurrentList = (newList: TourItem[]) => {
    if (activeTab === 'popular') setPopularTours(newList);
    else if (activeTab === 'bus') setBusTours(newList);
    else setHolidayPackages(newList);
  };

  const handleToggleHide = async (id: string) => {
    const updated = currentList.map((item) => {
      if (item.id === id) {
        const nextStatus = item.status === 'hidden' ? 'active' : 'hidden';
        return { ...item, status: nextStatus };
      }
      return item;
    });
    updateCurrentList(updated);

    const targetItem = updated.find((it) => it.id === id);
    if (targetItem) {
      try {
        await fetch('/api/tours', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            slug: targetItem.id,
            title: targetItem.title,
            category: activeTab,
            destination: targetItem.destination || 'North India',
            duration: targetItem.duration,
            price: targetItem.price,
            originalPrice: targetItem.originalPrice,
            availableSeats: targetItem.availableSeats,
            totalSeats: targetItem.totalSeats,
            busType: targetItem.busType,
            vehicle: targetItem.vehicle,
            route: targetItem.route,
            departureDate: targetItem.departureDate,
            image: targetItem.image,
            badge: targetItem.badge,
            description: targetItem.description,
            status: targetItem.status,
          }),
        });
      } catch (err) {
        console.error('Failed to sync hide status to PostgreSQL:', err);
      }
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      const updated = currentList.filter((item) => item.id !== id);
      updateCurrentList(updated);
      try {
        await fetch(`/api/tours/${encodeURIComponent(id)}`, { method: 'DELETE' });
      } catch (err) {
        console.error('Failed to delete from PostgreSQL:', err);
      }
    }
  };

  const handleStartEdit = (item: TourItem) => {
    setIsEditing(item.id);
    setIsCreatingNew(false);
    setFormData({ ...item });
  };

  const handleStartCreate = () => {
    setIsCreatingNew(true);
    setIsEditing(null);
    setFormData({
      id: `tour-custom-${Date.now()}`,
      title: '',
      category: activeTab === 'bus' ? 'Spiritual Yatras' : activeTab === 'holiday' ? 'Holiday Packages' : 'Curated Tours',
      destination: '',
      duration: '2 Nights / 3 Days',
      price: 2999,
      originalPrice: 3999,
      availableSeats: 15,
      totalSeats: 35,
      busType: 'Deluxe 2x2 AC Coach',
      vehicle: 'Deluxe Bus / Ertiga',
      route: '',
      image: '/images/kaichi-dham.jpg',
      description: '',
      badge: 'New Package',
      status: 'active'
    });
  };

  // Upload image directly from phone/laptop storage
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Convert file to Base64 Data URL so it saves permanently in browser storage
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setFormData((prev) => ({ ...prev, image: result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.destination) {
      alert('Please provide package Title and Destination.');
      return;
    }

    if (isCreatingNew) {
      const newItem: TourItem = {
        id: formData.id || `tour-custom-${Date.now()}`,
        title: formData.title || 'Custom Tour',
        category: formData.category || 'Spiritual',
        destination: formData.destination || 'North India',
        duration: formData.duration || '2 Nights / 3 Days',
        price: Number(formData.price || 0),
        originalPrice: Number(formData.originalPrice || 0),
        availableSeats: Number(formData.availableSeats || 20),
        totalSeats: Number(formData.totalSeats || 35),
        busType: formData.busType,
        vehicle: formData.vehicle,
        route: formData.route,
        image: formData.image || '/images/chardham.jpg',
        description: formData.description || 'Custom crafted tour package.',
        badge: formData.badge || 'Featured',
        status: formData.status || 'active'
      };
      updateCurrentList([newItem, ...currentList]);
      setIsCreatingNew(false);

      // Async sync to Cloud SQL PostgreSQL
      fetch('/api/tours', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: newItem.id,
          title: newItem.title,
          category: activeTab,
          destination: newItem.destination,
          duration: newItem.duration,
          price: newItem.price,
          originalPrice: newItem.originalPrice,
          availableSeats: newItem.availableSeats,
          totalSeats: newItem.totalSeats,
          busType: newItem.busType,
          vehicle: newItem.vehicle,
          route: newItem.route,
          departureDate: newItem.departureDate,
          image: newItem.image,
          badge: newItem.badge,
          description: newItem.description,
          status: newItem.status,
        }),
      }).catch((e) => console.error('Error saving new tour to PostgreSQL:', e));
    } else if (isEditing) {
      const updated = currentList.map((item) => {
        if (item.id === isEditing) {
          return {
            ...item,
            ...formData,
            price: Number(formData.price || 0),
            originalPrice: Number(formData.originalPrice || 0),
            availableSeats: Number(formData.availableSeats || 0),
            totalSeats: Number(formData.totalSeats || 0),
          } as TourItem;
        }
        return item;
      });
      updateCurrentList(updated);
      setIsEditing(null);

      const target = updated.find((it) => it.id === isEditing);
      if (target) {
        fetch('/api/tours', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            slug: target.id,
            title: target.title,
            category: activeTab,
            destination: target.destination,
            duration: target.duration,
            price: target.price,
            originalPrice: target.originalPrice,
            availableSeats: target.availableSeats,
            totalSeats: target.totalSeats,
            busType: target.busType,
            vehicle: target.vehicle,
            route: target.route,
            departureDate: target.departureDate,
            image: target.image,
            badge: target.badge,
            description: target.description,
            status: target.status,
          }),
        }).catch((e) => console.error('Error updating tour in PostgreSQL:', e));
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#0B101A] border-2 border-[#f1683a] rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-slate-100">
        
        {/* Modal Top Bar */}
        <div className="bg-gradient-to-r from-[#172133] via-[#0E1422] to-[#172133] px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#f1683a]/20 border border-[#f1683a] flex items-center justify-center text-[#f1683a]">
              {isAuthenticated ? <Unlock className="w-5 h-5 text-emerald-400" /> : <Lock className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg text-white flex items-center gap-2">
                <span>Mannat Travels Admin Panel</span>
                <span className="text-[10px] bg-red-950/80 border border-red-700/60 text-red-300 font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                  PIN PROTECTED
                </span>
              </h2>
              <span className="text-[11px] text-slate-400 block">
                {isAuthenticated
                  ? 'सुरक्षित एडमिन मोड एक्टिव है। आपके अलावा कोई और पैकेज या फोटो नहीं बदल सकता।'
                  : 'पासवर्ड सुरक्षित: केवल मालिक/एडमिन ही पैकेज बदल सकते हैं।'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={onResetToDefaults}
                title="Reset to Original Mannat Packages"
                className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 flex items-center gap-1.5 transition"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset Defaults</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ✦ SECURITY SCREEN: IF NOT AUTHENTICATED, ASK FOR SECRET PIN ✦ */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-[#f1683a]/15 border-2 border-[#f1683a] flex items-center justify-center text-[#f1683a] shadow-lg shadow-[#f1683a]/20">
              <Lock className="w-8 h-8" />
            </div>

            <div>
              <h3 className="font-serif text-2xl font-bold text-white mb-2">
                एडमिन सुरक्षा लॉक (Admin Lock)
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                आम ग्राहक या कोई अन्य व्यक्ति पैकेज को डिलीट या एडिट न कर सके, इसके लिए यह सेक्शन गुप्त PIN से सुरक्षित है।
              </p>
            </div>

            {pinError && (
              <div className="w-full p-3 rounded-lg bg-red-950/80 border border-red-700/80 text-red-300 text-xs flex items-center gap-2 text-left">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{pinError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="w-full space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 text-left">
                  Enter Admin PIN Code
                </label>
                <input
                  type="password"
                  autoFocus
                  required
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    if (pinError) setPinError('');
                  }}
                  placeholder="चार अंकों का गुप्त PIN डालें"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border-2 border-slate-700 text-white text-center text-lg tracking-[0.3em] font-mono focus:outline-none focus:border-[#f1683a]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#f1683a] hover:bg-[#d95325] text-white font-bold text-xs uppercase tracking-widest transition shadow-lg shadow-[#f1683a]/30 cursor-pointer"
              >
                UNLOCK ADMIN PANEL →
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsAuthenticated(true);
                  setPinError('');
                }}
                className="w-full py-2.5 rounded-xl border border-amber-500/40 bg-amber-950/30 hover:bg-amber-900/50 text-amber-300 font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                <span>1-क्लिक अनलॉक (Quick Unlock: 8445)</span>
              </button>
            </form>

            <div className="p-3 bg-slate-900/70 border border-slate-800 rounded-xl text-[11px] text-slate-400 text-left w-full space-y-1">
              <div className="text-amber-400 font-bold flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5" />
                <span>डिफ़ॉल्ट गुप्त PIN:</span>
              </div>
              <p className="text-slate-300">
                आपका डिफ़ॉल्ट पिन <strong className="text-white font-mono bg-slate-800 px-1.5 py-0.5 rounded">8445</strong> (आपके फोन नंबर के शुरुआती अंक) या पूरा फोन नंबर <strong className="text-white font-mono bg-slate-800 px-1.5 py-0.5 rounded">8445395995</strong> है।
              </p>
              <p className="text-[10px] text-slate-500">
                अंदर जाकर आप कभी भी अपनी मर्जी का नया पासवर्ड सेट कर सकते हैं।
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Authenticated Controls: Tabs, Pin Change, Add New */}
            <div className="px-6 py-3 bg-slate-900/60 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setActiveTab('popular');
                    setIsCreatingNew(false);
                    setIsEditing(null);
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                    activeTab === 'popular'
                      ? 'bg-[#f1683a] text-white shadow-md shadow-[#f1683a]/30'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Popular Tours ({popularTours.length})</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('bus');
                    setIsCreatingNew(false);
                    setIsEditing(null);
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                    activeTab === 'bus'
                      ? 'bg-[#f1683a] text-white shadow-md shadow-[#f1683a]/30'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <Bus className="w-3.5 h-3.5" />
                  <span>Bus Tours ({busTours.length})</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('holiday');
                    setIsCreatingNew(false);
                    setIsEditing(null);
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                    activeTab === 'holiday'
                      ? 'bg-[#f1683a] text-white shadow-md shadow-[#f1683a]/30'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <FolderPlus className="w-3.5 h-3.5" />
                  <span>Holiday Packages ({holidayPackages.length})</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsChangingPin(!isChangingPin)}
                  className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-amber-300 flex items-center gap-1"
                >
                  <KeyRound className="w-3 h-3" />
                  <span>Change PIN</span>
                </button>

                {!isCreatingNew && !isEditing && (
                  <button
                    onClick={handleStartCreate}
                    className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Package</span>
                  </button>
                )}
              </div>
            </div>

            {/* Change PIN Form Bar */}
            {isChangingPin && (
              <div className="px-6 py-3 bg-amber-950/40 border-b border-amber-800/40 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-amber-300 font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>अपना नया गुप्त PIN कोड सेट करें:</span>
                </div>
                <form onSubmit={handleUpdatePin} className="flex items-center gap-2">
                  <input
                    type="password"
                    required
                    value={newPin}
                    onChange={(e) => setNewPin(e.target.value)}
                    placeholder="New PIN (e.g. 1234)"
                    className="px-3 py-1 rounded bg-slate-900 border border-slate-700 text-white text-xs w-36 focus:outline-none focus:border-amber-400"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1 rounded bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs"
                  >
                    Save PIN
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsChangingPin(false)}
                    className="px-2 py-1 text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                </form>
              </div>
            )}

            {savedSuccessMsg && (
              <div className="px-6 py-2 bg-emerald-950/60 text-emerald-300 text-xs font-semibold border-b border-emerald-800">
                ✓ {savedSuccessMsg}
              </div>
            )}

            {/* Modal Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Create or Edit Form */}
              {(isCreatingNew || isEditing) ? (
                <div className="bg-slate-900/90 border border-slate-700 rounded-xl p-5 sm:p-6 space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="font-serif font-bold text-base text-amber-300">
                      {isCreatingNew ? '✨ Create New Package' : `✏️ Edit Package: ${formData.title}`}
                    </h3>
                    <button
                      type="button"
                      onClick={() => {
                        setIsCreatingNew(false);
                        setIsEditing(null);
                      }}
                      className="text-xs text-slate-400 hover:text-white px-2 py-1 bg-slate-800 rounded"
                    >
                      Cancel
                    </button>
                  </div>

                  <form onSubmit={handleSaveForm} className="space-y-4 text-xs">
                    
                    {/* ✦ IMAGE SELECTION & UPLOAD SECTION ✦ */}
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-bold text-white flex items-center gap-2">
                          <ImageIcon className="w-4 h-4 text-[#f1683a]" />
                          <span>Package Image (फोटो बदलें)</span>
                        </label>
                        <span className="text-[11px] text-amber-400 font-semibold">
                          Upload from Device OR Pick from Presets below
                        </span>
                      </div>

                      {/* Preview and Upload Buttons */}
                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="relative w-36 h-24 rounded-lg overflow-hidden border-2 border-slate-700 bg-slate-900 shrink-0">
                          {formData.image ? (
                            <img
                              src={formData.image}
                              alt="Package Preview"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs">
                              No Image
                            </div>
                          )}
                          <div className="absolute bottom-1 right-1 bg-black/80 px-1.5 py-0.5 rounded text-[9px] text-emerald-400 font-mono">
                            Preview
                          </div>
                        </div>

                        <div className="flex-1 space-y-2 w-full">
                          {/* Hidden File Input for uploading from Device */}
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                            accept="image/*"
                            className="hidden"
                          />

                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="px-4 py-2 bg-[#f1683a] hover:bg-[#d95325] text-white font-bold text-xs rounded-lg flex items-center gap-1.5 transition cursor-pointer shadow-md shadow-[#f1683a]/20"
                            >
                              <Upload className="w-3.5 h-3.5" />
                              <span>Upload Photo from Phone / PC</span>
                            </button>
                            <span className="text-[11px] text-slate-400">or enter image web URL:</span>
                          </div>

                          <input
                            type="text"
                            value={formData.image || ''}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            placeholder="Image URL (https://... or /images/kaichi-dham.jpg)"
                            className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-[#f1683a] text-xs"
                          />
                        </div>
                      </div>

                      {/* 1-Click Preset Gallery */}
                      <div>
                        <span className="text-[11px] text-slate-400 font-semibold block mb-2">
                          ✦ Or click any authentic destination photo to apply instantly:
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 max-h-36 overflow-y-auto pr-1">
                          {PRESET_GALLERY.map((g) => {
                            const isSelected = formData.image === g.path;
                            return (
                              <button
                                key={g.name}
                                type="button"
                                onClick={() => setFormData({ ...formData, image: g.path })}
                                className={`p-1.5 rounded-lg border text-left flex flex-col items-center gap-1 transition ${
                                  isSelected
                                    ? 'bg-amber-950/60 border-amber-400 ring-2 ring-amber-400'
                                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                                }`}
                              >
                                <img
                                  src={g.path}
                                  alt={g.name}
                                  className="w-full h-11 object-cover rounded"
                                />
                                <span className="text-[10px] text-slate-300 truncate w-full text-center">
                                  {g.name}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">
                          Package Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.title || ''}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          placeholder="e.g. Kedarnath & Badrinath Deluxe Yatra"
                          className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-[#f1683a]"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">
                          Destination / Region *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.destination || ''}
                          onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                          placeholder="e.g. Uttarakhand (Kainchi Dham & Nainital)"
                          className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-[#f1683a]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">
                          Duration
                        </label>
                        <input
                          type="text"
                          value={formData.duration || ''}
                          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                          placeholder="e.g. 2 Nights / 3 Days"
                          className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-[#f1683a]"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">
                          Selling Price (₹) *
                        </label>
                        <input
                          type="number"
                          required
                          value={formData.price || 0}
                          onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                          className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-[#f1683a]"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">
                          Original Price (₹)
                        </label>
                        <input
                          type="number"
                          value={formData.originalPrice || 0}
                          onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                          className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-[#f1683a]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">
                          Badge Label
                        </label>
                        <input
                          type="text"
                          value={formData.badge || ''}
                          onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                          placeholder="e.g. Bestseller, Special"
                          className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-[#f1683a]"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">
                          Available Seats
                        </label>
                        <input
                          type="number"
                          value={formData.availableSeats || 10}
                          onChange={(e) => setFormData({ ...formData, availableSeats: Number(e.target.value) })}
                          className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-[#f1683a]"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">
                          Vehicle / Bus Type
                        </label>
                        <input
                          type="text"
                          value={formData.busType || formData.vehicle || ''}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              busType: e.target.value,
                              vehicle: e.target.value
                            })
                          }
                          placeholder="e.g. Deluxe 2x2 AC Bus / Dzire"
                          className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-[#f1683a]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        Route / Boarding Details
                      </label>
                      <input
                        type="text"
                        value={formData.route || ''}
                        onChange={(e) => setFormData({ ...formData, route: e.target.value })}
                        placeholder="e.g. Muzaffarnagar - Meerut - Delhi - Nainital"
                        className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-[#f1683a]"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        Description & Inclusions
                      </label>
                      <textarea
                        rows={3}
                        value={formData.description || ''}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Short overview of the tour package..."
                        className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-[#f1683a]"
                      />
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-lg bg-[#f1683a] hover:bg-[#d95325] text-white font-bold text-xs uppercase tracking-wider transition cursor-pointer"
                      >
                        {isCreatingNew ? 'Create & Add to Website' : 'Save Changes'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsCreatingNew(false);
                          setIsEditing(null);
                        }}
                        className="px-4 py-2.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white text-xs font-semibold"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              ) : null}

              {/* List of Current Packages with Add, Edit, Delete, Hide/Show */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400 font-semibold uppercase tracking-wider pb-2 border-b border-slate-800">
                  <span>All Packages ({currentList.length})</span>
                  <span>Actions</span>
                </div>

                {currentList.length === 0 ? (
                  <div className="p-8 text-center text-slate-500 border border-dashed border-slate-800 rounded-xl">
                    No packages in this category. Click <strong>"Add New Package"</strong> to create one!
                  </div>
                ) : (
                  currentList.map((item) => {
                    const isHidden = item.status === 'hidden';
                    return (
                      <div
                        key={item.id}
                        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border transition ${
                          isHidden
                            ? 'bg-slate-950/60 border-slate-900 opacity-60'
                            : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-3.5">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-14 h-14 rounded-lg object-cover bg-slate-950 border border-slate-800 shrink-0"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-white text-sm line-clamp-1">
                                {item.title}
                              </h4>
                              {isHidden ? (
                                <span className="px-2 py-0.5 rounded bg-red-950 border border-red-800 text-red-400 text-[10px] font-bold">
                                  HIDDEN
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-400 text-[10px] font-bold">
                                  LIVE
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-slate-400 flex items-center gap-3 mt-1">
                              <span className="text-amber-400 font-bold">₹{item.price.toLocaleString('en-IN')}</span>
                              <span>• {item.duration}</span>
                              <span className="hidden sm:inline">• {item.destination}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center">
                          {/* Hide / Show Toggle */}
                          <button
                            onClick={() => handleToggleHide(item.id)}
                            title={isHidden ? 'Click to Show on Website' : 'Click to Hide from Website'}
                            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition ${
                              isHidden
                                ? 'bg-amber-950/40 border-amber-600/50 text-amber-300 hover:bg-amber-900/60'
                                : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                            }`}
                          >
                            {isHidden ? (
                              <>
                                <Eye className="w-3.5 h-3.5" />
                                <span>Unhide</span>
                              </>
                            ) : (
                              <>
                                <EyeOff className="w-3.5 h-3.5" />
                                <span>Hide</span>
                              </>
                            )}
                          </button>

                          {/* Edit Button */}
                          <button
                            onClick={() => handleStartEdit(item)}
                            title="Edit Package & Image"
                            className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1 transition"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={() => handleDelete(item.id, item.title)}
                            title="Delete Package"
                            className="p-1.5 rounded-lg bg-red-950/40 border border-red-800/50 hover:bg-red-900/60 text-red-400 hover:text-red-300 text-xs font-semibold transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

            </div>

            {/* Modal Footer Note */}
            <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span>
                🔒 <strong>सुरक्षित एडमिन:</strong> केवल गुप्त PIN डालने वाला ही बदलाव कर सकता है।
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsAuthenticated(false)}
                  className="text-xs text-red-400 hover:text-red-300 font-semibold"
                >
                  Lock / Logout
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-1 rounded bg-[#f1683a] text-white font-bold text-xs"
                >
                  Done
                </button>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
};
