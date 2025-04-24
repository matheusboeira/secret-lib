import type { UseDisclosureReturn } from '@/lib/hooks'
import type { AutocompleteRefs } from '../hooks/use-refs'
import { createStore } from '@/lib/core/stores/create-store'

export type AutocompleteState<T> = {
  items: T[]
  selectedItems: T[]
  filteredItems: T[]
  search: string
  disclosure: UseDisclosureReturn | null
  refs: AutocompleteRefs | null
  onTrashItem: (item: T) => void
}

export function createAutocompleteStore<T>() {
  return createStore<AutocompleteState<T>>({
    items: [],
    selectedItems: [],
    filteredItems: [],
    search: '',
    disclosure: null,
    refs: null,
    onTrashItem: () => {}
  })
}
