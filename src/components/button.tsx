import { cn } from '@/lib/core/utils/cn'
import type { ComponentProps } from 'react'

export const Button = ({ className, ...props }: ComponentProps<'button'>) => {
  return (
    <button
      type="button"
      className={cn(
        'border border-gray-200 w-max px-3 rounded-lg scale-100',
        'transition-transform hover:scale-[.97]',
        'outline-none focus-visible:outline-blue-500',
        className
      )}
      {...props}
    />
  )
}
