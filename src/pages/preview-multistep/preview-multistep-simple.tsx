import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Text } from '@/components/text'
import { useMultistep } from '@/lib/hooks'

export const PreviewMultistepSimple = () => {
  const [
    step,
    {
      goToNextStep,
      goToPreviousStep,
      canGoToNextStep,
      canGoToPreviousStep,
      isLastStep,
      isFirstStep,
      currentIndex,
      length,
      reset,
      setStep
    }
  ] = useMultistep(5)

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl">Preview Multistep Simple</h1>
      <div className="flex flex-wrap gap-2 items-center">
        <Button onClick={goToNextStep}>Go to next step</Button>
        <Button onClick={goToPreviousStep}>Go to previous step</Button>
        <Button onClick={reset}>Reset</Button>
        <Input
          type="number"
          defaultValue={0}
          onBlur={(e) => setStep(Number(e.currentTarget.value))}
        />
      </div>
      <div className="flex flex-col gap-1">
        <Text title="Step: ">{step}</Text>
        <Text title="Length: ">{length}</Text>
        <Text title="Current index: ">{currentIndex}</Text>
        <Text title="Is first step: " type={isFirstStep ? 'success' : 'danger'}>
          {isFirstStep.toString()}
        </Text>
        <Text title="Is last step: " type={isLastStep ? 'success' : 'danger'}>
          {isLastStep.toString()}
        </Text>
        <Text
          title="Can go to next step: "
          type={canGoToNextStep ? 'success' : 'danger'}
        >
          {canGoToNextStep.toString()}
        </Text>
        <Text
          title="Can go to previous step: "
          type={canGoToPreviousStep ? 'success' : 'danger'}
        >
          {canGoToPreviousStep.toString()}
        </Text>
      </div>
    </div>
  )
}
