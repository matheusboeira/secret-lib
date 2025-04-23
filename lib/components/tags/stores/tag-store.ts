import type { UseDisclosureReturn } from '@/lib/hooks'
import type { TagRefs } from '../hooks/use-refs'
import { createStore } from '@/lib/core/stores/create-store'

export type TagState<T> = {
  items: T[]
  selectedItems: T[]
  filteredItems: T[]
  search: string
  disclosure: UseDisclosureReturn | null
  refs: TagRefs | null
  onTrashItem: (item: T) => void
}

export function createTagStore<T>() {
  return createStore<TagState<T>>({
    items: [],
    selectedItems: [],
    filteredItems: [],
    search: '',
    disclosure: null,
    refs: null,
    onTrashItem: () => {}
  })
}
