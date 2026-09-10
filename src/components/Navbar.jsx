// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { UtensilsCrossed, LogOut, User, LayoutDashboard } from 'lucide-react';

// const Navbar = () => {
//   const { user, isAdmin, logout } = useAuth();
//   const navigate = useNavigate();

//   return (
//     <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-zinc-200">
//       <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
//         <Link to="/" className="flex items-center gap-2 text-xl font-bold text-amber-600">
//           <UtensilsCrossed className="w-6 h-6" />
//           <span>Tasty<span className="text-zinc-900">Bites</span></span>
//         </Link>

//         <nav className="flex items-center gap-5">
//           <Link to="/" className="text-sm font-medium text-zinc-700 hover:text-amber-600">
//             Menu
//           </Link>

//           {isAdmin && (
//             <Link to="/admin" className="flex items-center gap-1.5 text-sm font-semibold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg hover:bg-amber-100">
//               <LayoutDashboard className="w-4 h-4" />
//               Admin
//             </Link>
//           )}

//           {user ? (
//             <div className="flex items-center gap-3 border-l pl-4 border-zinc-200">
//               <span className="text-xs text-zinc-500 font-medium flex items-center gap-1">
//                 <User className="w-3.5 h-3.5" /> {user.name}
//               </span>
//               <button
//                 onClick={() => { logout(); navigate('/login'); }}
//                 className="p-1.5 text-zinc-500 hover:text-rose-600 hover:bg-rose-50 rounded-md transition"
//                 title="Logout"
//               >
//                 <LogOut className="w-4 h-4" />
//               </button>
//             </div>
//           ) : (
//             <div className="flex items-center gap-2">
//               <Link to="/login" className="text-sm font-medium text-zinc-700 hover:text-amber-600 px-3 py-1.5">
//                 Login
//               </Link>
//               <Link to="/register" className="text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 px-3.5 py-1.5 rounded-lg shadow-sm">
//                 Sign Up
//               </Link>
//             </div>
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Navbar;

import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UtensilsCrossed, LogOut, User, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 text-xl font-black text-zinc-900 tracking-tight">
          <UtensilsCrossed className="w-6 h-6 text-emerald-700" />
          <span>Tasty<span className="text-emerald-700">Bites</span></span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          <Link to="/" className="text-sm font-semibold text-zinc-700 hover:text-emerald-700 transition">
            Home
          </Link>
          <Link to="/menu" className="text-sm font-semibold text-zinc-700 hover:text-emerald-700 transition">
            Menu
          </Link>

          {isAdmin && (
            <Link
              to="/admin"
              className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              Admin
            </Link>
          )}

          {user ? (
            <div className="flex items-center gap-3 border-l pl-4 border-zinc-200">
              <span className="text-xs text-zinc-500 font-medium flex items-center gap-1">
                <User className="w-3.5 h-3.5" /> {user.name}
              </span>
              <button
                onClick={() => { logout(); navigate('/'); }}
                className="p-1.5 text-zinc-500 hover:text-rose-600 hover:bg-rose-50 rounded-md transition"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="text-sm font-semibold text-zinc-700 hover:text-emerald-700 px-3 py-1.5">
                Login
              </Link>
              <Link to="/register" className="text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 px-4 py-2 rounded-xl shadow-xs transition">
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