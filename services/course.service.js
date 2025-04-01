import { apiService } from './api.service'
import { API_CONFIG } from '../utils/api.config'

export class CourseService {
  static instance = null

  constructor() {}

  static getInstance() {
    if (!CourseService.instance) {
      CourseService.instance = new CourseService()
    }
    return CourseService.instance
  }

  async getProducts(params) {
    const response = await apiService.get(API_CONFIG.endpoints.products.list, params)
    return response.data
  }

  async getProduct(id) {
    const response = await apiService.get(API_CONFIG.endpoints.products.detail(id))
    return response.data
  }

  async createProduct(data) {
    const response = await apiService.post(API_CONFIG.endpoints.products.create, data)
    return response.data
  }

  async updateProduct(id, data) {
    const response = await apiService.put(API_CONFIG.endpoints.products.update(id), data)
    return response.data
  }

  async deleteProduct(id) {
    await apiService.delete(API_CONFIG.endpoints.products.delete(id))
  }

  async getCategories() {
    const response = await apiService.get(API_CONFIG.endpoints.products.categories)
    return response.data
  }
}

export const productService = CourseService.getInstance() 