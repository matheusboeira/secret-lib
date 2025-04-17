import { cn } from '@/utils/cn'
import ThemeSwitcher from './theme/theme-switcher'

type PageLayoutProps = {
  title: React.ReactNode
  children: React.ReactNode
  className?: string
  classNames?: {
    base?: string
    title?: string
  }
}

export const PageLayout = ({
  title,
  children,
  className,
  classNames
}: PageLayoutProps) => {
  return (
    <div className={cn('flex flex-col gap-6', className, classNames?.base)}>
      <div className="flex items-center justify-between">
        <h1 className={cn('text-xl', classNames?.title)}>{title}</h1>
        <ThemeSwitcher />
      </div>
      {children}
    </div>
  )
}
