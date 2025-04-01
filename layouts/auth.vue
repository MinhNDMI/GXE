<template>
  <div class="min-h-screen bg-gray-50">
    <div class="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 class="text-center text-3xl font-extrabold text-gray-900">
          GXE
        </h1>
        <p class="mt-2 text-center text-sm text-gray-600">
          Pharmacy Management System
        </p>
      </div>

      <div class="">
          <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false
})
</script> 