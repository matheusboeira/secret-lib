import { XIcon } from '@/lib/core/icons'
import { usePress } from '@/lib/hooks'
import { memo } from 'react'
import { useTagStore } from '../hooks/use-tag-context'
import { tags } from '../tags.variants'

export const CloseButton = memo(() => {
  const refs = useTagStore((state) => state.refs)
  const onClear = useTagStore((state) => state.onClear)
  const pressProps = usePress({ onPress: onClear })
  const selectedItems = useTagStore((state) => state.selectedItems)

  if (selectedItems?.length === 0) {
    return null
  }

  return (
    <button
      type="button"
      ref={refs.clearButtonRef}
      className={tags.actionButton()}
      {...pressProps}
    >
      <XIcon />
    </button>
  )
})
