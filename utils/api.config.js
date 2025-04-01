// API Configuration
export const API_CONFIG = {
  // Base URL for API calls
  baseURL: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:8000',
  
  // API endpoints
  endpoints: {
    auth: {
      login: '/api/v1/auth/login',
      register: '/api/v1/auth/register',
      logout: '/api/v1/auth/logout',
      refresh: '/api/v1/auth/refresh-token',
      forgotPassword: '/api/v1/auth/forgot-password',
      resetPassword: '/api/v1/auth/reset-password',
      verifyEmail: '/api/v1/auth/verify-email',
      resendVerification: '/api/v1/auth/resend-verification'
    },
    user: {
      profile: '/api/v1/user/profile',
      updateProfile: '/api/v1/user/profile/update',
      changePassword: '/api/v1/user/change-password'
    },
    course: {
      list: '/api/v1/products',
      create: '/api/v1/products',
      update: (id) => `/api/v1/products/${id}`,
      delete: (id) => `/api/v1/products/${id}`,
    },
    banner: {
      list: '/api/news/list',
    },
  },
  
  // Default headers
  defaultHeaders: {
    'Content-Type': 'application/json',
  },
  
  // Timeout for API calls (in milliseconds)
  timeout: 10000,
  
  // Whether to include credentials in requests
  withCredentials: true,

  // Retry configuration
  retry: {
    maxAttempts: 3,
    delay: 1000
  }
}

// Helper function to get full URL for an endpoint
export const getApiUrl = (endpoint) => {
  console.log('====================================');
  console.log(API_CONFIG.baseURL);
  console.log('====================================');
  return `${API_CONFIG.baseURL}${endpoint}`
}

// Export default configuration
export default API_CONFIG 