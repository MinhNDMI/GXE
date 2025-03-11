import { defineStore } from 'pinia'
import { productService } from '~/services/product.service'
import type { Product, ProductQueryParams, PaginatedResponse } from '~/types/api.types'

interface ProductState {
  products: Product[]
  total: number
  loading: boolean
  error: string | null
}

export const useProductStore = defineStore('product', {
  state: (): ProductState => ({
    products: [],
    total: 0,
    loading: false,
    error: null,
  }),

  getters: {
    getProductById: (state) => (id: number) => {
      return state.products.find(product => product.id === id)
    },
  },

  actions: {
    async fetchProducts(params: ProductQueryParams) {
      this.loading = true
      this.error = null
      try {
        const response = await productService.getProducts(params)
        this.products = response.data
        this.total = response.total
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to fetch products'
        throw error
      } finally {
        this.loading = false
      }
    },

    async createProduct(product: Omit<Product, 'id'>) {
      this.loading = true
      this.error = null
      try {
        const response = await productService.createProduct(product)
        this.products.push(response)
        return response
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to create product'
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateProduct(id: number, product: Partial<Product>) {
      this.loading = true
      this.error = null
      try {
        const response = await productService.updateProduct(id, product)
        const index = this.products.findIndex(p => p.id === id)
        if (index !== -1) {
          this.products[index] = response
        }
        return response
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to update product'
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteProduct(id: number) {
      this.loading = true
      this.error = null
      try {
        await productService.deleteProduct(id)
        this.products = this.products.filter(p => p.id !== id)
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to delete product'
        throw error
      } finally {
        this.loading = false
      }
    },
  },
}) 