import { cloneElement, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useTransitionVisibility } from '../../hooks'
import { useCallbackRefs } from '../../hooks/use-callback-ref'
import { cn } from '../../utils/cn'
import type { TooltipProps } from './tooltip.type'

const OFFSET_BORDER = 10

export const Tooltip = ({
  children,
  content,
  classNames,
  onMouseEnter,
  onMouseLeave,
  onClick,
  offset = { x: 10, y: 15 },
  portalChildren = document.body,
  isDisabled = false
}: TooltipProps) => {
  const coordinatesRef = useRef({ x: 0, y: 0 })
  const tooltipRef = useRef<HTMLDivElement | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const timeoutRef = useRef<number | null>(null)
  const { onClick: onClickRef } = useCallbackRefs({ onClick })

  const { isVisible, isMounted, onShow, onHide } = useTransitionVisibility({
    isDisabled,
    onEnter: onMouseEnter as () => void,
    onExit: onMouseLeave as () => void
  })

  const calculateCoordinates = (e: React.MouseEvent) => {
    const { innerWidth, innerHeight } = window
    const tooltipWidth = tooltipRef.current?.clientWidth ?? 160
    const tooltipHeight = tooltipRef.current?.clientHeight ?? 96

    let x = e.clientX + offset.x
    let y = e.clientY + offset.y

    if (x + tooltipWidth > innerWidth - OFFSET_BORDER)
      x = innerWidth - tooltipWidth - OFFSET_BORDER

    if (y + tooltipHeight > innerHeight - OFFSET_BORDER)
      y = innerHeight - tooltipHeight - OFFSET_BORDER - 40

    if (x < 0) x = 10
    if (y < 0) y = 10

    return { x, y }
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (isDisabled) return

    const { x, y } = calculateCoordinates(e)
    coordinatesRef.current = { x, y }

    if (!animationFrameRef.current) {
      animationFrameRef.current = requestAnimationFrame(() => {
        if (tooltipRef.current) {
          tooltipRef.current.style.left = `${coordinatesRef.current.x}px`
          tooltipRef.current.style.top = `${coordinatesRef.current.y}px`
        }
        animationFrameRef.current = null
      })
    }
  }

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const ClonedElement = cloneElement(children, {
    onClick: onClickRef,
    onMouseEnter: onShow,
    onMouseLeave: onHide,
    onMouseMove
  })

  return (
    <>
      {ClonedElement}
      {isMounted &&
        createPortal(
          <div
            ref={tooltipRef}
            className={cn(
              'fixed pointer-events-none w-max h-fit z-50',
              'will-change-transform transition-all duration-200 ease-out transform',
              'motion-reduce:transition-none motion-reduce:hover:transform-none',
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90',
              classNames?.base
            )}
          >
            <div
              className={cn(
                'bg-white dark:bg-black text-black dark:text-white py-1 px-2 rounded-lg',
                'border border-gray-200 dark:border-gray-600 shadow-sm',
                classNames?.content
              )}
            >
              {typeof content === 'function' ? content(isVisible) : content}
            </div>
          </div>,
          portalChildren
        )}
    </>
  )
}

Tooltip.displayName = 'SecretLib.Tooltip'
