import { useDebounce } from '@/lib/hooks'
import type { KeyboardEvent } from 'react'
import { useTagContext } from './hooks/use-tag-context'
import { tags } from './tags.variants'

export const TagsSearch = <T,>() => {
  const { refs, onBackspace, onClear, onSearch } = useTagContext<T>()

  const { onDebounceChange } = useDebounce({
    callback: onSearch,
    delay: 250
  })

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value

    if (value.length && e.key === 'Enter') {
      e.preventDefault()

      onClear()
      value = e.currentTarget.value = ''
      console.log(value, e.currentTarget.value)
    }

    if (e.key === 'Backspace') {
      onBackspace()
    }

    onDebounceChange(value)
  }

  return (
    <input
      // id={inputId}
      data-slot="input"
      className={tags.input()}
      type="text"
      // value={search}
      placeholder="Search for..."
      onKeyUp={onKeyDown}
      // onClick={onOpenChange}
      // disabled={isDisabled || isLoading || isCreatingItem}
      // readOnly={isReadOnly}
      // {...onInputEvents}
      ref={refs.inputRef}
    />
  )
}
