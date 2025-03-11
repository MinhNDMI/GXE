import { apiService } from './api.service'
import { API_CONFIG } from '../utils/api.config'
import type { 
  Warehouse, 
  WarehouseCreate, 
  WarehouseUpdate,
  StockMovement,
  StockMovementCreate
} from '../types/api.types'

interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
}

export class WarehouseService {
  private static instance: WarehouseService

  private constructor() {}

  public static getInstance(): WarehouseService {
    if (!WarehouseService.instance) {
      WarehouseService.instance = new WarehouseService()
    }
    return WarehouseService.instance
  }

  public async getWarehouses(params?: Record<string, any>): Promise<PaginatedResponse<Warehouse>> {
    const response = await apiService.get<PaginatedResponse<Warehouse>>(API_CONFIG.endpoints.warehouse.list, params)
    return response.data
  }

  public async getWarehouse(id: number): Promise<Warehouse> {
    const response = await apiService.get<Warehouse>(API_CONFIG.endpoints.warehouse.detail(id))
    return response.data
  }

  public async createWarehouse(data: WarehouseCreate): Promise<Warehouse> {
    const response = await apiService.post<Warehouse>(API_CONFIG.endpoints.warehouse.create, data)
    return response.data
  }

  public async updateWarehouse(id: number, data: WarehouseUpdate): Promise<Warehouse> {
    const response = await apiService.put<Warehouse>(API_CONFIG.endpoints.warehouse.update(id), data)
    return response.data
  }

  public async deleteWarehouse(id: number): Promise<void> {
    await apiService.delete(API_CONFIG.endpoints.warehouse.delete(id))
  }

  public async getWarehouseStock(id: number, params?: Record<string, any>): Promise<PaginatedResponse<StockMovement>> {
    const response = await apiService.get<PaginatedResponse<StockMovement>>(
      API_CONFIG.endpoints.warehouse.stock.list(id),
      params
    )
    return response.data
  }

  public async createStockMovement(id: number, data: StockMovementCreate): Promise<StockMovement> {
    const response = await apiService.post<StockMovement>(
      API_CONFIG.endpoints.warehouse.stock.movement(id),
      data
    )
    return response.data
  }
}

export const warehouseService = WarehouseService.getInstance()

