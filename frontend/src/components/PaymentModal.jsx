export default function PaymentModal({ open, onClose, onStripe, onRazorpay }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/60 grid place-items-center p-4">
      <div className="card max-w-sm w-full">
        <h3 className="text-lg font-bold">Choose Payment Method</h3>
        <div className="mt-4 grid gap-2">
          <button onClick={onStripe} className="bg-indigo-600 py-2 rounded">Pay with Stripe</button>
          <button onClick={onRazorpay} className="bg-sky-600 py-2 rounded">Pay with Razorpay</button>
          <button onClick={onClose} className="border border-slate-700 py-2 rounded">Cancel</button>
        </div>
      </div>
    </div>
  );
}
