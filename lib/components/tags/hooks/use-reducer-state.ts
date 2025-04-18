import { createReducer } from '@/lib/core/utils/create-reducer'
import { isEqual } from '@/lib/core/utils/is-equal'
import { useEffect, useReducer } from 'react'
import type { ReducerActions, ReducerState } from '../@types/reducer.types'

const findEqualItem = <T>(list: T[], item: T): T | undefined => {
  return list.find((i) => isEqual(i, item))
}

const addItem = <T>(list: T[], item: T): T[] => {
  return list.some((i) => isEqual(i, item)) ? list : [...list, item]
}

const toggleItem = <T>(list: T[], item: T): T[] => {
  return list.some((i) => isEqual(i, item))
    ? list.filter((i) => !isEqual(i, item))
    : [...list, item]
}

const removeLast = <T>(list: T[]): T[] => {
  return list.slice(0, list.length - 1)
}

const clearIfNotEmpty = <T>(list: T[]): T[] => {
  return list.length > 0 ? [] : list
}

const createReducerState = <T>() =>
  createReducer<ReducerState<T>, ReducerActions<T>>({
    ON_ADD_ITEM: (state, action) => {
      const item = findEqualItem(state.items, action.payload) ?? action.payload
      const updatedItems = addItem(state.items, item)
      const updatedSelectedItems = toggleItem(state.selectedItems ?? [], item)

      return {
        ...state,
        items: updatedItems,
        selectedItems: updatedSelectedItems
      }
    },
    ON_SELECT_ITEM: (state, action) => {
      const item = findEqualItem(state.items, action.payload)
      if (!item) return state

      const updatedSelectedItems = toggleItem(state.selectedItems ?? [], item)

      return {
        ...state,
        selectedItems: updatedSelectedItems
      }
    },
    ON_SEARCH: (state, action) => {
      return isEqual(state.search, action.payload)
        ? state
        : { ...state, search: action.payload }
    },
    ON_BACKSPACE: (state) => {
      const selectedItems = state.selectedItems ?? []
      if (selectedItems.length === 0) return state

      return {
        ...state,
        selectedItems: removeLast(selectedItems)
      }
    },
    ON_CLEAR: (state) => {
      const selectedItems = state.selectedItems ?? []
      const cleared = clearIfNotEmpty(selectedItems)
      if (cleared === selectedItems) return state

      return {
        ...state,
        selectedItems: cleared
      }
    }
  })

const initialState = <T>(defaultValues?: ReducerState<T>): ReducerState<T> => ({
  search: '',
  items: [],
  selectedItems: [],
  onSelectionChange: () => {},
  ...defaultValues
})

export const useReducerState = <T>(defaultValues?: ReducerState<T>) => {
  const [state, dispatch] = useReducer(
    createReducerState<T>(),
    initialState<T>(defaultValues)
  )

  useEffect(() => {
    state.onSelectionChange?.(state.selectedItems ?? [])
  }, [state.selectedItems, state.onSelectionChange])

  const onSearch = (value: string) => {
    dispatch({ type: 'ON_SEARCH', payload: value })
  }

  const onBackspace = () => {
    dispatch({ type: 'ON_BACKSPACE' })
  }

  const onClear = () => {
    dispatch({ type: 'ON_CLEAR' })
  }

  const onSelectItem = (item: T) => {
    dispatch({ type: 'ON_SELECT_ITEM', payload: item })
  }

  const onAddItem = (item: T) => {
    dispatch({ type: 'ON_ADD_ITEM', payload: item })
  }

  return {
    search: state.search,
    items: state.items,
    selectedItems: state.selectedItems,
    dispatch,
    onBackspace,
    onClear,
    onSearch,
    onSelectItem,
    onAddItem
  }
}
