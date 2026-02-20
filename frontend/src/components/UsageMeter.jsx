export default function UsageMeter({ label, value }) {
  return <div className="card"><p className="text-slate-400 text-sm">{label}</p><p className="text-2xl font-bold mt-2">{value}</p></div>;
}
