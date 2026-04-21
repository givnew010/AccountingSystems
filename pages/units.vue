<template>
  <div class="min-h-screen bg-gray-100 overflow-hidden">
    <div class="flex flex-row h-screen">
      <ListSection title="وحدات القياس" :items="units" search-placeholder="البحث في الوحدات..."
        :disabled="!isViewMode" :selectedItemId="selectedItemId" @select-item="selectUnitById" />

      <div class="flex-1 m-2 bg-white p-5 rounded-lg overflow-auto">
        <ActionButtons :isViewMode="isViewMode" :showPrint="false" :editDisabled="!selectedItemId"
          :deleteDisabled="!selectedItemId" @new="newUnit" @edit="editUnit"
          @delete="deleteUnit" @save="saveUnit" @cancel="cancelEdit" />

        <form @submit.prevent="saveUnit" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">اسم الوحدة</label>
            <input v-model="unitForm.name" type="text" required :disabled="isViewMode"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              placeholder="أدخل اسم الوحدة (مثل: قطعة، كيلو، لتر)" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">الوصف</label>
            <textarea v-model="unitForm.description" rows="3" :disabled="isViewMode"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              placeholder="أدخل وصف الوحدة"></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">النوع</label>
            <select v-model="unitForm.type" :disabled="isViewMode"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100">
              <option value="weight">وزن</option>
              <option value="volume">حجم</option>
              <option value="count">عدد</option>
              <option value="length">طول</option>
              <option value="area">مساحة</option>
              <option value="other">أخرى</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">الرمز</label>
            <input v-model="unitForm.symbol" type="text" :disabled="isViewMode"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              placeholder="أدخل رمز الوحدة (مثل: كجم، لتر، م²)" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">الحالة</label>
            <select v-model="unitForm.status" :disabled="isViewMode"
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
import { onMounted, inject } from 'vue'
import { storeToRefs } from 'pinia'
import { injectToast } from '~/composables/useToast'
const unitsStore = useUnitsStore()
const { units, selectedItemId, isViewMode, unitForm } = storeToRefs(unitsStore)

const { addToast } = injectToast()
const showMessage = inject('showMessage')
const selectUnitById = (id) => unitsStore.selectUnitById(id)
const newUnit = () => unitsStore.newUnit()
const editUnit = () => unitsStore.editUnit()
const cancelEdit = () => unitsStore.cancelEdit()

const saveUnit = () => {
  const res = unitsStore.saveUnit()
  addToast(res.type === 'updated' ? 'تم تحديث الوحدة بنجاح' : 'تم إضافة الوحدة بنجاح', 'success')
}

const deleteUnit = () => {
  if (!selectedItemId.value) return
  showMessage({
    title: 'تأكيد الحذف',
    message: `هل أنت متأكد من حذف الوحدة «${unitForm.value.name}»؟`,
    cancelText: 'إلغاء',
    confirmText: 'حذف',
    onCancel: () => {},
    onConfirm: confirmDelete
  })
}

const confirmDelete = () => {
  const ok = unitsStore.confirmDeleteSelected()
  if (ok) addToast('تم حذف الوحدة بنجاح', 'success')
}

onMounted(() => {
  unitsStore.init()
})
</script>
