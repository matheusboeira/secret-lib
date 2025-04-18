import { isValidElement } from 'react'
import { Chip } from '../chip/chip'
import { useTagStore } from './hooks/use-tag-context'
import { tags } from './tags.variants'

type ItemKey<T> = { id?: string; _id?: string } & T

type SelectedItemsProps<T> = {
  children?: (item: T) => React.ReactNode
  renderValue?: (item: T, handlers?: any) => React.ReactNode
}

export const SelectedItems = <T,>({
  children,
  renderValue
}: SelectedItemsProps<T>) => {
  const refs = useTagStore((state) => state.refs)
  const selectedItems = useTagStore((state) => state.selectedItems)
  const onSelectItem = useTagStore((state) => state.onSelectItem)

  return (
    <ul className={tags.selectedItems()} ref={refs.selectedItemsWrapperRef}>
      {selectedItems?.map((item) => {
        const _item = item as ItemKey<T>
        const key = _item.id ?? _item._id ?? JSON.stringify(item)

        if (renderValue) {
          return <li key={key}>{renderValue(item as T, { onSelectItem })}</li>
        }

        if (children) {
          const rendered = children(item as T)
          if (!isValidElement(rendered)) return null

          return (
            <li key={key}>
              <Chip onClose={() => onSelectItem(item as T)}>
                {(rendered.props as any)?.children}
              </Chip>
            </li>
          )
        }

        return null
      })}
    </ul>
  )
}

SelectedItems.displayName = 'SecretLib.SelectedItems'
