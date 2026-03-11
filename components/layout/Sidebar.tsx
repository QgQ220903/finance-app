'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  History, 
  PieChart, 
  TrendingUp, 
  Settings,
  LogOut,
  PiggyBank
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { mockProfile } from '@/lib/constants/mock-data'

const navItems = [
  { href: '/app', label: 'Tổng quan', icon: LayoutDashboard },
  { href: '/app/transactions', label: 'Lịch sử', icon: History },
  { href: '/app/summary', label: 'Tổng hợp', icon: PieChart },
  { href: '/app/charts', label: 'Biểu đồ', icon: TrendingUp },
  { href: '/app/savings', label: 'Tiết kiệm', icon: PiggyBank },
  { href: '/app/settings', label: 'Cài đặt', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col bg-white dark:bg-gray-900 border-r">
      {/* Logo */}
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-600">FinManage</h1>
      </div>

      {/* User Info */}
      <div className="px-6 py-4 border-b">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback className="bg-blue-100 text-blue-600">
              {mockProfile.fullName.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{mockProfile.fullName}</p>
            <p className="text-sm text-gray-500">@{mockProfile.fullName.toLowerCase().replace(' ', '')}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <li key={item.href}>
                <Link href={item.href}>
                  <Button
                    variant={isActive ? 'default' : 'ghost'}
                    className={`w-full justify-start gap-3 ${
                      isActive ? 'bg-blue-600 text-white hover:bg-blue-700' : ''
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Button>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t">
        <Button variant="ghost" className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50">
          <LogOut className="h-5 w-5" />
          Đăng xuất
        </Button>
      </div>
    </div>
  )
}