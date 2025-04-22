import { CheckedIcon } from '@/lib/core/icons'
import { isEqual } from '@/lib/core/utils/is-equal'
import { usePress } from '@/lib/hooks'
import { forwardRef, useMemo } from 'react'
import { useTagStore } from './hooks/use-tag-context'
import { tags } from './tags.variants'

type TagButtonProps<T> = {
  value: T
  children: React.ReactNode
  index: number
}

const TagButtonComponent = <T,>(
  { value, index, children }: TagButtonProps<T>,
  ref: React.Ref<HTMLButtonElement>
) => {
  const refs = useTagStore((state) => state.refs)
  const selectedItems = useTagStore((state) => state.selectedItems)
  const onSelectItem = useTagStore((state) => state.onSelectItem)

  const pressProps = usePress({
    onPress: () => onSelectItem(value),
    onKeyDown: (e) => {
      const items = refs.buttomItemRefs.current
      const lastIndex = items.length - 1

      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault()

        const direction = e.key === 'ArrowDown' ? 1 : -1
        let nextIndex = index + direction

        if (nextIndex < 0) nextIndex = lastIndex
        if (nextIndex > lastIndex) nextIndex = 0

        items[nextIndex]?.focus()
      }
    }
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
        ref={ref}
      >
        {children}
      </button>
      <CheckedIcon
        className={tags.checkedIcon([isSelected && 'opacity-100 !scale-100'])}
      />
    </div>
  )
}

export const TagButton = forwardRef(TagButtonComponent) as <T>(
  props: TagButtonProps<T> & { ref?: React.Ref<HTMLButtonElement> }
) => ReturnType<typeof TagButtonComponent>

TagButtonComponent.displayName = 'SecretLib.TagItem'
