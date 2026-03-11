'use client'

import { useState } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import BottomNav from '@/components/layout/BottomNav'
import Header from '@/components/layout/Header'
import FabButton from '@/components/layout/FabButton'
import { Sheet, SheetContent } from '@/components/ui/sheet'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [formOpen, setFormOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <Sidebar />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="lg:pl-64">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="px-4 py-6 sm:px-6 lg:px-8 pb-24 lg:pb-6">
          {children}
        </main>

        {/* Mobile Bottom Navigation */}
        <div className="lg:hidden">
          <BottomNav />
        </div>

        {/* Floating Action Button */}
        <FabButton onClick={() => setFormOpen(true)} />
      </div>

      {/* Transaction Form sẽ được thêm sau */}
    </div>
  )
}