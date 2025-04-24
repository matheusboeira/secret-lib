import { Virtualizer } from 'virtua'
import { AutocompleteButton } from './autocomplete.button'
import { autocomplete } from './autocomplete.variants'
import { useAutocompleteStore } from './hooks/use-autocomplete-context'

type AutocompleteMenuItemsProps<T> = {
  children: (item: T) => React.ReactNode
}

export const AutocompleteMenuItems = <T,>({
  children
}: AutocompleteMenuItemsProps<T>) => {
  const refs = useAutocompleteStore((state) => state.refs)
  const disclosure = useAutocompleteStore((state) => state.disclosure)
  const filteredItems = useAutocompleteStore((state) => state.filteredItems)
  const classNames = useAutocompleteStore((state) => state.classNames)
  const indexes = filteredItems.length > 0 ? [0, filteredItems.length - 1] : []

  return (
    <div
      role="menu"
      data-slot="menu-items-wrapper"
      ref={refs.listItemsRef}
      aria-orientation="vertical"
      aria-expanded={disclosure.isOpen}
      className={autocomplete.menuItemsWrapper(
        disclosure.isOpen && 'opacity-100 translate-y-0 pointer-events-auto',
        classNames?.menuItemsWrapper
      )}
    >
      {filteredItems?.length === 0 && (
        <span className="p-2 text-sm">No items found.</span>
      )}
      <Virtualizer overscan={10} as="ul" item="li" keepMounted={indexes}>
        {filteredItems?.map((item, index) => (
          <AutocompleteButton
            key={index}
            value={item}
            index={index}
            ref={(ref) => {
              if (!ref) return
              refs.buttomItemRefs.current[index] = ref
            }}
          >
            {children(item as T)}
          </AutocompleteButton>
        ))}
      </Virtualizer>
    </div>
  )
}

AutocompleteMenuItems.displayName = 'SecretLib.AutocompleteMenuItems'
