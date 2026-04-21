import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getDefaultValues } from '~/composables/helper'

const UserStructure = {
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

export const useUsersStore = defineStore('users', () => {
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
    {
      id: 1,
      no: 1,
      name: 'المدير العام',
      username: 'admin',
      email: 'admin@company.com',
      role: 'مدير النظام',
      status: 'active',
      permissions: ['all'],
      password: 'admin@123',
      createdAt: '2024-01-15T10:00:00Z',
      lastLogin: '2024-01-17T09:30:00Z'
    },
    {
      id: 2,
      no: 2,
      name: 'أحمد المحاسب',
      username: 'accountant',
      email: 'accountant@company.com',
      role: 'محاسب',
      status: 'active',
      permissions: ['sales', 'purchases', 'reports'],
      password: 'acc123',
      createdAt: '2024-01-16T14:20:00Z',
      lastLogin: '2024-01-17T08:15:00Z'
    },
    {
      id: 3,
      no: 3,
      name: 'فاطمة المبيعات',
      username: 'sales_manager',
      email: 'sales@company.com',
      role: 'مدير مبيعات',
      status: 'active',
      permissions: ['sales', 'customers', 'reports'],
      password: 'mgr123',
      createdAt: '2024-01-16T16:45:00Z',
      lastLogin: null
    }
  ])

  const selectedItemId = ref<number | null>(null)
  const lastSelectedItemId = ref<number | null>(null)
  const isViewMode = ref(true)
  const currentData = ref<any>({ ...getDefaultValues(UserStructure) })

  function selectItem(id: number | null) {
    const user = users.value.find(u => u.id === id) ?? ({ ...getDefaultValues(UserStructure) } as any)
    selectedItemId.value = user.id ?? null
    currentData.value = { ...user, password: '' }
  }

  function newUser() {
    isViewMode.value = false
    lastSelectedItemId.value = selectedItemId.value
    selectItem(-1 as any)
  }

  function editUser() {
    if (selectedItemId.value) {
      isViewMode.value = false
      lastSelectedItemId.value = selectedItemId.value
    }
  }

  function saveUser(): { type: 'created' | 'updated'; id: number } {
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
        return { type: 'updated', id: users.value[index].id }
      }
    }

    const newId = Math.max(...users.value.map(u => u.id), 0) + 1
    const created = {
      ...currentData.value,
      id: newId,
      no: newId,
      createdAt: new Date().toISOString(),
      lastLogin: null
    }
    users.value.push(created)
    isViewMode.value = true
    selectItem(created.id)
    return { type: 'created', id: created.id }
  }

  function cancelEdit() {
    isViewMode.value = true
    selectItem(lastSelectedItemId.value)
  }

  function confirmDeleteSelected(): boolean {
    const index = users.value.findIndex(u => u.id === currentData.value?.id)
    if (index <= -1) return false
    users.value.splice(index, 1)
    const nextId =
      (index >= 0 && index < users.value.length ? users.value[index].id : null) ??
      (index === users.value.length ? users.value[index - 1]?.id : null) ??
      null
    selectItem(nextId)
    return true
  }

  function init() {
    isViewMode.value = true
    selectItem(users.value[0]?.id ?? (-1 as any))
  }

  return {
    availablePermissions,
    users,
    selectedItemId,
    lastSelectedItemId,
    isViewMode,
    currentData,
    selectItem,
    newUser,
    editUser,
    saveUser,
    cancelEdit,
    confirmDeleteSelected,
    init
  }
})

