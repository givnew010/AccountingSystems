<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Mobile Navigation Toggle (shown only on mobile) -->
    <div class="md:hidden fixed top-4 right-4 z-50">
      <button
        @click="sidebarStore.toggleMobileMenu"
        class="bg-blue-600 text-white p-2 rounded-lg shadow-lg"
      >
        <Bars3Icon class="w-6 h-6" />
      </button>
    </div>

    <!-- Mobile Overlay -->
    <div
      v-if="sidebarStore.isMobileMenuOpen"
      @click="sidebarStore.closeMobileMenu"
      class="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
    ></div>

    <!-- Mobile Sidebar -->
    <div
      :class="[
        'md:hidden fixed top-0 right-0 h-full bg-white border-r border-gray-200 shadow-lg z-50 transition-transform duration-300',
        'w-64',
        sidebarStore.isMobileMenuOpen ? 'transform translate-x-0' : 'transform translate-x-full'
      ]"
    >
      <!-- Mobile Header -->
      <div class="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 class="text-lg font-semibold text-gray-900">القائمة</h3>
        <button
          @click="sidebarStore.closeMobileMenu"
          class="p-2 rounded-lg hover:bg-gray-100"
        >
          <XMarkIcon class="w-6 h-6 text-gray-600" />
        </button>
      </div>

      <!-- Mobile Navigation Items -->
      <nav class="flex-1 px-2 py-4">
        <ul class="space-y-2">
          <li v-for="item in navigationItems" :key="item.name">
            <NuxtLink
              :to="item.path"
              @click="sidebarStore.closeMobileMenu"
              :class="[
                'flex items-center px-3 py-2 rounded-lg transition-colors',
                'hover:bg-blue-50 hover:text-blue-600',
                $route.path === item.path ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
              ]"
            >
              <component :is="item.icon" class="w-6 h-6 flex-shrink-0 ml-3" />
              <span class="text-sm font-medium">{{ item.label }}</span>
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <!-- Mobile User Info -->
      <div class="p-4 border-t border-gray-200">
        <div class="flex items-center mb-3">
          <div class="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold flex-shrink-0">
            م
          </div>
          <div class="mr-3">
            <p class="text-sm font-medium text-gray-900">{{ authStore.user?.name }}</p>
            <p class="text-xs text-gray-500">{{ authStore.user?.role }}</p>
          </div>
        </div>
        <button
          @click="logout"
          :class="[
            'w-full flex items-center px-3 py-2 rounded-lg transition-colors',
            'hover:bg-red-50 hover:text-red-600 text-red-600'
          ]"
        >
          <ArrowRightOnRectangleIcon class="w-5 h-5 flex-shrink-0 ml-2" />
          <span class="text-sm font-medium">تسجيل الخروج</span>
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex flex-col lg:flex-row min-h-screen">
      <!-- Desktop Sidebar (hidden on mobile) -->
      <SidebarNavigation class="hidden md:block" />

      <!-- Content Area -->
      <div class="flex-1 md:mr-64">
        <!-- Report Tabs -->
        <div class="bg-white shadow-sm border-b border-gray-200">
          <div class="px-4 sm:px-6 lg:px-8">
            <nav class="-mb-px flex space-x-8 space-x-reverse" aria-label="Tabs">
              <button
                @click="activeTab = 'sales'"
                :class="[
                  'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
                  activeTab === 'sales'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                ]"
              >
                تقارير المبيعات
              </button>
              <button
                @click="activeTab = 'inventory'"
                :class="[
                  'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
                  activeTab === 'inventory'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                ]"
              >
                تقارير المخزون
              </button>
            </nav>
          </div>
        </div>

        <!-- Sales Reports -->
        <div v-if="activeTab === 'sales'" class="p-4 sm:p-6 lg:p-8">
          <div class="bg-white rounded-lg shadow-sm">
            <!-- Filters -->
            <div class="p-6 border-b border-gray-200">
              <h2 class="text-lg font-semibold text-gray-900 mb-4">تقارير المبيعات</h2>

              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">من تاريخ</label>
                  <input
                    v-model="salesFilters.startDate"
                    type="date"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">إلى تاريخ</label>
                  <input
                    v-model="salesFilters.endDate"
                    type="date"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">العميل</label>
                  <select
                    v-model="salesFilters.customerId"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">جميع العملاء</option>
                    <option v-for="customer in customers" :key="customer.id" :value="customer.id">
                      {{ customer.name }}
                    </option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">الحالة</label>
                  <select
                    v-model="salesFilters.status"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">جميع الحالات</option>
                    <option value="posted">مُرحّلة</option>
                    <option value="paid">مدفوعة</option>
                  </select>
                </div>
              </div>

              <div class="mt-4 flex flex-wrap gap-2">
                <button
                  @click="generateSalesReport"
                  class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  إنشاء التقرير
                </button>
                <button
                  @click="printSalesReport"
                  :disabled="!salesReportData.length"
                  class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  طباعة التقرير
                </button>
                <button
                  @click="exportSalesReport"
                  :disabled="!salesReportData.length"
                  class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  تصدير إلى Excel
                </button>
              </div>
            </div>

            <!-- Report Results -->
            <div v-if="salesReportData.length" class="p-6">
              <div class="overflow-x-auto">
                <table class="w-full">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        رقم الفاتورة
                      </th>
                      <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        التاريخ
                      </th>
                      <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        العميل
                      </th>
                      <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        المبلغ
                      </th>
                      <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        الحالة
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="invoice in salesReportData" :key="invoice.id">
                      <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {{ invoice.number }}
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {{ new Date(invoice.date).toLocaleDateString('ar-SA') }}
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {{ invoice.customer?.name }}
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {{ invoice.total.toFixed(2) }} ريال
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap">
                        <span
                          :class="[
                            'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                            invoice.status === 'posted'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-blue-100 text-blue-800'
                          ]"
                        >
                          {{ invoice.status === 'posted' ? 'مُرحّلة' : 'مدفوعة' }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot class="bg-gray-50">
                    <tr>
                      <td colspan="3" class="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                        المجموع الكلي:
                      </td>
                      <td class="px-4 py-3 text-sm font-bold text-gray-900">
                        {{ salesReportTotals.total.toFixed(2) }} ريال
                      </td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <!-- No Data Message -->
            <div v-else class="p-6 text-center text-gray-500">
              لا توجد بيانات للعرض. يرجى تعديل المرشحات وإنشاء التقرير.
            </div>
          </div>
        </div>

        <!-- Inventory Reports -->
        <div v-if="activeTab === 'inventory'" class="p-4 sm:p-6 lg:p-8">
          <div class="bg-white rounded-lg shadow-sm">
            <!-- Filters -->
            <div class="p-6 border-b border-gray-200">
              <h2 class="text-lg font-semibold text-gray-900 mb-4">تقارير المخزون</h2>

              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">الفئة</label>
                  <select
                    v-model="inventoryFilters.categoryId"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">جميع الفئات</option>
                    <option v-for="category in categories" :key="category.id" :value="category.id">
                      {{ category.name }}
                    </option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">المنتج</label>
                  <select
                    v-model="inventoryFilters.productId"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">جميع المنتجات</option>
                    <option v-for="product in filteredProducts" :key="product.id" :value="product.id">
                      {{ product.name }}
                    </option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">حالة المخزون</label>
                  <select
                    v-model="inventoryFilters.stockStatus"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">جميع الحالات</option>
                    <option value="in-stock">متوفر</option>
                    <option value="low-stock">منخفض</option>
                    <option value="out-of-stock">نفد</option>
                  </select>
                </div>
              </div>

              <div class="mt-4 flex flex-wrap gap-2">
                <button
                  @click="generateInventoryReport"
                  class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  إنشاء التقرير
                </button>
                <button
                  @click="printInventoryReport"
                  :disabled="!inventoryReportData.length"
                  class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  طباعة التقرير
                </button>
                <button
                  @click="exportInventoryReport"
                  :disabled="!inventoryReportData.length"
                  class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  تصدير إلى Excel
                </button>
              </div>
            </div>

            <!-- Report Results -->
            <div v-if="inventoryReportData.length" class="p-6">
              <div class="overflow-x-auto">
                <table class="w-full">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        المنتج
                      </th>
                      <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        الفئة
                      </th>
                      <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        الوحدة
                      </th>
                      <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        الكمية الحالية
                      </th>
                      <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        سعر الشراء
                      </th>
                      <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        القيمة الإجمالية
                      </th>
                      <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        الحالة
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="item in inventoryReportData" :key="item.id">
                      <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {{ item.product.name }}
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {{ item.product.category?.name || 'غير مصنف' }}
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {{ item.unit.name }}
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {{ item.currentQuantity }}
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {{ item.purchasePrice.toFixed(2) }} ريال
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {{ (item.currentQuantity * item.purchasePrice).toFixed(2) }} ريال
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap">
                        <span
                          :class="[
                            'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                            getStockStatusClass(item.currentQuantity)
                          ]"
                        >
                          {{ getStockStatusText(item.currentQuantity) }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot class="bg-gray-50">
                    <tr>
                      <td colspan="5" class="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                        إجمالي القيمة:
                      </td>
                      <td class="px-4 py-3 text-sm font-bold text-gray-900">
                        {{ inventoryReportTotals.totalValue.toFixed(2) }} ريال
                      </td>
                      <td></td>
                    </tr>
                    <tr>
                      <td colspan="5" class="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                        إجمالي المنتجات:
                      </td>
                      <td class="px-4 py-3 text-sm font-bold text-gray-900">
                        {{ inventoryReportTotals.totalItems }}
                      </td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <!-- No Data Message -->
            <div v-else class="p-6 text-center text-gray-500">
              لا توجد بيانات للعرض. يرجى تعديل المرشحات وإنشاء التقرير.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useSidebarStore } from '~/stores/sidebar'
import { useAuthStore } from '~/stores/auth'
import {
  Bars3Icon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
  HomeIcon,
  UsersIcon,
  ShoppingBagIcon,
  CubeIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ArrowUturnLeftIcon,
  TagIcon,
  ScaleIcon,
  BuildingStorefrontIcon,
  TruckIcon,
  ShoppingCartIcon
} from '@heroicons/vue/24/outline'

const sidebarStore = useSidebarStore()
const authStore = useAuthStore()
const router = useRouter()

// Navigation items for mobile menu
const navigationItems = ref([
  { name: 'dashboard', path: '/', label: 'لوحة التحكم', icon: HomeIcon },
  { name: 'customers', path: '/customers', label: 'العملاء', icon: UsersIcon },
  { name: 'suppliers', path: '/suppliers', label: 'الموردين', icon: TruckIcon },
  { name: 'sales', path: '/sales', label: 'المبيعات', icon: ShoppingBagIcon },
  { name: 'sales-return', path: '/sales-return', label: 'مرتجعات المبيعات', icon: ArrowUturnLeftIcon },
  { name: 'purchases', path: '/purchases', label: 'المشتريات', icon: ShoppingCartIcon },
  { name: 'purchase-return', path: '/purchase-return', label: 'مرتجعات المشتريات', icon: ArrowUturnLeftIcon },
  { name: 'products', path: '/products', label: 'المنتجات', icon: CubeIcon },
  { name: 'categories', path: '/categories', label: 'الفئات', icon: TagIcon },
  { name: 'units', path: '/units', label: 'وحدات القياس', icon: ScaleIcon },
  { name: 'reports', path: '/reports', label: 'التقارير', icon: ChartBarIcon },
  { name: 'branches-warehouses', path: '/branches-warehouses', label: 'الفروع والمستودعات', icon: BuildingStorefrontIcon },
  { name: 'users', path: '/users', label: 'المستخدمين', icon: UsersIcon },
  { name: 'settings', path: '#', label: 'الإعدادات', icon: Cog6ToothIcon }
])

// Reactive state
const activeTab = ref('sales')

// Sales report filters and data
const salesFilters = ref({
  startDate: '',
  endDate: '',
  customerId: '',
  status: 'all'
})

const salesReportData = ref([])
const salesReportTotals = ref({
  total: 0
})

// Inventory report filters and data
const inventoryFilters = ref({
  categoryId: '',
  productId: '',
  stockStatus: 'all'
})

const inventoryReportData = ref([])
const inventoryReportTotals = ref({
  totalValue: 0,
  totalItems: 0
})

// Mock data
const customers = ref([
  { id: 1, name: 'أحمد محمد' },
  { id: 2, name: 'فاطمة علي' },
  { id: 3, name: 'محمد أحمد' }
])

const categories = ref([
  { id: 1, name: 'أدوات مكتبية' },
  { id: 2, name: 'إلكترونيات' },
  { id: 3, name: 'أثاث' }
])

const products = ref([
  {
    id: 1,
    name: 'قلم حبر',
    categoryId: 1,
    category: { name: 'أدوات مكتبية' },
    units: [
      {
        name: 'قطعة',
        purchasePrice: 3,
        currentQuantity: 100
      }
    ]
  },
  {
    id: 2,
    name: 'ورق A4',
    categoryId: 1,
    category: { name: 'أدوات مكتبية' },
    units: [
      {
        name: 'رزمة',
        purchasePrice: 18,
        currentQuantity: 50
      }
    ]
  },
  {
    id: 3,
    name: 'كرسي مكتبي',
    categoryId: 3,
    category: { name: 'أثاث' },
    units: [
      {
        name: 'قطعة',
        purchasePrice: 150,
        currentQuantity: 25
      }
    ]
  }
])

// Mock sales invoices
const salesInvoices = ref([
  {
    id: 1,
    number: 'INV-2024-001',
    date: '2024-01-15',
    customerId: 1,
    customer: { name: 'أحمد محمد' },
    total: 330.00,
    status: 'posted'
  },
  {
    id: 2,
    number: 'INV-2024-002',
    date: '2024-01-20',
    customerId: 2,
    customer: { name: 'فاطمة علي' },
    total: 180.00,
    status: 'paid'
  },
  {
    id: 3,
    number: 'INV-2024-003',
    date: '2024-01-25',
    customerId: 1,
    customer: { name: 'أحمد محمد' },
    total: 450.00,
    status: 'posted'
  }
])

// Computed properties
const filteredProducts = computed(() => {
  if (!inventoryFilters.value.categoryId) {
    return products.value
  }
  return products.value.filter(product => product.categoryId == inventoryFilters.value.categoryId)
})

// Methods
const logout = () => {
  authStore.logout()
  router.push('/login')
}

const generateSalesReport = () => {
  let filtered = salesInvoices.value

  // Date filter
  if (salesFilters.value.startDate) {
    filtered = filtered.filter(invoice => invoice.date >= salesFilters.value.startDate)
  }
  if (salesFilters.value.endDate) {
    filtered = filtered.filter(invoice => invoice.date <= salesFilters.value.endDate)
  }

  // Customer filter
  if (salesFilters.value.customerId) {
    filtered = filtered.filter(invoice => invoice.customerId == salesFilters.value.customerId)
  }

  // Status filter
  if (salesFilters.value.status !== 'all') {
    filtered = filtered.filter(invoice => invoice.status === salesFilters.value.status)
  }

  salesReportData.value = filtered
  salesReportTotals.value.total = filtered.reduce((sum, invoice) => sum + invoice.total, 0)
}

const generateInventoryReport = () => {
  let filtered = []

  products.value.forEach(product => {
    product.units.forEach(unit => {
      const item = {
        id: `${product.id}-${unit.name}`,
        product,
        unit,
        currentQuantity: unit.currentQuantity,
        purchasePrice: unit.purchasePrice
      }

      // Category filter
      if (inventoryFilters.value.categoryId && product.categoryId != inventoryFilters.value.categoryId) {
        return
      }

      // Product filter
      if (inventoryFilters.value.productId && product.id != inventoryFilters.value.productId) {
        return
      }

      // Stock status filter
      if (inventoryFilters.value.stockStatus !== 'all') {
        const status = getStockStatus(item.currentQuantity)
        if (status !== inventoryFilters.value.stockStatus) {
          return
        }
      }

      filtered.push(item)
    })
  })

  inventoryReportData.value = filtered
  inventoryReportTotals.value = {
    totalValue: filtered.reduce((sum, item) => sum + (item.currentQuantity * item.purchasePrice), 0),
    totalItems: filtered.length
  }
}

const getStockStatus = (quantity) => {
  if (quantity === 0) return 'out-of-stock'
  if (quantity < 10) return 'low-stock'
  return 'in-stock'
}

const getStockStatusText = (quantity) => {
  const status = getStockStatus(quantity)
  const labels = {
    'in-stock': 'متوفر',
    'low-stock': 'منخفض',
    'out-of-stock': 'نفد'
  }
  return labels[status] || status
}

const getStockStatusClass = (quantity) => {
  const status = getStockStatus(quantity)
  const classes = {
    'in-stock': 'bg-green-100 text-green-800',
    'low-stock': 'bg-yellow-100 text-yellow-800',
    'out-of-stock': 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const printSalesReport = () => {
  if (!salesReportData.value.length) return

  const printContent = `
    <div class="print-invoice">
      <div class="print-header">
        <h1 style="font-size: 24px; margin: 0; color: #2563eb;">تقرير المبيعات</h1>
        <div class="print-company-info">
          <h2 style="margin: 5px 0; color: #374151;">شركة المحاسبة والمخزون</h2>
          <p style="margin: 2px 0; color: #6b7280;">الرياض، المملكة العربية السعودية</p>
          <p style="margin: 2px 0; color: #6b7280;">هاتف: +966 11 234 5678 | بريد إلكتروني: info@company.com</p>
        </div>
        <div class="print-filters">
          <p style="margin: 2px 0;"><strong>الفترة:</strong> ${salesFilters.value.startDate || 'غير محدد'} - ${salesFilters.value.endDate || 'غير محدد'}</p>
          <p style="margin: 2px 0;"><strong>تاريخ التقرير:</strong> ${new Date().toLocaleString('ar-SA')}</p>
        </div>
      </div>

      <table class="print-table">
        <thead>
          <tr>
            <th>رقم الفاتورة</th>
            <th>التاريخ</th>
            <th>العميل</th>
            <th>المبلغ</th>
            <th>الحالة</th>
          </tr>
        </thead>
        <tbody>
          ${salesReportData.value.map(invoice => `
            <tr>
              <td>${invoice.number}</td>
              <td>${new Date(invoice.date).toLocaleDateString('ar-SA')}</td>
              <td>${invoice.customer?.name}</td>
              <td>${invoice.total.toFixed(2)} ريال</td>
              <td>${invoice.status === 'posted' ? 'مُرحّلة' : 'مدفوعة'}</td>
            </tr>
          `).join('')}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" style="text-align: right; font-weight: bold;">المجموع الكلي:</td>
            <td style="font-weight: bold;">${salesReportTotals.value.total.toFixed(2)} ريال</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  `

  printReport(printContent, 'تقرير المبيعات')
}

const printInventoryReport = () => {
  if (!inventoryReportData.value.length) return

  const printContent = `
    <div class="print-invoice">
      <div class="print-header">
        <h1 style="font-size: 24px; margin: 0; color: #2563eb;">تقرير المخزون</h1>
        <div class="print-company-info">
          <h2 style="margin: 5px 0; color: #374151;">شركة المحاسبة والمخزون</h2>
          <p style="margin: 2px 0; color: #6b7280;">الرياض، المملكة العربية السعودية</p>
          <p style="margin: 2px 0; color: #6b7280;">هاتف: +966 11 234 5678 | بريد إلكتروني: info@company.com</p>
        </div>
        <div class="print-filters">
          <p style="margin: 2px 0;"><strong>تاريخ التقرير:</strong> ${new Date().toLocaleString('ar-SA')}</p>
        </div>
      </div>

      <table class="print-table">
        <thead>
          <tr>
            <th>المنتج</th>
            <th>الفئة</th>
            <th>الوحدة</th>
            <th>الكمية الحالية</th>
            <th>سعر الشراء</th>
            <th>القيمة الإجمالية</th>
            <th>الحالة</th>
          </tr>
        </thead>
        <tbody>
          ${inventoryReportData.value.map(item => `
            <tr>
              <td>${item.product.name}</td>
              <td>${item.product.category?.name || 'غير مصنف'}</td>
              <td>${item.unit.name}</td>
              <td>${item.currentQuantity}</td>
              <td>${item.purchasePrice.toFixed(2)} ريال</td>
              <td>${(item.currentQuantity * item.purchasePrice).toFixed(2)} ريال</td>
              <td>${getStockStatusText(item.currentQuantity)}</td>
            </tr>
          `).join('')}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="5" style="text-align: right; font-weight: bold;">إجمالي القيمة:</td>
            <td style="font-weight: bold;">${inventoryReportTotals.value.totalValue.toFixed(2)} ريال</td>
            <td></td>
          </tr>
          <tr>
            <td colspan="5" style="text-align: right; font-weight: bold;">إجمالي المنتجات:</td>
            <td style="font-weight: bold;">${inventoryReportTotals.value.totalItems}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  `

  printReport(printContent, 'تقرير المخزون')
}

const printReport = (content, title) => {
  const printWindow = window.open('', '_blank', 'width=800,height=600')
  if (!printWindow) {
    alert('يرجى السماح بفتح النوافذ المنبثقة لطباعة التقرير')
    return
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <style>
        @media print {
          .no-print {
            display: none !important;
          }

          .print-invoice {
            font-family: 'Noto Sans Arabic', 'Inter', sans-serif;
            direction: rtl;
            max-width: 210mm;
            margin: 0 auto;
            padding: 20mm;
            background: white;
            color: black;
          }

          .print-header {
            text-align: center;
            border-bottom: 2px solid #000;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }

          .print-company-info {
            margin-bottom: 20px;
          }

          .print-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
          }

          .print-table th,
          .print-table td {
            border: 1px solid #000;
            padding: 8px;
            text-align: right;
          }

          .print-table th {
            background: #f5f5f5;
            font-weight: bold;
          }

          .print-footer {
            margin-top: 40px;
            text-align: center;
            font-size: 12px;
            color: #666;
          }
        }

        body {
          font-family: 'Noto Sans Arabic', 'Inter', sans-serif;
          margin: 0;
          padding: 20px;
          background: white;
        }
      </style>
    </head>
    <body>
      ${content}
      <script>
        window.onload = function() {
          window.print();
          setTimeout(function() {
            window.close();
          }, 1000);
        }
      <\/script>
    </body>
    </html>
  `

  printWindow.document.write(htmlContent)
  printWindow.document.close()
}

const exportSalesReport = () => {
  if (!salesReportData.value.length) return

  // Create CSV content
  let csv = 'رقم الفاتورة,التاريخ,العميل,المبلغ,الحالة\n'
  salesReportData.value.forEach(invoice => {
    csv += `${invoice.number},${new Date(invoice.date).toLocaleDateString('ar-SA')},${invoice.customer?.name},${invoice.total}, ${invoice.status === 'posted' ? 'مُرحّلة' : 'مدفوعة'}\n`
  })

  // Download CSV
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', 'تقرير_المبيعات.csv')
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const exportInventoryReport = () => {
  if (!inventoryReportData.value.length) return

  // Create CSV content
  let csv = 'المنتج,الفئة,الوحدة,الكمية الحالية,سعر الشراء,القيمة الإجمالية,الحالة\n'
  inventoryReportData.value.forEach(item => {
    csv += `${item.product.name},${item.product.category?.name || 'غير مصنف'},${item.unit.name},${item.currentQuantity},${item.purchasePrice},${(item.currentQuantity * item.purchasePrice)},${getStockStatusText(item.currentQuantity)}\n`
  })

  // Download CSV
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', 'تقرير_المخزون.csv')
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Initialize
onMounted(() => {
  // Set default date range (last 30 days)
  const today = new Date()
  const thirtyDaysAgo = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000))

  salesFilters.value.endDate = today.toISOString().split('T')[0]
  salesFilters.value.startDate = thirtyDaysAgo.toISOString().split('T')[0]
})
</script>