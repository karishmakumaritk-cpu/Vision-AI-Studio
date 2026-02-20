import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import TrialBanner from '../components/TrialBanner';
import UsageMeter from '../components/UsageMeter';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';

export default function Dashboard() {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [myProducts, setMyProducts] = useState([]);

  const load = async () => {
    const [p, m] = await Promise.all([api.get('/products'), api.get('/products/my-products', token)]);
    setProducts(p.data || []);
    setMyProducts(m.data || []);
  };

  useEffect(() => { load(); }, []);

  const activate = async (id) => {
    await api.post('/products/activate', { product_id: id }, token);
    await load();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <div className="grid md:grid-cols-3 gap-4">
          <UsageMeter label="Active products" value={myProducts.length} />
          <UsageMeter label="Total products" value={products.length} />
          <UsageMeter label="Workflows" value={myProducts.length} />
        </div>
        {myProducts.map((p) => p.trial_active && <TrialBanner key={p.id} hours={p.trial_hours_remaining} />)}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p) => {
            const active = myProducts.some((m) => m.product_id === p.id);
            return <ProductCard key={p.id} product={p} disabled={active} action={() => activate(p.id)} />;
          })}
        </div>
      </div>
    </div>
  );
}
