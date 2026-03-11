'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  History, 
  PieChart, 
  PiggyBank,
  Settings
} from 'lucide-react'

const navItems = [
  {
    href: '/app',
    label: 'Tổng quan',
    icon: LayoutDashboard,
  },
  {
    href: '/app/transactions',
    label: 'Lịch sử',
    icon: History,
  },
  {
    href: '/app/summary',
    label: 'Tổng hợp',
    icon: PieChart,
  },
  {
    href: '/app/savings',
    label: 'Tiết kiệm',
    icon: PiggyBank,
  },
  {
    href: '/app/settings',
    label: 'Cài đặt',
    icon: Settings,
  },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-50 pb-safe">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex flex-col items-center justify-center flex-1 h-full
                transition-colors relative
                ${isActive 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }
              `}
            >
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full" />
              )}
              <Icon className="h-5 w-5" />
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}