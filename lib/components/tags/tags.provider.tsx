import { useDisclosure } from '@/lib/hooks'
import type { TagProviderProps } from './@types'
import { TagsContext } from './context/tags.context'
import { useFilteredItems } from './hooks/use-filtered-items'
import { useReducerState } from './hooks/use-reducer-state'
import { useTagRefs } from './hooks/use-refs'

export const TagProvider = <T extends ArrayLike<object>>({
  items,
  selectedItems,
  children
}: TagProviderProps<T>) => {
  const state = useReducerState<T>({ selectedItems })
  const disclosure = useDisclosure()
  const refs = useTagRefs()
  const search = state.search?.toLowerCase().trim()
  const filteredItems = useFilteredItems(items, search)

  return (
    <TagsContext.Provider
      value={{
        items,
        filteredItems,
        refs,
        disclosure,
        onTrashItem: () => {},
        ...state
      }}
    >
      {children}
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </TagsContext.Provider>
  )
}
