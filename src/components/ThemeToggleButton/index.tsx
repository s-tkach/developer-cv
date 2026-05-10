'use client'

import { Monitor, Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { useTheme } from '@/providers/Theme'

export function ThemeToggleButton() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  function handleClick() {
    if (theme === 'dark') setTheme('light')
    else if (theme === 'light') setTheme(null)
    else setTheme('dark')
  }

  return (
    <Button aria-label="Toggle theme" onClick={handleClick} size="icon" type="button" variant="ghost">
      {!mounted || theme === undefined ? (
        <Monitor className="size-4" />
      ) : theme === 'dark' ? (
        <Moon className="size-4" />
      ) : theme === 'light' ? (
        <Sun className="size-4" />
      ) : (
        <Monitor className="size-4" />
      )}
    </Button>
  )
}
