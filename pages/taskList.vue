<template>
  <div class="min-h-screen bg-slate-100 p-4 md:p-6">
    <div class="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 lg:grid-cols-3">
      <section class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:col-span-2">
        <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h1 class="text-lg font-semibold text-slate-800">إدارة قوائم المهام</h1>
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
        </div>

        <div class="mb-4 grid grid-cols-1 gap-3 md:grid-cols-3">
          <div class="md:col-span-2">
            <UiLabel for-id="task-search">بحث سريع</UiLabel>
            <UiInput id="task-search" v-model="searchQuery" placeholder="ابحث بالعنوان أو الوصف..." />
          </div>
          <div>
            <UiLabel for-id="filter-status">الحالة</UiLabel>
            <UiSelect id="filter-status" v-model="statusFilter">
              <option v-for="option in statusFilterOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </UiSelect>
          </div>
          <div>
            <UiLabel for-id="filter-priority">الأولوية</UiLabel>
            <UiSelect id="filter-priority" v-model="priorityFilter">
              <option value="all">جميع الأولويات</option>
              <option value="high">مرتفعة</option>
              <option value="medium">متوسطة</option>
              <option value="low">منخفضة</option>
            </UiSelect>
          </div>
          <div>
            <UiLabel for-id="filter-due">الاستحقاق</UiLabel>
            <UiSelect id="filter-due" v-model="dueFilter">
              <option value="all">كل التواريخ</option>
              <option value="today">اليوم</option>
              <option value="week">هذا الأسبوع</option>
              <option value="overdue">متأخرة</option>
              <option value="none">بدون تاريخ</option>
            </UiSelect>
          </div>
          <div class="flex items-end">
            <UiCheckbox v-model="hideCompleted">إخفاء المهام المكتملة</UiCheckbox>
          </div>
        </div>

        <TransitionGroup name="task-card" tag="div" class="grid grid-cols-1 gap-3 md:grid-cols-2">
          <article
            v-for="task in filteredTasks"
            :key="task.id"
            class="rounded-xl border bg-white p-4 transition-all"
            :class="
              selectedItemId === task.id
                ? 'border-blue-300 ring-2 ring-blue-100'
                : 'border-slate-200 hover:border-slate-300'
            "
            @click="selectItem(task.id)"
          >
            <div class="mb-3 flex items-start justify-between gap-2">
              <UiCheckbox
                :model-value="task.status === 'completed'"
                @update:model-value="toggleCompleteFromCard(task.id)"
              />
              <div class="flex-1">
                <UiInput
                  v-if="!isViewMode && selectedItemId === task.id"
                  v-model="currentData.name"
                  placeholder="عنوان المهمة"
                  @click.stop
                />
                <h3
                  v-else
                  class="text-base font-semibold"
                  :class="task.status === 'completed' ? 'text-slate-400 line-through' : 'text-slate-800'"
                >
                  {{ task.name || 'بدون عنوان' }}
                </h3>
                <p class="mt-1 text-sm text-slate-500 line-clamp-2">
                  {{ task.description || 'لا يوجد وصف' }}
                </p>
              </div>
            </div>

            <div class="flex flex-wrap items-center gap-2">
              <UiBadge :variant="priorityBadgeVariant(task.priority)">
                {{ priorityLabel(task.priority) }}
              </UiBadge>
              <UiBadge :variant="statusBadgeVariant(task.status)">
                {{ statusLabel(task.status) }}
              </UiBadge>
              <UiBadge v-if="task.dueDate" variant="gray">الاستحقاق: {{ task.dueDate }}</UiBadge>
            </div>
          </article>
        </TransitionGroup>

        <div
          v-if="!filteredTasks.length"
          class="mt-4 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500"
        >
          لا توجد مهام مطابقة لنتائج البحث أو التصفية.
        </div>
      </section>

      <aside class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 class="mb-3 text-base font-semibold text-slate-800">تفاصيل المهمة</h2>
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
              :rows="4"
              :disabled="isViewMode"
              placeholder="اكتب تفاصيل المهمة..."
            />
          </div>
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
            <UiInput id="task-due" v-model="currentData.dueDate" type="date" :disabled="isViewMode" />
          </div>

          <div v-if="isViewMode && selectedItemId" class="flex flex-wrap items-center gap-2 border-t pt-3">
            <UiBadge :variant="priorityBadgeVariant(currentData.priority)">
              الأولوية: {{ priorityLabel(currentData.priority) }}
            </UiBadge>
            <UiBadge :variant="statusBadgeVariant(currentData.status)">
              {{ statusLabel(currentData.status) }}
            </UiBadge>
            <UiBadge v-if="currentData.createdAt" variant="gray">أنشئت في: {{ currentData.createdAt }}</UiBadge>
            <UiButton
              class="ms-auto"
              :variant="currentData.status === 'completed' ? 'gray' : 'success'"
              size="sm"
              @click="toggleComplete"
            >
              {{ currentData.status === 'completed' ? 'إعادة فتح' : 'تحديد كمكتملة' }}
            </UiButton>
          </div>
        </form>
      </aside>
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

const searchQuery = ref('')
const statusFilter = ref('all')
const priorityFilter = ref('all')
const dueFilter = ref('all')
const hideCompleted = ref(false)

const statusFilterOptions = [
  { value: 'all', label: 'جميع الحالات' },
  { value: 'pending', label: 'قيد الانتظار' },
  { value: 'in_progress', label: 'قيد التنفيذ' },
  { value: 'completed', label: 'مكتملة' }
]

const filteredTasks = computed(() => {
  const today = new Date().toISOString().slice(0, 10)
  const weekAhead = new Date()
  weekAhead.setDate(weekAhead.getDate() + 7)
  const weekAheadIso = weekAhead.toISOString().slice(0, 10)

  return tasks.value.filter((t) => {
    const taskName = (t.name || '').toLowerCase()
    const taskDescription = (t.description || '').toLowerCase()
    const query = searchQuery.value.trim().toLowerCase()
    if (query && !taskName.includes(query) && !taskDescription.includes(query)) return false
    if (statusFilter.value !== 'all' && t.status !== statusFilter.value) return false
    if (priorityFilter.value !== 'all' && t.priority !== priorityFilter.value) return false
    if (hideCompleted.value && t.status === 'completed') return false
    if (dueFilter.value === 'none' && t.dueDate) return false
    if (dueFilter.value === 'today' && t.dueDate !== today) return false
    if (dueFilter.value === 'overdue' && (!t.dueDate || t.dueDate >= today)) return false
    if (dueFilter.value === 'week' && (!t.dueDate || t.dueDate < today || t.dueDate > weekAheadIso)) return false
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

const toggleCompleteFromCard = (id) => {
  taskListStore.toggleComplete(id)
  if (selectedItemId.value !== id) {
    taskListStore.selectItem(id)
  }
}

const priorityLabel = (p) => ({ low: 'منخفضة', medium: 'متوسطة', high: 'مرتفعة' }[p] || p)
const priorityBadgeVariant = (p) => ({ low: 'gray', medium: 'yellow', high: 'red' }[p] || 'gray')

const statusLabel = (s) =>
  ({ pending: 'قيد الانتظار', in_progress: 'قيد التنفيذ', completed: 'مكتملة' }[s] || s)
const statusBadgeVariant = (s) =>
  ({ pending: 'yellow', in_progress: 'blue', completed: 'green' }[s] || 'gray')
</script>

<style scoped>
.task-card-move,
.task-card-enter-active,
.task-card-leave-active {
  transition: all 0.2s ease;
}

.task-card-enter-from,
.task-card-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

.task-card-leave-active {
  position: absolute;
}
</style>
