<template>
  <div v-if="isGroupMode" class="inline-flex rounded-lg border border-gray-200 bg-white overflow-hidden">
    <button
      v-for="item in options"
      :key="String(item.value)"
      type="button"
      :disabled="disabled || !!item.disabled"
      :class="[
        'inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-colors border-l border-gray-200 last:border-l-0',
        isSelected(item.value)
          ? 'bg-blue-500 text-white'
          : 'bg-white text-gray-700 hover:bg-gray-50',
        (disabled || item.disabled) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      ]"
      @click="selectOption(item.value)"
    >
      <UiIcon v-if="item.icon" :icon="item.icon" size="sm" decorative />
      <span>{{ item.label }}</span>
    </button>
  </div>

  <button
    v-else
    type="button"
    role="switch"
    :aria-checked="isOn ? 'true' : 'false'"
    :disabled="disabled"
    :class="[
      'relative inline-flex shrink-0 border-0 rounded-full transition-colors focus:outline-none',
      sizeTrackClasses,
      isOn ? 'bg-blue-500' : 'bg-slate-700',
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
    ]"
    @click="toggleSwitch"
  >
    <span
      :class="[
        'absolute top-1/2 -translate-y-1/2 rounded-full bg-white shadow-sm transition-all',
        sizeThumbClasses,
        isOn ? thumbOnClasses : thumbOffClasses
      ]"
    />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type Size = 'sm' | 'md'
type Primitive = string | number | boolean

interface ToggleOption {
  label: string
  value: Primitive
  icon?: any
  disabled?: boolean
}

const props = withDefaults(
  defineProps<{
    modelValue?: Primitive
    disabled?: boolean
    size?: Size
    options?: ToggleOption[]
    trueValue?: Primitive
    falseValue?: Primitive
  }>(),
  {
    modelValue: false,
    disabled: false,
    size: 'md',
    options: () => [],
    trueValue: true,
    falseValue: false
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: Primitive]
  change: [value: Primitive]
}>()

const isGroupMode = computed(() => props.options.length > 0)
const isOn = computed(() => props.modelValue === props.trueValue)

const sizeTrackClasses = computed(() => (props.size === 'sm' ? 'w-12 h-7' : 'w-14 h-8'))
const sizeThumbClasses = computed(() => (props.size === 'sm' ? 'w-5 h-5' : 'w-6 h-6'))
const thumbOffClasses = computed(() => (props.size === 'sm' ? 'left-1' : 'left-1'))
const thumbOnClasses = computed(() => (props.size === 'sm' ? 'left-6' : 'left-7'))

const updateValue = (value: Primitive) => {
  emit('update:modelValue', value)
  emit('change', value)
}

const toggleSwitch = () => {
  if (props.disabled) return
  updateValue(isOn.value ? props.falseValue : props.trueValue)
}

const isSelected = (value: Primitive) => props.modelValue === value

const selectOption = (value: Primitive) => {
  if (props.disabled || value === props.modelValue) return
  updateValue(value)
}
</script>

