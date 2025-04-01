import { defineStore } from 'pinia'
import { bannerService } from '~/services/banner.service'

export const useBannerStore = defineStore('banner', {
  state: () => ({
    banners: [],
    loading: false,
    error: null
  }),

  getters: {
    isLoading: (state) => state.loading,
    hasError: (state) => state.error !== null
  },

  actions: {
    async getBanner() {
      try {
        this.loading = true
        this.error = null
        const response = await bannerService.getBanner()
        this.banners = response.data
        return response
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    }
  }
}) 