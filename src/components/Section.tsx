import type { ReactNode } from 'react'

interface SectionProps {
  id?: string
  children: ReactNode
  className?: string
  as?: 'section' | 'article'
  'aria-labelledby'?: string
}

/**
 * Uniform content container for consistent horizontal + vertical spacing
 * across pages. Keeps prose width readable and framing editorial.
 */
export default function Section({
  id,
  children,
  className = '',
  as: Tag = 'section',
  ...ariaProps
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={`mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20 ${className}`}
      {...ariaProps}
    >
      {children}
    </Tag>
  )
}
