import { ref, readonly, provide, inject } from 'vue'

export interface Toast {
  id: number
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
}

const toasts = ref<Toast[]>([])

const addToast = (message: string, type: Toast['type'] = 'info', duration: number = 3000) => {
  const id = Date.now()
  toasts.value.push({ id, message, type })
  setTimeout(() => {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }, duration)
}

const removeToast = (id: number) => {
  toasts.value = toasts.value.filter(t => t.id !== id)
}

export const provideToast = () => {
  provide('toast', {
    toasts: readonly(toasts),
    addToast,
    removeToast
  })
}

export const injectToast = () => {
  const toast = inject('toast') as {
    toasts: readonly Toast[],
    addToast: typeof addToast,
    removeToast: typeof removeToast
  }
  if (!toast) {
    throw new Error('Toast not provided')
  }
  return toast
}