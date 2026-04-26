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
        <header
          v-if="showHeader"
          :class="[
            'flex items-start justify-between gap-4 px-5 py-4 border-b',
            headerClasses.wrapper
          ]"
        >
          <div class="min-w-0">
            <h3 :class="['text-base font-semibold truncate', headerClasses.title]">
              <slot name="title">{{ title }}</slot>
            </h3>
            <p v-if="description" :class="['mt-1 text-sm', headerClasses.description]">
              {{ description }}
            </p>
          </div>
          <UiButton
            v-if="showClose"
            icon-button
            icon-button-style="plain"
            variant="gray"
            size="sm"
            :icon="XMarkIcon"
            aria-label="Close dialog"
            @click="close('close-button')"
          />
        </header>

        <section class="px-5 py-4 max-h-[70vh] overflow-auto">
          <slot />
        </section>

        <footer
          v-if="showFooter && (showCancelButton || showConfirmButton || showExtraButton)"
          class="px-5 py-4 border-t border-gray-200 flex items-center justify-end gap-2"
        >
          <UiButton
            v-if="showExtraButton"
            :variant="extraButtonVariant"
            :icon="extraButtonIcon"
            :icon-position="extraButtonIconPosition"
            :disabled="extraButtonDisabled"
            @click="onExtraClick"
          >
            {{ extraButtonText }}
          </UiButton>
          <UiButton
            v-if="showCancelButton"
            :variant="cancelButtonVariant"
            :icon="cancelButtonIcon"
            :icon-position="cancelButtonIconPosition"
            :disabled="cancelButtonDisabled"
            @click="onCancelClick"
          >
            {{ cancelButtonText }}
          </UiButton>
          <UiButton
            v-if="showConfirmButton"
            :variant="confirmButtonVariant"
            :icon="confirmButtonIcon"
            :icon-position="confirmButtonIconPosition"
            :disabled="confirmButtonDisabled"
            @click="onConfirmClick"
          >
            {{ confirmButtonText }}
          </UiButton>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed, watch, onBeforeUnmount } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'

type MaxWidth = 'sm' | 'md' | 'lg' | 'xl' | '2xl'
type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'warning' | 'success' | 'gray'
type HeaderVariant = 'primary' | 'success' | 'warning' | 'danger' | 'gray'
type CloseSource =
  | 'programmatic'
  | 'backdrop'
  | 'escape'
  | 'close-button'
  | 'cancel-button'
  | 'confirm-button'
  | 'extra-button'

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
    headerVariant?: HeaderVariant
    lockScroll?: boolean
    showFooter?: boolean
    showCancelButton?: boolean
    showConfirmButton?: boolean
    showExtraButton?: boolean
    cancelButtonText?: string
    confirmButtonText?: string
    extraButtonText?: string
    cancelButtonVariant?: ButtonVariant
    confirmButtonVariant?: ButtonVariant
    extraButtonVariant?: ButtonVariant
    cancelButtonIcon?: any
    confirmButtonIcon?: any
    extraButtonIcon?: any
    cancelButtonIconPosition?: 'left' | 'right'
    confirmButtonIconPosition?: 'left' | 'right'
    extraButtonIconPosition?: 'left' | 'right'
    cancelButtonDisabled?: boolean
    confirmButtonDisabled?: boolean
    extraButtonDisabled?: boolean
    closeOnCancel?: boolean
    closeOnConfirm?: boolean
    closeOnExtra?: boolean
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
    headerVariant: 'primary',
    lockScroll: true,
    showFooter: true,
    showCancelButton: true,
    showConfirmButton: true,
    showExtraButton: false,
    cancelButtonText: 'إلغاء',
    confirmButtonText: 'تأكيد',
    extraButtonText: 'إجراء إضافي',
    cancelButtonVariant: 'secondary',
    confirmButtonVariant: 'primary',
    extraButtonVariant: 'gray',
    cancelButtonIcon: null,
    confirmButtonIcon: null,
    extraButtonIcon: null,
    cancelButtonIconPosition: 'left',
    confirmButtonIconPosition: 'left',
    extraButtonIconPosition: 'left',
    cancelButtonDisabled: false,
    confirmButtonDisabled: false,
    extraButtonDisabled: false,
    closeOnCancel: true,
    closeOnConfirm: true,
    closeOnExtra: false
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  open: []
  close: [source: CloseSource]
  cancel: []
  confirm: []
  extra: []
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

const headerClasses = computed(() => {
  switch (props.headerVariant) {
    case 'success':
      return {
        wrapper: 'bg-green-50 border-green-100',
        title: 'text-green-900',
        description: 'text-green-700'
      }
    case 'warning':
      return {
        wrapper: 'bg-yellow-50 border-yellow-100',
        title: 'text-yellow-900',
        description: 'text-yellow-700'
      }
    case 'danger':
      return {
        wrapper: 'bg-red-50 border-red-100',
        title: 'text-red-900',
        description: 'text-red-700'
      }
    case 'gray':
      return {
        wrapper: 'bg-gray-50 border-gray-200',
        title: 'text-gray-900',
        description: 'text-gray-600'
      }
    case 'primary':
    default:
      return {
        wrapper: 'bg-blue-50 border-blue-100',
        title: 'text-blue-900',
        description: 'text-blue-700'
      }
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

const onCancelClick = () => {
  emit('cancel')
  if (props.closeOnCancel) close('cancel-button')
}

const onConfirmClick = () => {
  emit('confirm')
  if (props.closeOnConfirm) close('confirm-button')
}

const onExtraClick = () => {
  emit('extra')
  if (props.closeOnExtra) close('extra-button')
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

