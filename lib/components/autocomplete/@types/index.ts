import type { UseDisclosureReturn } from '@/lib/hooks'
import type { AutocompleteRefs } from '../hooks/use-refs'
import type { autocomplete } from '../autocomplete.variants'
import type { ClassValue } from 'clsx'

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

export type AutocompleteContextOuterHandlers<T> = {
  onSelectionChange?: (items: T[]) => void
}

export type AutocompleteContextProps<T> = AutocompleteContextInnerHandlers<T> &
  AutocompleteContextOuterHandlers<T> & {
    items: T[]
    filteredItems: T[]
    selectedItems?: T[]
    refs: AutocompleteRefs
    disclosure: UseDisclosureReturn
    search: string
    autocompleteId: string
    allowCustomValues?: boolean | ((item: string) => T)
    mode?: 'single' | 'multiple'
    classNames?: Record<keyof typeof autocomplete, ClassValue>
  }

export type AutocompleteProviderProps<T> = Pick<
  AutocompleteContextProps<T>,
  | 'items'
  | 'selectedItems'
  | 'allowCustomValues'
  | 'onSelectionChange'
  | 'mode'
  | 'classNames'
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
  > & {
    label?: React.ReactNode
  }
