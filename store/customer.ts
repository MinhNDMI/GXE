import { defineStore } from 'pinia'
import { customerService } from '../services/customer.service'
import type { Customer, CustomerCreate, CustomerUpdate } from '../types/api.types'

interface CustomerState {
  customers: Customer[]
  currentCustomer: Customer | null
  loading: boolean
  error: string | null
  total: number
  page: number
  limit: number
}

interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
}

export const useCustomerStore = defineStore('customer', {
  state: (): CustomerState => ({
    customers: [],
    currentCustomer: null,
    loading: false,
    error: null,
    total: 0,
    page: 1,
    limit: 10
  }),

  getters: {
    getCustomerById: (state) => (id: number) => {
      return state.customers.find(customer => customer.id === id)
    }
  },

  actions: {
    async fetchCustomers(params?: Record<string, any>) {
      this.loading = true
      this.error = null
      try {
        const response = await customerService.getCustomers(params) as PaginatedResponse<Customer>
        this.customers = response.data
        this.total = response.total
        this.page = response.page
        this.limit = response.limit
      } catch (error: any) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async fetchCustomer(id: number) {
      this.loading = true
      this.error = null
      try {
        this.currentCustomer = await customerService.getCustomer(id)
      } catch (error: any) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async createCustomer(data: CustomerCreate) {
      this.loading = true
      this.error = null
      try {
        const customer = await customerService.createCustomer(data)
        this.customers.push(customer)
        return customer
      } catch (error: any) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateCustomer(id: number, data: CustomerUpdate) {
      this.loading = true
      this.error = null
      try {
        const customer = await customerService.updateCustomer(id, data)
        const index = this.customers.findIndex(c => c.id === id)
        if (index !== -1) {
          this.customers[index] = customer
        }
        if (this.currentCustomer?.id === id) {
          this.currentCustomer = customer
        }
        return customer
      } catch (error: any) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteCustomer(id: number) {
      this.loading = true
      this.error = null
      try {
        await customerService.deleteCustomer(id)
        this.customers = this.customers.filter(c => c.id !== id)
        if (this.currentCustomer?.id === id) {
          this.currentCustomer = null
        }
      } catch (error: any) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    clearError() {
      this.error = null
    }
  }
}) 