import type React from 'react'
import { TagListItems } from './tags.list-items'
import { TagProvider } from './tags.provider'
import { TagsSearch } from './tags.search'
import { SelectedItems } from './tags.selected-items'
import { TagsWrapper } from './tags.wrapper'

type TagsProps<T> = {
  items: T[]
  selectedItems?: T[]
  onSelectionChange?: (items: T[]) => void
  renderValue?: (item: T, handlers?: any) => React.ReactNode
  children: (item: T) => React.ReactNode
  allowCustomValues?: boolean | ((item: T) => T)
}

export const Tags = <T,>({
  items,
  selectedItems,
  children,
  renderValue,
  allowCustomValues,
  onSelectionChange
}: TagsProps<T>) => {
  return (
    <TagProvider
      items={items}
      selectedItems={selectedItems}
      allowCustomValues={allowCustomValues}
      onSelectionChange={onSelectionChange}
    >
      <TagsWrapper>
        <div className="relative flex flex-row flex-wrap items-center gap-1">
          <SelectedItems renderValue={renderValue}>{children}</SelectedItems>
          <TagsSearch />
        </div>
        <TagListItems>{children}</TagListItems>
      </TagsWrapper>
    </TagProvider>
  )
}

Tags.displayName = 'SecretLib.Tags'
