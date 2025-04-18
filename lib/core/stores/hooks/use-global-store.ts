import { useEffect, useState } from 'react'

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
