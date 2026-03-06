import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSidebarStore = defineStore('sidebar', () => {
  const isCollapsed = ref(false)
  const isMobileMenuOpen = ref(false)

  const toggleCollapse = () => {
    isCollapsed.value = !isCollapsed.value
  }

  const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
  }

  const closeMobileMenu = () => {
    isMobileMenuOpen.value = false
  }

  return {
    isCollapsed,
    isMobileMenuOpen,
    toggleCollapse,
    toggleMobileMenu,
    closeMobileMenu
  }
})