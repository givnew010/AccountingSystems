export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()

  // localStorage is only available in the browser.
  if (import.meta.client) {
    authStore.checkAuth()
  }

  const isLoginPage = to.path === '/login'

  if (!authStore.isAuthenticated && !isLoginPage) {
    return navigateTo('/login', { replace: true })
  }

  if (authStore.isAuthenticated && isLoginPage) {
    return navigateTo('/', { replace: true })
  }
})
