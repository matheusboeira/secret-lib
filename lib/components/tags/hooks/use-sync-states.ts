import { isEqual } from '@/lib/core/utils/is-equal'
import { useEffect, useRef } from 'react'

type SyncStatesConfig<T> = {
  externalState: T
  internalState: T
  onExternalChange: (externalState: T) => void
  onInternalChange?: (internalState: T) => void
  compareFn?: (a: T, b: T) => boolean
  skipInitialSync?: boolean
}

export function useSyncStates<T>({
  externalState,
  internalState,
  onExternalChange,
  onInternalChange,
  compareFn = isEqual,
  skipInitialSync = true
}: SyncStatesConfig<T>) {
  const isMounted = useRef(false)
  const previousExternal = useRef(externalState)
  const previousInternal = useRef(internalState)
  const areStatesSynced = compareFn(internalState, externalState)

  /** Sync external → internal */
  useEffect(() => {
    if (!isMounted.current && skipInitialSync) {
      isMounted.current = true
      return
    }

    const externalChanged = !compareFn(previousExternal.current, externalState)
    if (externalChanged) onExternalChange(externalState)

    previousExternal.current = externalState
    isMounted.current = true
  }, [externalState, compareFn, onExternalChange, skipInitialSync])

  /** Sync internal → external */
  useEffect(() => {
    if (!isMounted.current || !onInternalChange) return

    const internalChanged = !compareFn(previousInternal.current, internalState)
    if (internalChanged && !areStatesSynced) onInternalChange(internalState)

    previousInternal.current = internalState
  }, [internalState, areStatesSynced, compareFn, onInternalChange])
}
