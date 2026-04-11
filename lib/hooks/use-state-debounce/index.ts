import { useState } from 'react'
import { type UseDebounceProps, useDebounce } from '../use-debounce'

type UseStateDebounceProps<S> = Pick<
  UseDebounceProps<S[]>,
  'delay' | 'debounceEventName' | 'immediateOptions'
> & {
  /**
   * The initial value of the state.
   * @example
   * defaultValue: []
   * defaultValue: ""
   * defaultValue: { name: '', age: 0 }
   */
  defaultValue?: S
  /**
   * Triggered immediately when the value changes, after each debounce cycle starts.
   * It's just a regular callback, so you can use it for logging, debugging, etc.
   *
   * @param value - The current value (not yet debounced)
   */
  onChange?: (value: S) => void
  /**
   * Triggered once the debounce cycle ends — i.e., after the user stops changing the value.
   * Useful for actions that should only happen after the user "settles", like saving to a database.
   *
   * @param value - The final debounced value
   * @example
   * onFinish={(value) => saveToDatabase(value)}
   */
  onFinish?: (value: S) => void
}

type UseStateDebouncedProps<S> = {
  currentValue: S | undefined
  debouncedValue: S | undefined
}

export const useStateDebounce = <S>({
  defaultValue,
  onFinish,
  onChange,
  ...props
}: UseStateDebounceProps<S>) => {
  const [state, setState] = useState<UseStateDebouncedProps<S>>(() => ({
    currentValue: defaultValue,
    debouncedValue: defaultValue
  }))

  const { isDebouncing, onDebounceChange, onChangeImmediate } = useDebounce<
    [S]
  >({
    ...props,
    onChange: (next) => {
      setState((prev) => ({ ...prev, currentValue: next }))
      onChange?.(next)
    },
    onFinish: ([next]) => {
      setState((prev) => ({ ...prev, debouncedValue: next }))
      onFinish?.(next)
    }
  })

  return [
    state.currentValue as S,
    onChangeImmediate,
    {
      debouncedValue: state.debouncedValue as S,
      isDebouncing,
      onDebounceChange
    }
  ] as const
}
