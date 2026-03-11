// Mock data cho giao diện - chưa kết nối Supabase

export interface Category {
  id: string
  name: string
  budget: number
  spent: number
  color: string
  icon: string
}

export interface Transaction {
  id: string
  amount: number
  categoryId: string
  categoryName: string
  categoryColor: string
  categoryIcon: string
  note: string | null
  date: string
  type: 'expense' | 'saving'
}

export interface Profile {
  fullName: string
  monthlyIncome: number
  savingGoal: number
  currentSaving: number
  monthlySavingTarget: number
  salaryDate: number
}

// Profile mặc định
export const mockProfile: Profile = {
  fullName: 'Nguyễn Văn A',
  monthlyIncome: 12000000,
  savingGoal: 36000000,
  currentSaving: 6000000,
  monthlySavingTarget: 3240000,
  salaryDate: 10,
}

// Danh mục mặc định
export const mockCategories: Category[] = [
  { id: '1', name: 'Ăn uống', budget: 3000000, spent: 2500000, color: '#FF6B6B', icon: '🍜' },
  { id: '2', name: 'Xăng xe', budget: 160000, spent: 150000, color: '#4ECDC4', icon: '⛽' },
  { id: '3', name: 'Cà phê', budget: 300000, spent: 280000, color: '#45B7D1', icon: '☕' },
  { id: '4', name: 'Vệ sinh cá nhân', budget: 300000, spent: 200000, color: '#96CEB4', icon: '🧴' },
  { id: '5', name: 'Mua sắm', budget: 500000, spent: 650000, color: '#FFEAA7', icon: '🛍️' },
  { id: '6', name: 'Xã giao & quà', budget: 500000, spent: 400000, color: '#D4A5A5', icon: '🎁' },
  { id: '7', name: 'Sửa xe & phát sinh', budget: 300000, spent: 0, color: '#9B59B6', icon: '🔧' },
  { id: '8', name: 'Học tập', budget: 500000, spent: 200000, color: '#3498DB', icon: '📚' },
  { id: '9', name: 'Quỹ thiết bị', budget: 300000, spent: 0, color: '#E67E22', icon: '💻' },
  { id: '10', name: 'Khác', budget: 200000, spent: 50000, color: '#95A5A6', icon: '📦' },
  { id: '11', name: 'Tiết kiệm', budget: 3240000, spent: 3240000, color: '#2ECC71', icon: '💰' },
]

// Giao dịch mẫu
export const mockTransactions: Transaction[] = [
  {
    id: '1',
    amount: 120000,
    categoryId: '1',
    categoryName: 'Ăn uống',
    categoryColor: '#FF6B6B',
    categoryIcon: '🍜',
    note: 'Ăn trưa với đồng nghiệp',
    date: '2026-03-11',
    type: 'expense',
  },
  {
    id: '2',
    amount: 55000,
    categoryId: '3',
    categoryName: 'Cà phê',
    categoryColor: '#45B7D1',
    categoryIcon: '☕',
    note: 'Cà phê sáng',
    date: '2026-03-11',
    type: 'expense',
  },
  {
    id: '3',
    amount: 500000,
    categoryId: '5',
    categoryName: 'Mua sắm',
    categoryColor: '#FFEAA7',
    categoryIcon: '🛍️',
    note: 'Mua áo mới',
    date: '2026-03-10',
    type: 'expense',
  },
  {
    id: '4',
    amount: 200000,
    categoryId: '8',
    categoryName: 'Học tập',
    categoryColor: '#3498DB',
    categoryIcon: '📚',
    note: 'Mua sách',
    date: '2026-03-09',
    type: 'expense',
  },
  {
    id: '5',
    amount: 3240000,
    categoryId: '11',
    categoryName: 'Tiết kiệm',
    categoryColor: '#2ECC71',
    categoryIcon: '💰',
    note: 'Tiết kiệm tháng 3',
    date: '2026-03-05',
    type: 'saving',
  },
]

// Dữ liệu tiết kiệm theo tháng
export const mockMonthlySavings = [
  { month: 'T1/2026', amount: 3000000, cumulative: 3000000 },
  { month: 'T2/2026', amount: 3240000, cumulative: 6240000 },
  { month: 'T3/2026', amount: 3240000, cumulative: 9480000 },
  { month: 'T4/2026', amount: 3240000, cumulative: 12720000 },
  { month: 'T5/2026', amount: 3240000, cumulative: 15960000 },
  { month: 'T6/2026', amount: 3240000, cumulative: 19200000 },
]

// Format currency helper (tạm thời)
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount).replace('₫', 'đ')
}