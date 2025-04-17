import { useEffect, useState } from 'react'

type Listener<T> = (state: T) => void

export const createStore = <TState>(initialState: TState) => {
  let state = initialState
  const listeners = new Set<Listener<TState>>()

  const get = () => {
    return state
  }

  const set = (partial: Partial<TState>) => {
    state = { ...state, ...partial }
    for (const listener of listeners) listener(state)
  }

  const subscribe = (listener: Listener<TState>) => {
    listeners.add(listener)

    return () => {
      listeners.delete(listener)
    }
  }

  return { get, set, subscribe }
}

export function useGlobalStore<T, TState>(
  selector: (state: TState) => T,
  store: {
    get: () => TState
    subscribe: (cb: (s: TState) => void) => () => void
  }
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
