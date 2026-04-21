<template>
  <select
    v-bind="$attrs"
    :id="id"
    :value="modelValue ?? ''"
    :disabled="disabled"
    :class="[
      baseFieldClasses,
      inputSizeClasses(size),
      'appearance-none cursor-pointer',
      error ? 'border-red-400 focus:ring-red-500 focus:border-transparent' : '',
      $attrs.class || ''
    ]"
    @change="onChange"
  >
    <slot />
  </select>
</template>

<script setup lang="ts">
import { baseFieldClasses, inputSizeClasses, type UiSize } from './uiClasses'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    modelValue?: string | number | null
    disabled?: boolean
    size?: UiSize
    id?: string
    error?: boolean
  }>(),
  {
    disabled: false,
    size: 'md',
    error: false
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [evt: Event]
}>()

const onChange = (e: Event) => {
  const target = e.target as HTMLSelectElement | null
  emit('update:modelValue', target?.value ?? '')
  emit('change', e)
}
</script>

