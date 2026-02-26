'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

interface Props {
  users: Array<Record<string, string>>
  workflows: Array<Record<string, any>>
}

export default function AdminClient({ users, workflows }: Props) {
  const router = useRouter()
  const [tab, setTab] = useState<'overview' | 'users' | 'workflows'>('overview')

  const totalRevenue = workflows.filter(w => w.status === 'completed').reduce((s: number, w: any) => s + (w.price || 0), 0)
  const trialUsers = users.filter(u => u.subscription_status === 'trial').length
  const pendingWf = workflows.filter(w => w.status === 'pending').length

  async function updateWorkflowStatus(id: string, status: string) {
    await fetch('/api/workflows', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    })
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-[#030309]">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-60 bg-white/[0.03] border-r border-white/[0.06] flex flex-col z-10">
        <div className="p-5 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-purple-500 flex items-center justify-center text-sm font-bold">
              V
            </div>
            <div>
              <div className="text-white font-semibold text-sm">Vision AI Studio</div>
              <div className="text-xs text-brand-400">Admin Control</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {[
            { key: 'overview', label: 'Overview', icon: '📊' },
            { key: 'users', label: 'All Users', icon: '👤' },
            { key: 'workflows', label: 'Workflows', icon: '⚡' },
          ].map(item => (
            <button key={item.key}
              onClick={() => setTab(item.key as any)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                         ${tab === item.key
                           ? 'bg-brand-500/20 text-brand-400 border border-brand-500/30'
                           : 'text-gray-400 hover:text-white hover:bg-white/[0.05]'}`}>
              <span>{item.icon}</span>{item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/[0.06]">
          <Link href="/dashboard" className="block text-xs text-gray-500 hover:text-white mb-2">← Customer Dashboard</Link>
          <button onClick={() => signOut({ callbackUrl: '/' })}
            className="text-xs text-gray-500 hover:text-red-400 transition-colors">
            ↩ Sign Out
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="ml-60 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Admin Control Center</h1>
            <p className="text-gray-400 text-sm mt-1">Manage users, workflows & revenue</p>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold">
            ● All Systems Live
          </div>
        </div>

        {/* OVERVIEW */}
        {tab === 'overview' && (
          <div>
            <div className="grid grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total Users', value: users.length, color: 'text-blue-400' },
                { label: 'Active Trials', value: trialUsers, color: 'text-yellow-400' },
                { label: 'Pending Workflows', value: pendingWf, color: 'text-orange-400' },
                { label: 'Revenue Earned', value: `₹${totalRevenue.toLocaleString('en-IN')}`, color: 'text-green-400' },
              ].map(s => (
                <div key={s.label} className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5">
                  <div className="text-gray-400 text-xs uppercase tracking-wide mb-2">{s.label}</div>
                  <div className={`text-3xl font-bold ${s.color}`}>{s.value}</div>
                </div>
              ))}
            </div>

            {/* Recent workflows */}
            <h2 className="text-white font-bold text-lg mb-4">Recent Workflow Requests</h2>
            <div className="space-y-3">
              {workflows.slice(0, 8).map((wf: any) => (
                <div key={wf.id}
                  className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-5 py-4
                             flex items-center justify-between">
                  <div>
                    <div className="text-white font-semibold text-sm">{wf.workflow_type}</div>
                    <div className="text-gray-500 text-xs mt-0.5">
                      {wf.users?.name || 'Unknown'} · ₹{wf.price?.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      wf.status === 'completed' ? 'bg-green-500/15 text-green-400' :
                      wf.status === 'building' ? 'bg-blue-500/15 text-blue-400' :
                      'bg-yellow-500/15 text-yellow-400'}`}>
                      {wf.status}
                    </span>
                    {wf.status === 'pending' && (
                      <button onClick={() => updateWorkflowStatus(wf.id, 'building')}
                        className="px-3 py-1 rounded-lg text-xs bg-brand-500/20 text-brand-400 border border-brand-500/30 hover:bg-brand-500/30 transition-all">
                        Start Build
                      </button>
                    )}
                    {wf.status === 'building' && (
                      <button onClick={() => updateWorkflowStatus(wf.id, 'completed')}
                        className="px-3 py-1 rounded-lg text-xs bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30 transition-all">
                        Mark Done
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* USERS */}
        {tab === 'users' && (
          <div>
            <h2 className="text-white font-bold text-lg mb-4">All Users ({users.length})</h2>
            <div className="space-y-3">
              {users.map(u => (
                <div key={u.id}
                  className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-5 py-4
                             flex items-center justify-between">
                  <div>
                    <div className="text-white font-semibold text-sm">{u.name || 'No name'}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{u.email}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      u.role === 'admin' ? 'bg-purple-500/15 text-purple-400' :
                      u.role === 'worker' ? 'bg-blue-500/15 text-blue-400' :
                      'bg-gray-500/15 text-gray-400'}`}>{u.role}</span>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      u.subscription_status === 'active' ? 'bg-green-500/15 text-green-400' :
                      u.subscription_status === 'trial' ? 'bg-yellow-500/15 text-yellow-400' :
                      'bg-red-500/15 text-red-400'}`}>{u.subscription_status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* WORKFLOWS */}
        {tab === 'workflows' && (
          <div>
            <h2 className="text-white font-bold text-lg mb-4">All Workflows ({workflows.length})</h2>
            <div className="space-y-3">
              {workflows.map((wf: any) => (
                <div key={wf.id}
                  className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-5 py-4
                             flex items-center justify-between">
                  <div>
                    <div className="text-white font-semibold text-sm">{wf.workflow_type}</div>
                    <div className="text-gray-500 text-xs mt-0.5">
                      {wf.users?.email} · ₹{wf.price?.toLocaleString('en-IN')} · {new Date(wf.created_at).toLocaleDateString('en-IN')}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {['pending', 'building', 'completed'].map(s => (
                      <button key={s} onClick={() => updateWorkflowStatus(wf.id, s)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          wf.status === s
                            ? 'bg-brand-500/30 text-brand-300 border border-brand-500/50'
                            : 'bg-white/[0.04] text-gray-500 border border-white/[0.08] hover:text-white'}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
