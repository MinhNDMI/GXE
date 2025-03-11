export const storage = {
  getItem(key: string): string | null {
    if (process.client) {
      return localStorage.getItem(key)
    }
    return null
  },

  setItem(key: string, value: string): void {
    if (process.client) {
      localStorage.setItem(key, value)
    }
  },

  removeItem(key: string): void {
    if (process.client) {
      localStorage.removeItem(key)
    }
  },

  clear(): void {
    if (process.client) {
      localStorage.clear()
    }
  }
} 