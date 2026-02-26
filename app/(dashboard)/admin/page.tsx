import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (session?.user.role !== 'ADMIN') redirect('/dashboard');

  const [users, subs, prompts] = await Promise.all([
    prisma.user.count(),
    prisma.subscription.count(),
    prisma.prompt.count()
  ]);

  const stats = [
    { label: 'Total Users', value: users, icon: '👥', color: 'from-indigo-600/20 to-violet-600/10' },
    { label: 'Subscriptions', value: subs, icon: '💎', color: 'from-cyan-600/20 to-blue-600/10' },
    { label: 'Prompt Usage', value: prompts, icon: '✨', color: 'from-emerald-600/20 to-teal-600/10' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
        <p className="mt-1 text-sm text-slate-500">Platform overview and metrics</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className={`card bg-gradient-to-br p-5 ${stat.color}`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-slate-400">{stat.label}</p>
                <p className="mt-1.5 text-3xl font-bold text-white">{stat.value}</p>
              </div>
              <span className="text-2xl">{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
