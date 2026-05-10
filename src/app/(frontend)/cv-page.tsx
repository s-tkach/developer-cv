import type { Metadata } from 'next'

import configPromise from '@payload-config'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { getPayload } from 'payload'
import React from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import type { Locale } from '@/i18n/routing'
import { BackgroundSection } from './background-section'
import { ExperienceSection } from './experience-section'
import { ProjectsSection } from './projects-section'
import { SkillsSection } from './skills-section'
import { SectionLabel } from './_cv-utils'

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
  stats?: { value?: string | null; label?: string | null }[] | null
  resume?: { url?: string | null } | null
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
  type?: string | null
}

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

type SkillData = {
  id: string | number
  category?: string | null
  items?: { name?: string | null; level?: string | null; years?: number | null }[] | null
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
  const contactLinks = profile?.links?.filter((link) => link?.label && link?.url) ?? []

  return (
    <main className="bg-background" id="content">
      {/* Hero */}
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

        <div className="grid gap-12 lg:grid-cols-[1fr_300px]">
          <div>
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              {profile?.name || t('defaultName')}
            </h1>
            <p className="mt-4 text-2xl text-muted-foreground">
              {profile?.headline || t('defaultHeadline')}
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-8">
              {profile?.summary || t('defaultSummary')}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {profile?.email && (
                <Button asChild>
                  <a href={`mailto:${profile.email}`}>{t('getInTouch')}</a>
                </Button>
              )}
              {contactLinks.map((link) => (
                <Button asChild key={link.url} variant="outline">
                  <a href={link.url ?? '#'} rel="noreferrer" target="_blank">
                    {link.label}
                  </a>
                </Button>
              ))}
            </div>
          </div>
          <HeroInfoCard stats={profile?.stats} />
        </div>

      </section>

      {/* Experience */}
      <div className="border-t border-border">
        <ExperienceSection
          experiences={data.experiences}
          locale={locale}
          strings={{
            all: t('filterAll'),
            engineering: t('filterEngineering'),
            leadership: t('filterLeadership'),
            education: t('filterEducation'),
            certification: t('filterCertification'),
            current: t('current'),
            sectionLabel: t('sectionCareer'),
            empty: t('empty'),
          }}
        />
      </div>

      {/* Skills */}
      <div className="border-t border-border">
        <SkillsSection
          skills={data.skills}
          legendText={t('skillsLegend')}
          sectionLabel={t('sectionStack')}
        />
      </div>

      {/* Projects */}
      <div className="border-t border-border">
        <ProjectsSection
          projects={data.projects}
          locale={locale}
          sectionLabel={t('sectionWork')}
          featuredLabel={t('featured')}
          emptyMessage={t('empty')}
        />
      </div>

      {/* Background */}
      <div className="border-t border-border">
        <BackgroundSection
          education={data.education}
          certifications={data.certifications}
          locale={locale}
          sectionLabel={t('sectionBackground')}
          educationTitle={t('education')}
          certificationsTitle={t('certifications')}
          emptyMessage={t('empty')}
        />
      </div>

      {/* Contact */}
      <div className="border-t border-border">
        <section className="container py-12">
          <SectionLabel label={t('sectionReachOut')} />
          <h2 className="mb-6 text-3xl font-semibold tracking-tight">{t('contact')}</h2>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {profile?.email && (
              <ContactCard label="Email" href={`mailto:${profile.email}`} />
            )}
            {contactLinks.map((link) => (
              <ContactCard key={link.url} label={link.label ?? ''} href={link.url ?? '#'} />
            ))}
          </div>
          {!profile?.email && contactLinks.length === 0 && (
            <p className="text-sm text-muted-foreground">{t('empty')}</p>
          )}
        </section>
      </div>
    </main>
  )
}

function HeroInfoCard({
  stats,
}: {
  stats?: { value?: string | null; label?: string | null }[] | null
}) {
  if (!stats || stats.length === 0) return null
  return (
    <Card>
      <CardContent className="pt-6 space-y-3">
        {stats.map((stat, i) => (
          <div className="flex items-center justify-between gap-2" key={i}>
            <span className="text-sm text-muted-foreground">{stat.label}</span>
            <span className="font-mono text-sm font-semibold">{stat.value}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function ContactCard({ label, href }: { label: string; href: string }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <a
          className="block text-sm font-medium hover:underline"
          href={href}
          rel="noreferrer"
          target="_blank"
        >
          {label}
        </a>
      </CardContent>
    </Card>
  )
}

async function getCVData(locale: Locale): Promise<CVData> {
  try {
    const payload = await getPayload({ config: configPromise })
    const [profile, experiences, projects, skills, education, certifications] = await Promise.all([
      payload.findGlobal({ slug: 'profile', locale, depth: 1 }),
      payload.find({ collection: 'experiences', limit: 100, locale, sort: '-startDate' }),
      payload.find({ collection: 'projects', limit: 100, locale, sort: 'sortOrder', depth: 1 }),
      payload.find({ collection: 'skills', limit: 100, locale, sort: 'sortOrder' }),
      payload.find({ collection: 'education', limit: 100, locale, sort: '-startDate' }),
      payload.find({ collection: 'certifications', limit: 100, locale, sort: '-issuedAt' }),
    ])

    return {
      certifications: certifications.docs,
      education: education.docs,
      experiences: experiences.docs,
      profile: profile as unknown as ProfileData,
      projects: projects.docs as unknown as ProjectData[],
      skills: skills.docs,
    }
  } catch (error) {
    console.error('Unable to load CV data from Payload', error)
    return emptyData
  }
}
