import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';
import ProductCard from '../components/ProductCard';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [products, setProducts] = useState([]);
  const [active, setActive] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const run = async () => {
      const [p, a] = await Promise.all([api.get('/products'), api.get('/products/my-products', token)]);
      setProducts(p);
      setActive(a);
    };
    void run();
  }, [token]);

  const activate = async (id) => {
    await api.post('/products/activate', { product_id: id }, token);
    const a = await api.get('/products/my-products', token);
    setActive(a);
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex justify-between"><h1 className="text-3xl font-bold">Welcome {user?.name}</h1><button onClick={logout}>Logout</button></div>
        <div className="grid gap-4 md:grid-cols-3">
          {products.map((product) => <ProductCard key={product.id} product={product} onActivate={activate} activated={active.some((x) => x.product_id === product.id)} />)}
        </div>
      </div>
    </div>
  );
}
