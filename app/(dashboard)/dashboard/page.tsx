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
      <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="p-4 border bg-white/5 border-white/10 rounded-xl">
          <p className="text-sm text-slate-400">Subscription</p>
          <p className="mt-1 text-xl font-bold">
            {session?.user?.subscription_status ?? 'TRIAL'}
          </p>
        </div>
        <div className="p-4 border bg-white/5 border-white/10 rounded-xl">
          <p className="text-sm text-slate-400">Role</p>
          <p className="mt-1 text-xl font-bold capitalize">
            {session?.user?.role ?? 'user'}
          </p>
        </div>
        <div className="p-4 border bg-white/5 border-white/10 rounded-xl">
          <p className="text-sm text-slate-400">Trial Ends</p>
          <p className="mt-1 text-xl font-bold">
            {session?.user?.trial_end
              ? new Date(session.user.trial_end).toLocaleDateString('en-IN')
              : 'Active'}
          </p>
        </div>
      </div>
    </div>
  )
}