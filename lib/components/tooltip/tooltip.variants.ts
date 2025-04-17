import { createVariants } from '@/lib/utils/create-variants'

export const tooltip = createVariants({
  base: [
    'fixed pointer-events-none w-max h-fit z-50',
    'will-change-auto transition-all duration-200 ease-out transform',
    'motion-reduce:transition-none motion-reduce:hover:transform-none'
  ],
  content: [
    'bg-white dark:bg-black text-black dark:text-white py-1 px-2 rounded-lg',
    'border border-zinc-200 dark:border-zinc-600 shadow-sm'
  ]
})
