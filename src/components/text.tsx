import { cn } from '@/lib/utils'

type TextProps = {
  type?: 'success' | 'danger' | 'warning'
  title?: React.ReactNode
  children: React.ReactNode
  className?: string
  classNames?: {
    base?: string
    title?: string
  }
}

export const Text = ({
  type,
  title,
  className,
  classNames,
  children
}: TextProps) => {
  return (
    <div className={cn('flex gap-2', classNames?.base, className)}>
      {title && <div className={classNames?.title}>{title}</div>}
      <div
        className={cn(
          !type && 'text-black dark:text-white',
          type === 'success' && 'text-green-500',
          type === 'warning' && 'text-yellow-500',
          type === 'danger' && 'text-red-500'
        )}
      >
        {children}
      </div>
    </div>
  )
}
