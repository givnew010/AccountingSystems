<template>
  <div class="min-h-screen bg-gray-100 overflow-hidden">
    <!-- Main Content -->
    <div class="flex flex-row h-screen">
      <!-- List Section -->
      <ListSection title="العملاء" :items="customers" search-placeholder="البحث في العملاء..." :disabled="!isViewMode"
        :selectedItemId="selectedItemId" @select-item="selectItem" />

      <!-- Content Section (Left side for RTL) -->
      <div class="flex-1 m-2 bg-white p-5 rounded-lg overflow-auto">
        <!-- Action Buttons -->

        <ActionButtons :isViewMode="isViewMode" :showPrint="true" :editDisabled="!selectedItemId"
          :deleteDisabled="!selectedItemId" :printDisabled="!selectedItemId" @new="newCustomer" @edit="editCustomer"
          @delete="deleteCustomer" @print="printCustomer" @save="saveCustomer" @cancel="cancelNewOrEdit" />

        <!-- Customer Form -->
        <form @submit.prevent="saveCustomer" class="space-y-4">
          <div>
            <UiLabel required :disabled="isViewMode">الاسم</UiLabel>
            <UiInput v-model="currentData.name" type="text" required :disabled="isViewMode" />
          </div>

          <div>
            <UiLabel required :disabled="isViewMode">الهاتف</UiLabel>
            <UiInput v-model="currentData.phone" type="tel" required :disabled="isViewMode" />
          </div>

          <div>
            <UiLabel :disabled="isViewMode">العنوان</UiLabel>
            <UiTextarea v-model="currentData.address" :disabled="isViewMode" rows="3" />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <UiLabel :disabled="isViewMode">الرصيد الافتتاحي</UiLabel>
              <UiInput v-model="currentData.openingBalance" type="number" step="0.01" min="0" :disabled="isViewMode" />
            </div>

            <div>
              <UiLabel :disabled="isViewMode">نوع الرصيد</UiLabel>
              <UiSelect v-model="currentData.balanceType" :disabled="isViewMode">
                <option value="debit">مدين</option>
                <option value="credit">دائن</option>
              </UiSelect>
            </div>
          </div>

          <div>
            <UiLabel :disabled="isViewMode">الحالة</UiLabel>
            <UiSelect v-model="currentData.status" :disabled="isViewMode">
              <option value="active">نشط</option>
              <option value="inactive">غير نشط</option>
            </UiSelect>
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

const customersStore = useCustomersStore()
const { customers, selectedItemId, isViewMode, currentData } = storeToRefs(customersStore)
const { addToast } = injectToast()
const showMessage = inject('showMessage');

// Methods (UI layer)
onMounted(() => {
  customersStore.init()
})

const newCustomer = () => customersStore.newCustomer()
const editCustomer = () => customersStore.editCustomer()
const cancelNewOrEdit = () => customersStore.cancelNewOrEdit()

const saveCustomer = () => {
  const res = customersStore.saveCustomer()
  addToast(res.type === 'updated' ? 'تم تحديث العميل بنجاح' : 'تم إضافة العميل بنجاح', 'success')
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
  const ok = customersStore.confirmDeleteSelected()
  if (ok) addToast('تم حذف العميل بنجاح', 'success')
}

const printCustomer = () => {
  // Implement print functionality
  alert('طباعة العميل - سيتم تنفيذها لاحقاً')
}

const selectItem = (id) => customersStore.selectItem(id)

</script>