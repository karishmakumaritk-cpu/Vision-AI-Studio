import { supabaseAdmin } from '@/lib/supabase';
import { PLAN_LIMITS, PlanName } from '@/lib/plans';

export async function assertUsageWithinPlan(userId: string, plan: PlanName) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { count } = await supabaseAdmin
    .from('prompts')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .gte('created_at', today.toISOString());

  return (count ?? 0) < PLAN_LIMITS[plan];
}
