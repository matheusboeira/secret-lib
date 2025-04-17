export type HandlerType<S, A extends { type: string }> = {
  [K in A['type']]?: (state: S, action: Extract<A, { type: K }>) => S
}

export type ReducerState<T> = {
  search?: string
  selectedItems?: T[]
}

export type ReducerActions<T> =
  | { type: 'ON_BACKSPACE' }
  | { type: 'ON_CLEAR' }
  | { type: 'ON_SEARCH'; payload: string }
  | { type: 'ON_SELECT_ITEM'; payload: T }
