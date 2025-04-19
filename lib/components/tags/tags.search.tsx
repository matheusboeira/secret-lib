import { useStateDebounce } from '@/lib/hooks/use-state-debounce'
import { useShakeAnimation } from '@/lib/hooks/use-shake-animation'
import { type KeyboardEvent, forwardRef, useImperativeHandle } from 'react'
import type { TagSearchHandlers } from './@types'
import { useTagStore } from './hooks/use-tag-context'
import { tags } from './tags.variants'

const TagsSearchComponent = (
  props: TagSearchHandlers,
  ref: React.Ref<HTMLInputElement>
) => {
  const refs = useTagStore((state) => state.refs)
  const disclosure = useTagStore((state) => state.disclosure)
  const allowCustomValues = useTagStore((state) => state.allowCustomValues)
  const onSearch = useTagStore((state) => state.onSearch)
  const onBackspace = useTagStore((state) => state.onBackspace)
  const onAddItem = useTagStore((state) => state.onAddItem)
  const onSelectItem = useTagStore((state) => state.onSelectItem)
  const onFindItem = useTagStore((state) => state.onFindItem)
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
      type="text"
      data-slot="input"
      className={tags.input()}
      value={search}
      onChange={(e) => onHandleSearch(e.currentTarget.value)}
      placeholder="Search for..."
      onKeyDown={onKeyDown}
      ref={refs.inputRef}
      {...props}
    />
  )
}

export const TagsSearch = forwardRef(TagsSearchComponent)

TagsSearchComponent.displayName = 'SecretLib.TagsSearch'
