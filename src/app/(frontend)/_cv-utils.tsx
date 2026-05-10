import { Badge } from '@/components/ui/badge'

export function SectionLabel({ label }: { label: string }) {
  return (
    <p className="mb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
  )
}

export function BadgeList({ items }: { items?: (string | null | undefined)[] }) {
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
