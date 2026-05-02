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
  const sig = req.headers.get('stripe-signature');
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !secret) {
    return NextResponse.json({ error: 'Missing signature or secret' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch (err) {
    console.error('[Stripe] Signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const sessionId = session.client_reference_id;
    const customerEmail = session.customer_details?.email;
    const customerName = session.customer_details?.name || 'there';
    const amountTotal = session.amount_total ?? 0;
    const isDFY = amountTotal >= 29700; // $297 in cents

    console.log('[Stripe] Payment confirmed:', { sessionId, customerEmail, amountTotal, isDFY });

    if (!customerEmail) {
      console.error('[Stripe] No customer email in session');
      return NextResponse.json({ received: true });
    }

    try {
      if (isDFY) {
        const html = generateDFYConfirmationHtml(customerName);
        await sendEmail(
          customerEmail,
          `You're confirmed — Done For You starts now`,
          html
        );
        console.log('[Email] DFY confirmation sent to:', customerEmail);
      } else {
        let html: string;
        if (sessionId) {
          const stored = await getAuditData(sessionId) as { auditResult: AuditResult; input: AuditInput } | null;
          html = generateReportHtml(stored?.auditResult ?? null, stored?.input?.name || customerName);
        } else {
          html = generateReportHtml(null, customerName);
        }
        const firstName = customerName.split(' ')[0];
        await sendEmail(
          customerEmail,
          `Your Digital Presence Report is ready, ${firstName}`,
          html
        );
        console.log('[Email] Full report sent to:', customerEmail);
      }
    } catch (err) {
      console.error('[Email] Send failed:', err);
      // Still return 200 so Stripe does not retry — log for manual follow-up
    }
  }

  return NextResponse.json({ received: true });
}
