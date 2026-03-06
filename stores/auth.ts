import { defineStore } from 'pinia'
import { ref } from 'vue'

interface User {
  id: number
  name: string
  role: string
  permissions: string[]
}

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const isAuthenticated = ref(false)

  // Mock users for demonstration
  const mockUsers = [
    {
      id: 1,
      username: 'admin',
      password: 'admin@123',
      name: 'المدير العام',
      role: 'مدير النظام',
      permissions: ['all']
    },
    {
      id: 2,
      username: 'accountant',
      password: 'acc123',
      name: 'المحاسب',
      role: 'محاسب',
      permissions: ['sales', 'purchases', 'reports']
    },
    {
      id: 3,
      username: 'manager',
      password: 'mgr123',
      name: 'مدير المبيعات',
      role: 'مدير مبيعات',
      permissions: ['sales', 'customers', 'reports']
    }
  ]

  // Actions
  const login = async (username: string, password: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    const foundUser = mockUsers.find(u => u.username === username && u.password === password)

    if (!foundUser) {
      throw new Error('اسم المستخدم أو كلمة المرور غير صحيحة')
    }

    // Set user data
    user.value = {
      id: foundUser.id,
      name: foundUser.name,
      role: foundUser.role,
      permissions: foundUser.permissions
    }
    isAuthenticated.value = true

    // Store in localStorage for persistence
    if (process.client) {
      localStorage.setItem('auth_user', JSON.stringify(user.value))
      localStorage.setItem('auth_token', 'mock_jwt_token_' + foundUser.id)
    }
  }

  const logout = () => {
    user.value = null
    isAuthenticated.value = false

    if (process.client) {
      localStorage.removeItem('auth_user')
      localStorage.removeItem('auth_token')
    }
  }

  const checkAuth = () => {
    if (process.client) {
      const storedUser = localStorage.getItem('auth_user')
      const token = localStorage.getItem('auth_token')

      if (storedUser && token) {
        user.value = JSON.parse(storedUser)
        isAuthenticated.value = true
      }
    }
  }

  // Initialize auth state on store creation
  checkAuth()

  return {
    user,
    isAuthenticated,
    login,
    logout,
    checkAuth
  }
})