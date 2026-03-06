<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Main Content -->
    <div class="flex flex-col lg:flex-row h-screen">
        <!-- List Section -->
        <ListSection
          title="الموردين"
          :items="suppliers"
          :columns="supplierColumns"
          search-placeholder="البحث في الموردين..."
          @item-selected="selectSupplier"
        />


        <!-- Content Section (Left side for RTL) -->
        <div class="w-full lg:w-3/5 bg-white p-6 shadow-md">
          <!-- Action Buttons -->
          <div class="flex flex-wrap gap-2 mb-6">
            <button
              @click="newSupplier"
              class="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <PlusIcon class="w-5 h-5" />
            </button>
            <button
              @click="editSupplier"
              :disabled="!selectedSupplier"
              class="flex items-center justify-center w-10 h-10 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <PencilIcon class="w-5 h-5" />
            </button>
            <button
              @click="deleteSupplier"
              :disabled="!selectedSupplier"
              class="flex items-center justify-center w-10 h-10 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <TrashIcon class="w-5 h-5" />
            </button>
            <button
              @click="printSupplier"
              :disabled="!selectedSupplier"
              class="flex items-center justify-center w-10 h-10 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <PrinterIcon class="w-5 h-5" />
            </button>
          </div>

          <!-- Supplier Form -->
          <form @submit.prevent="saveSupplier" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">الاسم</label>
              <input
                v-model="supplierForm.name"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">الهاتف</label>
              <input
                v-model="supplierForm.phone"
                type="tel"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
              <input
                v-model="supplierForm.email"
                type="email"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">العنوان</label>
              <textarea
                v-model="supplierForm.address"
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              ></textarea>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">الرصيد الافتتاحي</label>
                <input
                  v-model.number="supplierForm.openingBalance"
                  type="number"
                  step="0.01"
                  min="0"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">نوع الرصيد</label>
                <select
                  v-model="supplierForm.balanceType"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="debit">مدين</option>
                  <option value="credit">دائن</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">شروط الدفع</label>
              <select
                v-model="supplierForm.paymentTerms"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="immediate">فوري</option>
                <option value="7days">7 أيام</option>
                <option value="15days">15 يوم</option>
                <option value="30days">30 يوم</option>
                <option value="60days">60 يوم</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">الحالة</label>
              <select
                v-model="supplierForm.status"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="active">نشط</option>
                <option value="inactive">غير نشط</option>
              </select>
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

          <!-- Supplier Details -->
          <div v-if="selectedSupplier && !supplierForm.name" class="bg-gray-50 rounded-lg p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">تفاصيل المورد</h3>

            <div class="grid grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700">الاسم</label>
                <p class="mt-1 text-sm text-gray-900">{{ selectedSupplier.name }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">الهاتف</label>
                <p class="mt-1 text-sm text-gray-900">{{ selectedSupplier.phone }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">البريد الإلكتروني</label>
                <p class="mt-1 text-sm text-gray-900">{{ selectedSupplier.email || 'غير محدد' }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">شروط الدفع</label>
                <p class="mt-1 text-sm text-gray-900">
                  {{ supplierPaymentTermsText(selectedSupplier.paymentTerms) }}
                </p>
              </div>

              <div class="col-span-2">
                <label class="block text-sm font-medium text-gray-700">العنوان</label>
                <p class="mt-1 text-sm text-gray-900">{{ selectedSupplier.address || 'غير محدد' }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">الرصيد الافتتاحي</label>
                <p class="mt-1 text-sm text-gray-900">{{ selectedSupplier.openingBalance || 0 }} ريال</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">نوع الرصيد</label>
                <p class="mt-1 text-sm text-gray-900">
                  {{ selectedSupplier.balanceType === 'debit' ? 'مدين' : 'دائن' }}
                </p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">الحالة</label>
                <span
                  :class="[
                    'inline-flex px-2 py-1 text-xs rounded-full mt-1',
                    selectedSupplier.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  ]"
                >
                  {{ selectedSupplier.status === 'active' ? 'نشط' : 'غير نشط' }}
                </span>
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
  TrashIcon,
  PrinterIcon
} from '@heroicons/vue/24/outline'
import ListSection from '~/components/ListSection.vue'

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
  },
  {
    id: 3,
    name: 'شركة المواد الغذائية',
    phone: '0134567890',
    email: 'info@food-supplies.com',
    address: 'الدمام، المملكة العربية السعودية',
    openingBalance: 0,
    balanceType: 'debit',
    paymentTerms: '7days',
    status: 'inactive'
  }
])

// Reactive state
const selectedSupplier = ref(null)
const supplierForm = ref({
  name: '',
  phone: '',
  email: '',
  address: '',
  openingBalance: 0,
  balanceType: 'debit',
  paymentTerms: '30days',
  status: 'active'
})

// Column definitions for ListSection
const supplierColumns = [
  { key: 'name', label: 'الاسم' },
  { key: 'phone', label: 'الهاتف' },
  { key: 'status', label: 'الحالة' }
]

// Methods
const selectSupplier = (supplier) => {
  selectedSupplier.value = supplier
  supplierForm.value = { ...supplier }
}

const newSupplier = () => {
  selectedSupplier.value = null
  supplierForm.value = {
    name: '',
    phone: '',
    email: '',
    address: '',
    openingBalance: 0,
    balanceType: 'debit',
    paymentTerms: '30days',
    status: 'active'
  }
}

const editSupplier = () => {
  // Form is already populated from selectSupplier
}

const deleteSupplier = () => {
  if (selectedSupplier.value && confirm('هل أنت متأكد من حذف هذا المورد؟')) {
    const index = suppliers.value.findIndex(s => s.id === selectedSupplier.value.id)
    if (index > -1) {
      suppliers.value.splice(index, 1)
      selectedSupplier.value = null
      newSupplier()
    }
  }
}

const printSupplier = () => {
  // Implement print functionality
  alert('طباعة المورد - سيتم تنفيذها لاحقاً')
}

const saveSupplier = () => {
  if (selectedSupplier.value) {
    // Update existing supplier
    const index = suppliers.value.findIndex(s => s.id === selectedSupplier.value.id)
    if (index > -1) {
      suppliers.value[index] = { ...supplierForm.value, id: selectedSupplier.value.id }
    }
  } else {
    // Add new supplier
    const newId = Math.max(...suppliers.value.map(s => s.id)) + 1
    suppliers.value.push({ ...supplierForm.value, id: newId })
  }

  // Reset form
  newSupplier()
}

const cancelEdit = () => {
  newSupplier()
}

const supplierPaymentTermsText = (terms) => {
  const termsMap = {
    'immediate': 'فوري',
    '7days': '7 أيام',
    '15days': '15 يوم',
    '30days': '30 يوم',
    '60days': '60 يوم'
  }
  return termsMap[terms] || terms
}

// Initialize
onMounted(() => {
  newSupplier()
})
</script>