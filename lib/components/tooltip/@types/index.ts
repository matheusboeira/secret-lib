type ClassNames = {
  base?: string
  content?: string
}

type ChildrenProps = {
  onMouseEnter?: React.MouseEventHandler<HTMLElement>
  onMouseLeave?: React.MouseEventHandler<HTMLElement>
  onMouseMove?: React.MouseEventHandler<HTMLElement>
  onClick?: React.MouseEventHandler<HTMLElement>
  className?: string
}

export type Coordinates = { x: number; y: number }

export type TooltipProps = Omit<ChildrenProps, 'onMouseMove'> & {
  /**
   * Children to be wrapped by the tooltip.
   */
  children: React.ReactElement<ChildrenProps>
  /**
   * Content to be displayed in the tooltip.
   * Can be a ReactNode or a function that returns a ReactNode.
   */
  content: React.ReactNode | ((show: boolean) => React.ReactNode)
  /**
   * Offset for the tooltip position.
   * @default { x: 10, y: 15 }
   */
  offset?: Coordinates
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
   * Where the children is going to be rendered after being hovered.
   * If not provided, only the tooltip will be rendered.
   *
   * @default null
   */
  portalChildren?: HTMLElement | null
  /**
   * Where the tooltip is going to be rendered.
   *
   * @default document.body
   */
  portalTooltip?: HTMLElement
  /**
   * If the tooltip should reanimate (remount component) on click.
   * @default true
   */
  shouldReanimateOnClick?: boolean
}
