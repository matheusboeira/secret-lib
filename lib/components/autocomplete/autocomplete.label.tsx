import { memo } from 'react'
import { useAutocompleteStore } from './hooks/use-autocomplete-context'
import { autocomplete } from './autocomplete.variants'

type AutocompleteLabelProps = {
  children: React.ReactNode
}

const AutocompleteLabelComponent = ({ children }: AutocompleteLabelProps) => {
  const autocompleteId = useAutocompleteStore((state) => state.autocompleteId)
  const classNames = useAutocompleteStore((state) => state.classNames)
  const isRequired = useAutocompleteStore((state) => state.isRequired)

  return (
    <label
      id={`autocomplete-label-${autocompleteId}`}
      htmlFor={autocompleteId}
      className={autocomplete.label('z-10 w-full', classNames?.label)}
      data-required={isRequired}
      data-slot="label"
    >
      {children}
    </label>
  )
}

export const AutocompleteLabel = memo(AutocompleteLabelComponent)

AutocompleteLabelComponent.displayName = 'SecretLib.AutocompleteLabel'
