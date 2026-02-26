import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const [promptCount, recent] = await Promise.all([
    prisma.prompt.count({ where: { userId: session?.user.id } }),
    prisma.prompt.findMany({ where: { userId: session?.user.id }, orderBy: { createdAt: 'desc' }, take: 5 })
  ]);

  const stats = [
    { label: 'Subscription', value: session?.user.subscriptionPlan ?? 'FREE', color: 'from-indigo-600/20 to-violet-600/10', icon: '💎' },
    { label: 'Total Prompts', value: String(promptCount), color: 'from-cyan-600/20 to-blue-600/10', icon: '✨' },
    { label: 'Remaining Today', value: 'Plan based', color: 'from-emerald-600/20 to-teal-600/10', icon: '⚡' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">Welcome back, {session?.user.name ?? 'there'}!</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className={`card bg-gradient-to-br p-5 ${stat.color}`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-slate-400">{stat.label}</p>
                <p className="mt-1.5 text-2xl font-bold text-white">{stat.value}</p>
              </div>
              <span className="text-2xl">{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="card p-5">
        <h2 className="mb-4 text-base font-semibold text-white">Recent Prompts</h2>
        <ul className="space-y-2">
          {recent.map((prompt) => (
            <li key={prompt.id} className="truncate rounded-xl bg-slate-800/60 px-4 py-3 text-sm text-slate-300">
              {prompt.prompt}
            </li>
          ))}
          {!recent.length && (
            <li className="rounded-xl border border-dashed border-slate-800 px-4 py-6 text-center text-sm text-slate-600">
              No prompts yet. Go to <span className="text-indigo-400">Prompt Generator</span> to get started.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
