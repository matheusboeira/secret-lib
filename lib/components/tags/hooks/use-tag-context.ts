import { useContext } from 'react'
import { TagsContext } from '../context/tags.context'
import type { TagContextProps } from '../@types'

export const useTagContext = <T>() => {
  const context = useContext(TagsContext) as TagContextProps<T>

  if (!context) {
    throw new Error('useTagContext must be used within a TagProvider')
  }

  return context
}
