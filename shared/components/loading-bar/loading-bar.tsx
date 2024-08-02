import { cn } from '@/lib/utils'
import './loading-bar.style.css'

interface LoadingBarProps {
  className?: string
}

const LoadingBar = ({ className }: LoadingBarProps) => {
  return (
    <div className={cn('loader bg-blue-200 dark:bg-blue-900', className)}>
      <div className="loaderBar bg-blue-500 dark:bg-blue-300"></div>
    </div>
  )
}

export default LoadingBar
