import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Sparkles } from 'lucide-react';
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
    <div className="min-h-screen bg-[#061e14] text-zinc-100 flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* Top Banner / Header Header */}
      <div className="relative pt-12 pb-8 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-emerald-500/10 blur-[120px] pointer-events-none rounded-full" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/50 border border-emerald-700/40 text-emerald-300 text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Curated Culinary Collection</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Our Handcrafted <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">Menu</span>
          </h1>
          <p className="text-zinc-400 text-sm max-w-xl mx-auto">
            From slow-cooked royal delicacies to freshly shaken beverages, discover the perfect dish for your palate.
          </p>
        </div>
      </div>

      {/* Filter & Search Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-5 bg-zinc-900/60 border border-zinc-800/80 p-3.5 rounded-2xl backdrop-blur-md">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-3" />
            <input
              type="text"
              placeholder="Search for a dish..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-zinc-950/80 border border-zinc-800 text-white pl-10 pr-4 py-2 rounded-xl text-xs sm:text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  category === cat
                    ? 'bg-emerald-500 text-zinc-950 font-bold shadow-md shadow-emerald-950'
                    : 'bg-zinc-950/60 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Dishes */}
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-24">
        {loading ? (
          <div className="text-center py-24 text-sm text-zinc-500">Preparing dishes catalog...</div>
        ) : items.length === 0 ? (
          <div className="text-center py-24 text-sm text-zinc-400 bg-zinc-900/30 border border-zinc-800 rounded-3xl p-12">
            No culinary items found matching your filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((item) => (
              <div
                key={item._id}
                className="group bg-zinc-900/70 border border-zinc-800/90 rounded-2xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-950/30"
              >
                {/* Image Section with Badges */}
                <div className="relative h-48 w-full overflow-hidden bg-zinc-950">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent" />
                  
                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 bg-zinc-950/80 backdrop-blur-md text-emerald-300 text-[11px] font-semibold px-3 py-1 rounded-full border border-emerald-900/50">
                    {item.category}
                  </span>

                  {/* Availability Badge */}
                  <span
                    className={`absolute top-3 right-3 text-[11px] font-semibold px-2.5 py-0.5 rounded-full backdrop-blur-md ${
                      item.availability
                        ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800'
                        : 'bg-rose-950/80 text-rose-400 border border-rose-800'
                    }`}
                  >
                    {item.availability ? 'Available' : 'Unavailable'}
                  </span>
                </div>

                {/* Content Section */}
                <div className="p-5 flex flex-col justify-between flex-1 text-left">
                  <div>
                    <h3 className="font-bold text-white text-base line-clamp-1 group-hover:text-emerald-400 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1.5 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom Strip: Price & Link */}
                  <div className="mt-5 pt-3.5 border-t border-zinc-800/80 flex items-center justify-between">
                    <span className="text-lg font-black text-white tracking-tight">
                      ₹{item.price}
                    </span>
                    <Link
                      to={`/menu/${item._id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors group-hover:translate-x-0.5 duration-200"
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
    </div>
  );
};

export default Home;