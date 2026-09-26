import React, { useState, useEffect } from 'react';
import { 
  X, User, Mail, Lock, LogIn, UserPlus, LogOut, CheckCircle2, 
  Bookmark, Ticket, Phone, Calendar, Heart, Shield, Sparkles
} from 'lucide-react';
import { 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { auth, googleAuthProvider } from '../lib/firebase';
import { SITE_INFO } from '../data/mannatData';

interface CustomerAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomerAuthModal: React.FC<CustomerAuthModalProps> = ({ isOpen, onClose }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'bookings' | 'wishlist'>('profile');

  // Track Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithPopup(auth, googleAuthProvider);
      setLoading(false);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Google sign-in failed. Please try again.');
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      setLoading(false);
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        setError('Invalid email or password.');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('An account already exists with this email.');
      } else {
        setError(err.message || 'Authentication failed.');
      }
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div 
        className="bg-[#0E1422] border border-amber-500/30 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl my-4 text-slate-100 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 to-[#141C30] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-[#f1683a] flex items-center justify-center text-slate-950 font-bold shadow-md">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-white">
                {user ? `Namaste, ${user.displayName || user.email?.split('@')[0] || 'Devotee'}` : 'Customer Login / Sign Up'}
              </h3>
              <p className="text-[11px] text-amber-400/90 font-medium">
                {user ? 'Mannat VIP Travel Club Member' : 'Access your bookings, quotes & special pilgrim discounts'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6">
          {user ? (
            /* Logged in state dashboard */
            <div className="space-y-5">
              {/* Member Status Card */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/40 relative overflow-hidden">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Mannat Verified Pilgrim Member
                    </span>
                    <h4 className="text-white font-bold text-base">{user.displayName || user.email}</h4>
                    <p className="text-slate-400 text-xs">Email: {user.email}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Active
                  </span>
                </div>
              </div>

              {/* Sub-tabs */}
              <div className="flex border-b border-slate-800 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveTab('profile')}
                  className={`pb-2.5 px-3 border-b-2 transition ${
                    activeTab === 'profile'
                      ? 'border-amber-400 text-amber-400'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  My Perks & Support
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('bookings')}
                  className={`pb-2.5 px-3 border-b-2 transition ${
                    activeTab === 'bookings'
                      ? 'border-amber-400 text-amber-400'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  My Yatra Bookings
                </button>
              </div>

              {activeTab === 'profile' ? (
                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Shield className="w-4 h-4 text-amber-400" />
                      <div>
                        <span className="text-white font-bold block">Priority WhatsApp Booking</span>
                        <span className="text-slate-400 text-[11px]">Instant seat confirmation without waiting</span>
                      </div>
                    </div>
                    <a
                      href={`https://wa.me/${SITE_INFO.whatsappRaw}?text=${encodeURIComponent(`Namaste Mannat Travels, I am logged in as VIP member (${user.email}). Please assist me.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 bg-emerald-600 text-white rounded font-bold text-[10px]"
                    >
                      Chat VIP
                    </a>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-amber-400" />
                      <div>
                        <span className="text-white font-bold block">24/7 Helpline Support</span>
                        <span className="text-slate-400 text-[11px]">{SITE_INFO.phoneFormatted}</span>
                      </div>
                    </div>
                    <a
                      href={`tel:${SITE_INFO.phone}`}
                      className="px-2.5 py-1 bg-amber-500 text-slate-950 rounded font-bold text-[10px]"
                    >
                      Call
                    </a>
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 text-center space-y-2">
                  <Ticket className="w-8 h-8 text-amber-400 mx-auto opacity-80" />
                  <p className="text-slate-300 text-xs font-semibold">Your booked tickets and upcoming yatra vouchers are synced with WhatsApp & phone {SITE_INFO.phone}.</p>
                  <p className="text-slate-500 text-[11px]">Share your name on WhatsApp for instantaneous ticket PDF downloading.</p>
                </div>
              )}

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="px-4 py-2 rounded-lg bg-red-950/40 border border-red-800/50 text-red-300 text-xs font-bold hover:bg-red-900/50 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out (लॉग आउट)</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            /* Login / Signup Form */
            <div className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-red-950/60 border border-red-800 text-red-300 text-xs">
                  {error}
                </div>
              )}

              {/* 1-Click Google Sign In */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center gap-2.5 transition shadow-md active:scale-98 cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Continue with Google (1-Click Login)</span>
              </button>

              <div className="flex items-center gap-3 text-slate-500 text-xs">
                <div className="flex-1 h-px bg-slate-800" />
                <span>or with Email & Password</span>
                <div className="flex-1 h-px bg-slate-800" />
              </div>

              <form onSubmit={handleEmailAuth} className="space-y-3 text-xs">
                {isSignUp && (
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Your Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@gmail.com"
                      className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-[#f1683a] text-slate-950 font-bold rounded-lg text-xs uppercase tracking-wider transition hover:brightness-110 shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                >
                  {loading ? (
                    <span>Processing...</span>
                  ) : isSignUp ? (
                    <>
                      <UserPlus className="w-4 h-4" />
                      <span>Create Account (नया खाता बनाएं)</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4" />
                      <span>Sign In (लॉग इन करें)</span>
                    </>
                  )}
                </button>
              </form>

              <div className="text-center pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setError('');
                  }}
                  className="text-xs text-amber-400 hover:underline cursor-pointer"
                >
                  {isSignUp 
                    ? 'Already have an account? Sign In here' 
                    : "Don't have an account? Create new account for free"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
