<template>
  <div class="min-h-screen bg-gray-100 overflow-hidden">
    <!-- Main Content -->
    <div class="flex flex-col lg:flex-row h-screen">
      <!-- List Section -->
      <ListSection title="العملاء" :items="customers" search-placeholder="البحث في العملاء..." :disabled="!isViewMode"
        :selectedItemId="selectedItemId" @select-item="selectItem" />

      <!-- Content Section (Left side for RTL) -->
      <div class="flex-1 m-2 bg-white p-5 rounded-lg overflow-auto lg:overflow-hidden min-h-0">
        <!-- Action Buttons -->

        <ActionButtons :isViewMode="isViewMode" :showPrint="true" :editDisabled="!selectedItemId"
          :deleteDisabled="!selectedItemId" :printDisabled="!selectedItemId" @new="newCustomer" @edit="editCustomer"
          @delete="deleteCustomer" @print="printCustomer" @save="saveCustomer" @cancel="cancelNewOrEdit" />

        <!-- Customer Form -->
        <form @submit.prevent="saveCustomer" class="space-y-4">
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
  address: { type: String, default: '' },
  openingBalance: { type: Number, default: 0 },
  balanceType: { type: String, default: 'debit' },
  status: { type: String, default: 'active' }
}

const selectedItemId = ref(null)
const lastselectedItemId = ref(null)
const isViewMode = ref(true)
const { addToast } = injectToast()
const currentData = ref({ ...getDefaultValues(Structure) })
const showMessage = inject('showMessage');

// Mock data
const customers = ref([
  {
    id: 1,
    no: 1,
    name: 'أحمد محمد',
    phone: '0501234567',
    address: 'الرياض، المملكة العربية السعودية',
    openingBalance: 1000,
    balanceType: 'debit',
    status: 'active'
  },
  {
    id: 2,
    no: 2,
    name: 'فاطمة علي',
    phone: '0507654321',
    address: 'جدة، المملكة العربية السعودية',
    openingBalance: 500,
    balanceType: 'credit',
    status: 'active'
  },
  {
    id: 3,
    no: 3,
    name: 'محمد أحمد',
    phone: '0509876543',
    address: 'الدمام، المملكة العربية السعودية',
    openingBalance: 0,
    balanceType: 'debit',
    status: 'inactive'
  }
])

// Methods
onMounted(() => {
  isViewMode.value = true
  selectItem(customers.value[0]?.id ?? -1)
})

const newCustomer = () => {
  isViewMode.value = false
  lastselectedItemId.value = selectedItemId.value
  selectItem(-1)
}

const editCustomer = () => {
  if (selectedItemId.value) {
    isViewMode.value = false
    lastselectedItemId.value = selectedItemId.value
    // Form is already populated from selectCustomer
  }
}

const saveCustomer = () => {
  if (selectedItemId.value) {
    // Update existing customer
    const index = customers.value.findIndex(c => c.id === selectedItemId.value)
    if (index > -1) {
      customers.value[index] = { ...currentData.value, id: selectedItemId.value }
      isViewMode.value = true
      selectItem(customers.value[index].id)
      addToast('تم تحديث العميل بنجاح', 'success')
    }
  } else {
    // Add new customer
    const newId = Math.max(...customers.value.map(c => c.id)) + 1
    const newCustomerData = { ...currentData.value, id: newId, no: newId }
    customers.value.push(newCustomerData)
    isViewMode.value = true
    selectItem(newCustomerData.id)
    addToast('تم إضافة العميل بنجاح', 'success')
  }
}

const cancelNewOrEdit = () => {
  isViewMode.value = true
  selectItem(lastselectedItemId.value)
}

const deleteCustomer = () => {
  if (!selectedItemId.value) return
  // const cust = customers.value.find(c => c.id === selectedItemId.value)
  showMessage({
    title: 'تأكيد الحذف',
    message: `هل أنت متأكد أنك تريد حذف هذا العميل${currentData.value.id && currentData.value.name ? ` (${currentData.value.id} - ${currentData.value.name})` : ''} ؟`,
    cancelText: 'إلغاء',
    confirmText: 'حذف',
    onCancel: () => {},
    onConfirm: confirmDelete
  });
}

const confirmDelete = () => {
  const index = customers.value.findIndex(customer => customer.id === currentData.value.id)
  if (index > -1) {
    customers.value.splice(index, 1)
    selectItem(index >= 0 && index < customers.value.length ?
      customers.value[index].id : index === customers.value.length ?
        customers.value[index - 1]?.id : null);
    addToast('تم حذف العميل بنجاح', 'success')
  }
}

const printCustomer = () => {
  // Implement print functionality
  alert('طباعة العميل - سيتم تنفيذها لاحقاً')
}

const selectItem = (id) => {
  const customer = customers.value.find(c => c.id === id) ?? { ...getDefaultValues(Structure) }
  selectedItemId.value = customer.id ?? null
  currentData.value = { ...customer }
}

</script>