import { createVariants } from '@/lib/core/utils/create-variants'

export const tags = createVariants({
  baseWrapper: [
    'group/base-wrapper relative rounded-xl px-1.5 py-1',
    'grid grid-cols-[1fr_auto] items-center justify-between gap-1',
    'bg-zinc-500 hover:bg-gray-200',
    'dark:bg-zinc-900 dark:hover:bg-zinc-800/70',
    'min-h-10 cursor-pointer cursor-text'
  ],
  input: [
    'text-sm font-normal h-7 p-2 min-w-52 w-fit',
    'bg-transparent outline-none focus:outline-none'
  ],
  selectedItemsWrapper: ['flex items-center gap-1 flex-wrap'],
  tagItem: [
    'flex w-full items-center gap-2 px-3 py-0.5 rounded-lg min-h-9 h-fit',
    'bg-transparent text-black dark:text-white z-40',
    'hover:bg-zinc-200 dark:hover:bg-zinc-800/70 transition-colors duration-200',
    'outline-none outline-offset-2',
    'focus-visible:outline-blue-500 focus-visible:bg-zinc-800/70'
  ],
  listItemsWrapper: [
    'flex flex-col gap-1 items-start p-2 py-2 w-full z-40 max-h-64 lg:max-h-80',
    'absolute left-0 right-0 rounded-xl shadow-lg',
    'border border-zinc-100/10 dark:border-zinc-100/10',
    'bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white',
    'overflow-y-auto transition-all duration-200 ease-in-out',
    'opacity-0 -translate-y-2 pointer-events-none',
    'top-full mt-2 pt-2 scrollbar-hide'
  ],
  checkedIcon: [
    'absolute top-1/2 -translate-y-1/2 right-2',
    'size-4 transition-all duration-200 ease-in-out pointer-events-none',
    'opacity-0 scale-75'
  ],
  actionButton: [
    'p-2 rounded-full z-20',
    'outline-none outline-offset-1 focus-visible:outline-blue-500',
    'dark:hover:bg-zinc-800/70'
  ]
})
