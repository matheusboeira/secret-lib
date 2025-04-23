import { memo } from 'react'
import { iconVariants } from './icon.variants'

export const XIcon = memo((props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      tabIndex={-1}
      {...props}
      className={iconVariants.base([props.className])}
    >
      <title>X</title>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
})

XIcon.displayName = 'SecretLib.XIcon'
