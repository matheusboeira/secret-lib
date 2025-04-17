import { useReducer } from 'react'
import type {
  HandlerType,
  ReducerActions,
  ReducerState
} from '../@types/reducer.types'
import { isEqual } from '@/lib/utils/is-equal'

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
      const selectedItems = state.selectedItems ?? []

      const itemAlreadySelected = selectedItems?.some((item) =>
        isEqual(item, action.payload)
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
        selectedItems: [...selectedItems, action.payload]
      }
    },
    ON_SEARCH: (state, action) => {
      /** Prevent unnecessary re-renders */
      if (isEqual(state.search, action.payload)) return state

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
    search: state.search,
    selectedItems: state.selectedItems,
    dispatch,
    onBackspace,
    onClear,
    onSearch,
    onSelectItem
  }
}
