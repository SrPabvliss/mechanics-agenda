import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface UpdateQueryParam {
  param: string
  value: string
}

export const useUpdateQueryParam = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const updateQueryParam = (params: UpdateQueryParam[]) => {
    const paramsUpdated = new URLSearchParams(Array.from(searchParams.entries()))
    params.forEach((param) => {
      paramsUpdated.set(param.param, param.value)
    })
    router.push(`${pathname}?${paramsUpdated.toString()}`)
  }

  return updateQueryParam
}
