import { cloneElement, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { usePress, useTransitionVisibility } from '../../hooks'
import type { TooltipProps } from './@types'
import { tooltip } from './tooltip.variants'

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
  isDisabled = false,
  shouldReanimateOnClick = true
}: TooltipProps) => {
  const tooltipRef = useRef<HTMLDivElement | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  const { isVisible, isMounted, onShow, onHide, onClickAnimation } =
    useTransitionVisibility({
      isDisabled,
      onEnter: onMouseEnter as () => void,
      onExit: onMouseLeave as () => void
    })

  const pressProps = usePress({
    tabIndex: -1,
    onPress: (e) => {
      if (!onClick) return
      const event = e as React.MouseEvent<HTMLElement>
      onClick(event)

      onClickAnimation(() => {
        animationFrameRef.current = requestAnimationFrame(() => {
          if (!tooltipRef.current || !shouldReanimateOnClick) return
          const { x, y } = calculateCoordinates(event)
          setCoordinates(x, y)
          animationFrameRef.current = null
        })
      })
    }
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

  const setCoordinates = (x: number, y: number) => {
    if (!tooltipRef.current) return
    tooltipRef.current.style.left = `${x}px`
    tooltipRef.current.style.top = `${y}px`
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (isDisabled) return

    const { x, y } = calculateCoordinates(e)
    if (animationFrameRef.current) return

    animationFrameRef.current = requestAnimationFrame(() => {
      setCoordinates(x, y)
      animationFrameRef.current = null
    })
  }

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  const ClonedElement = cloneElement(children, {
    onMouseEnter: onShow,
    onMouseLeave: onHide,
    onMouseMove,
    ...pressProps
  })

  return (
    <>
      {ClonedElement}
      {isMounted &&
        createPortal(
          <div
            data-slot="base"
            ref={tooltipRef}
            className={tooltip.base([
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90',
              classNames?.base
            ])}
          >
            <div className={tooltip.content([classNames?.content])}>
              {typeof content === 'function' ? content(isVisible) : content}
            </div>
          </div>,
          portalChildren
        )}
    </>
  )
}

Tooltip.displayName = 'SecretLib.Tooltip'
