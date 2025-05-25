import { CheckedIcon } from '@/lib/core/icons'
import { isEqual } from '@/lib/core/utils/is-equal'
import { usePress } from '@/lib/hooks'
import { forwardRef, useMemo } from 'react'
import { autocomplete } from './autocomplete.variants'
import { useAutocompleteStore } from './hooks/use-autocomplete-context'

type AutocompleteButtonProps<T> = {
  value: T
  children: React.ReactNode
  index: number
}

const AutocompleteButtonComponent = <T,>(
  { value, index, children }: AutocompleteButtonProps<T>,
  ref: React.Ref<HTMLButtonElement>
) => {
  const refs = useAutocompleteStore((state) => state.refs)
  const selectedItems = useAutocompleteStore((state) => state.selectedItems)
  const onSelectItem = useAutocompleteStore((state) => state.onSelectItem)
  const classNames = useAutocompleteStore((state) => state.classNames)

  const pressProps = usePress({
    onPress: () => onSelectItem(value),
    onKeyDown: (e) => {
      const items = refs.buttomItemRefs.current
      const lastIndex = items.length - 1

      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault()

        const direction = e.key === 'ArrowDown' ? 1 : -1
        let nextIndex = index + direction

        if (nextIndex < 0) nextIndex = lastIndex
        if (nextIndex > lastIndex) nextIndex = 0

        items[nextIndex]?.focus()
        return
      }

      if (e.key === 'Backspace') {
        e.preventDefault()
        e.stopPropagation()
        refs.inputRef.current?.focus()
        return
      }

      if (/^[a-zA-Z0-9]$/.test(e.key) && refs.inputRef.current) {
        e.preventDefault()

        refs.inputRef.current.value = e.key
        refs.inputRef.current.focus()
      }
    }
  })

  const isSelected = useMemo(
    () => selectedItems?.some((item) => isEqual(item, value)),
    [selectedItems, value]
  )

  return (
    <button
      type="button"
      className={autocomplete.buttonItem(classNames?.buttonItem)}
      aria-checked={isSelected ? 'true' : 'false'}
      {...pressProps}
      ref={ref}
    >
      {children}
      <CheckedIcon
        className={autocomplete.checkedIcon(
          isSelected && 'ml-auto opacity-100 scale-100',
          classNames?.checkedIcon
        )}
      />
    </button>
  )
}

export const AutocompleteButton = forwardRef(AutocompleteButtonComponent) as <
  T
>(
  props: AutocompleteButtonProps<T> & { ref?: React.Ref<HTMLButtonElement> }
) => ReturnType<typeof AutocompleteButtonComponent>

AutocompleteButtonComponent.displayName = 'SecretLib.AutocompleteButton'
