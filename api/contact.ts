import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const SANIA_EMAIL = process.env.SANIA_EMAIL || 'saniamachal9@gmail.com';

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!process.env.RESEND_API_KEY) {
    return new Response(JSON.stringify({ error: 'Email service not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { name, email, subject, message } = await req.json();

    // Basic validation
    if (!name || !email || !subject || !message) {
      return new Response(JSON.stringify({ error: 'All fields are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
        </div>
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e9ecef; border-top: none;">
          <div style="margin-bottom: 20px;">
            <label style="display: block; font-weight: 600; color: #555; margin-bottom: 5px;">Name</label>
            <p style="margin: 0; padding: 12px; background: white; border-radius: 6px; border: 1px solid #dee2e6;">${escapeHtml(name)}</p>
          </div>
          <div style="margin-bottom: 20px;">
            <label style="display: block; font-weight: 600; color: #555; margin-bottom: 5px;">Email</label>
            <p style="margin: 0; padding: 12px; background: white; border-radius: 6px; border: 1px solid #dee2e6;">${escapeHtml(email)}</p>
          </div>
          <div style="margin-bottom: 20px;">
            <label style="display: block; font-weight: 600; color: #555; margin-bottom: 5px;">Subject</label>
            <p style="margin: 0; padding: 12px; background: white; border-radius: 6px; border: 1px solid #dee2e6;">${escapeHtml(subject)}</p>
          </div>
          <div style="margin-bottom: 20px;">
            <label style="display: block; font-weight: 600; color: #555; margin-bottom: 5px;">Message</label>
            <p style="margin: 0; padding: 12px; background: white; border-radius: 6px; border: 1px solid #dee2e6; white-space: pre-wrap;">${escapeHtml(message)}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #dee2e6; margin: 20px 0;">
          <p style="margin: 0; font-size: 12px; color: #888;">
            Sent from Sania Machal Portfolio Contact Form<br>
            ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
          </p>
        </div>
      </body>
      </html>
    `;

    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: SANIA_EMAIL,
      subject: `New Contact: ${subject}`,
      html,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Email send error:', err);
    return new Response(JSON.stringify({ error: 'Failed to send email' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&',
    '<': '<',
    '>': '>',
    '"': '"',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}