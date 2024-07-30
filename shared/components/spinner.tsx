interface SpinerProps {
  description?: string
}

const Spinner = ({ description }: SpinerProps) => {
  return (
    <div className="flex h-full w-full items-center justify-center gap-2">
      <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-[3px] border-current border-t-transparent text-gray-700 dark:text-white"
        role="status"
        aria-label="loading"
      ></div>
      <span>{description || 'Cargando ...'}</span>
    </div>
  )
}

export default Spinner
