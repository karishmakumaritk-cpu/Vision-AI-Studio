export default function ProductCard({ product, onActivate, activated }) {
  return (
    <article className="rounded-xl border border-slate-800 bg-slate-900 p-4">
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="mt-2 text-sm text-slate-400">{product.description}</p>
      <p className="mt-4 text-2xl font-bold">₹{product.price}</p>
      <button disabled={activated} onClick={() => onActivate(product.id)} className="mt-4 w-full rounded bg-indigo-600 px-3 py-2 disabled:bg-slate-700">
        {activated ? 'Activated' : `Start ${product.trial_days}-day trial`}
      </button>
    </article>
  );
}
