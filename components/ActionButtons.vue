<template>
  <div class="flex flex-wrap gap-2 mb-6">
    <!-- New Button -->
    <button
      v-if="isViewMode && showNew"
      @click="$emit('new')"
      class="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
    >
      <PlusIcon class="w-5 h-5" />
    </button>

    <!-- Edit Button -->
    <button
      v-if="isViewMode && showEdit"
      @click="$emit('edit')"
      :disabled="editDisabled"
      class="flex items-center justify-center w-10 h-10 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <PencilIcon class="w-5 h-5" />
    </button>

    <!-- Delete Button -->
    <button
      v-if="isViewMode && showDelete"
      @click="$emit('delete')"
      :disabled="deleteDisabled"
      class="flex items-center justify-center w-10 h-10 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <TrashIcon class="w-5 h-5" />
    </button>

    <!-- Print Button -->
    <button
      v-if="isViewMode && showPrint"
      @click="$emit('print')"
      :disabled="printDisabled"
      class="flex items-center justify-center w-10 h-10 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <PrinterIcon class="w-5 h-5" />
    </button>

    <!-- Post Button -->
    <button
      v-if="isViewMode && showPost"
      @click="$emit('post')"
      :disabled="postDisabled"
      class="flex items-center justify-center w-10 h-10 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <ArrowUpTrayIcon class="w-5 h-5" />
    </button>

    <!-- Import Button -->
    <button
      v-if="isViewMode && showImport"
      @click="$emit('import')"
      class="flex items-center justify-center w-10 h-10 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
    >
      <ArrowDownTrayIcon class="w-5 h-5" />
    </button>

    <!-- Save Button -->
    <button
      v-if="!isViewMode && showSave"
      @click="$emit('save')"
      :disabled="saveDisabled"
      class="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <CheckIcon class="w-5 h-5" />
      حفظ
    </button>

    <!-- Cancel Button -->
    <button
      v-if="!isViewMode && showCancel"
      @click="$emit('cancel')"
      :disabled="cancelDisabled"
      class="flex items-center justify-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <XMarkIcon class="w-5 h-5" />
      إلغاء
    </button>
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