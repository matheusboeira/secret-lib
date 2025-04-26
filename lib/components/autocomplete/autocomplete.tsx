import type React from 'react'
import { forwardRef } from 'react'
import type { AutocompleteProps } from './@types'
import { AutocompleteLabel } from './autocomplete.label'
import { AutocompleteMenuItems } from './autocomplete.menu-items'
import { AutocompleteSearch } from './autocomplete.search'
import { AutocompleteSelectedItems } from './autocomplete.selected-items'
import { AutocompleteWrapper } from './autocomplete.wrapper'
import { CloseButton } from './buttons/clear-button'
import { OpenMenuItemsButton } from './buttons/open-menu-items-button'
import { AutocompleteProvider } from './context/autocomplete.provider'
import { AutocompleteDescription } from './autocomplete.description'

const AutocompleteComponent = <T,>(
  {
    label,
    children,
    renderValue,
    onBlur,
    onFocus,
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
            <AutocompleteSelectedItems
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
            </AutocompleteSelectedItems>
          </div>
          <div className="flex items-center self-start gap-0.5">
            <CloseButton />
            <OpenMenuItemsButton />
          </div>
          <AutocompleteMenuItems>{children}</AutocompleteMenuItems>
        </AutocompleteWrapper>
        <AutocompleteDescription />
      </div>
    </AutocompleteProvider>
  )
}

export const Autocomplete = forwardRef(AutocompleteComponent) as <T>(
  props: AutocompleteProps<T> & { ref?: React.Ref<HTMLInputElement> }
) => ReturnType<typeof AutocompleteComponent>

AutocompleteComponent.displayName = 'SecretLib.Autocomplete'
