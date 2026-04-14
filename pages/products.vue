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
              <label class="block text-sm font-medium text-gray-700 mb-1">الفئة</label>
              <select v-model="currentData.categoryId" required :disabled="isViewMode"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100">
                <option value="">اختر الفئة</option>
                <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
              </select>
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
          <div class="mt-4">
            <div class="flex justify-between items-center mb-3">
              <h3 class="text-base font-medium text-gray-900">وحدات القياس</h3>
              <button v-if="!isViewMode" type="button" @click="addUnit"
                class="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-1 text-sm">
                + إضافة وحدة
              </button>
            </div>

            <div class="overflow-x-auto border border-gray-200 rounded-lg">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-3 py-2 text-right text-xs font-medium text-gray-500">الوحدة</th>
                    <th class="px-3 py-2 text-right text-xs font-medium text-gray-500">النوع</th>
                    <th class="px-3 py-2 text-right text-xs font-medium text-gray-500">معامل التحويل</th>
                    <th class="px-3 py-2 text-right text-xs font-medium text-gray-500">سعر البيع</th>
                    <th class="px-3 py-2 text-right text-xs font-medium text-gray-500">سعر الشراء</th>
                    <th class="px-3 py-2 text-right text-xs font-medium text-gray-500">الكمية</th>
                    <th v-if="!isViewMode" class="px-3 py-2 text-right text-xs font-medium text-gray-500"></th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="(unit, index) in currentData.units" :key="index">
                    <td class="px-3 py-2">
                      <select v-model="unit.unitId" required :disabled="isViewMode"
                        class="w-full px-2 py-1 border border-gray-300 rounded text-sm disabled:bg-gray-100">
                        <option value="">اختر الوحدة</option>
                        <option v-for="u in availableUnits" :key="u.id" :value="u.id">{{ u.name }}</option>
                      </select>
                    </td>
                    <td class="px-3 py-2">
                      <select v-model="unit.type" required :disabled="isViewMode"
                        class="w-full px-2 py-1 border border-gray-300 rounded text-sm disabled:bg-gray-100">
                        <option value="base">أساسية</option>
                        <option value="derived">مشتقة</option>
                      </select>
                    </td>
                    <td class="px-3 py-2">
                      <input v-model.number="unit.conversionRate" type="number" step="0.01" :disabled="isViewMode"
                        class="w-20 px-2 py-1 border border-gray-300 rounded text-sm disabled:bg-gray-100" />
                    </td>
                    <td class="px-3 py-2">
                      <input v-model.number="unit.salePrice" type="number" step="0.01" :disabled="isViewMode"
                        class="w-20 px-2 py-1 border border-gray-300 rounded text-sm disabled:bg-gray-100" />
                    </td>
                    <td class="px-3 py-2">
                      <input v-model.number="unit.purchasePrice" type="number" step="0.01" :disabled="isViewMode"
                        class="w-20 px-2 py-1 border border-gray-300 rounded text-sm disabled:bg-gray-100" />
                    </td>
                    <td class="px-3 py-2">
                      <input v-model.number="unit.currentQuantity" type="number" step="0.01" :disabled="isViewMode"
                        class="w-20 px-2 py-1 border border-gray-300 rounded text-sm disabled:bg-gray-100" />
                    </td>
                    <td v-if="!isViewMode" class="px-3 py-2">
                      <button type="button" @click="removeUnit(index)" class="text-red-600 hover:text-red-800">✕</button>
                    </td>
                  </tr>
                  <tr v-if="currentData.units?.length === 0">
                    <td colspan="7" class="px-3 py-4 text-center text-sm text-gray-500">لا توجد وحدات مضافة</td>
                  </tr>
                </tbody>
              </table>
            </div>
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

const addUnit = () => {
  if (!currentData.value.units) currentData.value.units = []
  currentData.value.units.push({ unitId: '', type: 'base', conversionRate: 1, salePrice: 0, purchasePrice: 0, costPrice: 0, currentQuantity: 0 })
}

const removeUnit = (index) => {
  currentData.value.units.splice(index, 1)
}

onMounted(() => {
  isViewMode.value = true
  selectItem(products.value[0]?.id ?? -1)
})
</script>
