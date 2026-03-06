<template>
  <div class="min-h-screen bg-gray-100 overflow-hidden">
    <!-- Main Content -->
    <div class="flex flex-col lg:flex-row h-screen">
        <!-- List Section -->
        <ListSection
          title="وحدات القياس"
          :items="units"
          search-placeholder="البحث في الوحدات..."
          :disabled="!isViewMode"
          :selectedItemId="selectedItemId"
          @select-item="selectUnitById"
        />

        <!-- Content Section (Left side for RTL) -->
        <div class="w-full m-2 bg-white p-5 rounded-lg h-full overflow-hidden">
          <!-- Action Buttons -->

          <ActionButtons
            :isViewMode="isViewMode"
            :showPrint="false"
            :editDisabled="!selectedItemId"
            :deleteDisabled="!selectedItemId"
            :printDisabled="true"
            @new="newUnit"
            @edit="editUnit"
            @delete="deleteUnit"
            @save="saveUnit"
            @cancel="cancelEdit"
          />

          <!-- Unit Form -->
          <form v-if="showForm" @submit.prevent="saveUnit" class="max-w-md space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">اسم الوحدة</label>
              <input
                v-model="unitForm.name"
                type="text"
                required
                :disabled="isViewMode"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                placeholder="أدخل اسم الوحدة (مثل: قطعة، كيلو، لتر)"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">الوصف</label>
              <textarea
                v-model="unitForm.description"
                rows="3"
                :disabled="isViewMode"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                placeholder="أدخل وصف الوحدة"
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">النوع</label>
              <select
                v-model="unitForm.type"
                :disabled="isViewMode"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              >
                <option value="weight">وزن</option>
                <option value="volume">حجم</option>
                <option value="count">عدد</option>
                <option value="length">طول</option>
                <option value="area">مساحة</option>
                <option value="other">أخرى</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">الرمز</label>
              <input
                v-model="unitForm.symbol"
                type="text"
                :disabled="isViewMode"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                placeholder="أدخل رمز الوحدة (مثل: كجم، لتر، م²)"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">الحالة</label>
              <select
                v-model="unitForm.status"
                :disabled="isViewMode"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              >
                <option value="active">نشط</option>
                <option value="inactive">غير نشط</option>
              </select>
            </div>
          </form>

          <!-- Unit Details -->
          <div v-else-if="selectedUnit" class="max-w-md">
            <div class="bg-gray-50 rounded-lg p-6">
              <h3 class="text-lg font-medium text-gray-900 mb-4">تفاصيل الوحدة</h3>

              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">الاسم</label>
                  <p class="mt-1 text-sm text-gray-900">{{ selectedUnit.name }}</p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700">الرمز</label>
                  <p class="mt-1 text-sm text-gray-900">{{ selectedUnit.symbol || 'غير محدد' }}</p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700">النوع</label>
                  <p class="mt-1 text-sm text-gray-900">{{ getTypeLabel(selectedUnit.type) }}</p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700">الوصف</label>
                  <p class="mt-1 text-sm text-gray-900">{{ selectedUnit.description || 'لا يوجد وصف' }}</p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700">الحالة</label>
                  <span
                    :class="[
                      'inline-flex px-2 py-1 text-xs rounded-full mt-1',
                      selectedUnit.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    ]"
                  >
                    {{ selectedUnit.status === 'active' ? 'نشط' : 'غير نشط' }}
                  </span>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700">عدد الاستخدامات</label>
                  <p class="mt-1 text-sm text-gray-900">{{ selectedUnit.usageCount }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="text-center py-12">
            <ScaleIcon class="mx-auto h-12 w-12 text-gray-400" />
            <h3 class="mt-2 text-sm font-medium text-gray-900">لا توجد وحدة محددة</h3>
            <p class="mt-1 text-sm text-gray-500">اختر وحدة من القائمة أو أنشئ وحدة جديدة</p>
          </div>
        </div>
      </div>
    </div>
    <!-- MessageDialog for delete confirmation -->
    <MessageDialog
      v-model:show="showDeleteDialog"
      title="تأكيد الحذف"
      :message="`هل أنت متأكد من حذف الوحدة «${deleteCandidateName}»؟`"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
      confirm-text="حذف"
      cancel-text="إلغاء"
    />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { injectToast } from '~/composables/useToast'
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ScaleIcon
} from '@heroicons/vue/24/outline'

const { addToast } = injectToast()

// Mock data
const units = ref([
  {
    id: 1,
    name: 'قطعة',
    symbol: 'قطعة',
    type: 'count',
    description: 'وحدة العد للأشياء القابلة للعد',
    status: 'active',
    usageCount: 25
  },
  {
    id: 2,
    name: 'كيلو جرام',
    symbol: 'كجم',
    type: 'weight',
    description: 'وحدة قياس الوزن',
    status: 'active',
    usageCount: 15
  },
  {
    id: 3,
    name: 'لتر',
    symbol: 'لتر',
    type: 'volume',
    description: 'وحدة قياس الحجم للسوائل',
    status: 'active',
    usageCount: 8
  },
  {
    id: 4,
    name: 'متر مربع',
    symbol: 'م²',
    type: 'area',
    description: 'وحدة قياس المساحة',
    status: 'active',
    usageCount: 3
  },
  {
    id: 5,
    name: 'علبة',
    symbol: 'علبة',
    type: 'count',
    description: 'وحدة العد للعلب والحزم',
    status: 'inactive',
    usageCount: 0
  }
])

// Reactive state
const selectedItemId = ref(null)
const lastSelectedItemId = ref(null)
const isViewMode = ref(true)
const showForm = ref(false)
const saving = ref(false)
// Delete dialog state
const showDeleteDialog = ref(false)
const deleteCandidateId = ref(null)
const deleteCandidateName = ref('')

const unitForm = ref({
  id: null,
  name: '',
  symbol: '',
  type: 'count',
  description: '',
  status: 'active'
})

// Computed
const selectedUnit = computed(() => {
  return units.value.find(u => u.id === selectedItemId.value)
})

// Methods
const selectUnitById = (id) => {
  selectedItemId.value = id
  const unit = units.value.find(u => u.id === id)
  if (unit) {
    unitForm.value = { ...unit }
  } else {
    unitForm.value = {
      id: null,
      name: '',
      symbol: '',
      type: 'count',
      description: '',
      status: 'active'
    }
  }
}

const newUnit = () => {
  isViewMode.value = false
  lastSelectedItemId.value = selectedItemId.value
  selectUnitById(-1)
}

const editUnit = () => {
  if (selectedItemId.value) {
    isViewMode.value = false
    lastSelectedItemId.value = selectedItemId.value
    // Form is already populated
  }
}

const deleteUnit = () => {
  if (!selectedItemId.value) return
  const unit = units.value.find(u => u.id === selectedItemId.value)
  deleteCandidateId.value = selectedItemId.value
  deleteCandidateName.value = unit?.name ?? ''
  showDeleteDialog.value = true
}

const confirmDelete = () => {
  const id = deleteCandidateId.value
  const index = units.value.findIndex(u => u.id === id)
  if (index > -1) {
    units.value.splice(index, 1)
    // select previous item or first
    const nextId = units.value[index]?.id ?? units.value[index - 1]?.id ?? null
    selectUnitById(nextId)
    addToast('تم حذف الوحدة بنجاح', 'success')
  }
  // reset dialog state
  showDeleteDialog.value = false
  deleteCandidateId.value = null
  deleteCandidateName.value = ''
}

const cancelDelete = () => {
  showDeleteDialog.value = false
  deleteCandidateId.value = null
  deleteCandidateName.value = ''
}

const saveUnit = () => {
  if (selectedItemId.value) {
    // Update existing unit
    const index = units.value.findIndex(u => u.id === selectedItemId.value)
    if (index > -1) {
      units.value[index] = { ...unitForm.value, id: selectedItemId.value }
      isViewMode.value = true
      selectUnitById(units.value[index].id)
      addToast('تم تحديث الوحدة بنجاح', 'success')
    }
  } else {
    // Add new unit
    const newId = Math.max(...units.value.map(u => u.id)) + 1
    const newUnitData = { ...unitForm.value, id: newId, usageCount: 0 }
    units.value.push(newUnitData)
    isViewMode.value = true
    selectUnitById(newUnitData.id)
    addToast('تم إضافة الوحدة بنجاح', 'success')
  }
}

const cancelEdit = () => {
  isViewMode.value = true
  selectUnitById(lastSelectedItemId.value)
}

const getTypeLabel = (type) => {
  const typeLabels = {
    weight: 'وزن',
    volume: 'حجم',
    count: 'عدد',
    length: 'طول',
    area: 'مساحة',
    other: 'أخرى'
  }
  return typeLabels[type] || type
}

// Initialize
onMounted(() => {
  isViewMode.value = true
  selectUnitById(units.value[0]?.id ?? -1)
})
</script>