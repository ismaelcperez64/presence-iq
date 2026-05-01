import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json({ error: 'Webhook URL not configured.' }, { status: 500 });
  }

  try {
    const upstream = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(120_000),
    });

    if (!upstream.ok) {
      throw new Error(`N8N returned ${upstream.status}`);
    }

    const data = await upstream.json();
    return NextResponse.json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: `Audit failed: ${message}` }, { status: 502 });
  }
}
