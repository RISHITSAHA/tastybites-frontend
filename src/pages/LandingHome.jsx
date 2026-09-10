import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Flame, 
  Leaf, 
  ShieldCheck, 
  Star, 
  ChevronRight, 
  Clock, 
  MapPin, 
  Sparkles,
  PhoneCall
} from 'lucide-react';
import API from '../api/axios';

const LandingHome = () => {
  const [stats, setStats] = useState({ totalMenuItems: 0, totalUsers: 0 });

  useEffect(() => {
    API.get('/users/stats')
      .then(res => setStats(res.data))
      .catch(() => setStats({ totalMenuItems: 8, totalUsers: 25 }));
  }, []);

  return (
    <div className="min-h-screen bg-[#061e14] text-zinc-100 flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* Hero Master Section */}
      <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32">
        {/* Subtle Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/10 blur-[130px] pointer-events-none rounded-full" />
        <div className="absolute top-1/3 -right-20 w-[400px] h-[400px] bg-amber-500/5 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Bold Typography & Narrative (7 cols) */}
            <div className="lg:col-span-7 space-y-8 text-left">
              {/* Premium Pill */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-900/60 border border-emerald-700/50 backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-semibold text-emerald-300 tracking-wider uppercase">
                  Artisanal Kitchen & Bar
                </span>
              </div>

              {/* Unique Headline */}
              <h1 className="text-5xl sm:text-6xl xl:text-7xl font-black tracking-tight text-white leading-[1.08]">
                Where passion <br />
                meets every <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-200">
                  savory bite.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-zinc-300 max-w-xl font-normal leading-relaxed">
                Handcrafted recipes rooted in tradition, elevated with modern culinary flair. Taste chef-curated selections cooked fresh daily.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/menu"
                  className="inline-flex items-center gap-2.5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold px-7 py-4 rounded-2xl shadow-lg shadow-emerald-950/50 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Explore Menu</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="#experience"
                  className="inline-flex items-center gap-2 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/80 font-semibold px-6 py-4 rounded-2xl transition-all"
                >
                  <span>Our Experience</span>
                </a>
              </div>

              {/* Stat Counters Row */}
              <div className="pt-8 border-t border-zinc-800/80 grid grid-cols-3 gap-6 max-w-lg">
                <div>
                  <h4 className="text-3xl font-extrabold text-white tracking-tight">
                    {stats.totalMenuItems || '8'}+
                  </h4>
                  <p className="text-xs text-zinc-400 mt-1 font-medium">Signature Dishes</p>
                </div>
                <div>
                  <h4 className="text-3xl font-extrabold text-white tracking-tight">100%</h4>
                  <p className="text-xs text-zinc-400 mt-1 font-medium">Fresh Ingredients</p>
                </div>
                <div>
                  <h4 className="text-3xl font-extrabold text-emerald-400 tracking-tight flex items-center gap-1">
                    4.9 <Star className="w-4 h-4 fill-emerald-400 text-emerald-400" />
                  </h4>
                  <p className="text-xs text-zinc-400 mt-1 font-medium">Customer Rating</p>
                </div>
              </div>
            </div>

            {/* Right Column: Layered Gallery Collage (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Featured Photo */}
                <div className="relative rounded-3xl overflow-hidden border border-zinc-700/50 shadow-2xl bg-zinc-900">
                  <img
                    src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80"
                    alt="Signature Plated Dish"
                    className="w-full h-[420px] object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                    <div>
                      <span className="text-[11px] font-semibold tracking-wider text-emerald-400 uppercase">Chef's Masterpiece</span>
                      <h3 className="text-lg font-bold text-white">Spiced Crisp Medley</h3>
                    </div>
                    <Link 
                      to="/menu"
                      className="p-3 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 rounded-xl transition"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Floating Secondary Mini Card */}
                <div className="absolute -top-6 -left-6 sm:-left-8 bg-zinc-900/90 border border-zinc-700/80 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-center gap-3.5 max-w-[210px]">
                  <div className="p-2.5 bg-emerald-950 text-emerald-400 rounded-xl border border-emerald-800">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] uppercase font-bold text-zinc-400 block tracking-wider">Kitchen Fresh</span>
                    <span className="text-xs font-bold text-white">Cooked to Order</span>
                  </div>
                </div>

                {/* Floating Satisfaction Tag */}
                <div className="absolute -bottom-6 -right-6 sm:-right-8 bg-zinc-900/90 border border-zinc-700/80 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <img className="w-8 h-8 rounded-full border-2 border-zinc-900 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80" alt="Avatar" />
                    <img className="w-8 h-8 rounded-full border-2 border-zinc-900 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" alt="Avatar" />
                    <img className="w-8 h-8 rounded-full border-2 border-zinc-900 object-cover" src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&q=80" alt="Avatar" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-white leading-none">500+ Foodies</p>
                    <p className="text-[10px] text-zinc-400 mt-1">Served This Month</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Feature Pillars (Differentiators) */}
      <section id="experience" className="py-20 bg-[#04140d] border-y border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-400">Our Standards</h2>
            <h3 className="text-3xl sm:text-4xl font-black text-white">Cooking without compromises</h3>
            <p className="text-sm text-zinc-400">Every plate prepared in our kitchen honors pure flavor, safety, and authentic culinary technique.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-zinc-900/60 border border-zinc-800/90 rounded-3xl p-8 text-left hover:border-emerald-600/50 transition duration-300">
              <div className="w-12 h-12 bg-emerald-950 text-emerald-400 rounded-2xl flex items-center justify-center border border-emerald-800 mb-6">
                <Leaf className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Locally Sourced Ingredients</h4>
              <p className="text-sm text-zinc-400 leading-relaxed">We partner with indigenous local growers for pristine seasonal vegetables, fresh seafood, and premium herbs.</p>
            </div>

            <div className="bg-zinc-900/60 border border-zinc-800/90 rounded-3xl p-8 text-left hover:border-emerald-600/50 transition duration-300">
              <div className="w-12 h-12 bg-emerald-950 text-emerald-400 rounded-2xl flex items-center justify-center border border-emerald-800 mb-6">
                <Flame className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Master-Crafted Spices</h4>
              <p className="text-sm text-zinc-400 leading-relaxed">No synthetic food colorings or pre-packaged pastes. Slow-roasted spices ground in-house daily.</p>
            </div>

            <div className="bg-zinc-900/60 border border-zinc-800/90 rounded-3xl p-8 text-left hover:border-emerald-600/50 transition duration-300 sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 bg-emerald-950 text-emerald-400 rounded-2xl flex items-center justify-center border border-emerald-800 mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Hygienic & Transparent</h4>
              <p className="text-sm text-zinc-400 leading-relaxed">Strict safety protocols from inventory handling to plating. High standards you can trust with family and friends.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Banner Strip: Menu Jump */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-b from-[#04140d] to-[#061e14]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-emerald-950/40 border border-emerald-800/50 rounded-3xl p-10 sm:p-14 relative z-10 backdrop-blur-sm">
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Hungry? Your next great meal is ready.
          </h3>
          <p className="text-zinc-300 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Browse our full catalog spanning sizzling starters, slow-cooked royal curries, artisanal beverages, and divine desserts.
          </p>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-extrabold px-8 py-4 rounded-2xl shadow-lg transition"
          >
            <span>View Full Menu & Pricing</span>
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Modern High-Contrast Footer */}
      <footer className="bg-black text-zinc-400 py-14 border-t border-zinc-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10 text-left">
          <div className="space-y-3">
            <h3 className="text-white text-xl font-black tracking-tight">
              Tasty<span className="text-emerald-500">Bites</span>
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Crafting unforgettable culinary memories since 2024. Gourmet quality dining accessible right from your browser.
            </p>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">Explore</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/" className="hover:text-emerald-400 transition">Homepage</Link></li>
              <li><Link to="/menu" className="hover:text-emerald-400 transition">Menu Catalog</Link></li>
              <li><Link to="/login" className="hover:text-emerald-400 transition">Customer Sign In</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">Hours</h4>
            <div className="space-y-2 text-xs text-zinc-400">
              <p className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-emerald-500" /> Mon - Sun: 11:00 AM - 11:00 PM</p>
              <p className="text-zinc-500">Takeaway & Dine-in Available</p>
            </div>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">Location</h4>
            <div className="space-y-2.5 text-xs text-zinc-400">
              <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-emerald-500" /> Kolkata, West Bengal, India</p>
              <p className="flex items-center gap-2"><PhoneCall className="w-3.5 h-3.5 text-emerald-500" /> +91 98765 43210</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingHome;