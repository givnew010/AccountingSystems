<template>
  <div class="relative">
    <select
      v-bind="$attrs"
      :id="id"
      :value="modelValue ?? ''"
      :disabled="disabled"
      :class="[
        baseFieldClasses,
        inputSizeClasses(size),
        'appearance-none cursor-pointer',
        isRtl ? 'pl-10' : 'pr-10',
        error ? 'border-red-400 focus:ring-red-500 focus:border-transparent' : '',
        $attrs.class || ''
      ]"
      @change="onChange"
    >
      <slot />
    </select>

    <span :class="['pointer-events-none absolute inset-y-0 flex items-center', isRtl ? 'left-3' : 'right-3']">
      <UiIcon :icon="trailingIcon" size="sm" tone="muted" decorative />
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import { baseFieldClasses, inputSizeClasses, type UiSize } from './uiClasses'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    modelValue?: string | number | null
    disabled?: boolean
    size?: UiSize
    id?: string
    error?: boolean
    trailingIcon?: any
  }>(),
  {
    disabled: false,
    size: 'md',
    error: false,
    trailingIcon: ChevronDownIcon
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [evt: Event]
}>()

const isRtl = computed(() => {
  if (typeof document === 'undefined') return false
  return document.documentElement.dir === 'rtl'
})

const onChange = (e: Event) => {
  const target = e.target as HTMLSelectElement | null
  emit('update:modelValue', target?.value ?? '')
  emit('change', e)
}
</script>

