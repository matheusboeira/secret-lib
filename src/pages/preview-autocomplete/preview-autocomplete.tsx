import { PageLayout } from '@/components/page-layout'
import { Autocomplete } from '@/lib/components'
import { useRef, useState } from 'react'

const randomItems = Array.from({ length: 10000 }, (_, i) => ({
  id: i.toString(),
  name: `Item ${i + 1}`,
  description: `Description ${i + 1}`,
  price: i + 1
}))

export const PreviewAutocomplete = () => {
  const [selected, setSelected] = useState<(typeof randomItems)[number][]>([])
  const ref = useRef<HTMLInputElement>(null)

  return (
    <PageLayout title="Preview Autocomplete">
      <button
        type="button"
        onClick={() => {
          setSelected([])
          ref.current?.focus()
        }}
      >
        Reset
      </button>
      <Autocomplete
        items={randomItems}
        selectedItems={selected}
        onSelectionChange={setSelected}
        label="Autocomplete"
        allowCustomValues
        ref={ref}
      >
        {(item) => <div>{item.name}</div>}
      </Autocomplete>
      <pre className="mt-96">{JSON.stringify(selected, null, 2)}</pre>
    </PageLayout>
  )
}
