<template>
  <div ref="rootRef" class="relative" @keydown="onKeydown">
    <div :class="[
      'flex items-center w-full border rounded-lg transition-colors overflow-hidden',
      disabled ? 'bg-gray-100' : 'bg-white',
      isOpen && !disabled
        ? 'border-transparent ring-2 ring-blue-500'
        : 'border-gray-300'
    ]" @click="onWrapperClick">
      <input v-model="searchQuery" :placeholder="displayPlaceholder" :disabled="disabled" :readonly="!searchable"
        type="text" autocomplete="off" @focus="open" @click.stop="open" @input="onInput" :class="[
          'flex-1 min-w-0 bg-transparent focus:outline-none disabled:cursor-not-allowed',
          size === 'sm' ? 'px-2 py-0.5 text-sm' : 'px-3 py-2',
          !searchable && !disabled ? 'cursor-pointer' : ''
        ]" />

      <!-- Button Clear -->
      <UiButton v-if="clearable && hasValue && !disabled" type="button" tabindex="-1" @mousedown.prevent="clear"
        :variant="'secondary'" :iconButton="true" iconButtonStyle="plain" :icon="XMarkIcon" :size="size" title="مسح" />
      <!-- :class="size === 'sm' ? 'px-1' : 'px-1.5'" -->
      <!-- Button Dropdown -->
      <UiButton v-if="!disabled" type="button" tabindex="-1" @mousedown.prevent @click.stop="toggle" :iconButton="true"
        iconButtonStyle="plain" :icon="ChevronDownIcon" :size="size" :class="[
          size === 'sm' ? 'pl-1 pr-1.5' : 'pl-1 pr-[-2px]',
          'transition-transform',
          isOpen ? 'rotate-180' : ''
        ]" :aria-expanded="isOpen" aria-haspopup="listbox" />
      <!-- size === 'sm' ? 'pl-1 pr-1.5' : 'pl-1 pr-1', -->
    </div>

    <ul v-show="isOpen" ref="listRef"
      class="absolute z-20 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto mt-1">
      <li v-if="!filteredOptions.length" class="px-3 py-2 text-sm text-gray-500 text-center select-none">
        {{ noResultsText }}
      </li>
      <li v-for="(option, index) in filteredOptions" :key="option.value" :data-index="index"
        @mousedown.prevent="selectOption(option)" @mousemove="highlightedIndex = index" :class="[
          'px-3 py-2 cursor-pointer flex items-center justify-between',
          size === 'sm' ? 'text-sm' : '',
          highlightedIndex === index ? 'bg-blue-100' : 'hover:bg-blue-50',
          isSelected(option) ? 'font-semibold text-blue-700' : 'text-gray-800'
        ]">
        <span>{{ option.label }}</span>
        <svg v-if="isSelected(option)" class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor"
          viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import UiButton from './ui/UiButton.vue'
import { XMarkIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'
import { baseFieldClasses, inputSizeClasses, type UiSize } from './ui/uiClasses'

interface Option {
  label: string
  value: any
}

interface Props {
  modelValue?: any
  options: Option[]
  placeholder?: string
  disabled?: boolean
  searchable?: boolean
  clearable?: boolean
  size?: 'sm' | 'md'
  noResultsText?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'اختر...',
  disabled: false,
  searchable: true,
  clearable: false,
  size: 'md',
  noResultsText: 'لا توجد نتائج'
})

const emit = defineEmits<{
  'update:modelValue': [value: any]
  'change': [value: any]
}>()

const rootRef = ref<HTMLElement | null>(null)
const listRef = ref<HTMLElement>()
const getInputEl = () => rootRef.value?.querySelector('input') as HTMLInputElement | null
// listRef is declared here to keep grouping with refs
const searchQuery = ref('')
const isOpen = ref(false)
const highlightedIndex = ref(-1)
const isSearching = ref(false)

const selectedOption = computed(() =>
  props.options.find(o => o.value === props.modelValue)
)

const hasValue = computed(() =>
  props.modelValue !== null &&
  props.modelValue !== undefined &&
  props.modelValue !== ''
)

const displayPlaceholder = computed(() =>
  selectedOption.value ? selectedOption.value.label : props.placeholder
)

const filteredOptions = computed(() => {
  if (!props.searchable || !isSearching.value || !searchQuery.value) {
    return props.options
  }
  const q = searchQuery.value.toLowerCase()
  return props.options.filter(o => o.label.toLowerCase().includes(q))
})

const isSelected = (option: Option) => option.value === props.modelValue

const syncSearchFromValue = () => {
  searchQuery.value = selectedOption.value ? selectedOption.value.label : ''
}

watch(() => props.modelValue, syncSearchFromValue, { immediate: true })
watch(() => props.options, syncSearchFromValue)

const open = () => {
  if (props.disabled || isOpen.value) return
  isOpen.value = true
  isSearching.value = false
  if (props.searchable) {
    searchQuery.value = ''
  }
  const idx = filteredOptions.value.findIndex(o => o.value === props.modelValue)
  highlightedIndex.value = idx >= 0 ? idx : (filteredOptions.value.length ? 0 : -1)
  nextTick(() => {
    const el = getInputEl()
    el?.focus()
    if (!props.searchable) el?.select()
    scrollToHighlighted()
  })
}

const close = () => {
  if (!isOpen.value) return
  isOpen.value = false
  isSearching.value = false
  highlightedIndex.value = -1
  syncSearchFromValue()
}

const toggle = () => {
  if (props.disabled) return
  isOpen.value ? close() : open()
}

const onWrapperClick = (e: MouseEvent) => {
  if (props.disabled) return
  const el = getInputEl()
  if (e.target === el) return
  el?.focus()
  open()
}

const onInput = () => {
  if (!props.searchable) return
  isOpen.value = true
  isSearching.value = true
  highlightedIndex.value = filteredOptions.value.length ? 0 : -1
}

const selectOption = (option: Option) => {
  emit('update:modelValue', option.value)
  emit('change', option.value)
  searchQuery.value = option.label
  isOpen.value = false
  isSearching.value = false
  highlightedIndex.value = -1
}

const clear = () => {
  emit('update:modelValue', null)
  emit('change', null)
  searchQuery.value = ''
  nextTick(() => getInputEl()?.focus())
}

const scrollToHighlighted = () => {
  if (!listRef.value || highlightedIndex.value < 0) return
  const el = listRef.value.querySelector(
    `li[data-index="${highlightedIndex.value}"]`
  ) as HTMLElement | null
  if (el) {
    const list = listRef.value
    const top = el.offsetTop
    const bottom = top + el.offsetHeight
    if (top < list.scrollTop) list.scrollTop = top
    else if (bottom > list.scrollTop + list.clientHeight) {
      list.scrollTop = bottom - list.clientHeight
    }
  }
}

const onKeydown = (event: KeyboardEvent) => {
  if (props.disabled) return

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      if (!isOpen.value) { open(); return }
      if (filteredOptions.value.length) {
        highlightedIndex.value =
          (highlightedIndex.value + 1) % filteredOptions.value.length
        nextTick(scrollToHighlighted)
      }
      break
    case 'ArrowUp':
      event.preventDefault()
      if (!isOpen.value) { open(); return }
      if (filteredOptions.value.length) {
        highlightedIndex.value =
          highlightedIndex.value <= 0
            ? filteredOptions.value.length - 1
            : highlightedIndex.value - 1
        nextTick(scrollToHighlighted)
      }
      break
    case 'Enter':
      if (isOpen.value && highlightedIndex.value >= 0) {
        event.preventDefault()
        selectOption(filteredOptions.value[highlightedIndex.value])
      }
      break
    case 'Escape':
      if (isOpen.value) {
        event.preventDefault()
        close()
      }
      break
    case 'Tab':
      close()
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
