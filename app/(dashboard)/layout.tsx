import Link from 'next/link'

import React from 'react'

const SidebarLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col items-center justify-center bg-gray-900 text-white">
        <Link href="/login">Login</Link>
        <Link href="/quotes">Citas</Link>
        <Link href="/admin-quotes">Citas administrativas</Link>
        <Link href="/reviews">Revisiones</Link>
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
}

export default SidebarLayout
