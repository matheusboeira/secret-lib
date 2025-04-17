export function useFilteredItems<T extends ArrayLike<object>>(
  items: T[] | undefined,
  search: string | undefined,
  keys?: (keyof T)[]
): T[] | undefined {
  if (!items) return undefined

  const normalizedSearch = search?.toLowerCase().trim()
  if (!normalizedSearch) return items

  return items.filter((item) => {
    const values = keys ? keys.map((key) => item[key]) : Object.values(item)

    for (const value of values) {
      if (
        value != null &&
        String(value).toLowerCase().includes(normalizedSearch)
      ) {
        return true
      }
    }
    return false
  })
}
