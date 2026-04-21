<template>
  <div class="min-h-screen bg-gray-100 overflow-hidden">
    <div class="flex flex-row h-screen">
      <ListSection title="المنتجات" :items="productsForList" search-placeholder="البحث في المنتجات..."
        :disabled="!isViewMode" :selectedItemId="selectedItemId" @select-item="selectItem" />

      <div class="flex-1 m-2 bg-white p-5 rounded-lg overflow-auto">
        <ActionButtons :isViewMode="isViewMode" :editDisabled="!selectedItemId"
          :deleteDisabled="!selectedItemId" @new="newProduct" @edit="editProduct"
          @delete="deleteProduct" @save="saveProduct" @cancel="cancelEdit" />

        <form @submit.prevent="saveProduct" class="space-y-4 pb-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">اسم المنتج</label>
              <input v-model="currentData.name" type="text" required :disabled="isViewMode"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">الباركود</label>
              <input v-model="currentData.barcode" type="text" :disabled="isViewMode"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">التصنيفات</label>
              <ComboBox
                v-model="currentData.categoryId"
                :options="categoryOptions"
                placeholder="اختر التصنيف"
                :disabled="isViewMode"
                clearable
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">المستودع/الفرع</label>
              <select v-model="currentData.warehouseId" :disabled="isViewMode"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100">
                <option value="">اختر المستودع</option>
                <option v-for="wh in warehouses" :key="wh.id" :value="wh.id">{{ wh.name }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">الحالة</label>
              <select v-model="currentData.status" required :disabled="isViewMode"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100">
                <option value="active">نشط</option>
                <option value="inactive">غير نشط</option>
              </select>
            </div>
          </div>

          <!-- Units Sub-table -->
          <div class="mt-3">
            <DynamicTable
              v-model="currentData.units"
              :columns="unitsColumns"
              :is-view-mode="isViewMode"
              :show-delete="true"
              title="وحدات القياس"
              empty-text="لا توجد وحدات مضافة"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, inject } from 'vue'
import { injectToast } from '~/composables/useToast'
import { getDefaultValues } from '~/composables/helper'

const Structure = {
  id: { type: Number, default: null },
  no: { type: Number, default: null },
  name: { type: String, default: '' },
  barcode: { type: String, default: '' },
  categoryId: { type: [Number, String], default: '' },
  warehouseId: { type: [Number, String], default: '' },
  status: { type: String, default: 'active' },
  units: { type: Array, default: [] }
}

const { addToast } = injectToast()
const showMessage = inject('showMessage')

const categories = ref([
  { id: 1, name: 'أجهزة كمبيوتر' },
  { id: 2, name: 'ملحقات' },
  { id: 3, name: 'أثاث مكتبي' }
])

const warehouses = ref([
  { id: 1, name: 'المستودع الرئيسي' },
  { id: 2, name: 'فرع الشمال' }
])

const availableUnits = ref([
  { id: 1, name: 'قطعة' },
  { id: 2, name: 'علبة' },
  { id: 3, name: 'كيلو جرام' },
  { id: 4, name: 'لتر' }
])

const products = ref([
  {
    id: 1, no: 1, name: 'لابتوب ديل', barcode: '123456789', categoryId: 1, warehouseId: 1, status: 'active',
    units: [{ unitId: 1, type: 'base', conversionRate: 1, salePrice: 5000, purchasePrice: 4500, costPrice: 4000, currentQuantity: 10 }]
  },
  {
    id: 2, no: 2, name: 'ماوس لاسلكي', barcode: '987654321', categoryId: 2, warehouseId: 1, status: 'active',
    units: [{ unitId: 2, type: 'base', conversionRate: 1, salePrice: 150, purchasePrice: 120, costPrice: 100, currentQuantity: 50 }]
  },
  {
    id: 3, no: 3, name: 'كرسي مكتبي', barcode: '', categoryId: 3, warehouseId: 1, status: 'inactive',
    units: [{ unitId: 1, type: 'base', conversionRate: 1, salePrice: 800, purchasePrice: 600, costPrice: 500, currentQuantity: 5 }]
  }
])

const selectedItemId = ref(null)
const lastSelectedItemId = ref(null)
const isViewMode = ref(true)
const currentData = ref({ ...getDefaultValues(Structure), units: [] })

const productsForList = computed(() => products.value.map(p => ({ ...p })))

const categoryOptions = computed(() => categories.value.map(c => ({ label: c.name, value: c.id })))

const selectItem = (id) => {
  const product = products.value.find(p => p.id === id) ?? { ...getDefaultValues(Structure), units: [] }
  selectedItemId.value = product.id ?? null
  currentData.value = { ...product, units: product.units ? product.units.map(u => ({ ...u })) : [] }
}

const newProduct = () => {
  isViewMode.value = false
  lastSelectedItemId.value = selectedItemId.value
  selectItem(-1)
}

const editProduct = () => {
  if (selectedItemId.value) {
    isViewMode.value = false
    lastSelectedItemId.value = selectedItemId.value
  }
}

const saveProduct = () => {
  if (selectedItemId.value) {
    const index = products.value.findIndex(p => p.id === selectedItemId.value)
    if (index > -1) {
      products.value[index] = { ...currentData.value, id: selectedItemId.value }
      isViewMode.value = true
      selectItem(products.value[index].id)
      addToast('تم تحديث المنتج بنجاح', 'success')
    }
  } else {
    const newId = Math.max(...products.value.map(p => p.id)) + 1
    const newProduct = { ...currentData.value, id: newId, no: newId }
    products.value.push(newProduct)
    isViewMode.value = true
    selectItem(newProduct.id)
    addToast('تم إضافة المنتج بنجاح', 'success')
  }
}

const cancelEdit = () => {
  isViewMode.value = true
  selectItem(lastSelectedItemId.value)
}

const deleteProduct = () => {
  if (!selectedItemId.value) return
  showMessage({
    title: 'تأكيد الحذف',
    message: `هل أنت متأكد من حذف المنتج «${currentData.value.name}»؟`,
    cancelText: 'إلغاء',
    confirmText: 'حذف',
    onCancel: () => {},
    onConfirm: confirmDelete
  })
}

const confirmDelete = () => {
  const index = products.value.findIndex(p => p.id === currentData.value.id)
  if (index > -1) {
    products.value.splice(index, 1)
    selectItem(index >= 0 && index < products.value.length ?
      products.value[index].id : index === products.value.length ?
        products.value[index - 1]?.id : null)
    addToast('تم حذف المنتج بنجاح', 'success')
  }
}

const unitsColumns = [
  {
    field: 'unitId',
    label: 'الوحدة',
    type: 'select',
    placeholder: 'اختر',
    trigger: true,
    options: availableUnits.value.map(u => ({ label: u.name, value: u.id })),
    width: '130px'
  },
  {
    field: 'type',
    label: 'النوع',
    type: 'select',
    default: 'base',
    options: [
      { label: 'أساسية', value: 'base' },
      { label: 'مشتقة', value: 'derived' }
    ],
    width: '100px'
  },
  {
    field: 'conversionRate',
    label: 'معامل التحويل',
    type: 'input',
    inputType: 'number',
    step: '0.01',
    min: 0,
    default: 1,
    width: '100px',
    align: 'center'
  },
  {
    field: 'salePrice',
    label: 'سعر البيع',
    type: 'input',
    inputType: 'number',
    step: '0.01',
    min: 0,
    default: 0,
    width: '90px',
    align: 'center'
  },
  {
    field: 'purchasePrice',
    label: 'سعر الشراء',
    type: 'input',
    inputType: 'number',
    step: '0.01',
    min: 0,
    default: 0,
    width: '90px',
    align: 'center'
  },
  {
    field: 'currentQuantity',
    label: 'الكمية',
    type: 'input',
    inputType: 'number',
    step: '0.01',
    min: 0,
    default: 0,
    width: '80px',
    align: 'center'
  }
]

onMounted(() => {
  isViewMode.value = true
  selectItem(products.value[0]?.id ?? -1)
})
</script>
