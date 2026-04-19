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
import { ref, computed, watch, onMounted, inject } from 'vue'
import { injectToast } from '~/composables/useToast'
import { getDefaultValues } from '~/composables/helper'

const Structure = {
  id: { type: Number, default: null },
  no: { type: Number, default: null },
  number: { type: String, default: '' },
  date: { type: String, default: new Date().toISOString().split('T')[0] },
  customerId: { type: [Number, String], default: '' },
  customer: { type: Object, default: null },
  paymentMethod: { type: String, default: 'cash' },
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
  { id: 1, name: 'منتج 1', price: 10.00, costPrice: 8.00, stock: 100 },
  { id: 2, name: 'منتج 2', price: 25.50, costPrice: 20.00, stock: 50 },
  { id: 3, name: 'منتج 3', price: 15.75, costPrice: 12.00, stock: 75 }
])

const invoices = ref([
  {
    id: 1, no: 1, number: 'INV-001', date: '2024-01-15', customerId: 1, customer: { name: 'أحمد محمد' },
    paymentMethod: 'cash', notes: '', items: [
      { productId: 1, unit: 'piece', quantity: 2, price: 10.00, discount: 0, total: 20.00 }
    ], total: 20.00, status: 'draft'
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
  const labels = { draft: 'مسودة', posted: 'مُرحّلة', paid: 'مدفوعة' }
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
  const nextNumber = `INV-${String(invoices.value.length + 1).padStart(3, '0')}`
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
      addToast('تم تحديث الفاتورة بنجاح', 'success')
    }
  } else {
    const newId = Math.max(...invoices.value.map(inv => inv.id), 0) + 1
    const newInvoice = { ...currentData.value, id: newId, no: newId, customer, total }
    invoices.value.push(newInvoice)
    isViewMode.value = true
    selectItem(newInvoice.id)
    addToast('تم إضافة الفاتورة بنجاح', 'success')
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
    message: `هل أنت متأكد من حذف الفاتورة «${currentData.value.number}»؟`,
    cancelText: 'إلغاء',
    confirmText: 'حذف',
    onCancel: () => {},
    onConfirm: () => {
      const index = invoices.value.findIndex(inv => inv.id === currentData.value.id)
      if (index > -1) {
        invoices.value.splice(index, 1)
        selectItem(invoices.value[index]?.id ?? invoices.value[index - 1]?.id ?? null)
        addToast('تم حذف الفاتورة بنجاح', 'success')
      }
    }
  })
}

const postInvoice = () => {
  if (!selectedItemId.value || currentData.value.status === 'posted') return
  const index = invoices.value.findIndex(inv => inv.id === selectedItemId.value)
  if (index > -1) {
    invoices.value[index].status = 'posted'
    invoices.value[index].postedDate = new Date().toISOString().split('T')[0]
    currentData.value.status = 'posted'
    addToast('تم ترحيل الفاتورة بنجاح', 'success')
  }
}

const printInvoice = () => {
  addToast('جاري الطباعة...', 'info')
}

const salesItemsColumns = computed(() => [
  {
    field: 'productId',
    label: 'المنتج',
    type: 'select',
    placeholder: 'اختر المنتج',
    trigger: true,
    options: products.value.map(p => ({ label: p.name, value: p.id })),
    width: '160px'
  },
  {
    field: 'unit',
    label: 'الوحدة',
    type: 'select',
    default: 'piece',
    options: [
      { label: 'قطعة', value: 'piece' },
      { label: 'كيلو', value: 'kg' },
      { label: 'صندوق', value: 'box' }
    ],
    width: '90px'
  },
  {
    field: 'quantity',
    label: 'الكمية',
    type: 'input',
    inputType: 'number',
    step: '0.01',
    min: 0,
    default: null,
    width: '75px',
    align: 'center'
  },
  {
    field: 'price',
    label: 'السعر',
    type: 'input',
    inputType: 'number',
    step: '0.01',
    min: 0,
    default: null,
    width: '85px',
    align: 'center'
  },
  {
    field: 'discount',
    label: 'الخصم',
    type: 'input',
    inputType: 'number',
    step: '0.01',
    min: 0,
    default: null,
    width: '75px',
    align: 'center'
  },
  {
    field: 'total',
    label: 'الإجمالي',
    type: 'display',
    bold: true,
    align: 'center',
    width: '85px',
    format: (val, row) => {
      const qty = parseFloat(row.quantity) || 0
      const price = parseFloat(row.price) || 0
      const discount = parseFloat(row.discount) || 0
      return Math.max(0, qty * price - discount).toFixed(2)
    }
  }
])

// Auto-fill price when product is selected
watch(
  () => currentData.value.items,
  (items) => {
    if (!items) return
    items.forEach(item => {
      if (item.productId && (item.price === null || item.price === undefined || item.price === '')) {
        const product = products.value.find(p => p.id == item.productId)
        if (product) {
          item.price = product.price
        }
      }
    })
  },
  { deep: true }
)

onMounted(() => {
  isViewMode.value = true
  selectItem(invoices.value[0]?.id ?? -1)
})
</script>
