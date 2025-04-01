import { useAuthStore } from '~/store/modules/auth'

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()
  const isAuthenticated = authStore.isAuthenticated

  // Nếu route yêu cầu xác thực và người dùng chưa đăng nhập
  if (to.meta.requiresAuth && !isAuthenticated) {
    return navigateTo('/login')
  }

  // Nếu route không yêu cầu xác thực và người dùng đã đăng nhập
  if (to.meta.requiresAuth === false && isAuthenticated) {
    return navigateTo('/')
  }
}) 