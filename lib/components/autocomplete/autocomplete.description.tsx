import { memo } from 'react'
import { autocomplete } from './autocomplete.variants'
import { useAutocompleteStore } from './hooks/use-autocomplete-context'

const AutocompleteDescriptionComponent = () => {
  const description = useAutocompleteStore((state) => state.description)
  const classNames = useAutocompleteStore((state) => state.classNames)

  if (!description) {
    return null
  }

  return (
    <div
      className={autocomplete.descriptionWrapper(
        classNames?.descriptionWrapper
      )}
      data-slot="descriptionWrapper"
    >
      {description}
    </div>
  )
}

export const AutocompleteDescription = memo(AutocompleteDescriptionComponent)

AutocompleteDescriptionComponent.displayName =
  'SecretLib.AutocompleteDescription'
