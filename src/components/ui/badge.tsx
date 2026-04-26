import { cn } from '@/utilities/ui'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground',
        outline: 'text-foreground',
        secondary: 'border-transparent bg-secondary text-secondary-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge: React.FC<BadgeProps> = ({ className, variant, ...props }) => {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
