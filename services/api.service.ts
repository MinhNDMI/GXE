import { API_CONFIG } from '../utils/api.config'
import type { ApiResponse, ApiError } from '../types/common.types'

interface RequestOptions extends RequestInit {
  params?: Record<string, any>
}

class ApiService {
  private static instance: ApiService
  private baseURL: string

  private constructor() {
    this.baseURL = API_CONFIG.baseURL
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService()
    }
    return ApiService.instance
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const data = await response.json()

    if (!response.ok) {
      const error: ApiError = {
        message: data.message || 'An error occurred',
        status: response.status,
        errors: data.errors
      }
      throw error
    }

    return {
      data,
      message: data.message,
      status: response.status
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const { params, ...requestOptions } = options
    const url = new URL(`${this.baseURL}${endpoint}`)
    
    // Add query parameters if they exist
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value))
      })
    }

    // Prepare headers
    const headers = new Headers({
      ...API_CONFIG.defaultHeaders,
      ...(requestOptions.headers || {})
    })

    // Add auth token if it exists
    const token = localStorage.getItem('token')
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    // Prepare request options
    const finalOptions: RequestInit = {
      ...requestOptions,
      headers,
      credentials: API_CONFIG.withCredentials ? 'include' : 'same-origin',
    }

    try {
      const response = await fetch(url.toString(), finalOptions)
      return this.handleResponse<T>(response)
    } catch (error) {
      console.error('API Request failed:', error)
      throw error
    }
  }

  // HTTP Methods
  public async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET', params })
  }

  public async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }

  public async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }

  public async patch<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }

  public async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }
}

export const apiService = ApiService.getInstance() 