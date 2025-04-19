import { SelectorIcon } from '@/lib/core/icons'
import { usePress } from '@/lib/hooks'
import { memo } from 'react'
import { useTagStore } from '../hooks/use-tag-context'
import { tags } from '../tags.variants'

export const OpenListItemsButton = memo(() => {
  const refs = useTagStore((state) => state.refs)
  const disclosure = useTagStore((state) => state.disclosure)
  const pressProps = usePress({ onPress: disclosure.onOpenChange })

  return (
    <button
      type="button"
      ref={refs.openButtonRef}
      className={tags.actionButton(['rounded-lg'])}
      {...pressProps}
    >
      <SelectorIcon />
    </button>
  )
})
