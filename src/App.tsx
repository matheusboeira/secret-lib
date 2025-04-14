import { PreviewMultistepSimple } from './pages/preview-multistep/preview-multistep-simple'
import { PreviewMultistepReactElements } from './pages/preview-multistep/preview-multistep.react-elements'

function App() {
  return (
    <div className="p-4 flex flex-col gap-10 h-dvh">
      <h1 className="text-2xl mb-4">Preview da Lib</h1>
      <PreviewMultistepSimple />
      <PreviewMultistepReactElements />
    </div>
  )
}

export default App
