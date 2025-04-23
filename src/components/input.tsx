import { cn } from '@/utils/cn'
import type { ComponentProps } from 'react'

export const Input = ({ className, ...props }: ComponentProps<'input'>) => {
  return (
    <input
      className={cn(
        'bg-white dark:bg-black rounded-lg px-2',
        'border border-gray-500 dark:border-gray-100',
        'outline-offset-4 outline-blue-500 bg-red-900 w-32',
        className
      )}
      {...props}
    />
  )
}
