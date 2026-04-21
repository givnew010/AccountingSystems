<template>
  <div class="min-h-screen bg-gray-100 overflow-hidden">
    <div class="flex flex-row h-screen">
      <ListSection title="المستودعات" :items="warehouses" search-placeholder="البحث في المستودعات..."
        :disabled="!warehouseViewMode" :selectedItemId="warehouseSelectedId" @select-item="selectWarehouse" />

      <div class="flex-1 m-2 bg-white p-5 rounded-lg overflow-auto">
        <ActionButtons :isViewMode="warehouseViewMode" :editDisabled="!warehouseSelectedId"
          :deleteDisabled="!warehouseSelectedId" @new="newWarehouse" @edit="editWarehouse" @delete="deleteWarehouse"
          @save="saveWarehouse" @cancel="cancelWarehouseEdit" />

        <form @submit.prevent="saveWarehouse" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">اسم المستودع</label>
            <input v-model="warehouseData.name" type="text" required :disabled="warehouseViewMode"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              placeholder="أدخل اسم المستودع" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">الفرع</label>
            <select v-model="warehouseData.branchId" required :disabled="warehouseViewMode"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100">
              <option value="">اختر الفرع</option>
              <option v-for="branch in branches" :key="branch.id" :value="branch.id">{{ branch.name }}</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">الموقع</label>
            <input v-model="warehouseData.location" type="text" :disabled="warehouseViewMode"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              placeholder="أدخل موقع المستودع" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">السعة (متر مربع)</label>
            <input v-model.number="warehouseData.capacity" type="number" min="0" :disabled="warehouseViewMode"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              placeholder="أدخل سعة المستودع" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">الحالة</label>
            <select v-model="warehouseData.status" required :disabled="warehouseViewMode"
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

const warehousesStore = useWarehousesStore()
const { branches, warehouses, warehouseSelectedId, warehouseViewMode, warehouseData } = storeToRefs(warehousesStore)

const { addToast } = injectToast()
const showMessage = inject('showMessage')

const selectWarehouse = (id) => warehousesStore.selectWarehouse(id)
const newWarehouse = () => warehousesStore.newWarehouse()
const editWarehouse = () => warehousesStore.editWarehouse()

const saveWarehouse = () => {
  const res = warehousesStore.saveWarehouse()
  addToast(res.type === 'updated' ? 'تم تحديث المستودع بنجاح' : 'تم إضافة المستودع بنجاح', 'success')
}

const cancelWarehouseEdit = () => warehousesStore.cancelWarehouseEdit()

const deleteWarehouse = () => {
  if (!warehouseSelectedId.value) return
  showMessage({
    title: 'تأكيد الحذف',
    message: `هل أنت متأكد من حذف المستودع «${warehouseData.value.name}»؟`,
    cancelText: 'إلغاء',
    confirmText: 'حذف',
    onCancel: () => {},
    onConfirm: () => {
      const ok = warehousesStore.confirmDeleteSelected()
      if (ok) addToast('تم حذف المستودع بنجاح', 'success')
    }
  })
}

onMounted(() => {
  warehousesStore.init()
})
</script>
