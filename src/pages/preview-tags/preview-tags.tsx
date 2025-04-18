import { PageLayout } from '@/components/page-layout'
import { Tags } from '@/lib/components'
import { TagItem } from '@/lib/components/tags/tags-item'

const randomItems = Array.from({ length: 2 }, (_, i) => `Item ${i + 1}`)

export const PreviewTags = () => {
  return (
    <PageLayout title="Preview Tags">
      <Tags
        items={randomItems}
        selectedItems={[randomItems[0]]}
        allowCustomValues={false}
      >
        {(item) => (
          <TagItem key={item} value={item}>
            {item}
          </TagItem>
        )}
      </Tags>
    </PageLayout>
  )
}
