import { useCallback, useEffect, useRef } from 'react'

export function useCallbackRefs<
  T extends Record<string, (...args: any[]) => any>
>(callbacks: Partial<T>): Partial<T> {
  const refs = useRef<Partial<Record<keyof T, T[keyof T]>>>({})

  useEffect(() => {
    for (const key in callbacks) {
      refs.current[key] = callbacks[key]
    }
  }, [callbacks])

  const stableCallbacks = {} as Partial<T>

  for (const key in callbacks) {
    stableCallbacks[key] = useCallback((...args: any[]) => {
      return refs.current[key]?.(...args)
    }, []) as T[typeof key]
  }

  return stableCallbacks
}
