import { useCallback, useEffect, useRef, useState } from 'react'
import { useCallbackRefs } from '../use-callback-ref'
import type { DebounceEvent } from './use-debounce-listener'

type CallbackFunction<T extends unknown[]> = (...args: T) => void
type OnFinishFunction<T = string> = (value: T) => void

export type UseDebounceProps<C extends unknown[] = []> = {
  callback: CallbackFunction<C>
  onFinish?: OnFinishFunction<C>
  delay?: number
  debounceEventName?: string
}

export function useDebounce<T extends unknown[] | string[]>({
  callback,
  onFinish,
  debounceEventName,
  delay = 1000
}: UseDebounceProps<T>) {
  const [isDebouncing, setDebouncing] = useState(false)
  const timeoutRef = useRef<number | null>(null)

  const { callback: callbackRef, onFinish: onFinishRef } = useCallbackRefs({
    callback,
    onFinish
  })

  const onDebounceChange = useCallback(
    (...args: T) => {
      setDebouncing(true)

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        setDebouncing(false)
        callbackRef(...(args as T))
        onFinishRef?.(args as T)
      }, delay)
    },
    [callbackRef, delay, onFinishRef]
  )

  useEffect(() => {
    if (!debounceEventName) return

    const event = new CustomEvent(debounceEventName, {
      detail: {
        isDebouncing
      } satisfies DebounceEvent
    })

    document.dispatchEvent(event)
  }, [debounceEventName, isDebouncing])

  return { isDebouncing, onDebounceChange }
}
