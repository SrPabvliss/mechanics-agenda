import Image from 'next/image'

import React from 'react'

interface NoContentProps {
  src: string
  title: string
  subtitle?: string
  className?: string
}

const NoContent: React.FC<NoContentProps> = ({ src, title, subtitle, className }) => {
  return (
    <div className={`flex flex-col items-center justify-center rounded-lg p-8 shadow-md ${className}`}>
      {src && (
        <Image
          src={src}
          alt="No Content"
          width={200}
          height={200}
          className="mb-4"
          style={{ width: 'auto', height: 'auto' }}
          priority
        />
      )}
      <h2 className="text-xl font-semibold">{title}</h2>
      {subtitle && <p className="mt-2 text-center text-sm font-light">{subtitle}</p>}
    </div>
  )
}

export default NoContent
