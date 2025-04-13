import { useCallback, useState } from 'react'
import { useCallbackRefs } from '../use-callback-refs'

export type UseDisclosureProps = {
  defaultOpen?: boolean
  onOpen?: () => void
  onClose?: () => void
  onOpenChange?: () => void
}

export const useDisclosure = ({
  defaultOpen = false,
  onOpen,
  onClose,
  onOpenChange
}: UseDisclosureProps = {}) => {
  const [isOpen, setOpen] = useState(defaultOpen)

  const {
    onOpen: onOpenRef,
    onClose: onCloseRef,
    onOpenChange: onOpenChangeRef
  } = useCallbackRefs({
    onOpen,
    onClose,
    onOpenChange
  })

  const handleOpen = useCallback(() => {
    setOpen(true)
    onOpenRef?.()
  }, [onOpenRef])

  const handleClose = useCallback(() => {
    setOpen(false)
    onCloseRef?.()
  }, [onCloseRef])

  const handleToggle = useCallback(() => {
    setOpen((prev) => !prev)
    onOpenChangeRef?.()
  }, [onOpenChangeRef])

  return {
    isOpen,
    onOpen: handleOpen,
    onClose: handleClose,
    onOpenChange: handleToggle
  }
}
