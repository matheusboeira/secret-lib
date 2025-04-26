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
      <Autocomplete
        items={randomItems}
        selectedItems={selected}
        onSelectionChange={setSelected}
        label="Autocomplete"
        placeholder="Search for an item..."
        emptyContent={
          <span className="text-red-500">
            No item found. Try another search.
          </span>
        }
        description="This is a description"
        allowCustomValues={(value) => ({
          id: value,
          name: `Item ${value}`,
          description: `Description ${value}`,
          price: 100
        })}
        isRequired
        ref={ref}
      >
        {(item) => item.name}
      </Autocomplete>
      <pre className="mt-80">{JSON.stringify(selected, null, 2)}</pre>
    </PageLayout>
  )
}
