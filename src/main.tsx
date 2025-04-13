import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '../lib/index.css'
import { scan } from 'react-scan'

scan({})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
