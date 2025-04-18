import { useTagStore } from './hooks/use-tag-context'
import { tags } from './tags.variants'

type TagListItemsProps<T> = {
  children: (item: T) => React.ReactNode
}

export const TagListItems = <T,>({ children }: TagListItemsProps<T>) => {
  const refs = useTagStore((state) => state.refs)
  const disclosure = useTagStore((state) => state.disclosure)
  const filteredItems = useTagStore((state) => state.filteredItems)

  return (
    <>
      <button
        type="button"
        ref={refs.openButtonRef}
        onClick={disclosure.onOpenChange}
      >
        Trocar!
      </button>
      <div
        role="menu"
        ref={refs.listItemsRef}
        aria-orientation="vertical"
        aria-expanded={disclosure.isOpen}
        className={tags.listItems([
          disclosure.isOpen && 'opacity-100 translate-y-0 pointer-events-auto'
        ])}
      >
        {filteredItems?.length === 0 && 'No items found.'}
        {filteredItems?.map((item) => children(item as T))}
      </div>
    </>
  )
}

TagListItems.displayName = 'SecretLib.TagListItems'
