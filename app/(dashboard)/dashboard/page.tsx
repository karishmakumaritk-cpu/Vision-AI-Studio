'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/signin')
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#030309] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#030309] text-white p-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <p className="text-sm text-slate-400">Subscription</p>
          <p className="text-xl font-bold mt-1">
            {session?.user?.subscription_status ?? 'TRIAL'}
          </p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <p className="text-sm text-slate-400">Role</p>
          <p className="text-xl font-bold mt-1 capitalize">
            {session?.user?.role ?? 'user'}
          </p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <p className="text-sm text-slate-400">Trial Ends</p>
          <p className="text-xl font-bold mt-1">
            {session?.user?.trial_end
              ? new Date(session.user.trial_end).toLocaleDateString('en-IN')
              : 'Active'}
          </p>
        </div>
      </div>
    </div>
  )
}
