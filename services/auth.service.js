import { apiService } from './api.service'

class AuthService {
  constructor() {
    if (AuthService.instance) {
      return AuthService.instance
    }
    AuthService.instance = this
  }

  async login(payload) {
    const data = await apiService.post('/auth/login', payload)
    if (data.token) {
      localStorage.setItem('token', data.token)
    }
    return data
  }

  async logout() {
    const data = await apiService.post('/auth/logout')
    localStorage.removeItem('token')
    return data
  }

  async getMe() {
    return apiService.get('/auth/me')
  }

  async refreshToken() {
    const data = await apiService.post('/auth/refresh')
    if (data.token) {
      localStorage.setItem('token', data.token)
    }
    return data
  }
}

export const authService = new AuthService() 