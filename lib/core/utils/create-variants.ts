export type ClassDictionary = Record<string, any>
export type ClassValue =
  | ClassDictionary
  | string
  | number
  | bigint
  | null
  | boolean
  | undefined

type CreateVariantsFunction = (extra?: ClassValue[]) => string

const simpleCn = (...classLists: (string | undefined | null | false)[]) => {
  const classMap = new Map<string, string>()
  const allClasses = classLists.filter(Boolean).join(' ').trim().split(/\s+/)

  for (const cls of allClasses) {
    const parts = cls.split(':')
    const utility = parts.pop() ?? ''
    const prefix = parts.join(':')
    const base = utility.split('-[')[0].split('-')[0]
    const key = prefix ? `${prefix}:${base}` : base

    classMap.set(key, cls)
  }

  return Array.from(classMap.values()).join(' ')
}

export const createVariants = <T extends Record<string, string[]>>(
  classes: T
): { [K in keyof T]: CreateVariantsFunction } => {
  const result = {} as { [K in keyof T]: CreateVariantsFunction }

  for (const key in classes) {
    const baseArray = classes[key] as string[]

    const fn: CreateVariantsFunction = (extra: ClassValue[] = []) =>
      simpleCn([...baseArray, ...extra].filter(Boolean).join(' '))

    result[key] = fn
  }

  return result
}
