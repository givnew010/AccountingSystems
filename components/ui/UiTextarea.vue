<template>
  <textarea
    v-bind="$attrs"
    :id="id"
    :value="modelValue ?? ''"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :rows="rows"
    :class="[
      baseFieldClasses,
      inputSizeClasses(size),
      'resize-none',
      error ? 'border-red-400 focus:ring-red-500 focus:border-transparent' : '',
      $attrs.class || ''
    ]"
    @input="onInput"
    @change="$emit('change', $event)"
  />
</template>

<script setup lang="ts">
import { baseFieldClasses, inputSizeClasses, type UiSize } from './uiClasses'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    modelValue?: string | null
    placeholder?: string
    disabled?: boolean
    readonly?: boolean
    size?: UiSize
    id?: string
    rows?: number
    error?: boolean
  }>(),
  {
    placeholder: '',
    disabled: false,
    readonly: false,
    size: 'md',
    rows: 3,
    error: false
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [evt: Event]
}>()

const onInput = (e: Event) => {
  const target = e.target as HTMLTextAreaElement | null
  emit('update:modelValue', target?.value ?? '')
}
</script>

