import { useTagStore } from './hooks/use-tag-context'

type TagLabelProps = {
  children: React.ReactNode
}

export const TagLabel = ({ children }: TagLabelProps) => {
  const tagId = useTagStore((state) => state.tagId)

  return (
    <label id={`tag-label-${tagId}`} htmlFor={tagId} className="z-10 w-full">
      {children}
    </label>
  )
}
