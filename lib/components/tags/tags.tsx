import type React from 'react'
import { forwardRef } from 'react'
import type { TagsProps } from './@types'
import { TagListItems } from './tags.list-items'
import { TagProvider } from './tags.provider'
import { TagsSearch } from './tags.search'
import { SelectedItems } from './tags.selected-items'
import { TagsWrapper } from './tags.wrapper'

const TagsComponent = <T,>(
  { children, renderValue, ...props }: TagsProps<T>,
  ref: React.Ref<HTMLInputElement>
) => {
  return (
    <TagProvider {...props}>
      <TagsWrapper>
        <div className="relative flex flex-row flex-wrap items-center gap-1">
          <SelectedItems renderValue={renderValue}>{children}</SelectedItems>
          <TagsSearch ref={ref} />
        </div>
        <TagListItems>{children}</TagListItems>
      </TagsWrapper>
    </TagProvider>
  )
}

export const Tags = forwardRef(TagsComponent)

TagsComponent.displayName = 'SecretLib.Tags'
