import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Landing from './pages/Landing';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Pricing from './pages/Pricing';
import Admin from './pages/Admin';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, user, loading } = useAuth();
  if (loading) return <div className="min-h-screen grid place-items-center">Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (adminOnly && user?.role !== 'admin') return <Navigate to="/dashboard" replace />;
  return children;
};

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/products" element={<Products />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute adminOnly><Admin /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
