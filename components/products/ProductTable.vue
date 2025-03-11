<template>
  <div class="product-table">
    <DataTable
      :headers="headers"
      :items="products"
      :loading="loading"
      :rows-per-page="10"
      :search-value="searchValue"
      @update:search-value="searchValue = $event"
      @update:items-selected="itemsSelected = $event"
      @update:server-options="handleServerOptions"
      :server-items-length="total"
      :server-options="serverOptions"
      :rows-items="[10, 20, 50, 100]"
      :show-index="true"
      alternating
      hover
      buttons-pagination
      searchable
      table-class-name="customize-table"
    >
      <template #item-actions="{ item }">
        <div class="flex space-x-2">
          <button
            class="px-2 py-1 text-sm text-blue-600 hover:text-blue-800"
            @click="editProduct(item)"
          >
            Edit
          </button>
          <button
            class="px-2 py-1 text-sm text-red-600 hover:text-red-800"
            @click="deleteProduct(item.id)"
          >
            Delete
          </button>
        </div>
      </template>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useProductStore } from '~/store/product'
import type { Product } from '~/types/api.types'

const productStore = useProductStore()
const loading = ref(false)
const searchValue = ref('')
const itemsSelected = ref([])
const total = ref(0)

// Server options for pagination
const serverOptions = ref({
  page: 1,
  rowsPerPage: 10,
  sortBy: 'id',
  sortType: 'desc',
})

// Table headers
const headers = [
  { text: 'ID', value: 'id', sortable: true },
  { text: 'Name', value: 'name', sortable: true },
  { text: 'Price', value: 'price', sortable: true },
  { text: 'Stock', value: 'stock', sortable: true },
  { text: 'Category', value: 'category', sortable: true },
  { text: 'Status', value: 'status', sortable: true },
  { text: 'Actions', value: 'actions', sortable: false },
]

// Computed products from store
const products = computed(() => productStore.products)

// Handle server options change
const handleServerOptions = async (options: any) => {
  loading.value = true
  try {
    await productStore.fetchProducts({
      page: options.page,
      limit: options.rowsPerPage,
      sortBy: options.sortBy,
      sortType: options.sortType,
      search: searchValue.value,
    })
    total.value = productStore.total
  } catch (error) {
    console.error('Error fetching products:', error)
  } finally {
    loading.value = false
  }
}

// Edit product
const editProduct = (product: Product) => {
  // Implement edit logic
  console.log('Edit product:', product)
}

// Delete product
const deleteProduct = async (id: number) => {
  if (confirm('Are you sure you want to delete this product?')) {
    try {
      await productStore.deleteProduct(id)
      // Refresh table
      handleServerOptions(serverOptions.value)
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }
}

// Initial load
onMounted(() => {
  // handleServerOptions(serverOptions.value)
})
</script>

<style scoped>
.product-table {
  @apply w-full;
}

:deep(.customize-table) {
  @apply w-full border-collapse;
}

:deep(.customize-table th) {
  @apply bg-gray-100 px-4 py-2 text-left text-sm font-semibold text-gray-600;
}

:deep(.customize-table td) {
  @apply border-b px-4 py-2 text-sm text-gray-700;
}

:deep(.customize-table tr:hover) {
  @apply bg-gray-50;
}

:deep(.customize-table .v3-easy-data-table__table) {
  @apply w-full;
}

:deep(.customize-table .v3-easy-data-table__table th) {
  @apply bg-gray-100;
}

:deep(.customize-table .v3-easy-data-table__table td) {
  @apply border-b;
}

:deep(.customize-table .v3-easy-data-table__table tr:hover) {
  @apply bg-gray-50;
}
</style> 