import { defineStore } from 'pinia'
import { apiService } from '~/services/api.service'
import { API_CONFIG } from '~/utils/api.config'
import { authService } from '~/services/auth.service'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null
  }),

  getters: {
    currentUser: (state) => state.user,
    authToken: (state) => state.token,
    isLoading: (state) => state.loading,
    hasError: (state) => state.error !== null
  },

  actions: {
    async login(credentials) {
      try {
        this.loading = true
        this.error = null
        const response = await authService.login(credentials)
        
        // Lưu thông tin user và token
        this.user = response.data.user
        this.token = response.data.token
        this.isAuthenticated = true
        
        // Lưu token vào localStorage
        localStorage.setItem('token', response.data.token)
        
        return response
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },


    setAuthData(data) {
      this.user = data.user
      this.token = data.token
      this.isAuthenticated = true
      localStorage.setItem('token', data.token)
    },

    initializeAuth() {
      const token = localStorage.getItem('token')
      if (token) {
        this.token = token
        this.isAuthenticated = true
      }
    },
  },
}) 