import { useTagStore } from './hooks/use-tag-context'
import { tags } from './tags.variants'

type TagsWrapperProps = {
  children: React.ReactNode
}

export const TagsWrapper = ({ children }: TagsWrapperProps) => {
  const refs = useTagStore((state) => state.refs)
  const disclosure = useTagStore((state) => state.disclosure)

  const onHandleClick = () => {
    refs.inputRef.current?.focus()

    if (
      disclosure.isOpen ||
      refs.openButtonRef.current === document.activeElement ||
      refs.selectedItemsWrapperRef.current === document.activeElement
    ) {
      return
    }

    disclosure.onOpen()
  }

  return (
    <div
      data-slot="base-wrapper"
      className={tags.baseWrapper([
        document.activeElement === refs.inputRef.current && 'hover:bg-red-900'
      ])}
      onClick={onHandleClick}
      onKeyDown={() => {}}
      ref={refs.inputWrapperRef}
    >
      {children}
    </div>
  )
}

TagsWrapper.displayName = 'SecretLib.TagsWrapper'
