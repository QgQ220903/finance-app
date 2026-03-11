'use client'

import { useState } from 'react'
import { 
  mockProfile, 
  mockCategories, 
  mockTransactions,
  formatCurrency 
} from '@/lib/constants/mock-data'
import OverviewCards from '@/components/dashboard/OverviewCards'
import SavingsProgress from '@/components/dashboard/SavingsProgress'
import BudgetAlertBanner from '@/components/dashboard/BudgetAlertBanner'
import RecentTransactions from '@/components/dashboard/RecentTransactions'

export default function DashboardPage() {
  // Tính toán dữ liệu cho dashboard
  const currentMonth = new Date().getMonth() + 1
  
  // Lọc giao dịch tháng hiện tại
  const currentMonthTransactions = mockTransactions.filter(t => {
    const transactionMonth = new Date(t.date).getMonth() + 1
    return transactionMonth === currentMonth && t.type === 'expense'
  })

  // Tổng chi tháng hiện tại
  const totalExpense = currentMonthTransactions.reduce((sum, t) => sum + t.amount, 0)
  
  // Cập nhật spent cho categories dựa trên transactions thực tế
  const categoriesWithSpent = mockCategories.map(cat => ({
    ...cat,
    spent: mockTransactions
      .filter(t => t.categoryId === cat.id && t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)
  }))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Tổng quan tháng {currentMonth}</h1>
        <div className="text-sm text-gray-500">
          Ngày nhận lương: Ngày {mockProfile.salaryDate}
        </div>
      </div>
      
      {/* Cards tổng quan */}
      <OverviewCards
        income={mockProfile.monthlyIncome}
        expense={totalExpense}
        remaining={mockProfile.monthlyIncome - totalExpense}
      />

      {/* Progress tiết kiệm */}
      <SavingsProgress
        current={mockProfile.currentSaving}
        goal={mockProfile.savingGoal}
      />

      {/* Banner cảnh báo */}
      <BudgetAlertBanner categories={categoriesWithSpent} />

      {/* Giao dịch gần đây */}
      <RecentTransactions transactions={mockTransactions.slice(0, 5)} />
    </div>
  )
}