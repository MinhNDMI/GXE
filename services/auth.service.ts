import type { LoginPayload, LoginResponse } from '~/types/api.types'

const API_URL = process.env.NUXT_PUBLIC_API_BASE_URL || 'https://api.example.com'

class AuthService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = localStorage.getItem('token')
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  }

  async login(payload: LoginPayload): Promise<LoginResponse> {
    return this.request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  }

  async logout(): Promise<void> {
    return this.request('/auth/logout', {
      method: 'POST',
    })
  }

  async getMe(): Promise<LoginResponse> {
    return this.request<LoginResponse>('/auth/me')
  }

  async refreshToken(): Promise<LoginResponse> {
    return this.request<LoginResponse>('/auth/refresh', {
      method: 'POST',
    })
  }
}

export const authService = new AuthService() 