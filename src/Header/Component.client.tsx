'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { Button } from '@/components/ui/button'
import { ThemeToggleButton } from '@/components/ThemeToggleButton'
import { HeaderNav } from './Nav'
import { LocaleSwitcher } from './LocaleSwitcher'
import { SearchIcon, DownloadIcon } from 'lucide-react'

interface HeaderClientProps {
  data: Header | null
  resumeUrl: string | null
  resumeLabel: string
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, resumeUrl, resumeLabel }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  const handleSearchKeydown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        router.push('/search')
      }
    },
    [router],
  )

  useEffect(() => {
    document.addEventListener('keydown', handleSearchKeydown)
    return () => document.removeEventListener('keydown', handleSearchKeydown)
  }, [handleSearchKeydown])

  return (
    <header
      className="sticky top-0 z-20 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="container flex h-14 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Logo loading="eager" priority="high" className="invert dark:invert-0" />
        </Link>

        <HeaderNav data={data} />

        <div className="flex items-center gap-2">
          <LocaleSwitcher />

          <Button
            asChild
            variant="outline"
            size="sm"
            className="hidden sm:flex items-center gap-2 text-muted-foreground"
          >
            <Link href="/search">
              <SearchIcon className="size-4" />
              <span>Search</span>
              <kbd className="pointer-events-none ml-1 hidden select-none items-center gap-1 rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Link>
          </Button>

          <Button asChild variant="ghost" size="icon" className="sm:hidden">
            <Link href="/search" aria-label="Search">
              <SearchIcon className="size-4" />
            </Link>
          </Button>

          <ThemeToggleButton />

          {resumeUrl && (
            <Button asChild size="sm">
              <a href={resumeUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5">
                <DownloadIcon className="size-4" />
                {resumeLabel}
              </a>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
