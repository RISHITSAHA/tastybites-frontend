import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', formData);
      login(res.data);
      toast.success('Welcome back!');
      navigate(res.data.role === 'Admin' ? '/admin' : '/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-[#fbf9f5]">
      <div className="max-w-md w-full bg-white border border-zinc-200/80 rounded-3xl p-8 shadow-sm">
        <h2 className="text-2xl font-black text-zinc-900 text-center mb-6">Account Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-zinc-600">Email Address</label>
            <input
              type="email"
              required
              className="w-full mt-1 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-zinc-600">Password</label>
            <input
              type="password"
              required
              className="w-full mt-1 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-semibold py-2.5 rounded-xl text-sm shadow-sm transition-colors"
          >
            Sign In
          </button>
        </form>
        <p className="text-center text-xs text-zinc-500 mt-4">
          Need an account?{' '}
          <Link to="/register" className="text-emerald-700 font-semibold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;