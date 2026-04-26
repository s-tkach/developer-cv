import type { Metadata } from 'next'

import configPromise from '@payload-config'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { getPayload } from 'payload'
import React from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import type { Locale } from '@/i18n/routing'

type LinkItem = {
  label?: string | null
  url?: string | null
}

type ProfileData = {
  name?: string | null
  headline?: string | null
  location?: string | null
  summary?: string | null
  email?: string | null
  links?: LinkItem[] | null
}

type ExperienceData = {
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
}

type ProjectData = {
  id: string | number
  title?: string | null
  description?: string | null
  featured?: boolean | null
  links?: LinkItem[] | null
  stack?: { name?: string | null }[] | null
}

type SkillData = {
  id: string | number
  category?: string | null
  items?: { name?: string | null; level?: string | null }[] | null
}

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

type CVData = {
  certifications: CertificationData[]
  education: EducationData[]
  experiences: ExperienceData[]
  profile: ProfileData | null
  projects: ProjectData[]
  skills: SkillData[]
}

const emptyData: CVData = {
  certifications: [],
  education: [],
  experiences: [],
  profile: null,
  projects: [],
  skills: [],
}

export async function generateCVMetadata(locale: Locale): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'metadata' })

  return {
    description: t('description'),
    title: t('title'),
  }
}

export async function CVPage({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'cv' })
  const nav = await getTranslations({ locale, namespace: 'nav' })
  const data = await getCVData(locale)

  const profile = data.profile
  const contactLinks = [
    ...(profile?.email ? [{ label: 'Email', url: `mailto:${profile.email}` }] : []),
    ...(profile?.links?.filter((link) => link?.label && link?.url) ?? []),
  ]

  return (
    <main className="bg-background" id="content">
      <section className="container py-16 md:py-24">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 text-sm">
          <a className="sr-only focus:not-sr-only" href="#experience">
            {nav('skipToContent')}
          </a>
          <div aria-label={nav('language')} className="flex gap-2">
            <Button asChild size="sm" variant={locale === 'en' ? 'default' : 'outline'}>
              <Link href="/en">{nav('english')}</Link>
            </Button>
            <Button asChild size="sm" variant={locale === 'uk' ? 'default' : 'outline'}>
              <Link href="/uk">{nav('ukrainian')}</Link>
            </Button>
          </div>
          <Button asChild size="sm" variant="secondary">
            <Link href="/admin">{t('adminCta')}</Link>
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
          <div>
            <Badge className="mb-6" variant="secondary">
              Payload CMS + Next.js
            </Badge>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
              {profile?.name || t('defaultName')}
            </h1>
            <p className="mt-4 max-w-3xl text-2xl text-muted-foreground">
              {profile?.headline || t('defaultHeadline')}
            </p>
            <p className="mt-6 max-w-3xl text-lg leading-8">
              {profile?.summary || t('defaultSummary')}
            </p>
            {profile?.location && <p className="mt-4 text-muted-foreground">{profile.location}</p>}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{t('contact')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {contactLinks.length > 0 ? (
                contactLinks.map((link) => (
                  <Button asChild className="w-full justify-start" key={link.url} variant="outline">
                    <a href={link.url ?? '#'} rel="noreferrer" target="_blank">
                      {link.label}
                    </a>
                  </Button>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">{t('empty')}</p>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      <section className="container grid gap-8 py-12 lg:grid-cols-[0.8fr_1.2fr]" id="experience">
        <SectionTitle title={t('experience')} />
        <div className="space-y-4">
          {data.experiences.length > 0 ? (
            data.experiences.map((experience) => (
              <Card key={experience.id}>
                <CardHeader>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <CardTitle>{experience.role}</CardTitle>
                      <p className="mt-1 text-muted-foreground">
                        {[experience.company, experience.location].filter(Boolean).join(' · ')}
                      </p>
                    </div>
                    <Badge variant="outline">{formatDateRange(experience, locale, t('current'))}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {experience.summary && <p>{experience.summary}</p>}
                  {experience.highlights && experience.highlights.length > 0 && (
                    <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                      {experience.highlights.map((highlight) =>
                        highlight.text ? <li key={highlight.text}>{highlight.text}</li> : null,
                      )}
                    </ul>
                  )}
                  <BadgeList items={experience.technologies?.map((item) => item.name)} />
                </CardContent>
              </Card>
            ))
          ) : (
            <EmptyCard message={t('empty')} />
          )}
        </div>
      </section>

      <Separator />

      <section className="container grid gap-8 py-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionTitle title={t('projects')} />
        <div className="grid gap-4 md:grid-cols-2">
          {data.projects.length > 0 ? (
            data.projects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <CardTitle>{project.title}</CardTitle>
                    {project.featured && <Badge>{t('featured')}</Badge>}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {project.description && <p className="text-muted-foreground">{project.description}</p>}
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
            ))
          ) : (
            <EmptyCard message={t('empty')} />
          )}
        </div>
      </section>

      <Separator />

      <section className="container grid gap-8 py-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionTitle title={t('skills')} />
        <div className="grid gap-4 md:grid-cols-2">
          {data.skills.length > 0 ? (
            data.skills.map((skill) => (
              <Card key={skill.id}>
                <CardHeader>
                  <CardTitle>{skill.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <BadgeList items={skill.items?.map((item) => item.name)} />
                </CardContent>
              </Card>
            ))
          ) : (
            <EmptyCard message={t('empty')} />
          )}
        </div>
      </section>

      <Separator />

      <section className="container grid gap-8 py-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionTitle title={t('education')} />
        <TimelineList
          items={data.education.map((item) => ({
            description: item.description,
            id: item.id,
            meta: [item.institution, item.location].filter(Boolean).join(' · '),
            title: item.degree,
            when: formatDateRange(item, locale, ''),
          }))}
          message={t('empty')}
        />
      </section>

      <Separator />

      <section className="container grid gap-8 py-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionTitle title={t('certifications')} />
        <TimelineList
          items={data.certifications.map((item) => ({
            id: item.id,
            meta: item.issuer,
            title: item.title,
            url: item.url,
            when: item.issuedAt ? formatDate(item.issuedAt, locale) : '',
          }))}
          message={t('empty')}
        />
      </section>
    </main>
  )
}

async function getCVData(locale: Locale): Promise<CVData> {
  try {
    const payload = await getPayload({ config: configPromise })
    const [profile, experiences, projects, skills, education, certifications] = await Promise.all([
      payload.findGlobal({ slug: 'profile', locale }),
      payload.find({ collection: 'experiences', limit: 100, locale, sort: '-startDate' }),
      payload.find({ collection: 'projects', limit: 100, locale, sort: 'sortOrder' }),
      payload.find({ collection: 'skills', limit: 100, locale, sort: 'sortOrder' }),
      payload.find({ collection: 'education', limit: 100, locale, sort: '-startDate' }),
      payload.find({ collection: 'certifications', limit: 100, locale, sort: '-issuedAt' }),
    ])

    return {
      certifications: certifications.docs,
      education: education.docs,
      experiences: experiences.docs,
      profile,
      projects: projects.docs,
      skills: skills.docs,
    }
  } catch (error) {
    console.error('Unable to load CV data from Payload', error)
    return emptyData
  }
}

function SectionTitle({ title }: { title: string }) {
  return <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
}

function EmptyCard({ message }: { message: string }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-sm text-muted-foreground">{message}</p>
      </CardContent>
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

function TimelineList({
  items,
  message,
}: {
  items: {
    description?: string | null
    id: string | number
    meta?: string | null
    title?: string | null
    url?: string | null
    when?: string | null
  }[]
  message: string
}) {
  if (items.length === 0) {
    return <EmptyCard message={message} />
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <Card key={item.id}>
          <CardHeader>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <CardTitle>
                  {item.url ? (
                    <a className="hover:underline" href={item.url} rel="noreferrer" target="_blank">
                      {item.title}
                    </a>
                  ) : (
                    item.title
                  )}
                </CardTitle>
                {item.meta && <p className="mt-1 text-muted-foreground">{item.meta}</p>}
              </div>
              {item.when && <Badge variant="outline">{item.when}</Badge>}
            </div>
          </CardHeader>
          {item.description && (
            <CardContent>
              <p className="text-muted-foreground">{item.description}</p>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  )
}

function formatDateRange(
  value: {
    endDate?: string | null
    isCurrent?: boolean | null
    startDate?: string | null
  },
  locale: Locale,
  currentLabel: string,
) {
  const start = value.startDate ? formatDate(value.startDate, locale) : ''
  const end = value.isCurrent ? currentLabel : value.endDate ? formatDate(value.endDate, locale) : ''

  return [start, end].filter(Boolean).join(' - ')
}

function formatDate(value: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale, {
    month: 'short',
    year: 'numeric',
  }).format(new Date(value))
}
