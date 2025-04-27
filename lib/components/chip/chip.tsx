import { XIcon } from '@/lib/core/icons'
import { usePress } from '@/lib/hooks'
import type { ComponentProps } from 'react'
import { chip } from './chip.variants'

export type ChipProps = ComponentProps<'div'> & {
  children: React.ReactNode
  isClosable?: boolean
  onClose?: () => void
}

export const Chip = ({
  children,
  isClosable,
  onClose,
  ...props
}: ChipProps) => {
  const closable = isClosable === undefined ? Boolean(onClose) : isClosable
  const pressProps = usePress({ onPress: onClose })

  return (
    <div className={chip.base()} {...props}>
      {children}
      {closable && (
        <button type="button" className={chip.icon()} {...pressProps}>
          <XIcon className="size-3 text-white dark:text-black" />
        </button>
      )}
    </div>
  )
}
