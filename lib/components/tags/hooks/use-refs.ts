import { type RefObject, useRef } from 'react'

export type TagRefs = {
  inputWrapperRef: RefObject<HTMLDivElement | null>
  inputRef: RefObject<HTMLInputElement | null>
  listItemsRef: RefObject<HTMLDivElement | null>
  openButtonRef: RefObject<HTMLButtonElement | null>
  selectedItemsWrapperRef: RefObject<HTMLUListElement | null>
  buttomItemRefs: RefObject<HTMLButtonElement[]>
  clearButtonRef: RefObject<HTMLButtonElement | null>
}

export const useTagRefs = (): TagRefs => {
  const inputWrapperRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const listItemsRef = useRef<HTMLDivElement | null>(null)
  const openButtonRef = useRef<HTMLButtonElement | null>(null)
  const clearButtonRef = useRef<HTMLButtonElement | null>(null)
  const selectedItemsWrapperRef = useRef<HTMLUListElement | null>(null)
  const buttomItemRefs = useRef<HTMLButtonElement[]>([])

  return {
    inputWrapperRef,
    inputRef,
    listItemsRef,
    openButtonRef,
    selectedItemsWrapperRef,
    buttomItemRefs,
    clearButtonRef
  }
}
