import { Tooltip } from '../lib/components'

function App() {
  return (
    <div className="p-4 dark">
      <h1 className="text-2xl mb-4">Preview da Lib</h1>
      <Tooltip content={'Hello, world!'}>
        <button type="button" className="border border-gray-200">
          Botão 1
        </button>
      </Tooltip>
    </div>
  )
}

export default App
