import React, { useState } from 'react';
import { LoaderIcon, CheckCircle2Icon, AlertTriangleIcon, SendIcon } from 'lucide-react';
import { SITE } from '../data/site';
import { RecaptchaCheckbox } from './RecaptchaCheckbox';
import { submitContact } from '../utils/contact';

type Fields = {name: string;email: string;company: string;role: string;message: string;};
type Errors = Partial<Record<keyof Fields, string>>;
type Status = 'idle' | 'loading' | 'success' | 'error';

const EMPTY: Fields = { name: '', email: '', company: '', role: '', message: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(fields: Fields): Errors {
  const errors: Errors = {};
  if (!fields.name.trim()) errors.name = 'Name is required.';
  if (!fields.email.trim()) errors.email = 'Work email is required.';else
  if (!EMAIL_RE.test(fields.email.trim())) errors.email = 'Enter a valid email address.';
  if (!fields.company.trim()) errors.company = 'Company is required.';
  if (!fields.message.trim()) errors.message = 'Tell us about your model decisions.';else
  if (fields.message.trim().length < 12) errors.message = 'Please add a little more detail.';
  return errors;
}

const inputClass =
'w-full rounded-xl border bg-white/70 px-4 py-3 font-sans text-[14px] text-ink outline-none transition-colors duration-200 placeholder:text-ink-300 focus:border-[rgba(246,48,73,0.55)]';

export function ContactForm() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [note, setNote] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');
  const [captchaReset, setCaptchaReset] = useState(0);

  const set = (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((prev) => ({ ...prev, [key]: e.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(fields);
    setErrors(found);
    if (Object.keys(found).length) {
      setStatus('error');
      setNote('Please correct the highlighted fields.');
      return;
    }

    if (!captchaToken) {
      setStatus('error');
      setNote('Please complete the reCAPTCHA checkbox before sending your message.');
      return;
    }

    setStatus('loading');
    setNote('');

    try {
      await submitContact({ ...fields, captchaToken });
      setStatus('success');
      setNote('Message received. We usually reply within two working days.');
      setFields(EMPTY);
      setCaptchaToken('');
      setCaptchaReset((value) => value + 1);
    } catch (error) {
      setStatus('error');
      setCaptchaToken('');
      setCaptchaReset((value) => value + 1);
      const reason = error instanceof Error ? ` ${error.message}` : '';
      setNote(`We could not send that.${reason} Please email ${SITE.contactEmail} directly.`);
    }
  };

  if (status === 'success') {
    return (
      <div className="glass-strong rounded-[24px] p-8 shadow-glass" role="status" aria-live="polite">
        <div className="grid h-11 w-11 place-items-center rounded-full bg-[rgba(246,48,73,0.1)]">
          <CheckCircle2Icon className="h-5 w-5 text-[#F63049]" aria-hidden="true" />
        </div>
        <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight text-ink">Message sent</h3>
        <p className="mt-2 max-w-md text-[14px] leading-relaxed text-ink-500">{note}</p>
        <button
          type="button"
          onClick={() => {
            setStatus('idle');
            setNote('');
          }}
          className="mt-6 rounded-full border border-[rgba(138,36,75,0.2)] px-5 py-2.5 font-display text-[13px] font-semibold text-ink transition-colors duration-200 hover:border-[rgba(246,48,73,0.5)]">
          
          Send another message
        </button>
      </div>);

  }

  return (
    <form onSubmit={handleSubmit} noValidate className="glass-strong rounded-[24px] p-6 shadow-glass sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="mono-label text-ink-400">
            Name *
          </label>
          <input
            id="cf-name"
            value={fields.name}
            onChange={set('name')}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'cf-name-error' : undefined}
            placeholder="Full name"
            className={`${inputClass} mt-2 ${errors.name ? 'border-[#F63049]' : 'border-[rgba(138,36,75,0.16)]'}`} />
          
          {errors.name &&
          <p id="cf-name-error" className="mt-1.5 text-[12px] text-[#D02752]">
              {errors.name}
            </p>
          }
        </div>

        <div>
          <label htmlFor="cf-email" className="mono-label text-ink-400">
            Work email *
          </label>
          <input
            id="cf-email"
            type="email"
            value={fields.email}
            onChange={set('email')}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'cf-email-error' : undefined}
            placeholder="you@company.com"
            className={`${inputClass} mt-2 ${errors.email ? 'border-[#F63049]' : 'border-[rgba(138,36,75,0.16)]'}`} />
          
          {errors.email &&
          <p id="cf-email-error" className="mt-1.5 text-[12px] text-[#D02752]">
              {errors.email}
            </p>
          }
        </div>

        <div>
          <label htmlFor="cf-company" className="mono-label text-ink-400">
            Company *
          </label>
          <input
            id="cf-company"
            value={fields.company}
            onChange={set('company')}
            aria-invalid={Boolean(errors.company)}
            aria-describedby={errors.company ? 'cf-company-error' : undefined}
            placeholder="Organization"
            className={`${inputClass} mt-2 ${errors.company ? 'border-[#F63049]' : 'border-[rgba(138,36,75,0.16)]'}`} />
          
          {errors.company &&
          <p id="cf-company-error" className="mt-1.5 text-[12px] text-[#D02752]">
              {errors.company}
            </p>
          }
        </div>

        <div>
          <label htmlFor="cf-role" className="mono-label text-ink-400">
            Role
          </label>
          <input
            id="cf-role"
            value={fields.role}
            onChange={set('role')}
            placeholder="ML engineer, MLOps, CTO…"
            className={`${inputClass} mt-2 border-[rgba(138,36,75,0.16)]`} />
          
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="cf-message" className="mono-label text-ink-400">
          Message *
        </label>
        <textarea
          id="cf-message"
          rows={5}
          value={fields.message}
          onChange={set('message')}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'cf-message-error' : undefined}
          placeholder="Which model decisions are you evaluating right now?"
          className={`${inputClass} mt-2 resize-y ${errors.message ? 'border-[#F63049]' : 'border-[rgba(138,36,75,0.16)]'}`} />
        
        {errors.message &&
        <p id="cf-message-error" className="mt-1.5 text-[12px] text-[#D02752]">
            {errors.message}
          </p>
        }
      </div>

      <div className="mt-5 flex justify-start">
        <RecaptchaCheckbox key={captchaReset} onTokenChange={setCaptchaToken} />
      </div>

      {status === 'error' && note &&
      <p className="mt-4 flex items-start gap-2 rounded-xl border border-[rgba(246,48,73,0.3)] bg-[rgba(246,48,73,0.05)] px-4 py-3 text-[13px] text-[#8A244B]" role="alert">
          <AlertTriangleIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {note}
        </p>
      }

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex items-center gap-2 rounded-full bg-[#F63049] px-6 py-3 font-display text-[13px] font-semibold text-white transition-colors duration-200 ease-out hover:bg-[#D02752] disabled:cursor-not-allowed disabled:opacity-70">
          
          {status === 'loading' ?
          <>
              <LoaderIcon className="h-4 w-4 animate-spin" aria-hidden="true" />
              Sending…
            </> :

          <>
              Send message
              <SendIcon className="h-3.5 w-3.5" aria-hidden="true" />
            </>
          }
        </button>
      </div>
    </form>);

}