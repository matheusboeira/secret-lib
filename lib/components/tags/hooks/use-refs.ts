import { type RefObject, useRef } from 'react'

export type TagRefs = {
  inputWrapperRef: RefObject<HTMLDivElement | null>
  inputRef: RefObject<HTMLInputElement | null>
  listItemsRef: RefObject<HTMLDivElement | null>
  openButtonRef: RefObject<HTMLButtonElement | null>
  selectedItemsRef: RefObject<HTMLUListElement | null>
}

export const useTagRefs = (): TagRefs => {
  const inputWrapperRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const listItemsRef = useRef<HTMLDivElement | null>(null)
  const openButtonRef = useRef<HTMLButtonElement | null>(null)
  const selectedItemsRef = useRef<HTMLUListElement | null>(null)

  return {
    inputWrapperRef,
    inputRef,
    listItemsRef,
    openButtonRef,
    selectedItemsRef
  }
}
