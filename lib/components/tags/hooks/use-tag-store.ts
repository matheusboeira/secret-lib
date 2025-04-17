import { useGlobalStore } from '@/lib/utils/create-store'
import { createTagStore } from '../stores/tag-store'

let storeInstance: ReturnType<typeof createTagStore<any>> | null = null

export const initTagStore = <T>() => {
  storeInstance = createTagStore<T>()
  return storeInstance
}

export const useTagStore = <T>(selector: (state: any) => T): T => {
  if (!storeInstance) throw new Error('Tag store not initialized')
  return useGlobalStore(selector, storeInstance)
}

export const setTagStore = (partial: Partial<any>) => {
  if (!storeInstance) throw new Error('Tag store not initialized')
  storeInstance.set(partial)
}
