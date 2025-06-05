import { Chip, type ChipProps, Tooltip } from '@/lib/components'
import { PaintBucket } from 'lucide-react'

export type ChipItem = {
  name: string
  color: string
  type: string
}

type ChipPickerProps = {
  item: ChipItem
  onChange?: (item: ChipItem) => void
  onClose?: () => void
}

export const ChipPicker = ({ item, onClose, onChange }: ChipPickerProps) => {
  if (!item) {
    return null
  }

  const cycleColors = (color: ChipProps['color']) => {
    const colors: ChipProps['color'][] = ['default', 'blue']
    const index = colors.indexOf(color)
    const nextIndex = (index + 1) % colors.length
    return colors[nextIndex] || 'default'
  }

  return (
    <Tooltip
      content={
        <div className="flex items-center text-xs gap-1">
          Change Color <PaintBucket className="size-4" />
        </div>
      }
      classNames={{
        content: item.color === 'blue' ? '!bg-blue-500' : '!bg-green-700'
      }}
      onClick={() => {
        onChange?.({
          name: item.name,
          color: cycleColors(item.color as ChipProps['color']),
          type: item.type
        })
      }}
    >
      <Chip onClose={onClose}>{item.name}</Chip>
    </Tooltip>
  )
}
