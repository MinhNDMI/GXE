// API Configuration
export const API_CONFIG = {
  // Base URL for API calls
  baseURL: process.env.NUXT_PUBLIC_API_BASE_URL || 'https://api.pharmago.asia',
  
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
    products: {
      list: '/api/v1/products',
      create: '/api/v1/products',
      update: (id: number) => `/api/v1/products/${id}`,
      delete: (id: number) => `/api/v1/products/${id}`,
      detail: (id: number) => `/api/v1/products/${id}`,
      categories: '/api/v1/products/categories'
    },
    customers: {
      list: '/api/v1/customers',
      create: '/api/v1/customers',
      update: (id: number) => `/api/v1/customers/${id}`,
      delete: (id: number) => `/api/v1/customers/${id}`,
      detail: (id: number) => `/api/v1/customers/${id}`
    },
    orders: {
      list: '/api/v1/orders',
      create: '/api/v1/orders',
      update: (id: number) => `/api/v1/orders/${id}`,
      delete: (id: number) => `/api/v1/orders/${id}`,
      detail: (id: number) => `/api/v1/orders/${id}`,
      updateStatus: (id: number) => `/api/v1/orders/${id}/status`
    },
    warehouse: {
      list: '/api/v1/warehouses',
      create: '/api/v1/warehouses',
      update: (id: number) => `/api/v1/warehouses/${id}`,
      delete: (id: number) => `/api/v1/warehouses/${id}`,
      detail: (id: number) => `/api/v1/warehouses/${id}`,
      stock: {
        list: (id: number) => `/api/v1/warehouses/${id}/stock`,
        movement: (id: number) => `/api/v1/warehouses/${id}/stock/movement`
      }
    }
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
export const getApiUrl = (endpoint: string): string => {
  console.log('====================================');
  console.log(API_CONFIG.baseURL);
  console.log('====================================');
  return `${API_CONFIG.baseURL}${endpoint}`
}

// Export default configuration
export default API_CONFIG 