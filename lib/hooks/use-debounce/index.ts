import { useCallback, useEffect, useRef, useState } from 'react'
import { useCallbackRefs } from '../use-callback-refs'
import type { DebounceEvent } from './use-debounce-listener'

type CallbackFunction<T extends unknown[]> = (...args: T) => void
type OnFinishFunction<T = string> = (value: T) => void
type Options = { triggerOnFinish?: boolean }

const immediateDefaultOptions: Options = {
  triggerOnFinish: true
}

export type UseDebounceProps<C extends unknown[] = []> = {
  onChange: CallbackFunction<C>
  onFinish?: OnFinishFunction<C>
  delay?: number
  debounceEventName?: string
  immediateOptions?: Options
}

export const useDebounce = <T extends unknown[] | string[]>({
  onChange,
  onFinish,
  debounceEventName,
  delay = 1000,
  immediateOptions = immediateDefaultOptions
}: UseDebounceProps<T>) => {
  const [isDebouncing, setDebouncing] = useState(false)
  const timeoutRef = useRef<number | null>(null)
  const finishTimeoutRef = useRef<number | null>(null)

  const { onChange: callbackRef, onFinish: onFinishRef } = useCallbackRefs({
    onChange,
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
        callbackRef?.(...(args as T))

        if (immediateOptions?.triggerOnFinish) {
          onFinishRef?.(args as T)
        }
      }, delay)
    },
    [callbackRef, delay, onFinishRef, immediateOptions?.triggerOnFinish]
  )

  const onChangeImmediate = useCallback(
    (...args: [...T, { __triggerOnFinish?: boolean }?]) => {
      const lastArg = args.at(-1)
      const params = args as unknown as T

      const hasOptions =
        typeof lastArg === 'object' &&
        lastArg !== null &&
        '__triggerOnFinish' in lastArg

      const callOptions = hasOptions
        ? (args.pop() as { __triggerOnFinish?: boolean })
        : {}

      const shouldTriggerOnFinish =
        callOptions.__triggerOnFinish ??
        immediateOptions?.triggerOnFinish ??
        false

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }

      callbackRef?.(...params)
      setDebouncing(shouldTriggerOnFinish)

      if (!shouldTriggerOnFinish) return

      if (finishTimeoutRef.current) {
        clearTimeout(finishTimeoutRef.current)
      }

      finishTimeoutRef.current = setTimeout(() => {
        setDebouncing(false)
        onFinishRef?.(params as T)
        finishTimeoutRef.current = null
      }, delay)
    },
    [callbackRef, onFinishRef, delay, immediateOptions?.triggerOnFinish]
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

  return { isDebouncing, onDebounceChange, onChangeImmediate }
}
