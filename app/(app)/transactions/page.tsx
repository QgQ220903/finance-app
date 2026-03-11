'use client'

import { useState } from 'react'
import { mockTransactions, mockCategories } from '@/lib/constants/mock-data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { TransactionList } from '@/components/transactions/TransactionList'
import { Search } from 'lucide-react'

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedMonth, setSelectedMonth] = useState<string>(
    new Date().toISOString().slice(0, 7)
  )

  // Lọc giao dịch
  const filteredTransactions = mockTransactions.filter(t => {
    const matchesSearch = t.note?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         t.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || t.categoryId === selectedCategory
    const matchesMonth = t.date.startsWith(selectedMonth)
    
    return matchesSearch && matchesCategory && matchesMonth
  })

  // Nhóm theo ngày
  const groupedTransactions = filteredTransactions.reduce((groups, transaction) => {
    const date = transaction.date
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(transaction)
    return groups
  }, {} as Record<string, typeof mockTransactions>)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Lịch sử giao dịch</h1>

      {/* Filters */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Tìm kiếm giao dịch..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Danh mục" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                {mockCategories.map(cat => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.icon} {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Transaction List */}
      <Card>
        <CardHeader>
          <CardTitle>
            {Object.keys(groupedTransactions).length} ngày có giao dịch
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TransactionList groupedTransactions={groupedTransactions} />
        </CardContent>
      </Card>
    </div>
  )
}