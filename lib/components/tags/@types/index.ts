import type { UseDisclosureReturn } from '@/lib/hooks'
import type { TagRefs } from '../hooks/use-refs'

declare module 'react' {
  function forwardRef<T, P>(
    render: (props: P, ref: React.Ref<T>) => React.ReactNode | null
  ): (props: P & React.RefAttributes<T>) => React.ReactNode | null
}

type TagContextInnerHandlers<T> = {
  onBackspace: () => void
  onClearItems: () => void
  onTrashItem: (item: T) => void
  onSearch: (value: string) => void
  onSelectItem: (item: T) => void
  onAddItem: (item: T) => void
  onFindItem: (item: T) => T | undefined
  onUpdateItem: (item: T) => void
}

type TagContextOuterHandlers<T> = {
  onSelectionChange?: (items: T[]) => void
}

export type TagContextProps<T> = TagContextInnerHandlers<T> &
  TagContextOuterHandlers<T> & {
    items: T[]
    selectedItems?: T[]
    filteredItems?: T[]
    refs: TagRefs
    disclosure: UseDisclosureReturn
    search: string
    allowCustomValues?: boolean | ((item: string) => T)
  }

export type TagProviderProps<T> = Pick<
  TagContextProps<T>,
  'items' | 'selectedItems' | 'allowCustomValues' | 'onSelectionChange'
> & {
  children: React.ReactNode
}

export type TagSearchHandlers = {
  onBlur?: () => void
  onFocus?: () => void
}

export type SelectedItemHandlers = {
  onClearItem: () => void
  onUpdateItem: () => void
}

export type SelectedItemsProps<T> = {
  search: React.ReactNode
  children: (item: T) => React.ReactNode
  renderValue?: (item: T, handlers?: SelectedItemHandlers) => React.ReactNode
}

export type TagsProps<T> = Omit<SelectedItemsProps<T>, 'search'> &
  TagSearchHandlers &
  Pick<
    TagContextProps<T>,
    'items' | 'selectedItems' | 'allowCustomValues' | 'onSelectionChange'
  >
