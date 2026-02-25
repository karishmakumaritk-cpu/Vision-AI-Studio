const MERCHANT_ID = import.meta.env.VITE_MERCHANT_ID;

export default function PaymentModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 grid place-items-center bg-black/60 p-4">
      <div className="w-full max-w-md rounded-xl border border-slate-700 bg-slate-900 p-6">
        <h3 className="text-lg font-semibold">Choose Payment Method</h3>
        <p className="mt-2 text-sm text-slate-400">Stripe / Razorpay / PhonePe integration available via backend endpoints.</p>
        {MERCHANT_ID && (
          <div className="mt-3 rounded-lg border border-purple-500/20 bg-purple-500/10 px-4 py-2">
            <span className="text-xs text-purple-300 uppercase tracking-wide">Merchant ID</span>
            <p className="mt-1 font-mono text-sm text-slate-200">{MERCHANT_ID}</p>
          </div>
        )}
        <button onClick={onClose} className="mt-4 rounded bg-slate-700 px-3 py-2">Close</button>
      </div>
    </div>
  );
}
