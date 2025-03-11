import { defineNuxtRouteMiddleware } from 'nuxt/app'
import { useAuthStore } from '~/store/auth'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export default defineNuxtRouteMiddleware(async (to: RouteLocationNormalized) => {
  console.log('=== Auth Middleware Start ===')
  console.log('Current route:', to.path)
  
  const authStore = useAuthStore()
  
  // List of public routes that don't require authentication
  const publicRoutes = ['/login', '/register', '/forgot-password']
  
  // Check if the route is public
  const isPublicRoute = publicRoutes.includes(to.path)
  
  console.log('Route type:', isPublicRoute ? 'Public' : 'Protected')
  
  try {
    // Check authentication status
    const isAuthenticated = await authStore.checkAuth()
    console.log('Authentication status:', isAuthenticated ? 'Authenticated' : 'Not authenticated')
    
    // If there's no user and trying to access protected route
    if (!isAuthenticated && !isPublicRoute) {
      console.log('Access denied: Redirecting to login')
      return navigateTo('/login')
    }
    
    // If there's a user and trying to access login/register
    if (isAuthenticated && isPublicRoute) {
      console.log('Already authenticated: Redirecting to home')
      return navigateTo('/')
    }
  } catch (error) {
    console.error('Auth middleware error:', error)
    // In case of error, redirect to login for safety
    return navigateTo('/login')
  } finally {
    console.log('=== Auth Middleware End ===')
  }
}) 