<template>
  <div class="min-h-screen bg-gray-100 overflow-hidden">
    <div class="flex flex-row h-screen">
      <ListSection title="مرتجعات المشتريات" :items="invoicesForList" search-placeholder="البحث في المرتجعات..."
        :disabled="!isViewMode" :selectedItemId="selectedItemId" @select-item="selectItem" />

      <div class="flex-1 m-2 bg-white p-5 rounded-lg overflow-auto">
        <ActionButtons :isViewMode="isViewMode" :showPrint="true" :showPost="true"
          :editDisabled="!selectedItemId" :deleteDisabled="!selectedItemId || currentData.status === 'posted'"
          :printDisabled="!selectedItemId" :postDisabled="!selectedItemId || currentData.status === 'posted'"
          @new="newInvoice" @edit="editInvoice" @delete="deleteInvoice" @save="saveInvoice"
          @cancel="cancelEdit" @print="printInvoice" @post="postInvoice" />

        <form @submit.prevent="saveInvoice" class="space-y-4 pb-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">رقم المرتجع</label>
              <input v-model="currentData.number" type="text" readonly
                class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">التاريخ</label>
              <input v-model="currentData.date" type="date" required :disabled="isViewMode"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">المورد</label>
              <select v-model="currentData.supplierId" required :disabled="isViewMode"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100">
                <option value="">اختر المورد</option>
                <option v-for="supplier in suppliers" :key="supplier.id" :value="supplier.id">{{ supplier.name }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">رقم فاتورة الشراء المرتجعة</label>
              <input v-model="currentData.originalInvoiceNo" type="text" :disabled="isViewMode"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                placeholder="PUR-001" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">سبب الإرجاع</label>
              <select v-model="currentData.returnReason" required :disabled="isViewMode"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100">
                <option value="">اختر السبب</option>
                <option value="defective">منتج معيب</option>
                <option value="wrong_item">منتج خاطئ</option>
                <option value="damaged">تالف أثناء الشحن</option>
                <option value="excess">زيادة عن الطلب</option>
                <option value="other">أخرى</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">ملاحظات</label>
            <textarea v-model="currentData.notes" rows="2" :disabled="isViewMode"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"></textarea>
          </div>

          <div class="border border-gray-200 rounded-lg">
            <div class="p-3 border-b border-gray-200 flex justify-between items-center">
              <h3 class="text-base font-medium text-gray-900">المنتجات المرتجعة</h3>
              <button v-if="!isViewMode" type="button" @click="addItem"
                class="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">+ إضافة منتج</button>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-3 py-2 text-right text-xs font-medium text-gray-500">المنتج</th>
                    <th class="px-3 py-2 text-right text-xs font-medium text-gray-500">الوحدة</th>
                    <th class="px-3 py-2 text-right text-xs font-medium text-gray-500">الكمية</th>
                    <th class="px-3 py-2 text-right text-xs font-medium text-gray-500">السعر</th>
                    <th class="px-3 py-2 text-right text-xs font-medium text-gray-500">الإجمالي</th>
                    <th v-if="!isViewMode" class="px-3 py-2"></th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="(item, index) in currentData.items" :key="index">
                    <td class="px-3 py-2">
                      <select v-model="item.productId" @change="updateProduct(index)" :disabled="isViewMode"
                        class="w-full px-2 py-1 border border-gray-300 rounded text-sm disabled:bg-gray-100">
                        <option value="">اختر المنتج</option>
                        <option v-for="p in products" :key="p.id" :value="p.id">{{ p.name }}</option>
                      </select>
                    </td>
                    <td class="px-3 py-2">
                      <select v-model="item.unit" :disabled="isViewMode"
                        class="w-full px-2 py-1 border border-gray-300 rounded text-sm disabled:bg-gray-100">
                        <option value="piece">قطعة</option>
                        <option value="kg">كيلو</option>
                        <option value="box">صندوق</option>
                      </select>
                    </td>
                    <td class="px-3 py-2">
                      <input v-model.number="item.quantity" @input="calcTotal(index)" type="number" min="0" step="0.01"
                        :disabled="isViewMode"
                        class="w-20 px-2 py-1 border border-gray-300 rounded text-sm disabled:bg-gray-100" />
                    </td>
                    <td class="px-3 py-2">
                      <input v-model.number="item.price" @input="calcTotal(index)" type="number" min="0" step="0.01"
                        :disabled="isViewMode"
                        class="w-24 px-2 py-1 border border-gray-300 rounded text-sm disabled:bg-gray-100" />
                    </td>
                    <td class="px-3 py-2 text-sm font-medium text-gray-900">{{ item.total.toFixed(2) }}</td>
                    <td v-if="!isViewMode" class="px-3 py-2">
                      <button type="button" @click="removeItem(index)" class="text-red-600 hover:text-red-800">✕</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
            <span class="text-lg font-medium text-gray-900">إجمالي المرتجع:</span>
            <span class="text-lg font-bold text-red-600">{{ invoiceTotal.toFixed(2) }} ريال</span>
          </div>

          <div v-if="currentData.status">
            <label class="block text-sm font-medium text-gray-700 mb-1">الحالة</label>
            <input :value="getStatusLabel(currentData.status)" type="text" readonly
              class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50" />
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
const purchaseReturnStore = usePurchaseReturnStore()
const { suppliers, products, invoicesForList, selectedItemId, isViewMode, currentData, invoiceTotal } =
  storeToRefs(purchaseReturnStore)

const { addToast } = injectToast()
const showMessage = inject('showMessage')
const getStatusLabel = (status) => purchaseReturnStore.getStatusLabel(status)
const selectItem = (id) => purchaseReturnStore.selectItem(id)
const newInvoice = () => purchaseReturnStore.newInvoice()
const editInvoice = () => purchaseReturnStore.editInvoice()
const cancelEdit = () => purchaseReturnStore.cancelEdit()
const addItem = () => purchaseReturnStore.addItem()
const removeItem = (index) => purchaseReturnStore.removeItem(index)
const updateProduct = (index) => purchaseReturnStore.updateProduct(index)
const calcTotal = (index) => purchaseReturnStore.calcTotal(index)

const saveInvoice = () => {
  const res = purchaseReturnStore.saveInvoice()
  addToast(res.type === 'updated' ? 'تم تحديث المرتجع بنجاح' : 'تم إضافة المرتجع بنجاح', 'success')
}

const deleteInvoice = () => {
  if (!selectedItemId.value) return
  showMessage({
    title: 'تأكيد الحذف',
    message: `هل أنت متأكد من حذف المرتجع «${currentData.value.number}»؟`,
    cancelText: 'إلغاء',
    confirmText: 'حذف',
    onCancel: () => {},
    onConfirm: () => {
      const ok = purchaseReturnStore.confirmDeleteSelected()
      if (ok) addToast('تم حذف المرتجع بنجاح', 'success')
    }
  })
}

const postInvoice = () => {
  const ok = purchaseReturnStore.postInvoice()
  if (ok) addToast('تم ترحيل المرتجع بنجاح', 'success')
}

const printInvoice = () => {
  addToast('جاري الطباعة...', 'info')
}

onMounted(() => {
  purchaseReturnStore.init()
})
</script>
