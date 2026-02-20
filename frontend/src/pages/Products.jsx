import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import { api } from '../utils/api';

export default function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => { api.get('/products').then((r) => setProducts(r.data || [])); }, []);
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100"><Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p) => <ProductCard key={p.id} product={p} disabled />)}
      </div>
    </div>
  );
}
