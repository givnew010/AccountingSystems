<template>
  <div class="flex h-screen">
    <!-- List Section -->
    <div class="w-2/5 border-l border-gray-200 bg-gray-50 p-6 overflow-y-auto">
      <div class="mb-6">
        <h2 class="text-xl font-bold text-gray-900 mb-4">المستخدمون</h2>

        <!-- Search -->
        <div class="mb-4">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="البحث في المستخدمين..."
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <!-- Users List -->
        <div class="space-y-2">
          <div
            v-for="user in filteredUsers"
            :key="user.id"
            @click="selectUser(user)"
            :class="[
              'p-4 rounded-lg cursor-pointer transition-colors',
              selectedUser?.id === user.id
                ? 'bg-blue-100 border-2 border-blue-500'
                : 'bg-white border border-gray-200 hover:bg-gray-50'
            ]"
          >
            <div class="flex items-center">
              <div class="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold flex-shrink-0 ml-3">
                {{ user.name.charAt(0) }}
              </div>
              <div class="flex-1">
                <h3 class="font-medium text-gray-900">{{ user.name }}</h3>
                <p class="text-sm text-gray-600">{{ user.email }}</p>
                <div class="flex justify-between items-center mt-1">
                  <span class="text-xs text-gray-500">{{ user.role }}</span>
                  <span
                    :class="[
                      'px-2 py-1 text-xs rounded-full',
                      user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    ]"
                  >
                    {{ user.status === 'active' ? 'نشط' : 'غير نشط' }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div class="flex justify-between items-center mt-4">
          <button
            @click="currentPage > 1 && currentPage--"
            :disabled="currentPage === 1"
            class="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            السابق
          </button>
          <span class="text-sm text-gray-600">
            الصفحة {{ currentPage }} من {{ totalPages }}
          </span>
          <button
            @click="currentPage < totalPages && currentPage++"
            :disabled="currentPage === totalPages"
            class="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            التالي
          </button>
        </div>
      </div>
    </div>

    <!-- Content Section -->
    <div class="w-3/5 bg-white p-6 overflow-y-auto">
      <!-- Action Buttons -->
      <div class="flex gap-2 mb-6">
        <button
          @click="newUser"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <PlusIcon class="w-5 h-5" />
          جديد
        </button>
        <button
          @click="editUser"
          :disabled="!selectedUser"
          class="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <PencilIcon class="w-5 h-5" />
          تعديل
        </button>
        <button
          @click="deleteUser"
          :disabled="!selectedUser"
          class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <TrashIcon class="w-5 h-5" />
          حذف
        </button>
        <button
          @click="resetPassword"
          :disabled="!selectedUser"
          class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <KeyIcon class="w-5 h-5" />
          إعادة تعيين كلمة المرور
        </button>
      </div>

      <!-- User Form -->
      <form v-if="showForm" @submit.prevent="saveUser" class="max-w-md space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">اسم المستخدم</label>
          <input
            v-model="userForm.username"
            type="text"
            required
            :disabled="isEdit"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
            placeholder="أدخل اسم المستخدم"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">الاسم الكامل</label>
          <input
            v-model="userForm.name"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="أدخل الاسم الكامل"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
          <input
            v-model="userForm.email"
            type="email"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="أدخل البريد الإلكتروني"
          />
        </div>

        <div v-if="!isEdit">
          <label class="block text-sm font-medium text-gray-700 mb-2">كلمة المرور</label>
          <input
            v-model="userForm.password"
            type="password"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="أدخل كلمة المرور"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">الدور</label>
          <select
            v-model="userForm.role"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">اختر الدور</option>
            <option value="مدير النظام">مدير النظام</option>
            <option value="محاسب">محاسب</option>
            <option value="مدير مبيعات">مدير مبيعات</option>
            <option value="مدير مخازن">مدير مخازن</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">الحالة</label>
          <select
            v-model="userForm.status"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="active">نشط</option>
            <option value="inactive">غير نشط</option>
          </select>
        </div>

        <!-- Permissions Section -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-3">الصلاحيات</label>
          <div class="space-y-2">
            <label v-for="permission in availablePermissions" :key="permission.key" class="flex items-center">
              <input
                v-model="userForm.permissions"
                :value="permission.key"
                type="checkbox"
                class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span class="mr-2 text-sm text-gray-700">{{ permission.label }}</span>
            </label>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="flex gap-4 pt-6">
          <button
            type="submit"
            :disabled="saving"
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ saving ? 'جاري الحفظ...' : 'حفظ' }}
          </button>
          <button
            type="button"
            @click="cancelEdit"
            class="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            إلغاء
          </button>
        </div>
      </form>

      <!-- User Details -->
      <div v-else-if="selectedUser" class="max-w-md">
        <div class="bg-gray-50 rounded-lg p-6">
          <div class="flex items-center mb-6">
            <div class="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl">
              {{ selectedUser.name.charAt(0) }}
            </div>
            <div class="mr-4">
              <h3 class="text-lg font-medium text-gray-900">{{ selectedUser.name }}</h3>
              <p class="text-sm text-gray-600">{{ selectedUser.email }}</p>
            </div>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">اسم المستخدم</label>
              <p class="mt-1 text-sm text-gray-900">{{ selectedUser.username }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">الدور</label>
              <p class="mt-1 text-sm text-gray-900">{{ selectedUser.role }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">الحالة</label>
              <span
                :class="[
                  'inline-flex px-2 py-1 text-xs rounded-full mt-1',
                  selectedUser.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                ]"
              >
                {{ selectedUser.status === 'active' ? 'نشط' : 'غير نشط' }}
              </span>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">تاريخ الإنشاء</label>
              <p class="mt-1 text-sm text-gray-900">{{ formatDate(selectedUser.createdAt) }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">آخر دخول</label>
              <p class="mt-1 text-sm text-gray-900">{{ selectedUser.lastLogin ? formatDate(selectedUser.lastLogin) : 'لم يسجل دخول بعد' }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">الصلاحيات</label>
              <div class="flex flex-wrap gap-1">
                <span
                  v-for="permission in selectedUser.permissions"
                  :key="permission"
                  class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                >
                  {{ getPermissionLabel(permission) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <UsersIcon class="mx-auto h-12 w-12 text-gray-400" />
        <h3 class="mt-2 text-sm font-medium text-gray-900">لا يوجد مستخدم محدد</h3>
        <p class="mt-1 text-sm text-gray-500">اختر مستخدم من القائمة أو أنشئ مستخدم جديد</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  UsersIcon,
  KeyIcon
} from '@heroicons/vue/24/outline'

// Mock data
const users = ref([
  {
    id: 1,
    username: 'admin',
    name: 'المدير العام',
    email: 'admin@company.com',
    role: 'مدير النظام',
    status: 'active',
    permissions: ['all'],
    createdAt: '2024-01-15T10:00:00Z',
    lastLogin: '2024-01-17T09:30:00Z'
  },
  {
    id: 2,
    username: 'accountant',
    name: 'أحمد المحاسب',
    email: 'accountant@company.com',
    role: 'محاسب',
    status: 'active',
    permissions: ['sales', 'purchases', 'reports'],
    createdAt: '2024-01-16T14:20:00Z',
    lastLogin: '2024-01-17T08:15:00Z'
  },
  {
    id: 3,
    username: 'sales_manager',
    name: 'فاطمة المبيعات',
    email: 'sales@company.com',
    role: 'مدير مبيعات',
    status: 'active',
    permissions: ['sales', 'customers', 'reports'],
    createdAt: '2024-01-16T16:45:00Z',
    lastLogin: null
  }
])

const availablePermissions = ref([
  { key: 'sales', label: 'المبيعات' },
  { key: 'purchases', label: 'المشتريات' },
  { key: 'customers', label: 'العملاء' },
  { key: 'products', label: 'المنتجات' },
  { key: 'reports', label: 'التقارير' },
  { key: 'settings', label: 'الإعدادات' },
  { key: 'users', label: 'إدارة المستخدمين' },
  { key: 'all', label: 'جميع الصلاحيات' }
])

// Reactive state
const selectedUser = ref(null)
const showForm = ref(false)
const saving = ref(false)
const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)
const isEdit = ref(false)

const userForm = ref({
  id: null,
  username: '',
  name: '',
  email: '',
  password: '',
  role: '',
  status: 'active',
  permissions: []
})

// Computed properties
const filteredUsers = computed(() => {
  let filtered = users.value

  if (searchQuery.value) {
    filtered = filtered.filter(user =>
      user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  return filtered
})

const totalPages = computed(() => {
  return Math.ceil(filteredUsers.value.length / itemsPerPage.value)
})

// Methods
const selectUser = (user) => {
  selectedUser.value = user
  showForm.value = false
}

const newUser = () => {
  selectedUser.value = null
  isEdit.value = false
  userForm.value = {
    id: null,
    username: '',
    name: '',
    email: '',
    password: '',
    role: '',
    status: 'active',
    permissions: []
  }
  showForm.value = true
}

const editUser = () => {
  if (!selectedUser.value) return

  isEdit.value = true
  userForm.value = {
    ...selectedUser.value,
    password: '' // Don't show password in edit mode
  }
  showForm.value = true
}

const saveUser = async () => {
  saving.value = true

  try {
    if (userForm.value.id) {
      // Update existing user
      const index = users.value.findIndex(u => u.id === userForm.value.id)
      if (index !== -1) {
        users.value[index] = {
          ...userForm.value,
          // Don't update password if empty (edit mode)
          password: userForm.value.password || users.value[index].password
        }
      }
    } else {
      // Add new user
      const newId = Math.max(...users.value.map(u => u.id)) + 1
      users.value.push({
        ...userForm.value,
        id: newId,
        createdAt: new Date().toISOString(),
        lastLogin: null
      })
    }

    showForm.value = false
    selectedUser.value = null
    isEdit.value = false
  } catch (error) {
    console.error('Error saving user:', error)
  } finally {
    saving.value = false
  }
}

const deleteUser = () => {
  if (!selectedUser.value) return

  if (confirm('هل أنت متأكد من حذف هذا المستخدم؟ سيتم إلغاء جميع صلاحياته.')) {
    const index = users.value.findIndex(u => u.id === selectedUser.value.id)
    if (index !== -1) {
      users.value.splice(index, 1)
      selectedUser.value = null
      showForm.value = false
    }
  }
}

const resetPassword = () => {
  if (!selectedUser.value) return

  const newPassword = prompt('أدخل كلمة المرور الجديدة:')
  if (newPassword) {
    // In real app, this would hash the password and update it
    alert('تم إعادة تعيين كلمة المرور بنجاح')
  }
}

const cancelEdit = () => {
  showForm.value = false
  isEdit.value = false
  userForm.value = {
    id: null,
    username: '',
    name: '',
    email: '',
    password: '',
    role: '',
    status: 'active',
    permissions: []
  }
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getPermissionLabel = (permissionKey) => {
  const permission = availablePermissions.value.find(p => p.key === permissionKey)
  return permission ? permission.label : permissionKey
}

onMounted(() => {
  // Initialize with first user selected if available
  if (users.value.length > 0) {
    selectedUser.value = users.value[0]
  }
})
</script>