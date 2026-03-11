'use client'

import { useState } from 'react'
import { mockProfile, mockCategories, formatCurrency } from '@/lib/constants/mock-data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Pencil, Trash2, Plus } from 'lucide-react'

export default function SettingsPage() {
  const [profile, setProfile] = useState(mockProfile)
  const [categories, setCategories] = useState(mockCategories)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Cài đặt</h1>

      <Tabs defaultValue="profile">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="profile">Hồ sơ</TabsTrigger>
          <TabsTrigger value="categories">Danh mục</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cá nhân</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Họ và tên</Label>
                <Input 
                  value={profile.fullName}
                  onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label>Thu nhập hàng tháng</Label>
                <Input 
                  type="number"
                  value={profile.monthlyIncome}
                  onChange={(e) => setProfile({...profile, monthlyIncome: parseInt(e.target.value)})}
                />
              </div>

              <div className="space-y-2">
                <Label>Ngày nhận lương</Label>
                <Input 
                  type="number"
                  min="1"
                  max="31"
                  value={profile.salaryDate}
                  onChange={(e) => setProfile({...profile, salaryDate: parseInt(e.target.value)})}
                />
              </div>

              <div className="space-y-2">
                <Label>Mục tiêu tiết kiệm</Label>
                <Input 
                  type="number"
                  value={profile.savingGoal}
                  onChange={(e) => setProfile({...profile, savingGoal: parseInt(e.target.value)})}
                />
              </div>

              <div className="space-y-2">
                <Label>Tiết kiệm hiện tại</Label>
                <Input 
                  type="number"
                  value={profile.currentSaving}
                  onChange={(e) => setProfile({...profile, currentSaving: parseInt(e.target.value)})}
                />
              </div>

              <Button className="w-full">Lưu thay đổi</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Categories Tab */}
        <TabsContent value="categories">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Quản lý danh mục</CardTitle>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Thêm
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categories.map((cat) => (
                  <div 
                    key={cat.id} 
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                        style={{ backgroundColor: cat.color + '20' }}
                      >
                        {cat.icon}
                      </div>
                      <div>
                        <p className="font-medium">{cat.name}</p>
                        <p className="text-sm text-gray-500">{formatCurrency(cat.budget)}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dark Mode Toggle */}
      <Card>
        <CardHeader>
          <CardTitle>Giao diện</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Chế độ tối</p>
              <p className="text-sm text-gray-500">Chuyển đổi giữa sáng và tối</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}