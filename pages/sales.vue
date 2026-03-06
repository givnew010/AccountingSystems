<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Main Content -->
    <div class="flex flex-col lg:flex-row h-screen">
      <!-- List Section (Right side for RTL) -->
      <div class="w-full lg:w-2/5 bg-gray-50 p-4 border-l border-gray-200">
        <div class="bg-white rounded-lg shadow-sm">
          <!-- Header -->
          <div class="p-4 border-b border-gray-200">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">فواتير المبيعات</h2>

            <!-- Search -->
            <div class="mb-4">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="البحث في الفواتير..."
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
                <option value="paid">مدفوعة</option>
              </select>
            </div>
          </div>

          <!-- Table -->
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    رقم الفاتورة
                  </th>
                  <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    العميل
                  </th>
                  <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    المبلغ
                  </th>
                  <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    تاريخ الترحيل
                  </th>
                  <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الحالة
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr
                  v-for="invoice in filteredInvoices"
                  :key="invoice.id"
                  @click="selectInvoice(invoice)"
                  class="cursor-pointer hover:bg-gray-50"
                >
                  <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {{ invoice.number }}
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {{ invoice.customer?.name || 'غير محدد' }}
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {{ invoice.total.toFixed(2) }} ريال
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {{ invoice.postedDate || '-' }}
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap">
                    <span
                      :class="[
                        'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                        invoice.status === 'posted'
                          ? 'bg-green-100 text-green-800'
                          : invoice.status === 'paid'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      ]"
                    >
                      {{ getStatusLabel(invoice.status) }}
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
            @click="newInvoice"
            class="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <PlusIcon class="w-5 h-5" />
          </button>
          <button
            @click="editInvoice"
            :disabled="!selectedInvoice"
            class="flex items-center justify-center w-10 h-10 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <PencilIcon class="w-5 h-5" />
          </button>
          <button
            @click="deleteInvoice"
            :disabled="!selectedInvoice || selectedInvoice.status === 'posted'"
            class="flex items-center justify-center w-10 h-10 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <TrashIcon class="w-5 h-5" />
          </button>
          <button
            @click="postInvoice"
            :disabled="!selectedInvoice || selectedInvoice.status === 'posted'"
            class="flex items-center justify-center w-10 h-10 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CheckIcon class="w-5 h-5" />
          </button>
          <button
            @click="printInvoice"
            :disabled="!selectedInvoice"
            class="flex items-center justify-center w-10 h-10 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <PrinterIcon class="w-5 h-5" />
          </button>
        </div>

        <!-- Invoice Form -->
        <form @submit.prevent="saveInvoice" class="space-y-4">
          <!-- Invoice Header -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">رقم الفاتورة</label>
              <input
                v-model="invoiceForm.number"
                type="text"
                readonly
                class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">التاريخ</label>
              <input
                v-model="invoiceForm.date"
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
                v-model="invoiceForm.customerId"
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
              <label class="block text-sm font-medium text-gray-700 mb-1">طريقة الدفع</label>
              <select
                v-model="invoiceForm.paymentMethod"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="cash">نقدي</option>
                <option value="credit">آجل</option>
                <option value="transfer">تحويل</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">ملاحظات</label>
            <textarea
              v-model="invoiceForm.notes"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            ></textarea>
          </div>

          <!-- Products Table -->
          <div class="border border-gray-200 rounded-lg">
            <div class="p-4 border-b border-gray-200">
              <h3 class="text-lg font-medium text-gray-900">المنتجات</h3>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      المنتج
                    </th>
                    <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الوحدة
                    </th>
                    <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الكمية
                    </th>
                    <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      السعر
                    </th>
                    <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الخصم
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
                  <tr v-for="(item, index) in invoiceForm.items" :key="index">
                    <td class="px-4 py-3">
                      <select
                        v-model="item.productId"
                        @change="updateProductDetails(index)"
                        class="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      >
                        <option value="">اختر المنتج</option>
                        <option v-for="product in products" :key="product.id" :value="product.id">
                          {{ product.name }}
                        </option>
                      </select>
                    </td>
                    <td class="px-4 py-3">
                      <select
                        v-model="item.unit"
                        class="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      >
                        <option value="piece">قطعة</option>
                        <option value="kg">كيلو</option>
                        <option value="box">صندوق</option>
                      </select>
                    </td>
                    <td class="px-4 py-3">
                      <input
                        v-model.number="item.quantity"
                        @input="calculateItemTotal(index)"
                        type="number"
                        min="0"
                        step="0.01"
                        class="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </td>
                    <td class="px-4 py-3">
                      <input
                        v-model.number="item.price"
                        @input="calculateItemTotal(index)"
                        type="number"
                        min="0"
                        step="0.01"
                        class="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </td>
                    <td class="px-4 py-3">
                      <input
                        v-model.number="item.discount"
                        @input="calculateItemTotal(index)"
                        type="number"
                        min="0"
                        step="0.01"
                        class="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </td>
                    <td class="px-4 py-3 text-sm font-medium">
                      {{ item.total.toFixed(2) }}
                    </td>
                    <td class="px-4 py-3">
                      <button
                        @click="removeItem(index)"
                        class="text-red-600 hover:text-red-800"
                      >
                        <XMarkIcon class="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="p-4 border-t border-gray-200">
              <button
                @click="addItem"
                type="button"
                class="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
              >
                <PlusIcon class="w-4 h-4" />
                إضافة منتج
              </button>
            </div>
          </div>

          <!-- Totals -->
          <div class="bg-gray-50 p-4 rounded-lg">
            <div class="flex justify-between items-center">
              <span class="text-lg font-medium text-gray-900">الإجمالي:</span>
              <span class="text-lg font-bold text-gray-900">{{ invoiceTotal.toFixed(2) }} ريال</span>
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

// Mock data
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

// Mock data for inventory and accounting
const journalEntries = ref([])

const accounts = ref([
  { id: 1, name: 'المبيعات', type: 'revenue', balance: 0 },
  { id: 2, name: 'الصندوق', type: 'asset', balance: 10000 },
  { id: 3, name: 'المخزون', type: 'asset', balance: 5000 },
  { id: 4, name: 'حسابات العملاء', type: 'asset', balance: 0 },
  { id: 5, name: 'تكلفة المبيعات', type: 'expense', balance: 0 }
])

const invoices = ref([
  {
    id: 1,
    number: 'INV-001',
    date: '2024-01-15',
    customerId: 1,
    customer: { name: 'أحمد محمد' },
    paymentMethod: 'cash',
    notes: '',
    items: [
      { productId: 1, product: { name: 'منتج 1' }, unit: 'piece', quantity: 2, price: 10.00, discount: 0, total: 20.00 }
    ],
    total: 20.00,
    status: 'draft'
  }
])

// Reactive state
const searchQuery = ref('')
const statusFilter = ref('all')
const currentPage = ref(1)
const itemsPerPage = 10
const selectedInvoice = ref(null)
const invoiceForm = ref({
  number: '',
  date: new Date().toISOString().split('T')[0],
  customerId: '',
  paymentMethod: 'cash',
  notes: '',
  items: [],
  total: 0,
  status: 'draft'
})

// Computed properties
const filteredInvoices = computed(() => {
  let filtered = invoices.value

  // Search filter
  if (searchQuery.value) {
    filtered = filtered.filter(invoice =>
      invoice.number.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      invoice.customer?.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  // Status filter
  if (statusFilter.value !== 'all') {
    filtered = filtered.filter(invoice => invoice.status === statusFilter.value)
  }

  return filtered
})

const totalPages = computed(() => {
  return Math.ceil(filteredInvoices.value.length / itemsPerPage)
})

const invoiceTotal = computed(() => {
  return invoiceForm.value.items.reduce((sum, item) => sum + item.total, 0)
})

// Methods
const getStatusLabel = (status) => {
  const labels = {
    draft: 'مسودة',
    posted: 'مُرحّلة',
    paid: 'مدفوعة'
  }
  return labels[status] || status
}

const selectInvoice = (invoice) => {
  selectedInvoice.value = invoice
  invoiceForm.value = {
    ...invoice,
    items: invoice.items.map(item => ({ ...item }))
  }
}

const newInvoice = () => {
  selectedInvoice.value = null
  const nextNumber = `INV-${String(invoices.value.length + 1).padStart(3, '0')}`
  invoiceForm.value = {
    number: nextNumber,
    date: new Date().toISOString().split('T')[0],
    customerId: '',
    paymentMethod: 'cash',
    notes: '',
    items: [],
    total: 0,
    status: 'draft'
  }
}

const editInvoice = () => {
  // Form is already populated from selectInvoice
}

const deleteInvoice = () => {
  if (selectedInvoice.value && selectedInvoice.value.status !== 'posted' && confirm('هل أنت متأكد من حذف هذه الفاتورة؟')) {
    const index = invoices.value.findIndex(inv => inv.id === selectedInvoice.value.id)
    if (index > -1) {
      invoices.value.splice(index, 1)
      selectedInvoice.value = null
      newInvoice()
    }
  }
}

const postInvoice = () => {
  if (!selectedInvoice.value || selectedInvoice.value.status === 'posted') {
    return
  }

  // Validate that all products have sufficient stock
  for (const item of selectedInvoice.value.items) {
    const product = products.value.find(p => p.id == item.productId)
    if (!product) {
      alert(`المنتج ${item.productId} غير موجود`)
      return
    }
    if (product.stock < item.quantity) {
      alert(`الكمية المتاحة من ${product.name} غير كافية. المتاح: ${product.stock}`)
      return
    }
  }

  // Perform posting operations
  const invoice = selectedInvoice.value
  const totalAmount = invoice.total

  // 1. Update inventory (reduce stock)
  invoice.items.forEach(item => {
    const product = products.value.find(p => p.id == item.productId)
    if (product) {
      product.stock -= item.quantity
    }
  })

  // 2. Create journal entries
  const journalEntryId = journalEntries.value.length + 1
  const journalEntry = {
    id: journalEntryId,
    date: new Date().toISOString().split('T')[0],
    reference: `فاتورة مبيعات ${invoice.number}`,
    description: `ترحيل فاتورة مبيعات ${invoice.number} للعميل ${invoice.customer.name}`,
    entries: []
  }

  // Revenue entry (Debit Sales Revenue)
  journalEntry.entries.push({
    accountId: 1, // المبيعات
    accountName: 'المبيعات',
    debit: totalAmount,
    credit: 0
  })

  // Cost of Goods Sold entry (Debit COGS, Credit Inventory)
  const totalCost = invoice.items.reduce((sum, item) => {
    const product = products.value.find(p => p.id == item.productId)
    return sum + (product ? product.costPrice * item.quantity : 0)
  }, 0)

  if (totalCost > 0) {
    journalEntry.entries.push({
      accountId: 5, // تكلفة المبيعات
      accountName: 'تكلفة المبيعات',
      debit: totalCost,
      credit: 0
    })

    journalEntry.entries.push({
      accountId: 3, // المخزون
      accountName: 'المخزون',
      debit: 0,
      credit: totalCost
    })
  }

  // Cash/Customer account entry
  if (invoice.paymentMethod === 'cash') {
    // Debit Cash
    journalEntry.entries.push({
      accountId: 2, // الصندوق
      accountName: 'الصندوق',
      debit: totalAmount,
      credit: 0
    })
  } else {
    // Debit Accounts Receivable
    journalEntry.entries.push({
      accountId: 4, // حسابات العملاء
      accountName: 'حسابات العملاء',
      debit: totalAmount,
      credit: 0
    })

    // Update customer balance
    const customer = customers.value.find(c => c.id == invoice.customerId)
    if (customer) {
      customer.balance = (customer.balance || 0) + totalAmount
    }
  }

  // Add the journal entry
  journalEntries.value.push(journalEntry)

  // 3. Update account balances
  journalEntry.entries.forEach(entry => {
    const account = accounts.value.find(a => a.id === entry.accountId)
    if (account) {
      account.balance += entry.debit - entry.credit
    }
  })

  // 4. Mark invoice as posted
  invoice.status = 'posted'
  invoice.postedDate = new Date().toISOString().split('T')[0]

  // Show success message with details
  alert(`تم ترحيل الفاتورة بنجاح!\n\nتفاصيل الترحيل:
- رقم القيد: ${journalEntryId}
- المبلغ: ${totalAmount.toFixed(2)} ريال
- تم تحديث المخزون والحسابات`)

  // Refresh the invoice list
  // In a real app, this would trigger a data refresh
}

const printInvoice = () => {
  if (!selectedInvoice.value) return

  // Create print content
  const printContent = `
    <div class="print-invoice">
      <div class="print-header">
        <h1 style="font-size: 24px; margin: 0; color: #2563eb;">فاتورة مبيعات</h1>
        <div class="print-company-info">
          <h2 style="margin: 5px 0; color: #374151;">شركة المحاسبة والمخزون</h2>
          <p style="margin: 2px 0; color: #6b7280;">الرياض، المملكة العربية السعودية</p>
          <p style="margin: 2px 0; color: #6b7280;">هاتف: +966 11 234 5678 | بريد إلكتروني: info@company.com</p>
        </div>
      </div>

      <div class="print-invoice-details">
        <div class="print-customer-info">
          <h3 style="margin-bottom: 10px; color: #374151;">معلومات العميل</h3>
          <p style="margin: 2px 0;"><strong>الاسم:</strong> ${selectedInvoice.value.customerName}</p>
          <p style="margin: 2px 0;"><strong>العنوان:</strong> ${selectedInvoice.value.customerAddress || 'غير محدد'}</p>
          <p style="margin: 2px 0;"><strong>الهاتف:</strong> ${selectedInvoice.value.customerPhone || 'غير محدد'}</p>
        </div>
        <div class="print-invoice-info">
          <h3 style="margin-bottom: 10px; color: #374151;">تفاصيل الفاتورة</h3>
          <p style="margin: 2px 0;"><strong>رقم الفاتورة:</strong> ${selectedInvoice.value.number}</p>
          <p style="margin: 2px 0;"><strong>التاريخ:</strong> ${new Date(selectedInvoice.value.date).toLocaleDateString('ar-SA')}</p>
          <p style="margin: 2px 0;"><strong>طريقة الدفع:</strong> ${selectedInvoice.value.paymentMethod === 'cash' ? 'نقدي' : selectedInvoice.value.paymentMethod === 'credit' ? 'آجل' : 'تحويل'}</p>
          <p style="margin: 2px 0;"><strong>الحالة:</strong> ${selectedInvoice.value.status === 'draft' ? 'مسودة' : selectedInvoice.value.status === 'posted' ? 'مُرحّلة' : 'مدفوعة'}</p>
        </div>
      </div>

      <table class="print-table">
        <thead>
          <tr>
            <th>المنتج</th>
            <th>الوحدة</th>
            <th>الكمية</th>
            <th>السعر</th>
            <th>الخصم</th>
            <th>الإجمالي</th>
          </tr>
        </thead>
        <tbody>
          ${selectedInvoice.value.items.map(item => `
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
          <span>${selectedInvoice.value.subtotal.toFixed(2)} ريال</span>
        </div>
        <div class="print-total-row">
          <span><strong>إجمالي الخصم:</strong></span>
          <span>${selectedInvoice.value.totalDiscount.toFixed(2)} ريال</span>
        </div>
        <div class="print-total-row">
          <span><strong>الضريبة (15%):</strong></span>
          <span>${selectedInvoice.value.tax.toFixed(2)} ريال</span>
        </div>
        <div class="print-total-row" style="border-top: 2px solid #000; padding-top: 10px; margin-top: 10px;">
          <span><strong>الإجمالي النهائي:</strong></span>
          <span style="font-size: 18px; font-weight: bold;">${selectedInvoice.value.total.toFixed(2)} ريال</span>
        </div>
      </div>

      ${selectedInvoice.value.notes ? `
        <div style="margin-top: 30px;">
          <h4 style="margin-bottom: 10px; color: #374151;"><strong>ملاحظات:</strong></h4>
          <p style="color: #6b7280;">${selectedInvoice.value.notes}</p>
        </div>
      ` : ''}

      <div class="print-footer">
        <p>شكراً لتعاملكم معنا</p>
        <p>تم إصدار هذه الفاتورة إلكترونياً في ${new Date().toLocaleString('ar-SA')}</p>
      </div>
    </div>
  `

  // Create print window
  const printWindow = window.open('', '_blank', 'width=800,height=600')
  if (!printWindow) {
    alert('يرجى السماح بفتح النوافذ المنبثقة لطباعة الفاتورة')
    return
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>فاتورة مبيعات - ${selectedInvoice.value.number}</title>
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

const addItem = () => {
  invoiceForm.value.items.push({
    productId: '',
    unit: 'piece',
    quantity: 1,
    price: 0,
    discount: 0,
    total: 0
  })
}

const removeItem = (index) => {
  invoiceForm.value.items.splice(index, 1)
}

const updateProductDetails = (index) => {
  const item = invoiceForm.value.items[index]
  const product = products.value.find(p => p.id == item.productId)
  if (product) {
    item.price = product.price
    calculateItemTotal(index)
  }
}

const calculateItemTotal = (index) => {
  const item = invoiceForm.value.items[index]
  item.total = (item.quantity * item.price) - item.discount
}

const saveInvoice = () => {
  const total = invoiceTotal.value
  const customer = customers.value.find(c => c.id == invoiceForm.value.customerId)

  if (selectedInvoice.value) {
    // Update existing invoice
    const index = invoices.value.findIndex(inv => inv.id === selectedInvoice.value.id)
    if (index > -1) {
      invoices.value[index] = {
        ...invoiceForm.value,
        id: selectedInvoice.value.id,
        total,
        customer
      }
    }
  } else {
    // Add new invoice
    const newId = Math.max(...invoices.value.map(inv => inv.id)) + 1
    invoices.value.push({
      ...invoiceForm.value,
      id: newId,
      total,
      customer
    })
  }

  // Reset form
  newInvoice()
}

const cancelEdit = () => {
  newInvoice()
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
  newInvoice()
})
</script>