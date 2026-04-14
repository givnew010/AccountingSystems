<template>
  <div class="min-h-screen bg-gray-100 overflow-hidden">
    <div class="flex flex-row h-screen">
      <ListSection title="العملات" :items="currencies" search-placeholder="البحث في العملات..."
        :disabled="!isViewMode" :selectedItemId="selectedItemId" @select-item="selectCurrencyById" />

      <div class="flex-1 m-2 bg-white p-5 rounded-lg overflow-auto">
        <ActionButtons :isViewMode="isViewMode" :editDisabled="!selectedItemId" :deleteDisabled="!selectedItemId"
          @new="newCurrency" @edit="editCurrency" @delete="deleteCurrency"
          @save="saveCurrency" @cancel="cancelNewOrEdit" />

        <form @submit.prevent="saveCurrency" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">اسم العملة</label>
            <input v-model="currencyForm.name" type="text" required :disabled="isViewMode"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">رمز العملة</label>
            <input v-model="currencyForm.code" type="text" required :disabled="isViewMode"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">الرمز</label>
            <input v-model="currencyForm.symbol" type="text" required :disabled="isViewMode"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">سعر الصرف</label>
            <input v-model.number="currencyForm.exchangeRate" type="number" step="0.0001" required min="0"
              :disabled="isViewMode"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100" />
            <p class="text-xs text-gray-500 mt-1">
              1 {{ currencyForm.code || 'العملة' }} = {{ currencyForm.exchangeRate || 0 }} ر.س
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">الحالة</label>
            <select v-model="currencyForm.status" :disabled="isViewMode"
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

const currencies = ref([
  { id: 1, no: 1, name: 'الريال السعودي', code: 'SAR', symbol: 'ر.س', exchangeRate: 1.0, status: 'active' },
  { id: 2, no: 2, name: 'الدولار الأمريكي', code: 'USD', symbol: '$', exchangeRate: 3.75, status: 'active' },
  { id: 3, no: 3, name: 'اليورو', code: 'EUR', symbol: '€', exchangeRate: 4.1, status: 'active' },
  { id: 4, no: 4, name: 'الجنيه الإسترليني', code: 'GBP', symbol: '£', exchangeRate: 4.8, status: 'inactive' }
])

const Structure = {
  id: { type: Number, default: null },
  no: { type: Number, default: null },
  name: { type: String, default: '' },
  code: { type: String, default: '' },
  symbol: { type: String, default: '' },
  exchangeRate: { type: Number, default: 1.0 },
  status: { type: String, default: 'active' }
}

const selectedItemId = ref(null)
const lastSelectedItemId = ref(null)
const isViewMode = ref(true)
const { addToast } = injectToast()
const showMessage = inject('showMessage')
const currencyForm = ref({ ...getDefaultValues(Structure) })

onMounted(() => {
  isViewMode.value = true
  selectCurrencyById(currencies.value[0]?.id ?? -1)
})

const newCurrency = () => {
  isViewMode.value = false
  lastSelectedItemId.value = selectedItemId.value
  selectCurrencyById(-1)
}

const editCurrency = () => {
  if (selectedItemId.value) {
    isViewMode.value = false
    lastSelectedItemId.value = selectedItemId.value
  }
}

const saveCurrency = () => {
  if (selectedItemId.value) {
    const idx = currencies.value.findIndex(c => c.id === selectedItemId.value)
    if (idx > -1) {
      currencies.value[idx] = { ...currencyForm.value, id: selectedItemId.value }
      isViewMode.value = true
      selectCurrencyById(currencies.value[idx].id)
      addToast('تم تحديث العملة بنجاح', 'success')
    }
  } else {
    const newId = Math.max(...currencies.value.map(c => c.id)) + 1
    const newCur = { ...currencyForm.value, id: newId, no: newId }
    currencies.value.push(newCur)
    isViewMode.value = true
    selectCurrencyById(newCur.id)
    addToast('تم إضافة العملة بنجاح', 'success')
  }
}

const cancelNewOrEdit = () => {
  isViewMode.value = true
  selectCurrencyById(lastSelectedItemId.value)
}

const deleteCurrency = () => {
  if (!selectedItemId.value) return
  const cur = currencies.value.find(c => c.id === selectedItemId.value)
  showMessage({
    title: 'تأكيد الحذف',
    message: `هل أنت متأكد من حذف العملة «${cur?.name || ''}»؟`,
    cancelText: 'إلغاء',
    confirmText: 'حذف',
    onCancel: () => {},
    onConfirm: confirmDelete
  })
}

const confirmDelete = () => {
  const id = selectedItemId.value
  const idx = currencies.value.findIndex(c => c.id === id)
  if (idx > -1) {
    currencies.value.splice(idx, 1)
    const nextId = currencies.value[idx]?.id || currencies.value[idx - 1]?.id || null
    selectCurrencyById(nextId)
    addToast('تم حذف العملة بنجاح', 'success')
  }
}

const selectCurrencyById = id => {
  const cur = currencies.value.find(c => c.id === id) ?? { ...getDefaultValues(Structure) }
  selectedItemId.value = cur.id ?? null
  currencyForm.value = { ...cur }
}
</script>
