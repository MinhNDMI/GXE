import { defineStore } from 'pinia'
import { apiService } from '~/services/api.service'
import { API_CONFIG } from '~/utils/api.config'
import { authService } from '~/services/auth.service'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    loading: false,
    error: null
  }),

  getters: {
    isLoading: (state) => state.loading,
    hasError: (state) => state.error !== null
  },

  actions: {
    async login(credentials) {
      try {
        this.loading = true
        this.error = null
        const response = await authService.login(credentials)
        return response
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

  },
}) 