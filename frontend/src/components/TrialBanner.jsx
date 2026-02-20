export default function TrialBanner({ hours }) {
  return <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-amber-300 text-sm">Trial active: {hours}h remaining</div>;
}
