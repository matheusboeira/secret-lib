import { Tooltip } from '../lib'

function App() {
  return (
    <div className="p-4 flex flex-col gap-10 h-dvh">
      <h1 className="text-2xl mb-4">Preview da Lib</h1>
      <Tooltip content={'Hello, world!'}>
        <button type="button" className="border border-gray-200 w-32">
          Botão 1
        </button>
      </Tooltip>
      <Tooltip content={'Teste!!!!'}>
        <button type="button" className="border border-gray-200 w-32">
          Botão 2
        </button>
      </Tooltip>
      <Tooltip
        content={
          <div className="flex flex-col gap-2">
            <h1>Teste</h1>
            <p>lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        }
      >
        <button type="button" className="border border-gray-200 w-32">
          Botão 3
        </button>
      </Tooltip>
    </div>
  )
}

export default App
