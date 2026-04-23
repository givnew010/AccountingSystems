<template>
  <span
    :class="[
      'inline-flex items-center rounded-full font-medium whitespace-nowrap',
      sizeClasses,
      variantClasses,
      pill ? 'px-3' : '',
      $attrs.class || ''
    ]"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ inheritAttrs: false })

type Variant = 'gray' | 'blue' | 'green' | 'yellow' | 'red' | 'purple'
type Size = 'xs' | 'sm' | 'md'

const props = withDefaults(
  defineProps<{
    variant?: Variant
    size?: Size
    pill?: boolean
  }>(),
  {
    variant: 'gray',
    size: 'sm',
    pill: false
  }
)

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'xs': return 'px-1.5 py-0.5 text-[11px]'
    case 'md': return 'px-2.5 py-1 text-sm'
    case 'sm':
    default: return 'px-2 py-0.5 text-xs'
  }
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'blue': return 'bg-blue-100 text-blue-700'
    case 'green': return 'bg-green-100 text-green-700'
    case 'yellow': return 'bg-yellow-100 text-yellow-700'
    case 'red': return 'bg-red-100 text-red-700'
    case 'purple': return 'bg-purple-100 text-purple-700'
    case 'gray':
    default: return 'bg-gray-100 text-gray-700'
  }
})
</script>

