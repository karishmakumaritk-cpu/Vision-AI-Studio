'use client';

import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

const nav = [
  { label: 'Dashboard', href: '/dashboard', icon: '⚡' },
  { label: 'AI Tools', href: '/dashboard/ai-tools', icon: '🤖' },
  { label: 'Prompt Generator', href: '/dashboard/prompt-generator', icon: '✨' },
  { label: 'Saved Prompts', href: '/dashboard/saved-prompts', icon: '📂' },
  { label: 'Billing', href: '/dashboard/billing', icon: '💳' },
  { label: 'Settings', href: '/dashboard/settings', icon: '⚙️' },
] as const;

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <div className="container-shell grid min-h-screen gap-4 py-6 md:grid-cols-[240px_1fr]">
      <aside className="card flex flex-col p-4">
        {/* Logo */}
        <div className="mb-6 flex items-center gap-2.5 px-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 text-sm font-bold shadow-lg shadow-indigo-500/30">V</span>
          <span className="font-bold text-white">Vision AI</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1">
          {nav.map(({ label, href, icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                  active
                    ? 'bg-indigo-600/20 text-indigo-300 ring-1 ring-indigo-500/30'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`}
              >
                <span className="text-base leading-none">{icon}</span>
                {label}
              </Link>
            );
          })}
          <Link
            href="/admin"
            className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
              pathname === '/admin'
                ? 'bg-indigo-600/20 text-indigo-300 ring-1 ring-indigo-500/30'
                : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
            }`}
          >
            <span className="text-base leading-none">🛡️</span>
            Admin
          </Link>
        </nav>

        {/* User area */}
        <div className="mt-4 border-t border-slate-800 pt-4">
          {session?.user && (
            <div className="mb-3 flex items-center gap-2.5 px-2">
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 text-xs font-bold text-white">
                {session.user.name?.[0]?.toUpperCase() ?? session.user.email?.[0]?.toUpperCase() ?? 'U'}
              </div>
              <div className="min-w-0">
                <p className="truncate text-xs font-medium text-slate-300">{session.user.name ?? 'User'}</p>
                <p className="truncate text-[10px] text-slate-600">{session.user.email}</p>
              </div>
            </div>
          )}
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="w-full rounded-xl border border-slate-700/60 bg-slate-800/40 px-3 py-2 text-sm text-slate-400 transition-all duration-150 hover:border-slate-600 hover:bg-slate-800 hover:text-white"
          >
            Sign out
          </button>
        </div>
      </aside>
      <main className="min-w-0">{children}</main>
    </div>
  );
}
