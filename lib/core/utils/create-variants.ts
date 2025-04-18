export type ClassDictionary = Record<string, any>
export type ClassValue =
  | ClassDictionary
  | string
  | number
  | bigint
  | null
  | boolean
  | undefined

type CreateVariantsFunction = ((extra?: ClassValue[]) => string) & {
  base: string
}

export const createVariants = <T extends Record<string, string[]>>(
  classes: T
): { [K in keyof T]: CreateVariantsFunction } => {
  const result = {} as { [K in keyof T]: CreateVariantsFunction }

  for (const key in classes) {
    const baseArray = classes[key] as string[]
    const baseString = baseArray.filter(Boolean).join(' ')

    const fn = (extra: ClassValue[] = []) =>
      [...baseArray, ...extra].filter(Boolean).join(' ')

    result[key] = Object.assign(fn, { base: baseString })
  }

  return result
}
