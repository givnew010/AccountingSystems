<template>
  <div class="flex items-center gap-2">
    <input
      v-bind="$attrs"
      :id="id"
      type="checkbox"
      :checked="!!modelValue"
      :disabled="disabled"
      :class="[
        'w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer',
        disabled ? 'opacity-60 cursor-not-allowed' : '',
        $attrs.class || ''
      ]"
      @change="onChange"
    />
    <label
      v-if="$slots.default"
      :for="id"
      :class="['text-sm text-gray-700 select-none', disabled ? 'opacity-70' : 'cursor-pointer']"
    >
      <slot />
    </label>
  </div>
</template>

<script setup lang="ts">
defineOptions({ inheritAttrs: false })

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

const onChange = (e: Event) => {
  const target = e.target as HTMLInputElement | null
  emit('update:modelValue', !!target?.checked)
  emit('change', e)
}
</script>

