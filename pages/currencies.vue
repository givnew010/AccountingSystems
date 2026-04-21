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
import { onMounted, inject } from 'vue'
import { storeToRefs } from 'pinia'
import { injectToast } from '~/composables/useToast'
const currenciesStore = useCurrenciesStore()
const { currencies, selectedItemId, isViewMode, currencyForm } = storeToRefs(currenciesStore)
const { addToast } = injectToast()
const showMessage = inject('showMessage')

onMounted(() => {
  currenciesStore.init()
})

const newCurrency = () => currenciesStore.newCurrency()
const editCurrency = () => currenciesStore.editCurrency()
const cancelNewOrEdit = () => currenciesStore.cancelNewOrEdit()

const saveCurrency = () => {
  const res = currenciesStore.saveCurrency()
  addToast(res.type === 'updated' ? 'تم تحديث العملة بنجاح' : 'تم إضافة العملة بنجاح', 'success')
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
  const ok = currenciesStore.confirmDeleteSelected()
  if (ok) addToast('تم حذف العملة بنجاح', 'success')
}

const selectCurrencyById = id => currenciesStore.selectCurrencyById(id)
</script>
