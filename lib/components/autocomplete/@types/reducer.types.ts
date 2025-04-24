import type { AutocompleteContextOuterHandlers, AutocompleteProps } from '.'

export type ReducerState<T> = Pick<
  AutocompleteProps<T>,
  'items' | 'selectedItems' | 'mode'
> & {
  search: string
}

export type ReducerActions<T> =
  | { type: 'ON_BACKSPACE' }
  | { type: 'ON_CLEAR' }
  | { type: 'ON_SEARCH'; payload: string }
  | { type: 'ON_SELECT_ITEM'; payload: T }
  | { type: 'ON_ADD_ITEM'; payload: T }
  | { type: 'ON_TRASH_ITEM'; payload: T }
  | { type: 'ON_UPDATE_ITEM'; payload: { oldValue: T; newValue: T } }
  | { type: 'SYNC_SELECTED_ITEMS'; payload: T[] }

export type InternalReducerState<T> = ReducerState<T>
export type ReducerHandlers<T> = AutocompleteContextOuterHandlers<T>
