import { useDebounce } from '@/lib/hooks'
import { useShakeAnimation } from '@/lib/hooks/use-shake-animation'
import { type KeyboardEvent, useState } from 'react'
import { useTagStore } from './hooks/use-tag-context'
import { tags } from './tags.variants'

export const TagsSearch = () => {
  const refs = useTagStore((state) => state.refs)
  const onSearch = useTagStore((state) => state.onSearch)
  const onBackspace = useTagStore((state) => state.onBackspace)
  const onAddItem = useTagStore((state) => state.onAddItem)
  const onSelectItem = useTagStore((state) => state.onSelectItem)
  const allowCustomValues = useTagStore((state) => state.allowCustomValues)
  const { shake } = useShakeAnimation({ ref: refs.inputRef })
  const [search, setSearch] = useState('')

  const { onDebounceChange } = useDebounce({
    callback: onSearch,
    delay: 300
  })

  const onHandleSearch = (value: string) => {
    setSearch(value)
    onDebounceChange(value)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value

    if (e.key === 'Enter') {
      e.preventDefault()
      onHandleSearch('')

      if (value.length === 0) {
        shake()
        return
      }

      if (!allowCustomValues) {
        onSelectItem(value)
        return
      }

      const isFunction = typeof allowCustomValues === 'function'
      onAddItem(isFunction ? allowCustomValues(value) : value)
    }

    if (e.key === 'Backspace' && value.length === 0) {
      onBackspace()
    }
  }

  return (
    <input
      type="text"
      data-slot="input"
      className={tags.input()}
      value={search}
      onChange={(e) => onHandleSearch(e.currentTarget.value)}
      placeholder="Search for..."
      onKeyDown={onKeyDown}
      ref={refs.inputRef}
    />
  )
}

TagsSearch.displayName = 'SecretLib.TagsSearch'
