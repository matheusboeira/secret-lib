import type { UseDisclosureReturn } from '@/lib/hooks'
import type { TagRefs } from '../hooks/use-refs'

type TagContextHandlers<T> = {
  onBackspace: () => void
  onClear: () => void
  onTrashItem: (item: T) => T
  onSearch: (value: string) => void
  onSelectItem: (item: T) => void
  onAddItem: (item: T) => void
}

export type TagContextProps<T> = TagContextHandlers<T> & {
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
  'items' | 'selectedItems' | 'allowCustomValues'
> & {
  children: React.ReactNode
}
