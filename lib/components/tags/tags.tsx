import type React from 'react'
import { forwardRef } from 'react'
import type { TagsProps } from './@types'
import { CloseButton } from './buttons/clear-button'
import { OpenListItemsButton } from './buttons/open-list-items-button'
import { TagLabel } from './tag-label'
import { TagListItems } from './tags.list-items'
import { TagProvider } from './tags.provider'
import { TagsSearch } from './tags.search'
import { SelectedItems } from './tags.selected-items'
import { TagsWrapper } from './tags.wrapper'

const TagsComponent = <T,>(
  { children, renderValue, onBlur, onFocus, label, ...props }: TagsProps<T>,
  ref: React.Ref<HTMLInputElement>
) => {
  return (
    <TagProvider {...props}>
      <div className="flex flex-col gap-1">
        {label && <TagLabel>{label}</TagLabel>}
        <TagsWrapper>
          <div className="relative flex items-center flex-wrap gap-1">
            <SelectedItems
              renderValue={renderValue}
              search={
                <TagsSearch onBlur={onBlur} onFocus={onFocus} ref={ref} />
              }
            >
              {children}
            </SelectedItems>
          </div>
          <div className="flex items-center self-start gap-0.5">
            <CloseButton />
            <OpenListItemsButton />
          </div>
          <TagListItems>{children}</TagListItems>
        </TagsWrapper>
      </div>
    </TagProvider>
  )
}

export const Tags = forwardRef(TagsComponent) as <T>(
  props: TagsProps<T> & { ref?: React.Ref<HTMLInputElement> }
) => ReturnType<typeof TagsComponent>

TagsComponent.displayName = 'SecretLib.Tags'
