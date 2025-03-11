import { ref } from 'vue'
import { useAuthStore } from '~/store/auth'

export const useAuth = () => {
  const authStore = useAuthStore()
  const isAuthenticated = ref(authStore.isAuthenticated)

  const checkAuth = async () => {
    await authStore.checkAuth()
    isAuthenticated.value = authStore.isAuthenticated
    return isAuthenticated.value
  }

  const login = async (phone: string, password: string) => {
    try {
      const response = await authStore.login({ phone, password })
      isAuthenticated.value = true
      return response
    } catch (error) {
      isAuthenticated.value = false
      throw error
    }
  }

  const logout = async () => {
    try {
      await authStore.logout()
      isAuthenticated.value = false
    } catch (error) {
      throw error
    }
  }

  // Check auth status on initialization
  checkAuth()

  return {
    isAuthenticated,
    checkAuth,
    login,
    logout
  }
} 