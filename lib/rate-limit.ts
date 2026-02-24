const requests = new Map<string, { count: number; expires: number }>();

export function checkRateLimit(key: string, limit = 20, windowMs = 60000) {
  const now = Date.now();
  const existing = requests.get(key);
  if (!existing || existing.expires < now) {
    requests.set(key, { count: 1, expires: now + windowMs });
    return true;
  }
  if (existing.count >= limit) return false;
  existing.count += 1;
  return true;
}
