'use client'

import { ChevronDown } from 'lucide-react'
import { useId, useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { BadgeList } from './_cv-utils'

type ExperienceCardProps = {
  company?: string | null
  currentLabel: string
  defaultOpen?: boolean
  duration?: string | null
  endDate?: string | null
  endYear?: number | null
  highlights?: { text?: string | null }[] | null
  isCurrent?: boolean | null
  location?: string | null
  role?: string | null
  startDate?: string | null
  startYear?: number | null
  summary?: string | null
  technologies?: { name?: string | null }[] | null
  type?: string | null
}

const dotColors: Record<string, string> = {
  engineering: 'var(--cv-accent-amber)',
  leadership: 'var(--cv-accent-teal)',
  education: 'var(--cv-accent-purple)',
  certification: 'var(--cv-accent-green)',
}

export function ExperienceCard({
  company,
  currentLabel,
  defaultOpen = false,
  duration,
  endDate,
  endYear,
  highlights,
  isCurrent,
  location,
  role,
  startDate,
  startYear,
  summary,
  technologies,
  type,
}: ExperienceCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const contentId = useId()

  const endLabel = isCurrent ? currentLabel : endDate ?? ''
  const startLabel = startDate ?? ''

  const dotColor = type && dotColors[type] ? dotColors[type] : 'var(--cv-accent-amber)'

  // Intermediate years to show between end and start when expanded
  const midYears = getIntermediateYears(startYear, endYear, isCurrent)

  return (
    <div className="relative flex items-stretch">
      {/* Date column — 9rem wide, right edge aligns with the vertical timeline border */}
      <div className="w-36 shrink-0 hidden sm:flex flex-col items-end justify-between py-1">
        {/* End date + dot */}
        <div className="flex items-center">
          <span className="font-mono text-xs font-semibold text-foreground whitespace-nowrap pr-2">
            {endLabel}
          </span>
          <span
            className="size-3 rounded-full shrink-0 translate-x-1.5"
            style={{ backgroundColor: dotColor }}
          />
        </div>
        {/* Intermediate year labels (expanded only) — spread by parent justify-between */}
        {isOpen && midYears.map((year) => (
          <div key={year} className="flex items-center">
            <span className="font-mono text-[10px] text-muted-foreground/40 pr-2">{year}</span>
            <span className="size-2 rounded-full bg-border/60 shrink-0 translate-x-1" />
          </div>
        ))}
        {/* Start date + dot */}
        <div className="flex items-center">
          <span className="font-mono text-xs text-muted-foreground whitespace-nowrap pr-2">
            {startLabel}
          </span>
          <span
            className="size-3 rounded-full shrink-0 translate-x-1.5"
            style={{ backgroundColor: dotColor }}
          />
        </div>
      </div>

      {/* Gap between timeline line and card */}
      <div className="hidden sm:block w-4 shrink-0" />

      {/* Card */}
      <div className="flex-1 rounded-lg border border-border bg-card overflow-hidden">
        {/* Clickable header */}
        <button
          aria-controls={contentId}
          aria-expanded={isOpen}
          className="w-full text-left px-5 pt-5 pb-4 flex flex-wrap items-start justify-between gap-2 cursor-pointer hover:bg-muted/20 transition-colors"
          onClick={() => setIsOpen((c) => !c)}
          type="button"
        >
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold">{role}</span>
              <CategoryBadge type={type} />
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {[company, location].filter(Boolean).join(' · ')}
            </p>
            {/* Mobile date */}
            <p className="mt-1 font-mono text-xs text-muted-foreground sm:hidden">
              {[endLabel, startLabel].filter(Boolean).join(' – ')}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0 pt-0.5">
            {duration && (
              <span className="font-mono text-xs text-muted-foreground">{duration}</span>
            )}
            <ChevronDown
              className={`size-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`}
            />
          </div>
        </button>

        {/* Expandable content */}
        {isOpen && (
          <div className="px-5 pb-5 space-y-4 border-t border-dashed border-border" id={contentId}>
            <div className="pt-4 space-y-2">
              {summary && <p className="text-sm">{summary}</p>}
              {highlights && highlights.length > 0 && (
                <div className="space-y-1.5 text-sm text-muted-foreground">
                  {highlights.map((h) =>
                    h.text ? (
                      <p key={h.text}>
                        <span className="mr-1">—</span>
                        {h.text}
                      </p>
                    ) : null,
                  )}
                </div>
              )}
            </div>
            <BadgeList items={technologies?.map((item) => item.name)} />
          </div>
        )}
      </div>
    </div>
  )
}

function getIntermediateYears(
  startYear: number | null | undefined,
  endYear: number | null | undefined,
  isCurrent: boolean | null | undefined,
): number[] {
  if (!startYear) return []
  const end = isCurrent ? new Date().getFullYear() : (endYear ?? startYear)
  const years: number[] = []
  for (let y = end - 1; y > startYear; y--) {
    years.push(y)
  }
  return years
}

function CategoryBadge({ type }: { type?: string | null }) {
  if (!type || type === 'other') return <Badge variant="outline">{type ?? 'other'}</Badge>

  const styles: Record<string, React.CSSProperties> = {
    engineering: {
      backgroundColor: 'color-mix(in oklch, var(--cv-accent-amber) 15%, transparent)',
      color: 'var(--cv-accent-amber)',
      borderColor: 'color-mix(in oklch, var(--cv-accent-amber) 40%, transparent)',
    },
    leadership: {
      backgroundColor: 'color-mix(in oklch, var(--cv-accent-teal) 15%, transparent)',
      color: 'var(--cv-accent-teal)',
      borderColor: 'color-mix(in oklch, var(--cv-accent-teal) 40%, transparent)',
    },
    education: {
      backgroundColor: 'color-mix(in oklch, var(--cv-accent-purple) 15%, transparent)',
      color: 'var(--cv-accent-purple)',
      borderColor: 'color-mix(in oklch, var(--cv-accent-purple) 40%, transparent)',
    },
    certification: {
      backgroundColor: 'color-mix(in oklch, var(--cv-accent-green) 15%, transparent)',
      color: 'var(--cv-accent-green)',
      borderColor: 'color-mix(in oklch, var(--cv-accent-green) 40%, transparent)',
    },
  }

  const style = styles[type]
  if (!style) return <Badge variant="outline">{type}</Badge>

  return (
    <span
      className="inline-flex items-center rounded-full border px-2 py-0.5 font-mono text-xs uppercase tracking-wide"
      style={style}
    >
      {type}
    </span>
  )
}
