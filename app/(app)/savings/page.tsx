'use client'

import { useState } from 'react'
import { mockProfile, mockMonthlySavings, formatCurrency } from '@/lib/constants/mock-data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export default function SavingsPage() {
  const [savings, setSavings] = useState(mockMonthlySavings)
  const [updateAmount, setUpdateAmount] = useState('')
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null)

  const currentTotal = savings[savings.length - 1]?.cumulative || 0
  const goalPercentage = (currentTotal / mockProfile.savingGoal) * 100

  // Dự báo tháng đạt mục tiêu
  const averageMonthlySaving = savings.reduce((sum, s) => sum + s.amount, 0) / savings.length
  const monthsToGoal = Math.ceil((mockProfile.savingGoal - currentTotal) / averageMonthlySaving)
  const estimatedDate = new Date()
  estimatedDate.setMonth(estimatedDate.getMonth() + monthsToGoal)

  const handleUpdateSaving = () => {
    if (!selectedMonth || !updateAmount) return
    
    const amount = parseInt(updateAmount)
    const monthIndex = savings.findIndex(s => s.month === selectedMonth)
    
    if (monthIndex >= 0) {
      const newSavings = [...savings]
      const oldAmount = newSavings[monthIndex].amount
      const diff = amount - oldAmount
      
      newSavings[monthIndex].amount = amount
      
      // Cập nhật cumulative cho các tháng sau
      for (let i = monthIndex; i < newSavings.length; i++) {
        if (i === 0) {
          newSavings[i].cumulative = newSavings[i].amount
        } else {
          newSavings[i].cumulative = newSavings[i-1].cumulative + newSavings[i].amount
        }
      }
      
      setSavings(newSavings)
    }
    
    setSelectedMonth(null)
    setUpdateAmount('')
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Theo dõi tiết kiệm</h1>

      {/* Progress Card */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Mục tiêu: {formatCurrency(mockProfile.savingGoal)}</h3>
              <span className="text-sm text-gray-500">{goalPercentage.toFixed(1)}%</span>
            </div>
            <Progress value={goalPercentage} className="h-4" />
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-600">Đã tiết kiệm</p>
                <p className="text-2xl font-bold text-blue-700">{formatCurrency(currentTotal)}</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-600">Cần thêm</p>
                <p className="text-2xl font-bold text-green-700">
                  {formatCurrency(mockProfile.savingGoal - currentTotal)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Forecast Card */}
      <Card>
        <CardHeader>
          <CardTitle>Dự báo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-600">Dự kiến đạt mục tiêu vào</p>
            <p className="text-2xl font-bold text-blue-600">
              Tháng {estimatedDate.getMonth() + 1}/{estimatedDate.getFullYear()}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              (Dựa trên trung bình {formatCurrency(averageMonthlySaving)}/tháng)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Roadmap */}
      <Card>
        <CardHeader>
          <CardTitle>Lộ trình tiết kiệm</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Header */}
            <div className="grid grid-cols-4 gap-2 text-sm font-medium text-gray-500 pb-2 border-b">
              <div>Tháng</div>
              <div className="text-right">Tiết kiệm</div>
              <div className="text-right">Tích lũy</div>
              <div className="text-right">% mục tiêu</div>
            </div>

            {/* Rows */}
            {savings.map((item, index) => {
              const percentage = (item.cumulative / mockProfile.savingGoal) * 100
              const isCurrentMonth = item.month === new Date().toLocaleString('vi-VN', { 
                month: 'short', 
                year: 'numeric' 
              }).replace(' ', '/')

              return (
                <div 
                  key={item.month} 
                  className={`grid grid-cols-4 gap-2 items-center py-2 hover:bg-gray-50 rounded-lg ${
                    isCurrentMonth ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="font-medium">{item.month}</div>
                  <div className="text-right">
                    {index === savings.length - 1 ? (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setSelectedMonth(item.month)}
                          >
                            {formatCurrency(item.amount)}
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Cập nhật tiết kiệm tháng {item.month}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <Input
                              type="number"
                              placeholder="Số tiền"
                              value={updateAmount}
                              onChange={(e) => setUpdateAmount(e.target.value)}
                            />
                            <Button onClick={handleUpdateSaving} className="w-full">
                              Cập nhật
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      formatCurrency(item.amount)
                    )}
                  </div>
                  <div className="text-right font-medium">{formatCurrency(item.cumulative)}</div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      percentage >= 100 ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {percentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}