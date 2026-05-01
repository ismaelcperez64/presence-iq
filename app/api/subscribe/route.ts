import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // TODO: wire to email service (e.g. POST to an N8N webhook → Mailchimp/ConvertKit)
    // body: { email, name, score, verdict }
    console.log('[subscribe]', body.email, body.name, 'score:', body.score);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
