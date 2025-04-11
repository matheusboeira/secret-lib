type ClassNames = {
  base?: string
  content?: string
}

type MouseEvents = {
  onMouseEnter?: React.MouseEventHandler<HTMLElement>
  onMouseLeave?: React.MouseEventHandler<HTMLElement>
  onMouseMove?: React.MouseEventHandler<HTMLElement>
  onClick?: React.MouseEventHandler<HTMLElement>
}

export type TooltipProps = Omit<MouseEvents, 'onMouseMove'> & {
  /**
   * Children to be wrapped by the tooltip.
   */
  children: React.ReactElement<MouseEvents>
  /**
   * Content to be displayed in the tooltip.
   * Can be a ReactNode or a function that returns a ReactNode.
   */
  content: React.ReactNode | ((show: boolean) => React.ReactNode)
  /**
   * Offset for the tooltip position.
   * @default { x: 10, y: 15 }
   */
  offset?: { x: number; y: number }
  /**
   * Whether the tooltip is disabled.
   * @default false
   */
  isDisabled?: boolean
  /**
   * Custom class names for the tooltip.
   */
  classNames?: ClassNames
  /**
   * Where the children is going to be rendered.
   *
   * @default document.body
   */
  portalChildren?: HTMLElement
}
