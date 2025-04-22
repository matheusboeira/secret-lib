import { createReducer } from '@/lib/core/utils/create-reducer'
import { isEqual } from '@/lib/core/utils/is-equal'
import { useReducer } from 'react'
import type {
  ReducerActions,
  ReducerHandlers,
  ReducerState
} from '../@types/reducer.types'
import { useSyncStates } from './use-sync-states'

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

const updateItemList = <T>(list: T[], oldValue: T, newValue: T) => {
  let isFound = false
  let isDuplicated = false

  const updated = list.map((item) => {
    if (isEqual(item, oldValue)) {
      isFound = true
      return newValue
    }
    if (isEqual(item, newValue)) {
      isDuplicated = true
    }
    return item
  })

  return {
    updated: isFound || isDuplicated ? updated : list,
    isFound,
    isDuplicated
  }
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
      const { selectedItems = [] } = state
      if (selectedItems.length === 0) return state

      return {
        ...state,
        selectedItems: removeLast(selectedItems)
      }
    },
    ON_CLEAR: (state) => {
      const { selectedItems = [] } = state
      const cleared = clearIfNotEmpty(selectedItems)
      if (cleared === selectedItems) return state

      return {
        ...state,
        selectedItems: cleared
      }
    },
    ON_UPDATE_ITEM: (state, action) => {
      const { items, selectedItems = [] } = state
      const { oldValue, newValue } = action.payload

      /** Prevents unnecessary updates/re-renders */
      if (isEqual(newValue, oldValue)) {
        return state
      }

      const itemsCheck = updateItemList(items, oldValue, newValue)
      const selectionCheck = updateItemList(selectedItems, oldValue, newValue)
      const isDuplicated =
        itemsCheck.isDuplicated || selectionCheck.isDuplicated

      if (!itemsCheck.isFound || isDuplicated) {
        return state
      }

      return {
        ...state,
        items: itemsCheck.updated,
        selectedItems: selectionCheck.updated
      }
    },
    ON_TRASH_ITEM: (state, action) => {
      const item = findEqualItem(state.items, action.payload)
      if (!item) return state

      const updatedItems = state.items.filter((i) => !isEqual(i, item))
      const updatedSelectedItems = toggleItem(state.selectedItems ?? [], item)

      return {
        ...state,
        items: updatedItems,
        selectedItems: updatedSelectedItems
      }
    },
    SYNC_SELECTED_ITEMS: (state, action) => {
      const isDiff = !isEqual(state.selectedItems, action.payload)
      if (!isDiff) return state

      return {
        ...state,
        selectedItems: action.payload
      }
    }
  })

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
  const [state, dispatch] = useReducer(
    createReducerState<T>(),
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

  const onAddItem = (item: T) => {
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
      dispatch({ type: 'SYNC_SELECTED_ITEMS', payload: externalSelectedItems })
    },
    onInternalChange: (internalSelectedItems) => {
      handlers?.onSelectionChange?.(internalSelectedItems)
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
