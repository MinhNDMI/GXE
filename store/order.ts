import { defineStore } from 'pinia'
import { orderService } from '../services/order.service'
import type { Order, OrderCreate, OrderUpdate } from '../types/api.types'

interface OrderState {
  orders: Order[]
  currentOrder: Order | null
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

type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled'

export const useOrderStore = defineStore('order', {
  state: (): OrderState => ({
    orders: [],
    currentOrder: null,
    loading: false,
    error: null,
    total: 0,
    page: 1,
    limit: 10
  }),

  getters: {
    getOrderById: (state) => (id: number) => {
      return state.orders.find(order => order.id === id)
    }
  },

  actions: {
    async fetchOrders(params?: Record<string, any>) {
      this.loading = true
      this.error = null
      try {
        const response = await orderService.getOrders(params) as PaginatedResponse<Order>
        this.orders = response.data
        this.total = response.total
        this.page = response.page
        this.limit = response.limit
      } catch (error: any) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async fetchOrder(id: number) {
      this.loading = true
      this.error = null
      try {
        this.currentOrder = await orderService.getOrder(id)
      } catch (error: any) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async createOrder(data: OrderCreate) {
      this.loading = true
      this.error = null
      try {
        const order = await orderService.createOrder(data)
        this.orders.push(order)
        return order
      } catch (error: any) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateOrder(id: number, data: OrderUpdate) {
      this.loading = true
      this.error = null
      try {
        const order = await orderService.updateOrder(id, data)
        const index = this.orders.findIndex(o => o.id === id)
        if (index !== -1) {
          this.orders[index] = order
        }
        if (this.currentOrder?.id === id) {
          this.currentOrder = order
        }
        return order
      } catch (error: any) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteOrder(id: number) {
      this.loading = true
      this.error = null
      try {
        await orderService.deleteOrder(id)
        this.orders = this.orders.filter(o => o.id !== id)
        if (this.currentOrder?.id === id) {
          this.currentOrder = null
        }
      } catch (error: any) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateOrderStatus(id: number, status: OrderStatus) {
      this.loading = true
      this.error = null
      try {
        const order = await orderService.updateOrderStatus(id, status)
        const index = this.orders.findIndex(o => o.id === id)
        if (index !== -1) {
          this.orders[index] = order
        }
        if (this.currentOrder?.id === id) {
          this.currentOrder = order
        }
        return order
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