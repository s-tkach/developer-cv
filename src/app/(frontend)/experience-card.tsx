'use client'

import { ChevronDown } from 'lucide-react'
import { useId, useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BadgeList } from './_cv-utils'

type ExperienceCardProps = {
  company?: string | null
  dateRange: string
  defaultOpen?: boolean
  duration?: string | null
  highlights?: { text?: string | null }[] | null
  location?: string | null
  role?: string | null
  summary?: string | null
  technologies?: { name?: string | null }[] | null
  type?: string | null
}

export function ExperienceCard({
  company,
  dateRange,
  defaultOpen = false,
  duration,
  highlights,
  location,
  role,
  summary,
  technologies,
  type,
}: ExperienceCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const contentId = useId()

  return (
    <div className="relative flex gap-4">
      <span className="absolute -left-[calc(1rem+0.375rem)] top-2.5 size-3 rounded-full border-2 border-border bg-background" />
      <div className="w-24 shrink-0 text-right font-mono text-xs text-muted-foreground pt-2.5 hidden sm:block">
        {dateRange}
      </div>
      <div className="flex-1 rounded-lg border border-border bg-card p-5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold">{role}</span>
              <CategoryBadge type={type} />
              {duration && (
                <span className="font-mono text-xs text-muted-foreground">{duration}</span>
              )}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {[company, location].filter(Boolean).join(' · ')}
            </p>
            <p className="mt-1 font-mono text-xs text-muted-foreground sm:hidden">{dateRange}</p>
          </div>
          <Button
            aria-controls={contentId}
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Collapse experience details' : 'Expand experience details'}
            className="size-8 shrink-0"
            onClick={() => setIsOpen((current) => !current)}
            size="icon"
            type="button"
            variant="ghost"
          >
            <ChevronDown className={`size-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </Button>
        </div>
        {isOpen && (
          <div className="mt-4 space-y-4" id={contentId}>
            {summary && <p className="text-sm">{summary}</p>}
            {highlights && highlights.length > 0 && (
              <ul className="list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
                {highlights.map((h) => (h.text ? <li key={h.text}>{h.text}</li> : null))}
              </ul>
            )}
            <BadgeList items={technologies?.map((item) => item.name)} />
          </div>
        )}
      </div>
    </div>
  )
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
  }

  const style = styles[type]
  if (!style) return <Badge variant="outline">{type}</Badge>

  return (
    <span
      className="inline-flex items-center rounded-full border px-2 py-0.5 font-mono text-xs"
      style={style}
    >
      {type}
    </span>
  )
}
