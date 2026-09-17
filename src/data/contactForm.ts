/**
 * Contact form configuration.
 *
 * The form POSTs submissions as JSON to `endpointUrl`, which currently points
 * at Formspree (https://formspree.io/f/{form_id}). Formspree needs no API key
 * on the client — the form endpoint is public by design and forwards
 * submissions to the inbox configured on the Formspree form.
 *
 * To connect real submissions, create a form at https://formspree.io with
 * the destination inbox set to the receiving email and plug the form's ID
 * into `endpointUrl` below.
 *
 * Web3Forms-style services that require an access key are supported via the
 * `extraFields` map, but the key should be injected at build/deploy time,
 * never committed to this repo.
 *
 * NEVER put a secret API key in this file or anywhere in the repository.
 */
export const contactFormConfig = {
  /** Public JSON endpoint. POSTs the form fields as JSON; Formspree parses them. */
  endpointUrl: 'https://formspree.io/f/xeaqvngq',

  /** Extra fields merged into the submitted payload (e.g. Web3Forms access_key). */
  extraFields: {} as Record<string, string>,

  /** Options for the "Project type" select. */
  projectTypes: [
    'Video Editing',
    'Videography',
    'Motion Graphics',
    'Color Grading',
    'Social Media Content',
    'Other',
  ],
}

export default contactFormConfig