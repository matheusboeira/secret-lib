import { useShallow } from 'zustand/shallow'
import { useThemeStore } from './theme-initializer'

export const ThemeSwitcher = () => {
  const [theme, toggleTheme] = useThemeStore(
    useShallow((state) => [state.theme, state.toggleTheme])
  )

  return (
    <button type="button" onClick={toggleTheme}>
      Current Theme: {theme === 'dark' ? 'dark' : 'light'}
    </button>
  )
}

export default ThemeSwitcher
