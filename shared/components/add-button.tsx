'use client'
import { usePathname, useRouter } from 'next/navigation'

import { Plus } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/ui/button'

const AddButton = () => {
  const pathname = usePathname()
  const router = useRouter()
  return (
    <>
      <Button
        onClick={() => router.push(`${pathname}/new`)}
        className="fixed bottom-10 right-6 h-14 w-14 transform rounded-full transition-transform duration-500 ease-in-out hover:scale-110 md:-translate-x-6 lg:hidden lg:translate-x-0"
      >
        <Plus />
      </Button>
    </>
  )
}

export default AddButton
