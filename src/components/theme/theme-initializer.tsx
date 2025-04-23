import { useEffect } from 'react'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type Theme = 'system' | 'dark' | 'light'

type ThemeStoreProps = {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

export const ThemeInitializer = () => {
  const theme = useThemeStore((state) => state.theme)

  useEffect(() => {
    const applyTheme = () => {
      const rootNode = window.document.documentElement
      rootNode.classList.remove('dark', 'light')

      if (theme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
          .matches
          ? 'dark'
          : 'light'

        rootNode.classList.add(systemTheme)
        return
      }

      rootNode.classList.add(theme)
    }

    const rafId = requestAnimationFrame(applyTheme)

    return () => cancelAnimationFrame(rafId)
  }, [theme])

  return null
}

export const useThemeStore = create<ThemeStoreProps>()(
  devtools(
    persist<ThemeStoreProps>(
      (set, get) => ({
        theme: 'dark',
        setTheme: (theme: Theme) => set({ theme }),
        toggleTheme: () =>
          get().setTheme(get().theme === 'dark' ? 'light' : 'dark')
      }),
      {
        name: 'theme'
      }
    )
  )
)
