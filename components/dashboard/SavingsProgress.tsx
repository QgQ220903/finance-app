'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { formatCurrency } from '@/lib/constants/mock-data'

interface SavingsProgressProps {
  current: number
  goal: number
}

export default function SavingsProgress({ current, goal }: SavingsProgressProps) {
  const percentage = (current / goal) * 100
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mục tiêu tiết kiệm</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Tiến độ: {percentage.toFixed(1)}%</span>
            <span className="font-medium">
              {formatCurrency(current)} / {formatCurrency(goal)}
            </span>
          </div>
          <Progress value={percentage} className="h-3" />
          
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Cần thêm</p>
              <p className="font-bold text-lg">{formatCurrency(goal - current)}</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Mỗi tháng</p>
              <p className="font-bold text-lg">3,240,000đ</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}