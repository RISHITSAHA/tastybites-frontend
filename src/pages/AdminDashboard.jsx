import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Trash2, PlusCircle, Users, Utensils } from 'lucide-react';
import API from '../api/axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalUsers: 0, totalMenuItems: 0 });
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('menu');

  const [form, setForm] = useState({ name: '', description: '', category: 'Main Course', price: '', availability: true });
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [statsRes, itemsRes, usersRes] = await Promise.all([
        API.get('/users/stats'),
        API.get('/menu-items'),
        API.get('/users'),
      ]);
      setStats(statsRes.data);
      setItems(itemsRes.data);
      setUsers(usersRes.data);
    } catch (err) {
      toast.error('Failed loading dashboard');
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!imageFile) return toast.warning('Please select dish photo');

    const data = new FormData();
    Object.keys(form).forEach(key => data.append(key, form[key]));
    data.append('image', imageFile);

    try {
      setIsSubmitting(true);
      await API.post('/menu-items', data);
      toast.success('Dish added successfully');
      setForm({ name: '', description: '', category: 'Main Course', price: '', availability: true });
      setImageFile(null);
      loadData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteItem = async (id) => {
    if (!confirm('Delete this item?')) return;
    try {
      await API.delete(`/menu-items/${id}`);
      toast.success('Item removed');
      loadData();
    } catch {
      toast.error('Delete failed');
    }
  };

  const handleDeleteUser = async (id) => {
    if (!confirm('Remove user?')) return;
    try {
      await API.delete(`/users/${id}`);
      toast.success('User deleted');
      loadData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Cannot delete user');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-white border border-zinc-200 rounded-2xl p-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center"><Utensils /></div>
          <div><p className="text-xs text-zinc-500 font-medium">Total Menu Items</p><h3 className="text-2xl font-black">{stats.totalMenuItems}</h3></div>
        </div>
        <div className="bg-white border border-zinc-200 rounded-2xl p-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center"><Users /></div>
          <div><p className="text-xs text-zinc-500 font-medium">Total Users</p><h3 className="text-2xl font-black">{stats.totalUsers}</h3></div>
        </div>
      </div>

      <div className="flex gap-4 border-b border-zinc-200 mb-6">
        <button onClick={() => setActiveTab('menu')} className={`pb-3 text-sm font-bold border-b-2 transition ${activeTab === 'menu' ? 'border-amber-600 text-amber-600' : 'border-transparent text-zinc-500'}`}>Menu Control</button>
        <button onClick={() => setActiveTab('users')} className={`pb-3 text-sm font-bold border-b-2 transition ${activeTab === 'users' ? 'border-amber-600 text-amber-600' : 'border-transparent text-zinc-500'}`}>User Base</button>
      </div>

      {activeTab === 'menu' ? (
        <div className="grid lg:grid-cols-3 gap-8">
          <form onSubmit={handleCreate} className="bg-white border border-zinc-200 rounded-2xl p-6 h-fit space-y-4">
            <h4 className="font-bold text-sm text-zinc-900 flex items-center gap-1.5"><PlusCircle className="w-4 h-4" /> Add Food Item</h4>
            <input type="text" placeholder="Dish Name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full border p-2 rounded-xl text-xs" />
            <textarea placeholder="Description" required value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full border p-2 rounded-xl text-xs" />
            <div className="grid grid-cols-2 gap-2">
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="border p-2 rounded-xl text-xs">
                <option value="Starter">Starter</option>
                <option value="Main Course">Main Course</option>
                <option value="Dessert">Dessert</option>
                <option value="Beverage">Beverage</option>
              </select>
              <input type="number" placeholder="Price (₹)" required value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} className="border p-2 rounded-xl text-xs" />
            </div>
            <input type="file" accept="image/*" required onChange={e => setImageFile(e.target.files[0])} className="w-full text-xs text-zinc-500 file:mr-2 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-zinc-100" />
            <button type="submit" disabled={isSubmitting} className="w-full bg-amber-600 text-white font-semibold py-2 rounded-xl text-xs">{isSubmitting ? 'Uploading...' : 'Save Item'}</button>
          </form>

          <div className="lg:col-span-2 bg-white border border-zinc-200 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-50 border-b"><tr><th className="p-3">Dish</th><th className="p-3">Category</th><th className="p-3">Price</th><th className="p-3">Action</th></tr></thead>
              <tbody className="divide-y">{items.map(it => (
                <tr key={it._id}>
                  <td className="p-3 flex items-center gap-3"><img src={it.image} className="w-10 h-10 rounded-lg object-cover" /> <span className="font-semibold">{it.name}</span></td>
                  <td className="p-3 text-zinc-500">{it.category}</td>
                  <td className="p-3 font-bold">₹{it.price}</td>
                  <td className="p-3"><button onClick={() => handleDeleteItem(it._id)} className="text-rose-600 hover:text-rose-800"><Trash2 className="w-4 h-4" /></button></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-50 border-b"><tr><th className="p-3">Name</th><th className="p-3">Email</th><th className="p-3">Role</th><th className="p-3">Action</th></tr></thead>
            <tbody className="divide-y">{users.map(u => (
              <tr key={u._id}>
                <td className="p-3 font-semibold">{u.name}</td>
                <td className="p-3 text-zinc-500">{u.email}</td>
                <td className="p-3"><span className={`px-2 py-0.5 rounded text-[10px] font-bold ${u.role === 'Admin' ? 'bg-amber-100 text-amber-800' : 'bg-zinc-100 text-zinc-600'}`}>{u.role}</span></td>
                <td className="p-3"><button onClick={() => handleDeleteUser(u._id)} className="text-rose-600 hover:text-rose-800"><Trash2 className="w-4 h-4" /></button></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;