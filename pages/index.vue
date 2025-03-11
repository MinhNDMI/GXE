<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-semibold text-gray-900">Welcome to PharmaGo</h1>
    <p class="mt-4 text-gray-600">Your pharmacy management system</p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})
</script>
