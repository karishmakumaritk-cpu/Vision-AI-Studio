import Navbar from '../components/Navbar';

export default function Pricing() {
  const plans = [{ name: 'Free', price: '₹0' }, { name: 'Pro', price: '₹1,999' }, { name: 'Premium', price: '₹4,999' }];
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100"><Navbar />
      <div className="max-w-5xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-4">
        {plans.map((p) => <div className="card" key={p.name}><h3 className="font-bold text-xl">{p.name}</h3><p className="mt-4 text-3xl font-black">{p.price}</p></div>)}
      </div>
    </div>
  );
}
