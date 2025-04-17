/**
 * Check if two values are equal by comparing their types and values.
 *
 * @param value - The first value to compare.
 * @param other - The second value to compare.
 * @returns true if the values are equal, false otherwise.
 */
export const isEqual = (value: any, other: any): boolean => {
  if (value === other) return true
  if (value == null || other == null) return false
  if (typeof value !== typeof other) return false
  if (typeof value !== 'object' && typeof other !== 'object') return false

  /** Special case for possible id's */
  if (value.id && other.id && value.id === other.id) return true
  if (value._id && other._id && value._id === other._id) return true

  if (Array.isArray(value) && Array.isArray(other)) {
    if (value.length !== other.length) return false

    for (let i = 0; i < value.length; i++)
      if (!isEqual(value[i], other[i])) return false

    return true
  }

  if (!Array.isArray(value) && !Array.isArray(other)) {
    const valueKeys = Object.keys(value)
    const otherKeys = Object.keys(other)

    if (valueKeys.length !== otherKeys.length) return false

    for (const key of valueKeys)
      if (!otherKeys.includes(key) || !isEqual(value[key], other[key]))
        return false

    return true
  }

  return false
}
