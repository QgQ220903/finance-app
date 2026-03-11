import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  TrendingUp, 
  Shield, 
  PieChart, 
  Smartphone,
  ArrowRight,
  CheckCircle2
} from 'lucide-react'

export default function RootPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <span className="font-bold text-xl text-gray-900 dark:text-white">FinManage</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Đăng nhập</Button>
            </Link>
            <Link href="/register">
              <Button>Đăng ký</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              Quản lý tài chính{' '}
              <span className="text-blue-600">thông minh</span>
              <br />cho người Việt
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-6 max-w-lg">
              Theo dõi chi tiêu, tiết kiệm mục tiêu và đạt được tự do tài chính với ứng dụng dễ dùng, hoàn toàn miễn phí.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto gap-2">
                  Bắt đầu miễn phí
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Xem tính năng
                </Button>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-12">
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">10k+</p>
                <p className="text-sm text-gray-500">Người dùng</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">50k+</p>
                <p className="text-sm text-gray-500">Giao dịch/tháng</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">4.8★</p>
                <p className="text-sm text-gray-500">Đánh giá</p>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative">
            <div className="relative z-10 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-500 ml-2">Dashboard</span>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <div className="h-20 bg-blue-100 dark:bg-blue-900/30 rounded-lg animate-pulse"></div>
                  <div className="h-20 bg-green-100 dark:bg-green-900/30 rounded-lg animate-pulse"></div>
                  <div className="h-20 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg animate-pulse"></div>
                </div>
                <div className="h-32 bg-gray-100 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                <div className="h-24 bg-gray-100 dark:bg-gray-700 rounded-lg animate-pulse"></div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute -bottom-8 -left-4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Tính năng nổi bật
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">
            Mọi thứ bạn cần để quản lý tài chính cá nhân hiệu quả
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 hover:border-blue-200 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Cách thức hoạt động
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">
              Chỉ 3 bước đơn giản để bắt đầu quản lý tài chính
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative">
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto">
                    {index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-[60%] w-full h-0.5 bg-blue-200"></div>
                  )}
                </div>
                <h3 className="text-xl font-semibold mt-4 mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing/Call to Action */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Hoàn toàn miễn phí, mãi mãi
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            Không có phí ẩn, không giới hạn tính năng. Bắt đầu hành trình tài chính của bạn ngay hôm nay.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto mt-12">
            <Card className="border-2 border-blue-200 dark:border-blue-800">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Gói cơ bản</h3>
                <p className="text-4xl font-bold text-blue-600 mb-6">0đ</p>
                <ul className="space-y-3 text-left mb-8">
                  {basicFeatures.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/register">
                  <Button className="w-full">Bắt đầu ngay</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Gói nâng cao</h3>
                <p className="text-4xl font-bold text-gray-600 mb-6">Sắp ra mắt</p>
                <ul className="space-y-3 text-left mb-8">
                  {proFeatures.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-500">
                      <CheckCircle2 className="h-5 w-5 text-gray-400" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full" disabled>
                  Đang phát triển
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">F</span>
                </div>
                <span className="font-bold text-xl">FinManage</span>
              </div>
              <p className="text-gray-400 text-sm">
                Quản lý tài chính thông minh cho người Việt
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Sản phẩm</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Tính năng</li>
                <li>Bảng giá</li>
                <li>Hướng dẫn</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Công ty</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Về chúng tôi</li>
                <li>Blog</li>
                <li>Tuyển dụng</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Hỗ trợ</h4>
              <ul className="space-y-2 text-gray-400">
                <li>FAQ</li>
                <li>Liên hệ</li>
                <li>Điều khoản</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            © 2026 FinManage. Bản quyền thuộc về công ty.
          </div>
        </div>
      </footer>
    </div>
  )
}

// Data cho các section
const features = [
  {
    icon: TrendingUp,
    title: 'Theo dõi chi tiêu',
    description: 'Ghi chép nhanh chóng, phân tích chi tiêu theo danh mục'
  },
  {
    icon: PieChart,
    title: 'Báo cáo trực quan',
    description: 'Biểu đồ thông minh, dễ hiểu, theo dõi xu hướng chi tiêu'
  },
  {
    icon: Shield,
    title: 'Mục tiêu tiết kiệm',
    description: 'Đặt mục tiêu và theo dõi tiến độ tiết kiệm hàng tháng'
  },
  {
    icon: Smartphone,
    title: 'Đa nền tảng',
    description: 'Dùng được trên mọi thiết bị, đồng bộ realtime'
  },
  {
    icon: TrendingUp,
    title: 'Cảnh báo thông minh',
    description: 'Nhắc nhở khi sắp vượt ngân sách, chi tiêu bất thường'
  },
  {
    icon: TrendingUp,
    title: 'Bảo mật cao',
    description: 'Dữ liệu được mã hóa, chỉ mình bạn mới xem được'
  },
]

const steps = [
  {
    title: 'Đăng ký tài khoản',
    description: 'Tạo tài khoản miễn phí với email và mật khẩu'
  },
  {
    title: 'Thiết lập ngân sách',
    description: 'Nhập thu nhập và phân bổ ngân sách cho các danh mục'
  },
  {
    title: 'Bắt đầu ghi chép',
    description: 'Ghi lại chi tiêu hàng ngày và theo dõi tiến độ'
  },
]

const basicFeatures = [
  'Theo dõi chi tiêu không giới hạn',
  '10+ danh mục mặc định',
  'Báo cáo tháng',
  'Mục tiêu tiết kiệm',
  'Cảnh báo ngân sách',
]

const proFeatures = [
  'Xuất báo cáo Excel/PDF',
  'Đồng bộ nhiều thiết bị',
  'Phân tích AI',
  'Hỗ trợ ưu tiên',
  'Tùy chỉnh không giới hạn',
]