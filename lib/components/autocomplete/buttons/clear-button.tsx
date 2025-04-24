import { XIcon } from '@/lib/core/icons'
import { usePress } from '@/lib/hooks'
import { memo } from 'react'
import { autocomplete } from '../autocomplete.variants'
import { useAutocompleteStore } from '../hooks/use-autocomplete-context'

export const CloseButton = memo(() => {
  const refs = useAutocompleteStore((state) => state.refs)
  const selectedItems = useAutocompleteStore((state) => state.selectedItems)
  const classNames = useAutocompleteStore((state) => state.classNames)
  const onClearItems = useAutocompleteStore((state) => state.onClearItems)

  const pressProps = usePress({
    onPress: () => {
      onClearItems()
      refs.inputRef.current?.focus()
    }
  })

  if (selectedItems?.length === 0) {
    return null
  }

  return (
    <button
      type="button"
      ref={refs.clearButtonRef}
      className={autocomplete.clearAndOpenButton(
        classNames?.clearAndOpenButton
      )}
      {...pressProps}
    >
      <XIcon />
    </button>
  )
})
