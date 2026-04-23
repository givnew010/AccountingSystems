<template>
  <transition name="ui-modal-fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      @keydown.esc="handleEsc"
    >
      <div
        class="absolute inset-0 bg-black/40 backdrop-blur-sm"
        aria-hidden="true"
        @click="onBackdropClick"
      />

      <div
        :class="[
          'relative w-full bg-white rounded-lg shadow-lg ring-1 ring-black/5',
          maxWidthClass
        ]"
      >
        <header v-if="showHeader" class="flex items-start justify-between gap-4 px-5 py-4 border-b border-gray-200">
          <div class="min-w-0">
            <h3 class="text-base font-semibold text-gray-900 truncate">
              <slot name="title">{{ title }}</slot>
            </h3>
            <p v-if="description" class="mt-1 text-sm text-gray-500">
              {{ description }}
            </p>
          </div>
          <button
            v-if="showClose"
            type="button"
            class="text-gray-400 hover:text-gray-600 rounded p-1"
            aria-label="Close dialog"
            @click="close('close-button')"
          >
            <UiIcon :icon="XMarkIcon" size="sm" decorative />
          </button>
        </header>

        <section class="px-5 py-4 max-h-[70vh] overflow-auto">
          <slot />
        </section>

        <footer v-if="$slots.footer" class="px-5 py-4 border-t border-gray-200 flex items-center justify-end gap-2">
          <slot name="footer" />
        </footer>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed, watch, onBeforeUnmount } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'

type MaxWidth = 'sm' | 'md' | 'lg' | 'xl' | '2xl'
type CloseSource = 'programmatic' | 'backdrop' | 'escape' | 'close-button'

const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    title?: string
    description?: string
    maxWidth?: MaxWidth
    closeOnBackdrop?: boolean
    closeOnEsc?: boolean
    showClose?: boolean
    showHeader?: boolean
    lockScroll?: boolean
  }>(),
  {
    modelValue: false,
    title: '',
    description: '',
    maxWidth: 'lg',
    closeOnBackdrop: true,
    closeOnEsc: true,
    showClose: true,
    showHeader: true,
    lockScroll: true
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  open: []
  close: [source: CloseSource]
}>()

const isOpen = computed(() => !!props.modelValue)

const maxWidthClass = computed(() => {
  switch (props.maxWidth) {
    case 'sm': return 'max-w-sm'
    case 'md': return 'max-w-md'
    case 'xl': return 'max-w-xl'
    case '2xl': return 'max-w-2xl'
    case 'lg':
    default: return 'max-w-lg'
  }
})

watch(isOpen, (open) => {
  if (props.lockScroll && typeof document !== 'undefined') {
    document.body.style.overflow = open ? 'hidden' : ''
  }
  if (open) emit('open')
}, { immediate: true })

onBeforeUnmount(() => {
  if (props.lockScroll && typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
})

const close = (source: CloseSource) => {
  emit('update:modelValue', false)
  emit('close', source)
}

const onBackdropClick = () => {
  if (!props.closeOnBackdrop) return
  close('backdrop')
}

const handleEsc = () => {
  if (!props.closeOnEsc) return
  close('escape')
}
</script>

<style scoped>
.ui-modal-fade-enter-active,
.ui-modal-fade-leave-active {
  transition: opacity 0.15s ease;
}
.ui-modal-fade-enter-from,
.ui-modal-fade-leave-to {
  opacity: 0;
}
</style>

