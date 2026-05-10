import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Media } from '@/components/Media'
import { BadgeList } from './_cv-utils'
import type { Locale } from '@/i18n/routing'

type LinkItem = { label?: string | null; url?: string | null }

type ProjectData = {
  id: string | number
  title?: string | null
  description?: string | null
  featured?: boolean | null
  links?: LinkItem[] | null
  stack?: { name?: string | null }[] | null
  image?: { url?: string | null } | null
  startDate?: string | null
  endDate?: string | null
  roleLabel?: string | null
  highlights?: { text?: string | null }[] | null
}

type ProjectsSectionProps = {
  projects: ProjectData[]
  locale: Locale
  heading: string
  featuredLabel: string
  emptyMessage: string
}

export function ProjectsSection({
  projects,
  locale,
  heading,
  featuredLabel,
  emptyMessage,
}: ProjectsSectionProps) {
  return (
    <section className="container py-12" id="projects">
      <h2 className="mb-6 text-3xl font-semibold tracking-tight">
        <a href="#projects" className="hover:underline underline-offset-4 decoration-muted-foreground/50">{heading}</a>
      </h2>
      <hr className="mb-8 border-border" />
      {projects.length === 0 ? (
        <p className="text-sm text-muted-foreground">{emptyMessage}</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <Card className="overflow-hidden" key={project.id}>
              {project.image ? (
                <div className="h-44 overflow-hidden bg-muted">
                  <Media
                    resource={project.image as Parameters<typeof Media>[0]['resource']}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-44 bg-muted" />
              )}
              <CardHeader>
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    {project.roleLabel && (
                      <p className="font-mono text-xs text-muted-foreground mb-1">
                        {project.roleLabel}
                      </p>
                    )}
                    <CardTitle>{project.title}</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    {project.featured && (
                      <span className="rounded-full border px-2 py-0.5 font-mono text-xs"
                        style={{
                          backgroundColor: 'color-mix(in oklch, var(--cv-accent-blue) 15%, transparent)',
                          color: 'var(--cv-accent-blue)',
                          borderColor: 'color-mix(in oklch, var(--cv-accent-blue) 40%, transparent)',
                        }}
                      >
                        {featuredLabel}
                      </span>
                    )}
                    {(project.startDate || project.endDate) && (
                      <span className="font-mono text-xs text-muted-foreground">
                        {formatDateRange(project, locale)}
                      </span>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {project.description && (
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                )}
                {project.highlights && project.highlights.length > 0 && (
                  <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                    {project.highlights.map((h) =>
                      h.text ? <li key={h.text}>{h.text}</li> : null,
                    )}
                  </ul>
                )}
                <BadgeList items={project.stack?.map((item) => item.name)} />
                {project.links && project.links.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.links.map((link) =>
                      link.url ? (
                        <Button asChild key={link.url} size="sm" variant="outline">
                          <a href={link.url} rel="noreferrer" target="_blank">
                            {link.label}
                          </a>
                        </Button>
                      ) : null,
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  )
}

function formatDateRange(
  value: { startDate?: string | null; endDate?: string | null },
  locale: string,
) {
  const start = value.startDate ? formatDate(value.startDate, locale) : ''
  const end = value.endDate ? formatDate(value.endDate, locale) : ''
  return [start, end].filter(Boolean).join(' - ')
}

function formatDate(value: string, locale: string) {
  return new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric' }).format(
    new Date(value),
  )
}
