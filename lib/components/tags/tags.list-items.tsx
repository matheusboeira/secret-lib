import { useTagContext } from './hooks/use-tag-context'
import { tags } from './tags.variants'

type TagListItemsProps<T> = {
  children: React.ReactNode | ((items: T) => React.ReactNode)
}

export const TagListItems = <T,>({ children }: TagListItemsProps<T>) => {
  // const { items } = useTagContext<T>()
  // const [shouldFlip, setShouldFlip] = useState(false)
  const { refs, disclosure, filteredItems } = useTagContext<T>()
  const { isOpen, onOpenChange } = disclosure

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (!isOpen || !menuRef.current) return
  //     const menuRect = menuRef.current.getBoundingClientRect()
  //     const viewportHeight = window.innerHeight

  //     if (placement === 'top' && menuRect.top <= viewportHeight) {
  //       setShouldFlip(false)
  //       return
  //     }

  //     if (menuRect.bottom > viewportHeight) {
  //       setShouldFlip(true)
  //     }
  //   }

  //   handleResize()
  //   window.addEventListener('resize', handleResize)

  //   return () => {
  //     window.removeEventListener('resize', handleResize)
  //     setShouldFlip(false)
  //   }
  // }, [isOpen, placement])

  return (
    <>
      <button type="button" ref={refs.openButtonRef} onClick={onOpenChange}>
        Trocar!
      </button>
      <div
        role="menu"
        ref={refs.listItemsRef}
        aria-orientation="vertical"
        className={tags.listItems([
          isOpen && 'opacity-100 translate-y-0 pointer-events-auto'
        ])}
      >
        {filteredItems?.length === 0 && 'No items found.'}
        {filteredItems?.map((item) =>
          typeof children === 'function' ? children(item) : children
        )}
      </div>
    </>
  )
}
