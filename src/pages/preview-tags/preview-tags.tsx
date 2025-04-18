import { PageLayout } from '@/components/page-layout'
import { Tags } from '@/lib/components'
import { TagItem } from '@/lib/components/tags/tags-item'
import { useState } from 'react'

const randomItems = Array.from({ length: 2 }, (_, i) => `Item ${i + 1}`)

export const PreviewTags = () => {
  const [selected, setSelected] = useState<string[]>([])

  return (
    <PageLayout title="Preview Tags">
      <Tags
        items={randomItems}
        selectedItems={selected}
        onSelectionChange={setSelected}
        allowCustomValues={false}
      >
        {(item) => (
          <TagItem key={item} value={item}>
            {item}
          </TagItem>
        )}
      </Tags>
      <pre className="mt-52">{JSON.stringify(selected, null, 2)}</pre>
    </PageLayout>
  )
}
