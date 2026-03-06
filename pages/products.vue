<template>
  <div class="flex h-screen">
    <!-- List Section -->
    <div class="w-2/5 border-l border-gray-200 bg-gray-50 p-6 overflow-y-auto">
      <div class="mb-6">
        <h2 class="text-xl font-bold text-gray-900 mb-4">المنتجات</h2>

        <!-- Search and Filter -->
        <div class="flex gap-4 mb-4">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="البحث في المنتجات..."
            class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <select
            v-model="statusFilter"
            class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">جميع الحالات</option>
            <option value="active">نشط</option>
            <option value="inactive">غير نشط</option>
          </select>
        </div>

        <!-- Products List -->
        <div class="space-y-2">
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            @click="selectProduct(product)"
            :class="[
              'p-4 rounded-lg cursor-pointer transition-colors',
              selectedProduct?.id === product.id
                ? 'bg-blue-100 border-2 border-blue-500'
                : 'bg-white border border-gray-200 hover:bg-gray-50'
            ]"
          >
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-medium text-gray-900">{{ product.name }}</h3>
                <p class="text-sm text-gray-600">الباركود: {{ product.barcode }}</p>
                <p class="text-sm text-gray-600">الفئة: {{ getCategoryName(product.categoryId) }}</p>
              </div>
              <span
                :class="[
                  'px-2 py-1 text-xs rounded-full',
                  product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                ]"
              >
                {{ product.status === 'active' ? 'نشط' : 'غير نشط' }}
              </span>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div class="flex justify-between items-center mt-4">
          <button
            @click="currentPage > 1 && currentPage--"
            :disabled="currentPage === 1"
            class="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            السابق
          </button>
          <span class="text-sm text-gray-600">
            الصفحة {{ currentPage }} من {{ totalPages }}
          </span>
          <button
            @click="currentPage < totalPages && currentPage++"
            :disabled="currentPage === totalPages"
            class="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            التالي
          </button>
        </div>
      </div>
    </div>

    <!-- Content Section -->
    <div class="w-3/5 bg-white p-6 overflow-y-auto">
      <!-- Action Buttons -->
      <div class="flex gap-2 mb-6">
        <button
          @click="newProduct"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <PlusIcon class="w-5 h-5" />
          جديد
        </button>
        <button
          @click="editProduct"
          :disabled="!selectedProduct"
          class="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <PencilIcon class="w-5 h-5" />
          تعديل
        </button>
        <button
          @click="deleteProduct"
          :disabled="!selectedProduct"
          class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <TrashIcon class="w-5 h-5" />
          حذف
        </button>
      </div>

      <!-- Product Form -->
      <form v-if="showForm" @submit.prevent="saveProduct" class="space-y-6">
        <div class="grid grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">اسم المنتج</label>
            <input
              v-model="productForm.name"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">الباركود</label>
            <input
              v-model="productForm.barcode"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">الفئة</label>
            <select
              v-model="productForm.categoryId"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">اختر الفئة</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">المستودع/الفرع</label>
            <select
              v-model="productForm.warehouseId"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">اختر المستودع</option>
              <option v-for="warehouse in warehouses" :key="warehouse.id" :value="warehouse.id">
                {{ warehouse.name }}
              </option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">الحالة</label>
            <select
              v-model="productForm.status"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="active">نشط</option>
              <option value="inactive">غير نشط</option>
            </select>
          </div>
        </div>

        <!-- Units Sub-table -->
        <div class="mt-8">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium text-gray-900">وحدات القياس</h3>
            <button
              type="button"
              @click="addUnit"
              class="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-1"
            >
              <PlusIcon class="w-4 h-4" />
              إضافة وحدة
            </button>
          </div>

          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الوحدة</th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">النوع</th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">معامل التحويل</th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">سعر البيع</th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">سعر الشراء</th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">سعر التكلفة</th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الكمية الحالية</th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="(unit, index) in productForm.units" :key="index">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <select
                      v-model="unit.unitId"
                      required
                      class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">اختر الوحدة</option>
                      <option v-for="u in units" :key="u.id" :value="u.id">
                        {{ u.name }}
                      </option>
                    </select>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <select
                      v-model="unit.type"
                      required
                      class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="base">أساسية</option>
                      <option value="derived">مشتقة</option>
                    </select>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <input
                      v-model.number="unit.conversionRate"
                      type="number"
                      step="0.01"
                      required
                      class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <input
                      v-model.number="unit.salePrice"
                      type="number"
                      step="0.01"
                      required
                      class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <input
                      v-model.number="unit.purchasePrice"
                      type="number"
                      step="0.01"
                      required
                      class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <input
                      v-model.number="unit.costPrice"
                      type="number"
                      step="0.01"
                      required
                      class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <input
                      v-model.number="unit.currentQuantity"
                      type="number"
                      step="0.01"
                      required
                      class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      type="button"
                      @click="removeUnit(index)"
                      class="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon class="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="flex gap-4 pt-6">
          <button
            type="submit"
            :disabled="saving"
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ saving ? 'جاري الحفظ...' : 'حفظ' }}
          </button>
          <button
            type="button"
            @click="cancelEdit"
            class="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            إلغاء
          </button>
        </div>
      </form>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <CubeIcon class="mx-auto h-12 w-12 text-gray-400" />
        <h3 class="mt-2 text-sm font-medium text-gray-900">لا يوجد منتج محدد</h3>
        <p class="mt-1 text-sm text-gray-500">اختر منتج من القائمة أو أنشئ منتج جديد</p>
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
  CubeIcon
} from '@heroicons/vue/24/outline'

// Mock data stores
const products = ref([
  {
    id: 1,
    name: 'لابتوب ديل',
    barcode: '123456789',
    categoryId: 1,
    warehouseId: 1,
    status: 'active',
    units: [
      {
        unitId: 1,
        type: 'base',
        conversionRate: 1,
        salePrice: 5000,
        purchasePrice: 4500,
        costPrice: 4000,
        currentQuantity: 10
      }
    ]
  },
  {
    id: 2,
    name: 'ماوس لاسلكي',
    barcode: '987654321',
    categoryId: 2,
    warehouseId: 1,
    status: 'active',
    units: [
      {
        unitId: 2,
        type: 'base',
        conversionRate: 1,
        salePrice: 150,
        purchasePrice: 120,
        costPrice: 100,
        currentQuantity: 50
      }
    ]
  }
])

const categories = ref([
  { id: 1, name: 'أجهزة كمبيوتر' },
  { id: 2, name: 'ملحقات' },
  { id: 3, name: 'أثاث مكتبي' }
])

const units = ref([
  { id: 1, name: 'قطعة' },
  { id: 2, name: 'علبة' },
  { id: 3, name: 'كيلو جرام' },
  { id: 4, name: 'لتر' }
])

const warehouses = ref([
  { id: 1, name: 'المستودع الرئيسي' },
  { id: 2, name: 'فرع الشمال' }
])

// Reactive state
const selectedProduct = ref(null)
const showForm = ref(false)
const saving = ref(false)
const searchQuery = ref('')
const statusFilter = ref('all')
const currentPage = ref(1)
const itemsPerPage = ref(10)

const productForm = ref({
  id: null,
  name: '',
  barcode: '',
  categoryId: '',
  warehouseId: '',
  status: 'active',
  units: []
})

// Computed properties
const filteredProducts = computed(() => {
  let filtered = products.value

  if (searchQuery.value) {
    filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      product.barcode.includes(searchQuery.value)
    )
  }

  if (statusFilter.value !== 'all') {
    filtered = filtered.filter(product => product.status === statusFilter.value)
  }

  return filtered
})

const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / itemsPerPage.value)
})

// Methods
const selectProduct = (product) => {
  selectedProduct.value = product
  showForm.value = false
}

const newProduct = () => {
  selectedProduct.value = null
  productForm.value = {
    id: null,
    name: '',
    barcode: '',
    categoryId: '',
    warehouseId: '',
    status: 'active',
    units: []
  }
  showForm.value = true
}

const editProduct = () => {
  if (!selectedProduct.value) return

  productForm.value = {
    ...selectedProduct.value,
    units: [...selectedProduct.value.units]
  }
  showForm.value = true
}

const saveProduct = async () => {
  saving.value = true

  try {
    if (productForm.value.id) {
      // Update existing product
      const index = products.value.findIndex(p => p.id === productForm.value.id)
      if (index !== -1) {
        products.value[index] = { ...productForm.value }
      }
    } else {
      // Add new product
      const newId = Math.max(...products.value.map(p => p.id)) + 1
      products.value.push({
        ...productForm.value,
        id: newId
      })
    }

    showForm.value = false
    selectedProduct.value = null
  } catch (error) {
    console.error('Error saving product:', error)
  } finally {
    saving.value = false
  }
}

const deleteProduct = () => {
  if (!selectedProduct.value) return

  if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
    const index = products.value.findIndex(p => p.id === selectedProduct.value.id)
    if (index !== -1) {
      products.value.splice(index, 1)
      selectedProduct.value = null
      showForm.value = false
    }
  }
}

const cancelEdit = () => {
  showForm.value = false
  productForm.value = {
    id: null,
    name: '',
    barcode: '',
    categoryId: '',
    warehouseId: '',
    status: 'active',
    units: []
  }
}

const addUnit = () => {
  productForm.value.units.push({
    unitId: '',
    type: 'base',
    conversionRate: 1,
    salePrice: 0,
    purchasePrice: 0,
    costPrice: 0,
    currentQuantity: 0
  })
}

const removeUnit = (index) => {
  productForm.value.units.splice(index, 1)
}

const getCategoryName = (categoryId) => {
  const category = categories.value.find(c => c.id === categoryId)
  return category ? category.name : 'غير محدد'
}

onMounted(() => {
  // Initialize with first product selected if available
  if (products.value.length > 0) {
    selectedProduct.value = products.value[0]
  }
})
</script>