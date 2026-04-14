<template>
  <div class="min-h-screen bg-gray-100 overflow-hidden">
    <div class="flex flex-row h-screen">
      <ListSection title="مرتجعات المبيعات" :items="invoicesForList" search-placeholder="البحث في المرتجعات..."
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
              <label class="block text-sm font-medium text-gray-700 mb-1">العميل</label>
              <select v-model="currentData.customerId" required :disabled="isViewMode"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100">
                <option value="">اختر العميل</option>
                <option v-for="customer in customers" :key="customer.id" :value="customer.id">{{ customer.name }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">رقم فاتورة المبيعات المرتجعة</label>
              <input v-model="currentData.originalInvoiceNo" type="text" :disabled="isViewMode"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                placeholder="INV-001" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">سبب الإرجاع</label>
              <select v-model="currentData.returnReason" required :disabled="isViewMode"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100">
                <option value="">اختر السبب</option>
                <option value="defective">منتج معيب</option>
                <option value="wrong_item">منتج خاطئ</option>
                <option value="damaged">تالف</option>
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
import { ref, computed, onMounted, inject } from 'vue'
import { injectToast } from '~/composables/useToast'
import { getDefaultValues } from '~/composables/helper'

const Structure = {
  id: { type: Number, default: null },
  no: { type: Number, default: null },
  number: { type: String, default: '' },
  date: { type: String, default: new Date().toISOString().split('T')[0] },
  customerId: { type: [Number, String], default: '' },
  customer: { type: Object, default: null },
  originalInvoiceNo: { type: String, default: '' },
  returnReason: { type: String, default: '' },
  notes: { type: String, default: '' },
  items: { type: Array, default: [] },
  total: { type: Number, default: 0 },
  status: { type: String, default: 'draft' }
}

const { addToast } = injectToast()
const showMessage = inject('showMessage')

const customers = ref([
  { id: 1, name: 'أحمد محمد' },
  { id: 2, name: 'فاطمة علي' },
  { id: 3, name: 'محمد أحمد' }
])

const products = ref([
  { id: 1, name: 'منتج 1', price: 10.00 },
  { id: 2, name: 'منتج 2', price: 25.50 },
  { id: 3, name: 'منتج 3', price: 15.75 }
])

const invoices = ref([
  {
    id: 1, no: 1, number: 'RTN-001', date: '2024-01-16', customerId: 1, customer: { name: 'أحمد محمد' },
    originalInvoiceNo: 'INV-001', returnReason: 'defective', notes: '',
    items: [{ productId: 1, unit: 'piece', quantity: 1, price: 10.00, total: 10.00 }],
    total: 10.00, status: 'draft'
  }
])

const selectedItemId = ref(null)
const lastSelectedItemId = ref(null)
const isViewMode = ref(true)
const currentData = ref({ ...getDefaultValues(Structure), items: [] })

const invoicesForList = computed(() => invoices.value.map(inv => ({
  ...inv,
  name: `${inv.number} - ${inv.customer?.name || ''}`,
  no: inv.id
})))

const invoiceTotal = computed(() => {
  return (currentData.value.items || []).reduce((sum, item) => sum + (item.total || 0), 0)
})

const getStatusLabel = (status) => {
  const labels = { draft: 'مسودة', posted: 'مُرحّل', paid: 'مكتمل' }
  return labels[status] || status
}

const selectItem = (id) => {
  const invoice = invoices.value.find(inv => inv.id === id) ?? { ...getDefaultValues(Structure), items: [] }
  selectedItemId.value = invoice.id ?? null
  currentData.value = { ...invoice, items: invoice.items ? invoice.items.map(i => ({ ...i })) : [] }
}

const newInvoice = () => {
  isViewMode.value = false
  lastSelectedItemId.value = selectedItemId.value
  const nextNumber = `RTN-${String(invoices.value.length + 1).padStart(3, '0')}`
  selectedItemId.value = null
  currentData.value = { ...getDefaultValues(Structure), number: nextNumber, items: [] }
}

const editInvoice = () => {
  if (selectedItemId.value) {
    isViewMode.value = false
    lastSelectedItemId.value = selectedItemId.value
  }
}

const saveInvoice = () => {
  const customer = customers.value.find(c => c.id == currentData.value.customerId)
  const total = invoiceTotal.value
  if (selectedItemId.value) {
    const index = invoices.value.findIndex(inv => inv.id === selectedItemId.value)
    if (index > -1) {
      invoices.value[index] = { ...currentData.value, id: selectedItemId.value, customer, total }
      isViewMode.value = true
      selectItem(invoices.value[index].id)
      addToast('تم تحديث المرتجع بنجاح', 'success')
    }
  } else {
    const newId = Math.max(...invoices.value.map(inv => inv.id), 0) + 1
    const newInv = { ...currentData.value, id: newId, no: newId, customer, total }
    invoices.value.push(newInv)
    isViewMode.value = true
    selectItem(newInv.id)
    addToast('تم إضافة المرتجع بنجاح', 'success')
  }
}

const cancelEdit = () => {
  isViewMode.value = true
  selectItem(lastSelectedItemId.value)
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
      const index = invoices.value.findIndex(inv => inv.id === currentData.value.id)
      if (index > -1) {
        invoices.value.splice(index, 1)
        selectItem(invoices.value[index]?.id ?? invoices.value[index - 1]?.id ?? null)
        addToast('تم حذف المرتجع بنجاح', 'success')
      }
    }
  })
}

const postInvoice = () => {
  if (!selectedItemId.value || currentData.value.status === 'posted') return
  const index = invoices.value.findIndex(inv => inv.id === selectedItemId.value)
  if (index > -1) {
    invoices.value[index].status = 'posted'
    currentData.value.status = 'posted'
    addToast('تم ترحيل المرتجع بنجاح', 'success')
  }
}

const printInvoice = () => {
  addToast('جاري الطباعة...', 'info')
}

const addItem = () => {
  if (!currentData.value.items) currentData.value.items = []
  currentData.value.items.push({ productId: '', unit: 'piece', quantity: 1, price: 0, total: 0 })
}

const removeItem = (index) => {
  currentData.value.items.splice(index, 1)
}

const updateProduct = (index) => {
  const item = currentData.value.items[index]
  const product = products.value.find(p => p.id == item.productId)
  if (product) {
    item.price = product.price
    calcTotal(index)
  }
}

const calcTotal = (index) => {
  const item = currentData.value.items[index]
  item.total = Math.max(0, item.quantity * item.price)
}

onMounted(() => {
  isViewMode.value = true
  selectItem(invoices.value[0]?.id ?? -1)
})
</script>
