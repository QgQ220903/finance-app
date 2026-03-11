'use client'

import { AlertTriangle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Category, formatCurrency } from '@/lib/constants/mock-data'

interface BudgetAlertBannerProps {
  categories: Category[]
}

export default function BudgetAlertBanner({ categories }: BudgetAlertBannerProps) {
  const warningCategories = categories.filter(c => {
    const percentage = (c.spent / c.budget) * 100
    return percentage >= 80 && c.budget > 0
  })

  if (warningCategories.length === 0) return null

  return (
    <Alert variant="destructive" className="bg-yellow-50 border-yellow-200">
      <AlertTriangle className="h-5 w-5 text-yellow-600" />
      <AlertTitle className="text-yellow-800">Cảnh báo ngân sách</AlertTitle>
      <AlertDescription className="text-yellow-700">
        <div className="mt-2 space-y-2">
          {warningCategories.map(cat => {
            const percentage = (cat.spent / cat.budget) * 100
            const isOver = cat.spent > cat.budget
            
            return (
              <div key={cat.id} className="flex items-center justify-between">
                <span className="font-medium">{cat.name}</span>
                <div className="flex items-center gap-2">
                  <span>{formatCurrency(cat.spent)} / {formatCurrency(cat.budget)}</span>
                  <Badge variant={isOver ? "destructive" : "default"} className={isOver ? "bg-red-500" : "bg-yellow-500"}>
                    {percentage.toFixed(0)}%
                  </Badge>
                </div>
              </div>
            )
          })}
        </div>
      </AlertDescription>
    </Alert>
  )
}