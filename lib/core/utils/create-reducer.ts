export type HandlerType<S, A extends { type: string }> = {
  [K in A['type']]?: (state: S, action: Extract<A, { type: K }>) => S
}

export const createReducer = <S, A extends { type: string }>(
  handlers: HandlerType<S, A>
) => {
  return (state: S, action: A): S => {
    const handler = (handlers as any)?.[action.type] as
      | ((state: S, action: A) => S)
      | undefined

    return handler ? handler(state, action) : state
  }
}
