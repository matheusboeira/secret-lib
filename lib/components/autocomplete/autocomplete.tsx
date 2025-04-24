import type React from 'react'
import { forwardRef } from 'react'
import type { AutocompleteProps } from './@types'
import { AutocompleteLabel } from './autocomplete.label'
import { AutocompleteMenuItems } from './autocomplete.menu-items'
import { AutocompleteSearch } from './autocomplete.search'
import { SelectedItems } from './autocomplete.selected-items'
import { AutocompleteWrapper } from './autocomplete.wrapper'
import { CloseButton } from './buttons/clear-button'
import { OpenListItemsButton } from './buttons/open-list-items-button'
import { AutocompleteProvider } from './context/autocomplete.provider'

const AutocompleteComponent = <T,>(
  {
    children,
    renderValue,
    onBlur,
    onFocus,
    label,
    ...props
  }: AutocompleteProps<T>,
  ref: React.Ref<HTMLInputElement>
) => {
  return (
    <AutocompleteProvider {...props}>
      <div className="flex flex-col gap-1">
        {label && <AutocompleteLabel>{label}</AutocompleteLabel>}
        <AutocompleteWrapper>
          <div className="relative flex items-center flex-wrap gap-1">
            <SelectedItems
              renderValue={renderValue}
              search={
                <AutocompleteSearch
                  onBlur={onBlur}
                  onFocus={onFocus}
                  ref={ref}
                />
              }
            >
              {children}
            </SelectedItems>
          </div>
          <div className="flex items-center self-start gap-0.5">
            <CloseButton />
            <OpenListItemsButton />
          </div>
          <AutocompleteMenuItems>{children}</AutocompleteMenuItems>
        </AutocompleteWrapper>
      </div>
    </AutocompleteProvider>
  )
}

export const Autocomplete = forwardRef(AutocompleteComponent) as <T>(
  props: AutocompleteProps<T> & { ref?: React.Ref<HTMLInputElement> }
) => ReturnType<typeof AutocompleteComponent>

AutocompleteComponent.displayName = 'SecretLib.Autocomplete'
