<template>
  <div
    class="relative inline-flex"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @focusin="show"
    @focusout="hide"
  >
    <slot />

    <transition name="ui-tooltip-fade">
      <div
        v-if="isVisible && text"
        :class="[
          'pointer-events-none absolute z-50 whitespace-nowrap rounded-md bg-gray-900 px-2 py-1 text-xs text-white shadow-lg',
          positionClasses
        ]"
        role="tooltip"
      >
        {{ text }}
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

type Position = 'top' | 'right' | 'bottom' | 'left'

const props = withDefaults(
  defineProps<{
    text?: string
    position?: Position
    delay?: number
    disabled?: boolean
  }>(),
  {
    text: '',
    position: 'top',
    delay: 120,
    disabled: false
  }
)

const isVisible = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null

const positionClasses = computed(() => {
  switch (props.position) {
    case 'right':
      return 'right-auto left-full top-1/2 -translate-y-1/2 mr-0 ml-2'
    case 'bottom':
      return 'top-full left-1/2 -translate-x-1/2 mt-2'
    case 'left':
      return 'left-auto right-full top-1/2 -translate-y-1/2 ml-0 mr-2'
    case 'top':
    default:
      return 'bottom-full left-1/2 -translate-x-1/2 mb-2'
  }
})

const clearTimer = () => {
  if (!timer) return
  clearTimeout(timer)
  timer = null
}

const show = () => {
  if (props.disabled || !props.text) return
  clearTimer()
  timer = setTimeout(() => {
    isVisible.value = true
  }, props.delay)
}

const hide = () => {
  clearTimer()
  isVisible.value = false
}

const onMouseEnter = () => show()
const onMouseLeave = () => hide()
</script>

<style scoped>
.ui-tooltip-fade-enter-active,
.ui-tooltip-fade-leave-active {
  transition: opacity 0.12s ease;
}
.ui-tooltip-fade-enter-from,
.ui-tooltip-fade-leave-to {
  opacity: 0;
}
</style>

