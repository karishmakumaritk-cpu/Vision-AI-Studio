export default function ProductCard({ product, action, disabled }) {
  return (
    <article className="card">
      <h3 className="text-xl font-bold">{product.name}</h3>
      <p className="text-slate-400 mt-2">{product.description}</p>
      <p className="mt-4 text-2xl font-black">₹{product.price}<span className="text-sm text-slate-500">/{product.billing_type}</span></p>
      <button disabled={disabled} onClick={action} className="mt-4 w-full bg-indigo-600 disabled:bg-slate-700 py-2 rounded">{disabled ? 'Already Active' : `Start ${product.trial_days}-day trial`}</button>
    </article>
  );
}
