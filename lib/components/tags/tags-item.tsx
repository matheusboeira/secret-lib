import { isEqual } from '@/lib/core/utils/is-equal'
import { usePress } from '@/lib/hooks'
import { CheckedIcon } from '@/lib/icons'
import { useMemo } from 'react'
import { useTagStore } from './hooks/use-tag-context'
import { tags } from './tags.variants'

type ForceKey = { key: string }

type TagItemProps<T> = ForceKey & {
  value: T
  children: React.ReactNode
}

export const TagItem = <T,>({ value, children }: TagItemProps<T>) => {
  const selectedItems = useTagStore((state) => state.selectedItems)
  const onSelectItem = useTagStore((state) => state.onSelectItem)
  const pressProps = usePress({ onPress: () => onSelectItem(value) })

  const isSelected = useMemo(
    () => selectedItems?.some((item) => isEqual(item, value)),
    [selectedItems, value]
  )

  return (
    <div className="relative h-full w-full">
      <button
        type="button"
        className={tags.tagItem([
          'outline-none outline-offset-4 focus:outline-primary'
        ])}
        aria-checked={isSelected ? 'true' : 'false'}
        {...pressProps}
      >
        {children}
      </button>
      <div className="absolute top-1/2 -translate-y-1/2 right-2 flex items-center gap-1">
        <CheckedIcon
          className={tags.checkedIcon([
            isSelected && 'opacity-100 scale-100 delay-75'
          ])}
        />
      </div>
    </div>
  )
}

TagItem.displayName = 'SecretLib.TagItem'
