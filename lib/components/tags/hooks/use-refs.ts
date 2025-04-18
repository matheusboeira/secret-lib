import { type RefObject, useRef } from 'react'

export type TagRefs = {
  inputWrapperRef: RefObject<HTMLDivElement | null>
  inputRef: RefObject<HTMLInputElement | null>
  listItemsRef: RefObject<HTMLDivElement | null>
  openButtonRef: RefObject<HTMLButtonElement | null>
  selectedItemsWrapperRef: RefObject<HTMLUListElement | null>
  itemsRef: RefObject<HTMLDivElement[] | null>
}

export const useTagRefs = (): TagRefs => {
  const inputWrapperRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const listItemsRef = useRef<HTMLDivElement | null>(null)
  const openButtonRef = useRef<HTMLButtonElement | null>(null)
  const selectedItemsWrapperRef = useRef<HTMLUListElement | null>(null)
  const itemsRef = useRef<HTMLDivElement[] | null>(null)

  return {
    inputWrapperRef,
    inputRef,
    listItemsRef,
    openButtonRef,
    selectedItemsWrapperRef,
    itemsRef
  }
}
