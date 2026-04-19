<template>
  <div class="relative">
    <input
      ref="inputRef"
      v-model="searchQuery"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="onInput"
      @focus="showDropdown = true"
      @blur="onBlur"
      @keydown="onKeydown"
      :class="[
        'w-full border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 disabled:bg-gray-100 transition-colors',
        size === 'sm' ? 'px-2 py-0.5 text-sm pr-6' : 'px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8'
      ]"
      type="text"
    />
    <button
      v-if="!disabled"
      @click="toggleDropdown"
      :class="['absolute inset-y-0 right-0 flex items-center', size === 'sm' ? 'pr-1.5' : 'pr-3']"
    >
      <svg :class="size === 'sm' ? 'w-3.5 h-3.5' : 'w-5 h-5'" class="text-gray-400" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
      </svg>
    </button>
    <ul
      v-show="showDropdown && filteredOptions.length"
      class="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto mt-1"
    >
      <li
        v-for="(option, index) in filteredOptions"
        :key="option.value"
        @mousedown="selectOption(option)"
        :class="[
          'px-3 py-2 cursor-pointer hover:bg-blue-50',
          { 'bg-blue-100': highlightedIndex === index }
        ]"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'

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
  size?: 'sm' | 'md'
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  disabled: false,
  searchable: true,
  size: 'md'
})

const emit = defineEmits<{
  'update:modelValue': [value: any]
}>()

const inputRef = ref<HTMLInputElement>()
const searchQuery = ref('')
const showDropdown = ref(false)
const highlightedIndex = ref(-1)

const filteredOptions = computed(() => {
  if (!props.searchable) return props.options
  return props.options.filter(option =>
    option.label.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const selectedOption = computed(() => {
  return props.options.find(option => option.value === props.modelValue)
})

watch(() => props.modelValue, (newValue) => {
  const option = props.options.find(opt => opt.value === newValue)
  searchQuery.value = option ? option.label : ''
})

const onInput = () => {
  showDropdown.value = true
  highlightedIndex.value = -1
  if (!props.searchable) {
    emit('update:modelValue', searchQuery.value)
  }
}

const onBlur = () => {
  setTimeout(() => {
    showDropdown.value = false
    highlightedIndex.value = -1
    // Reset to selected value if not searchable
    if (!props.searchable && selectedOption.value) {
      searchQuery.value = selectedOption.value.label
    }
  }, 150)
}

const onKeydown = (event: KeyboardEvent) => {
  if (!showDropdown.value) return

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      highlightedIndex.value = Math.min(highlightedIndex.value + 1, filteredOptions.value.length - 1)
      break
    case 'ArrowUp':
      event.preventDefault()
      highlightedIndex.value = Math.max(highlightedIndex.value - 1, -1)
      break
    case 'Enter':
      event.preventDefault()
      if (highlightedIndex.value >= 0) {
        selectOption(filteredOptions.value[highlightedIndex.value])
      }
      break
    case 'Escape':
      showDropdown.value = false
      highlightedIndex.value = -1
      break
  }
}

const selectOption = (option: Option) => {
  emit('update:modelValue', option.value)
  searchQuery.value = option.label
  showDropdown.value = false
  highlightedIndex.value = -1
}

const toggleDropdown = () => {
  if (props.disabled) return
  showDropdown.value = !showDropdown.value
  if (showDropdown.value) {
    nextTick(() => inputRef.value?.focus())
  }
}
</script>