export async function storeAuditData(sessionId: string, data: unknown): Promise<void> {
  if (!process.env.KV_REST_API_URL) return;
  try {
    const { kv } = await import('@vercel/kv');
    await kv.set(sessionId, data, { ex: 60 * 60 * 24 * 7 }); // 7 days
  } catch (err) {
    console.error('[KV] store failed:', err);
  }
}

export async function getAuditData(sessionId: string): Promise<unknown | null> {
  if (!process.env.KV_REST_API_URL) return null;
  try {
    const { kv } = await import('@vercel/kv');
    return await kv.get(sessionId);
  } catch (err) {
    console.error('[KV] get failed:', err);
    return null;
  }
}
