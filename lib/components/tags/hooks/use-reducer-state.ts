import { useReducer } from 'react'
import type {
  HandlerType,
  ReducerActions,
  ReducerState
} from '../@types/reducer.types'

function isEqual(value: any, other: any): boolean {
  // Se ambos forem o mesmo valor (incluindo tipos primitivos)
  if (value === other) {
    return true
  }

  // Se um é null ou indefinido e o outro não, são diferentes
  if (value == null || other == null) {
    return false
  }

  // Se os tipos não forem iguais, são diferentes
  if (typeof value !== typeof other) {
    return false
  }

  // Se ambos forem objetos, realiza a comparação profunda
  if (typeof value === 'object' && typeof other === 'object') {
    // Verifica se ambos são Arrays
    if (Array.isArray(value) && Array.isArray(other)) {
      if (value.length !== other.length) return false
      for (let i = 0; i < value.length; i++) {
        if (!isEqual(value[i], other[i])) return false
      }
      return true
    }

    // Verifica se ambos são objetos
    if (!Array.isArray(value) && !Array.isArray(other)) {
      const valueKeys = Object.keys(value)
      const otherKeys = Object.keys(other)

      if (valueKeys.length !== otherKeys.length) return false

      for (const key of valueKeys) {
        if (!otherKeys.includes(key) || !isEqual(value[key], other[key])) {
          return false
        }
      }
      return true
    }
  }

  return false
}

const createReducer = <S, A extends { type: string }>(
  handlers: HandlerType<S, A>
) => {
  return (state: S, action: A): S => {
    const handler = (handlers as any)?.[action.type] as
      | ((state: S, action: A) => S)
      | undefined

    return handler ? handler(state, action) : state
  }
}

const createReducerState = <T>() =>
  createReducer<ReducerState<T>, ReducerActions<T>>({
    ON_SELECT_ITEM: (state, action) => {
      const selectedItems = state.selectedItems

      const itemAlreadySelected = state.selectedItems?.some(
        (item) => item === action.payload
      )

      if (itemAlreadySelected) {
        return {
          ...state,
          selectedItems: selectedItems?.filter(
            (item) => !isEqual(item, action.payload)
          )
        }
      }

      return {
        ...state,
        selectedItems: [...(state.selectedItems ?? []), action.payload]
      }
    },
    ON_SEARCH: (state, action) => {
      /** Prevent unnecessary re-renders */
      if (state.search === action.payload) return state

      return {
        ...state,
        search: action.payload
      }
    },
    ON_BACKSPACE: (state) => {
      const selectedItems = state.selectedItems

      /** Prevent unnecessary re-renders */
      if (!selectedItems || selectedItems?.length === 0) {
        return state
      }

      return {
        ...state,
        selectedItems: selectedItems?.slice(0, selectedItems.length - 1)
      }
    },
    ON_CLEAR: (state) => {
      /** Prevent unnecessary re-renders */
      if (!state.selectedItems || state.selectedItems?.length === 0) {
        return state
      }

      return {
        ...state,
        selectedItems: []
      }
    }
  })

const initialState = <T>(
  defaultValues?: ReducerState<T>
): Required<ReducerState<T>> => ({
  search: '',
  selectedItems: [],
  ...defaultValues
})

export const useReducerState = <T>(defaultValues?: ReducerState<T>) => {
  const [state, dispatch] = useReducer(
    createReducerState<T>(),
    initialState<T>(defaultValues)
  )

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

  return {
    state,
    search: state.search,
    selectedItems: state.selectedItems,
    dispatch,
    onBackspace,
    onClear,
    onSearch,
    onSelectItem
  }
}
