<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Main Content -->
    <div class="flex flex-col lg:flex-row h-screen">
      <!-- List Section (Right side for RTL) -->
      <div class="w-full lg:w-2/5 bg-gray-50 p-4 border-l border-gray-200">
        <div class="bg-white rounded-lg shadow-sm">
          <!-- Header -->
          <div class="p-4 border-b border-gray-200">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">مرتجعات المبيعات</h2>

            <!-- Search -->
            <div class="mb-4">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="البحث في المرتجعات..."
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <!-- Filter -->
            <div class="mb-4">
              <select
                v-model="statusFilter"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">جميع الحالات</option>
                <option value="draft">مسودة</option>
                <option value="posted">مُرحّلة</option>
              </select>
            </div>
          </div>

          <!-- Table -->
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    رقم المرتجع
                  </th>
                  <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    العميل
                  </th>
                  <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    المبلغ
                  </th>
                  <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الحالة
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr
                  v-for="returnInvoice in filteredReturns"
                  :key="returnInvoice.id"
                  @click="selectReturn(returnInvoice)"
                  class="cursor-pointer hover:bg-gray-50"
                >
                  <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {{ returnInvoice.number }}
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {{ returnInvoice.customer?.name || 'غير محدد' }}
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {{ returnInvoice.total.toFixed(2) }} ريال
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap">
                    <span
                      :class="[
                        'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                        returnInvoice.status === 'posted'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      ]"
                    >
                      {{ getStatusLabel(returnInvoice.status) }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div class="px-4 py-3 border-t border-gray-200 flex justify-between items-center">
            <button
              @click="prevPage"
              :disabled="currentPage === 1"
              class="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              السابق
            </button>
            <span class="text-sm text-gray-700">
              صفحة {{ currentPage }} من {{ totalPages }}
            </span>
            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              التالي
            </button>
          </div>
        </div>
      </div>

      <!-- Content Section (Left side for RTL) -->
      <div class="w-full lg:w-3/5 bg-white p-6 shadow-md">
        <!-- Action Buttons -->
        <div class="flex flex-wrap gap-2 mb-6">
          <button
            @click="newReturn"
            class="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <PlusIcon class="w-5 h-5" />
          </button>
          <button
            @click="editReturn"
            :disabled="!selectedReturn"
            class="flex items-center justify-center w-10 h-10 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <PencilIcon class="w-5 h-5" />
          </button>
          <button
            @click="deleteReturn"
            :disabled="!selectedReturn || selectedReturn.status === 'posted'"
            class="flex items-center justify-center w-10 h-10 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <TrashIcon class="w-5 h-5" />
          </button>
          <button
            @click="postReturn"
            :disabled="!selectedReturn || selectedReturn.status === 'posted'"
            class="flex items-center justify-center w-10 h-10 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CheckIcon class="w-5 h-5" />
          </button>
          <button
            @click="printReturn"
            :disabled="!selectedReturn"
            class="flex items-center justify-center w-10 h-10 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <PrinterIcon class="w-5 h-5" />
          </button>
        </div>

        <!-- Return Form -->
        <form @submit.prevent="saveReturn" class="space-y-4">
          <!-- Return Header -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">رقم المرتجع</label>
              <input
                v-model="returnForm.number"
                type="text"
                readonly
                class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">التاريخ</label>
              <input
                v-model="returnForm.date"
                type="date"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">العميل</label>
              <select
                v-model="returnForm.customerId"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">اختر العميل</option>
                <option v-for="customer in customers" :key="customer.id" :value="customer.id">
                  {{ customer.name }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">فاتورة المبيعات المرجعية</label>
              <select
                v-model="returnForm.referenceInvoiceId"
                @change="loadInvoiceItems"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">اختر فاتورة المبيعات</option>
                <option v-for="invoice in postedInvoices" :key="invoice.id" :value="invoice.id">
                  {{ invoice.number }} - {{ invoice.customer?.name }} ({{ invoice.total.toFixed(2) }} ريال)
                </option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">سبب المرتجع</label>
            <textarea
              v-model="returnForm.reason"
              rows="3"
              placeholder="وصف سبب إرجاع المنتجات..."
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            ></textarea>
          </div>

          <!-- Products Table -->
          <div class="border border-gray-200 rounded-lg">
            <div class="p-4 border-b border-gray-200">
              <h3 class="text-lg font-medium text-gray-900">المنتجات المُرجعة</h3>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      المنتج
                    </th>
                    <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الكمية المُرجعة
                    </th>
                    <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      السعر
                    </th>
                    <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الإجمالي
                    </th>
                    <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      إجراءات
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="(item, index) in returnForm.items" :key="index">
                    <td class="px-4 py-3">
                      <div class="text-sm text-gray-900">{{ item.product?.name }}</div>
                      <div class="text-xs text-gray-500">{{ item.unit }}</div>
                    </td>
                    <td class="px-4 py-3">
                      <input
                        v-model.number="item.returnQuantity"
                        @input="calculateReturnTotal(index)"
                        type="number"
                        min="0"
                        :max="item.originalQuantity"
                        step="0.01"
                        class="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                      <div class="text-xs text-gray-500 mt-1">
                        من أصل: {{ item.originalQuantity }}
                      </div>
                    </td>
                    <td class="px-4 py-3 text-sm">
                      {{ item.price.toFixed(2) }}
                    </td>
                    <td class="px-4 py-3 text-sm font-medium">
                      {{ item.total.toFixed(2) }}
                    </td>
                    <td class="px-4 py-3">
                      <button
                        @click="removeReturnItem(index)"
                        class="text-red-600 hover:text-red-800"
                      >
                        <XMarkIcon class="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Totals -->
          <div class="bg-gray-50 p-4 rounded-lg">
            <div class="flex justify-between items-center">
              <span class="text-lg font-medium text-gray-900">إجمالي المرتجع:</span>
              <span class="text-lg font-bold text-gray-900">{{ returnTotal.toFixed(2) }} ريال</span>
            </div>
          </div>

          <div class="flex gap-2 pt-4">
            <button
              type="submit"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              حفظ
            </button>
            <button
              type="button"
              @click="cancelEdit"
              class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  CheckIcon,
  PrinterIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'

// Mock data - should be shared with sales.vue in a real app
const customers = ref([
  { id: 1, name: 'أحمد محمد', balance: 0 },
  { id: 2, name: 'فاطمة علي', balance: 0 },
  { id: 3, name: 'محمد أحمد', balance: 0 }
])

const products = ref([
  { id: 1, name: 'منتج 1', price: 10.00, costPrice: 8.00, stock: 100 },
  { id: 2, name: 'منتج 2', price: 25.50, costPrice: 20.00, stock: 50 },
  { id: 3, name: 'منتج 3', price: 15.75, costPrice: 12.00, stock: 75 }
])

// Mock posted invoices for reference
const postedInvoices = ref([
  {
    id: 1,
    number: 'INV-001',
    date: '2024-01-15',
    customerId: 1,
    customer: { name: 'أحمد محمد' },
    paymentMethod: 'cash',
    items: [
      { productId: 1, product: { name: 'منتج 1' }, unit: 'piece', quantity: 2, price: 10.00, discount: 0, total: 20.00 }
    ],
    total: 20.00,
    status: 'posted'
  }
])

const returnInvoices = ref([
  {
    id: 1,
    number: 'RTN-001',
    date: '2024-01-16',
    customerId: 1,
    customer: { name: 'أحمد محمد' },
    referenceInvoiceId: 1,
    reason: 'عيب في المنتج',
    items: [
      {
        productId: 1,
        product: { name: 'منتج 1' },
        unit: 'piece',
        originalQuantity: 2,
        returnQuantity: 1,
        price: 10.00,
        total: 10.00
      }
    ],
    total: 10.00,
    status: 'draft'
  }
])

// Reactive state
const searchQuery = ref('')
const statusFilter = ref('all')
const currentPage = ref(1)
const itemsPerPage = 10
const selectedReturn = ref(null)
const returnForm = ref({
  number: '',
  date: new Date().toISOString().split('T')[0],
  customerId: '',
  referenceInvoiceId: '',
  reason: '',
  items: [],
  total: 0,
  status: 'draft'
})

// Computed properties
const filteredReturns = computed(() => {
  let filtered = returnInvoices.value

  // Search filter
  if (searchQuery.value) {
    filtered = filtered.filter(returnInv =>
      returnInv.number.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      returnInv.customer?.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  // Status filter
  if (statusFilter.value !== 'all') {
    filtered = filtered.filter(returnInv => returnInv.status === statusFilter.value)
  }

  return filtered
})

const totalPages = computed(() => {
  return Math.ceil(filteredReturns.value.length / itemsPerPage)
})

const returnTotal = computed(() => {
  return returnForm.value.items.reduce((sum, item) => sum + item.total, 0)
})

// Methods
const getStatusLabel = (status) => {
  const labels = {
    draft: 'مسودة',
    posted: 'مُرحّلة'
  }
  return labels[status] || status
}

const selectReturn = (returnInvoice) => {
  selectedReturn.value = returnInvoice
  returnForm.value = {
    ...returnInvoice,
    items: returnInvoice.items.map(item => ({ ...item }))
  }
}

const newReturn = () => {
  selectedReturn.value = null
  const nextNumber = `RTN-${String(returnInvoices.value.length + 1).padStart(3, '0')}`
  returnForm.value = {
    number: nextNumber,
    date: new Date().toISOString().split('T')[0],
    customerId: '',
    referenceInvoiceId: '',
    reason: '',
    items: [],
    total: 0,
    status: 'draft'
  }
}

const editReturn = () => {
  // Form is already populated from selectReturn
}

const deleteReturn = () => {
  if (selectedReturn.value && selectedReturn.value.status !== 'posted' && confirm('هل أنت متأكد من حذف هذا المرتجع؟')) {
    const index = returnInvoices.value.findIndex(ret => ret.id === selectedReturn.value.id)
    if (index > -1) {
      returnInvoices.value.splice(index, 1)
      selectedReturn.value = null
      newReturn()
    }
  }
}

const postReturn = () => {
  if (!selectedReturn.value || selectedReturn.value.status === 'posted') {
    return
  }

  const returnInv = selectedReturn.value
  const totalAmount = returnInv.total

  // 1. Update inventory (increase stock)
  returnInv.items.forEach(item => {
    const product = products.value.find(p => p.id == item.productId)
    if (product) {
      product.stock += item.returnQuantity
    }
  })

  // 2. Create reversing journal entries
  const journalEntryId = Date.now() // Simple ID generation
  const journalEntry = {
    id: journalEntryId,
    date: new Date().toISOString().split('T')[0],
    reference: `مرتجع مبيعات ${returnInv.number}`,
    description: `ترحيل مرتجع مبيعات ${returnInv.number} للعميل ${returnInv.customer.name}`,
    entries: []
  }

  // Reverse sales revenue (Credit Sales Revenue)
  journalEntry.entries.push({
    accountId: 1, // المبيعات
    accountName: 'المبيعات',
    debit: 0,
    credit: totalAmount
  })

  // Reverse cost of goods sold (Credit COGS, Debit Inventory)
  const totalCost = returnInv.items.reduce((sum, item) => {
    const product = products.value.find(p => p.id == item.productId)
    return sum + (product ? product.costPrice * item.returnQuantity : 0)
  }, 0)

  if (totalCost > 0) {
    journalEntry.entries.push({
      accountId: 5, // تكلفة المبيعات
      accountName: 'تكلفة المبيعات',
      debit: 0,
      credit: totalCost
    })

    journalEntry.entries.push({
      accountId: 3, // المخزون
      accountName: 'المخزون',
      debit: totalCost,
      credit: 0
    })
  }

  // Reverse cash/accounts receivable
  const originalInvoice = postedInvoices.value.find(inv => inv.id == returnInv.referenceInvoiceId)
  if (originalInvoice) {
    if (originalInvoice.paymentMethod === 'cash') {
      // Credit Cash
      journalEntry.entries.push({
        accountId: 2, // الصندوق
        accountName: 'الصندوق',
        debit: 0,
        credit: totalAmount
      })
    } else {
      // Credit Accounts Receivable
      journalEntry.entries.push({
        accountId: 4, // حسابات العملاء
        accountName: 'حسابات العملاء',
        debit: 0,
        credit: totalAmount
      })

      // Update customer balance (decrease)
      const customer = customers.value.find(c => c.id == returnInv.customerId)
      if (customer) {
        customer.balance = (customer.balance || 0) - totalAmount
      }
    }
  }

  // In a real app, this would be saved to a journal entries store
  console.log('Journal Entry Created:', journalEntry)

  // 3. Mark return as posted
  returnInv.status = 'posted'
  returnInv.postedDate = new Date().toISOString().split('T')[0]

  alert(`تم ترحيل المرتجع بنجاح!\n\nالمبلغ المُرجع: ${totalAmount.toFixed(2)} ريال`)
}

const printReturn = () => {
  if (!selectedReturn.value) return

  // Create print content
  const printContent = `
    <div class="print-invoice">
      <div class="print-header">
        <h1 style="font-size: 24px; margin: 0; color: #dc2626;">مرتجع مبيعات</h1>
        <div class="print-company-info">
          <h2 style="margin: 5px 0; color: #374151;">شركة المحاسبة والمخزون</h2>
          <p style="margin: 2px 0; color: #6b7280;">الرياض، المملكة العربية السعودية</p>
          <p style="margin: 2px 0; color: #6b7280;">هاتف: +966 11 234 5678 | بريد إلكتروني: info@company.com</p>
        </div>
      </div>

      <div class="print-invoice-details">
        <div class="print-customer-info">
          <h3 style="margin-bottom: 10px; color: #374151;">معلومات العميل</h3>
          <p style="margin: 2px 0;"><strong>الاسم:</strong> ${selectedReturn.value.customerName}</p>
          <p style="margin: 2px 0;"><strong>العنوان:</strong> ${selectedReturn.value.customerAddress || 'غير محدد'}</p>
          <p style="margin: 2px 0;"><strong>الهاتف:</strong> ${selectedReturn.value.customerPhone || 'غير محدد'}</p>
        </div>
        <div class="print-invoice-info">
          <h3 style="margin-bottom: 10px; color: #374151;">تفاصيل المرتجع</h3>
          <p style="margin: 2px 0;"><strong>رقم المرتجع:</strong> ${selectedReturn.value.number}</p>
          <p style="margin: 2px 0;"><strong>التاريخ:</strong> ${new Date(selectedReturn.value.date).toLocaleDateString('ar-SA')}</p>
          <p style="margin: 2px 0;"><strong>رقم الفاتورة المرجعية:</strong> ${selectedReturn.value.referenceInvoiceNumber}</p>
          <p style="margin: 2px 0;"><strong>طريقة الدفع:</strong> ${selectedReturn.value.paymentMethod === 'cash' ? 'نقدي' : selectedReturn.value.paymentMethod === 'credit' ? 'آجل' : 'تحويل'}</p>
          <p style="margin: 2px 0;"><strong>الحالة:</strong> ${selectedReturn.value.status === 'draft' ? 'مسودة' : selectedReturn.value.status === 'posted' ? 'مُرحّلة' : 'مدفوعة'}</p>
        </div>
      </div>

      <table class="print-table">
        <thead>
          <tr>
            <th>المنتج</th>
            <th>الوحدة</th>
            <th>الكمية المُرجعة</th>
            <th>السعر</th>
            <th>الخصم</th>
            <th>الإجمالي</th>
          </tr>
        </thead>
        <tbody>
          ${selectedReturn.value.items.map(item => `
            <tr>
              <td>${item.productName}</td>
              <td>${item.unit}</td>
              <td>${item.quantity}</td>
              <td>${item.price.toFixed(2)} ريال</td>
              <td>${item.discount.toFixed(2)} ريال</td>
              <td>${item.total.toFixed(2)} ريال</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div class="print-totals">
        <div class="print-total-row">
          <span><strong>المجموع الفرعي:</strong></span>
          <span>${selectedReturn.value.subtotal.toFixed(2)} ريال</span>
        </div>
        <div class="print-total-row">
          <span><strong>إجمالي الخصم:</strong></span>
          <span>${selectedReturn.value.totalDiscount.toFixed(2)} ريال</span>
        </div>
        <div class="print-total-row">
          <span><strong>الضريبة (15%):</strong></span>
          <span>${selectedReturn.value.tax.toFixed(2)} ريال</span>
        </div>
        <div class="print-total-row" style="border-top: 2px solid #000; padding-top: 10px; margin-top: 10px;">
          <span><strong>إجمالي المبلغ المُرجع:</strong></span>
          <span style="font-size: 18px; font-weight: bold; color: #dc2626;">${selectedReturn.value.total.toFixed(2)} ريال</span>
        </div>
      </div>

      ${selectedReturn.value.notes ? `
        <div style="margin-top: 30px;">
          <h4 style="margin-bottom: 10px; color: #374151;"><strong>ملاحظات:</strong></h4>
          <p style="color: #6b7280;">${selectedReturn.value.notes}</p>
        </div>
      ` : ''}

      <div class="print-footer">
        <p>تم إصدار هذا المرتجع إلكترونياً في ${new Date().toLocaleString('ar-SA')}</p>
        <p style="color: #dc2626; font-weight: bold;">هذا مرتجع مبيعات - سيتم إعادة المبلغ أو تعديل الفاتورة الأصلية</p>
      </div>
    </div>
  `

  // Create print window
  const printWindow = window.open('', '_blank', 'width=800,height=600')
  if (!printWindow) {
    alert('يرجى السماح بفتح النوافذ المنبثقة لطباعة المرتجع')
    return
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>مرتجع مبيعات - ${selectedReturn.value.number}</title>
      <style>
        @media print {
          .no-print {
            display: none !important;
          }

          .print-invoice {
            font-family: 'Noto Sans Arabic', 'Inter', sans-serif;
            direction: rtl;
            max-width: 210mm;
            margin: 0 auto;
            padding: 20mm;
            background: white;
            color: black;
          }

          .print-header {
            text-align: center;
            border-bottom: 2px solid #000;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }

          .print-company-info {
            margin-bottom: 20px;
          }

          .print-invoice-details {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
          }

          .print-customer-info,
          .print-invoice-info {
            flex: 1;
          }

          .print-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
          }

          .print-table th,
          .print-table td {
            border: 1px solid #000;
            padding: 8px;
            text-align: right;
          }

          .print-table th {
            background: #f5f5f5;
            font-weight: bold;
          }

          .print-totals {
            text-align: left;
            margin-top: 20px;
          }

          .print-total-row {
            display: flex;
            justify-content: space-between;
            margin: 5px 0;
          }

          .print-footer {
            margin-top: 40px;
            text-align: center;
            font-size: 12px;
            color: #666;
          }
        }

        body {
          font-family: 'Noto Sans Arabic', 'Inter', sans-serif;
          margin: 0;
          padding: 20px;
          background: white;
        }
      </style>
    </head>
    <body>
      ${printContent}
      <script>
        window.onload = function() {
          window.print();
          setTimeout(function() {
            window.close();
          }, 1000);
        }
      <\/script>
    </body>
    </html>
  `

  printWindow.document.write(htmlContent)
  printWindow.document.close()
};

const loadInvoiceItems = () => {
  const selectedInvoice = postedInvoices.value.find(inv => inv.id == returnForm.value.referenceInvoiceId)
  if (selectedInvoice) {
    // Auto-fill customer
    returnForm.value.customerId = selectedInvoice.customerId

    // Load items from original invoice
    returnForm.value.items = selectedInvoice.items.map(item => ({
      productId: item.productId,
      product: item.product,
      unit: item.unit,
      originalQuantity: item.quantity,
      returnQuantity: 0, // Start with 0, user can adjust
      price: item.price,
      total: 0
    }))
  } else {
    returnForm.value.customerId = ''
    returnForm.value.items = []
  }
}

const calculateReturnTotal = (index) => {
  const item = returnForm.value.items[index]
  item.total = item.returnQuantity * item.price
}

const removeReturnItem = (index) => {
  returnForm.value.items.splice(index, 1)
}

const saveReturn = () => {
  const total = returnTotal.value
  const customer = customers.value.find(c => c.id == returnForm.value.customerId)
  const referenceInvoice = postedInvoices.value.find(inv => inv.id == returnForm.value.referenceInvoiceId)

  if (selectedReturn.value) {
    // Update existing return
    const index = returnInvoices.value.findIndex(ret => ret.id === selectedReturn.value.id)
    if (index > -1) {
      returnInvoices.value[index] = {
        ...returnForm.value,
        id: selectedReturn.value.id,
        total,
        customer,
        referenceInvoice
      }
    }
  } else {
    // Add new return
    const newId = Math.max(...returnInvoices.value.map(ret => ret.id)) + 1
    returnInvoices.value.push({
      ...returnForm.value,
      id: newId,
      total,
      customer,
      referenceInvoice
    })
  }

  // Reset form
  newReturn()
}

const cancelEdit = () => {
  newReturn()
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

// Initialize
onMounted(() => {
  newReturn()
})
</script>