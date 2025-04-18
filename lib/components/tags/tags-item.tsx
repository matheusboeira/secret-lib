import { isEqual } from '@/lib/core/utils/is-equal'
import { usePress } from '@/lib/hooks'
import { CheckedIcon } from '@/lib/core/icons'
import { useMemo } from 'react'
import { useTagStore } from './hooks/use-tag-context'
import { tags } from './tags.variants'

type TagButtonProps<T> = {
  value: T
  children: React.ReactNode
}

export const TagButton = <T,>({ value, children }: TagButtonProps<T>) => {
  const selectedItems = useTagStore((state) => state.selectedItems)
  const onSelectItem = useTagStore((state) => state.onSelectItem)
  const disclosure = useTagStore((state) => state.disclosure)

  const pressProps = usePress({
    onPress: () => onSelectItem(value),
    tabIndex: disclosure.isOpen ? 0 : -1
  })

  const isSelected = useMemo(
    () => selectedItems?.some((item) => isEqual(item, value)),
    [selectedItems, value]
  )

  return (
    <div className="relative h-full w-full">
      <button
        type="button"
        className={tags.tagItem([
          'outline-none outline-offset-4 focus-visible:outline-blue-500'
        ])}
        aria-checked={isSelected ? 'true' : 'false'}
        {...pressProps}
      >
        {children}
      </button>
      <CheckedIcon
        className={tags.checkedIcon([isSelected && 'opacity-100 !scale-100'])}
      />
    </div>
  )
}

TagButton.displayName = 'SecretLib.TagItem'
