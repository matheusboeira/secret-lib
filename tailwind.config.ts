import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./lib/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {}
  },
  darkMode: 'class',
  plugins: []
}

export default config
