<template>
  <div class="p-6">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900 mb-2">استيراد البيانات</h1>
      <p class="text-gray-600">استيراد البيانات بالجملة من ملفات CSV أو Excel</p>
    </div>

    <!-- Import Options -->
    <div class="bg-white rounded-lg shadow p-6 mb-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">اختيار نوع البيانات</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          v-for="option in importOptions"
          :key="option.type"
          @click="selectImportType(option)"
          :class="[
            'p-4 border-2 rounded-lg text-center transition-colors',
            selectedType === option.type
              ? 'border-blue-500 bg-blue-50 text-blue-700'
              : 'border-gray-200 hover:border-gray-300 text-gray-700'
          ]"
        >
          <component :is="option.icon" class="w-8 h-8 mx-auto mb-2" />
          <div class="font-medium">{{ option.title }}</div>
          <div class="text-sm text-gray-500">{{ option.description }}</div>
        </button>
      </div>
    </div>

    <!-- File Upload Section -->
    <div v-if="selectedType" class="bg-white rounded-lg shadow p-6 mb-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">تحميل الملف</h2>

      <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <DocumentArrowUpIcon class="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <div class="mb-4">
          <label for="file-upload" class="cursor-pointer">
            <span class="text-blue-600 hover:text-blue-500 font-medium">اختر ملف</span>
            <span class="text-gray-500"> أو اسحب وأفلت هنا</span>
          </label>
          <input
            id="file-upload"
            type="file"
            class="hidden"
            accept=".csv,.xlsx,.xls"
            @change="handleFileSelect"
          />
        </div>
        <p class="text-sm text-gray-500">
          دعم ملفات CSV و Excel (xlsx, xls) - الحد الأقصى 10MB
        </p>
        <p v-if="selectedFile" class="mt-2 text-sm text-green-600">
          تم اختيار الملف: {{ selectedFile.name }}
        </p>
      </div>

      <div v-if="selectedFile" class="mt-6">
        <button
          @click="processFile"
          :disabled="processing"
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ processing ? 'جاري المعالجة...' : 'معالجة الملف' }}
        </button>
      </div>
    </div>

    <!-- Column Mapping Section -->
    <div v-if="showMapping" class="bg-white rounded-lg shadow p-6 mb-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">ربط الأعمدة</h2>

      <div class="mb-4">
        <p class="text-sm text-gray-600 mb-4">
          ربط أعمدة الملف بالحقول في النظام. الأعمدة المطلوبة: {{ requiredFields.join(', ') }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="(field) in mappingFields" :key="field.key">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            {{ field.label }}
            <span v-if="field.required" class="text-red-500">*</span>
          </label>
          <select
            v-model="columnMapping[field.key]"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">-- اختر العمود --</option>
            <option v-for="column in fileColumns" :key="column" :value="column">
              {{ column }}
            </option>
          </select>
        </div>
      </div>

      <div class="mt-6 flex gap-4">
        <button
          @click="importData"
          :disabled="importing || !isMappingValid"
          class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ importing ? 'جاري الاستيراد...' : 'استيراد البيانات' }}
        </button>
        <button
          @click="cancelImport"
          class="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        >
          إلغاء
        </button>
      </div>
    </div>

    <!-- Import Results -->
    <div v-if="importResults" class="bg-white rounded-lg shadow p-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">نتائج الاستيراد</h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div class="bg-green-50 p-4 rounded-lg">
          <div class="text-2xl font-bold text-green-600">{{ importResults.success }}</div>
          <div class="text-sm text-green-800">تم الاستيراد بنجاح</div>
        </div>
        <div class="bg-red-50 p-4 rounded-lg">
          <div class="text-2xl font-bold text-red-600">{{ importResults.errors }}</div>
          <div class="text-sm text-red-800">أخطاء</div>
        </div>
        <div class="bg-yellow-50 p-4 rounded-lg">
          <div class="text-2xl font-bold text-yellow-600">{{ importResults.warnings }}</div>
          <div class="text-sm text-yellow-800">تحذيرات</div>
        </div>
      </div>

      <div v-if="importResults.errorDetails.length > 0" class="mb-4">
        <h3 class="font-medium text-red-800 mb-2">تفاصيل الأخطاء:</h3>
        <div class="bg-red-50 p-4 rounded-lg max-h-40 overflow-y-auto">
          <div v-for="(error, index) in importResults.errorDetails" :key="index" class="text-sm text-red-700 mb-1">
            الصف {{ error.row }}: {{ error.message }}
          </div>
        </div>
      </div>

      <div class="flex gap-4">
        <button
          @click="downloadErrors"
          v-if="importResults.errors > 0"
          class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          تحميل تقرير الأخطاء
        </button>
        <button
          @click="resetImport"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          استيراد جديد
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  UsersIcon,
  CubeIcon,
  TagIcon,
  DocumentArrowUpIcon
} from '@heroicons/vue/24/outline'

const importOptions = ref([
  {
    type: 'customers',
    title: 'العملاء',
    description: 'استيراد بيانات العملاء',
    icon: UsersIcon,
    requiredFields: ['name', 'phone'],
    mappingFields: [
      { key: 'name', label: 'الاسم', required: true },
      { key: 'phone', label: 'الهاتف', required: true },
      { key: 'email', label: 'البريد الإلكتروني', required: false },
      { key: 'address', label: 'العنوان', required: false },
      { key: 'openingBalance', label: 'الرصيد الافتتاحي', required: false },
      { key: 'balanceType', label: 'نوع الرصيد', required: false }
    ]
  },
  {
    type: 'products',
    title: 'المنتجات',
    description: 'استيراد بيانات المنتجات',
    icon: CubeIcon,
    requiredFields: ['name', 'categoryId'],
    mappingFields: [
      { key: 'name', label: 'اسم المنتج', required: true },
      { key: 'barcode', label: 'الباركود', required: false },
      { key: 'categoryId', label: 'معرف الفئة', required: true },
      { key: 'warehouseId', label: 'معرف المستودع', required: false },
      { key: 'salePrice', label: 'سعر البيع', required: false },
      { key: 'purchasePrice', label: 'سعر الشراء', required: false },
      { key: 'costPrice', label: 'سعر التكلفة', required: false },
      { key: 'currentQuantity', label: 'الكمية الحالية', required: false }
    ]
  },
  {
    type: 'categories',
    title: 'الفئات',
    description: 'استيراد بيانات الفئات',
    icon: TagIcon,
    requiredFields: ['name'],
    mappingFields: [
      { key: 'name', label: 'اسم الفئة', required: true },
      { key: 'description', label: 'الوصف', required: false }
    ]
  }
])

const selectedType = ref('')
const selectedFile = ref(null)
const processing = ref(false)
const showMapping = ref(false)
const fileColumns = ref([])
const columnMapping = ref({})
const importing = ref(false)
const importResults = ref(null)

const currentOption = computed(() => {
  return importOptions.value.find(option => option.type === selectedType.value)
})

const mappingFields = computed(() => {
  return currentOption.value?.mappingFields || []
})

const isMappingValid = computed(() => {
  if (!currentOption.value) return false

  // Check if all required fields are mapped
  return currentOption.value.requiredFields.every(field =>
    columnMapping.value[field] && columnMapping.value[field] !== ''
  )
})

const selectImportType = (option) => {
  selectedType.value = option.type
  resetImport()
}

const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file) {
    selectedFile.value = file
  }
}

const processFile = async () => {
  if (!selectedFile.value) return

  processing.value = true

  try {
    // Simulate file processing
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Mock column detection based on file type
    if (selectedType.value === 'customers') {
      fileColumns.value = ['الاسم', 'الهاتف', 'البريد الإلكتروني', 'العنوان', 'الرصيد الافتتاحي', 'نوع الرصيد']
    } else if (selectedType.value === 'products') {
      fileColumns.value = ['اسم المنتج', 'الباركود', 'معرف الفئة', 'معرف المستودع', 'سعر البيع', 'سعر الشراء', 'سعر التكلفة', 'الكمية الحالية']
    } else if (selectedType.value === 'categories') {
      fileColumns.value = ['اسم الفئة', 'الوصف']
    }

    // Initialize mapping
    columnMapping.value = {}
    mappingFields.value.forEach(field => {
      columnMapping.value[field.key] = ''
    })

    showMapping.value = true
  } catch (error) {
    console.error('Error processing file:', error)
    alert('حدث خطأ في معالجة الملف')
  } finally {
    processing.value = false
  }
}

const importData = async () => {
  if (!isMappingValid.value) return

  importing.value = true

  try {
    // Simulate import process
    await new Promise(resolve => setTimeout(resolve, 3000))

    // Mock import results
    importResults.value = {
      success: 85,
      errors: 5,
      warnings: 3,
      errorDetails: [
        { row: 12, message: 'رقم الهاتف غير صحيح' },
        { row: 25, message: 'البريد الإلكتروني مكرر' },
        { row: 67, message: 'الاسم مطلوب' },
        { row: 89, message: 'معرف الفئة غير موجود' },
        { row: 102, message: 'سعر البيع يجب أن يكون رقماً' }
      ]
    }
  } catch (error) {
    console.error('Error importing data:', error)
    alert('حدث خطأ في استيراد البيانات')
  } finally {
    importing.value = false
  }
}

const cancelImport = () => {
  resetImport()
}

const resetImport = () => {
  selectedFile.value = null
  showMapping.value = false
  fileColumns.value = []
  columnMapping.value = {}
  importResults.value = null
  processing.value = false
  importing.value = false
}

const downloadErrors = () => {
  // Mock download functionality
  alert('سيتم تحميل تقرير الأخطاء')
}
</script>