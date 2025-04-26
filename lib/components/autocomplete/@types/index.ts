import type { ClassValue } from '@/lib/core/utils/create-variants'
import type { UseDisclosureReturn } from '@/lib/hooks'
import type { autocomplete } from '../autocomplete.variants'
import type { AutocompleteRefs } from '../hooks/use-refs'

type AutocompleteContextInnerHandlers<T> = {
  onBackspace: () => void
  onClearItems: () => void
  onTrashItem: (item: T) => void
  onSearch: (value: string) => void
  onSelectItem: (item: T) => void
  onAddItem: (item: T) => void
  onFindItem: (item: T) => T | undefined
  onUpdateItem: (oldValue: T, newValue: T) => void
}

type AllowCustomValues<T> = T extends string ? boolean : (item: string) => T

export type AutocompleteContextOuterHandlers<T> = {
  /**
   * The function to be called when the selection changes.
   */
  onSelectionChange?: (items: T[]) => void
}

export type AutocompleteContextProps<T> = AutocompleteContextInnerHandlers<T> &
  AutocompleteContextOuterHandlers<T> & {
    /**
     * The items array to be used in the autocomplete.
     */
    items: T[]
    /**
     * The selected items array to be used in the autocomplete.
     */
    selectedItems?: T[]
    /**
     * The filtered items array to be used in the autocomplete.
     */
    filteredItems: T[]
    /**
     * The function that allows custom values to be added to the items array.
     * If it is a function, it will be called with the value of the input and should
     * return the custom value to be added to the items array.
     */
    allowCustomValues?: AllowCustomValues<T>
    /**
     * The mode of the autocomplete. It can be `single` or `multiple`.
     */
    mode?: 'single' | 'multiple'
    /**
     * If the autocomplete is required.
     */
    isRequired?: boolean
    /**
     * The class names of the autocomplete to be applied.
     */
    classNames?: Partial<Record<keyof typeof autocomplete, ClassValue>>
    /**
     * The placeholder of the input.
     */
    placeholder?: string
    /**
     * The description of the autocomplete. It will be rendered
     * below the input.
     */
    description?: React.ReactNode
    /**
     * If the items array is empty, this content will be rendered
     * instead of `No items found`.
     */
    emptyContent?: React.ReactNode
    /**
     * Internal use only.
     */
    refs: AutocompleteRefs
    disclosure: UseDisclosureReturn
    search: string
    autocompleteId: string
  }

export type AutocompleteProviderProps<T> = Pick<
  AutocompleteContextProps<T>,
  | 'items'
  | 'selectedItems'
  | 'allowCustomValues'
  | 'onSelectionChange'
  | 'mode'
  | 'classNames'
  | 'placeholder'
  | 'description'
  | 'emptyContent'
  | 'isRequired'
> & {
  children: React.ReactNode
}

export type AutocompleteSearchHandlers = {
  onBlur?: () => void
  onFocus?: () => void
}

export type SelectedItemHandlers<T> = {
  onClearItem: () => void
  onUpdateItem: (newValue: T) => void
}

export type SelectedItemsProps<T> = {
  search: React.ReactNode
  children: (item: T) => React.ReactNode
  renderValue?: (item: T, handlers: SelectedItemHandlers<T>) => React.ReactNode
}

export type AutocompleteProps<T> = Omit<SelectedItemsProps<T>, 'search'> &
  AutocompleteSearchHandlers &
  Pick<
    AutocompleteContextProps<T>,
    | 'items'
    | 'selectedItems'
    | 'allowCustomValues'
    | 'onSelectionChange'
    | 'mode'
    | 'classNames'
    | 'placeholder'
    | 'description'
    | 'emptyContent'
    | 'isRequired'
  > & {
    label?: React.ReactNode
  }
