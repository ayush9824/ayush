import { contactFormConfig } from '../data/contactForm'

export interface ContactMessage {
  name: string
  email: string
  projectType: string
  message: string
}

export type ContactSubmitResult =
  | { ok: true }
  | { ok: false; error: string }

/**
 * Submits a contact message to the configured backend.
 *
 * The transport is intentionally isolated in this single function. It POSTs
 * JSON to `contactFormConfig.endpointUrl` — currently a Formspree endpoint
 * (https://formspree.io/f/{form_id}), which requires no secret on the client.
 *
 * Success is reported only after the endpoint confirms with an OK status. On
 * failure, Formspree's JSON error is surfaced when available, otherwise a
 * generic fallback is used.
 */
export async function submitContactMessage(
  message: ContactMessage,
): Promise<ContactSubmitResult> {
  const endpoint = contactFormConfig.endpointUrl?.trim()

  if (!endpoint) {
    return {
      ok: false,
      error: 'The contact form is not connected yet. Please try again later.',
    }
  }

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ ...message, ...contactFormConfig.extraFields }),
    })

    if (!res.ok) {
      return { ok: false, error: await extractErrorMessage(res) }
    }
    return { ok: true }
  } catch {
    return {
      ok: false,
      error: 'Could not reach the server. Please check your connection and try again.',
    }
  }
}

async function extractErrorMessage(res: Response): Promise<string> {
  const fallback = 'Something went wrong on our end. Please try again shortly.'
  try {
    const body = await res.json()
    if (body && Array.isArray(body.errors)) {
      const messages = body.errors
        .map((error: { message?: unknown }) => error?.message)
        .filter(Boolean)
      if (messages.length > 0) return messages.join(' ')
    }
  } catch {
    // Response was not JSON — fall back to the generic message.
  }
  return fallback
}

export default submitContactMessage