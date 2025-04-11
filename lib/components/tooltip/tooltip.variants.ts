import type { Variants } from 'motion/react'

export const tooltipVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.9
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.1,
      duration: 0.2
    }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.1
    }
  }
}
