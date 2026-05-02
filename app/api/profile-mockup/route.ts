import { NextRequest, NextResponse } from 'next/server';
import type { ProfileFormData } from '@/components/ProfileQuestionnaireModal';

function buildEmailHtml(d: ProfileFormData, appUrl: string): string {
  const color = d.primaryColor || '#0066ff';
  const doneForYouUrl = `${appUrl}/done-for-you?name=${encodeURIComponent(d.fullName)}&score=0&verdict=Needs+Work`;

  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a12;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a12;padding:40px 16px;">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

  <tr><td style="text-align:center;padding-bottom:32px;">
    <span style="color:#00d4ff;font-size:20px;font-weight:900;">🔍 PresenceIQ</span>
    <p style="color:#64748b;font-size:13px;margin:8px 0 0;">Your ${d.platform} Profile Mockup</p>
  </td></tr>

  <tr><td style="background:#12121e;border:1px solid #1e1e32;border-radius:16px;padding:28px;">
    <h1 style="color:#ffffff;font-size:22px;font-weight:900;margin:0 0 8px;">Hey ${d.fullName.split(' ')[0] || 'there'}! 👋</h1>
    <p style="color:#94a3b8;font-size:14px;line-height:1.6;margin:0 0 16px;">Here's your watermarked <strong style="color:#fff;">${d.platform} profile mockup</strong> — a preview of what your presence could look like when it's professionally built.</p>
    <p style="color:#94a3b8;font-size:14px;line-height:1.6;margin:0;">This is based on the information you provided. The real version would be fully designed, optimized, and live within 5 business days.</p>
  </td></tr>

  <tr><td style="height:16px;"></td></tr>

  <tr><td style="background:#ffffff;border-radius:16px;overflow:hidden;">
    <div style="background:linear-gradient(135deg,${color},${color}88);height:100px;display:flex;align-items:center;justify-content:center;">
      <p style="color:rgba(255,255,255,0.4);font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin:0;">${d.platform} Cover Photo — Placeholder</p>
    </div>
    <div style="padding:16px 20px 20px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:-28px;">
        <tr>
          <td style="width:64px;"><div style="width:64px;height:64px;border-radius:50%;border:4px solid #fff;background:#e2e8f0;display:flex;align-items:center;justify-content:center;"><span style="font-size:28px;">👤</span></div></td>
          <td style="padding-left:12px;"><span style="font-size:10px;color:#9ca3af;">Profile Photo Placeholder</span></td>
        </tr>
      </table>
      <h2 style="color:#111827;font-size:18px;font-weight:800;margin:12px 0 2px;">${d.fullName || 'Your Name'}</h2>
      <p style="color:#6b7280;font-size:12px;margin:0 0 2px;">${d.businessName || 'Business Name'}</p>
      <p style="color:#374151;font-size:13px;font-weight:600;margin:0 0 4px;">${d.headline || 'Professional Headline'}</p>
      ${(d.streetAddress || d.city) ? `<p style="color:#9ca3af;font-size:12px;margin:0 0 4px;">📍 ${[d.streetAddress, d.city, d.state, d.zip].filter(Boolean).join(', ')}</p>` : ''}
      ${(d.cellPhone || d.businessPhone) ? `<p style="color:#9ca3af;font-size:12px;margin:0 0 12px;">${d.cellPhone ? `📱 ${d.cellPhone}` : ''}${d.cellPhone && d.businessPhone ? ' &nbsp;•&nbsp; ' : ''}${d.businessPhone ? `☎️ ${d.businessPhone}` : ''}</p>` : '<div style="margin-bottom:12px;"></div>'}
      ${d.shortBio ? `<div style="background:#f8fafc;border-left:3px solid ${color};border-radius:4px;padding:10px 12px;margin-bottom:14px;"><p style="color:#374151;font-size:12px;font-style:italic;line-height:1.5;margin:0;">&ldquo;${d.shortBio}&rdquo;</p></div>` : ''}
      <p style="color:#111827;font-size:13px;font-weight:700;margin:0 0 6px;">About</p>
      <p style="color:#4b5563;font-size:13px;line-height:1.6;margin:0 0 16px;">${(d.about || '').substring(0, 300)}${d.about && d.about.length > 300 ? '...' : ''}</p>
      ${d.services ? `<p style="color:#111827;font-size:13px;font-weight:700;margin:0 0 8px;">Services</p><div style="margin-bottom:16px;">${d.services.split(',').slice(0, 4).map(s => `<span style="display:inline-block;background:${color}22;color:${color};border:1px solid ${color}44;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600;margin:2px;">${s.trim()}</span>`).join('')}</div>` : ''}
      <div style="text-align:center;padding:12px 0 4px;border-top:1px solid #f3f4f6;margin-top:8px;">
        <p style="color:#d1d5db;font-size:11px;font-weight:700;letter-spacing:1px;margin:0;">⚠ MOCKUP PREVIEW — PresenceIQ</p>
      </div>
    </div>
  </td></tr>

  <tr><td style="height:24px;"></td></tr>

  <tr><td style="background:#12121e;border:1px solid #00d4ff33;border-radius:16px;padding:28px;text-align:center;">
    <p style="color:#00d4ff;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin:0 0 8px;">Love what you see?</p>
    <h2 style="color:#ffffff;font-size:20px;font-weight:900;margin:0 0 10px;">Let us build the real thing</h2>
    <p style="color:#94a3b8;font-size:13px;line-height:1.6;margin:0 0 20px;">For <strong style="color:#fff;">$297 setup + $59/mo</strong>, our team builds your actual ${d.platform} profile — fully branded and live in 5 business days.</p>
    <a href="${doneForYouUrl}" style="display:inline-block;background:linear-gradient(135deg,#0066ff,#00d4ff);color:#fff;padding:14px 32px;border-radius:10px;font-size:15px;font-weight:800;text-decoration:none;">Build My Real ${d.platform} Profile →</a>
    <p style="color:#475569;font-size:11px;margin:12px 0 0;">Cancel monthly anytime • 30-day satisfaction guarantee</p>
  </td></tr>

  <tr><td style="text-align:center;padding:24px 0 8px;">
    <p style="color:#334155;font-size:11px;margin:0;">© PresenceIQ — Digital Presence Audit Platform</p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  const data: ProfileFormData = await req.json();

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://your-app.vercel.app';
  const html = buildEmailHtml(data, appUrl);

  const resendKey = process.env.RESEND_API_KEY;

  if (resendKey && data.email) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'PresenceIQ <noreply@presenceiq.com>',
          to: [data.email],
          subject: `Your ${data.platform} Profile Mockup is Ready — PresenceIQ`,
          html,
        }),
      });
    } catch (err) {
      console.error('Email send failed:', err);
    }
  } else {
    console.log('[profile-mockup] Email would be sent to:', data.email, '| Platform:', data.platform);
    console.log('[profile-mockup] Set RESEND_API_KEY in .env.local to enable email delivery');
  }

  return NextResponse.json({ ok: true });
}
