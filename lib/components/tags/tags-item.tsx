import { isEqual } from '@/lib/utils/is-equal'
import { useMemo } from 'react'
import { useTagContext } from './hooks/use-tag-context'
import { tags } from './tags.variants'
import { CheckedIcon, CloseIcon } from '@/lib/icons'

type ForceKey = { key: string }

type TagItemProps<T extends object> = ForceKey & {
  value: T
  children: React.ReactNode
}

export const TagItem = <T extends object>({
  value,
  children
}: TagItemProps<T>) => {
  const { selectedItems, onSelectItem } = useTagContext<T>()

  const isSelected = useMemo(
    () => selectedItems?.find((item) => isEqual(item, value)),
    [selectedItems, value]
  )

  return (
    <div className="relative h-full w-full">
      <button
        type="button"
        className={tags.tagItem([
          // 'outline-none outline-offset-4 focus:outline-primary'
        ])}
        onClick={() => onSelectItem(value)}
        aria-checked={isSelected ? 'true' : 'false'}
      >
        {children} - {isSelected ? 'true' : 'false'}
      </button>
      <div className="absolute top-1/2 -translate-y-1/2 right-2 flex items-center gap-1">
        <CloseIcon
          className={tags.checkedIcon([
            isSelected ? 'opacity-100 scale-100 delay-75' : 'opacity-0 scale-50'
          ])}
        />
        <CheckedIcon
          className={tags.checkedIcon([
            isSelected ? 'opacity-100 scale-100 delay-75' : 'opacity-0 scale-50'
          ])}
        />
      </div>
    </div>
  )
}
