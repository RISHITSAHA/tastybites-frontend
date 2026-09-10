import { Link } from 'react-router-dom';
import { UtensilsCrossed, ArrowRight, Clock, MapPin, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LandingHome = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] bg-[#fbf9f5]">
      {/* Hero Section */}
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Column: Text Content */}
        <div className="flex-1 max-w-xl text-left">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold tracking-wide mb-6 border border-emerald-100">
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>Delicious food, made with care</span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-zinc-900 tracking-tight leading-[1.1] mb-6">
            Good food. <br />
            <span className="text-emerald-700">Great taste.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-zinc-600 leading-relaxed mb-8">
            Discover delicious meals made for every craving. Explore our menu and find something you'll love at TastyBites.
          </p>

          {/* Call to Actions */}
          <div className="flex items-center gap-4 mb-10">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold px-6 py-3.5 rounded-xl shadow-sm transition-all hover:gap-3"
            >
              <span>Explore Menu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {!user && (
              <Link
                to="/login"
                className="bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-800 font-semibold px-6 py-3.5 rounded-xl shadow-xs transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* Features / Highlights */}
          <div className="flex items-center gap-6 text-xs sm:text-sm font-medium text-zinc-500 pt-6 border-t border-zinc-200/60">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-700" />
              <span>Open Daily</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-700" />
              <span>Fresh & Local</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Image & Recommendation Card */}
        <div className="flex-1 relative w-full max-w-lg lg:max-w-none flex justify-center">
          <div className="relative w-full max-w-md lg:max-w-lg">
            <img
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80"
              alt="Delicious Fresh Food"
              className="w-full h-[400px] sm:h-[480px] object-cover rounded-3xl shadow-xl shadow-zinc-200/80 border-4 border-white"
            />

            {/* Floating Chef Recommendation Card */}
            <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md border border-zinc-100 p-4 rounded-2xl shadow-lg flex items-start gap-3 max-w-xs">
              <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
                  Today's recommendation
                </span>
                <h4 className="text-sm font-bold text-zinc-900 mt-0.5">Chef's Special</h4>
                <p className="text-xs text-zinc-500">Freshly prepared with aromatic spices</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dark Footer */}
      <footer className="bg-slate-950 text-zinc-400 py-12 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-black tracking-tight mb-2">
              Tasty<span className="text-emerald-500">Bites</span>
            </h3>
            <p className="text-xs leading-relaxed text-zinc-400">
              Delicious food, made with care. Explore our menu and discover something you'll love.
            </p>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/" className="hover:text-emerald-400">Home</Link></li>
              <li><Link to="/menu" className="hover:text-emerald-400">Menu</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">Menu Categories</h4>
            <ul className="space-y-2 text-xs">
              <li>Starters</li>
              <li>Main Course</li>
              <li>Desserts</li>
              <li>Beverages</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">Contact Us</h4>
            <div className="flex items-center gap-2 text-xs">
              <MapPin className="w-3.5 h-3.5 text-emerald-500" />
              <span>Kolkata, West Bengal</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingHome;