<template>
  <button
    v-bind="$attrs"
    :type="type"
    :disabled="disabled"
    :class="[
      'inline-flex items-center justify-center gap-2 rounded-lg transition-colors',
      size === 'sm' ? 'px-3 py-1.5 text-sm' : 'px-4 py-2',
      variantClasses,
      disabled ? 'opacity-50 cursor-not-allowed' : '',
      $attrs.class || ''
    ]"
  >
    <slot name="icon" />
    <slot />
  </button>
</template>

<script setup lang="ts">
defineOptions({ inheritAttrs: false })

type Variant = 'primary' | 'secondary' | 'danger' | 'warning' | 'success' | 'gray'
type Size = 'sm' | 'md'

const props = withDefaults(
  defineProps<{
    variant?: Variant
    size?: Size
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
  }>(),
  {
    variant: 'primary',
    size: 'md',
    type: 'button',
    disabled: false
  }
)

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'secondary':
      return 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
    case 'danger':
      return 'bg-red-600 text-white hover:bg-red-700'
    case 'warning':
      return 'bg-yellow-500 text-white hover:bg-yellow-600'
    case 'success':
      return 'bg-green-600 text-white hover:bg-green-700'
    case 'gray':
      return 'bg-gray-600 text-white hover:bg-gray-700'
    case 'primary':
    default:
      return 'bg-blue-600 text-white hover:bg-blue-700'
  }
})
</script>

