import { apiService } from './api.service'
import { API_CONFIG } from '../utils/api.config'

export class BannerService {
  static instance = null

  constructor() {}

  static getInstance() {
    if (!BannerService.instance) {
      BannerService.instance = new BannerService()
    }
    return BannerService.instance
  }

  async getBanner(params) {
    const response = await apiService.get(API_CONFIG.endpoints.banner.list, params)
    return response.data
  }
}

export const bannerService = BannerService.getInstance() 