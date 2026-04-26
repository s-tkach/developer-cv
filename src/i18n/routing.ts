import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  defaultLocale: 'en',
  localePrefix: 'always',
  locales: ['en', 'uk'],
})

export type Locale = (typeof routing.locales)[number]
