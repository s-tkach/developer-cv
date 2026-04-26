'use client'

import { ChevronDown } from 'lucide-react'
import { useId, useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type ExperienceCardProps = {
  company?: string | null
  dateRange: string
  defaultOpen?: boolean
  highlights?: { text?: string | null }[] | null
  location?: string | null
  role?: string | null
  summary?: string | null
  technologies?: { name?: string | null }[] | null
}

export function ExperienceCard({
  company,
  dateRange,
  defaultOpen = false,
  highlights,
  location,
  role,
  summary,
  technologies,
}: ExperienceCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const contentId = useId()

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <CardTitle>{role}</CardTitle>
            <p className="mt-1 text-muted-foreground">{[company, location].filter(Boolean).join(' · ')}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">{dateRange}</Badge>
            <Button
              aria-controls={contentId}
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Collapse experience details' : 'Expand experience details'}
              className="size-8"
              onClick={() => setIsOpen((current) => !current)}
              size="icon"
              type="button"
              variant="ghost"
            >
              <ChevronDown className={`size-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </Button>
          </div>
        </div>
      </CardHeader>
      {isOpen && (
        <CardContent className="space-y-4" id={contentId}>
          {summary && <p>{summary}</p>}
          {highlights && highlights.length > 0 && (
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
              {highlights.map((highlight) => (highlight.text ? <li key={highlight.text}>{highlight.text}</li> : null))}
            </ul>
          )}
          <BadgeList items={technologies?.map((item) => item.name)} />
        </CardContent>
      )}
    </Card>
  )
}

function BadgeList({ items }: { items?: (string | null | undefined)[] }) {
  const filtered = items?.filter(Boolean) ?? []

  if (filtered.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2">
      {filtered.map((item) => (
        <Badge key={item} variant="secondary">
          {item}
        </Badge>
      ))}
    </div>
  )
}
