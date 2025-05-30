import { createVariants } from '@/lib/core/utils/create-variants'

export const autocomplete = createVariants({
  baseWrapper: [
    'group/base-wrapper relative rounded-xl px-1.5 py-1',
    'grid grid-cols-[1fr_auto] items-center justify-between gap-1',
    'bg-zinc-100 hover:bg-gray-300/40',
    'dark:bg-zinc-900 dark:hover:bg-zinc-800/70',
    'min-h-10 cursor-pointer cursor-text',
    'border border-zinc-500/5 dark:border-zinc-100/5'
  ],
  label: [
    'z-10 w-fit',
    'data-[required=true]:after:w-full data-[required=true]:after:pl-0.5',
    'data-[required=true]:after:content-["*"]',
    'data-[required=true]:after:text-red-500'
  ],
  input: [
    'text-sm font-normal h-7 p-2 min-w-52 w-fit',
    'bg-transparent outline-none focus:outline-none'
  ],
  selectedItemsWrapper: ['flex items-center gap-1 flex-wrap'],
  buttonItem: [
    'flex justify-between w-full items-center gap-2 px-3 py-0.5 rounded-lg min-h-9 h-fit',
    'bg-transparent text-black dark:text-white z-40',
    'hover:bg-zinc-200 dark:hover:bg-zinc-800/70 transition-colors duration-100',
    'outline-none outline-offset-2 focus-visible:outline-blue-500',
    'focus-visible:bg-zinc-200 focus-visible:dark:bg-zinc-800/70'
  ],
  menuItemsWrapper: [
    'flex flex-col gap-1 items-start p-2 w-full z-40 max-h-64 lg:max-h-80',
    'absolute left-0 right-0 rounded-xl shadow-lg',
    'border border-zinc-100/10 dark:border-zinc-100/10',
    'bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white',
    'overflow-y-auto transition-all duration-200 ease-in-out',
    'opacity-0 -translate-y-2 pointer-events-none',
    'top-full mt-2 pt-2 scrollbar-hide'
  ],
  emptyContentWrapper: ['p-2 text-sm'],
  descriptionWrapper: ['px-1 text-sm text-zinc-500 dark:text-zinc-400'],
  checkedIcon: [
    'size-4 pointer-events-none',
    'opacity-0 scale-75 transition-all duration-200 ease-in-out'
  ],
  clearAndOpenButton: [
    'p-2 rounded-full z-20',
    'outline-none outline-offset-1 focus-visible:outline-blue-500',
    'hover:bg-zinc-200 dark:hover:bg-zinc-800/70'
  ]
})
