export default function PaymentModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 grid place-items-center bg-black/60 p-4">
      <div className="w-full max-w-md rounded-xl border border-slate-700 bg-slate-900 p-6">
        <h3 className="text-lg font-semibold">Choose payment provider</h3>
        <p className="mt-2 text-sm text-slate-400">Stripe / Razorpay integration is available via backend endpoints.</p>
        <button onClick={onClose} className="mt-4 rounded bg-slate-700 px-3 py-2">Close</button>
      </div>
    </div>
  );
}
