<template>
  <component
    :is="icon"
    v-if="icon"
    :class="[
      sizeClasses,
      colorClasses,
      spin ? 'animate-spin' : '',
      $attrs.class || ''
    ]"
    :aria-hidden="decorative ? 'true' : undefined"
    :role="decorative ? undefined : 'img'"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ inheritAttrs: false })

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type Tone = 'default' | 'muted' | 'primary' | 'success' | 'warning' | 'danger'

const props = withDefaults(
  defineProps<{
    icon?: any
    size?: Size
    tone?: Tone
    decorative?: boolean
    spin?: boolean
  }>(),
  {
    icon: null,
    size: 'md',
    tone: 'default',
    decorative: true,
    spin: false
  }
)

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'xs': return 'w-3 h-3'
    case 'sm': return 'w-4 h-4'
    case 'lg': return 'w-6 h-6'
    case 'xl': return 'w-7 h-7'
    case 'md':
    default: return 'w-5 h-5'
  }
})

const colorClasses = computed(() => {
  switch (props.tone) {
    case 'muted': return 'text-gray-400'
    case 'primary': return 'text-blue-600'
    case 'success': return 'text-green-600'
    case 'warning': return 'text-yellow-600'
    case 'danger': return 'text-red-600'
    case 'default':
    default: return 'text-current'
  }
})
</script>

