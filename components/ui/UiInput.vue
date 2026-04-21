<template>
  <input
    v-bind="$attrs"
    :id="id"
    :value="modelValue ?? ''"
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :class="[
      baseFieldClasses,
      inputSizeClasses(size),
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
    modelValue?: string | number | null
    type?: string
    placeholder?: string
    disabled?: boolean
    readonly?: boolean
    size?: UiSize
    id?: string
    error?: boolean
  }>(),
  {
    type: 'text',
    placeholder: '',
    disabled: false,
    readonly: false,
    size: 'md',
    error: false
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [evt: Event]
}>()

const onInput = (e: Event) => {
  const target = e.target as HTMLInputElement | null
  emit('update:modelValue', target?.value ?? '')
}
</script>

