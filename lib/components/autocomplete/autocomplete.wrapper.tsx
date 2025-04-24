import { memo } from 'react'
import { autocomplete } from './autocomplete.variants'
import { useAutocompleteStore } from './hooks/use-autocomplete-context'

type AutocompleteWrapperProps = {
  children: React.ReactNode
}

export const AutocompleteWrapper = memo(
  ({ children }: AutocompleteWrapperProps) => {
    const refs = useAutocompleteStore((state) => state.refs)
    const disclosure = useAutocompleteStore((state) => state.disclosure)

    const onHandleClick = () => {
      refs.inputRef.current?.focus()

      if (
        disclosure.isOpen ||
        refs.openButtonRef.current === document.activeElement ||
        refs.selectedItemsWrapperRef.current === document.activeElement
      ) {
        return
      }

      disclosure.onOpen()
    }

    return (
      <div
        data-slot="base-wrapper"
        className={autocomplete.baseWrapper()}
        onClick={onHandleClick}
        onKeyDown={() => {}}
        ref={refs.inputWrapperRef}
      >
        {children}
      </div>
    )
  }
)

AutocompleteWrapper.displayName = 'SecretLib.AutocompleteWrapper'
