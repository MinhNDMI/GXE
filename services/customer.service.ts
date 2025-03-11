import { apiService } from './api.service'
import { API_CONFIG } from '../utils/api.config'
import type { Customer, CustomerCreate, CustomerUpdate } from '../types/api.types'

interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
}

export class CustomerService {
  private static instance: CustomerService

  private constructor() {}

  public static getInstance(): CustomerService {
    if (!CustomerService.instance) {
      CustomerService.instance = new CustomerService()
    }
    return CustomerService.instance
  }

  public async getCustomers(params?: Record<string, any>): Promise<PaginatedResponse<Customer>> {
    const response = await apiService.get<PaginatedResponse<Customer>>(API_CONFIG.endpoints.customers.list, params)
    return response.data
  }

  public async getCustomer(id: number): Promise<Customer> {
    const response = await apiService.get<Customer>(API_CONFIG.endpoints.customers.detail(id))
    return response.data
  }

  public async createCustomer(data: CustomerCreate): Promise<Customer> {
    const response = await apiService.post<Customer>(API_CONFIG.endpoints.customers.create, data)
    return response.data
  }

  public async updateCustomer(id: number, data: CustomerUpdate): Promise<Customer> {
    const response = await apiService.put<Customer>(API_CONFIG.endpoints.customers.update(id), data)
    return response.data
  }

  public async deleteCustomer(id: number): Promise<void> {
    await apiService.delete(API_CONFIG.endpoints.customers.delete(id))
  }
}

export const customerService = CustomerService.getInstance() 