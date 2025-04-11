import { AnimatePresence, LazyMotion, domMin, m } from 'motion/react'
import { cloneElement, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../../utils/cn'
import type { TooltipProps } from './tooltip.type'
import { tooltipVariants } from './tooltip.variants'

const OFFSET_BORDER = 10

export const Tooltip = ({
  children,
  offset = { x: 10, y: 15 },
  content,
  classNames,
  portalChildren = document.body,
  isDisabled = false
}: TooltipProps) => {
  const [show, setShow] = useState(false)
  const coordinatesRef = useRef({ x: 0, y: 0 })
  const tooltipRef = useRef<HTMLDivElement | null>(null)
  const animationFrameRef = useRef<number | null>(null)

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

    if (!show) setShow(true)

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
    }
  }, [])

  const onMouseEnter = () => {
    !isDisabled && setShow(true)
  }

  const onMouseLeave = () => {
    !isDisabled && setShow(false)
  }

  const ClonedElement = cloneElement(children, {
    onMouseEnter,
    onMouseLeave,
    onMouseMove
  })

  return (
    <AnimatePresence>
      <LazyMotion features={domMin}>
        {ClonedElement}
        {createPortal(
          <AnimatePresence>
            {show && (
              <m.div
                ref={tooltipRef}
                variants={tooltipVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className={cn(
                  'fixed pointer-events-none w-max h-fit z-50',
                  classNames?.base
                )}
              >
                <div
                  className={cn(
                    'bg-white dark:bg-black text-black dark:text-white py-1 px-2 rounded-lg',
                    'border border-gray-200',
                    classNames?.content
                  )}
                >
                  {typeof content === 'function' ? content(show) : content}
                </div>
              </m.div>
            )}
          </AnimatePresence>,
          portalChildren
        )}
      </LazyMotion>
    </AnimatePresence>
  )
}

Tooltip.displayName = 'SecretLib.Tooltip'
