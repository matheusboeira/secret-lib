import type { CreateStoreReturn } from '@/lib/core/stores/create-store'
import { createContext } from 'react'

export const TagContext = createContext<CreateStoreReturn<unknown> | null>(null)
