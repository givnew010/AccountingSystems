import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoginStore = defineStore('login', () => {
  const form = ref({
    username: '',
    password: ''
  })

  const error = ref('')
  const loading = ref(false)

  async function submit(authStore: { login: (u: string, p: string) => Promise<void> }) {
    loading.value = true
    error.value = ''

    try {
      await authStore.login(form.value.username, form.value.password)
      return { ok: true as const }
    } catch (err: any) {
      error.value = err?.message || 'حدث خطأ غير متوقع'
      return { ok: false as const, error: error.value }
    } finally {
      loading.value = false
    }
  }

  function reset() {
    form.value = { username: '', password: '' }
    error.value = ''
    loading.value = false
  }

  return {
    form,
    error,
    loading,
    submit,
    reset
  }
})

