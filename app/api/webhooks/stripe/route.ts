import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getAuditData } from '@/lib/kv';
import { generateReportHtml, generateDFYConfirmationHtml } from '@/lib/report-html';
import type { AuditResult, AuditInput } from '@/types/audit';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'placeholder_key');

async function sendEmail(to: string, subject: string, html: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log('[Email] RESEND_API_KEY not set — skipping send to:', to);
    return;
  }
  const { Resend } = await import('resend');
  const resend = new Resend(apiKey);
  const from = process.env.EMAIL_FROM || 'PresenceIQ <onboarding@resend.dev>';
  const { error } = await resend.emails.send({ from, to, subject, html });
  if (error) throw new Error(JSON.stringify(error));
}

export async function POST(req: NextRequest) {
  const body = await req.text();

  let payload: { type?: string; data?: { object?: { id?: string } } };
  try {
    payload = JSON.parse(body);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (payload.type !== 'checkout.session.completed') {
    return NextResponse.json({ received: true });
  }

  const sessionId = payload.data?.object?.id;
  if (!sessionId) {
    return NextResponse.json({ error: 'No session ID' }, { status: 400 });
  }

  // Verify the session directly with Stripe — no signature secret needed
  let session: Stripe.Checkout.Session;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['customer_details'],
    });
  } catch (err) {
    console.error('[Stripe] Session retrieval failed:', err);
    return NextResponse.json({ error: 'Session not found' }, { status: 400 });
  }

  if (session.payment_status !== 'paid') {
    console.log('[Stripe] Session not paid, ignoring:', session.payment_status);
    return NextResponse.json({ received: true });
  }

  const auditSessionId = session.client_reference_id;
  const customerEmail = session.customer_details?.email;
  const customerName = session.customer_details?.name || 'there';
  const amountTotal = session.amount_total ?? 0;
  const isDFY = amountTotal >= 29700;

  console.log('[Stripe] Payment confirmed:', { auditSessionId, customerEmail, amountTotal, isDFY });

  if (!customerEmail) {
    console.error('[Stripe] No customer email in session');
    return NextResponse.json({ received: true });
  }

  try {
    if (isDFY) {
      const html = generateDFYConfirmationHtml(customerName);
      await sendEmail(customerEmail, `You're confirmed — Done For You starts now`, html);
      console.log('[Email] DFY confirmation sent to:', customerEmail);
    } else {
      let html: string;
      if (auditSessionId) {
        const stored = await getAuditData(auditSessionId) as { auditResult: AuditResult; input: AuditInput } | null;
        html = generateReportHtml(stored?.auditResult ?? null, stored?.input?.name || customerName);
      } else {
        html = generateReportHtml(null, customerName);
      }
      const firstName = customerName.split(' ')[0];
      await sendEmail(customerEmail, `Your Digital Presence Report is ready, ${firstName}`, html);
      console.log('[Email] Full report sent to:', customerEmail);
    }
  } catch (err) {
    console.error('[Email] Send failed:', err);
  }

  return NextResponse.json({ received: true });
}
