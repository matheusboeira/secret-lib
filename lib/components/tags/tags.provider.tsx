import { createStore } from '@/lib/core/stores/create-store'
import { useDisclosure } from '@/lib/hooks'
import { useClickOutside } from '@/lib/hooks/use-click-outside'
import { useEffect, useRef, useState } from 'react'
import type { TagContextProps, TagProviderProps } from './@types'
import { TagContext } from './context/tags.context'
import { useFilteredItems } from './hooks/use-filtered-items'
import { useReducerState } from './hooks/use-reducer-state'
import { useTagRefs } from './hooks/use-refs'

export function TagProvider<T>({
  items,
  selectedItems,
  allowCustomValues,
  children,
  onSelectionChange
}: TagProviderProps<T>) {
  const state = useReducerState<T>({
    search: '',
    items,
    selectedItems,
    onSelectionChange
  })
  const disclosure = useDisclosure()
  const refs = useTagRefs()
  const search = state.search?.toLowerCase().trim()
  const filteredItems = useFilteredItems(state.items, search)
  const render = useRef(0)
  render.current++

  useClickOutside({
    ref: refs.inputWrapperRef,
    handler: disclosure.onOpenChange,
    isEnabled: disclosure.isOpen
  })

  const [store] = useState(() =>
    createStore<TagContextProps<T>>({
      disclosure,
      refs,
      filteredItems,
      allowCustomValues,
      onTrashItem: (() => {}) as any,
      ...state
    })
  )

  useEffect(() => {
    store.set({
      items: state.items,
      selectedItems: state.selectedItems,
      disclosure,
      filteredItems
    })
  }, [state.items, state.selectedItems, store.set, disclosure, filteredItems])

  return (
    <TagContext.Provider value={store}>
      {children}
      {render.current}
    </TagContext.Provider>
  )
}

TagProvider.displayName = 'SecretLib.TagProvider'
