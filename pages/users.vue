<template>
  <div class="min-h-screen bg-gray-100 overflow-hidden">
    <div class="flex flex-col lg:flex-row h-screen">
      <ListSection title="المستخدمون" :items="users" search-placeholder="البحث في المستخدمين..."
        :disabled="!isViewMode" :selectedItemId="selectedItemId" @select-item="selectItem" />

      <div class="flex-1 m-2 bg-white p-5 rounded-lg overflow-auto lg:overflow-hidden min-h-0">
        <ActionButtons :isViewMode="isViewMode" :editDisabled="!selectedItemId"
          :deleteDisabled="!selectedItemId" @new="newUser" @edit="editUser"
          @delete="deleteUser" @save="saveUser" @cancel="cancelEdit" />

        <form @submit.prevent="saveUser" class="space-y-4 pb-4 pr-1">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">اسم المستخدم</label>
            <input v-model="currentData.username" type="text" required :disabled="isViewMode || !!selectedItemId"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              placeholder="أدخل اسم المستخدم" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل</label>
            <input v-model="currentData.name" type="text" required :disabled="isViewMode"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              placeholder="أدخل الاسم الكامل" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
            <input v-model="currentData.email" type="email" required :disabled="isViewMode"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              placeholder="أدخل البريد الإلكتروني" />
          </div>

          <div v-if="!selectedItemId || !isViewMode">
            <label class="block text-sm font-medium text-gray-700 mb-1">كلمة المرور</label>
            <input v-model="currentData.password" type="password" :required="!selectedItemId" :disabled="isViewMode"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              :placeholder="selectedItemId ? 'اترك فارغاً للإبقاء على كلمة المرور الحالية' : 'أدخل كلمة المرور'" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">الدور</label>
            <select v-model="currentData.role" required :disabled="isViewMode"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100">
              <option value="">اختر الدور</option>
              <option value="مدير النظام">مدير النظام</option>
              <option value="محاسب">محاسب</option>
              <option value="مدير مبيعات">مدير مبيعات</option>
              <option value="مدير مخازن">مدير مخازن</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">الحالة</label>
            <select v-model="currentData.status" required :disabled="isViewMode"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100">
              <option value="active">نشط</option>
              <option value="inactive">غير نشط</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">الصلاحيات</label>
            <div class="space-y-2 p-3 border border-gray-200 rounded-lg" :class="isViewMode ? 'bg-gray-50' : ''">
              <label v-for="permission in availablePermissions" :key="permission.key" class="flex items-center">
                <input v-model="currentData.permissions" :value="permission.key" type="checkbox"
                  :disabled="isViewMode"
                  class="rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50" />
                <span class="mr-2 text-sm text-gray-700">{{ permission.label }}</span>
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
import { injectToast } from '~/composables/useToast'
import { getDefaultValues } from '~/composables/helper'

const Structure = {
  id: { type: Number, default: null },
  no: { type: Number, default: null },
  username: { type: String, default: '' },
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  password: { type: String, default: '' },
  role: { type: String, default: '' },
  status: { type: String, default: 'active' },
  permissions: { type: Array, default: [] },
  createdAt: { type: String, default: '' },
  lastLogin: { type: String, default: null }
}

const { addToast } = injectToast()
const showMessage = inject('showMessage')

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

const users = ref([
  { id: 1, no: 1, name: 'المدير العام', username: 'admin', email: 'admin@company.com', role: 'مدير النظام', status: 'active', permissions: ['all'], createdAt: '2024-01-15T10:00:00Z', lastLogin: '2024-01-17T09:30:00Z' },
  { id: 2, no: 2, name: 'أحمد المحاسب', username: 'accountant', email: 'accountant@company.com', role: 'محاسب', status: 'active', permissions: ['sales', 'purchases', 'reports'], createdAt: '2024-01-16T14:20:00Z', lastLogin: '2024-01-17T08:15:00Z' },
  { id: 3, no: 3, name: 'فاطمة المبيعات', username: 'sales_manager', email: 'sales@company.com', role: 'مدير مبيعات', status: 'active', permissions: ['sales', 'customers', 'reports'], createdAt: '2024-01-16T16:45:00Z', lastLogin: null }
])

const selectedItemId = ref(null)
const lastSelectedItemId = ref(null)
const isViewMode = ref(true)
const currentData = ref({ ...getDefaultValues(Structure) })

const selectItem = (id) => {
  const user = users.value.find(u => u.id === id) ?? { ...getDefaultValues(Structure) }
  selectedItemId.value = user.id ?? null
  currentData.value = { ...user, password: '' }
}

const newUser = () => {
  isViewMode.value = false
  lastSelectedItemId.value = selectedItemId.value
  selectItem(-1)
}

const editUser = () => {
  if (selectedItemId.value) {
    isViewMode.value = false
    lastSelectedItemId.value = selectedItemId.value
  }
}

const saveUser = () => {
  if (selectedItemId.value) {
    const index = users.value.findIndex(u => u.id === selectedItemId.value)
    if (index > -1) {
      const existing = users.value[index]
      users.value[index] = {
        ...currentData.value,
        id: selectedItemId.value,
        password: currentData.value.password || existing.password,
        createdAt: existing.createdAt,
        lastLogin: existing.lastLogin
      }
      isViewMode.value = true
      selectItem(users.value[index].id)
      addToast('تم تحديث المستخدم بنجاح', 'success')
    }
  } else {
    const newId = Math.max(...users.value.map(u => u.id)) + 1
    const newUser = { ...currentData.value, id: newId, no: newId, createdAt: new Date().toISOString(), lastLogin: null }
    users.value.push(newUser)
    isViewMode.value = true
    selectItem(newUser.id)
    addToast('تم إضافة المستخدم بنجاح', 'success')
  }
}

const cancelEdit = () => {
  isViewMode.value = true
  selectItem(lastSelectedItemId.value)
}

const deleteUser = () => {
  if (!selectedItemId.value) return
  showMessage({
    title: 'تأكيد الحذف',
    message: `هل أنت متأكد من حذف المستخدم «${currentData.value.name}»؟ سيتم إلغاء جميع صلاحياته.`,
    cancelText: 'إلغاء',
    confirmText: 'حذف',
    onCancel: () => {},
    onConfirm: confirmDelete
  })
}

const confirmDelete = () => {
  const index = users.value.findIndex(u => u.id === currentData.value.id)
  if (index > -1) {
    users.value.splice(index, 1)
    selectItem(index >= 0 && index < users.value.length ?
      users.value[index].id : index === users.value.length ?
        users.value[index - 1]?.id : null)
    addToast('تم حذف المستخدم بنجاح', 'success')
  }
}

onMounted(() => {
  isViewMode.value = true
  selectItem(users.value[0]?.id ?? -1)
})
</script>
