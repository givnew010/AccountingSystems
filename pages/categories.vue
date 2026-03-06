<template>
  <div class="min-h-screen bg-gray-100 overflow-hidden">
    <!-- Main Content -->
    <div class="flex flex-col lg:flex-row h-screen">
        <!-- List Section -->
        <ListSection
          title="الفئات"
          :items="categories"
          search-placeholder="البحث في الفئات..."
          :disabled="!isViewMode"
          :selectedItemId="selectedItemId"
          @select-item="selectCategoryById"
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
            @new="newCategory"
            @edit="editCategory"
            @delete="deleteCategory"
            @save="saveCategory"
            @cancel="cancelEdit"
          />

          <!-- Category Form -->
          <form v-if="showForm" @submit.prevent="saveCategory" class="max-w-md space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">اسم الفئة</label>
              <input
                v-model="categoryForm.name"
                type="text"
                required
                :disabled="isViewMode"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                placeholder="أدخل اسم الفئة"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">الوصف</label>
              <textarea
                v-model="categoryForm.description"
                rows="3"
                :disabled="isViewMode"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                placeholder="أدخل وصف الفئة"
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">الحالة</label>
              <select
                v-model="categoryForm.status"
                :disabled="isViewMode"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              >
                <option value="active">نشط</option>
                <option value="inactive">غير نشط</option>
              </select>
            </div>
          </form>

          <!-- Category Details -->
          <div v-else-if="selectedCategory" class="max-w-md">
            <div class="bg-gray-50 rounded-lg p-6">
              <h3 class="text-lg font-medium text-gray-900 mb-4">تفاصيل الفئة</h3>

              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">الاسم</label>
                  <p class="mt-1 text-sm text-gray-900">{{ selectedCategory.name }}</p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700">الوصف</label>
                  <p class="mt-1 text-sm text-gray-900">{{ selectedCategory.description || 'لا يوجد وصف' }}</p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700">الحالة</label>
                  <span
                    :class="[
                      'inline-flex px-2 py-1 text-xs rounded-full mt-1',
                      selectedCategory.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    ]"
                  >
                    {{ selectedCategory.status === 'active' ? 'نشط' : 'غير نشط' }}
                  </span>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700">عدد المنتجات</label>
                  <p class="mt-1 text-sm text-gray-900">{{ selectedCategory.productCount }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="text-center py-12">
            <TagIcon class="mx-auto h-12 w-12 text-gray-400" />
            <h3 class="mt-2 text-sm font-medium text-gray-900">لا توجد فئة محددة</h3>
            <p class="mt-1 text-sm text-gray-500">اختر فئة من القائمة أو أنشئ فئة جديدة</p>
          </div>
        </div>
      </div>
    </div>
    <!-- MessageDialog for delete confirmation -->
    <MessageDialog
      v-model:show="showDeleteDialog"
      title="تأكيد الحذف"
      :message="`هل أنت متأكد من حذف الفئة «${deleteCandidateName}»؟`"
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
  TagIcon
} from '@heroicons/vue/24/outline'

const { addToast } = injectToast()

// Mock data
const categories = ref([
  {
    id: 1,
    name: 'أجهزة كمبيوتر',
    description: 'أجهزة الكمبيوتر واللابتوب والملحقات',
    status: 'active',
    productCount: 15
  },
  {
    id: 2,
    name: 'ملحقات',
    description: 'ملحقات الكمبيوتر والأجهزة المكتبية',
    status: 'active',
    productCount: 8
  },
  {
    id: 3,
    name: 'أثاث مكتبي',
    description: 'الأثاث والمعدات المكتبية',
    status: 'active',
    productCount: 5
  },
  {
    id: 4,
    name: 'أجهزة إلكترونية',
    description: 'الأجهزة الإلكترونية والجوالات',
    status: 'inactive',
    productCount: 0
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

const categoryForm = ref({
  id: null,
  name: '',
  description: '',
  status: 'active'
})

// Computed
const selectedCategory = computed(() => {
  return categories.value.find(c => c.id === selectedItemId.value)
})

// Methods
const selectCategoryById = (id) => {
  selectedItemId.value = id
  const category = categories.value.find(c => c.id === id)
  if (category) {
    categoryForm.value = { ...category }
  } else {
    categoryForm.value = {
      id: null,
      name: '',
      description: '',
      status: 'active'
    }
  }
}

const newCategory = () => {
  isViewMode.value = false
  lastSelectedItemId.value = selectedItemId.value
  selectCategoryById(-1)
}

const editCategory = () => {
  if (selectedItemId.value) {
    isViewMode.value = false
    lastSelectedItemId.value = selectedItemId.value
    // Form is already populated
  }
}

const deleteCategory = () => {
  if (!selectedItemId.value) return
  const category = categories.value.find(c => c.id === selectedItemId.value)
  deleteCandidateId.value = selectedItemId.value
  deleteCandidateName.value = category?.name ?? ''
  showDeleteDialog.value = true
}

const confirmDelete = () => {
  const id = deleteCandidateId.value
  const index = categories.value.findIndex(c => c.id === id)
  if (index > -1) {
    categories.value.splice(index, 1)
    // select previous item or first
    const nextId = categories.value[index]?.id ?? categories.value[index - 1]?.id ?? null
    selectCategoryById(nextId)
    addToast('تم حذف الفئة بنجاح', 'success')
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

const saveCategory = () => {
  if (selectedItemId.value) {
    // Update existing category
    const index = categories.value.findIndex(c => c.id === selectedItemId.value)
    if (index > -1) {
      categories.value[index] = { ...categoryForm.value, id: selectedItemId.value }
      isViewMode.value = true
      selectCategoryById(categories.value[index].id)
      addToast('تم تحديث الفئة بنجاح', 'success')
    }
  } else {
    // Add new category
    const newId = Math.max(...categories.value.map(c => c.id)) + 1
    const newCategoryData = { ...categoryForm.value, id: newId, productCount: 0 }
    categories.value.push(newCategoryData)
    isViewMode.value = true
    selectCategoryById(newCategoryData.id)
    addToast('تم إضافة الفئة بنجاح', 'success')
  }
}

const cancelEdit = () => {
  isViewMode.value = true
  selectCategoryById(lastSelectedItemId.value)
}

// Initialize
onMounted(() => {
  isViewMode.value = true
  selectCategoryById(categories.value[0]?.id ?? -1)
})
</script>