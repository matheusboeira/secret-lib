import { useCallback, useEffect, useRef } from 'react'

type CallbackMap<T extends Record<string, (...args: any[]) => any>> = {
  [K in keyof T]: T[K]
}

export function useCallbackRefs<
  T extends Record<string, (...args: any[]) => any>
>(callbacks: Partial<CallbackMap<T>>): CallbackMap<T> {
  const refs = useRef({} as Record<keyof T, any>)

  useEffect(() => {
    for (const key in callbacks) {
      refs.current[key] = callbacks[key]
    }
  }, [callbacks])

  const stableCallbacks = {} as CallbackMap<T>

  for (const key in callbacks) {
    stableCallbacks[key] = useCallback((...args: any[]) => {
      return refs.current[key]?.(...args)
    }, []) as T[typeof key]
  }

  return stableCallbacks
}
