import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, ShieldCheck } from 'lucide-react';
import API from '../api/axios';

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/menu-items/${id}`)
      .then((res) => setItem(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="min-h-[80vh] bg-[#061e14] flex items-center justify-center text-zinc-500 text-sm">
      Loading culinary details...
    </div>
  );
  
  if (!item) return (
    <div className="min-h-[80vh] bg-[#061e14] flex flex-col items-center justify-center text-rose-400 text-sm gap-4">
      <p>Dish not found in the menu.</p>
      <Link to="/menu" className="text-emerald-400 underline">Back to menu</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#061e14] text-zinc-100 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full">
        {/* Back Link */}
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Menu Collection</span>
        </Link>

        {/* Card Container */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 sm:p-10 grid md:grid-cols-2 gap-8 shadow-2xl backdrop-blur-md">
          <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden border border-zinc-800">
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />
          </div>

          <div className="flex flex-col justify-between text-left">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                  {item.category}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-zinc-400 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Chef Recommended
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {item.name}
              </h1>

              <div className="text-3xl font-black text-emerald-400">
                ₹{item.price}
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed pt-2">
                {item.description}
              </p>
            </div>

            {/* Availability and Guarantee Box */}
            <div className="pt-6 border-t border-zinc-800/80 space-y-4 mt-6">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400 font-medium">Kitchen Status</span>
                <span
                  className={`px-3 py-1 rounded-full font-bold ${
                    item.availability
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : 'bg-rose-950 text-rose-400 border border-rose-800'
                  }`}
                >
                  {item.availability ? 'Available to Order' : 'Sold Out for Today'}
                </span>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-zinc-400 bg-zinc-950/60 p-3 rounded-xl border border-zinc-800">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Cooked fresh to order with strict hygiene and quality protocols.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;