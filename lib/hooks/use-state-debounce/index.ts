import { useState } from 'react'
import { type UseDebounceProps, useDebounce } from '../use-debounce'

type UseStateDebounceProps<T extends unknown[], S> = UseDebounceProps<T> & {
  defaultValue?: S
}

export const useStateDebounce = <T extends unknown[], S>({
  defaultValue,
  ...props
}: UseStateDebounceProps<T, S>) => {
  const [value, setValue] = useState<S | undefined>(defaultValue)
  const { isDebouncing, onDebounceChange } = useDebounce({ ...props })

  return [value, setValue, { isDebouncing, onDebounceChange }] as const
}
