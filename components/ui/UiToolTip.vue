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
        v-if="isVisible && hasContent"
        :class="[
          'pointer-events-none absolute z-50 rounded-xl bg-slate-950 text-slate-100 shadow-[0_10px_25px_rgba(2,6,23,0.25)]',
          hasDetailedContent ? 'max-w-[20rem] px-4 py-3 text-sm leading-relaxed' : 'whitespace-nowrap px-5 py-3 text-sm font-semibold',
          positionClasses
        ]"
        role="tooltip"
      >
        <span
          :class="[
            'absolute h-3 w-3 rotate-45 bg-slate-950',
            arrowClasses
          ]"
          aria-hidden="true"
        />
        <template v-if="hasDetailedContent">
          <p v-if="title" class="font-semibold text-slate-100">
            {{ title }}
          </p>
          <p v-if="description" class="mt-1 text-slate-200/95">
            {{ description }}
          </p>
        </template>
        <template v-else>
          {{ text }}
        </template>
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
    title?: string
    description?: string
    position?: Position
    delay?: number
    disabled?: boolean
  }>(),
  {
    text: '',
    title: '',
    description: '',
    position: 'right',
    delay: 120,
    disabled: false
  }
)

const isVisible = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null

const positionClasses = computed(() => {
  switch (props.position) {
    case 'right':
      return 'right-auto left-full top-1/2 -translate-y-1/2 mr-0 ml-3'
    case 'bottom':
      return 'top-full left-1/2 -translate-x-1/2 mt-3'
    case 'left':
      return 'left-auto right-full top-1/2 -translate-y-1/2 ml-0 mr-3'
    case 'top':
    default:
      return 'bottom-full left-1/2 -translate-x-1/2 mb-3'
  }
})

const arrowClasses = computed(() => {
  switch (props.position) {
    case 'right':
      return '-left-1.5 top-1/2 -translate-y-1/2'
    case 'bottom':
      return '-top-1.5 left-1/2 -translate-x-1/2'
    case 'left':
      return '-right-1.5 top-1/2 -translate-y-1/2'
    case 'top':
    default:
      return '-bottom-1.5 left-1/2 -translate-x-1/2'
  }
})

const hasDetailedContent = computed(
  () => Boolean(props.title?.trim()) || Boolean(props.description?.trim())
)

const hasContent = computed(() => {
  if (hasDetailedContent.value) return true
  return Boolean(props.text?.trim())
})

const clearTimer = () => {
  if (!timer) return
  clearTimeout(timer)
  timer = null
}

const show = () => {
  if (props.disabled || !hasContent.value) return
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
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.ui-tooltip-fade-enter-from,
.ui-tooltip-fade-leave-to {
  opacity: 0;
  transform: translateY(2px);
}
</style>

