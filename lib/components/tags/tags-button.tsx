import { CheckedIcon } from '@/lib/core/icons'
import { isEqual } from '@/lib/core/utils/is-equal'
import { usePress } from '@/lib/hooks'
import { memo, useMemo } from 'react'
import { useTagStore } from './hooks/use-tag-context'
import { tags } from './tags.variants'

type TagButtonProps<T> = {
  value: T
  children: React.ReactNode
}

export const TagButton = memo(<T,>({ value, children }: TagButtonProps<T>) => {
  const selectedItems = useTagStore((state) => state.selectedItems)
  const onSelectItem = useTagStore((state) => state.onSelectItem)

  const pressProps = usePress({
    onPress: () => onSelectItem(value)
  })

  const isSelected = useMemo(
    () => selectedItems?.some((item) => isEqual(item, value)),
    [selectedItems, value]
  )

  return (
    <div className="relative h-full w-full">
      <button
        type="button"
        className={tags.tagItem()}
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
})

TagButton.displayName = 'SecretLib.TagItem'
