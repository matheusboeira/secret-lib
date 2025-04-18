import { useRef } from 'react'

type UseShakeAnimationProps<T extends HTMLElement> = {
  ref?: React.RefObject<T | null>
  undoIn?: number
  classList?: string[]
}

export const useShakeAnimation = <T extends HTMLElement>({
  ref,
  undoIn = 900,
  classList = []
}: UseShakeAnimationProps<T>) => {
  const isAnimating = useRef(false)

  const classes = [
    'animate-shake',
    'text-rose-600',
    'placeholder:text-rose-600',
    ...classList
  ]

  const shake = () => {
    if (isAnimating.current || !ref?.current) return

    isAnimating.current = true
    ref.current?.classList.add(...classes)

    setTimeout(() => {
      ref.current?.classList.remove(...classes)
      isAnimating.current = false
    }, undoIn)
  }

  return { shake }
}
