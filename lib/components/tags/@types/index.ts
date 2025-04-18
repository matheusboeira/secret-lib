import type { UseDisclosureReturn } from '@/lib/hooks'
import type { TagRefs } from '../hooks/use-refs'

declare module 'react' {
  function forwardRef<T, P>(
    render: (props: P, ref: React.Ref<T>) => React.ReactNode | null
  ): (props: P & React.RefAttributes<T>) => React.ReactNode | null
}

type TagContextInnerHandlers<T> = {
  onBackspace: () => void
  onClear: () => void
  onTrashItem: (item: T) => T
  onSearch: (value: string) => void
  onSelectItem: (item: T) => void
  onAddItem: (item: T) => void
}

type TagContextHandlers<T> = {
  onSelectionChange?: (items: T[]) => void
}

export type TagContextProps<T> = TagContextInnerHandlers<T> &
  TagContextHandlers<T> & {
    items: T[]
    selectedItems?: T[]
    filteredItems?: T[]
    refs: TagRefs
    disclosure: UseDisclosureReturn
    search: string
    allowCustomValues?: boolean | ((item: T) => T)
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

export type TagsProps<T> = TagContextHandlers<T> &
  Pick<TagContextProps<T>, 'items' | 'selectedItems' | 'allowCustomValues'> & {
    renderValue?: (item: T, handlers?: any) => React.ReactNode
    children: (item: T) => React.ReactNode
  }
