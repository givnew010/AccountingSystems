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
import { ref, onMounted, inject } from 'vue'
import { injectToast } from '~/composables/useToast'
import { getDefaultValues } from '~/composables/helper'

const Structure = {
  id: { type: Number, default: null },
  no: { type: Number, default: null },
  name: { type: String, default: '' },
  symbol: { type: String, default: '' },
  type: { type: String, default: 'count' },
  description: { type: String, default: '' },
  status: { type: String, default: 'active' },
  usageCount: { type: Number, default: 0 }
}

const { addToast } = injectToast()
const showMessage = inject('showMessage')

const units = ref([
  { id: 1, no: 1, name: 'قطعة', symbol: 'قطعة', type: 'count', description: 'وحدة العد للأشياء القابلة للعد', status: 'active', usageCount: 25 },
  { id: 2, no: 2, name: 'كيلو جرام', symbol: 'كجم', type: 'weight', description: 'وحدة قياس الوزن', status: 'active', usageCount: 15 },
  { id: 3, no: 3, name: 'لتر', symbol: 'لتر', type: 'volume', description: 'وحدة قياس الحجم للسوائل', status: 'active', usageCount: 8 },
  { id: 4, no: 4, name: 'متر مربع', symbol: 'م²', type: 'area', description: 'وحدة قياس المساحة', status: 'active', usageCount: 3 },
  { id: 5, no: 5, name: 'علبة', symbol: 'علبة', type: 'count', description: 'وحدة العد للعلب والحزم', status: 'inactive', usageCount: 0 }
])

const selectedItemId = ref(null)
const lastSelectedItemId = ref(null)
const isViewMode = ref(true)

const unitForm = ref({ ...getDefaultValues(Structure) })

const selectUnitById = (id) => {
  const unit = units.value.find(u => u.id === id) ?? { ...getDefaultValues(Structure) }
  selectedItemId.value = unit.id ?? null
  unitForm.value = { ...unit }
}

const newUnit = () => {
  isViewMode.value = false
  lastSelectedItemId.value = selectedItemId.value
  selectUnitById(-1)
}

const editUnit = () => {
  if (selectedItemId.value) {
    isViewMode.value = false
    lastSelectedItemId.value = selectedItemId.value
  }
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
  const id = unitForm.value.id
  const index = units.value.findIndex(u => u.id === id)
  if (index > -1) {
    units.value.splice(index, 1)
    const nextId = units.value[index]?.id ?? units.value[index - 1]?.id ?? null
    selectUnitById(nextId)
    addToast('تم حذف الوحدة بنجاح', 'success')
  }
}

const saveUnit = () => {
  if (selectedItemId.value) {
    const index = units.value.findIndex(u => u.id === selectedItemId.value)
    if (index > -1) {
      units.value[index] = { ...unitForm.value, id: selectedItemId.value }
      isViewMode.value = true
      selectUnitById(units.value[index].id)
      addToast('تم تحديث الوحدة بنجاح', 'success')
    }
  } else {
    const newId = Math.max(...units.value.map(u => u.id)) + 1
    const newUnitData = { ...unitForm.value, id: newId, no: newId, usageCount: 0 }
    units.value.push(newUnitData)
    isViewMode.value = true
    selectUnitById(newUnitData.id)
    addToast('تم إضافة الوحدة بنجاح', 'success')
  }
}

const cancelEdit = () => {
  isViewMode.value = true
  selectUnitById(lastSelectedItemId.value)
}

onMounted(() => {
  isViewMode.value = true
  selectUnitById(units.value[0]?.id ?? -1)
})
</script>
