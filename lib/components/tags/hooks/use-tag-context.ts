import type { StoreMethods } from '@/lib/core/stores/hooks/use-global-store'
import { useGlobalStore } from '@/lib/core/stores/hooks/use-global-store'
import { useContext } from 'react'
import type { TagContextProps } from '../@types'
import { TagContext } from '../context/tags.context'

export const useTagContext = <T>() => {
  const context = useContext(TagContext)

  if (!context) {
    throw new Error('useTagContext must be used within a TagProvider')
  }

  return context as StoreMethods<TagContextProps<T>>
}

export const useTagStore = <T, R>(
  selector: (state: TagContextProps<T>) => R
): R => {
  const store = useTagContext<T>()
  return useGlobalStore(selector, store)
}
