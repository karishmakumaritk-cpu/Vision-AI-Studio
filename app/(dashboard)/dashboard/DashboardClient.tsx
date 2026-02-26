'use client'
import { signOut } from 'next-auth/react'
import { useState } from 'react'
import Link from 'next/link'

interface Props {
  user: { name?: string | null; email?: string | null; role: string; subscription_status: string }
  workflows: Array<{ id: string; workflow_type: string; status: string; price: number; created_at: string }>
  trialHoursLeft: number
}

const WORKFLOW_TYPES = [
  { name: 'Lead Automation', icon: '🎯', price: 999, desc: 'WhatsApp + CRM auto-sync' },
  { name: 'Export Documentation AI', icon: '📦', price: 1999, desc: 'Invoice, HS Code, Packing List' },
  { name: 'AI Support Bot', icon: '🤖', price: 1499, desc: '24/7 chatbot + voice agent' },
  { name: 'Sales Automation', icon: '💰', price: 1499, desc: 'Cart recovery + payments' },
  { name: 'Content Automation', icon: '🎬', price: 999, desc: 'Reels, captions, DMs' },
  { name: 'AI Voice Agent', icon: '🎙️', price: 4999, desc: 'Call handling + follow-up' },
]

export default function DashboardClient({ user, workflows, trialHoursLeft }: Props) {
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState('')

  async function requestWorkflow(type: string, price: number) {
    setSubmitting(true)
    const res = await fetch('/api/workflows', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ workflow_type: type, price }),
    })
    setSubmitting(false)
    if (res.ok) {
      setSuccess(`${type} workflow request submitted! We'll start within 2 hours.`)
      setTimeout(() => setSuccess(''), 4000)
    }
  }

  const statusColor = {
    pending: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/20',
    building: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
    completed: 'bg-green-500/15 text-green-400 border-green-500/20',
    cancelled: 'bg-red-500/15 text-red-400 border-red-500/20',
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
              <div className="text-gray-500 text-xs">Customer Portal</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {[
            { label: 'Dashboard', icon: '📊' },
            { label: 'My Projects', icon: '📁' },
            { label: 'New Workflow', icon: '⚡' },
            { label: 'Billing', icon: '💳' },
            { label: 'Settings', icon: '⚙️' },
          ].map(item => (
            <button key={item.label}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                         text-gray-400 hover:text-white hover:bg-white/[0.05]
                         text-sm font-medium transition-all">
              <span>{item.icon}</span>{item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/[0.06]">
          <div className="text-xs text-gray-500 mb-2 truncate">{user.email}</div>
          <button onClick={() => signOut({ callbackUrl: '/' })}
            className="w-full text-left text-xs text-gray-500 hover:text-red-400 transition-colors flex items-center gap-2 py-1">
            <span>↩</span> Sign Out
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="ml-60 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Welcome back, {user.name?.split(' ')[0] || 'there'} 👋
            </h1>
            <p className="text-gray-400 text-sm mt-1">Your AI automation overview</p>
          </div>
          {user.role === 'admin' && (
            <Link href="/admin"
              className="px-4 py-2 rounded-lg bg-brand-500/20 border border-brand-500/30
                         text-brand-400 text-sm font-medium hover:bg-brand-500/30 transition-all">
              Admin Panel →
            </Link>
          )}
        </div>

        {/* Trial Banner */}
        {user.subscription_status === 'trial' && (
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-brand-500/10 to-purple-500/10
                          border border-brand-500/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-500/20 flex items-center justify-center text-xl">⏱</div>
              <div>
                <div className="text-white font-semibold text-sm">Free Trial Active</div>
                <div className="text-gray-400 text-xs mt-0.5">
                  {trialHoursLeft > 0 ? `${trialHoursLeft} hours remaining` : 'Trial ending soon'}
                </div>
              </div>
            </div>
            <Link href="/pricing"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-500 to-purple-500
                         text-white text-sm font-semibold hover:opacity-90 transition-all">
              Upgrade Plan
            </Link>
          </div>
        )}

        {/* Success message */}
        {success && (
          <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
            ✓ {success}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Active Workflows', value: workflows.filter(w => w.status === 'building').length, color: 'text-blue-400' },
            { label: 'Completed', value: workflows.filter(w => w.status === 'completed').length, color: 'text-green-400' },
            { label: 'Total Requested', value: workflows.length, color: 'text-purple-400' },
          ].map(stat => (
            <div key={stat.label} className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5">
              <div className="text-gray-400 text-xs font-medium uppercase tracking-wide mb-2">{stat.label}</div>
              <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Request Workflow */}
        <div className="mb-8">
          <h2 className="text-white font-bold text-lg mb-4">Request a Workflow</h2>
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
            {WORKFLOW_TYPES.map(wf => (
              <div key={wf.name}
                className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5
                           hover:border-brand-500/30 transition-all group cursor-pointer">
                <div className="text-2xl mb-3">{wf.icon}</div>
                <h3 className="text-white font-semibold text-sm mb-1">{wf.name}</h3>
                <p className="text-gray-500 text-xs mb-4">{wf.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-green-400 font-bold text-sm">₹{wf.price.toLocaleString('en-IN')}</span>
                  <button
                    onClick={() => requestWorkflow(wf.name, wf.price)}
                    disabled={submitting}
                    className="px-3 py-1.5 rounded-lg bg-brand-500/20 border border-brand-500/30
                               text-brand-400 text-xs font-semibold hover:bg-brand-500/30
                               disabled:opacity-50 transition-all">
                    Request →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* My Projects */}
        <div>
          <h2 className="text-white font-bold text-lg mb-4">My Projects</h2>
          {workflows.length === 0 ? (
            <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-12 text-center">
              <div className="text-4xl mb-3">⚡</div>
              <p className="text-gray-400 text-sm">No workflows yet. Request your first automation above!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {workflows.map(wf => (
                <div key={wf.id}
                  className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-5 py-4
                             flex items-center justify-between hover:border-white/15 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-lg bg-brand-500/15 flex items-center justify-center text-sm">⚡</div>
                    <div>
                      <div className="text-white font-semibold text-sm">{wf.workflow_type}</div>
                      <div className="text-gray-500 text-xs mt-0.5">
                        {new Date(wf.created_at).toLocaleDateString('en-IN')}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-400 text-sm font-medium">
                      ₹{wf.price.toLocaleString('en-IN')}
                    </span>
                    <span className={`px-3 py-1 rounded-full border text-xs font-semibold capitalize
                                     ${statusColor[wf.status as keyof typeof statusColor] || 'bg-gray-500/15 text-gray-400'}`}>
                      {wf.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
