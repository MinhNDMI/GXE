import { defineStore } from 'pinia'
import { warehouseService } from '../services/warehouse.service'
import type { 
  Warehouse, 
  WarehouseCreate, 
  WarehouseUpdate,
  StockMovement,
  StockMovementCreate
} from '../types/api.types'

interface WarehouseState {
  warehouses: Warehouse[]
  currentWarehouse: Warehouse | null
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

export const useWarehouseStore = defineStore('warehouse', {
  state: (): WarehouseState => ({
    warehouses: [],
    currentWarehouse: null,
    loading: false,
    error: null,
    total: 0,
    page: 1,
    limit: 10
  }),

  getters: {
    getWarehouseById: (state) => (id: number) => {
      return state.warehouses.find(warehouse => warehouse.id === id)
    }
  },

  actions: {
    async fetchWarehouses(params?: Record<string, any>) {
      this.loading = true
      this.error = null
      try {
        const response = await warehouseService.getWarehouses(params) as PaginatedResponse<Warehouse>
        this.warehouses = response.data
        this.total = response.total
        this.page = response.page
        this.limit = response.limit
      } catch (error: any) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async fetchWarehouse(id: number) {
      this.loading = true
      this.error = null
      try {
        this.currentWarehouse = await warehouseService.getWarehouse(id)
      } catch (error: any) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async createWarehouse(data: WarehouseCreate) {
      this.loading = true
      this.error = null
      try {
        const warehouse = await warehouseService.createWarehouse(data)
        this.warehouses.push(warehouse)
        return warehouse
      } catch (error: any) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateWarehouse(id: number, data: WarehouseUpdate) {
      this.loading = true
      this.error = null
      try {
        const warehouse = await warehouseService.updateWarehouse(id, data)
        const index = this.warehouses.findIndex(w => w.id === id)
        if (index !== -1) {
          this.warehouses[index] = warehouse
        }
        if (this.currentWarehouse?.id === id) {
          this.currentWarehouse = warehouse
        }
        return warehouse
      } catch (error: any) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteWarehouse(id: number) {
      this.loading = true
      this.error = null
      try {
        await warehouseService.deleteWarehouse(id)
        this.warehouses = this.warehouses.filter(w => w.id !== id)
        if (this.currentWarehouse?.id === id) {
          this.currentWarehouse = null
        }
      } catch (error: any) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchWarehouseStock(id: number, params?: Record<string, any>) {
      this.loading = true
      this.error = null
      try {
        const stock = await warehouseService.getWarehouseStock(id, params)
        return stock
      } catch (error: any) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async createStockMovement(id: number, data: StockMovementCreate) {
      this.loading = true
      this.error = null
      try {
        const movement = await warehouseService.createStockMovement(id, data)
        return movement
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