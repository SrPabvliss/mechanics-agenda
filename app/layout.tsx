import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'

import UseRegisterServiceWorker from '@/core/hooks/use-register-sw'
import SocketsLayout from '@/core/layout/socket-layout'
import { ThemeProvider } from '@/core/providers/theme-provider'
import { Toaster } from 'react-hot-toast'

import './globals.css'

export const metadata: Metadata = {
  title: 'Gab Motors Agenda',
  description: 'Agenda de mantenimiento de vehículos de Gab Motors',
  manifest: '/manifest.json',
  icons: [
    {
      rel: 'icon',
      url: '/favicon/favicon.ico',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon/favicon-16x16.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon/favicon-32x32.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/favicon/apple-touch-icon.png',
    },
  ],
}

const inter = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} ${inter.className} `}>
        <UseRegisterServiceWorker />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SocketsLayout>
            <Toaster position="bottom-center" />
            {children}
          </SocketsLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}
