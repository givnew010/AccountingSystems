<template>
  <div class="border border-gray-200 rounded-lg overflow-hidden">
    <!-- Table Header Title -->
    <div v-if="title" class="px-3 py-2 border-b border-gray-200 bg-gray-50">
      <h3 class="text-sm font-semibold text-gray-800">{{ title }}</h3>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-50 border-b border-gray-200">
            <!-- Row Number Column -->
            <th class="w-8 px-2 py-1.5 text-center text-xs font-semibold text-gray-500 border-l border-gray-200">
              #
            </th>

            <!-- Dynamic Columns -->
            <th
              v-for="col in columns"
              :key="col.field"
              :style="col.width ? { width: col.width } : {}"
              class="px-2 py-1.5 text-right text-xs font-semibold text-gray-600 border-l border-gray-200 last:border-l-0"
            >
              {{ col.label }}
            </th>

            <!-- Delete Column -->
            <th
              v-if="showDelete && !isViewMode"
              class="w-8 px-1 py-1.5 text-center text-xs font-semibold text-gray-500"
            >
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(row, rowIndex) in rows"
            :key="rowIndex"
            :class="[
              'border-b border-gray-100 last:border-b-0',
              rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50/40',
              'hover:bg-blue-50/30 transition-colors duration-100'
            ]"
          >
            <!-- Row Number -->
            <td class="px-2 py-1 text-center text-xs font-medium text-gray-400 border-l border-gray-100 select-none">
              {{ rowIndex + 1 }}
            </td>

            <!-- Dynamic Cells -->
            <td
              v-for="col in columns"
              :key="col.field"
              class="px-1.5 py-1 border-l border-gray-100 last:border-l-0"
            >
              <!-- View Mode: display text -->
              <template v-if="isViewMode">
                <span class="block px-1.5 py-0.5 text-sm text-gray-800">
                  {{ getDisplayValue(row, col) }}
                </span>
              </template>

              <!-- Edit Mode: Input -->
              <template v-else-if="col.type === 'input'">
                <input
                  v-model="row[col.field]"
                  :type="col.inputType || 'text'"
                  :step="col.step || undefined"
                  :min="col.min !== undefined ? col.min : undefined"
                  :max="col.max !== undefined ? col.max : undefined"
                  :placeholder="col.placeholder || ''"
                  :readonly="col.readonly"
                  :class="[
                    'w-full px-2 py-0.5 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-colors',
                    col.readonly
                      ? 'bg-gray-50 border-gray-200 text-gray-600 cursor-default'
                      : 'bg-white border-gray-300 text-gray-800',
                    col.align === 'center' ? 'text-center' : col.align === 'left' ? 'text-left' : ''
                  ]"
                  @input="onFieldChange(rowIndex, col)"
                  @change="onFieldChange(rowIndex, col)"
                />
              </template>

              <!-- Edit Mode: Select / Dropdown -->
              <template v-else-if="col.type === 'select'">
                <select
                  v-model="row[col.field]"
                  :class="[
                    'w-full px-2 py-0.5 text-sm border border-gray-300 rounded bg-white text-gray-800',
                    'focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-colors',
                    'appearance-none cursor-pointer'
                  ]"
                  @change="onFieldChange(rowIndex, col)"
                >
                  <option v-if="col.placeholder" value="">{{ col.placeholder }}</option>
                  <option
                    v-for="opt in col.options"
                    :key="opt.value"
                    :value="opt.value"
                  >
                    {{ opt.label }}
                  </option>
                </select>
              </template>

              <!-- Edit Mode: ComboBox -->
              <template v-else-if="col.type === 'combobox'">
                <ComboBox
                  v-model="row[col.field]"
                  :options="col.options || []"
                  :placeholder="col.placeholder || ''"
                  :disabled="false"
                  :searchable="col.searchable !== false"
                  size="sm"
                  @update:modelValue="onFieldChange(rowIndex, col)"
                />
              </template>

              <!-- Edit Mode: Checkbox -->
              <template v-else-if="col.type === 'checkbox'">
                <div class="flex justify-center">
                  <input
                    type="checkbox"
                    v-model="row[col.field]"
                    class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-400 cursor-pointer"
                    @change="onFieldChange(rowIndex, col)"
                  />
                </div>
              </template>

              <!-- Edit Mode: Textarea -->
              <template v-else-if="col.type === 'textarea'">
                <textarea
                  v-model="row[col.field]"
                  :placeholder="col.placeholder || ''"
                  rows="1"
                  :class="[
                    'w-full px-2 py-0.5 text-sm border border-gray-300 rounded bg-white text-gray-800',
                    'focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-colors resize-none'
                  ]"
                  @input="onFieldChange(rowIndex, col)"
                />
              </template>

              <!-- Display-only (no edit) -->
              <template v-else-if="col.type === 'display'">
                <span
                  :class="[
                    'block px-1.5 py-0.5 text-sm',
                    col.bold ? 'font-semibold text-gray-900' : 'text-gray-700',
                    col.align === 'center' ? 'text-center' : col.align === 'left' ? 'text-left' : ''
                  ]"
                >
                  {{ col.format ? col.format(row[col.field], row) : row[col.field] }}
                </span>
              </template>
            </td>

            <!-- Delete Cell -->
            <td
              v-if="showDelete && !isViewMode"
              class="px-1 py-1 text-center"
            >
              <button
                type="button"
                @click="removeRow(rowIndex)"
                :disabled="rows.length === 1"
                :class="[
                  'inline-flex items-center justify-center w-6 h-6 rounded transition-colors',
                  rows.length === 1
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-red-400 hover:text-red-600 hover:bg-red-50'
                ]"
                title="حذف الصف"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"></path>
                  <path d="M10 11v6"></path>
                  <path d="M14 11v6"></path>
                  <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"></path>
                </svg>
              </button>
            </td>
          </tr>

          <!-- Empty State -->
          <tr v-if="rows.length === 0">
            <td
              :colspan="totalCols"
              class="px-3 py-6 text-center text-sm text-gray-400"
            >
              {{ emptyText || 'لا توجد بيانات' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'

const props = defineProps({
  /**
   * Array of row objects (v-model)
   */
  modelValue: {
    type: Array,
    default: () => []
  },
  /**
   * Column definitions:
   * [
   *   {
   *     field: 'name',          // key in row object
   *     label: 'الاسم',         // column header
   *     type: 'input',          // 'input' | 'select' | 'combobox' | 'checkbox' | 'textarea' | 'display'
   *     inputType: 'text',      // for input: 'text' | 'number' | 'date' etc.
   *     options: [],            // for select/combobox: [{ label, value }]
   *     placeholder: '',        // placeholder text
   *     trigger: true,          // if true, changing this field in last empty row adds new row
   *     width: '120px',         // optional column width
   *     readonly: false,        // for input type
   *     step: '0.01',           // for number inputs
   *     min: 0, max: 999,       // for number inputs
   *     bold: false,            // for display type
   *     align: 'right',         // 'right' | 'center' | 'left'
   *     format: (val, row) => val,  // formatter for display type
   *     searchable: true,       // for combobox
   *   }
   * ]
   */
  columns: {
    type: Array,
    required: true
  },
  /**
   * View/Edit/New mode. When true = view mode (no editing)
   */
  isViewMode: {
    type: Boolean,
    default: false
  },
  /**
   * Show delete column (optional)
   */
  showDelete: {
    type: Boolean,
    default: true
  },
  /**
   * Title shown above the table
   */
  title: {
    type: String,
    default: ''
  },
  /**
   * Text shown when table is empty
   */
  emptyText: {
    type: String,
    default: 'لا توجد بيانات'
  }
})

const emit = defineEmits(['update:modelValue'])

// Internal rows copy
const rows = ref([])

// Build an empty row from columns definition
const buildEmptyRow = () => {
  const row = {}
  props.columns.forEach(col => {
    if (col.default !== undefined) {
      row[col.field] = col.default
    } else if (col.type === 'checkbox') {
      row[col.field] = false
    } else if (col.type === 'input' && col.inputType === 'number') {
      row[col.field] = null
    } else {
      row[col.field] = ''
    }
  })
  return row
}

// Initialize rows from modelValue
const initRows = (val) => {
  if (!val || val.length === 0) {
    rows.value = !props.isViewMode ? [buildEmptyRow()] : []
  } else {
    rows.value = val.map(r => ({ ...r }))
    // In edit/new mode: ensure there's always an empty trailing row
    if (!props.isViewMode) {
      const last = rows.value[rows.value.length - 1]
      if (!isRowEmpty(last)) {
        rows.value.push(buildEmptyRow())
      }
    }
  }
}

watch(
  () => props.modelValue,
  (val) => { initRows(val) },
  { immediate: true, deep: true }
)

watch(
  () => props.isViewMode,
  (viewMode) => {
    if (!viewMode) {
      // Switched to edit mode: ensure there's a trailing empty row
      if (rows.value.length === 0) {
        rows.value = [buildEmptyRow()]
      } else {
        const last = rows.value[rows.value.length - 1]
        if (!isRowEmpty(last)) {
          rows.value.push(buildEmptyRow())
        }
      }
    } else {
      // Switched to view mode: remove trailing empty rows
      while (rows.value.length > 0 && isRowEmpty(rows.value[rows.value.length - 1])) {
        rows.value.pop()
      }
    }
  }
)

// Emit changes upward
const emitUpdate = () => {
  // Filter out the last empty row for the value
  const dataRows = getDataRows()
  emit('update:modelValue', dataRows)
}

// Returns rows excluding the last empty row (if it's a placeholder)
const getDataRows = () => {
  if (rows.value.length === 0) return []
  const lastRow = rows.value[rows.value.length - 1]
  if (isRowEmpty(lastRow)) {
    return rows.value.slice(0, -1).map(r => ({ ...r }))
  }
  return rows.value.map(r => ({ ...r }))
}

// Check if a row is completely empty (only trigger fields considered)
const isRowEmpty = (row) => {
  const triggerCols = props.columns.filter(c => c.trigger)
  const checkCols = triggerCols.length > 0 ? triggerCols : props.columns.filter(c => c.type !== 'display')
  return checkCols.every(col => {
    const val = row[col.field]
    return val === '' || val === null || val === undefined || val === false
  })
}

// Check if a row has any value in trigger fields
const hasTriggerValue = (row) => {
  const triggerCols = props.columns.filter(c => c.trigger)
  if (triggerCols.length === 0) return false
  return triggerCols.some(col => {
    const val = row[col.field]
    return val !== '' && val !== null && val !== undefined && val !== false
  })
}

// Handle field change
const onFieldChange = (rowIndex, col) => {
  const isLastRow = rowIndex === rows.value.length - 1

  if (!props.isViewMode && col.trigger && isLastRow) {
    const row = rows.value[rowIndex]
    if (hasTriggerValue(row)) {
      nextTick(() => {
        rows.value.push(buildEmptyRow())
      })
    }
  }

  nextTick(() => { emitUpdate() })
}

// Remove row by index
const removeRow = (index) => {
  if (rows.value.length <= 1) return
  rows.value.splice(index, 1)

  // Always keep at least one empty row at the end in edit mode
  const lastRow = rows.value[rows.value.length - 1]
  if (!isRowEmpty(lastRow) && !props.isViewMode) {
    rows.value.push(buildEmptyRow())
  }

  emitUpdate()
}

// Get display value for view mode
const getDisplayValue = (row, col) => {
  const val = row[col.field]
  if (col.format) return col.format(val, row)
  if (col.type === 'select' || col.type === 'combobox') {
    const option = (col.options || []).find(o => o.value === val)
    return option ? option.label : (val || '')
  }
  if (col.type === 'checkbox') return val ? 'نعم' : 'لا'
  return val !== null && val !== undefined ? val : ''
}

// Total columns count for empty state colspan
const totalCols = computed(() => {
  let count = 1 + props.columns.length // # + columns
  if (props.showDelete && !props.isViewMode) count++
  return count
})

// Expose addRow for external use
const addRow = () => {
  if (!props.isViewMode) {
    const lastRow = rows.value[rows.value.length - 1]
    if (!isRowEmpty(lastRow)) {
      rows.value.push(buildEmptyRow())
    }
  }
}

defineExpose({ addRow })
</script>
