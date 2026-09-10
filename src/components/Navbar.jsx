import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UtensilsCrossed, LogOut, User, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <header className={`sticky top-0 z-50 transition-colors backdrop-blur-md border-b ${
      isLanding 
        ? 'bg-[#061e14]/90 border-emerald-950 text-white' 
        : 'bg-white/90 border-zinc-200 text-zinc-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 text-xl font-black tracking-tight">
          <UtensilsCrossed className="w-6 h-6 text-emerald-400" />
          <span>Tasty<span className="text-emerald-400">Bites</span></span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          <Link 
            to="/" 
            className={`text-sm font-semibold transition ${
              isLanding ? 'text-zinc-300 hover:text-white' : 'text-zinc-700 hover:text-emerald-700'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/menu" 
            className={`text-sm font-semibold transition ${
              isLanding ? 'text-zinc-300 hover:text-white' : 'text-zinc-700 hover:text-emerald-700'
            }`}
          >
            Menu
          </Link>

          {isAdmin && (
            <Link
              to="/admin"
              className="flex items-center gap-1.5 text-xs font-bold text-emerald-300 bg-emerald-900/60 border border-emerald-700/70 px-3 py-1.5 rounded-lg hover:bg-emerald-900 transition"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              Admin
            </Link>
          )}

          {user ? (
            <div className="flex items-center gap-3 border-l pl-4 border-zinc-700">
              <span className="text-xs font-medium text-zinc-300 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-emerald-400" /> {user.name}
              </span>
              <button
                onClick={() => { logout(); navigate('/'); }}
                className="p-1.5 text-zinc-400 hover:text-rose-400 rounded-md transition"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <Link 
                to="/login" 
                className={`text-sm font-semibold px-3 py-1.5 ${
                  isLanding ? 'text-zinc-300 hover:text-white' : 'text-zinc-700 hover:text-emerald-700'
                }`}
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="text-sm font-bold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 px-4 py-2 rounded-xl shadow-xs transition"
              >
                Sign Up
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;