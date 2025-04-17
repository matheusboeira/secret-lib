const fuzzyMatch = (text: string, pattern: string): boolean => {
  let textIndex = 0
  let patternIndex = 0

  while (textIndex < text.length && patternIndex < pattern.length) {
    if (text[textIndex] === pattern[patternIndex]) patternIndex++
    textIndex++
  }

  return patternIndex === pattern.length
}

export function useFilteredItems<T extends object>(
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
        fuzzyMatch(String(value).toLowerCase(), normalizedSearch)
      ) {
        return true
      }
    }
    return false
  })
}
