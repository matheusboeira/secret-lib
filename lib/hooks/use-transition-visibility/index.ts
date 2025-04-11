import { useCallback, useEffect, useRef, useState } from 'react'

interface UseTransitionVisibilityOptions {
  enterDelay?: number
  exitDelay?: number
  isDisabled?: boolean
}

export const useTransitionVisibility = ({
  enterDelay = 100,
  exitDelay = 200,
  isDisabled = false
}: UseTransitionVisibilityOptions = {}) => {
  const [isMounted, setIsMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const rafRef = useRef<number | null>(null)
  const timeoutRef = useRef<number | null>(null)

  const show = useCallback(() => {
    if (isDisabled) return
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsMounted(true)

    rafRef.current = requestAnimationFrame(() => {
      timeoutRef.current = window.setTimeout(() => {
        setIsVisible(true)
      }, enterDelay)
    })
  }, [enterDelay, isDisabled])

  const hide = useCallback(() => {
    if (isDisabled) return
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsVisible(false)

    timeoutRef.current = window.setTimeout(() => {
      setIsMounted(false)
    }, exitDelay)
  }, [exitDelay, isDisabled])

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return {
    isMounted,
    isVisible,
    show,
    hide
  }
}
