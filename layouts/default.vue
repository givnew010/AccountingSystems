<template>
  <div dir="rtl" class="min-h-screen bg-gray-50">
    <SidebarNavigation v-if="authStore.isAuthenticated" />
    <div class="transition-all duration-300"
      :class="authStore.isAuthenticated ? (sidebarStore.isCollapsed ? 'md:mr-16' : 'md:mr-64') : ''">
      <slot />
    </div>
    <Toast />

    <MessageDialog v-model:show="globalMessage.show" :title="globalMessage.title" :message="globalMessage.message"
      :confirm-text="globalMessage.confirmText" :cancel-text="globalMessage.cancelText"
      @confirm="globalMessage.onConfirm" @cancel="globalMessage.onCancel" />
  </div>
</template>

<script setup>
import { reactive, provide } from 'vue'
import { useSidebarStore } from '~/stores/sidebar'
import { useAuthStore } from '~/stores/auth'
import { provideToast } from '~/composables/useToast'

const sidebarStore = useSidebarStore()
const authStore = useAuthStore()

provideToast()

const globalMessage = reactive({
  show: false,
  title: '',
  message: '',
  cancelText: '',
  confirmText: '',
  onCancel: null,
  onConfirm: null,
})

function showMessage({ title = '', message = '', cancelText = 'إلغاء', confirmText = 'حذف', onCancel = null, onConfirm = null }) {
  globalMessage.title = title
  globalMessage.message = message
  globalMessage.cancelText = cancelText
  globalMessage.confirmText = confirmText
  globalMessage.onCancel = () => {
    globalMessage.show = false;
    if (typeof onCancel === 'function') onCancel();
  };
  globalMessage.onConfirm = () => {
    globalMessage.show = false;
    if (typeof onConfirm === 'function') onConfirm();
  };
  globalMessage.show = true
}
provide('showMessage', showMessage)
</script>