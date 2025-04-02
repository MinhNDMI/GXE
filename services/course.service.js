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

  async getCourses(params) {
    const response = await apiService.get(API_CONFIG.endpoints.course.list, params)
    return response.data
  }

  async getDetailCourse(id) {
    const response = await apiService.get(API_CONFIG.endpoints.course.detail(id))
    return response.data
  }

  async createCourse(data) {
    const response = await apiService.post(API_CONFIG.endpoints.course.create, data)
    return response.data
  }

  async updateCourse(id, data) {
    const response = await apiService.put(API_CONFIG.endpoints.course.update(id), data)
    return response.data
  }

  async deleteCourse(id) {
    await apiService.delete(API_CONFIG.endpoints.course.delete(id))
  }

}

export const productService = CourseService.getInstance() 