export type ReducerState<T> = {
  search: string
  items: T[]
  selectedItems?: T[]
  onSelectionChange?: (items: T[]) => void
}

export type ReducerActions<T> =
  | { type: 'ON_BACKSPACE' }
  | { type: 'ON_CLEAR' }
  | { type: 'ON_SEARCH'; payload: string }
  | { type: 'ON_SELECT_ITEM'; payload: T }
  | { type: 'ON_ADD_ITEM'; payload: T }
  | { type: 'ON_SELECTION_CHANGE'; payload: T[] }
