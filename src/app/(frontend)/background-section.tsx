import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SectionLabel } from './_cv-utils'
import type { Locale } from '@/i18n/routing'

type EducationData = {
  id: string | number
  institution?: string | null
  degree?: string | null
  location?: string | null
  startDate?: string | null
  endDate?: string | null
  description?: string | null
}

type CertificationData = {
  id: string | number
  title?: string | null
  issuer?: string | null
  issuedAt?: string | null
  url?: string | null
}

type BackgroundSectionProps = {
  education: EducationData[]
  certifications: CertificationData[]
  locale: Locale
  sectionLabel: string
  educationTitle: string
  certificationsTitle: string
  emptyMessage: string
}

export function BackgroundSection({
  education,
  certifications,
  locale,
  sectionLabel,
  educationTitle,
  certificationsTitle,
  emptyMessage,
}: BackgroundSectionProps) {
  return (
    <section className="container py-12">
      <SectionLabel label={sectionLabel} />
      <h2 className="mb-6 text-3xl font-semibold tracking-tight">Background</h2>
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h3 className="mb-4 font-semibold text-lg">{educationTitle}</h3>
          {education.length === 0 ? (
            <p className="text-sm text-muted-foreground">{emptyMessage}</p>
          ) : (
            <div className="space-y-4">
              {education.map((item) => (
                <Card key={item.id}>
                  <CardHeader>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <CardTitle>{item.degree}</CardTitle>
                        {(item.institution || item.location) && (
                          <p className="mt-1 text-sm text-muted-foreground">
                            {[item.institution, item.location].filter(Boolean).join(' · ')}
                          </p>
                        )}
                      </div>
                      {(item.startDate || item.endDate) && (
                        <Badge variant="outline">{formatDateRange(item, locale)}</Badge>
                      )}
                    </div>
                  </CardHeader>
                  {item.description && (
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-lg">{certificationsTitle}</h3>
          {certifications.length === 0 ? (
            <p className="text-sm text-muted-foreground">{emptyMessage}</p>
          ) : (
            <div className="space-y-4">
              {certifications.map((item) => (
                <Card key={item.id}>
                  <CardHeader>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <CardTitle>
                          {item.url ? (
                            <a
                              className="hover:underline"
                              href={item.url}
                              rel="noreferrer"
                              target="_blank"
                            >
                              {item.title}
                            </a>
                          ) : (
                            item.title
                          )}
                        </CardTitle>
                        {item.issuer && (
                          <p className="mt-1 text-sm text-muted-foreground">{item.issuer}</p>
                        )}
                      </div>
                      {item.issuedAt && (
                        <Badge variant="outline">{formatDate(item.issuedAt, locale)}</Badge>
                      )}
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
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
