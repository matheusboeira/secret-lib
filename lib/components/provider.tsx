import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode
} from 'react'

type Listener<T> = (state: T) => void

// ---------------- STORE CORE ----------------
export const createStore = <TState,>(initialState: TState) => {
  let state = initialState
  const listeners = new Set<Listener<TState>>()

  const get = () => state

  const set = (partial: Partial<TState>) => {
    state = { ...state, ...partial }
    listeners.forEach((listener) => listener(state))
  }

  const subscribe = (listener: Listener<TState>) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  }

  return { get, set, subscribe }
}

export function useGlobalStore<T, TState>(
  selector: (state: TState) => T,
  store: {
    get: () => TState
    subscribe: (cb: (s: TState) => void) => () => void
  }
): T {
  const [selectedState, setSelectedState] = useState(() =>
    selector(store.get())
  )

  useEffect(() => {
    const callback = (newState: TState) => {
      const nextSelected = selector(newState)
      setSelectedState((prev) =>
        Object.is(prev, nextSelected) ? prev : nextSelected
      )
    }

    return store.subscribe(callback)
  }, [selector, store.subscribe])

  return selectedState
}

// ---------------- CONTEXT ----------------
type Disclosure = {
  isOpen: boolean
  onOpenChange: () => void
}

type TagStoreState<T> = {
  items: T[]
  selectedItems: T[]
  disclosure: Disclosure
}

const TagContext = createContext<ReturnType<typeof createStore<TagStoreState<any>>> | null>(null)

export const useTagStoreContext = () => {
  const ctx = useContext(TagContext)
  if (!ctx) throw new Error('TagContext not found')
  return ctx
}

// ---------------- PROVIDER ----------------
type TagProviderProps<T> = {
  items: T[]
  selectedItems: T[]
  children: ReactNode
}

export function TagProvider<T>({
  items,
  selectedItems,
  children
}: TagProviderProps<T>) {
  const [store] = useState(() =>
    createStore<TagStoreState<T>>({
      items,
      selectedItems,
      disclosure: {
        isOpen: false,
        onOpenChange: () => {
          store.set({
            disclosure: {
              ...store.get().disclosure,
              isOpen: !store.get().disclosure.isOpen
            }
          })
        }
      }
    })
  )

  return <TagContext.Provider value={store}>{children}</TagContext.Provider>
}

export const DisclosureButton = () => {
  const store = useTagStoreContext()
  const disclosure = useGlobalStore((state) => state.disclosure, store)

  console.log('🔄 DisclosureButton renderizou')

  return (
    <button
      onClick={disclosure.onOpenChange}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      {disclosure.isOpen ? 'Fechar' : 'Abrir'}
    </button>
  )
}

const mockItems = [
  { id: 1, label: 'React' },
  { id: 2, label: 'TypeScript' }
]

export  function Teste() {
  return (
    <TagProvider items={mockItems} selectedItems={[mockItems[0]]}>
      <div className="p-6">
        <h1 className="text-xl font-bold mb-4">Store com contexto reativo</h1>
        <DisclosureButton />
      </div>
    </TagProvider>
  )
}

