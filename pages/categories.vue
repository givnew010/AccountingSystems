<template>
  <div class="min-h-screen bg-gray-100 overflow-hidden">
    <div class="flex flex-row h-screen">
      <ListSection title="الفئات" :items="categories" search-placeholder="البحث في الفئات..."
        :disabled="!isViewMode" :selectedItemId="selectedItemId" @select-item="selectItem" />

      <div class="flex-1 m-2 bg-white p-5 rounded-lg overflow-auto">
        <ActionButtons :isViewMode="isViewMode" :showPrint="false" :editDisabled="!selectedItemId"
          :deleteDisabled="!selectedItemId" @new="newCategory" @edit="editCategory"
          @delete="deleteCategory" @save="saveCategory" @cancel="cancelEdit" />

        <form @submit.prevent="saveCategory" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">اسم الفئة</label>
            <input v-model="currentData.name" type="text" required :disabled="isViewMode"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              placeholder="أدخل اسم الفئة" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">الوصف</label>
            <textarea v-model="currentData.description" rows="3" :disabled="isViewMode"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              placeholder="أدخل وصف الفئة"></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">الحالة</label>
            <select v-model="currentData.status" :disabled="isViewMode"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100">
              <option value="active">نشط</option>
              <option value="inactive">غير نشط</option>
            </select>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { injectToast } from '~/composables/useToast'
const categoriesStore = useCategoriesStore()
const { categories, selectedItemId, isViewMode, currentData } = storeToRefs(categoriesStore)
const { addToast } = injectToast()
const showMessage = inject('showMessage')

onMounted(() => {
  categoriesStore.init()
})

const newCategory = () => categoriesStore.newCategory()
const editCategory = () => categoriesStore.editCategory()
const cancelEdit = () => categoriesStore.cancelEdit()

const saveCategory = () => {
  const res = categoriesStore.saveCategory()
  addToast(res.type === 'updated' ? 'تم تحديث الفئة بنجاح' : 'تم إضافة الفئة بنجاح', 'success')
}

const deleteCategory = () => {
  if (!selectedItemId.value) return
  showMessage({
    title: 'تأكيد الحذف',
    message: `هل أنت متأكد أنك تريد حذف هذه الفئة${currentData.value.name ? ` (${currentData.value.name})` : ''} ؟`,
    cancelText: 'إلغاء',
    confirmText: 'حذف',
    onCancel: () => {},
    onConfirm: confirmDelete
  })
}

const confirmDelete = () => {
  const ok = categoriesStore.confirmDeleteSelected()
  if (ok) addToast('تم حذف الفئة بنجاح', 'success')
}

const selectItem = (id) => categoriesStore.selectItem(id)
</script>
