import { useTagContext } from './hooks/use-tag-context'
import { tags } from './tags.variants'

type TagsWrapperProps = {
  children: React.ReactNode
}

export const TagsWrapper = <T,>({ children }: TagsWrapperProps) => {
  const { refs, disclosure } = useTagContext<T>()
  const { isOpen, onOpen } = disclosure

  const onHandleClick = () => {
    refs.inputRef.current?.focus()

    if (
      isOpen ||
      refs.openButtonRef.current === document.activeElement ||
      refs.selectedItemsRef.current === document.activeElement
    ) {
      console.log('parado!')
      return
    }

    onOpen()
    console.log('alalalal')
  }

  return (
    <div
      data-slot="input-wrapper"
      className={
        tags.inputWrapper()
        // document.activeElement === refs.inputRef.current && 'hover:bg-red-900'
      }
      onClick={onHandleClick}
      onKeyDown={() => {}}
    >
      {children}
    </div>
  )
}
