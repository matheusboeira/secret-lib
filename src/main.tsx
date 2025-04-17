import React from 'react'
import ReactDOM from 'react-dom/client'
import { scan } from 'react-scan'
import '../lib/index.css'
import App from './App'
import { ThemeInitializer } from './components/theme/theme-initializer'

scan({})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
    <ThemeInitializer />
  </React.StrictMode>
)
