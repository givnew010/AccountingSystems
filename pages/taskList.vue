<template>
  <div class="min-h-screen bg-gray-100 overflow-hidden">
    <div class="flex flex-row h-screen">
      <ListSection
        title="قائمة المهام"
        :items="filteredTasks"
        search-placeholder="البحث في المهام..."
        :status-options="statusFilterOptions"
        :disabled="!isViewMode"
        :selectedItemId="selectedItemId"
        @select-item="selectItem"
      />

      <div class="flex-1 m-2 bg-white p-5 rounded-lg overflow-auto">
        <ActionButtons
          :isViewMode="isViewMode"
          :showPrint="false"
          :editDisabled="!selectedItemId"
          :deleteDisabled="!selectedItemId"
          @new="newTask"
          @edit="editTask"
          @delete="deleteTask"
          @save="saveTask"
          @cancel="cancelEdit"
        />

        <!-- شريط الفلترة الإضافية -->
        <div v-if="isViewMode" class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
          <div>
            <UiLabel for-id="filter-priority">فلترة حسب الأولوية</UiLabel>
            <UiSelect id="filter-priority" v-model="priorityFilter">
              <option value="all">جميع الأولويات</option>
              <option value="high">مرتفعة</option>
              <option value="medium">متوسطة</option>
              <option value="low">منخفضة</option>
            </UiSelect>
          </div>
          <div class="flex items-end">
            <UiCheckbox v-model="hideCompleted">إخفاء المهام المكتملة</UiCheckbox>
          </div>
        </div>

        <form @submit.prevent="saveTask" class="space-y-4">
          <div>
            <UiLabel for-id="task-name" :required="!isViewMode">عنوان المهمة</UiLabel>
            <UiInput
              id="task-name"
              v-model="currentData.name"
              :disabled="isViewMode"
              required
              placeholder="أدخل عنوان المهمة"
            />
          </div>

          <div>
            <UiLabel for-id="task-description">الوصف</UiLabel>
            <UiTextarea
              id="task-description"
              v-model="currentData.description"
              :rows="3"
              :disabled="isViewMode"
              placeholder="أدخل وصف المهمة"
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <UiLabel for-id="task-priority">الأولوية</UiLabel>
              <UiSelect id="task-priority" v-model="currentData.priority" :disabled="isViewMode">
                <option value="low">منخفضة</option>
                <option value="medium">متوسطة</option>
                <option value="high">مرتفعة</option>
              </UiSelect>
            </div>

            <div>
              <UiLabel for-id="task-status">الحالة</UiLabel>
              <UiSelect id="task-status" v-model="currentData.status" :disabled="isViewMode">
                <option value="pending">قيد الانتظار</option>
                <option value="in_progress">قيد التنفيذ</option>
                <option value="completed">مكتملة</option>
              </UiSelect>
            </div>

            <div>
              <UiLabel for-id="task-due">تاريخ الاستحقاق</UiLabel>
              <UiInput
                id="task-due"
                v-model="currentData.dueDate"
                type="date"
                :disabled="isViewMode"
              />
            </div>
          </div>

          <div v-if="isViewMode && selectedItemId" class="flex flex-wrap items-center gap-2 pt-2">
            <UiBadge :variant="priorityBadgeVariant(currentData.priority)">
              الأولوية: {{ priorityLabel(currentData.priority) }}
            </UiBadge>
            <UiBadge :variant="statusBadgeVariant(currentData.status)">
              {{ statusLabel(currentData.status) }}
            </UiBadge>
            <UiBadge variant="gray" v-if="currentData.createdAt">
              أنشئت في: {{ currentData.createdAt }}
            </UiBadge>

            <div class="ms-auto">
              <UiButton
                :variant="currentData.status === 'completed' ? 'gray' : 'success'"
                size="sm"
                @click="toggleComplete"
              >
                {{ currentData.status === 'completed' ? 'إعادة فتح' : 'تحديد كمكتملة' }}
              </UiButton>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, inject, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { injectToast } from '~/composables/useToast'
import { useTaskListStore } from '~/stores/taskList'

const taskListStore = useTaskListStore()
const { tasks, selectedItemId, isViewMode, currentData } = storeToRefs(taskListStore)
const { addToast } = injectToast()
const showMessage = inject('showMessage')

const priorityFilter = ref('all')
const hideCompleted = ref(false)

const statusFilterOptions = [
  { value: 'all', label: 'جميع الحالات' },
  { value: 'pending', label: 'قيد الانتظار' },
  { value: 'in_progress', label: 'قيد التنفيذ' },
  { value: 'completed', label: 'مكتملة' }
]

const filteredTasks = computed(() => {
  return tasks.value.filter((t) => {
    if (priorityFilter.value !== 'all' && t.priority !== priorityFilter.value) return false
    if (hideCompleted.value && t.status === 'completed') return false
    return true
  })
})

onMounted(() => {
  taskListStore.init()
})

const newTask = () => taskListStore.newTask()
const editTask = () => taskListStore.editTask()
const cancelEdit = () => taskListStore.cancelEdit()

const saveTask = () => {
  if (!currentData.value.name?.trim()) {
    addToast('يجب إدخال عنوان المهمة', 'error')
    return
  }
  const res = taskListStore.saveTask()
  addToast(res.type === 'updated' ? 'تم تحديث المهمة بنجاح' : 'تم إضافة المهمة بنجاح', 'success')
}

const deleteTask = () => {
  if (!selectedItemId.value) return
  showMessage({
    title: 'تأكيد الحذف',
    message: `هل أنت متأكد أنك تريد حذف هذه المهمة${currentData.value.name ? ` (${currentData.value.name})` : ''} ؟`,
    cancelText: 'إلغاء',
    confirmText: 'حذف',
    onCancel: () => {},
    onConfirm: confirmDelete
  })
}

const confirmDelete = () => {
  const ok = taskListStore.confirmDeleteSelected()
  if (ok) addToast('تم حذف المهمة بنجاح', 'success')
}

const selectItem = (id) => taskListStore.selectItem(id)

const toggleComplete = () => {
  if (!selectedItemId.value) return
  taskListStore.toggleComplete(selectedItemId.value)
  addToast(
    currentData.value.status === 'completed'
      ? 'تم تحديد المهمة كمكتملة'
      : 'تمت إعادة فتح المهمة',
    'success'
  )
}

const priorityLabel = (p) => ({ low: 'منخفضة', medium: 'متوسطة', high: 'مرتفعة' }[p] || p)
const priorityBadgeVariant = (p) => ({ low: 'gray', medium: 'yellow', high: 'red' }[p] || 'gray')

const statusLabel = (s) =>
  ({ pending: 'قيد الانتظار', in_progress: 'قيد التنفيذ', completed: 'مكتملة' }[s] || s)
const statusBadgeVariant = (s) =>
  ({ pending: 'yellow', in_progress: 'blue', completed: 'green' }[s] || 'gray')
</script>
