export default function TrialBanner({ hours }) {
  return <div className="rounded border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-sm text-amber-300">Trial active: {hours}h remaining</div>;
}
