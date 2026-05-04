export async function storeAuditData(sessionId: string, data: unknown): Promise<void> {
  if (!process.env.REDIS_URL) return;
  try {
    const { createClient } = await import('redis');
    const client = createClient({ url: process.env.REDIS_URL });
    await client.connect();
    await client.set(sessionId, JSON.stringify(data), { EX: 60 * 60 * 24 * 7 });
    await client.disconnect();
  } catch (err) {
    console.error('[KV] store failed:', err);
  }
}

export async function getAuditData(sessionId: string): Promise<unknown | null> {
  if (!process.env.REDIS_URL) return null;
  try {
    const { createClient } = await import('redis');
    const client = createClient({ url: process.env.REDIS_URL });
    await client.connect();
    const raw = await client.get(sessionId);
    await client.disconnect();
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.error('[KV] get failed:', err);
    return null;
  }
}
