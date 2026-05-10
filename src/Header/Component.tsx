import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { Media } from '@/payload-types'
import { getTranslations } from 'next-intl/server'
import React from 'react'

export async function Header() {
  const [headerData, profileData, t] = await Promise.all([
    getCachedGlobal('header', 1)(),
    getCachedGlobal('profile', 1)(),
    getTranslations('cv'),
  ])

  const resumeUrl = (profileData?.resume as Media | null | undefined)?.url ?? null

  return <HeaderClient data={headerData} resumeUrl={resumeUrl} resumeLabel={t('resume')} />
}
