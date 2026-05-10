'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function LocaleSwitcher() {
  const pathname = usePathname()
  const isEn = pathname.startsWith('/en')

  return (
    <div className="flex items-center rounded-md border text-sm font-medium overflow-hidden">
      <Link
        href="/en"
        className={`px-2.5 py-1 transition-colors ${isEn ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
      >
        EN
      </Link>
      <Link
        href="/uk"
        className={`px-2.5 py-1 transition-colors ${!isEn ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
      >
        UK
      </Link>
    </div>
  )
}
