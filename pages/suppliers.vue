<template>
  <div class="min-h-screen bg-gray-100 overflow-hidden">
    <div class="flex flex-row h-screen">
      <ListSection title="الموردين" :items="suppliers" search-placeholder="البحث في الموردين..."
        :disabled="!isViewMode" :selectedItemId="selectedItemId" @select-item="selectItem" />

      <div class="flex-1 m-2 bg-white p-5 rounded-lg overflow-auto">
        <ActionButtons :isViewMode="isViewMode" :showPrint="true" :editDisabled="!selectedItemId"
          :deleteDisabled="!selectedItemId" :printDisabled="!selectedItemId" @new="newSupplier" @edit="editSupplier"
          @delete="deleteSupplier" @print="printSupplier" @save="saveSupplier" @cancel="cancelNewOrEdit" />

        <form @submit.prevent="saveSupplier" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">الاسم</label>
            <input v-model="currentData.name" type="text" required :disabled="isViewMode"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">الهاتف</label>
            <input v-model="currentData.phone" type="tel" required :disabled="isViewMode"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
            <input v-model="currentData.email" type="email" :disabled="isViewMode"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">العنوان</label>
            <textarea v-model="currentData.address" rows="3" :disabled="isViewMode"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"></textarea>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">الرصيد الافتتاحي</label>
              <input v-model.number="currentData.openingBalance" type="number" step="0.01" min="0"
                :disabled="isViewMode"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">نوع الرصيد</label>
              <select v-model="currentData.balanceType" :disabled="isViewMode"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100">
                <option value="debit">مدين</option>
                <option value="credit">دائن</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">شروط الدفع</label>
            <select v-model="currentData.paymentTerms" :disabled="isViewMode"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100">
              <option value="immediate">فوري</option>
              <option value="7days">7 أيام</option>
              <option value="15days">15 يوم</option>
              <option value="30days">30 يوم</option>
              <option value="60days">60 يوم</option>
            </select>
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
  phone: { type: String, default: '' },
  email: { type: String, default: '' },
  address: { type: String, default: '' },
  openingBalance: { type: Number, default: 0 },
  balanceType: { type: String, default: 'credit' },
  paymentTerms: { type: String, default: '30days' },
  status: { type: String, default: 'active' }
}

const selectedItemId = ref(null)
const lastSelectedItemId = ref(null)
const isViewMode = ref(true)
const { addToast } = injectToast()
const currentData = ref({ ...getDefaultValues(Structure) })
const showMessage = inject('showMessage')

const suppliers = ref([
  { id: 1, no: 1, name: 'شركة الأدوات المكتبية', phone: '0112345678', email: 'office@tools-sa.com', address: 'الرياض، المملكة العربية السعودية', openingBalance: 2500, balanceType: 'credit', paymentTerms: '30days', status: 'active' },
  { id: 2, no: 2, name: 'مؤسسة الإلكترونيات المتقدمة', phone: '0123456789', email: 'sales@electronics-sa.com', address: 'جدة، المملكة العربية السعودية', openingBalance: 1500, balanceType: 'debit', paymentTerms: '15days', status: 'active' },
  { id: 3, no: 3, name: 'شركة المواد الغذائية', phone: '0134567890', email: 'info@food-supplies.com', address: 'الدمام، المملكة العربية السعودية', openingBalance: 0, balanceType: 'debit', paymentTerms: '7days', status: 'inactive' }
])

onMounted(() => {
  isViewMode.value = true
  selectItem(suppliers.value[0]?.id ?? -1)
})

const newSupplier = () => {
  isViewMode.value = false
  lastSelectedItemId.value = selectedItemId.value
  selectItem(-1)
}

const editSupplier = () => {
  if (selectedItemId.value) {
    isViewMode.value = false
    lastSelectedItemId.value = selectedItemId.value
  }
}

const saveSupplier = () => {
  if (selectedItemId.value) {
    const index = suppliers.value.findIndex(s => s.id === selectedItemId.value)
    if (index > -1) {
      suppliers.value[index] = { ...currentData.value, id: selectedItemId.value }
      isViewMode.value = true
      selectItem(suppliers.value[index].id)
      addToast('تم تحديث المورد بنجاح', 'success')
    }
  } else {
    const newId = Math.max(...suppliers.value.map(s => s.id)) + 1
    const newSupplierData = { ...currentData.value, id: newId, no: newId }
    suppliers.value.push(newSupplierData)
    isViewMode.value = true
    selectItem(newSupplierData.id)
    addToast('تم إضافة المورد بنجاح', 'success')
  }
}

const cancelNewOrEdit = () => {
  isViewMode.value = true
  selectItem(lastSelectedItemId.value)
}

const deleteSupplier = () => {
  if (!selectedItemId.value) return
  showMessage({
    title: 'تأكيد الحذف',
    message: `هل أنت متأكد أنك تريد حذف هذا المورد${currentData.value.id && currentData.value.name ? ` (${currentData.value.id} - ${currentData.value.name})` : ''} ؟`,
    cancelText: 'إلغاء',
    confirmText: 'حذف',
    onCancel: () => {},
    onConfirm: confirmDelete
  })
}

const confirmDelete = () => {
  const index = suppliers.value.findIndex(s => s.id === currentData.value.id)
  if (index > -1) {
    suppliers.value.splice(index, 1)
    selectItem(index >= 0 && index < suppliers.value.length ?
      suppliers.value[index].id : index === suppliers.value.length ?
        suppliers.value[index - 1]?.id : null)
    addToast('تم حذف المورد بنجاح', 'success')
  }
}

const printSupplier = () => {
  alert('طباعة المورد - سيتم تنفيذها لاحقاً')
}

const selectItem = (id) => {
  const supplier = suppliers.value.find(s => s.id === id) ?? { ...getDefaultValues(Structure) }
  selectedItemId.value = supplier.id ?? null
  currentData.value = { ...supplier }
}
</script>
