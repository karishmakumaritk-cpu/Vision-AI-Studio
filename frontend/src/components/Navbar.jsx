import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  return (
    <nav className="border-b border-slate-800 bg-slate-900/70 backdrop-blur sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="font-black text-xl">Vision AI Studio</Link>
        <div className="flex gap-4 text-sm items-center">
          <Link to="/products">Products</Link>
          <Link to="/pricing">Pricing</Link>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup" className="bg-indigo-600 px-3 py-1.5 rounded">Start Trial</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
