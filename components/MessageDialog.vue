<template>
  <transition name="fade">
    <div v-if="showLocal" class="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="onCancel" aria-hidden="true"></div>

      <div class="relative w-full max-w-lg bg-white rounded-lg shadow-lg ring-1 ring-black/5 p-6 mx-2" role="dialog" aria-modal="true">
        <header class="flex items-start justify-between gap-4">
          <h3 class="text-lg font-semibold text-gray-900 truncate">{{ title }}</h3>
          <button @click="onCancel" class="text-gray-400 hover:text-gray-600" aria-label="Close dialog">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </header>

        <div class="mt-4 text-sm text-gray-600">
          <p v-if="messageHtml" v-html="messageHtml"></p>
          <p v-else class="whitespace-pre-line">{{ message }}</p>
        </div>

        <footer class="mt-6 flex items-center justify-end gap-3">
          <button
            @click="onCancel"
            class="inline-flex items-center px-4 py-2 rounded-md bg-white border text-gray-700 hover:bg-gray-50"
          >
            {{ cancelText }}
          </button>

          <button
            @click="onConfirm"
            class="inline-flex items-center px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
          >
            {{ confirmText }}
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  show: { type: Boolean, default: false },
  title: { type: String, default: 'تنبيه' },
  message: { type: String, default: '' },
  messageHtml: { type: String, default: '' },
  confirmText: { type: String, default: 'موافق' },
  cancelText: { type: String, default: 'إلغاء' },
});

const emit = defineEmits(['update:show', 'confirm', 'cancel']);

const showLocal = ref(!!props.show);

watch(() => props.show, (v) => {
  showLocal.value = !!v;
});

watch(showLocal, (v) => {
  emit('update:show', v);
});

const onConfirm = () => {
  emit('confirm');
  showLocal.value = false;
};

const onCancel = () => {
  emit('cancel');
  showLocal.value = false;
};

// Close on Escape / confirm on Enter
function handleKey(e) {
  if (e.key === 'Escape' && showLocal.value) onCancel();
  if (e.key === 'Enter' && showLocal.value) onConfirm();
}

onMounted(() => window.addEventListener('keydown', handleKey));
onBeforeUnmount(() => window.removeEventListener('keydown', handleKey));
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .15s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
