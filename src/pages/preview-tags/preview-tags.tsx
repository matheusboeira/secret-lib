import { PageLayout } from '@/components/page-layout'
import { Tags } from '@/lib/components'
import { useRef, useState } from 'react'

const randomItems = Array.from({ length: 15 }, (_, i) => `Item ${i + 1}`)

const randomComplexItems = Array.from({ length: 2 }, (_, i) => ({
  id: `${i + 1}`,
  label: `Item ${i + 1}`,
  color: 'primary'
}))

export const PreviewTags = () => {
  const [selected, setSelected] = useState<string[]>([])
  const [selectedComplex, setSelectedComplex] = useState<
    (typeof randomComplexItems)[number][]
  >([])
  const ref = useRef<HTMLInputElement>(null)

  return (
    <PageLayout title="Preview Tags">
      <button type="button" onClick={() => setSelected([])}>
        Reset
      </button>
      <Tags
        items={randomItems}
        selectedItems={selected}
        onSelectionChange={setSelected}
        allowCustomValues
        ref={ref}
      >
        {(item) => <div>{item}</div>}
      </Tags>
      <Tags
        items={randomComplexItems}
        selectedItems={selectedComplex}
        onSelectionChange={setSelectedComplex}
      >
        {(item) => <div>{item.label}</div>}
      </Tags>
      <pre className="mt-64">
        {JSON.stringify({ selected, selectedComplex }, null, 2)}
      </pre>
    </PageLayout>
  )
}
