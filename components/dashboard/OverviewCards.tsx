'use client'

import { Card, CardContent } from '@/components/ui/card'
import { formatCurrency } from '@/lib/constants/mock-data'
import { Wallet, TrendingDown, TrendingUp } from 'lucide-react'

interface OverviewCardsProps {
  income: number
  expense: number
  remaining: number
}

export default function OverviewCards({ income, expense, remaining }: OverviewCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Thu nhập</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(income)}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Wallet className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Đã chi</p>
              <p className="text-2xl font-bold text-red-600">{formatCurrency(expense)}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <TrendingDown className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Còn lại</p>
              <p className={`text-2xl font-bold ${remaining >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                {formatCurrency(remaining)}
              </p>
            </div>
            <div className={`p-3 rounded-full ${remaining >= 0 ? 'bg-blue-100' : 'bg-red-100'}`}>
              <TrendingUp className={`h-6 w-6 ${remaining >= 0 ? 'text-blue-600' : 'text-red-600'}`} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}