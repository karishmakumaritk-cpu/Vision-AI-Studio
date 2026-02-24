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

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Admin Panel</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="card p-4">Users: {users}</div>
        <div className="card p-4">Subscriptions: {subs}</div>
        <div className="card p-4">Prompt Usage: {prompts}</div>
      </div>
    </div>
  );
}
