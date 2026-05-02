import type { AuditResult } from '@/types/audit';

const PRIORITY_COLOR: Record<string, string> = {
  immediate: '#ef4444',
  high: '#f59e0b',
  medium: '#3b82f6',
  low: '#6b7280',
};

const SEVERITY_COLOR: Record<string, string> = {
  high: '#dc2626',
  medium: '#d97706',
  low: '#16a34a',
};

const SEVERITY_BG: Record<string, string> = {
  high: '#fef2f2',
  medium: '#fffbeb',
  low: '#f0fdf4',
};

function scoreColor(score: number) {
  if (score >= 70) return '#10b981';
  if (score >= 45) return '#f59e0b';
  return '#ef4444';
}

function row(label: string, value: string | number) {
  return `<tr>
    <td style="padding:10px 14px;border-bottom:1px solid #f1f5f9;color:#374151;font-size:13px;font-weight:600;width:55%;">${label}</td>
    <td style="padding:10px 14px;border-bottom:1px solid #f1f5f9;color:#0f172a;font-size:13px;font-weight:700;text-align:right;">${value}</td>
  </tr>`;
}

export function generateReportHtml(result: AuditResult | null, name: string): string {
  const score = result?.overallScore ?? 0;
  const verdict = result?.verdict ?? 'Needs Work';
  const summary = result?.summary ?? 'Your audit has been completed. See your platform breakdown and action checklist below.';
  const platforms = result?.platforms ?? [];
  const negativeContent = result?.negativeContent ?? [];
  const copycats = result?.copycats ?? [];
  const recommendations = [...(result?.recommendations ?? [])].sort((a, b) => {
    const order = { immediate: 0, high: 1, medium: 2, low: 3 };
    return order[a.priority] - order[b.priority];
  });
  const date = result?.scannedAt
    ? new Date(result.scannedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://presence-iq-six.vercel.app';
  const sc = scoreColor(score);

  const verdictColorMap: Record<string, string> = {
    'Authority Status': '#22d3ee',
    'Building Momentum': '#10b981',
    'Needs Work': '#f59e0b',
    'Digital Danger Zone': '#ef4444',
  };
  const vc = verdictColorMap[verdict] || '#22d3ee';

  const platformsHtml = platforms.length > 0
    ? platforms.map(p => `
    <tr>
      <td style="padding:9px 14px;border-bottom:1px solid #f1f5f9;font-size:13px;color:#374151;">
        ${p.found ? '✅' : '❌'} <strong>${p.platform}</strong>
        ${p.notes ? `<span style="color:#94a3b8;font-size:12px;"> — ${p.notes}</span>` : ''}
        ${p.url ? `<a href="${p.url}" style="color:#3b82f6;font-size:11px;margin-left:6px;">view →</a>` : ''}
      </td>
      <td style="padding:9px 14px;border-bottom:1px solid #f1f5f9;text-align:right;">
        <span style="color:${scoreColor(p.score)};font-size:13px;font-weight:700;">${p.score}/100</span>
      </td>
    </tr>`).join('')
    : row('No platform data available', '—');

  const recsHtml = recommendations.slice(0, 10).map((rec) => `
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:10px;border-radius:8px;overflow:hidden;border:1px solid #e2e8f0;">
      <tr>
        <td style="width:6px;background:${PRIORITY_COLOR[rec.priority] || '#6b7280'};"></td>
        <td style="padding:12px 16px;background:#f8fafc;">
          <div style="margin-bottom:4px;">
            <span style="color:${PRIORITY_COLOR[rec.priority] || '#6b7280'};font-size:10px;font-weight:800;text-transform:uppercase;">${rec.priority}</span>
            <span style="color:#cbd5e1;font-size:10px;margin:0 6px;">•</span>
            <span style="color:#94a3b8;font-size:10px;">${rec.category}</span>
          </div>
          <div style="color:#0f172a;font-size:14px;font-weight:700;margin-bottom:3px;">${rec.action}</div>
          <div style="color:#64748b;font-size:12px;">${rec.impact}</div>
        </td>
        <td style="padding:12px 16px;background:#f8fafc;width:40px;vertical-align:middle;">
          <div style="width:22px;height:22px;border:2px solid #cbd5e1;border-radius:4px;"></div>
        </td>
      </tr>
    </table>`).join('');

  const negativeHtml = negativeContent.length > 0 ? `
    <tr><td style="padding:28px 32px;background:#fef2f2;border-top:2px solid #fecaca;">
      <div style="color:#991b1b;font-size:15px;font-weight:800;margin-bottom:4px;">⚠️ Issues Found (${negativeContent.length})</div>
      <div style="color:#dc2626;font-size:12px;margin-bottom:18px;">These mentions require your attention</div>
      ${negativeContent.map(item => `
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:10px;background:#fff;border:1px solid #fecaca;border-radius:8px;">
          <tr><td style="padding:14px 16px;">
            <table width="100%"><tr>
              <td style="color:#374151;font-size:13px;font-weight:700;">${item.source}${item.url ? ` <a href="${item.url}" style="color:#3b82f6;font-size:11px;margin-left:6px;">view →</a>` : ''}</td>
              <td style="text-align:right;"><span style="background:${SEVERITY_BG[item.severity] || '#f0fdf4'};color:${SEVERITY_COLOR[item.severity] || '#16a34a'};font-size:10px;font-weight:800;padding:2px 8px;border-radius:10px;text-transform:uppercase;">${item.severity}</span></td>
            </tr></table>
            <div style="color:#6b7280;font-size:13px;margin-top:8px;font-style:italic;">"${item.snippet}"</div>
          </td></tr>
        </table>`).join('')}
    </td></tr>` : '';

  const copycatsHtml = copycats.length > 0 ? `
    <tr><td style="padding:28px 32px;background:#fff7ed;border-top:2px solid #fed7aa;">
      <div style="color:#92400e;font-size:15px;font-weight:800;margin-bottom:4px;">👥 Copycats &amp; Impersonators (${copycats.length})</div>
      <div style="color:#d97706;font-size:12px;margin-bottom:18px;">Accounts using your name or brand online</div>
      ${copycats.map(item => `
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:10px;background:#fff;border:1px solid #fed7aa;border-radius:8px;">
          <tr><td style="padding:14px 16px;">
            <table width="100%"><tr>
              <td style="color:#374151;font-size:13px;font-weight:700;">${item.platform}${item.url ? ` <a href="${item.url}" style="color:#3b82f6;font-size:11px;margin-left:6px;">view →</a>` : ''}</td>
              <td style="text-align:right;"><span style="background:${SEVERITY_BG[item.riskLevel] || '#fffbeb'};color:${SEVERITY_COLOR[item.riskLevel] || '#d97706'};font-size:10px;font-weight:800;padding:2px 8px;border-radius:10px;text-transform:uppercase;">${item.riskLevel} risk</span></td>
            </tr></table>
            <div style="color:#6b7280;font-size:13px;margin-top:6px;">${item.description}</div>
          </td></tr>
        </table>`).join('')}
    </td></tr>` : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Digital Presence Report — ${name}</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

  <!-- HEADER -->
  <tr><td style="background:#0f1117;border-radius:12px 12px 0 0;padding:32px;">
    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      <td style="color:#22d3ee;font-size:18px;font-weight:900;letter-spacing:-0.5px;">🔍 PresenceIQ</td>
      <td style="text-align:right;color:#475569;font-size:11px;">Digital Presence Report</td>
    </tr></table>
    <div style="margin-top:24px;padding-top:24px;border-top:1px solid #1e293b;">
      <div style="color:#64748b;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">Prepared for</div>
      <div style="color:#ffffff;font-size:26px;font-weight:900;">${name}</div>
      <div style="color:#475569;font-size:12px;margin-top:4px;">Scanned on ${date}</div>
    </div>
  </td></tr>

  <!-- SCORE -->
  <tr><td style="background:#ffffff;padding:32px;">
    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      <td width="130" valign="middle">
        <table cellpadding="0" cellspacing="0"><tr><td style="width:110px;height:110px;border-radius:55px;border:5px solid ${sc};background:${sc}15;text-align:center;vertical-align:middle;">
          <div style="color:${sc};font-size:40px;font-weight:900;line-height:1;">${score}</div>
          <div style="color:${sc};font-size:11px;font-weight:700;">/100</div>
        </td></tr></table>
      </td>
      <td valign="middle" style="padding-left:24px;">
        <div style="display:inline-block;background:${vc}20;border:1px solid ${vc}50;border-radius:20px;padding:4px 14px;margin-bottom:10px;">
          <span style="color:${vc};font-size:11px;font-weight:800;text-transform:uppercase;">${verdict}</span>
        </div>
        <div style="color:#334155;font-size:14px;line-height:1.6;">${summary}</div>
      </td>
    </tr></table>

    <!-- STAT CHIPS -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;border-top:1px solid #f1f5f9;padding-top:20px;">
    <tr>
      <td width="32%" style="background:#f8fafc;border-radius:8px;padding:12px;text-align:center;">
        <div style="color:#0f172a;font-size:22px;font-weight:900;">${platforms.filter(p => p.found).length}/${platforms.length}</div>
        <div style="color:#94a3b8;font-size:11px;margin-top:2px;">Platforms Found</div>
      </td>
      <td width="2%"></td>
      <td width="32%" style="background:${negativeContent.length > 0 ? '#fef2f2' : '#f8fafc'};border-radius:8px;padding:12px;text-align:center;">
        <div style="color:${negativeContent.length > 0 ? '#ef4444' : '#0f172a'};font-size:22px;font-weight:900;">${negativeContent.length}</div>
        <div style="color:#94a3b8;font-size:11px;margin-top:2px;">Issues Found</div>
      </td>
      <td width="2%"></td>
      <td width="32%" style="background:${copycats.length > 0 ? '#fef2f2' : '#f8fafc'};border-radius:8px;padding:12px;text-align:center;">
        <div style="color:${copycats.length > 0 ? '#ef4444' : '#0f172a'};font-size:22px;font-weight:900;">${copycats.length}</div>
        <div style="color:#94a3b8;font-size:11px;margin-top:2px;">Copycats</div>
      </td>
    </tr></table>
  </td></tr>

  <!-- PLATFORM BREAKDOWN -->
  <tr><td style="background:#f8fafc;border-top:2px solid #e2e8f0;padding:28px 32px;">
    <div style="color:#0f172a;font-size:15px;font-weight:800;margin-bottom:4px;">Platform Breakdown</div>
    <div style="color:#94a3b8;font-size:12px;margin-bottom:18px;">Your presence across ${platforms.length} platforms</div>
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;border:1px solid #e2e8f0;overflow:hidden;">
      ${platformsHtml}
    </table>
  </td></tr>

  <!-- PRIORITY CHECKLIST -->
  <tr><td style="background:#ffffff;border-top:2px solid #e2e8f0;padding:28px 32px;">
    <div style="color:#0f172a;font-size:15px;font-weight:800;margin-bottom:4px;">✅ Priority Action Checklist</div>
    <div style="color:#94a3b8;font-size:12px;margin-bottom:18px;">Complete in order — check each off as you go</div>
    ${recsHtml || '<p style="color:#94a3b8;font-size:13px;">No recommendations at this time.</p>'}
  </td></tr>

  ${negativeHtml}
  ${copycatsHtml}

  <!-- DFY CTA -->
  <tr><td style="background:#0f1117;padding:32px;border-top:2px solid #1e293b;">
    <div style="text-align:center;">
      <div style="color:#22d3ee;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:10px;">Want us to handle all of this?</div>
      <div style="color:#ffffff;font-size:20px;font-weight:900;margin-bottom:8px;">Done For You — $297 setup + $59/mo</div>
      <div style="color:#94a3b8;font-size:13px;line-height:1.6;margin-bottom:24px;">We build your Facebook, YouTube &amp; LinkedIn profiles from scratch and run monthly lead automation — so you focus on closing deals.</div>
      <a href="${appUrl}/done-for-you" style="display:inline-block;background:#22d3ee;color:#0f1117;font-size:14px;font-weight:800;padding:14px 36px;border-radius:8px;text-decoration:none;">Get Started Today →</a>
    </div>
    <div style="margin-top:32px;padding-top:20px;border-top:1px solid #1e293b;text-align:center;">
      <div style="color:#475569;font-size:11px;">© 2025 PresenceIQ · All rights reserved</div>
      <div style="color:#334155;font-size:11px;margin-top:4px;">Questions? Reply to this email anytime.</div>
    </div>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

export function generateDFYConfirmationHtml(name: string): string {
  const firstName = name.split(' ')[0] || 'there';
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://presence-iq-six.vercel.app';
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><title>Done For You — Confirmed</title></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

  <tr><td style="background:#0f1117;border-radius:12px 12px 0 0;padding:32px;text-align:center;">
    <div style="color:#22d3ee;font-size:18px;font-weight:900;">🔍 PresenceIQ</div>
  </td></tr>

  <tr><td style="background:#ffffff;padding:40px 32px;text-align:center;">
    <div style="font-size:48px;margin-bottom:16px;">🚀</div>
    <div style="color:#0f172a;font-size:24px;font-weight:900;margin-bottom:8px;">You're confirmed, ${firstName}!</div>
    <div style="color:#64748b;font-size:14px;line-height:1.7;max-width:420px;margin:0 auto;">
      Your Done For You package is locked in. Your dedicated account manager will reach out within <strong style="color:#0f172a;">1 business day</strong> to kick off your profile build.
    </div>
  </td></tr>

  <tr><td style="background:#f8fafc;border-top:2px solid #e2e8f0;padding:28px 32px;">
    <div style="color:#0f172a;font-size:15px;font-weight:800;margin-bottom:18px;">What happens next</div>
    ${[
      ['📬', 'Confirmation email in your inbox (this one!)'],
      ['📞', 'Account manager calls within 1 business day'],
      ['🔨', 'Profile build begins — FB, YouTube & LinkedIn'],
      ['🤖', 'Lead automation goes live within 5–7 business days'],
      ['📊', 'Monthly reporting starts from day 1'],
    ].map(([icon, text]) => `
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
    <tr>
      <td width="36" style="font-size:20px;vertical-align:top;padding-top:2px;">${icon}</td>
      <td style="color:#334155;font-size:14px;line-height:1.5;">${text}</td>
    </tr></table>`).join('')}
  </td></tr>

  <tr><td style="background:#0f1117;padding:32px;border-radius:0 0 12px 12px;text-align:center;border-top:2px solid #1e293b;">
    <div style="color:#ffffff;font-size:14px;margin-bottom:12px;">Need to reach us before then?</div>
    <div style="color:#94a3b8;font-size:13px;margin-bottom:20px;">Reply to this email — we respond within a few hours.</div>
    <a href="${appUrl}" style="display:inline-block;background:#22d3ee;color:#0f1117;font-size:13px;font-weight:800;padding:12px 28px;border-radius:8px;text-decoration:none;">Back to PresenceIQ →</a>
    <div style="margin-top:24px;color:#475569;font-size:11px;">© 2025 PresenceIQ · All rights reserved</div>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}
