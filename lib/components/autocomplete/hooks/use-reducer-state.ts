import { isEqual } from '@/lib/core/utils/is-equal'
import { useMemo, useReducer } from 'react'
import type { ReducerHandlers, ReducerState } from '../@types/reducer.types'
import { createReducerState } from './helpers'
import { useSyncStates } from './use-sync-states'

const initialState = <T>(
  defaultValues?: Partial<ReducerState<T>>
): ReducerState<T> => ({
  search: '',
  items: [],
  selectedItems: [],
  ...defaultValues
})

export const useReducerState = <T>(
  defaultValues?: Partial<ReducerState<T>>,
  handlers?: Pick<ReducerHandlers<T>, 'onSelectionChange'>
) => {
  const reducerInitialState = useMemo(
    () =>
      createReducerState<T>({
        cacheItems: defaultValues?.items
      }),
    [defaultValues?.items]
  )

  const [state, dispatch] = useReducer(
    reducerInitialState,
    defaultValues,
    initialState<T>
  )

  const onSearch = (value: string) => {
    dispatch({ type: 'ON_SEARCH', payload: value })
  }

  const onBackspace = () => {
    dispatch({ type: 'ON_BACKSPACE' })
  }

  const onClearItems = () => {
    dispatch({ type: 'ON_CLEAR' })
  }

  const onSelectItem = (item: T) => {
    dispatch({ type: 'ON_SELECT_ITEM', payload: item })
  }

  const onAddItem = async (item: T) => {
    dispatch({ type: 'ON_ADD_ITEM', payload: item })
  }

  const onFindItem = (item: T) => {
    return state.items?.find((i) => isEqual(i, item))
  }

  const onUpdateItem = (oldValue: T, newValue: T) => {
    dispatch({ type: 'ON_UPDATE_ITEM', payload: { oldValue, newValue } })
  }

  const onTrashItem = (item: T) => {
    dispatch({ type: 'ON_TRASH_ITEM', payload: item })
  }

  useSyncStates({
    externalState: defaultValues?.selectedItems ?? [],
    internalState: state.selectedItems ?? [],
    onExternalChange: (externalSelectedItems) => {
      queueMicrotask(() =>
        dispatch({
          type: 'SYNC_SELECTED_ITEMS',
          payload: externalSelectedItems
        })
      )
    },
    onInternalChange: (internalSelectedItems) => {
      queueMicrotask(() => handlers?.onSelectionChange?.(internalSelectedItems))
    }
  })

  return {
    search: state.search,
    items: state.items,
    selectedItems: state.selectedItems,
    dispatch,
    onBackspace,
    onClearItems,
    onSearch,
    onSelectItem,
    onAddItem,
    onFindItem,
    onUpdateItem,
    onTrashItem
  }
}
