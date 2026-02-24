export const PLAN_LIMITS = {
  FREE: 20,
  PRO: 500,
  PREMIUM: Number.MAX_SAFE_INTEGER
} as const;

export type PlanName = keyof typeof PLAN_LIMITS;
