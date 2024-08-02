import { useEffect, useRef } from 'react'

const useScrollById = (id?: string, shouldScrollOnMount: boolean = false) => {
  const hasScrolled = useRef(false)

  useEffect(() => {
    if (shouldScrollOnMount && id && !hasScrolled.current) {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'instant', block: 'center' })
        hasScrolled.current = true
      }
    }
  }, [id, shouldScrollOnMount])

  const scrollTo = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'instant', block: 'center' })
    }
  }

  return { scrollTo }
}

export default useScrollById
