import { PageLayout } from '@/components/page-layout'
import { Tags } from '@/lib/components'
import { TagItem } from '@/lib/components/tags/tags-item'
import { useState } from 'react'

export const PreviewTags = () => {
  const [state, setState] = useState<string[]>([])

  return (
    <PageLayout title="Preview Tags">
      <Tags
        items={[
          { _id: '1', name: 'Test 1' },
          { _id: '2', name: 'Test 2' }
        ]}
        selectedItems={[{ _id: '2', name: 'Test 2' }]}
      >
        {(item) => (
          <TagItem key={item._id} value={item}>
            <div>{item.name}</div>
          </TagItem>
        )}
      </Tags>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </PageLayout>
  )
}
