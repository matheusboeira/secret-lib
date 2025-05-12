import { useSyncExternalStore } from 'react'

export type Listener<T> = (state: T) => void

export type StoreMethods<TState> = {
  get: () => TState
  subscribe: (cb: (s: TState) => void) => () => void
}

export function useGlobalStore<T, TState>(
  selector: (state: TState) => T,
  store: StoreMethods<TState>
): T {
  return useSyncExternalStore(store.subscribe, () => selector(store.get()))
}
