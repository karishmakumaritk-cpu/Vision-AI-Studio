import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="border-b border-slate-800 bg-slate-900/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-xl font-bold">Vision AI Studio</Link>
        <div className="flex gap-4 text-sm text-slate-300">
          <Link to="/products">Products</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup" className="rounded bg-indigo-600 px-3 py-1 text-white">Start trial</Link>
        </div>
      </div>
    </nav>
  );
}
