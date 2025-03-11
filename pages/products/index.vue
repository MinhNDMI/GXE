<template>
  <div class="container mx-auto px-4 py-8">
    <div class="mb-6 flex justify-between items-center">
      <h1 class="text-2xl font-semibold text-gray-900">Products</h1>
      <button
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        @click="createProduct"
      >
        Add Product
      </button>
    </div>

    <ProductTable />
  </div>
</template>

<script setup lang="ts">
const createProduct = () => {
  // Implement create product logic
  console.log('Create product')
}
</script> 