import { API_CONFIG, getApiUrl } from './api.config'
import { useMainStore } from '../store'

interface RequestOptions extends RequestInit {
  params?: Record<string, any>
  data?: any
}

type StoreAction = 'increment' // Add more actions as needed

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

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.message || 'An error occurred')
    }
    return response.json()
  }

  public async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const { params, data, ...restOptions } = options

    // Construct URL with query parameters if they exist
    const url = new URL(getApiUrl(endpoint))
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value))
      })
    }

    // Prepare headers
    const headers = {
      ...API_CONFIG.defaultHeaders,
      ...options.headers,
    }

    // Prepare request options
    const requestOptions: RequestInit = {
      ...restOptions,
      headers,
      credentials: API_CONFIG.withCredentials ? 'include' : 'same-origin',
    }

    // Add body if data exists
    if (data) {
      requestOptions.body = JSON.stringify(data)
    }

    try {
      const response = await fetch(url.toString(), requestOptions)
      return this.handleResponse<T>(response)
    } catch (error) {
      console.error('API Request failed:', error)
      throw error
    }
  }

  // HTTP Methods
  public async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET', params })
  }

  public async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, { method: 'POST', data })
  }

  public async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, { method: 'PUT', data })
  }

  public async patch<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, { method: 'PATCH', data })
  }

  public async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }
}

// Create a composable for using the API service with Pinia store
export const useApi = () => {
  const api = ApiService.getInstance()

  return {
    api,
    // Helper methods for common operations
    async fetchWithStore<T>(
      endpoint: string,
      storeAction: StoreAction,
      options: RequestOptions = {}
    ) {
      try {
        const response = await api.request<T>(endpoint, options)
        // If store action is provided, dispatch it with the response
        if (storeAction) {
          const store = useMainStore()
          if (storeAction === 'increment') {
            store.increment()
          }
          // Add more action handlers as needed
        }
        return response
      } catch (error) {
        console.error('Store operation failed:', error)
        throw error
      }
    }
  }
}

// Export the API service instance
export const apiService = ApiService.getInstance() 