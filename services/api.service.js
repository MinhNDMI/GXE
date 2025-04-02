const API_URL = process.env.NUXT_PUBLIC_API_BASE_URL || 'http://gxe.test/api-cms'


class ApiService {
  constructor() {
    if (ApiService.instance) {
      return ApiService.instance
    }
    ApiService.instance = this
  }

  async request(endpoint, options = {}) {
    const { params, ...requestOptions } = options
    const url = new URL(`${API_URL}${endpoint}`)
    
    // Add query parameters if they exist
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value))
      })
    }

    // Prepare headers
    const headers = new Headers({
      'Content-Type': 'application/json',
      ...(requestOptions.headers || {})
    })

    // Add auth token if it exists
    const token = localStorage.getItem('token')
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    // Prepare request options
    const finalOptions = {
      ...requestOptions,
      headers,
      credentials: 'include'
    }

    try {
      const response = await fetch(url.toString(), finalOptions)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'An error occurred')
      }

      return data
    } catch (error) {
      console.error('API Request failed:', error)
      throw error
    }
  }

  // HTTP Methods
  async get(endpoint, params) {
    return this.request(endpoint, { method: 'GET', params })
  }

  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  }

  async patch(endpoint, data) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data)
    })
  }

  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE'
    })
  }
}

export const apiService = new ApiService() 