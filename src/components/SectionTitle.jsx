/**
 * Consistent section heading used by every band on every page:
 * optional eyebrow label, an H2, supporting copy and an optional action link.
 */
export function SectionTitle({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'light',
  action = null,
  className = '',
  as: Heading = 'h2',
  size = 'md',
}) {
  const isDark = tone === 'dark'
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left'
  const titleSize =
    size === 'lg'
      ? 'text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08]'
      : 'text-2xl sm:text-3xl lg:text-[2.1rem] lg:leading-tight'

  return (
    <div
      className={`flex flex-col gap-6 ${align === 'center' ? '' : 'sm:flex-row sm:items-end sm:justify-between'} ${className}`}
    >
      <div className={`flex max-w-2xl flex-col ${alignment}`}>
        {eyebrow ? (
          <span
            className={`mb-3 inline-flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.18em] ${
              isDark ? 'text-brand-300' : 'text-brand-600'
            }`}
          >
            <span className={`h-px w-6 ${isDark ? 'bg-brand-300/60' : 'bg-brand-500/60'}`} />
            {eyebrow}
          </span>
        ) : null}

        <Heading className={`${titleSize} ${isDark ? 'text-white' : 'text-ink-900'}`}>{title}</Heading>

        {description ? (
          <p className={`mt-3 text-[0.98rem] leading-relaxed ${isDark ? 'text-white/65' : 'text-ink-500'}`}>
            {description}
          </p>
        ) : null}
      </div>

      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}

export default SectionTitle
