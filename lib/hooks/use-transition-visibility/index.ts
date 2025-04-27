import { useCallback, useEffect, useRef, useState } from 'react'
import { useCallbackRefs } from '../use-callback-refs'

export type UseTransitionVisibilityOptions = {
  enterDelay?: number
  exitDelay?: number
  isDisabled?: boolean
  onEnter?: () => void
  onExit?: () => void
}

export const useTransitionVisibility = ({
  enterDelay = 0,
  exitDelay = 200,
  isDisabled = false,
  onEnter,
  onExit
}: UseTransitionVisibilityOptions = {}) => {
  const [isMounted, setIsMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const rafRef = useRef<number | null>(null)
  const timeoutRef = useRef<number | null>(null)

  const { onEnter: onEnterRef, onExit: onExitRef } = useCallbackRefs({
    onEnter,
    onExit
  })

  const onShow = useCallback(
    (overrideDelay?: number) => {
      if (isDisabled) return
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      setIsMounted(true)

      rafRef.current = requestAnimationFrame(() => {
        timeoutRef.current = window.setTimeout(() => {
          setIsVisible(true)
          onEnterRef?.()
        }, overrideDelay ?? enterDelay)
      })
    },
    [enterDelay, isDisabled, onEnterRef]
  )

  const onHide = useCallback(() => {
    if (isDisabled) return
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsVisible(false)
    onExitRef?.()

    timeoutRef.current = window.setTimeout(() => {
      setIsMounted(false)
    }, exitDelay)
  }, [exitDelay, isDisabled, onExitRef])

  const onClickAnimation = useCallback(
    (callback?: () => void, enterDelay = 100) => {
      if (isDisabled) return
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      onHide()
      callback?.()
      onShow(enterDelay)
    },
    [isDisabled, onShow, onHide]
  )

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return {
    isMounted,
    isVisible,
    onShow: onShow as () => void,
    onHide,
    onClickAnimation
  }
}
