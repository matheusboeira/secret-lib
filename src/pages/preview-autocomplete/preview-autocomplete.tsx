import { PageLayout } from '@/components/page-layout'
import { Autocomplete } from '@/lib/components'
import { useRef, useState } from 'react'
import type { ChipItem } from './chip-picker/chip-picker'

const randomItems = Array.from({ length: 100 }, (_, i) => {
  return {
    name: `Item ${i}`,
    color: 'blue',
    type: 'item'
  } satisfies ChipItem
})

export const PreviewAutocomplete = () => {
  const [selected, setSelected] = useState<(typeof randomItems)[number][]>([])
  const ref = useRef<HTMLInputElement>(null)

  return (
    <PageLayout title="Preview Autocomplete">
      <Autocomplete
        items={randomItems}
        selectedItems={selected}
        onSelectionChange={setSelected}
        label="Autocomplete"
        allowCustomValues={(value) => ({
          name: value,
          color: 'default',
          type: 'item'
        })}
        isRequired
        ref={ref}
      >
        {(item) => <div key={item.name}>{item.name}</div>}
      </Autocomplete>
      <pre className="mt-80">{JSON.stringify(selected, null, 2)}</pre>
    </PageLayout>
  )
}
