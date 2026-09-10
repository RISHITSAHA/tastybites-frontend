// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { Toaster } from 'sonner';
// import { AuthProvider } from './context/AuthContext';

// import Navbar from './components/Navbar';
// import ProtectedRoute from './components/ProtectedRoute';

// import Home from './pages/Home';
// import ItemDetails from './pages/ItemDetails';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import AdminDashboard from './pages/AdminDashboard';

// function App() {
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <Toaster position="top-right" richColors />
//         <div className="min-h-screen flex flex-col">
//           <Navbar />
//           <main className="flex-1">
//             <Routes>
//               <Route path="/" element={<Home />} />
//               <Route path="/menu/:id" element={<ItemDetails />} />
//               <Route path="/login" element={<Login />} />
//               <Route path="/register" element={<Register />} />
//               <Route element={<ProtectedRoute adminOnly={true} />}>
//                 <Route path="/admin" element={<AdminDashboard />} />
//               </Route>
//             </Routes>
//           </main>
//         </div>
//       </BrowserRouter>
//     </AuthProvider>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './context/AuthContext';

import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import LandingHome from './pages/LandingHome';
import Home from './pages/Home';
import ItemDetails from './pages/ItemDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" richColors />
        <div className="min-h-screen flex flex-col bg-[#fbf9f5]">
          <Navbar />
          <main className="flex-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingHome />} />
              <Route path="/menu" element={<Home />} />
              <Route path="/menu/:id" element={<ItemDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Admin-Only Route */}
              <Route element={<ProtectedRoute adminOnly={true} />}>
                <Route path="/admin" element={<AdminDashboard />} />
              </Route>
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;