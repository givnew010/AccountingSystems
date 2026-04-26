<template>
  <label
    :for="id"
    :class="[
      'inline-flex items-center gap-2 select-none',
      disabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer',
      attrs.class || ''
    ]"
  >
    <input
      v-bind="inputAttrs"
      :id="id"
      type="checkbox"
      :checked="!!modelValue"
      :disabled="disabled"
      class="peer sr-only"
      @change="onChange"
    />

    <span
      :class="[
        'inline-flex h-5 w-5 items-center justify-center rounded-md border transition-all',
        'peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500 peer-focus-visible:ring-offset-2',
        boxClasses
      ]"
    >
      <UiIcon v-if="modelValue" :icon="CheckIcon" size="sm" class="text-white" decorative />
    </span>

    <span v-if="$slots.default" class="text-sm text-gray-800">
      <slot />
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { CheckIcon } from '@heroicons/vue/24/solid'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()

const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    disabled?: boolean
    id?: string
  }>(),
  {
    modelValue: false,
    disabled: false
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  change: [evt: Event]
}>()

const inputAttrs = computed(() => {
  const { class: _class, id: _id, type: _type, checked: _checked, disabled: _disabled, ...rest } = attrs
  return rest
})

const boxClasses = computed(() => {
  if (props.disabled && props.modelValue) return 'bg-blue-500 border-blue-500'
  if (props.disabled && !props.modelValue) return 'bg-gray-100 border-gray-300'
  if (props.modelValue) return 'bg-blue-500 border-blue-500'
  return 'bg-white border-gray-300 hover:border-blue-400'
})

const onChange = (e: Event) => {
  const target = e.target as HTMLInputElement | null
  emit('update:modelValue', !!target?.checked)
  emit('change', e)
}
</script>

