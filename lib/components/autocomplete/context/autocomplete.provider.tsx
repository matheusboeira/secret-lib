import { createStore } from '@/lib/core/stores/create-store'
import { useDisclosure } from '@/lib/hooks'
import { useClickOutside } from '@/lib/hooks/use-click-outside'
import { useEffect, useId, useState } from 'react'
import type {
  AutocompleteContextProps,
  AutocompleteProviderProps
} from '../@types'
import { useFilteredItems } from '../hooks/use-filtered-items'
import { useReducerState } from '../hooks/use-reducer-state'
import { useAutocompleteRefs } from '../hooks/use-refs'
import { AutocompleteContext } from './autocomplete.context'

export function AutocompleteProvider<T>({
  items,
  selectedItems,
  allowCustomValues,
  children,
  onSelectionChange
}: AutocompleteProviderProps<T>) {
  const state = useReducerState<T>(
    { items, selectedItems },
    { onSelectionChange }
  )
  const disclosure = useDisclosure()
  const refs = useAutocompleteRefs()
  const search = state.search?.toLowerCase().trim()
  const filteredItems = useFilteredItems(state.items, search)
  const autocompleteId = useId()

  useClickOutside({
    ref: refs.inputWrapperRef,
    handler: () => {
      disclosure.onOpenChange()
      refs.inputRef.current?.focus()
    },
    isEnabled: disclosure.isOpen
  })

  const [store] = useState(() =>
    createStore<AutocompleteContextProps<T>>({
      disclosure,
      refs,
      filteredItems,
      allowCustomValues,
      autocompleteId,
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
    <AutocompleteContext.Provider value={store}>
      {children}
    </AutocompleteContext.Provider>
  )
}

AutocompleteProvider.displayName = 'SecretLib.AutocompleteProvider'
