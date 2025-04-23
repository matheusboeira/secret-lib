type Listener<T> = (state: T) => void

export type CreateStoreReturn<T> = ReturnType<typeof createStore<T>>

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
    return () => listeners.delete(listener)
  }

  return { get, set, subscribe }
}
