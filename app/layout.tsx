import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['vietnamese', 'latin'] })

export const metadata: Metadata = {
  title: 'FinManage - Quản lý tài chính cá nhân',
  description: 'Ứng dụng quản lý chi tiêu và tiết kiệm thông minh',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={inter.className}>

          {children}
      </body>
    </html>
  )
}