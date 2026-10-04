type ContactFields = {
  name: string;
  email: string;
  company: string;
  role: string;
  message: string;
};

type ContactRequest = {
  body?: unknown;
  method?: string;
};

type ContactResponse = {
  status: (code: number) => ContactResponse;
  json: (body: Record<string, string>) => void;
};

const DEFAULT_FORM_ENDPOINT = 'https://formspree.io/f/xdeoyjbe';

export default async function handler(req: ContactRequest, res: ContactResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const secret = process.env.RECAPTCHA_SECRET_KEY;
  const body = req.body && typeof req.body === 'object'
    ? req.body as Record<string, unknown>
    : {};
  const captchaToken = typeof body.captchaToken === 'string' ? body.captchaToken : '';
  const fields: ContactFields = {
    name: typeof body.name === 'string' ? body.name.trim() : '',
    email: typeof body.email === 'string' ? body.email.trim() : '',
    company: typeof body.company === 'string' ? body.company.trim() : '',
    role: typeof body.role === 'string' ? body.role.trim() : '',
    message: typeof body.message === 'string' ? body.message.trim() : ''
  };
  if (!captchaToken || !fields.email || !fields.message) {
    return res.status(400).json({ error: 'Required fields or CAPTCHA response are missing.' });
  }

  try {
    if (secret) {
      const verification = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ secret, response: captchaToken })
      });
      const result = await verification.json() as { success?: boolean };
      if (!verification.ok || !result.success) {
        return res.status(400).json({ error: 'CAPTCHA verification failed. Please try again.' });
      }
    }

    const destination = process.env.CONTACT_FORM_ENDPOINT || DEFAULT_FORM_ENDPOINT;
    const submission = await fetch(destination, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(fields)
    });
    if (!submission.ok) {
      return res.status(502).json({ error: 'Could not deliver the contact form submission.' });
    }

    return res.status(200).json({ message: 'Message received.' });
  } catch {
    return res.status(502).json({ error: 'Could not process the contact form submission.' });
  }
}