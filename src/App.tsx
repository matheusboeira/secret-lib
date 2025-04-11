import { useState } from 'react'
import { Tooltip } from '../lib'

function App() {
  const [isOpen, setOpen] = useState(false)

  return (
    <div className="p-4 h-dvh">
      <h1 className="text-2xl mb-4">Preview da Lib</h1>
      <Tooltip
        content={'Hello, world!'}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onClick={(e) => {
          console.log('?', e.metaKey)
        }}
      >
        <button type="button" className="border border-gray-200">
          Botão 1
        </button>
      </Tooltip>
      {isOpen ? 'sim' : 'não'}
    </div>
  )
}

export default App
