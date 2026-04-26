<template>
  <button
    v-bind="$attrs"
    :type="type"
    :disabled="disabled"
    :class="[
      'inline-flex items-center justify-center rounded-lg transition-colors',
      sizeClasses,
      variantClasses,
      disabled ? 'opacity-50 cursor-not-allowed' : '',
      $attrs.class || ''
    ]"
  >
    <UiIcon
      v-if="icon && iconPosition === 'left'"
      :icon="icon"
      :size="iconSize"
      :decorative="iconDecorative"
      :label="iconLabel"
      :spin="iconSpin"
    />
    <slot v-if="!icon" name="icon" />
    <slot />
    <UiIcon
      v-if="icon && iconPosition === 'right'"
      :icon="icon"
      :size="iconSize"
      :decorative="iconDecorative"
      :label="iconLabel"
      :spin="iconSpin"
    />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ inheritAttrs: false })

type Variant = 'primary' | 'secondary' | 'danger' | 'warning' | 'success' | 'gray'
type Size = 'sm' | 'md'
type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type IconButtonStyle = 'filled' | 'plain'

const props = withDefaults(
  defineProps<{
    variant?: Variant
    size?: Size
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    iconButton?: boolean
    iconButtonStyle?: IconButtonStyle
    icon?: any
    iconPosition?: 'left' | 'right'
    iconSize?: IconSize
    iconDecorative?: boolean
    iconLabel?: string
    iconSpin?: boolean
  }>(),
  {
    variant: 'primary',
    size: 'md',
    type: 'button',
    disabled: false,
    iconButton: false,
    iconButtonStyle: 'filled',
    icon: null,
    iconPosition: 'left',
    iconSize: 'sm',
    iconDecorative: true,
    iconLabel: '',
    iconSpin: false
  }
)

const sizeClasses = computed(() => {
  if (props.iconButton) {
    return props.size === 'sm' ? 'w-8 h-8 text-sm' : 'w-10 h-10'
  }
  return props.size === 'sm' ? 'gap-1.5 px-3 py-1.5 text-sm' : 'gap-2 px-4 py-2'
})

const variantClasses = computed(() => {
  if (props.iconButton && props.iconButtonStyle === 'plain') {
    switch (props.variant) {
      case 'secondary':
        return 'bg-transparent border-0 text-gray-700 hover:bg-transparent hover:text-gray-900'
      case 'danger':
        return 'bg-transparent border-0 text-red-600 hover:bg-transparent hover:text-red-700'
      case 'warning':
        return 'bg-transparent border-0 text-yellow-600 hover:bg-transparent hover:text-yellow-700'
      case 'success':
        return 'bg-transparent border-0 text-green-600 hover:bg-transparent hover:text-green-700'
      case 'gray':
        return 'bg-transparent border-0 text-gray-600 hover:bg-transparent hover:text-gray-700'
      case 'primary':
      default:
        return 'bg-transparent border-0 text-blue-600 hover:bg-transparent hover:text-blue-700'
    }
  }

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

