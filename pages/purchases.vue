<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Main Content -->
    <div class="flex flex-col lg:flex-row h-screen">
      <!-- List Section (Right side for RTL) -->
      <div class="w-full lg:w-2/5 bg-gray-50 p-4 border-l border-gray-200">
        <div class="bg-white rounded-lg shadow-sm">
          <!-- Header -->
          <div class="p-4 border-b border-gray-200">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">فواتير المشتريات</h2>

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
                    المورد
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
                    {{ invoice.supplier?.name || 'غير محدد' }}
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
              <label class="block text-sm font-medium text-gray-700 mb-1">تاريخ الفاتورة</label>
              <input
                v-model="invoiceForm.date"
                type="date"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">المورد</label>
            <select
              v-model="invoiceForm.supplierId"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">اختر المورد</option>
              <option v-for="supplier in suppliers" :key="supplier.id" :value="supplier.id">
                {{ supplier.name }}
              </option>
            </select>
          </div>

          <div class="grid grid-cols-2 gap-4">
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

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">شروط الدفع</label>
              <select
                v-model="invoiceForm.paymentTerms"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="immediate">فوري</option>
                <option value="7days">7 أيام</option>
                <option value="15days">15 يوم</option>
                <option value="30days">30 يوم</option>
                <option value="60days">60 يوم</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">ملاحظات</label>
            <textarea
              v-model="invoiceForm.notes"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="أدخل ملاحظات إضافية..."
            ></textarea>
          </div>

          <!-- Products Table -->
          <div class="border border-gray-200 rounded-lg">
            <div class="p-4 border-b border-gray-200">
              <div class="flex justify-between items-center">
                <h3 class="text-lg font-medium text-gray-900">المنتجات</h3>
                <button
                  type="button"
                  @click="addItem"
                  class="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                >
                  إضافة منتج
                </button>
              </div>
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
                      الإجراءات
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
                        <option value="box">صندوق</option>
                        <option value="kg">كيلو</option>
                        <option value="liter">لتر</option>
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
                    <td class="px-4 py-3 text-sm text-gray-900">
                      {{ item.total.toFixed(2) }} ريال
                    </td>
                    <td class="px-4 py-3">
                      <button
                        type="button"
                        @click="removeItem(index)"
                        class="text-red-600 hover:text-red-800"
                      >
                        <TrashIcon class="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Totals -->
          <div class="bg-gray-50 p-4 rounded-lg">
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <label class="block text-gray-700">المجموع الفرعي:</label>
                <span class="font-medium">{{ subtotal.toFixed(2) }} ريال</span>
              </div>
              <div>
                <label class="block text-gray-700">إجمالي الخصم:</label>
                <span class="font-medium">{{ totalDiscount.toFixed(2) }} ريال</span>
              </div>
              <div>
                <label class="block text-gray-700">الضريبة (15%):</label>
                <span class="font-medium">{{ tax.toFixed(2) }} ريال</span>
              </div>
              <div>
                <label class="block text-gray-700 font-bold">الإجمالي النهائي:</label>
                <span class="font-bold text-lg text-blue-600">{{ total.toFixed(2) }} ريال</span>
              </div>
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

        <!-- Invoice Details -->
        <div v-if="selectedInvoice && !invoiceForm.number" class="bg-gray-50 rounded-lg p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">تفاصيل الفاتورة</h3>

          <div class="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label class="block text-sm font-medium text-gray-700">رقم الفاتورة</label>
              <p class="mt-1 text-sm text-gray-900">{{ selectedInvoice.number }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">تاريخ الفاتورة</label>
              <p class="mt-1 text-sm text-gray-900">{{ new Date(selectedInvoice.date).toLocaleDateString('ar-SA') }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">المورد</label>
              <p class="mt-1 text-sm text-gray-900">{{ selectedInvoice.supplier?.name }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">طريقة الدفع</label>
              <p class="mt-1 text-sm text-gray-900">
                {{ selectedInvoice.paymentMethod === 'cash' ? 'نقدي' : selectedInvoice.paymentMethod === 'credit' ? 'آجل' : 'تحويل' }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">شروط الدفع</label>
              <p class="mt-1 text-sm text-gray-900">
                {{ paymentTermsText(selectedInvoice.paymentTerms) }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">الحالة</label>
              <span
                :class="[
                  'inline-flex px-2 py-1 text-xs rounded-full mt-1',
                  selectedInvoice.status === 'posted' ? 'bg-green-100 text-green-800' :
                  selectedInvoice.status === 'paid' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                ]"
              >
                {{ getStatusLabel(selectedInvoice.status) }}
              </span>
            </div>
          </div>

          <!-- Products Table -->
          <div class="border border-gray-200 rounded-lg mb-6">
            <div class="p-4 border-b border-gray-200">
              <h4 class="text-md font-medium text-gray-900">المنتجات</h4>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المنتج</th>
                    <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الوحدة</th>
                    <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الكمية</th>
                    <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">السعر</th>
                    <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الخصم</th>
                    <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجمالي</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="item in selectedInvoice.items" :key="item.id">
                    <td class="px-4 py-3 text-sm text-gray-900">{{ item.productName }}</td>
                    <td class="px-4 py-3 text-sm text-gray-900">{{ item.unit }}</td>
                    <td class="px-4 py-3 text-sm text-gray-900">{{ item.quantity }}</td>
                    <td class="px-4 py-3 text-sm text-gray-900">{{ item.price.toFixed(2) }} ريال</td>
                    <td class="px-4 py-3 text-sm text-gray-900">{{ item.discount.toFixed(2) }} ريال</td>
                    <td class="px-4 py-3 text-sm text-gray-900">{{ item.total.toFixed(2) }} ريال</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Totals -->
          <div class="bg-blue-50 p-4 rounded-lg">
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <label class="block text-gray-700">المجموع الفرعي:</label>
                <span class="font-medium">{{ selectedInvoice.subtotal.toFixed(2) }} ريال</span>
              </div>
              <div>
                <label class="block text-gray-700">إجمالي الخصم:</label>
                <span class="font-medium">{{ selectedInvoice.totalDiscount.toFixed(2) }} ريال</span>
              </div>
              <div>
                <label class="block text-gray-700">الضريبة (15%):</label>
                <span class="font-medium">{{ selectedInvoice.tax.toFixed(2) }} ريال</span>
              </div>
              <div>
                <label class="block text-gray-700 font-bold">الإجمالي النهائي:</label>
                <span class="font-bold text-lg text-blue-600">{{ selectedInvoice.total.toFixed(2) }} ريال</span>
              </div>
            </div>
          </div>

          <div v-if="selectedInvoice.notes" class="mt-4">
            <label class="block text-sm font-medium text-gray-700">ملاحظات</label>
            <p class="mt-1 text-sm text-gray-900 bg-gray-50 p-3 rounded">{{ selectedInvoice.notes }}</p>
          </div>
        </div>
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
  PrinterIcon
} from '@heroicons/vue/24/outline'

// Mock data
const suppliers = ref([
  {
    id: 1,
    name: 'شركة الأدوات المكتبية',
    phone: '0112345678',
    email: 'office@tools-sa.com',
    address: 'الرياض، المملكة العربية السعودية',
    openingBalance: 2500,
    balanceType: 'credit',
    paymentTerms: '30days',
    status: 'active'
  },
  {
    id: 2,
    name: 'مؤسسة الإلكترونيات المتقدمة',
    phone: '0123456789',
    email: 'sales@electronics-sa.com',
    address: 'جدة، المملكة العربية السعودية',
    openingBalance: 1500,
    balanceType: 'debit',
    paymentTerms: '15days',
    status: 'active'
  }
])

const products = ref([
  {
    id: 1,
    name: 'قلم حبر',
    category: 'أدوات مكتبية',
    barcode: '123456789',
    status: 'active',
    units: [
      {
        name: 'قطعة',
        type: 'base',
        conversionRate: 1,
        salePrice: 5,
        purchasePrice: 3,
        costPrice: 2,
        currentQuantity: 100
      }
    ]
  },
  {
    id: 2,
    name: 'ورق A4',
    category: 'أدوات مكتبية',
    barcode: '987654321',
    status: 'active',
    units: [
      {
        name: 'رزمة',
        type: 'base',
        conversionRate: 1,
        salePrice: 25,
        purchasePrice: 18,
        costPrice: 15,
        currentQuantity: 50
      }
    ]
  }
])

const invoices = ref([
  {
    id: 1,
    number: 'PUR-2024-001',
    date: '2024-01-15',
    supplierId: 1,
    supplier: { name: 'شركة الأدوات المكتبية' },
    paymentMethod: 'credit',
    paymentTerms: '30days',
    status: 'posted',
    postedDate: '2024-01-15',
    items: [
      {
        productId: 1,
        productName: 'قلم حبر',
        unit: 'قطعة',
        quantity: 50,
        price: 3,
        discount: 0,
        total: 150
      },
      {
        productId: 2,
        productName: 'ورق A4',
        unit: 'رزمة',
        quantity: 10,
        price: 18,
        discount: 0,
        total: 180
      }
    ],
    subtotal: 330,
    totalDiscount: 0,
    tax: 49.5,
    total: 379.5,
    notes: 'طلبية شهرية'
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
  supplierId: '',
  paymentMethod: 'credit',
  paymentTerms: '30days',
  notes: '',
  items: []
})

// Computed properties
const filteredInvoices = computed(() => {
  let filtered = invoices.value

  // Search filter
  if (searchQuery.value) {
    filtered = filtered.filter(invoice =>
      invoice.number.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      invoice.supplier?.name.toLowerCase().includes(searchQuery.value.toLowerCase())
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

const subtotal = computed(() => {
  return invoiceForm.value.items.reduce((sum, item) => sum + item.total, 0)
})

const totalDiscount = computed(() => {
  return invoiceForm.value.items.reduce((sum, item) => sum + item.discount, 0)
})

const tax = computed(() => {
  return subtotal.value * 0.15
})

const total = computed(() => {
  return subtotal.value - totalDiscount.value + tax.value
})

// Methods
const selectInvoice = (invoice) => {
  selectedInvoice.value = invoice
  invoiceForm.value = {
    number: '',
    date: new Date().toISOString().split('T')[0],
    supplierId: '',
    paymentMethod: 'credit',
    paymentTerms: '30days',
    notes: '',
    items: []
  }
}

const newInvoice = () => {
  selectedInvoice.value = null
  invoiceForm.value = {
    number: `PUR-2024-${String(invoices.value.length + 1).padStart(3, '0')}`,
    date: new Date().toISOString().split('T')[0],
    supplierId: '',
    paymentMethod: 'credit',
    paymentTerms: '30days',
    notes: '',
    items: []
  }
}

const editInvoice = () => {
  if (!selectedInvoice.value) return

  invoiceForm.value = {
    number: selectedInvoice.value.number,
    date: selectedInvoice.value.date,
    supplierId: selectedInvoice.value.supplierId,
    paymentMethod: selectedInvoice.value.paymentMethod,
    paymentTerms: selectedInvoice.value.paymentTerms,
    notes: selectedInvoice.value.notes,
    items: [...selectedInvoice.value.items]
  }
}

const deleteInvoice = () => {
  if (!selectedInvoice.value || selectedInvoice.value.status === 'posted') return

  if (confirm('هل أنت متأكد من حذف هذه الفاتورة؟')) {
    const index = invoices.value.findIndex(inv => inv.id === selectedInvoice.value.id)
    if (index > -1) {
      invoices.value.splice(index, 1)
      selectedInvoice.value = null
      newInvoice()
    }
  }
}

const postInvoice = () => {
  if (!selectedInvoice.value || selectedInvoice.value.status === 'posted') return

  selectedInvoice.value.status = 'posted'
  selectedInvoice.value.postedDate = new Date().toISOString().split('T')[0]

  // Update inventory
  selectedInvoice.value.items.forEach(item => {
    const product = products.value.find(p => p.id == item.productId)
    if (product) {
      const unit = product.units.find(u => u.name === item.unit)
      if (unit) {
        unit.currentQuantity += item.quantity
      }
    }
  })

  alert(`تم ترحيل الفاتورة بنجاح!\n\nالمبلغ: ${selectedInvoice.value.total.toFixed(2)} ريال\nتم تحديث المخزون`)

  // Refresh the invoice list
  // In a real app, this would trigger a data refresh
}

const printInvoice = () => {
  if (!selectedInvoice.value) return

  // Create print content
  const printContent = `
    <div class="print-invoice">
      <div class="print-header">
        <h1 style="font-size: 24px; margin: 0; color: #2563eb;">فاتورة مشتريات</h1>
        <div class="print-company-info">
          <h2 style="margin: 5px 0; color: #374151;">شركة المحاسبة والمخزون</h2>
          <p style="margin: 2px 0; color: #6b7280;">الرياض، المملكة العربية السعودية</p>
          <p style="margin: 2px 0; color: #6b7280;">هاتف: +966 11 234 5678 | بريد إلكتروني: info@company.com</p>
        </div>
      </div>

      <div class="print-invoice-details">
        <div class="print-supplier-info">
          <h3 style="margin-bottom: 10px; color: #374151;">معلومات المورد</h3>
          <p style="margin: 2px 0;"><strong>الاسم:</strong> ${selectedInvoice.value.supplier?.name}</p>
          <p style="margin: 2px 0;"><strong>العنوان:</strong> غير محدد</p>
          <p style="margin: 2px 0;"><strong>الهاتف:</strong> غير محدد</p>
        </div>
        <div class="print-invoice-info">
          <h3 style="margin-bottom: 10px; color: #374151;">تفاصيل الفاتورة</h3>
          <p style="margin: 2px 0;"><strong>رقم الفاتورة:</strong> ${selectedInvoice.value.number}</p>
          <p style="margin: 2px 0;"><strong>التاريخ:</strong> ${new Date(selectedInvoice.value.date).toLocaleDateString('ar-SA')}</p>
          <p style="margin: 2px 0;"><strong>طريقة الدفع:</strong> ${selectedInvoice.value.paymentMethod === 'cash' ? 'نقدي' : selectedInvoice.value.paymentMethod === 'credit' ? 'آجل' : 'تحويل'}</p>
          <p style="margin: 2px 0;"><strong>شروط الدفع:</strong> ${paymentTermsText(selectedInvoice.value.paymentTerms)}</p>
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
      <title>فاتورة مشتريات - ${selectedInvoice.value.number}</title>
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

          .print-supplier-info,
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
}

const saveInvoice = () => {
  const supplier = suppliers.value.find(s => s.id == invoiceForm.value.supplierId)
  if (!supplier) return

  const invoiceData = {
    ...invoiceForm.value,
    supplier,
    subtotal: subtotal.value,
    totalDiscount: totalDiscount.value,
    tax: tax.value,
    total: total.value,
    status: 'draft'
  }

  if (selectedInvoice.value) {
    // Update existing invoice
    const index = invoices.value.findIndex(inv => inv.id === selectedInvoice.value.id)
    if (index > -1) {
      invoices.value[index] = { ...invoiceData, id: selectedInvoice.value.id }
    }
  } else {
    // Add new invoice
    const newId = Math.max(...invoices.value.map(inv => inv.id)) + 1
    invoices.value.push({ ...invoiceData, id: newId })
  }

  // Reset form
  newInvoice()
}

const cancelEdit = () => {
  newInvoice()
}

const addItem = () => {
  invoiceForm.value.items.push({
    productId: '',
    unit: 'قطعة',
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
    const unit = product.units.find(u => u.name === item.unit)
    if (unit) {
      item.price = unit.purchasePrice
      calculateItemTotal(index)
    }
  }
}

const calculateItemTotal = (index) => {
  const item = invoiceForm.value.items[index]
  item.total = (item.quantity * item.price) - item.discount
}

const getStatusLabel = (status) => {
  const labels = {
    'draft': 'مسودة',
    'posted': 'مُرحّلة',
    'paid': 'مدفوعة'
  }
  return labels[status] || status
}

const paymentTermsText = (terms) => {
  const termsMap = {
    'immediate': 'فوري',
    '7days': '7 أيام',
    '15days': '15 يوم',
    '30days': '30 يوم',
    '60days': '60 يوم'
  }
  return termsMap[terms] || terms
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