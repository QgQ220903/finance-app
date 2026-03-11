'use client'

import { useState } from 'react'
import { mockCategories, mockTransactions, formatCurrency } from '@/lib/constants/mock-data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function SummaryPage() {
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  )

  // Lọc giao dịch theo tháng
  const monthTransactions = mockTransactions.filter(t => 
    t.date.startsWith(selectedMonth) && t.type === 'expense'
  )

  // Tính tổng chi theo từng category
  const categoryStats = mockCategories.map(cat => {
    const spent = monthTransactions
      .filter(t => t.categoryId === cat.id)
      .reduce((sum, t) => sum + t.amount, 0)
    
    const remaining = cat.budget - spent
    const percentage = cat.budget > 0 ? (spent / cat.budget) * 100 : 0

    return {
      ...cat,
      spent,
      remaining,
      percentage,
    }
  })

  const totalBudget = mockCategories.reduce((sum, cat) => sum + cat.budget, 0)
  const totalSpent = categoryStats.reduce((sum, cat) => sum + cat.spent, 0)
  const totalRemaining = totalBudget - totalSpent

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Tổng hợp tháng</h1>
        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Chọn tháng" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2026-03">Tháng 3/2026</SelectItem>
            <SelectItem value="2026-02">Tháng 2/2026</SelectItem>
            <SelectItem value="2026-01">Tháng 1/2026</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tổng quan tháng */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500">Tổng ngân sách</p>
            <p className="text-2xl font-bold">{formatCurrency(totalBudget)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500">Đã chi</p>
            <p className="text-2xl font-bold text-red-600">{formatCurrency(totalSpent)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500">Còn lại</p>
            <p className={`text-2xl font-bold ${totalRemaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(totalRemaining)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Bảng so sánh chi tiết */}
      <Card>
        <CardHeader>
          <CardTitle>Chi tiết theo danh mục</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Header */}
            <div className="grid grid-cols-12 gap-2 text-sm font-medium text-gray-500 pb-2 border-b">
              <div className="col-span-4">Danh mục</div>
              <div className="col-span-2 text-right">Ngân sách</div>
              <div className="col-span-2 text-right">Đã chi</div>
              <div className="col-span-2 text-right">Còn lại</div>
              <div className="col-span-2 text-right">%</div>
            </div>

            {/* Rows */}
            {categoryStats.map((cat) => (
              <div key={cat.id} className="grid grid-cols-12 gap-2 items-center py-2 hover:bg-gray-50 rounded-lg">
                <div className="col-span-4 flex items-center gap-2">
                  <div 
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs"
                    style={{ backgroundColor: cat.color + '20' }}
                  >
                    {cat.icon}
                  </div>
                  <span className="font-medium">{cat.name}</span>
                </div>
                <div className="col-span-2 text-right">{formatCurrency(cat.budget)}</div>
                <div className="col-span-2 text-right text-red-600">{formatCurrency(cat.spent)}</div>
                <div className={`col-span-2 text-right ${cat.remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(cat.remaining)}
                </div>
                <div className="col-span-2 text-right">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    cat.percentage >= 100 ? 'bg-red-100 text-red-600' :
                    cat.percentage >= 80 ? 'bg-yellow-100 text-yellow-600' :
                    'bg-green-100 text-green-600'
                  }`}>
                    {cat.percentage.toFixed(0)}%
                  </span>
                </div>
              </div>
            ))}

            {/* Total Row */}
            <div className="grid grid-cols-12 gap-2 items-center pt-4 border-t font-bold">
              <div className="col-span-4">Tổng</div>
              <div className="col-span-2 text-right">{formatCurrency(totalBudget)}</div>
              <div className="col-span-2 text-right text-red-600">{formatCurrency(totalSpent)}</div>
              <div className={`col-span-2 text-right ${totalRemaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(totalRemaining)}
              </div>
              <div className="col-span-2 text-right">
                {((totalSpent / totalBudget) * 100).toFixed(0)}%
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}