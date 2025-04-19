import { Chip } from '../chip'
import type { SelectedItemsProps } from './@types'
import { useTagStore } from './hooks/use-tag-context'
import { tags } from './tags.variants'

type ItemKey<T> = { id?: string; _id?: string } & T

export const SelectedItems = <T,>({
  search,
  children,
  renderValue
}: SelectedItemsProps<T>) => {
  const refs = useTagStore((state) => state.refs)
  const selectedItems = useTagStore((state) => state.selectedItems)
  const onUpdateItem = useTagStore((state) => state.onUpdateItem)
  const onSelectItem = useTagStore((state) => state.onSelectItem)

  return (
    <ul
      data-slot="selected-items-wrapper"
      className={tags.selectedItemsWrapper()}
      ref={refs.selectedItemsWrapperRef}
    >
      {selectedItems?.map((item) => {
        const _item = item as ItemKey<T>
        const key = _item.id ?? _item._id ?? JSON.stringify(item)

        if (renderValue) {
          return (
            <li key={key}>
              {renderValue(item as T, {
                onClearItem: () => onSelectItem(item as T),
                onUpdateItem: () => onUpdateItem(item as T)
              })}
            </li>
          )
        }

        return (
          <li key={key}>
            <Chip onClose={() => onSelectItem(item as T)}>
              {children(item as T)}
            </Chip>
          </li>
        )
      })}
      {search}
    </ul>
  )
}

SelectedItems.displayName = 'SecretLib.SelectedItems'
