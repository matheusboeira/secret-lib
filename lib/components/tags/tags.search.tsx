import { useDebounce } from '@/lib/hooks'
import { type KeyboardEvent, useRef } from 'react'
import { useTagContext } from './hooks/use-tag-context'
import { tags } from './tags.variants'

export const TagsSearch = <T,>() => {
  const { refs, onBackspace, onClear, onSearch } = useTagContext<T>()
  const preventDebounceCall = useRef(false)

  const { onDebounceChange } = useDebounce({
    callback: onSearch,
    delay: 250
  })

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    console.log(e.ctrlKey, e.altKey, e.shiftKey, e.key)

    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      preventDebounceCall.current = true
      return
    }
  }

  const onKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value

    if (value.length && e.key === 'Enter') {
      e.preventDefault()

      onClear()
      value = e.currentTarget.value = ''
    }

    if (e.key === 'Backspace') {
      onBackspace()
    }

    if (preventDebounceCall.current) {
      preventDebounceCall.current = false
      return
    }

    onDebounceChange(value)
  }

  return (
    <>
      <input
        // id={inputId}
        data-slot="input"
        className={tags.input()}
        type="text"
        // value={search}
        placeholder="Search for..."
        onKeyUp={onKeyUp}
        onKeyDown={onKeyDown}
        // onClick={onOpenChange}
        // disabled={isDisabled || isLoading || isCreatingItem}
        // readOnly={isReadOnly}
        // {...onInputEvents}
        ref={refs.inputRef}
      />
    </>
  )
}
