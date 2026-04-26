import { cn } from '@/utilities/ui'
import * as SeparatorPrimitive from '@radix-ui/react-separator'
import * as React from 'react'

const Separator: React.FC<React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>> = ({
  className,
  decorative = true,
  orientation = 'horizontal',
  ...props
}) => {
  return (
    <SeparatorPrimitive.Root
      className={cn(
        'shrink-0 bg-border',
        orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
        className,
      )}
      decorative={decorative}
      orientation={orientation}
      {...props}
    />
  )
}

export { Separator }
