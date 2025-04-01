export const storage = {
  getItem(key) {
    if (process.client) {
      return localStorage.getItem(key)
    }
    return null
  },

  setItem(key, value) {
    if (process.client) {
      localStorage.setItem(key, value)
    }
  },

  removeItem(key) {
    if (process.client) {
      localStorage.removeItem(key)
    }
  },

  clear() {
    if (process.client) {
      localStorage.clear()
    }
  }
} 