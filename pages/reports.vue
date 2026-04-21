<template>
  <div class="min-h-screen bg-gray-100 overflow-hidden">
    <!-- Report Tabs -->
    <div class="bg-white shadow-sm border-b border-gray-200">
      <div class="px-4 sm:px-6 lg:px-8">
        <nav class="-mb-px flex space-x-8 space-x-reverse" aria-label="Tabs">
          <button @click="activeTab = 'sales'"
            :class="['whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm', activeTab === 'sales' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300']">
            تقارير المبيعات
          </button>
          <button @click="activeTab = 'inventory'"
            :class="['whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm', activeTab === 'inventory' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300']">
            تقارير المخزون
          </button>
        </nav>
      </div>
    </div>

    <!-- Sales Reports -->
    <div v-if="activeTab === 'sales'" class="p-4 sm:p-6 lg:p-8">
      <div class="bg-white rounded-lg shadow-sm">
        <div class="p-6 border-b border-gray-200">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">تقارير المبيعات</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">من تاريخ</label>
              <input v-model="salesFilters.startDate" type="date"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">إلى تاريخ</label>
              <input v-model="salesFilters.endDate" type="date"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">العميل</label>
              <select v-model="salesFilters.customerId"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">جميع العملاء</option>
                <option v-for="customer in customers" :key="customer.id" :value="customer.id">{{ customer.name }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">الحالة</label>
              <select v-model="salesFilters.status"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="all">جميع الحالات</option>
                <option value="posted">مُرحّلة</option>
                <option value="paid">مدفوعة</option>
              </select>
            </div>
          </div>
          <div class="mt-4 flex flex-wrap gap-2">
            <button @click="generateSalesReport"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">إنشاء التقرير</button>
            <button @click="printSalesReport" :disabled="!salesReportData.length"
              class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">طباعة التقرير</button>
            <button @click="exportSalesReport" :disabled="!salesReportData.length"
              class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed">تصدير إلى Excel</button>
          </div>
        </div>

        <div v-if="salesReportData.length" class="p-6">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">رقم الفاتورة</th>
                  <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">التاريخ</th>
                  <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">العميل</th>
                  <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">المبلغ</th>
                  <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="invoice in salesReportData" :key="invoice.id">
                  <td class="px-4 py-3 text-sm text-gray-900">{{ invoice.number }}</td>
                  <td class="px-4 py-3 text-sm text-gray-900">{{ new Date(invoice.date).toLocaleDateString('ar-SA') }}</td>
                  <td class="px-4 py-3 text-sm text-gray-900">{{ invoice.customer?.name }}</td>
                  <td class="px-4 py-3 text-sm text-gray-900">{{ invoice.total.toFixed(2) }} ريال</td>
                  <td class="px-4 py-3">
                    <span :class="['inline-flex px-2 py-1 text-xs font-semibold rounded-full', invoice.status === 'posted' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800']">
                      {{ invoice.status === 'posted' ? 'مُرحّلة' : 'مدفوعة' }}
                    </span>
                  </td>
                </tr>
              </tbody>
              <tfoot class="bg-gray-50">
                <tr>
                  <td colspan="3" class="px-4 py-3 text-sm font-medium text-gray-900 text-right">المجموع الكلي:</td>
                  <td class="px-4 py-3 text-sm font-bold text-gray-900">{{ salesReportTotals.total.toFixed(2) }} ريال</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <div v-else class="p-6 text-center text-gray-500">
          لا توجد بيانات للعرض. يرجى تعديل المرشحات وإنشاء التقرير.
        </div>
      </div>
    </div>

    <!-- Inventory Reports -->
    <div v-if="activeTab === 'inventory'" class="p-4 sm:p-6 lg:p-8">
      <div class="bg-white rounded-lg shadow-sm">
        <div class="p-6 border-b border-gray-200">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">تقارير المخزون</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">الفئة</label>
              <select v-model="inventoryFilters.categoryId"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">جميع الفئات</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">المنتج</label>
              <select v-model="inventoryFilters.productId"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">جميع المنتجات</option>
                <option v-for="product in filteredProducts" :key="product.id" :value="product.id">{{ product.name }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">حالة المخزون</label>
              <select v-model="inventoryFilters.stockStatus"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="all">جميع الحالات</option>
                <option value="in-stock">متوفر</option>
                <option value="low-stock">منخفض</option>
                <option value="out-of-stock">نفد</option>
              </select>
            </div>
          </div>
          <div class="mt-4 flex flex-wrap gap-2">
            <button @click="generateInventoryReport"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">إنشاء التقرير</button>
            <button @click="printInventoryReport" :disabled="!inventoryReportData.length"
              class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">طباعة التقرير</button>
            <button @click="exportInventoryReport" :disabled="!inventoryReportData.length"
              class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed">تصدير إلى Excel</button>
          </div>
        </div>

        <div v-if="inventoryReportData.length" class="p-6">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">المنتج</th>
                  <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">الفئة</th>
                  <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">الوحدة</th>
                  <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">الكمية الحالية</th>
                  <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">سعر الشراء</th>
                  <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">القيمة الإجمالية</th>
                  <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="item in inventoryReportData" :key="item.id">
                  <td class="px-4 py-3 text-sm text-gray-900">{{ item.product.name }}</td>
                  <td class="px-4 py-3 text-sm text-gray-900">{{ item.product.category?.name || 'غير مصنف' }}</td>
                  <td class="px-4 py-3 text-sm text-gray-900">{{ item.unit.name }}</td>
                  <td class="px-4 py-3 text-sm text-gray-900">{{ item.currentQuantity }}</td>
                  <td class="px-4 py-3 text-sm text-gray-900">{{ item.purchasePrice.toFixed(2) }} ريال</td>
                  <td class="px-4 py-3 text-sm text-gray-900">{{ (item.currentQuantity * item.purchasePrice).toFixed(2) }} ريال</td>
                  <td class="px-4 py-3">
                    <span :class="['inline-flex px-2 py-1 text-xs font-semibold rounded-full', getStockStatusClass(item.currentQuantity)]">
                      {{ getStockStatusText(item.currentQuantity) }}
                    </span>
                  </td>
                </tr>
              </tbody>
              <tfoot class="bg-gray-50">
                <tr>
                  <td colspan="5" class="px-4 py-3 text-sm font-medium text-gray-900 text-right">إجمالي القيمة:</td>
                  <td class="px-4 py-3 text-sm font-bold text-gray-900">{{ inventoryReportTotals.totalValue.toFixed(2) }} ريال</td>
                  <td></td>
                </tr>
                <tr>
                  <td colspan="5" class="px-4 py-3 text-sm font-medium text-gray-900 text-right">إجمالي المنتجات:</td>
                  <td class="px-4 py-3 text-sm font-bold text-gray-900">{{ inventoryReportTotals.totalItems }}</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <div v-else class="p-6 text-center text-gray-500">
          لا توجد بيانات للعرض. يرجى تعديل المرشحات وإنشاء التقرير.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
const printSalesReport = () => { window.print() }
const exportSalesReport = () => { alert('سيتم التصدير إلى Excel') }
const printInventoryReport = () => { window.print() }
const exportInventoryReport = () => { alert('سيتم التصدير إلى Excel') }

const reportsStore = useReportsStore()
const {
  activeTab,
  salesFilters,
  salesReportData,
  salesReportTotals,
  inventoryFilters,
  inventoryReportData,
  inventoryReportTotals,
  customers,
  categories,
  filteredProducts
} = storeToRefs(reportsStore)

const generateSalesReport = () => reportsStore.generateSalesReport()
const generateInventoryReport = () => reportsStore.generateInventoryReport()
const getStockStatusText = (q) => reportsStore.getStockStatusText(q)
const getStockStatusClass = (q) => reportsStore.getStockStatusClass(q)
</script>
