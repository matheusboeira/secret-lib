import { PageLayout } from '@/components/page-layout'
import { Tags } from '@/lib/components'
import { useRef, useState } from 'react'

const randomItems = Array.from({ length: 1000 }, (_, i) => ({
  id: i.toString(),
  name: `Item ${i + 1}`,
  description: `Description ${i + 1}`,
  price: i + 1
}))

export const PreviewTags = () => {
  const [selected, setSelected] = useState<(typeof randomItems)[number][]>([])
  const ref = useRef<HTMLInputElement>(null)

  return (
    <PageLayout title="Preview Tags">
      <button
        type="button"
        onClick={() => {
          setSelected([])
          ref.current?.focus()
        }}
      >
        Reset
      </button>
      <Tags
        items={randomItems}
        selectedItems={selected}
        onSelectionChange={setSelected}
        label="Tags"
        allowCustomValues
        ref={ref}
      >
        {(item) => <div>{item.name}</div>}
      </Tags>
      <pre className="mt-96">{JSON.stringify(selected, null, 2)}</pre>
    </PageLayout>
  )
}
