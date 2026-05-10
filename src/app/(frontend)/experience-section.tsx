'use client'

import { useState } from 'react'

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

const FILTER_DOT_COLORS: Record<Exclude<FilterType, 'all'>, string> = {
  engineering: 'var(--cv-accent-amber)',
  leadership: 'var(--cv-accent-teal)',
  education: 'var(--cv-accent-purple)',
  certification: 'var(--cv-accent-green)',
}

export function ExperienceSection({ experiences, strings, locale }: ExperienceSectionProps) {
  const [active, setActive] = useState<FilterType>('all')

  const filtered =
    active === 'all' ? experiences : experiences.filter((e) => e.type === active)

  return (
    <section className="container py-12" id="experience">
      <SectionLabel label={strings.sectionLabel} />
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="text-3xl font-semibold tracking-tight">Experience</h2>
        <div className="flex flex-wrap gap-2">
          {FILTER_TYPES.map((f) => {
            const isActive = active === f
            if (f === 'all') {
              return (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  type="button"
                  className={`inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-foreground text-background border-foreground'
                      : 'bg-transparent text-muted-foreground border-border hover:border-foreground/40'
                  }`}
                >
                  {strings[f]}
                </button>
              )
            }
            const dotColor = FILTER_DOT_COLORS[f]
            return (
              <button
                key={f}
                onClick={() => setActive(f)}
                type="button"
                className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-foreground text-background border-foreground'
                    : 'bg-transparent text-muted-foreground border-border hover:border-foreground/40'
                }`}
              >
                <span
                  className="size-2 rounded-full shrink-0"
                  style={{ backgroundColor: isActive ? 'var(--background)' : dotColor }}
                />
                {strings[f]}
              </button>
            )
          })}
        </div>
      </div>
      <hr className="mb-8 border-border" />
      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground">{strings.empty}</p>
      ) : (
        <div className="relative space-y-6">
          {/* Vertical timeline line at right edge of date column (9rem) */}
          <div className="absolute top-0 bottom-0 hidden sm:block border-l border-border" style={{ left: '9rem' }} />
          {filtered.map((experience) => (
            <ExperienceCard
              company={experience.company}
              currentLabel={strings.current}
              defaultOpen={Boolean(experience.isCurrent)}
              duration={computeDuration(experience)}
              endDate={experience.endDate ? formatDate(experience.endDate, locale) : undefined}
              endYear={experience.endDate ? new Date(experience.endDate).getFullYear() : undefined}
              highlights={experience.highlights}
              isCurrent={experience.isCurrent}
              key={experience.id}
              location={experience.location}
              role={experience.role}
              startDate={experience.startDate ? formatDate(experience.startDate, locale) : undefined}
              startYear={experience.startDate ? new Date(experience.startDate).getFullYear() : undefined}
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
