<template>
  <div ref="rootRef" class="relative" @keydown="onKeydown">
    <div
      :class="[
        'flex items-center w-full border bg-white transition-colors overflow-hidden',
        size === 'sm' ? 'rounded' : 'rounded-lg',
        disabled ? 'bg-gray-100 cursor-not-allowed' : '',
        error
          ? 'border-red-400 focus-within:ring-2 focus-within:ring-red-500 focus-within:border-transparent'
          : (isOpen && !disabled
            ? 'border-transparent ring-2 ring-blue-500'
            : 'border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent')
      ]"
      @click="onWrapperClick"
    >
      <input
        ref="inputRef"
        v-model="textValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly || !typable"
        type="text"
        autocomplete="off"
        inputmode="numeric"
        :class="[
          'flex-1 min-w-0 bg-transparent text-gray-800 focus:outline-none disabled:cursor-not-allowed',
          inputSizeClasses(size),
          (!typable && !disabled) ? 'cursor-pointer' : ''
        ]"
        @focus="onFocus"
        @click.stop="onInputClick"
        @input="onTypedInput"
        @blur="onBlur"
      />

      <button
        v-if="clearable && hasValue && !disabled && !readonly"
        type="button"
        tabindex="-1"
        :title="clearLabel"
        @mousedown.prevent="clear"
        :class="['flex items-center shrink-0 text-gray-400 hover:text-gray-600', size === 'sm' ? 'px-1' : 'px-1.5']"
      >
        <UiIcon :icon="XMarkIcon" :size="size === 'sm' ? 'xs' : 'sm'" tone="muted" decorative />
      </button>

      <button
        v-if="!disabled && !readonly"
        type="button"
        tabindex="-1"
        :title="openLabel"
        @mousedown.prevent
        @click.stop="toggle"
        :class="['flex items-center shrink-0 text-gray-400 hover:text-gray-600', size === 'sm' ? 'pl-1 pr-1.5' : 'pl-1 pr-3']"
      >
        <UiIcon :icon="CalendarDaysIcon" :size="size === 'sm' ? 'sm' : 'md'" tone="muted" decorative />
      </button>
    </div>

    <div
      v-show="isOpen"
      ref="popupRef"
      class="absolute z-30 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-3 w-72"
    >
      <!-- Header -->
      <div class="flex items-center justify-between mb-2">
        <button
          type="button"
          tabindex="-1"
          @mousedown.prevent="prevMonth"
          class="p-1 rounded hover:bg-gray-100 text-gray-600"
          :title="prevMonthLabel"
        >
          <UiIcon :icon="isRtl ? ChevronRightIcon : ChevronLeftIcon" size="sm" tone="muted" decorative />
        </button>

        <div class="flex items-center gap-1">
          <select
            v-model.number="viewMonth"
            class="text-sm font-semibold text-gray-800 bg-transparent rounded px-1 py-0.5 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
          >
            <option v-for="(m, i) in monthNames" :key="i" :value="i">{{ m }}</option>
          </select>
          <select
            v-model.number="viewYear"
            class="text-sm font-semibold text-gray-800 bg-transparent rounded px-1 py-0.5 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
          >
            <option v-for="y in yearOptions" :key="y" :value="y">{{ y }}</option>
          </select>
        </div>

        <button
          type="button"
          tabindex="-1"
          @mousedown.prevent="nextMonth"
          class="p-1 rounded hover:bg-gray-100 text-gray-600"
          :title="nextMonthLabel"
        >
          <UiIcon :icon="isRtl ? ChevronLeftIcon : ChevronRightIcon" size="sm" tone="muted" decorative />
        </button>
      </div>

      <!-- Weekday headers -->
      <div class="grid grid-cols-7 gap-1 mb-1">
        <div
          v-for="(d, i) in weekdayNames"
          :key="i"
          class="text-center text-[11px] font-medium text-gray-500 select-none py-1"
        >
          {{ d }}
        </div>
      </div>

      <!-- Days grid -->
      <div class="grid grid-cols-7 gap-1">
        <button
          v-for="(cell, i) in calendarCells"
          :key="i"
          type="button"
          tabindex="-1"
          :disabled="!cell.inMonth || cell.disabled"
          @mousedown.prevent="cell.inMonth && !cell.disabled && selectDate(cell)"
          :class="[
            'h-8 text-sm rounded transition-colors select-none',
            !cell.inMonth ? 'text-transparent pointer-events-none' : '',
            cell.disabled ? 'text-gray-300 cursor-not-allowed' : '',
            cell.inMonth && !cell.disabled && !cell.selected && !cell.today ? 'text-gray-700 hover:bg-blue-50' : '',
            cell.today && !cell.selected ? 'text-blue-600 font-semibold ring-1 ring-blue-300' : '',
            cell.selected ? 'bg-blue-600 text-white font-semibold hover:bg-blue-700' : ''
          ]"
        >
          {{ cell.day }}
        </button>
      </div>

      <!-- Footer -->
      <div class="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
        <button
          type="button"
          tabindex="-1"
          @mousedown.prevent="selectToday"
          class="text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline"
        >
          {{ todayLabel }}
        </button>
        <button
          v-if="clearable"
          type="button"
          tabindex="-1"
          @mousedown.prevent="clear"
          class="text-xs font-medium text-gray-500 hover:text-gray-700 hover:underline"
        >
          {{ clearLabel }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import {
  CalendarDaysIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'
import UiIcon from './UiIcon.vue'
import { inputSizeClasses, type UiSize } from './uiClasses'

interface Props {
  modelValue?: string | null
  placeholder?: string
  size?: UiSize
  disabled?: boolean
  readonly?: boolean
  error?: boolean
  clearable?: boolean
  typable?: boolean
  min?: string | null
  max?: string | null
  displayFormat?: 'iso' | 'dmy' | 'mdy'
  firstDayOfWeek?: number
  todayLabel?: string
  clearLabel?: string
  openLabel?: string
  prevMonthLabel?: string
  nextMonthLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  placeholder: 'YYYY-MM-DD',
  size: 'md',
  disabled: false,
  readonly: false,
  error: false,
  clearable: false,
  typable: false,
  min: null,
  max: null,
  displayFormat: 'iso',
  firstDayOfWeek: 6,
  todayLabel: 'اليوم',
  clearLabel: 'مسح',
  openLabel: 'فتح التقويم',
  prevMonthLabel: 'الشهر السابق',
  nextMonthLabel: 'الشهر التالي'
})

const emit = defineEmits<{
  'update:modelValue': [value: string | null]
  change: [value: string | null]
}>()

const rootRef = ref<HTMLElement>()
const inputRef = ref<HTMLInputElement>()
const popupRef = ref<HTMLElement>()
const isOpen = ref(false)

const isRtl = computed(() => {
  if (typeof document === 'undefined') return false
  return document.documentElement.dir === 'rtl'
})

const monthNames = [
  'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
]

const baseWeekdays = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت']
const weekdayNames = computed(() => {
  const offset = ((props.firstDayOfWeek % 7) + 7) % 7
  return [...baseWeekdays.slice(offset), ...baseWeekdays.slice(0, offset)]
})

const pad2 = (n: number) => (n < 10 ? '0' + n : '' + n)

const toIso = (d: Date) =>
  `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`

const parseIso = (s: string | null | undefined): Date | null => {
  if (!s) return null
  const m = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(s.trim())
  if (!m) return null
  const y = +m[1], mo = +m[2] - 1, da = +m[3]
  const d = new Date(y, mo, da)
  if (d.getFullYear() !== y || d.getMonth() !== mo || d.getDate() !== da) return null
  return d
}

const formatDisplay = (s: string | null | undefined) => {
  const d = parseIso(s ?? null)
  if (!d) return ''
  if (props.displayFormat === 'dmy') {
    return `${pad2(d.getDate())}/${pad2(d.getMonth() + 1)}/${d.getFullYear()}`
  }
  if (props.displayFormat === 'mdy') {
    return `${pad2(d.getMonth() + 1)}/${pad2(d.getDate())}/${d.getFullYear()}`
  }
  return toIso(d)
}

const parseTyped = (s: string): string | null => {
  const v = (s || '').trim()
  if (!v) return null
  const iso = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(v)
  if (iso) {
    const d = new Date(+iso[1], +iso[2] - 1, +iso[3])
    if (d.getFullYear() === +iso[1] && d.getMonth() === +iso[2] - 1 && d.getDate() === +iso[3]) return toIso(d)
    return null
  }
  const slash = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(v)
  if (slash) {
    const a = +slash[1], b = +slash[2], y = +slash[3]
    const dd = props.displayFormat === 'mdy' ? b : a
    const mm = props.displayFormat === 'mdy' ? a : b
    const d = new Date(y, mm - 1, dd)
    if (d.getFullYear() === y && d.getMonth() === mm - 1 && d.getDate() === dd) return toIso(d)
  }
  return null
}

const textValue = ref(formatDisplay(props.modelValue))

watch(() => props.modelValue, (v) => {
  textValue.value = formatDisplay(v)
})

const hasValue = computed(() =>
  props.modelValue !== null && props.modelValue !== undefined && props.modelValue !== ''
)

const today = new Date()
const initialView = parseIso(props.modelValue) ?? today
const viewMonth = ref(initialView.getMonth())
const viewYear = ref(initialView.getFullYear())

const yearOptions = computed(() => {
  const base = viewYear.value
  const start = base - 60
  const end = base + 20
  const arr: number[] = []
  for (let y = start; y <= end; y++) arr.push(y)
  return arr
})

const minDate = computed(() => parseIso(props.min ?? null))
const maxDate = computed(() => parseIso(props.max ?? null))

const isDateDisabled = (d: Date) => {
  if (minDate.value) {
    const a = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime()
    const b = new Date(minDate.value.getFullYear(), minDate.value.getMonth(), minDate.value.getDate()).getTime()
    if (a < b) return true
  }
  if (maxDate.value) {
    const a = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime()
    const b = new Date(maxDate.value.getFullYear(), maxDate.value.getMonth(), maxDate.value.getDate()).getTime()
    if (a > b) return true
  }
  return false
}

interface Cell {
  day: number
  date: Date
  inMonth: boolean
  today: boolean
  selected: boolean
  disabled: boolean
}

const calendarCells = computed<Cell[]>(() => {
  const first = new Date(viewYear.value, viewMonth.value, 1)
  const offset = ((props.firstDayOfWeek % 7) + 7) % 7
  const startWeekday = (first.getDay() - offset + 7) % 7
  const startDate = new Date(viewYear.value, viewMonth.value, 1 - startWeekday)
  const selected = parseIso(props.modelValue)
  const cells: Cell[] = []
  for (let i = 0; i < 42; i++) {
    const d = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i)
    const inMonth = d.getMonth() === viewMonth.value
    const isToday =
      d.getFullYear() === today.getFullYear() &&
      d.getMonth() === today.getMonth() &&
      d.getDate() === today.getDate()
    const isSelected = !!selected &&
      d.getFullYear() === selected.getFullYear() &&
      d.getMonth() === selected.getMonth() &&
      d.getDate() === selected.getDate()
    cells.push({
      day: d.getDate(),
      date: d,
      inMonth,
      today: isToday,
      selected: isSelected,
      disabled: isDateDisabled(d)
    })
  }
  return cells
})

const open = () => {
  if (props.disabled || props.readonly || isOpen.value) return
  const cur = parseIso(props.modelValue) ?? today
  viewMonth.value = cur.getMonth()
  viewYear.value = cur.getFullYear()
  isOpen.value = true
}

const close = () => {
  if (!isOpen.value) return
  isOpen.value = false
}

const toggle = () => {
  if (props.disabled || props.readonly) return
  isOpen.value ? close() : open()
}

const onWrapperClick = (e: MouseEvent) => {
  if (props.disabled || props.readonly) return
  if (e.target === inputRef.value) return
  inputRef.value?.focus()
  open()
}

const onInputClick = () => {
  if (props.disabled || props.readonly) return
  if (!props.typable) open()
}

const onFocus = () => {
  if (!props.typable) open()
}

const onTypedInput = () => {
  if (!props.typable) return
  const parsed = parseTyped(textValue.value)
  if (parsed && !isDateDisabled(parseIso(parsed)!)) {
    emit('update:modelValue', parsed)
    emit('change', parsed)
    const d = parseIso(parsed)!
    viewMonth.value = d.getMonth()
    viewYear.value = d.getFullYear()
  }
}

const onBlur = () => {
  if (!props.typable) return
  const parsed = parseTyped(textValue.value)
  if (textValue.value === '') {
    if (props.modelValue !== null && props.modelValue !== '') {
      emit('update:modelValue', null)
      emit('change', null)
    }
  } else if (!parsed) {
    textValue.value = formatDisplay(props.modelValue)
  } else {
    textValue.value = formatDisplay(parsed)
  }
}

const selectDate = (cell: Cell) => {
  const iso = toIso(cell.date)
  emit('update:modelValue', iso)
  emit('change', iso)
  textValue.value = formatDisplay(iso)
  close()
}

const selectToday = () => {
  if (isDateDisabled(today)) return
  const iso = toIso(today)
  emit('update:modelValue', iso)
  emit('change', iso)
  textValue.value = formatDisplay(iso)
  viewMonth.value = today.getMonth()
  viewYear.value = today.getFullYear()
  close()
}

const clear = () => {
  emit('update:modelValue', null)
  emit('change', null)
  textValue.value = ''
  nextTick(() => inputRef.value?.focus())
}

const prevMonth = () => {
  if (viewMonth.value === 0) {
    viewMonth.value = 11
    viewYear.value -= 1
  } else {
    viewMonth.value -= 1
  }
}

const nextMonth = () => {
  if (viewMonth.value === 11) {
    viewMonth.value = 0
    viewYear.value += 1
  } else {
    viewMonth.value += 1
  }
}

const onKeydown = (event: KeyboardEvent) => {
  if (props.disabled || props.readonly) return
  switch (event.key) {
    case 'Escape':
      if (isOpen.value) {
        event.preventDefault()
        close()
      }
      break
    case 'Tab':
      close()
      break
    case 'Enter':
      if (!isOpen.value) {
        event.preventDefault()
        open()
      }
      break
  }
}

const onDocumentMouseDown = (e: MouseEvent) => {
  if (!rootRef.value) return
  if (!rootRef.value.contains(e.target as Node)) close()
}

onMounted(() => document.addEventListener('mousedown', onDocumentMouseDown))
onBeforeUnmount(() => document.removeEventListener('mousedown', onDocumentMouseDown))
</script>
