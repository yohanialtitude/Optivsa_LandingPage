import { useEffect, useRef, useState } from 'react';

type RecaptchaApi = {
  ready: (callback: () => void) => void;
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      callback: (token: string) => void;
      'expired-callback': () => void;
      'error-callback': () => void;
    }
  ) => number;
};

declare global {
  interface Window {
    grecaptcha?: RecaptchaApi;
  }
}

const SITE_KEY = '6LeO6cEtAAAAAA2-7pJwTOBzC3kii9TdrEj0kJCO';
const SCRIPT_SELECTOR = 'script[src*="google.com/recaptcha/api.js"]';

type RecaptchaCheckboxProps = {
  onTokenChange: (token: string) => void;
};

export function RecaptchaCheckbox({ onTokenChange }: RecaptchaCheckboxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const container = containerRef.current;
    if (!container) return;

    const handleLoadError = () => {
      if (cancelled) return;
      setLoadError(true);
      onTokenChange('');
    };

    const renderWidget = () => {
      const recaptcha = window.grecaptcha;
      if (!recaptcha) {
        handleLoadError();
        return;
      }

      recaptcha.ready(() => {
        if (cancelled || !containerRef.current) return;
        try {
          recaptcha.render(container, {
            sitekey: SITE_KEY,
            callback: (token) => {
              setLoadError(false);
              onTokenChange(token);
            },
            'expired-callback': () => onTokenChange(''),
            'error-callback': handleLoadError
          });
          setLoadError(false);
        } catch {
          handleLoadError();
        }
      });
    };

    const existingScript = document.querySelector<HTMLScriptElement>(SCRIPT_SELECTOR);
    const script = existingScript ?? document.createElement('script');
    const handleScriptLoad = () => renderWidget();
    script.addEventListener('load', handleScriptLoad, { once: true });
    script.addEventListener('error', handleLoadError, { once: true });

    if (window.grecaptcha) {
      renderWidget();
    } else if (!existingScript) {
      script.src = 'https://www.google.com/recaptcha/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    return () => {
      cancelled = true;
      script.removeEventListener('load', handleScriptLoad);
      script.removeEventListener('error', handleLoadError);
    };
  }, [onTokenChange]);

  return (
    <div>
      <div ref={containerRef} aria-label="reCAPTCHA verification" />
      {loadError && (
        <p className="mt-2 text-sm text-[#D02752]" role="alert">
          reCAPTCHA could not load. Check your connection, browser privacy settings, and site key/domain configuration.
        </p>
      )}
    </div>
  );
}