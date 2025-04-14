import { useCallback, useState } from 'react'

import type { Dispatch, SetStateAction } from 'react'

interface Helpers {
  currentIndex: number
  isFirstStep: boolean
  isLastStep: boolean
  goToNextStep: () => void
  goToPreviousStep: () => void
  reset: () => void
  canGoToNextStep: boolean
  canGoToPreviousStep: boolean
  setStep: Dispatch<SetStateAction<number>>
  length: number
}

type SetStepCallbackType = (step: number | ((step: number) => number)) => void

export function useMultistep(
  steps: number,
  initialStep?: number
): [number, Helpers]

export function useMultistep(
  steps: React.ReactElement[],
  initialStep?: number
): [React.ReactElement, Helpers]

export function useMultistep(
  steps: number | React.ReactElement[],
  initialStep = 0
): [number | React.ReactElement, Helpers] {
  const maxStep = Array.isArray(steps) ? steps.length : steps
  const [currentStep, setCurrentStep] = useState(() =>
    initialStep < 0 || initialStep > maxStep ? 0 : initialStep
  )
  const canGoToNextStep = currentStep + 1 < maxStep
  const canGoToPreviousStep = currentStep - 1 >= 0

  const setStep = useCallback<SetStepCallbackType>(
    (step) => {
      const newStep = step instanceof Function ? step(currentStep) : step

      if (newStep >= 0 && newStep <= maxStep) {
        setCurrentStep(newStep)
        return
      }

      throw new Error('Step not valid')
    },
    [maxStep, currentStep]
  )

  const goToNextStep = useCallback(() => {
    if (!canGoToNextStep) return
    setCurrentStep((step) => step + 1)
  }, [canGoToNextStep])

  const goToPreviousStep = useCallback(() => {
    if (!canGoToPreviousStep) return
    setCurrentStep((step) => step - 1)
  }, [canGoToPreviousStep])

  const reset = useCallback(() => {
    setCurrentStep((prev) => {
      if (prev === 0) return prev
      return 0
    })
  }, [])

  return [
    Array.isArray(steps) ? steps[currentStep] : currentStep,
    {
      currentIndex: currentStep,
      isFirstStep: currentStep === 0,
      isLastStep: currentStep === maxStep - 1,
      goToNextStep,
      goToPreviousStep,
      canGoToNextStep,
      canGoToPreviousStep,
      setStep,
      reset,
      length: maxStep
    }
  ]
}
