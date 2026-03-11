export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export function getMonthOptions(): string[] {
  const months = []
  const today = new Date()
  
  for (let i = 0; i < 6; i++) {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1)
    const value = date.toISOString().slice(0, 7)
    months.push(value)
  }
  
  return months
}

export function formatMonthYear(monthYear: string): string {
  const [year, month] = monthYear.split('-')
  return `Tháng ${parseInt(month)}/${year}`
}