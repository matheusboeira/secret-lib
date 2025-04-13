import { useCallback, useEffect, useState } from 'react'
import type { UseDebounceProps } from './use-debounce'

export type DebounceEvent = {
  isDebouncing: boolean
}

type DebounceListenerProps = Required<
  Pick<UseDebounceProps, 'debounceEventName'>
>

export const useDebounceListener = ({
  debounceEventName
}: DebounceListenerProps) => {
  const [isDebouncing, setDebouncing] = useState(false)

  const handleDebounceEvent = useCallback((event: Event) => {
    if (!(event instanceof CustomEvent)) return
    const { isDebouncing } = event.detail as DebounceEvent

    if (typeof isDebouncing === 'boolean') {
      setDebouncing((prev) => {
        if (prev !== isDebouncing) return isDebouncing
        return prev
      })
    }
  }, [])

  useEffect(() => {
    document.addEventListener(debounceEventName, handleDebounceEvent)

    return () => {
      document.removeEventListener(debounceEventName, handleDebounceEvent)
    }
  }, [debounceEventName, handleDebounceEvent])

  return isDebouncing
}
