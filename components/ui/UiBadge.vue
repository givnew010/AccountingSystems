<template>
  <span
    :class="[
      'inline-flex items-center rounded-full font-medium whitespace-nowrap',
      sizeClasses,
      variantClasses,
      pill ? 'px-3.5' : '',
      $attrs.class || ''
    ]"
  >
    <UiIcon
      v-if="icon && iconPosition === 'left'"
      :icon="icon"
      :size="iconSize"
      decorative
      class="shrink-0"
    />
    <slot />
    <UiIcon
      v-if="icon && iconPosition === 'right'"
      :icon="icon"
      :size="iconSize"
      decorative
      class="shrink-0"
    />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ inheritAttrs: false })

type Variant = 'gray' | 'blue' | 'green' | 'yellow' | 'red' | 'purple'
type Size = 'xs' | 'sm' | 'md'
type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type VisualStyle = 'soft' | 'outline'

const props = withDefaults(
  defineProps<{
    variant?: Variant
    size?: Size
    pill?: boolean
    styleType?: VisualStyle
    icon?: any
    iconPosition?: 'left' | 'right'
    iconSize?: IconSize
  }>(),
  {
    variant: 'gray',
    size: 'sm',
    pill: false,
    styleType: 'soft',
    icon: null,
    iconPosition: 'right',
    iconSize: 'xs'
  }
)

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'xs': return 'gap-1 px-2 py-0.5 text-[11px]'
    case 'md': return 'gap-1.5 px-3 py-1 text-sm'
    case 'sm':
    default: return 'gap-1 px-2.5 py-1 text-xs'
  }
})

const variantClasses = computed(() => {
  const isOutline = props.styleType === 'outline'

  switch (props.variant) {
    case 'blue': return isOutline ? 'border border-blue-200 bg-white text-blue-700' : 'bg-blue-100 text-blue-700'
    case 'green': return isOutline ? 'border border-green-200 bg-white text-green-700' : 'bg-green-100 text-green-700'
    case 'yellow': return isOutline ? 'border border-yellow-200 bg-white text-yellow-700' : 'bg-yellow-100 text-yellow-700'
    case 'red': return isOutline ? 'border border-red-200 bg-white text-red-700' : 'bg-red-100 text-red-700'
    case 'purple': return isOutline ? 'border border-purple-200 bg-white text-purple-700' : 'bg-purple-100 text-purple-700'
    case 'gray':
    default: return isOutline ? 'border border-gray-200 bg-white text-gray-700' : 'bg-gray-100 text-gray-700'
  }
})
</script>

