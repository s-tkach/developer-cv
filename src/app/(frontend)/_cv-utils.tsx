import { Badge } from '@/components/ui/badge'

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
