/**
 * Tiny className joiner — filters falsy values and joins with a space.
 * Useful for conditionally composing Tailwind classes.
 */
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(' ')
}

export default cn