import { PageLayout } from '@/components/page-layout'
import { Tags } from '@/lib/components'
import { useRef, useState } from 'react'

const randomItems = Array.from({ length: 15 }, (_, i) => `Item ${i + 1}`)

export const PreviewTags = () => {
  const [selected, setSelected] = useState<string[]>([])
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
        allowCustomValues
        ref={ref}
      >
        {(item) => <div>{item}</div>}
      </Tags>
    </PageLayout>
  )
}
