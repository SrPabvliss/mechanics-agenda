import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const useUpdateQueryParam = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const updateQueryParam = (param: string, value: string) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()))
    params.set(param, value)
    router.replace(`${pathname}?${params.toString()}`)
  }

  return updateQueryParam
}
