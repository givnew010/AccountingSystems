<template>
  <div class="min-h-screen bg-gray-100 overflow-hidden">
    <div class="flex flex-row h-screen">
      <ListSection title="فواتير المبيعات" :items="invoicesForList" search-placeholder="البحث في الفواتير..."
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
              <label class="block text-sm font-medium text-gray-700 mb-1">رقم الفاتورة</label>
              <input v-model="currentData.number" type="text" readonly
                class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">التاريخ</label>
              <input v-model="currentData.date" type="date" required :disabled="isViewMode"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">العميل</label>
              <select v-model="currentData.customerId" required :disabled="isViewMode"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100">
                <option value="">اختر العميل</option>
                <option v-for="customer in customers" :key="customer.id" :value="customer.id">{{ customer.name }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">طريقة الدفع</label>
              <select v-model="currentData.paymentMethod" required :disabled="isViewMode"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100">
                <option value="cash">نقدي</option>
                <option value="credit">آجل</option>
                <option value="transfer">تحويل</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">ملاحظات</label>
            <textarea v-model="currentData.notes" rows="2" :disabled="isViewMode"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"></textarea>
          </div>

          <!-- Products Table -->
          <DynamicTable
            v-model="currentData.items"
            :columns="salesItemsColumns"
            :is-view-mode="isViewMode"
            :show-delete="true"
            title="المنتجات"
            empty-text="لا توجد منتجات"
          />

          <div class="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
            <span class="text-lg font-medium text-gray-900">الإجمالي:</span>
            <span class="text-lg font-bold text-blue-600">{{ invoiceTotal.toFixed(2) }} ريال</span>
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
const salesStore = useSalesStore()
const { customers, invoicesForList, selectedItemId, isViewMode, currentData, invoiceTotal, salesItemsColumns } =
  storeToRefs(salesStore)

const { addToast } = injectToast()
const showMessage = inject('showMessage')
const getStatusLabel = (status) => salesStore.getStatusLabel(status)
const selectItem = (id) => salesStore.selectItem(id)
const newInvoice = () => salesStore.newInvoice()
const editInvoice = () => salesStore.editInvoice()
const cancelEdit = () => salesStore.cancelEdit()

const saveInvoice = () => {
  const res = salesStore.saveInvoice()
  addToast(res.type === 'updated' ? 'تم تحديث الفاتورة بنجاح' : 'تم إضافة الفاتورة بنجاح', 'success')
}

const deleteInvoice = () => {
  if (!selectedItemId.value) return
  showMessage({
    title: 'تأكيد الحذف',
    message: `هل أنت متأكد من حذف الفاتورة «${currentData.value.number}»؟`,
    cancelText: 'إلغاء',
    confirmText: 'حذف',
    onCancel: () => {},
    onConfirm: () => {
      const ok = salesStore.confirmDeleteSelected()
      if (ok) addToast('تم حذف الفاتورة بنجاح', 'success')
    }
  })
}

const postInvoice = () => {
  const ok = salesStore.postInvoice()
  if (ok) addToast('تم ترحيل الفاتورة بنجاح', 'success')
}

const printInvoice = () => {
  addToast('جاري الطباعة...', 'info')
}

onMounted(() => {
  salesStore.init()
})
</script>
