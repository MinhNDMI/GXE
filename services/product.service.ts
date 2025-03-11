import { apiService } from './api.service'
import { API_CONFIG } from '../utils/api.config'
import type { Product, ProductCreate, ProductUpdate, ProductQueryParams, PaginatedResponse } from '../types/api.types'

export class ProductService {
  private static instance: ProductService

  private constructor() {}

  public static getInstance(): ProductService {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService()
    }
    return ProductService.instance
  }

  public async getProducts(params: ProductQueryParams): Promise<PaginatedResponse<Product>> {
    const response = await apiService.get<PaginatedResponse<Product>>(API_CONFIG.endpoints.products.list, params)
    return response.data
  }

  public async getProduct(id: number): Promise<Product> {
    const response = await apiService.get<Product>(API_CONFIG.endpoints.products.detail(id))
    return response.data
  }

  public async createProduct(data: ProductCreate): Promise<Product> {
    const response = await apiService.post<Product>(API_CONFIG.endpoints.products.create, data)
    return response.data
  }

  public async updateProduct(id: number, data: ProductUpdate): Promise<Product> {
    const response = await apiService.put<Product>(API_CONFIG.endpoints.products.update(id), data)
    return response.data
  }

  public async deleteProduct(id: number): Promise<void> {
    await apiService.delete(API_CONFIG.endpoints.products.delete(id))
  }

  public async getCategories(): Promise<string[]> {
    const response = await apiService.get<string[]>(API_CONFIG.endpoints.products.categories)
    return response.data
  }
}

export const productService = ProductService.getInstance() 