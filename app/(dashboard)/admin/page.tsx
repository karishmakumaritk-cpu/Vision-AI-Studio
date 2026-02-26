import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { supabaseAdmin } from '@/lib/supabase'
import AdminClient from './AdminClient'

export default async function AdminPage() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') redirect('/dashboard')

  const [usersRes, workflowsRes] = await Promise.all([
    supabaseAdmin.from('users').select('*').order('created_at', { ascending: false }).limit(50),
    supabaseAdmin.from('workflows').select('*, users(name, email)').order('created_at', { ascending: false }).limit(50),
  ])

  return (
    <AdminClient
      users={usersRes.data || []}
      workflows={workflowsRes.data || []}
    />
  )
}
