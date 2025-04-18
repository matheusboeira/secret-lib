import { useEffect } from 'react'

type ClickOutsideHandler = (
  event: MouseEvent | TouchEvent | KeyboardEvent
) => void

export type UseClickOutsideProps = {
  ref: React.RefObject<HTMLElement | null>
  handler: ClickOutsideHandler
  isEnabled: boolean
}

export const useClickOutside = ({
  ref,
  handler,
  isEnabled
}: UseClickOutsideProps) => {
  useEffect(() => {
    if (!isEnabled) return

    const handleClick = (event: MouseEvent | TouchEvent) => {
      const element = ref?.current
      if (!element || element.contains(event.target as Node)) return
      handler(event)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handler(event)
    }

    document.addEventListener('mousedown', handleClick)
    document.addEventListener('touchstart', handleClick)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('touchstart', handleClick)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [ref, handler, isEnabled])
}
