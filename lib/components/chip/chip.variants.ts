import { createVariants } from '@/lib/core/utils/create-variants'

export const chip = createVariants({
  base: ['flex items-center gap-1 px-2 py-0.5 rounded-lg bg-[#eee] text-black'],
  icon: [
    'ml-0.5 bg-black/20 rounded-full p-0.5',
    'outline-none focus-visible:outline-blue-600'
  ]
})
