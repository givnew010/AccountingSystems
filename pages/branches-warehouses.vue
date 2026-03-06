<template>
  <div class="p-6">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900 mb-2">الفروع والمستودعات</h1>
      <p class="text-gray-600">إدارة الفروع والمستودعات للعمليات متعددة المواقع</p>
    </div>

    <!-- Tabs -->
    <div class="mb-6">
      <nav class="flex space-x-8" aria-label="Tabs">
        <button
          @click="activeTab = 'branches'"
          :class="[
            'py-2 px-1 border-b-2 font-medium text-sm',
            activeTab === 'branches'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          ]"
        >
          الفروع
        </button>
        <button
          @click="activeTab = 'warehouses'"
          :class="[
            'py-2 px-1 border-b-2 font-medium text-sm',
            activeTab === 'warehouses'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          ]"
        >
          المستودعات
        </button>
      </nav>
    </div>

    <!-- Branches Tab -->
    <div v-if="activeTab === 'branches'" class="flex h-screen">
      <!-- List Section -->
      <div class="w-2/5 border-l border-gray-200 bg-gray-50 p-6 overflow-y-auto">
        <div class="mb-6">
          <h2 class="text-xl font-bold text-gray-900 mb-4">الفروع</h2>

          <!-- Search -->
          <div class="mb-4">
            <input
              v-model="branchSearchQuery"
              type="text"
              placeholder="البحث في الفروع..."
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <!-- Branches List -->
          <div class="space-y-2">
            <div
              v-for="branch in filteredBranches"
              :key="branch.id"
              @click="selectBranch(branch)"
              :class="[
                'p-4 rounded-lg cursor-pointer transition-colors',
                selectedBranch?.id === branch.id
                  ? 'bg-blue-100 border-2 border-blue-500'
                  : 'bg-white border border-gray-200 hover:bg-gray-50'
              ]"
            >
              <div>
                <h3 class="font-medium text-gray-900">{{ branch.name }}</h3>
                <p class="text-sm text-gray-600">{{ branch.address }}</p>
                <div class="flex justify-between items-center mt-1">
                  <span class="text-xs text-gray-500">{{ branch.warehousesCount }} مستودع</span>
                  <span
                    :class="[
                      'px-2 py-1 text-xs rounded-full',
                      branch.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    ]"
                  >
                    {{ branch.status === 'active' ? 'نشط' : 'غير نشط' }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Content Section -->
      <div class="w-3/5 bg-white p-6 overflow-y-auto">
        <!-- Action Buttons -->
        <div class="flex gap-2 mb-6">
          <button
            @click="newBranch"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <PlusIcon class="w-5 h-5" />
            فرع جديد
          </button>
          <button
            @click="editBranch"
            :disabled="!selectedBranch"
            class="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <PencilIcon class="w-5 h-5" />
            تعديل
          </button>
          <button
            @click="deleteBranch"
            :disabled="!selectedBranch"
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <TrashIcon class="w-5 h-5" />
            حذف
          </button>
        </div>

        <!-- Branch Form -->
        <form v-if="showBranchForm" @submit.prevent="saveBranch" class="max-w-md space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">اسم الفرع</label>
            <input
              v-model="branchForm.name"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="أدخل اسم الفرع"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">العنوان</label>
            <textarea
              v-model="branchForm.address"
              rows="3"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="أدخل عنوان الفرع"
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">الهاتف</label>
            <input
              v-model="branchForm.phone"
              type="tel"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="أدخل رقم الهاتف"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
            <input
              v-model="branchForm.email"
              type="email"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="أدخل البريد الإلكتروني"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">الحالة</label>
            <select
              v-model="branchForm.status"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="active">نشط</option>
              <option value="inactive">غير نشط</option>
            </select>
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
              @click="cancelBranchEdit"
              class="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              إلغاء
            </button>
          </div>
        </form>

        <!-- Branch Details -->
        <div v-else-if="selectedBranch" class="max-w-md">
          <div class="bg-gray-50 rounded-lg p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">تفاصيل الفرع</h3>

            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">الاسم</label>
                <p class="mt-1 text-sm text-gray-900">{{ selectedBranch.name }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">العنوان</label>
                <p class="mt-1 text-sm text-gray-900">{{ selectedBranch.address }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">الهاتف</label>
                <p class="mt-1 text-sm text-gray-900">{{ selectedBranch.phone || 'غير محدد' }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">البريد الإلكتروني</label>
                <p class="mt-1 text-sm text-gray-900">{{ selectedBranch.email || 'غير محدد' }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">الحالة</label>
                <span
                  :class="[
                    'inline-flex px-2 py-1 text-xs rounded-full mt-1',
                    selectedBranch.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  ]"
                >
                  {{ selectedBranch.status === 'active' ? 'نشط' : 'غير نشط' }}
                </span>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">عدد المستودعات</label>
                <p class="mt-1 text-sm text-gray-900">{{ selectedBranch.warehousesCount }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Warehouses Tab -->
    <div v-if="activeTab === 'warehouses'" class="flex h-screen">
      <!-- List Section -->
      <div class="w-2/5 border-l border-gray-200 bg-gray-50 p-6 overflow-y-auto">
        <div class="mb-6">
          <h2 class="text-xl font-bold text-gray-900 mb-4">المستودعات</h2>

          <!-- Search -->
          <div class="mb-4">
            <input
              v-model="warehouseSearchQuery"
              type="text"
              placeholder="البحث في المستودعات..."
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <!-- Warehouses List -->
          <div class="space-y-2">
            <div
              v-for="warehouse in filteredWarehouses"
              :key="warehouse.id"
              @click="selectWarehouse(warehouse)"
              :class="[
                'p-4 rounded-lg cursor-pointer transition-colors',
                selectedWarehouse?.id === warehouse.id
                  ? 'bg-blue-100 border-2 border-blue-500'
                  : 'bg-white border border-gray-200 hover:bg-gray-50'
              ]"
            >
              <div>
                <h3 class="font-medium text-gray-900">{{ warehouse.name }}</h3>
                <p class="text-sm text-gray-600">{{ warehouse.branchName }}</p>
                <div class="flex justify-between items-center mt-1">
                  <span class="text-xs text-gray-500">{{ warehouse.productsCount }} منتج</span>
                  <span
                    :class="[
                      'px-2 py-1 text-xs rounded-full',
                      warehouse.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    ]"
                  >
                    {{ warehouse.status === 'active' ? 'نشط' : 'غير نشط' }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Content Section -->
      <div class="w-3/5 bg-white p-6 overflow-y-auto">
        <!-- Action Buttons -->
        <div class="flex gap-2 mb-6">
          <button
            @click="newWarehouse"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <PlusIcon class="w-5 h-5" />
            مستودع جديد
          </button>
          <button
            @click="editWarehouse"
            :disabled="!selectedWarehouse"
            class="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <PencilIcon class="w-5 h-5" />
            تعديل
          </button>
          <button
            @click="deleteWarehouse"
            :disabled="!selectedWarehouse"
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <TrashIcon class="w-5 h-5" />
            حذف
          </button>
        </div>

        <!-- Warehouse Form -->
        <form v-if="showWarehouseForm" @submit.prevent="saveWarehouse" class="max-w-md space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">اسم المستودع</label>
            <input
              v-model="warehouseForm.name"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="أدخل اسم المستودع"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">الفرع</label>
            <select
              v-model="warehouseForm.branchId"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">اختر الفرع</option>
              <option v-for="branch in branches" :key="branch.id" :value="branch.id">
                {{ branch.name }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">الموقع</label>
            <input
              v-model="warehouseForm.location"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="أدخل موقع المستودع"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">السعة (متر مربع)</label>
            <input
              v-model.number="warehouseForm.capacity"
              type="number"
              min="0"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="أدخل سعة المستودع"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">الحالة</label>
            <select
              v-model="warehouseForm.status"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="active">نشط</option>
              <option value="inactive">غير نشط</option>
            </select>
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
              @click="cancelWarehouseEdit"
              class="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              إلغاء
            </button>
          </div>
        </form>

        <!-- Warehouse Details -->
        <div v-else-if="selectedWarehouse" class="max-w-md">
          <div class="bg-gray-50 rounded-lg p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">تفاصيل المستودع</h3>

            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">الاسم</label>
                <p class="mt-1 text-sm text-gray-900">{{ selectedWarehouse.name }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">الفرع</label>
                <p class="mt-1 text-sm text-gray-900">{{ selectedWarehouse.branchName }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">الموقع</label>
                <p class="mt-1 text-sm text-gray-900">{{ selectedWarehouse.location || 'غير محدد' }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">السعة</label>
                <p class="mt-1 text-sm text-gray-900">{{ selectedWarehouse.capacity ? selectedWarehouse.capacity + ' متر مربع' : 'غير محدد' }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">الحالة</label>
                <span
                  :class="[
                    'inline-flex px-2 py-1 text-xs rounded-full mt-1',
                    selectedWarehouse.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  ]"
                >
                  {{ selectedWarehouse.status === 'active' ? 'نشط' : 'غير نشط' }}
                </span>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">عدد المنتجات</label>
                <p class="mt-1 text-sm text-gray-900">{{ selectedWarehouse.productsCount }}</p>
              </div>
            </div>
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
  TrashIcon
} from '@heroicons/vue/24/outline'

// Mock data
const branches = ref([
  {
    id: 1,
    name: 'المقر الرئيسي',
    address: 'الرياض، المملكة العربية السعودية',
    phone: '+966112345678',
    email: 'main@company.com',
    status: 'active',
    warehousesCount: 3
  },
  {
    id: 2,
    name: 'فرع جدة',
    address: 'جدة، المملكة العربية السعودية',
    phone: '+966212345678',
    email: 'jeddah@company.com',
    status: 'active',
    warehousesCount: 2
  },
  {
    id: 3,
    name: 'فرع الدمام',
    address: 'الدمام، المملكة العربية السعودية',
    phone: '+966312345678',
    email: 'dammam@company.com',
    status: 'inactive',
    warehousesCount: 0
  }
])

const warehouses = ref([
  {
    id: 1,
    name: 'المستودع الرئيسي',
    branchId: 1,
    branchName: 'المقر الرئيسي',
    location: 'المنطقة الصناعية',
    capacity: 1000,
    status: 'active',
    productsCount: 150
  },
  {
    id: 2,
    name: 'مستودع الإلكترونيات',
    branchId: 1,
    branchName: 'المقر الرئيسي',
    location: 'المبنى B',
    capacity: 500,
    status: 'active',
    productsCount: 75
  },
  {
    id: 3,
    name: 'مستودع الأثاث',
    branchId: 1,
    branchName: 'المقر الرئيسي',
    location: 'المستودع الخارجي',
    capacity: 800,
    status: 'active',
    productsCount: 45
  },
  {
    id: 4,
    name: 'مستودع جدة الرئيسي',
    branchId: 2,
    branchName: 'فرع جدة',
    location: 'المنطقة الصناعية',
    capacity: 600,
    status: 'active',
    productsCount: 90
  },
  {
    id: 5,
    name: 'مستودع جدة الفرعي',
    branchId: 2,
    branchName: 'فرع جدة',
    location: 'وسط المدينة',
    capacity: 300,
    status: 'inactive',
    productsCount: 0
  }
])

// Reactive state
const activeTab = ref('branches')
const selectedBranch = ref(null)
const selectedWarehouse = ref(null)
const showBranchForm = ref(false)
const showWarehouseForm = ref(false)
const saving = ref(false)
const branchSearchQuery = ref('')
const warehouseSearchQuery = ref('')

const branchForm = ref({
  id: null,
  name: '',
  address: '',
  phone: '',
  email: '',
  status: 'active'
})

const warehouseForm = ref({
  id: null,
  name: '',
  branchId: '',
  location: '',
  capacity: null,
  status: 'active'
})

// Computed properties
const filteredBranches = computed(() => {
  let filtered = branches.value

  if (branchSearchQuery.value) {
    filtered = filtered.filter(branch =>
      branch.name.toLowerCase().includes(branchSearchQuery.value.toLowerCase()) ||
      branch.address.toLowerCase().includes(branchSearchQuery.value.toLowerCase())
    )
  }

  return filtered
})

const filteredWarehouses = computed(() => {
  let filtered = warehouses.value

  if (warehouseSearchQuery.value) {
    filtered = filtered.filter(warehouse =>
      warehouse.name.toLowerCase().includes(warehouseSearchQuery.value.toLowerCase()) ||
      warehouse.branchName.toLowerCase().includes(warehouseSearchQuery.value.toLowerCase())
    )
  }

  return filtered
})

// Methods
const selectBranch = (branch) => {
  selectedBranch.value = branch
  showBranchForm.value = false
}

const selectWarehouse = (warehouse) => {
  selectedWarehouse.value = warehouse
  showWarehouseForm.value = false
}

const newBranch = () => {
  selectedBranch.value = null
  branchForm.value = {
    id: null,
    name: '',
    address: '',
    phone: '',
    email: '',
    status: 'active'
  }
  showBranchForm.value = true
}

const editBranch = () => {
  if (!selectedBranch.value) return

  branchForm.value = { ...selectedBranch.value }
  showBranchForm.value = true
}

const saveBranch = async () => {
  saving.value = true

  try {
    if (branchForm.value.id) {
      // Update existing branch
      const index = branches.value.findIndex(b => b.id === branchForm.value.id)
      if (index !== -1) {
        branches.value[index] = { ...branchForm.value }
      }
    } else {
      // Add new branch
      const newId = Math.max(...branches.value.map(b => b.id)) + 1
      branches.value.push({
        ...branchForm.value,
        id: newId,
        warehousesCount: 0
      })
    }

    showBranchForm.value = false
    selectedBranch.value = null
  } catch (error) {
    console.error('Error saving branch:', error)
  } finally {
    saving.value = false
  }
}

const deleteBranch = () => {
  if (!selectedBranch.value) return

  if (confirm('هل أنت متأكد من حذف هذا الفرع؟ سيتم حذف جميع المستودعات المرتبطة به.')) {
    const index = branches.value.findIndex(b => b.id === selectedBranch.value.id)
    if (index !== -1) {
      branches.value.splice(index, 1)
      selectedBranch.value = null
      showBranchForm.value = false
    }
  }
}

const cancelBranchEdit = () => {
  showBranchForm.value = false
  branchForm.value = {
    id: null,
    name: '',
    address: '',
    phone: '',
    email: '',
    status: 'active'
  }
}

const newWarehouse = () => {
  selectedWarehouse.value = null
  warehouseForm.value = {
    id: null,
    name: '',
    branchId: '',
    location: '',
    capacity: null,
    status: 'active'
  }
  showWarehouseForm.value = true
}

const editWarehouse = () => {
  if (!selectedWarehouse.value) return

  warehouseForm.value = { ...selectedWarehouse.value }
  showWarehouseForm.value = true
}

const saveWarehouse = async () => {
  saving.value = true

  try {
    const branch = branches.value.find(b => b.id === warehouseForm.value.branchId)
    const branchName = branch ? branch.name : ''

    if (warehouseForm.value.id) {
      // Update existing warehouse
      const index = warehouses.value.findIndex(w => w.id === warehouseForm.value.id)
      if (index !== -1) {
        warehouses.value[index] = {
          ...warehouseForm.value,
          branchName
        }
      }
    } else {
      // Add new warehouse
      const newId = Math.max(...warehouses.value.map(w => w.id)) + 1
      warehouses.value.push({
        ...warehouseForm.value,
        id: newId,
        branchName,
        productsCount: 0
      })
    }

    showWarehouseForm.value = false
    selectedWarehouse.value = null
  } catch (error) {
    console.error('Error saving warehouse:', error)
  } finally {
    saving.value = false
  }
}

const deleteWarehouse = () => {
  if (!selectedWarehouse.value) return

  if (confirm('هل أنت متأكد من حذف هذا المستودع؟ سيتم نقل جميع المنتجات إلى مستودع آخر.')) {
    const index = warehouses.value.findIndex(w => w.id === selectedWarehouse.value.id)
    if (index !== -1) {
      warehouses.value.splice(index, 1)
      selectedWarehouse.value = null
      showWarehouseForm.value = false
    }
  }
}

const cancelWarehouseEdit = () => {
  showWarehouseForm.value = false
  warehouseForm.value = {
    id: null,
    name: '',
    branchId: '',
    location: '',
    capacity: null,
    status: 'active'
  }
}

onMounted(() => {
  // Initialize with first items selected if available
  if (branches.value.length > 0) {
    selectedBranch.value = branches.value[0]
  }
  if (warehouses.value.length > 0) {
    selectedWarehouse.value = warehouses.value[0]
  }
})
</script>