import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SectionLabel } from './_cv-utils'

const MAX_YEARS = 20

const LEVEL_FALLBACK: Record<string, number> = {
  core: 100,
  advanced: 70,
  familiar: 40,
}

type SkillItem = {
  name?: string | null
  level?: string | null
  years?: number | null
}

type SkillData = {
  id: string | number
  category?: string | null
  items?: SkillItem[] | null
}

type SkillsSectionProps = {
  skills: SkillData[]
  legendText: string
  sectionLabel: string
}

export function SkillsSection({ skills, legendText, sectionLabel }: SkillsSectionProps) {
  return (
    <section className="container py-12">
      <SectionLabel label={sectionLabel} />
      <h2 className="mb-6 text-3xl font-semibold tracking-tight">Skills</h2>
      {skills.length === 0 ? (
        <p className="text-sm text-muted-foreground">No skills added yet.</p>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            {skills.map((skill) => (
              <Card key={skill.id}>
                <CardHeader>
                  <CardTitle>{skill.category}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {skill.items?.map((item) => {
                    const pct =
                      item.years != null
                        ? Math.min(Math.round((item.years / MAX_YEARS) * 100), 100)
                        : LEVEL_FALLBACK[item.level ?? ''] ?? 40

                    return (
                      <div className="flex items-center gap-3" key={item.name}>
                        <span className="w-28 shrink-0 text-sm">{item.name}</span>
                        <div className="flex-1 overflow-hidden rounded-full bg-muted h-1.5">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${pct}%`,
                              backgroundColor: 'var(--cv-accent-blue)',
                            }}
                          />
                        </div>
                        {item.years != null && (
                          <span className="w-12 shrink-0 font-mono text-xs text-right text-muted-foreground">
                            {item.years} yr
                          </span>
                        )}
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">{legendText}</p>
        </>
      )}
    </section>
  )
}
