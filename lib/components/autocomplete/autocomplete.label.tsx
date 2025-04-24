import { memo } from 'react'
import { useAutocompleteStore } from './hooks/use-autocomplete-context'

type AutocompleteLabelProps = {
  children: React.ReactNode
}

const AutocompleteLabelComponent = ({ children }: AutocompleteLabelProps) => {
  const autocompleteId = useAutocompleteStore((state) => state.autocompleteId)

  return (
    <label
      id={`autocomplete-label-${autocompleteId}`}
      htmlFor={autocompleteId}
      className="z-10 w-full"
    >
      {children}
    </label>
  )
}

export const AutocompleteLabel = memo(AutocompleteLabelComponent)

AutocompleteLabelComponent.displayName = 'SecretLib.AutocompleteLabel'
