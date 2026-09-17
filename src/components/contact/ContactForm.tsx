import { useState } from 'react'
import type { FormEvent } from 'react'
import { contactFormConfig } from '../../data/contactForm'
import { submitContactMessage } from '../../lib/contactSubmit'
import { cn } from '../../utils/cn'
import { CheckIcon, SpinnerIcon } from '../Icons'

type FieldName = 'name' | 'email' | 'projectType' | 'message'
type FormData = Record<FieldName, string>
type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const initialData: FormData = { name: '', email: '', projectType: '', message: '' }
const initialErrors: FormData = { name: '', email: '', projectType: '', message: '' }

function validate(data: FormData): FormData {
  const errors = { ...initialErrors }
  if (!data.name.trim()) {
    errors.name = 'Please enter your name.'
  } else if (data.name.trim().length < 2) {
    errors.name = 'Your name should be at least 2 characters.'
  }
  if (!data.email.trim()) {
    errors.email = 'Please enter your email address.'
  } else if (!EMAIL_RE.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address (e.g. name@example.com).'
  }
  if (!data.projectType) {
    errors.projectType = 'Please choose a project type.'
  }
  if (!data.message.trim()) {
    errors.message = 'Please write a short message.'
  } else if (data.message.trim().length < 10) {
    errors.message = 'Your message should be at least 10 characters.'
  }
  return errors
}

const inputBase =
  'w-full border bg-ink-900 px-4 py-3 text-sm text-bone-100 transition-colors ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950'

function inputClasses(hasError: boolean): string {
  return cn(inputBase, hasError ? 'border-ember-500' : 'border-ink-600')
}

/**
 * Contact form with client-side validation and idle / submitting / success /
 * error states. Submission runs through src/lib/contactSubmit.ts, which is
 * the single seam where a form backend can be connected later.
 */
export default function ContactForm() {
  const [data, setData] = useState<FormData>(initialData)
  const [errors, setErrors] = useState<FormData>(initialErrors)
  const [status, setStatus] = useState<FormStatus>('idle')
  const [submitError, setSubmitError] = useState<string | null>(null)

  const isSubmitting = status === 'submitting'

  const setField = (field: FieldName, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors = validate(data)
    setErrors(nextErrors)

    const firstInvalid = (Object.keys(nextErrors) as FieldName[]).find(
      (field) => nextErrors[field],
    )
    if (firstInvalid) {
      setStatus('idle')
      setSubmitError(null)
      document.getElementById(`contact-${firstInvalid}`)?.focus()
      return
    }

    setStatus('submitting')
    setSubmitError(null)

    const result = await submitContactMessage(data)

    if (result.ok) {
      setData(initialData)
      setErrors(initialErrors)
      setStatus('success')
    } else {
      setStatus('error')
      setSubmitError(result.error)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-labelledby="contact-form-heading">
      <h2
        id="contact-form-heading"
        className="text-sm uppercase tracking-widest text-bone-400"
      >
        Send a Message
      </h2>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="mb-2 block text-xs uppercase tracking-widest text-bone-300"
          >
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            autoComplete="name"
            value={data.name}
            onChange={(e) => setField('name', e.target.value)}
            disabled={isSubmitting}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
            className={inputClasses(!!errors.name)}
            placeholder="Your name"
          />
          {errors.name && (
            <p id="contact-name-error" role="alert" className="mt-2 text-sm text-ember-400">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="mb-2 block text-xs uppercase tracking-widest text-bone-300"
          >
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            autoComplete="email"
            value={data.email}
            onChange={(e) => setField('email', e.target.value)}
            disabled={isSubmitting}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
            className={inputClasses(!!errors.email)}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p id="contact-email-error" role="alert" className="mt-2 text-sm text-ember-400">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="mt-6">
        <label
          htmlFor="contact-projectType"
          className="mb-2 block text-xs uppercase tracking-widest text-bone-300"
        >
          Project Type
        </label>
        <select
          id="contact-projectType"
          name="projectType"
          value={data.projectType}
          onChange={(e) => setField('projectType', e.target.value)}
          disabled={isSubmitting}
          aria-invalid={errors.projectType ? true : undefined}
          aria-describedby={
            errors.projectType ? 'contact-projectType-error' : undefined
          }
          className={cn(inputClasses(!!errors.projectType), 'appearance-none')}
        >
          <option value="">Select a project type</option>
          {contactFormConfig.projectTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.projectType && (
          <p id="contact-projectType-error" role="alert" className="mt-2 text-sm text-ember-400">
            {errors.projectType}
          </p>
        )}
      </div>

      <div className="mt-6">
        <label
          htmlFor="contact-message"
          className="mb-2 block text-xs uppercase tracking-widest text-bone-300"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={data.message}
          onChange={(e) => setField('message', e.target.value)}
          disabled={isSubmitting}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          className={cn(inputClasses(!!errors.message), 'resize-y')}
          placeholder="Tell me a little about your project, timeline and goals."
        />
        {errors.message && (
          <p id="contact-message-error" role="alert" className="mt-2 text-sm text-ember-400">
            {errors.message}
          </p>
        )}
      </div>

      {status === 'success' && (
        <div
          role="status"
          className="mt-6 flex items-start gap-3 rounded-md border border-ember-400/40 bg-ember-400/10 p-4 text-sm text-bone-100"
        >
          <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-ember-400" />
          <p>
            Thanks {data.name.trim() || 'friend'} — your message has been sent.
            I&apos;ll get back to you soon.
          </p>
        </div>
      )}

      {status === 'error' && submitError && (
        <div
          role="alert"
          className="mt-6 rounded-md border border-ember-500 bg-ember-500/10 p-4 text-sm text-bone-100"
        >
          {submitError}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-8 inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium uppercase tracking-widest text-white shadow-glow-sm transition-all duration-300 bg-ember-600 hover:bg-ember-500 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting && <SpinnerIcon className="h-4 w-4 animate-spin" />}
        {isSubmitting ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  )
}