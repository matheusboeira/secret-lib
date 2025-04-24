import type { StoreMethods } from '@/lib/core/stores/hooks/use-global-store'
import { useGlobalStore } from '@/lib/core/stores/hooks/use-global-store'
import { useContext } from 'react'
import type { AutocompleteContextProps } from '../@types'
import { AutocompleteContext } from '../context/autocomplete.context'

export const useAutocompleteContext = <T>() => {
  const context = useContext(AutocompleteContext)

  if (!context) {
    throw new Error(
      'useAutocompleteContext must be used within a AutocompleteProvider'
    )
  }

  return context as StoreMethods<AutocompleteContextProps<T>>
}

export const useAutocompleteStore = <T, R>(
  selector: (state: AutocompleteContextProps<T>) => R
): R => {
  const store = useAutocompleteContext<T>()
  return useGlobalStore(selector, store)
}
