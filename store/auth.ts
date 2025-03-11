import { defineStore } from 'pinia'
import { authService } from '~/services/auth.service'
import type { LoginPayload, LoginResponse } from '~/types/api.types'

interface AuthState {
  user: LoginResponse['data']['user'] | null
  token: string | null
  loading: boolean
  error: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
    loading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    setToken(token: string) {
      this.token = token
      localStorage.setItem('token', token)
    },

    clearToken() {
      this.token = null
      localStorage.removeItem('token')
    },

    async login(payload: LoginPayload): Promise<LoginResponse> {
      this.loading = true
      this.error = null
      try {
        const response = await authService.login(payload)
        this.user = response.data.user
        this.setToken(response.data.token)
        return response
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Login failed'
        throw error
      } finally {
        this.loading = false
      }
    },

    async logout() {
      this.loading = true
      this.error = null
      try {
        await authService.logout()
        this.user = null
        this.clearToken()
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Logout failed'
        throw error
      } finally {
        this.loading = false
      }
    },

    async checkAuth() {
      this.loading = true
      this.error = null
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          this.user = null
          this.clearToken()
          return false
        }

        const response = await authService.getMe()
        this.user = response.data.user
        this.setToken(response.data.token)
        return true
      } catch (error) {
        this.user = null
        this.clearToken()
        this.error = error instanceof Error ? error.message : 'Auth check failed'
        return false
      } finally {
        this.loading = false
      }
    },

    async refreshToken() {
      try {
        const response = await authService.refreshToken()
        this.setToken(response.data.token)
        return response
      } catch (error) {
        this.logout()
        throw error
      }
    },
  },
}) 