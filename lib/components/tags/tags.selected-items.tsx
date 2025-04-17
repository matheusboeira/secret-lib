import { useTagContext } from './hooks/use-tag-context'

export const SelectedItems = <T,>() => {
  const { selectedItems, refs } = useTagContext<T>()

  return (
    <ul
      className="flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900"
      ref={refs.selectedItemsRef}
    >
      {selectedItems?.map((item) => (
        <li key={JSON.stringify(item)}>{JSON.stringify(item)}</li>
      ))}
    </ul>
  )
}
