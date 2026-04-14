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
import { ref, inject, onMounted } from 'vue'
import { injectToast } from '~/composables/useToast'
import { getDefaultValues } from '~/composables/helper'

const Structure = {
  id: { type: Number, default: null },
  no: { type: Number, default: null },
  name: { type: String, default: '' },
  description: { type: String, default: '' },
  status: { type: String, default: 'active' },
  productCount: { type: Number, default: 0 }
}

const selectedItemId = ref(null)
const lastSelectedItemId = ref(null)
const isViewMode = ref(true)
const { addToast } = injectToast()
const currentData = ref({ ...getDefaultValues(Structure) })
const showMessage = inject('showMessage')

const categories = ref([
  { id: 1, no: 1, name: 'أجهزة كمبيوتر', description: 'أجهزة الكمبيوتر واللابتوب والملحقات', status: 'active', productCount: 15 },
  { id: 2, no: 2, name: 'ملحقات', description: 'ملحقات الكمبيوتر والأجهزة المكتبية', status: 'active', productCount: 8 },
  { id: 3, no: 3, name: 'أثاث مكتبي', description: 'الأثاث والمعدات المكتبية', status: 'active', productCount: 5 },
  { id: 4, no: 4, name: 'أجهزة إلكترونية', description: 'الأجهزة الإلكترونية والجوالات', status: 'inactive', productCount: 0 }
])

onMounted(() => {
  isViewMode.value = true
  selectItem(categories.value[0]?.id ?? -1)
})

const newCategory = () => {
  isViewMode.value = false
  lastSelectedItemId.value = selectedItemId.value
  selectItem(-1)
}

const editCategory = () => {
  if (selectedItemId.value) {
    isViewMode.value = false
    lastSelectedItemId.value = selectedItemId.value
  }
}

const saveCategory = () => {
  if (selectedItemId.value) {
    const index = categories.value.findIndex(c => c.id === selectedItemId.value)
    if (index > -1) {
      categories.value[index] = { ...currentData.value, id: selectedItemId.value }
      isViewMode.value = true
      selectItem(categories.value[index].id)
      addToast('تم تحديث الفئة بنجاح', 'success')
    }
  } else {
    const newId = Math.max(...categories.value.map(c => c.id)) + 1
    const newCategoryData = { ...currentData.value, id: newId, no: newId, productCount: 0 }
    categories.value.push(newCategoryData)
    isViewMode.value = true
    selectItem(newCategoryData.id)
    addToast('تم إضافة الفئة بنجاح', 'success')
  }
}

const cancelEdit = () => {
  isViewMode.value = true
  selectItem(lastSelectedItemId.value)
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
  const index = categories.value.findIndex(c => c.id === currentData.value.id)
  if (index > -1) {
    categories.value.splice(index, 1)
    selectItem(index >= 0 && index < categories.value.length ?
      categories.value[index].id : index === categories.value.length ?
        categories.value[index - 1]?.id : null)
    addToast('تم حذف الفئة بنجاح', 'success')
  }
}

const selectItem = (id) => {
  const category = categories.value.find(c => c.id === id) ?? { ...getDefaultValues(Structure) }
  selectedItemId.value = category.id ?? null
  currentData.value = { ...category }
}
</script>
