import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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

  if (loading) return <div className="text-center py-20 text-zinc-400 text-sm">Loading details...</div>;
  if (!item) return <div className="text-center py-20 text-rose-500 text-sm">Item not found.</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link to="/" className="text-amber-600 text-sm font-medium hover:underline mb-6 inline-block">&larr; Back to menu</Link>
      <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 grid md:grid-cols-2 gap-8 shadow-sm">
        <img src={item.image} alt={item.name} className="w-full h-80 object-cover rounded-2xl" />
        <div className="flex flex-col justify-between">
          <div>
            <span className="bg-amber-50 text-amber-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{item.category}</span>
            <h1 className="text-3xl font-extrabold text-zinc-900 mt-3">{item.name}</h1>
            <p className="text-2xl font-black text-amber-600 mt-2">₹{item.price}</p>
            <p className="text-sm text-zinc-600 mt-4 leading-relaxed">{item.description}</p>
          </div>
          <div className="mt-8 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs">
            <span className="text-zinc-400">Availability</span>
            <span className={`px-2.5 py-1 rounded-md font-bold ${item.availability ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
              {item.availability ? 'Available' : 'Sold Out'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;