'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';

const nav = [
  ['Dashboard Home', '/dashboard'],
  ['AI Tools', '/dashboard/ai-tools'],
  ['Prompt Generator', '/dashboard/prompt-generator'],
  ['Saved Prompts', '/dashboard/saved-prompts'],
  ['Billing', '/dashboard/billing'],
  ['Settings', '/dashboard/settings']
] as const;

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="container-shell grid min-h-screen gap-4 py-6 md:grid-cols-[240px_1fr]">
      <aside className="card p-4">
        <h2 className="mb-4 text-lg font-semibold">Vision AI</h2>
        <nav className="space-y-2 text-sm">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className={`block rounded-md px-2 py-1 ${pathname === href ? 'bg-slate-800 text-white' : 'text-slate-400'}`}>{label}</Link>
          ))}
          <Link href="/admin" className="block rounded-md px-2 py-1 text-slate-400">Admin</Link>
        </nav>
        <button onClick={() => signOut({ callbackUrl: '/' })} className="mt-6 w-full rounded-md border border-slate-700 px-2 py-1 text-sm">Logout</button>
      </aside>
      <main>{children}</main>
    </div>
  );
}
