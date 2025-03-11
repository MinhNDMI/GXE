import { apiService } from './api.service'
import { API_CONFIG } from '../utils/api.config'
import type { Order, OrderCreate, OrderUpdate } from '../types/api.types'

interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
}

type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled'

export class OrderService {
  private static instance: OrderService

  private constructor() {}

  public static getInstance(): OrderService {
    if (!OrderService.instance) {
      OrderService.instance = new OrderService()
    }
    return OrderService.instance
  }

  public async getOrders(params?: Record<string, any>): Promise<PaginatedResponse<Order>> {
    const response = await apiService.get<PaginatedResponse<Order>>(API_CONFIG.endpoints.orders.list, params)
    return response.data
  }

  public async getOrder(id: number): Promise<Order> {
    const response = await apiService.get<Order>(API_CONFIG.endpoints.orders.detail(id))
    return response.data
  }

  public async createOrder(data: OrderCreate): Promise<Order> {
    const response = await apiService.post<Order>(API_CONFIG.endpoints.orders.create, data)
    return response.data
  }

  public async updateOrder(id: number, data: OrderUpdate): Promise<Order> {
    const response = await apiService.put<Order>(API_CONFIG.endpoints.orders.update(id), data)
    return response.data
  }

  public async deleteOrder(id: number): Promise<void> {
    await apiService.delete(API_CONFIG.endpoints.orders.delete(id))
  }

  public async updateOrderStatus(id: number, status: OrderStatus): Promise<Order> {
    const response = await apiService.patch<Order>(API_CONFIG.endpoints.orders.updateStatus(id), { status })
    return response.data
  }
}

export const orderService = OrderService.getInstance() 