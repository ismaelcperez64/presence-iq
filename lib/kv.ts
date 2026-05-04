export async function storeAuditData(sessionId: string, data: unknown): Promise<void> {
  if (!process.env.UPSTASH_REDIS_REST_URL) return;
  try {
    const { Redis } = await import('@upstash/redis');
    const redis = new Redis({ url: process.env.UPSTASH_REDIS_REST_URL!, token: process.env.UPSTASH_REDIS_REST_TOKEN! });
    await redis.set(sessionId, data, { ex: 60 * 60 * 24 * 7 });
  } catch (err) {
    console.error('[KV] store failed:', err);
  }
}

export async function getAuditData(sessionId: string): Promise<unknown | null> {
  if (!process.env.UPSTASH_REDIS_REST_URL) return null;
  try {
    const { Redis } = await import('@upstash/redis');
    const redis = new Redis({ url: process.env.UPSTASH_REDIS_REST_URL!, token: process.env.UPSTASH_REDIS_REST_TOKEN! });
    return await redis.get(sessionId);
  } catch (err) {
    console.error('[KV] get failed:', err);
    return null;
  }
}
