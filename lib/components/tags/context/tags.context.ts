import { createContext } from 'react'
import type { TagContextProps } from '../@types'

export const TagsContext = createContext<TagContextProps<any> | null>(null)
