import { memo } from 'react'
import { iconVariants } from './icon.variants'

export const CheckedIcon = memo((props: React.SVGProps<SVGSVGElement>) => {
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
      <title>Checked</title>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
})

CheckedIcon.displayName = 'SecretLib.CheckedIcon'
