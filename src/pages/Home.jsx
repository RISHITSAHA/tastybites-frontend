// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Search } from 'lucide-react';
// import API from '../api/axios';

// const categories = ['All', 'Starter', 'Main Course', 'Dessert', 'Beverage'];

// const Home = () => {
//   const [items, setItems] = useState([]);
//   const [search, setSearch] = useState('');
//   const [category, setCategory] = useState('All');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchItems = async () => {
//       try {
//         setLoading(true);
//         const { data } = await API.get(`/menu-items?search=${search}&category=${category}`);
//         setItems(data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     const debounce = setTimeout(fetchItems, 250);
//     return () => clearTimeout(debounce);
//   }, [search, category]);

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
//         <div className="relative w-full md:w-80">
//           <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
//           <input
//             type="text"
//             placeholder="Search menu..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full bg-white border border-zinc-200 pl-9 pr-4 py-2 rounded-xl text-sm outline-none focus:border-amber-500 shadow-sm"
//           />
//         </div>

//         <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1">
//           {categories.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => setCategory(cat)}
//               className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
//                 category === cat
//                   ? 'bg-amber-600 text-white'
//                   : 'bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50'
//               }`}
//             >
//               {cat}
//             </button>
//           ))}
//         </div>
//       </div>

//       {loading ? (
//         <div className="text-center py-20 text-sm text-zinc-400">Loading menu dishes...</div>
//       ) : items.length === 0 ? (
//         <div className="text-center py-20 text-sm text-zinc-400">No dishes match your filter.</div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {items.map((item) => (
//             <div key={item._id} className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
//               <img src={item.image} alt={item.name} className="w-full h-44 object-cover" />
//               <div className="p-4 flex flex-col justify-between flex-1">
//                 <div>
//                   <div className="flex justify-between items-baseline gap-2">
//                     <h3 className="font-semibold text-zinc-900 line-clamp-1">{item.name}</h3>
//                     <span className="text-amber-600 font-bold">${item.price.toFixed(2)}</span>
//                   </div>
//                   <p className="text-xs text-zinc-500 mt-1 line-clamp-2">{item.description}</p>
//                 </div>
//                 <Link
//                   to={`/menu/${item._id}`}
//                   className="mt-4 block text-center bg-zinc-900 text-white py-2 rounded-xl text-xs font-semibold hover:bg-zinc-800"
//                 >
//                   View Item
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, MapPin } from 'lucide-react';
import API from '../api/axios';

const categories = ['All', 'Starter', 'Main Course', 'Dessert', 'Beverage'];

const Home = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const { data } = await API.get(`/menu-items?search=${search}&category=${category}`);
        setItems(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    const debounce = setTimeout(fetchItems, 250);
    return () => clearTimeout(debounce);
  }, [search, category]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content Area */}
      <div className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        {/* Search Bar */}
        <div className="flex justify-center mb-6">
          <div className="relative w-full max-w-lg">
            <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Search for a dish..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-zinc-200 pl-11 pr-4 py-2.5 rounded-full text-sm outline-none focus:ring-2 focus:ring-amber-500 shadow-sm"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex justify-center items-center gap-2 overflow-x-auto pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                category === cat
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dishes Grid */}
        {loading ? (
          <div className="text-center py-20 text-sm text-zinc-400">Loading delicious dishes...</div>
        ) : items.length === 0 ? (
          <div className="text-center py-20 text-sm text-zinc-500">
            No dishes found. Log in as admin to add some!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
            {items.map((item) => (
              <div
                key={item._id}
                className="bg-white border border-zinc-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                {/* Image Container with Badges */}
                <div className="relative h-48 w-full overflow-hidden bg-zinc-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Category Pill (Top Left) */}
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-zinc-700 text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm">
                    {item.category}
                  </span>

                  {/* Availability Badge (Top Right) */}
                  <span
                    className={`absolute top-3 right-3 text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm backdrop-blur-sm ${
                      item.availability
                        ? 'bg-emerald-100/90 text-emerald-800'
                        : 'bg-rose-100/90 text-rose-800'
                    }`}
                  >
                    {item.availability ? 'Available' : 'Unavailable'}
                  </span>
                </div>

                {/* Card Details */}
                <div className="p-4 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-bold text-zinc-900 text-base line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-1 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Price and Link Footer */}
                  <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between">
                    <span className="text-base font-extrabold text-amber-600">
                      ₹{item.price}
                    </span>
                    <Link
                      to={`/menu/${item._id}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-700 hover:text-amber-600 transition-colors"
                    >
                      View Details
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Dark Footer Matching Reference */}
      <footer className="bg-slate-950 text-zinc-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-black tracking-tight mb-2">
              Tasty<span className="text-amber-500">Bites</span>
            </h3>
            <p className="text-xs leading-relaxed">
              Delicious food, made with care. Explore our menu and discover something you'll love.
            </p>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/" className="hover:text-amber-400">Home</Link></li>
              <li><Link to="/" className="hover:text-amber-400">Menu</Link></li>
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
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              <span>Kolkata, West Bengal</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;