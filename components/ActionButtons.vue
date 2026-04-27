<template>
  <div class="flex flex-wrap items-center gap-2">
    <UiButton
      v-if="isViewMode && showNew"
      @click="$emit('new')"
      variant="primary"
      size="md"
      :icon="PlusIcon"
      icon-button
      icon-label="إضافة مهمة جديدة"
      title="إضافة"
    >
      <span class="sr-only">إضافة</span>
    </UiButton>

    <!-- Edit Button -->
    <UiButton
      v-if="isViewMode && showEdit"
      @click="$emit('edit')"
      :disabled="editDisabled"
      variant="warning"
      size="md"
      :icon="PencilIcon"
      icon-button
      icon-label="تعديل المهمة المحددة"
      title="تعديل"
    >
      <span class="sr-only">تعديل</span>
    </UiButton>

    <!-- Delete Button -->
    <UiButton
      v-if="isViewMode && showDelete"
      @click="$emit('delete')"
      :disabled="deleteDisabled"
      variant="danger"
      size="md"
      :icon="TrashIcon"
      icon-button
      icon-label="حذف المهمة المحددة"
      title="حذف"
    >
      <span class="sr-only">حذف</span>
    </UiButton>

    <!-- Print Button -->
    <UiButton
      v-if="isViewMode && showPrint"
      @click="$emit('print')"
      :disabled="printDisabled"
      variant="gray"
      size="md"
      :icon="PrinterIcon"
      icon-button
      icon-label="طباعة"
      title="طباعة"
    >
      <span class="sr-only">طباعة</span>
    </UiButton>

    <!-- Post Button -->
    <UiButton
      v-if="isViewMode && showPost"
      @click="$emit('post')"
      :disabled="postDisabled"
      variant="success"
      size="md"
      :icon="ArrowUpTrayIcon"
      icon-button
      icon-label="ترحيل"
      title="ترحيل"
    >
      <span class="sr-only">ترحيل</span>
    </UiButton>

    <!-- Import Button -->
    <UiButton
      v-if="isViewMode && showImport"
      @click="$emit('import')"
      variant="secondary"
      size="md"
      :icon="ArrowDownTrayIcon"
      icon-button
      icon-label="استيراد"
      title="استيراد"
    >
      <span class="sr-only">استيراد</span>
    </UiButton>

    <!-- Save Button -->
    <UiButton
      v-if="!isViewMode && showSave"
      @click="$emit('save')"
      :disabled="saveDisabled"
      variant="primary"
      size="md"
      :icon="CheckIcon"
    >
      حفظ
    </UiButton>

    <!-- Cancel Button -->
    <UiButton
      v-if="!isViewMode && showCancel"
      @click="$emit('cancel')"
      :disabled="cancelDisabled"
      variant="gray"
      size="md"
      :icon="XMarkIcon"
    >
      إلغاء
    </UiButton>
  </div>
</template>

<script setup>
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  PrinterIcon,
  ArrowUpTrayIcon,
  ArrowDownTrayIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'

// Props
defineProps({
  isViewMode: {
    type: Boolean,
    default: true
  },
  showNew: {
    type: Boolean,
    default: true
  },
  showEdit: {
    type: Boolean,
    default: true
  },
  showDelete: {
    type: Boolean,
    default: true
  },
  showPrint: {
    type: Boolean,
    default: false
  },
  showPost: {
    type: Boolean,
    default: false
  },
  showImport: {
    type: Boolean,
    default: false
  },
  showSave: {
    type: Boolean,
    default: true
  },
  showCancel: {
    type: Boolean,
    default: true
  },
  editDisabled: {
    type: Boolean,
    default: false
  },
  deleteDisabled: {
    type: Boolean,
    default: false
  },
  printDisabled: {
    type: Boolean,
    default: false
  },
  postDisabled: {
    type: Boolean,
    default: false
  },
  saveDisabled: {
    type: Boolean,
    default: false
  },
  cancelDisabled: {
    type: Boolean,
    default: false
  }
})

// Emits
defineEmits(['new', 'edit', 'delete', 'print', 'post', 'import', 'save', 'cancel'])
</script>