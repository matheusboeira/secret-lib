import { useTagContext } from './hooks/use-tag-context'
import { tags } from './tags.variants'

type ForceKey = { key: string }

type TagItemProps<T extends object> = ForceKey & {
  value: T
  children: React.ReactNode
}

export const TagItem = <T extends object>({
  value,
  children
}: TagItemProps<T>) => {
  const { onSelectItem } = useTagContext<T>()

  return (
    <div className="grid grid-cols-[1fr_auto] items-center justify-between gap-1 w-full">
      <button
        type="button"
        className={tags.tagItem()}
        onClick={() => onSelectItem(value)}
      >
        {children}
      </button>
      {JSON.stringify(value)}
    </div>
  )
}
