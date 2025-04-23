import { Virtualizer } from 'virtua'
import { useTagStore } from './hooks/use-tag-context'
import { TagButton } from './tags-button'
import { tags } from './tags.variants'

type TagListItemsProps<T> = {
  children: (item: T) => React.ReactNode
}

export const TagListItems = <T,>({ children }: TagListItemsProps<T>) => {
  const refs = useTagStore((state) => state.refs)
  const disclosure = useTagStore((state) => state.disclosure)
  const filteredItems = useTagStore((state) => state.filteredItems)
  const indexes = filteredItems.length > 0 ? [0, filteredItems.length - 1] : []

  return (
    <div
      role="menu"
      data-slot="list-items-wrapper"
      ref={refs.listItemsRef}
      aria-orientation="vertical"
      aria-expanded={disclosure.isOpen}
      className={tags.listItemsWrapper([
        disclosure.isOpen && 'opacity-100 translate-y-0 pointer-events-auto'
      ])}
    >
      {filteredItems?.length === 0 && (
        <span className="p-2 text-sm">No items found.</span>
      )}
      <Virtualizer overscan={10} as="ul" item="li" keepMounted={indexes}>
        {filteredItems?.map((item, index) => (
          <TagButton
            key={index}
            value={item}
            index={index}
            ref={(ref) => {
              if (!ref) return
              refs.buttomItemRefs.current[index] = ref
            }}
          >
            {children(item as T)}
          </TagButton>
        ))}
      </Virtualizer>
    </div>
  )
}

TagListItems.displayName = 'SecretLib.TagListItems'
