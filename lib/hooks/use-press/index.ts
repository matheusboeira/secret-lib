import { useCallback } from 'react'
import { useCallbackRefs } from '../use-callback-refs'

export type PressEvent = React.SyntheticEvent
export type PressEventHandler = (event?: PressEvent) => void

type UsePressProps = {
  onPress?: PressEventHandler
  onPressStart?: PressEventHandler
  onPressEnd?: PressEventHandler
  onKeyDown?: (event: React.KeyboardEvent) => void
  tabIndex?: number
}

export const usePress = ({
  onPress,
  onPressStart,
  onPressEnd,
  onKeyDown,
  tabIndex
}: UsePressProps) => {
  const {
    onPress: onPressRef,
    onPressStart: onPressStartRef,
    onPressEnd: onPressEndRef,
    onKeyDown: onKeyDownRef
  } = useCallbackRefs({
    onPress,
    onPressStart,
    onPressEnd,
    onKeyDown
  })

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        onPressStartRef?.(event)
        onPressRef?.(event)
        onPressEndRef?.(event)
      }
      onKeyDownRef?.(event)
    },
    [onPressRef, onPressStartRef, onPressEndRef, onKeyDownRef]
  )

  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault()
      onPressStartRef?.(event)
      onPressRef?.(event)
      onPressEndRef?.(event)
    },
    [onPressRef, onPressStartRef, onPressEndRef]
  )

  const handleTouchStart = useCallback(
    (event: React.TouchEvent) => {
      onPressStartRef?.(event)
    },
    [onPressStartRef]
  )

  const handleTouchEnd = useCallback(
    (event: React.TouchEvent) => {
      event.preventDefault()
      onPressRef?.(event)
      onPressEndRef?.(event)
    },
    [onPressRef, onPressEndRef]
  )

  return {
    onClick: handleClick,
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
    onKeyDown: handleKeyDown,
    tabIndex: tabIndex ?? 0,
    role: 'button'
  }
}
