import { usePress } from '@/lib/hooks'
import { CloseIcon } from '@/lib/icons'
import { chip } from './chip.variants'

export type ChipProps = {
  children: React.ReactNode
  isClosable?: boolean
  onClose?: () => void
}

export const Chip = ({ children, isClosable, onClose }: ChipProps) => {
  const closable = isClosable === undefined ? Boolean(onClose) : false
  const pressProps = usePress({ onPress: onClose })

  return (
    <div className={chip.base()}>
      {children}
      {closable && (
        <button type="button" className={chip.icon()} {...pressProps}>
          <CloseIcon className="size-3" />
        </button>
      )}
    </div>
  )
}
