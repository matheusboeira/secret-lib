import { useCallback } from 'react'
import { useCallbackRefs } from '../use-callback-refs'

export type PressEvent = React.SyntheticEvent

type UsePressProps = {
  onPress?: (event?: PressEvent) => void
  tabIndex?: number
}

export const usePress = ({ onPress, tabIndex }: UsePressProps) => {
  const { onPress: onPressRef } = useCallbackRefs({ onPress })

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        onPressRef?.(event)
      }
    },
    [onPressRef]
  )

  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault()
      onPressRef?.(event)
    },
    [onPressRef]
  )

  const handleTouchEnd = useCallback(
    (event: React.TouchEvent) => {
      event.preventDefault()
      onPressRef?.(event)
    },
    [onPressRef]
  )

  return {
    onClick: handleClick,
    onTouchEnd: handleTouchEnd,
    onKeyDown: handleKeyDown,
    tabIndex: tabIndex ?? 0,
    role: 'button'
  }
}
