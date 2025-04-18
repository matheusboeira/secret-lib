import { createVariants } from '@/lib/core/utils/create-variants'

export const tags = createVariants({
  inputWrapper: [
    'group/tag-wrapper relative px-1.5 py-1 rounded-xl',
    'grid grid-cols-[1fr_auto] items-center justify-between gap-1',
    'cursor-text',
    'bg-zinc-500 hover:bg-gray-200',
    'dark:bg-zinc-900 dark:hover:bg-zinc-800',
    'min-h-10 cursor-pointer'
  ],
  input: [
    'flex flex-1 text-sm font-normal h-7 p-2 min-w-32 w-full',
    'bg-transparent outline-none focus:outline-none'
  ],
  listItems: [
    'flex flex-col gap-1 items-start p-2 py-2 w-full z-40 max-h-72 lg:max-h-96',
    'absolute left-0 right-0 rounded-xl shadow-lg',
    'border border-zinc-100/10 dark:border-zinc-100/10',
    'bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white',
    'overflow-y-auto transition-all duration-200 ease-in-out',
    'opacity-0 -translate-y-2 pointer-events-none',
    'top-full mt-2 pt-2 scrollbar-hide'
  ],
  selectedItems: ['flex flex-wrap items-center gap-1'],
  tagItem: [
    'flex w-full items-center gap-2 px-3 py-0.5 rounded-lg min-h-9 h-fit',
    'bg-transparent text-black dark:text-white',
    'hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors duration-200',
    'outline-primary outline-offset-4 focus-visible:outline-primary'
  ],
  checkedIcon: [
    'size-4 transition-all duration-200 ease-in-out pointer-events-none',
    'opacity-0'
  ]
})
