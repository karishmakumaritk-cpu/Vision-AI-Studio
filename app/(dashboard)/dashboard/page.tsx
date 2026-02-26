import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { supabaseAdmin } from '@/lib/supabase'
import DashboardClient from './DashboardClient'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/signin')

  // Fetch user's workflows
  const { data: workflows } = await supabaseAdmin
    .from('workflows')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false })
    .limit(10)

  const trialEnd = session.user.trial_end ? new Date(session.user.trial_end) : null
  const trialHoursLeft = trialEnd
    ? Math.max(0, Math.round((trialEnd.getTime() - Date.now()) / 3600000))
    : 0

  return (
    <DashboardClient
      user={session.user}
      workflows={workflows || []}
      trialHoursLeft={trialHoursLeft}
    />
  )
}
