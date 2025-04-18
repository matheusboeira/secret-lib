import { CloseIcon, SelectorIcon } from '@/lib/core/icons'
import type React from 'react'
import { forwardRef } from 'react'
import type { TagsProps } from './@types'
import { TagListItems } from './tags.list-items'
import { TagProvider } from './tags.provider'
import { TagsSearch } from './tags.search'
import { SelectedItems } from './tags.selected-items'
import { TagsWrapper } from './tags.wrapper'

const TagsComponent = <T,>(
  { children, renderValue, onBlur, onFocus, ...props }: TagsProps<T>,
  ref: React.Ref<HTMLInputElement>
) => {
  return (
    <TagProvider {...props}>
      <TagsWrapper>
        <div className="relative flex items-center flex-wrap gap-1">
          <SelectedItems
            renderValue={renderValue}
            search={<TagsSearch onBlur={onBlur} onFocus={onFocus} ref={ref} />}
          >
            {children}
          </SelectedItems>
        </div>
        <div className="flex items-center self-start gap-1.5 p-2">
          <CloseIcon />
          <button
            type="button"
            // ref={refs.openButtonRef}
            // className={tags.openListButton()}
            // {...pressProps}
          >
            <SelectorIcon className="size-4" />
          </button>
        </div>
        <TagListItems>{children}</TagListItems>
      </TagsWrapper>
    </TagProvider>
  )
}

export const Tags = forwardRef(TagsComponent)

TagsComponent.displayName = 'SecretLib.Tags'
