import { useAuthStore } from '~/store/modules/auth'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

export const useAuth = () => {
  const authStore = useAuthStore()
  const { user, isAuthenticated, loading } = storeToRefs(authStore)

  const login = async (credentials) => {
    return await authStore.login(credentials)
  }

  const register = async (userData) => {
    return await authStore.register(userData)
  }

  const logout = async () => {
    return await authStore.logout()
  }

  const refreshToken = async () => {
    return await authStore.refreshToken()
  }

  const forgotPassword = async (email) => {
    return await authStore.forgotPassword(email)
  }

  const resetPassword = async (data) => {
    return await authStore.resetPassword(data)
  }

  const verifyEmail = async (token) => {
    return await authStore.verifyEmail(token)
  }

  const resendVerification = async (email) => {
    return await authStore.resendVerification(email)
  }

  return {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    refreshToken,
    forgotPassword,
    resetPassword,
    verifyEmail,
    resendVerification,
  }
} 