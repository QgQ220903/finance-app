'use client'

import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FabButtonProps {
  onClick: () => void
}

export default function FabButton({ onClick }: FabButtonProps) {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 h-14 w-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 z-50"
      size="icon"
    >
      <Plus className="h-6 w-6" />
    </Button>
  )
}