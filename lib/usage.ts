import { prisma } from '@/lib/db';
import { PLAN_LIMITS, PlanName } from '@/lib/plans';

export async function assertUsageWithinPlan(userId: string, plan: PlanName) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const usedToday = await prisma.prompt.count({
    where: { userId, createdAt: { gte: today } }
  });

  return usedToday < PLAN_LIMITS[plan];
}
