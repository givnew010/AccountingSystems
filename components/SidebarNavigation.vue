<template>
  <div
    :class="[
      'fixed top-0 h-full bg-white border-r border-gray-200 shadow-sm transition-all duration-300 z-50',
      'hidden md:flex md:flex-col',
      sidebarStore.isCollapsed ? 'w-16' : 'w-64',
      'right-0'
    ]"
  >
    <!-- Header -->
    <div class="p-4 border-b border-gray-200">
      <button
        @click="sidebarStore.toggleCollapse"
        class="w-full flex items-center justify-center p-2 rounded-lg hover:bg-gray-100"
      >
        <Bars3Icon class="w-6 h-6 text-gray-600" />
      </button>
    </div>

    <!-- Navigation Items -->
    <nav class="flex-1 px-2 py-4 overflow-y-auto">
      <ul class="space-y-2">
        <li v-for="item in navigationItems" :key="item.name">
          <NuxtLink
            :to="item.path"
            :class="[
              'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors overflow-hidden',
              'hover:bg-blue-50 hover:text-blue-600',
              $route.path === item.path ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
            ]"
          >
            <component :is="item.icon" class="w-6 h-6 flex-shrink-0" />
            <span
              :class="[
                'text-sm font-medium whitespace-nowrap transition-all duration-300 overflow-hidden',
                sidebarStore.isCollapsed ? 'max-w-0 opacity-0' : 'max-w-xs opacity-100'
              ]"
            >
              {{ item.label }}
            </span>
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <!-- User Info -->
    <div class="p-4 border-t border-gray-200">
      <div class="flex items-center gap-3 mb-3 overflow-hidden">
        <div class="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold flex-shrink-0">
          م
        </div>
        <div
          :class="[
            'overflow-hidden transition-all duration-300 whitespace-nowrap',
            sidebarStore.isCollapsed ? 'max-w-0 opacity-0' : 'max-w-xs opacity-100'
          ]"
        >
          <p class="text-sm font-medium text-gray-900">{{ authStore.user?.name }}</p>
          <p class="text-xs text-gray-500">{{ authStore.user?.role }}</p>
        </div>
      </div>
      <button
        @click="logout"
        :class="[
          'w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors overflow-hidden',
          'hover:bg-red-50 hover:text-red-600 text-red-600'
        ]"
      >
        <ArrowRightOnRectangleIcon class="w-5 h-5 flex-shrink-0" />
        <span
          :class="[
            'text-sm font-medium whitespace-nowrap transition-all duration-300 overflow-hidden',
            sidebarStore.isCollapsed ? 'max-w-0 opacity-0' : 'max-w-xs opacity-100'
          ]"
        >
          تسجيل الخروج
        </span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useSidebarStore } from '~/stores/sidebar'
import { useAuthStore } from '~/stores/auth'
import {
  Bars3Icon,
  HomeIcon,
  UsersIcon,
  ShoppingBagIcon,
  CubeIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  CurrencyDollarIcon,
  ArrowRightOnRectangleIcon,
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
  { name: 'currencies', path: '/currencies', label: 'العملات', icon: CurrencyDollarIcon },
  { name: 'settings', path: '#', label: 'الإعدادات', icon: Cog6ToothIcon }
])

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>
