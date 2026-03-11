'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Transaction, formatCurrency } from '@/lib/constants/mock-data'
import { formatDate } from '@/lib/utils/dateHelpers'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

interface RecentTransactionsProps {
  transactions: Transaction[]
}

export default function RecentTransactions({ transactions }: RecentTransactionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Giao dịch gần đây</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                  style={{ backgroundColor: transaction.categoryColor + '20' }}
                >
                  {transaction.categoryIcon}
                </div>
                <div>
                  <p className="font-medium">{transaction.categoryName}</p>
                  <p className="text-sm text-gray-500">
                    {formatDate(transaction.date)} • {transaction.note || 'Không ghi chú'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {transaction.type === 'expense' ? (
                  <ArrowUpRight className="w-4 h-4 text-red-500" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-green-500" />
                )}
                <span className={transaction.type === 'expense' ? 'text-red-500 font-medium' : 'text-green-500 font-medium'}>
                  {formatCurrency(transaction.amount)}
                </span>
              </div>
            </div>
          ))}

          {transactions.length === 0 && (
            <p className="text-center text-gray-500 py-8">Chưa có giao dịch nào</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}