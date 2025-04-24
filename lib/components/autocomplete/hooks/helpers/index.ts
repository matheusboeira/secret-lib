import { createReducer } from '@/lib/core/utils/create-reducer'
import { isEqual } from '@/lib/core/utils/is-equal'
import type { ReducerActions, ReducerState } from '../../@types/reducer.types'

const getItemHash = <T>(item: T): string => {
  if (item == null) return 'null'
  if (typeof item === 'string') return `s_${item}`
  if (typeof item === 'number') return `n_${item}`
  if (typeof item === 'boolean') return `b_${Number(item)}`

  if (typeof item === 'object') {
    if ('id' in item) return `id_${(item as any).id}`
    if ('_id' in item) return `id_${(item as any)._id}`
  }

  try {
    return `j_${JSON.stringify(item)}`
  } catch {
    return 'unhashable'
  }
}

/**
 * If not found in cache, it will search in the list
 * backwards, because if new items are added to the list,
 * they will be added at the end, and the search will start
 * from the end.
 */
const findEqualItem = <T>(list: T[], item: T): T | undefined => {
  for (let i = list.length - 1; i >= 0; i--) {
    if (isEqual(list[i], item)) return list[i]
  }
  return undefined
}

const addItem = <T>(list: T[], item: T): T[] => {
  return list.some((i) => isEqual(i, item)) ? list : [...list, item]
}

const toggleItem = <T>(
  list: T[],
  item: T,
  mode: 'single' | 'multiple' = 'multiple'
): T[] => {
  return list.some((i) => isEqual(i, item))
    ? list.filter((i) => !isEqual(i, item))
    : mode === 'multiple'
      ? [...list, item]
      : [item]
}

const removeLast = <T>(list: T[]): T[] => {
  return list.slice(0, -1)
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

export const createReducerState = <T>({
  cacheItems
}: {
  cacheItems?: T[]
}) => {
  const initialHashMap = new Map<string, T>(
    cacheItems?.map((item) => [getItemHash(item), item]) ?? []
  )

  return createReducer<ReducerState<T>, ReducerActions<T>>({
    ON_ADD_ITEM: (state, action) => {
      const cachedItem = initialHashMap.get(getItemHash(action.payload))
      const item =
        cachedItem ??
        findEqualItem(state.items, action.payload) ??
        action.payload

      const updatedItems = addItem(state.items, item)
      const updatedSelectedItems = toggleItem(
        state.selectedItems ?? [],
        item,
        state.mode
      )

      return {
        ...state,
        items: updatedItems,
        selectedItems: updatedSelectedItems
      }
    },
    ON_SELECT_ITEM: (state, action) => {
      const cachedItem = initialHashMap.get(getItemHash(action.payload))
      const item = cachedItem ?? findEqualItem(state.items, action.payload)
      if (!item) return state

      const updatedSelectedItems = toggleItem(
        state.selectedItems ?? [],
        cachedItem ?? action.payload,
        state.mode
      )

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
      const cachedItem = initialHashMap.get(getItemHash(action.payload))
      const item = cachedItem ?? findEqualItem(state.items, action.payload)
      if (!item) return state

      const updatedItems = state.items.filter((i) => !isEqual(i, item))
      const updatedSelectedItems = toggleItem(
        state.selectedItems ?? [],
        item,
        state.mode
      )

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
}
