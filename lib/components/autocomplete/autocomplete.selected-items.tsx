import { Chip } from '../chip'
import type { SelectedItemsProps } from './@types'
import { autocomplete } from './autocomplete.variants'
import { useAutocompleteStore } from './hooks/use-autocomplete-context'

type ItemKey<T> = { id?: string; _id?: string } & T

export const AutocompleteSelectedItems = <T,>({
  search,
  children,
  renderValue
}: SelectedItemsProps<T>) => {
  const refs = useAutocompleteStore((state) => state.refs)
  const selectedItems = useAutocompleteStore((state) => state.selectedItems)
  const onUpdateItem = useAutocompleteStore((state) => state.onUpdateItem)
  const onSelectItem = useAutocompleteStore((state) => state.onSelectItem)

  return (
    <ul
      data-slot="selected-items-wrapper"
      className={autocomplete.selectedItemsWrapper()}
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
                onUpdateItem: (newValue) => onUpdateItem(item as T, newValue)
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

AutocompleteSelectedItems.displayName = 'SecretLib.AutocompleteSelectedItems'
