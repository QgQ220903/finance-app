'use client'

import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { 
  Menu, 
  Sun, 
  Moon,
  Bell
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface HeaderProps {
  onMenuClick?: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { theme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b">
      <div className="flex items-center justify-between px-4 h-16">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuClick}>
            <Menu className="h-5 w-5" />
          </Button>
          <h2 className="text-lg font-semibold">Tài chính cá nhân</h2>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme('light')}>
                Sáng
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                Tối
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>
                Hệ thống
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}