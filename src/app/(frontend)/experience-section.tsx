'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { ExperienceCard } from './experience-card'
import { SectionLabel } from './_cv-utils'

type Experience = {
  id: string | number
  company?: string | null
  role?: string | null
  location?: string | null
  startDate?: string | null
  endDate?: string | null
  isCurrent?: boolean | null
  summary?: string | null
  highlights?: { text?: string | null }[] | null
  technologies?: { name?: string | null }[] | null
  type?: string | null
}

type ExperienceSectionProps = {
  experiences: Experience[]
  strings: {
    all: string
    engineering: string
    leadership: string
    education: string
    certification: string
    current: string
    sectionLabel: string
    empty: string
  }
  locale: string
}

const FILTER_TYPES = ['all', 'engineering', 'leadership', 'education', 'certification'] as const
type FilterType = (typeof FILTER_TYPES)[number]

export function ExperienceSection({ experiences, strings, locale }: ExperienceSectionProps) {
  const [active, setActive] = useState<FilterType>('all')

  const filtered =
    active === 'all' ? experiences : experiences.filter((e) => e.type === active)

  return (
    <section className="container py-12" id="experience">
      <SectionLabel label={strings.sectionLabel} />
      <h2 className="mb-6 text-3xl font-semibold tracking-tight">Experience</h2>
      <div className="mb-6 flex flex-wrap gap-2">
        {FILTER_TYPES.map((f) => (
          <Button
            key={f}
            onClick={() => setActive(f)}
            size="sm"
            variant={active === f ? 'default' : 'outline'}
          >
            {strings[f]}
          </Button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground">{strings.empty}</p>
      ) : (
        <div className="relative border-l border-border pl-8 space-y-6">
          {filtered.map((experience) => (
            <ExperienceCard
              company={experience.company}
              dateRange={formatDateRange(experience, locale, strings.current)}
              defaultOpen={Boolean(experience.isCurrent)}
              duration={computeDuration(experience)}
              highlights={experience.highlights}
              key={experience.id}
              location={experience.location}
              role={experience.role}
              summary={experience.summary}
              technologies={experience.technologies}
              type={experience.type}
            />
          ))}
        </div>
      )}
    </section>
  )
}

function formatDateRange(
  value: { endDate?: string | null; isCurrent?: boolean | null; startDate?: string | null },
  locale: string,
  currentLabel: string,
) {
  const start = value.startDate ? formatDate(value.startDate, locale) : ''
  const end = value.isCurrent ? currentLabel : value.endDate ? formatDate(value.endDate, locale) : ''
  return [start, end].filter(Boolean).join(' - ')
}

function formatDate(value: string, locale: string) {
  return new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric' }).format(
    new Date(value),
  )
}

function computeDuration(value: {
  startDate?: string | null
  endDate?: string | null
  isCurrent?: boolean | null
}) {
  if (!value.startDate) return null
  const start = new Date(value.startDate)
  const end = value.isCurrent || !value.endDate ? new Date() : new Date(value.endDate)
  const months =
    (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
  if (months <= 0) return null
  const years = Math.floor(months / 12)
  const rem = months % 12
  if (years === 0) return `${rem} mo`
  if (rem === 0) return `${years} yr`
  return `${years} yr ${rem} mo`
}
