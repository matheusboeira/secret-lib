import { useStateDebounce } from '@/lib/hooks/use-state-debounce'
import { useShakeAnimation } from '@/lib/hooks/use-shake-animation'
import { type KeyboardEvent, forwardRef, useImperativeHandle } from 'react'
import type { AutocompleteSearchHandlers } from './@types'
import { useAutocompleteStore } from './hooks/use-autocomplete-context'
import { autocomplete } from './autocomplete.variants'

const AutocompleteSearchComponent = (
  props: AutocompleteSearchHandlers,
  ref: React.Ref<HTMLInputElement>
) => {
  const refs = useAutocompleteStore((state) => state.refs)
  const disclosure = useAutocompleteStore((state) => state.disclosure)
  const allowCustomValues = useAutocompleteStore(
    (state) => state.allowCustomValues
  )
  const autocompleteId = useAutocompleteStore((state) => state.autocompleteId)
  const classNames = useAutocompleteStore((state) => state.classNames)
  const onSearch = useAutocompleteStore((state) => state.onSearch)
  const onBackspace = useAutocompleteStore((state) => state.onBackspace)
  const onAddItem = useAutocompleteStore((state) => state.onAddItem)
  const onSelectItem = useAutocompleteStore((state) => state.onSelectItem)
  const onFindItem = useAutocompleteStore((state) => state.onFindItem)
  const shake = useShakeAnimation({ ref: refs.inputRef })

  const [search, setSearch, { onDebounceChange }] = useStateDebounce({
    callback: onSearch,
    defaultValue: '',
    delay: 300
  })

  const onHandleSearch = (value: string) => {
    if (value.length > 0 && !disclosure.isOpen) disclosure.onOpen()
    setSearch(value)
    onDebounceChange(value)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value

    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      disclosure.onOpen()
      refs.buttomItemRefs.current[0]?.focus()
      return
    }

    if (e.key === 'Enter' && value.length === 0) {
      e.preventDefault()
      disclosure.onOpen()
      return
    }

    if (e.key === 'Enter') {
      e.preventDefault()
      onHandleSearch('')

      if (value.length === 0) {
        shake()
        return
      }

      if (!allowCustomValues) {
        onSelectItem(value)
        if (!onFindItem(value)) shake()
        return
      }

      const isFunction = typeof allowCustomValues === 'function'
      onAddItem(isFunction ? allowCustomValues(value) : value)
    }

    if (e.key === 'Backspace' && value.length === 0) {
      onBackspace()
    }
  }

  useImperativeHandle(ref, () => refs.inputRef.current as HTMLInputElement, [
    refs.inputRef
  ])

  return (
    <input
      id={autocompleteId}
      type="text"
      data-slot="input"
      className={autocomplete.input(classNames?.input)}
      value={search}
      onChange={(e) => onHandleSearch(e.currentTarget.value)}
      placeholder="Search for..."
      onKeyDown={onKeyDown}
      ref={refs.inputRef}
      {...props}
    />
  )
}

export const AutocompleteSearch = forwardRef(AutocompleteSearchComponent)

AutocompleteSearchComponent.displayName = 'SecretLib.AutocompleteSearch'
