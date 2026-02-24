export default function UsageMeter({ value = 0, max = 100 }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div>
      <div className="mb-1 text-xs text-slate-400">Usage {value}/{max}</div>
      <div className="h-2 rounded bg-slate-800"><div className="h-2 rounded bg-indigo-500" style={{ width: `${pct}%` }} /></div>
    </div>
  );
}
