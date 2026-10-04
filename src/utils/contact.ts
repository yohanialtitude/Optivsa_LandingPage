type ContactResponse = {
  error?: string;
};

export async function submitContact(payload: Record<string, string>): Promise<void> {
  const request = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  };

  let response = await fetch('/api/contact', request);
  if (response.status === 404) {
    response = await fetch('/api/contact.php', request);
  }

  const result = await response.json().catch(() => null) as ContactResponse | null;
  if (!response.ok) {
    throw new Error(result?.error || `Request failed (${response.status}).`);
  }
}