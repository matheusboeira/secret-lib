import { useCallback, useEffect, useRef, useState } from 'react'
import { useCallbackRefs } from '../use-callback-ref'

interface UseTransitionVisibilityOptions {
  enterDelay?: number
  exitDelay?: number
  isDisabled?: boolean
  onEnter?: () => void
  onExit?: () => void
}

export const useTransitionVisibility = ({
  enterDelay = 100,
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

  const onShow = useCallback(() => {
    if (isDisabled) return
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsMounted(true)

    rafRef.current = requestAnimationFrame(() => {
      timeoutRef.current = window.setTimeout(() => {
        setIsVisible(true)
        onEnterRef?.()
      }, enterDelay)
    })
  }, [enterDelay, isDisabled, onEnterRef])

  const onHide = useCallback(() => {
    if (isDisabled) return
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsVisible(false)
    onExitRef?.()

    timeoutRef.current = window.setTimeout(() => {
      setIsMounted(false)
    }, exitDelay)
  }, [exitDelay, isDisabled, onExitRef])

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return {
    isMounted,
    isVisible,
    onShow,
    onHide
  }
}
