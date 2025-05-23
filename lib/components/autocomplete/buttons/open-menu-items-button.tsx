import { SelectorIcon } from '@/lib/core/icons'
import { usePress } from '@/lib/hooks'
import { memo } from 'react'
import { autocomplete } from '../autocomplete.variants'
import { useAutocompleteStore } from '../hooks/use-autocomplete-context'

export const OpenMenuItemsButton = memo(() => {
  const refs = useAutocompleteStore((state) => state.refs)
  const disclosure = useAutocompleteStore((state) => state.disclosure)
  const classNames = useAutocompleteStore((state) => state.classNames)

  const pressProps = usePress({
    onPress: () => {
      disclosure.onOpenChange()

      if (!disclosure.isOpen) {
        refs.buttomItemRefs.current[0]?.focus()
      }
    }
  })

  return (
    <button
      type="button"
      ref={refs.openButtonRef}
      className={autocomplete.clearAndOpenButton(
        'rounded-lg',
        classNames?.clearAndOpenButton
      )}
      {...pressProps}
    >
      <SelectorIcon />
    </button>
  )
})

OpenMenuItemsButton.displayName = 'SecretLib.OpenMenuItemsButton'
