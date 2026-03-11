'use client'

import { useState } from 'react'
import { Transaction, formatCurrency } from '@/lib/constants/mock-data'
import { formatDate } from '@/lib/utils/dateHelpers'
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle 
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Pencil, Trash2, ArrowUpRight, ArrowDownRight } from 'lucide-react'

interface TransactionListProps {
  groupedTransactions: Record<string, Transaction[]>
}

export function TransactionList({ groupedTransactions }: TransactionListProps) {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [showEditSheet, setShowEditSheet] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const handleEdit = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setShowEditSheet(true)
  }

  const handleDelete = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setShowDeleteDialog(true)
  }

  const confirmDelete = () => {
    // TODO: Xóa giao dịch
    console.log('Xóa:', selectedTransaction)
    setShowDeleteDialog(false)
    setSelectedTransaction(null)
  }

  return (
    <>
      <div className="space-y-6">
        {Object.entries(groupedTransactions).map(([date, transactions]) => (
          <div key={date}>
            <h3 className="font-medium text-gray-500 mb-3">{formatDate(date)}</h3>
            <div className="space-y-2">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                  onClick={() => setSelectedTransaction(transaction)}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                      style={{ backgroundColor: transaction.categoryColor + '20' }}
                    >
                      {transaction.categoryIcon}
                    </div>
                    <div>
                      <p className="font-medium">{transaction.categoryName}</p>
                      <p className="text-sm text-gray-500">{transaction.note || 'Không ghi chú'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
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
                </div>
              ))}
            </div>
          </div>
        ))}

        {Object.keys(groupedTransactions).length === 0 && (
          <p className="text-center text-gray-500 py-8">Không có giao dịch nào</p>
        )}
      </div>

      {/* Bottom Sheet cho actions */}
      <Sheet open={!!selectedTransaction && !showEditSheet && !showDeleteDialog} onOpenChange={() => setSelectedTransaction(null)}>
        <SheetContent side="bottom" className="h-auto">
          <SheetHeader>
            <SheetTitle>Chi tiết giao dịch</SheetTitle>
          </SheetHeader>
          {selectedTransaction && (
            <div className="space-y-4 py-4">
              <div className="text-center">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mx-auto"
                  style={{ backgroundColor: selectedTransaction.categoryColor + '20' }}
                >
                  {selectedTransaction.categoryIcon}
                </div>
                <p className="font-bold text-xl mt-2">
                  {formatCurrency(selectedTransaction.amount)}
                </p>
                <p className="text-gray-500">{selectedTransaction.categoryName}</p>
                {selectedTransaction.note && (
                  <p className="text-sm text-gray-600 mt-2">{selectedTransaction.note}</p>
                )}
                <p className="text-xs text-gray-400 mt-1">{formatDate(selectedTransaction.date)}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  className="gap-2"
                  onClick={() => handleEdit(selectedTransaction)}
                >
                  <Pencil className="h-4 w-4" />
                  Sửa
                </Button>
                <Button 
                  variant="destructive" 
                  className="gap-2"
                  onClick={() => handleDelete(selectedTransaction)}
                >
                  <Trash2 className="h-4 w-4" />
                  Xóa
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc muốn xóa giao dịch này? Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}