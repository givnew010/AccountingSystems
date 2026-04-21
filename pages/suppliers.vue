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
            <UiLabel required :disabled="isViewMode">الاسم</UiLabel>
            <UiInput v-model="currentData.name" type="text" required :disabled="isViewMode" />
          </div>

          <div>
            <UiLabel required :disabled="isViewMode">الهاتف</UiLabel>
            <UiInput v-model="currentData.phone" type="tel" required :disabled="isViewMode" />
          </div>

          <div>
            <UiLabel :disabled="isViewMode">البريد الإلكتروني</UiLabel>
            <UiInput v-model="currentData.email" type="email" :disabled="isViewMode" />
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
            <UiLabel :disabled="isViewMode">شروط الدفع</UiLabel>
            <UiSelect v-model="currentData.paymentTerms" :disabled="isViewMode">
              <option value="immediate">فوري</option>
              <option value="7days">7 أيام</option>
              <option value="15days">15 يوم</option>
              <option value="30days">30 يوم</option>
              <option value="60days">60 يوم</option>
            </UiSelect>
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

const suppliersStore = useSuppliersStore()
const { suppliers, selectedItemId, isViewMode, currentData } = storeToRefs(suppliersStore)
const { addToast } = injectToast()
const showMessage = inject('showMessage')

onMounted(() => {
  suppliersStore.init()
})

const newSupplier = () => suppliersStore.newSupplier()
const editSupplier = () => suppliersStore.editSupplier()
const cancelNewOrEdit = () => suppliersStore.cancelNewOrEdit()

const saveSupplier = () => {
  const res = suppliersStore.saveSupplier()
  addToast(res.type === 'updated' ? 'تم تحديث المورد بنجاح' : 'تم إضافة المورد بنجاح', 'success')
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
  const ok = suppliersStore.confirmDeleteSelected()
  if (ok) addToast('تم حذف المورد بنجاح', 'success')
}

const printSupplier = () => {
  alert('طباعة المورد - سيتم تنفيذها لاحقاً')
}

const selectItem = (id) => suppliersStore.selectItem(id)
</script>
