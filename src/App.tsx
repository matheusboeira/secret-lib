import { Tooltip } from '../lib'

function App() {
  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Preview da Lib</h1>
      <Tooltip content={'Hello, world!'}>
        <button type="button" className="border border-gray-200">
          Botão 1
        </button>
      </Tooltip>
      <Tooltip content={'Hello, world!'}>
        <button type="button" className="border border-gray-200">
          Botão 2
        </button>
      </Tooltip>
      <Tooltip content={'Hello, world!'}>
        <button type="button" className="border border-gray-200">
          Botão 3
        </button>
      </Tooltip>
      <Tooltip content={'Hello, world!'}>
        <button type="button" className="border border-gray-200">
          Botão 4
        </button>
      </Tooltip>
    </div>
  )
}

export default App
