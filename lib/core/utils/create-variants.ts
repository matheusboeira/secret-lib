import { cn } from '@/lib/core/utils/cn'

type ClassArray = ClassValue[]
type ClassDictionary = {
  [x: string]: any
}
export type ClassValue =
  | string
  | number
  | bigint
  | boolean
  | ClassArray
  | ClassDictionary
  | null
  | undefined

type CreateVariantsFunction = (...inputs: ClassValue[]) => string

export const createVariants = <T extends Record<string, string[]>>(
  classes: T
): { [K in keyof T]: CreateVariantsFunction } => {
  const result = {} as { [K in keyof T]: CreateVariantsFunction }

  for (const key in classes) {
    const baseArray = classes[key] as string[]

    const fn: CreateVariantsFunction = (...inputs: ClassValue[]) =>
      cn([baseArray, ...(inputs ?? [])])

    result[key] = fn
  }

  return result
}
