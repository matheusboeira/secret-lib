import { createVariants } from '@/lib/core/utils/create-variants'

export const chip = createVariants({
  base: [
    'flex items-center gap-1 pl-2 pr-1.5 py-0.5 rounded-lg dark:bg-[#eee] dark:text-black',
    'bg-zinc-700 text-white'
  ],
  icon: [
    'ml-0.5 bg-white/30 dark:bg-black/20 rounded-full p-0.5',
    'outline-none focus-visible:outline-blue-600'
  ]
})
