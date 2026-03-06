<template>
  <div class="p-6">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900 mb-2">لوحة التحكم</h1>
      <p class="text-gray-600">مرحباً بك، {{ authStore.user?.name }}</p>
    </div>

    <!-- Quick Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 rounded-lg">
            <UsersIcon class="w-6 h-6 text-blue-600" />
          </div>
          <div class="mr-4">
            <p class="text-sm font-medium text-gray-600">العملاء</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.customers }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-2 bg-green-100 rounded-lg">
            <ShoppingBagIcon class="w-6 h-6 text-green-600" />
          </div>
          <div class="mr-4">
            <p class="text-sm font-medium text-gray-600">المبيعات اليوم</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.todaySales }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-2 bg-yellow-100 rounded-lg">
            <CubeIcon class="w-6 h-6 text-yellow-600" />
          </div>
          <div class="mr-4">
            <p class="text-sm font-medium text-gray-600">المنتجات</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.products }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-2 bg-red-100 rounded-lg">
            <ArrowUturnLeftIcon class="w-6 h-6 text-red-600" />
          </div>
          <div class="mr-4">
            <p class="text-sm font-medium text-gray-600">المرتجعات</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.returns }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">النشاط الأخير</h2>
      <div class="space-y-4">
        <div v-for="activity in recentActivities" :key="activity.id" class="flex items-center p-4 bg-gray-50 rounded-lg">
          <div class="flex-shrink-0">
            <component :is="activity.icon" class="w-5 h-5 text-gray-600" />
          </div>
          <div class="mr-4 flex-1">
            <p class="text-sm font-medium text-gray-900">{{ activity.title }}</p>
            <p class="text-sm text-gray-600">{{ activity.description }}</p>
          </div>
          <div class="text-sm text-gray-500">
            {{ activity.time }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth'
import {
  UsersIcon,
  ShoppingBagIcon,
  CubeIcon,
  ArrowUturnLeftIcon,
  DocumentTextIcon,
  ArrowPathIcon
} from '@heroicons/vue/24/outline'

const authStore = useAuthStore()

// Mock statistics - in real app, this would come from API
const stats = ref({
  customers: 45,
  todaySales: 12,
  products: 156,
  returns: 3
})

// Mock recent activities
const recentActivities = ref([
  {
    id: 1,
    title: 'فاتورة مبيعات جديدة',
    description: 'تم إنشاء فاتورة مبيعات رقم 1001',
    time: 'منذ 5 دقائق',
    icon: DocumentTextIcon
  },
  {
    id: 2,
    title: 'تحديث المخزون',
    description: 'تم تحديث كمية المنتج "لابتوب ديل"',
    time: 'منذ 15 دقيقة',
    icon: ArrowPathIcon
  },
  {
    id: 3,
    title: 'عميل جديد',
    description: 'تم إضافة العميل "شركة الأمل للتجارة"',
    time: 'منذ ساعة',
    icon: UsersIcon
  }
])
</script>