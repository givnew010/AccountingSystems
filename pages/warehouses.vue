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
import { ref, onMounted, inject } from 'vue'
import { injectToast } from '~/composables/useToast'
import { getDefaultValues } from '~/composables/helper'

const WarehouseStructure = {
  id: { type: Number, default: null },
  no: { type: Number, default: null },
  name: { type: String, default: '' },
  branchId: { type: [Number, String], default: '' },
  branchName: { type: String, default: '' },
  location: { type: String, default: '' },
  capacity: { type: Number, default: null },
  status: { type: String, default: 'active' },
  productsCount: { type: Number, default: 0 }
}

const BranchStructure = {
  id: { type: Number, default: null },
  no: { type: Number, default: null },
  name: { type: String, default: '' },
  address: { type: String, default: '' },
  phone: { type: String, default: '' },
  email: { type: String, default: '' },
  status: { type: String, default: 'active' },
  warehousesCount: { type: Number, default: 0 }
}

const branches = ref([
  { id: 1, no: 1, name: 'المقر الرئيسي', address: 'الرياض، المملكة العربية السعودية', phone: '+966112345678', email: 'main@company.com', status: 'active', warehousesCount: 3 },
  { id: 2, no: 2, name: 'فرع جدة', address: 'جدة، المملكة العربية السعودية', phone: '+966212345678', email: 'jeddah@company.com', status: 'active', warehousesCount: 2 },
  { id: 3, no: 3, name: 'فرع الدمام', address: 'الدمام، المملكة العربية السعودية', phone: '+966312345678', email: 'dammam@company.com', status: 'inactive', warehousesCount: 0 }
])

const warehouses = ref([
  { id: 1, no: 1, name: 'المستودع الرئيسي', branchId: 1, branchName: 'المقر الرئيسي', location: 'المنطقة الصناعية', capacity: 1000, status: 'active', productsCount: 150 },
  { id: 2, no: 2, name: 'مستودع الإلكترونيات', branchId: 1, branchName: 'المقر الرئيسي', location: 'المبنى B', capacity: 500, status: 'active', productsCount: 75 },
  { id: 3, no: 3, name: 'مستودع الأثاث', branchId: 1, branchName: 'المقر الرئيسي', location: 'المستودع الخارجي', capacity: 800, status: 'active', productsCount: 45 },
  { id: 4, no: 4, name: 'مستودع جدة الرئيسي', branchId: 2, branchName: 'فرع جدة', location: 'المنطقة الصناعية', capacity: 600, status: 'active', productsCount: 90 },
  { id: 5, no: 5, name: 'مستودع جدة الفرعي', branchId: 2, branchName: 'فرع جدة', location: 'وسط المدينة', capacity: 300, status: 'inactive', productsCount: 0 }
])

const { addToast } = injectToast()
const showMessage = inject('showMessage')

const warehouseSelectedId = ref(null)
const warehouseLastSelectedId = ref(null)
const warehouseViewMode = ref(true)
const warehouseData = ref({ ...getDefaultValues(WarehouseStructure) })

const selectWarehouse = (id) => {
  const warehouse = warehouses.value.find(w => w.id === id) ?? { ...getDefaultValues(WarehouseStructure) }
  warehouseSelectedId.value = warehouse.id ?? null
  warehouseData.value = { ...warehouse }
}

const newWarehouse = () => {
  warehouseViewMode.value = false
  warehouseLastSelectedId.value = warehouseSelectedId.value
  selectWarehouse(-1)
}

const editWarehouse = () => {
  if (warehouseSelectedId.value) {
    warehouseViewMode.value = false
    warehouseLastSelectedId.value = warehouseSelectedId.value
  }
}

const saveWarehouse = () => {
  if (warehouseSelectedId.value) {
    const index = warehouses.value.findIndex(w => w.id === warehouseSelectedId.value)
    if (index > -1) {
      const branch = branches.value.find(b => b.id === warehouseData.value.branchId)
      warehouses.value[index] = { ...warehouseData.value, id: warehouseSelectedId.value, branchName: branch?.name || '' }
      warehouseViewMode.value = true
      selectWarehouse(warehouses.value[index].id)
      addToast('تم تحديث المستودع بنجاح', 'success')
    }
  } else {
    const newId = Math.max(...warehouses.value.map(w => w.id)) + 1
    const branch = branches.value.find(b => b.id === warehouseData.value.branchId)
    const newWarehouse = { ...warehouseData.value, id: newId, no: newId, branchName: branch?.name || '', productsCount: 0 }
    warehouses.value.push(newWarehouse)
    warehouseViewMode.value = true
    selectWarehouse(newWarehouse.id)
    addToast('تم إضافة المستودع بنجاح', 'success')
  }
}

const cancelWarehouseEdit = () => {
  warehouseViewMode.value = true
  selectWarehouse(warehouseLastSelectedId.value)
}

const deleteWarehouse = () => {
  if (!warehouseSelectedId.value) return
  showMessage({
    title: 'تأكيد الحذف',
    message: `هل أنت متأكد من حذف المستودع «${warehouseData.value.name}»؟`,
    cancelText: 'إلغاء',
    confirmText: 'حذف',
    onCancel: () => { },
    onConfirm: () => {
      const index = warehouses.value.findIndex(w => w.id === warehouseData.value.id)
      if (index > -1) {
        warehouses.value.splice(index, 1)
        selectWarehouse(warehouses.value[index]?.id ?? warehouses.value[index - 1]?.id ?? null)
        addToast('تم حذف المستودع بنجاح', 'success')
      }
    }
  })
}

onMounted(() => {
  warehouseViewMode.value = true
  selectWarehouse(warehouses.value[0]?.id ?? -1)
})
</script>
