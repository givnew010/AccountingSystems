<template>
  <div class="min-h-screen bg-gray-100 overflow-hidden">
    <div class="flex flex-row h-screen">
      <ListSection title="المستخدمون" :items="users" search-placeholder="البحث في المستخدمين..."
        :disabled="!isViewMode" :selectedItemId="selectedItemId" @select-item="selectItem" />

      <div class="flex-1 m-2 bg-white p-5 rounded-lg overflow-auto">
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
import { onMounted, inject } from 'vue'
import { storeToRefs } from 'pinia'
import { injectToast } from '~/composables/useToast'
const usersStore = useUsersStore()
const { availablePermissions, users, selectedItemId, isViewMode, currentData } = storeToRefs(usersStore)

const { addToast } = injectToast()
const showMessage = inject('showMessage')
const selectItem = (id) => usersStore.selectItem(id)
const newUser = () => usersStore.newUser()
const editUser = () => usersStore.editUser()
const cancelEdit = () => usersStore.cancelEdit()

const saveUser = () => {
  const res = usersStore.saveUser()
  addToast(res.type === 'updated' ? 'تم تحديث المستخدم بنجاح' : 'تم إضافة المستخدم بنجاح', 'success')
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
  const ok = usersStore.confirmDeleteSelected()
  if (ok) addToast('تم حذف المستخدم بنجاح', 'success')
}

onMounted(() => {
  usersStore.init()
})
</script>
