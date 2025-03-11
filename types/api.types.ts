import type { ApiResponse } from './common.types'

export interface User {
  id: number
  name: string
  email: string
  phone: string
  role: string
  created_at: string
  updated_at: string
}

export interface LoginResponse {
  data: {
    user: User
    token: string
  }
  message: string
  status: number
}

export interface LoginPayload {
  phone: string
  password: string
}

export interface ApiError {
  message: string
  status: number
  errors?: Record<string, string[]>
}

export interface Product {
  id: number
  name: string
  price: number
  stock: number
  category: string
  status: string
  description?: string
  createdAt?: string
  updatedAt?: string
}

export interface ProductQueryParams {
  page?: number
  limit?: number
  sortBy?: string
  sortType?: 'asc' | 'desc'
  search?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
}

export interface ProductCreate {
  name: string
  description: string
  price: number
  sku: string
  category: string
  unit: string
}

export interface ProductUpdate extends Partial<ProductCreate> {
  status?: 'active' | 'inactive'
}

export interface Customer {
  id: number
  name: string
  email: string
  phone: string
  address: string
  type: 'retail' | 'wholesale'
  status: 'active' | 'inactive'
  createdAt: string
  updatedAt: string
}

export interface CustomerCreate {
  name: string
  email: string
  phone: string
  address: string
  type: 'retail' | 'wholesale'
}

export interface CustomerUpdate extends Partial<CustomerCreate> {
  status?: 'active' | 'inactive'
}

export interface OrderItem {
  id: number
  orderId: number
  productId: number
  quantity: number
  price: number
  total: number
  product: Product
}

export interface Order {
  id: number
  customerId: number
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
  total: number
  note?: string
  createdAt: string
  updatedAt: string
  customer: Customer
  items: OrderItem[]
}

export interface OrderCreate {
  customerId: number
  items: {
    productId: number
    quantity: number
  }[]
  note?: string
}

export interface OrderUpdate {
  status?: 'pending' | 'processing' | 'completed' | 'cancelled'
  note?: string
}

export interface Warehouse {
  id: number
  name: string
  address: string
  capacity: number
  status: 'active' | 'inactive'
  createdAt: string
  updatedAt: string
}

export interface WarehouseCreate {
  name: string
  address: string
  capacity: number
}

export interface WarehouseUpdate extends Partial<WarehouseCreate> {
  status?: 'active' | 'inactive'
}

export interface StockMovement {
  id: number
  warehouseId: number
  productId: number
  type: 'in' | 'out'
  quantity: number
  note?: string
  createdAt: string
  warehouse: Warehouse
  product: Product
}

export interface StockMovementCreate {
  warehouseId: number
  productId: number
  type: 'in' | 'out'
  quantity: number
  note?: string
} 