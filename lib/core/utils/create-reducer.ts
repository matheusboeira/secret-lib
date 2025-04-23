export type HandlerType<S, A extends { type: string }> = {
  [K in A['type']]?: (state: S, action: Extract<A, { type: K }>) => S
}

export type AfterAction<S> = {
  condition?: boolean
  afterAction: (nextState: S, previousState: S) => void
}

export const createReducer = <S, A extends { type: string }>(
  handlers: HandlerType<S, A>,
  afterAction?: AfterAction<S>
) => {
  return (state: S, action: A): S => {
    const handler = (handlers as any)?.[action.type] as
      | ((state: S, action: A) => S)
      | undefined

    const previousState = state
    const nextState = handler ? handler(previousState, action) : previousState

    if (afterAction?.condition) {
      queueMicrotask(() => afterAction.afterAction(nextState, previousState))
    }

    return nextState
  }
}
