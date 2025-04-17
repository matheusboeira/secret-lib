import type React from 'react'
import { TagListItems } from './tags.list-items'
import { TagProvider } from './tags.provider'
import { TagsSearch } from './tags.search'
import { SelectedItems } from './tags.selected-items'
import { TagsWrapper } from './tags.wrapper'

type TagsProps<T> = {
  items: T[]
  selectedItems?: T[]
  children: (item: T) => React.ReactNode
}

export const Tags = <T extends ArrayLike<object>>({
  items,
  selectedItems,
  children
}: TagsProps<T>) => {
  return (
    <TagProvider items={items} selectedItems={selectedItems}>
      <TagsWrapper>
        <div className="relative flex flex-row flex-wrap items-center gap-1">
          <SelectedItems />
          <TagsSearch />
        </div>
        <TagListItems>{children}</TagListItems>
      </TagsWrapper>
    </TagProvider>
  )
}
