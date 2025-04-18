import { useEffect, useState } from 'react'
import { createStore } from '../create-store'

export type StoreMethods<TState> = {
  get: () => TState
  subscribe: (cb: (s: TState) => void) => () => void
}

export function useGlobalStore<T, TState>(
  selector: (state: TState) => T,
  store: StoreMethods<TState>
): T {
  const [selectedState, setSelectedState] = useState(() =>
    selector(store.get())
  )

  useEffect(() => {
    const callback = (newState: TState) => {
      const nextSelected = selector(newState)

      setSelectedState((prev) =>
        Object.is(prev, nextSelected) ? prev : nextSelected
      )
    }

    return store.subscribe(callback)
  }, [selector, store.subscribe])

  return selectedState
}

type Tests<T> = {
  items: T[]
  onTest: (item: T) => void
}

export const useTest = <T>() => {
  // levando em consideração que isso aqui vai vir de um provider (context)!
  const [store] = useState(() =>
    createStore<Tests<T>>({ items: [], onTest: (item) => {} })
  )

  const [items, onTest] = useGlobalStore(
    (state) => [state.items, state.onTest /** any state here */],
    store
  )

  // tipo deve ser T[]
  console.log('🔄 items', items)

  // tipo deve ser (item: T) => void
  console.log('🔄 onTest', onTest)
}

const useTagsContext = <T>() => {}
