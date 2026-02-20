import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const [promptCount, recent] = await Promise.all([
    prisma.prompt.count({ where: { userId: session?.user.id } }),
    prisma.prompt.findMany({ where: { userId: session?.user.id }, orderBy: { createdAt: 'desc' }, take: 5 })
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard Home</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="card p-4"><p className="text-sm text-slate-400">Subscription</p><p className="text-xl">{session?.user.subscriptionPlan ?? 'FREE'}</p></div>
        <div className="card p-4"><p className="text-sm text-slate-400">Total Prompts</p><p className="text-xl">{promptCount}</p></div>
        <div className="card p-4"><p className="text-sm text-slate-400">Remaining today</p><p className="text-xl">Plan based</p></div>
      </div>
      <div className="card p-4">
        <h2 className="mb-3 text-lg">Recent Prompts</h2>
        <ul className="space-y-2 text-sm text-slate-300">
          {recent.map((prompt) => (
            <li key={prompt.id} className="rounded-md bg-slate-800/60 p-2">{prompt.prompt}</li>
          ))}
          {!recent.length && <li className="text-slate-500">No prompts yet.</li>}
        </ul>
      </div>
    </div>
  );
}
