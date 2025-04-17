import { memo } from 'react'

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
      {...props}
    >
      <title>Checked</title>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
})

CheckedIcon.displayName = 'SecretLib.CheckedIcon'
