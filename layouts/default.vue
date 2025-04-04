<template>
  <div class="min-h-screen bg-gray-100">
    <header
      :class="[
        'header bg-white shadow-sm transition-all duration-1600',
        { 'fixed top-0 left-0 right-0 z-50': isScrolled },
      ]"
    >
      <div class="px-2 sm:px-4">
        <div class="flex justify-between items-center h-16">
          <h1 class="cursor-pointer" @click="$router.push('/landing')"><span class="text-xl font-bold">GXE</span></h1>
          <div class="flex items-center gap-4">
            <NuxtLink to="/course" class="ml-4 px-4 py-2 text-sm text-blue-600 hover:text-blue-800">
              Khoá học
            </NuxtLink>
          </div>
          <div class="flex items-center">
            <template v-if="isAuthenticated">
              <button
                @click="handleLogout"
                class="ml-4 px-4 py-2 text-sm text-red-600 hover:text-red-800"
              >
                Logout
              </button>
            </template>
            <template v-else>
              <NuxtLink
                to="/login"
                class="ml-4 px-4 py-2 text-sm text-blue-600 hover:text-blue-800"
              >
                Login
              </NuxtLink>
            </template>
          </div>
        </div>
      </div>
    </header>
    <main class="!w-full !max-w-full">
      <slot />
    </main>
    <footer class="py-12 bg-white border-t border-gray-200">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Logo và Giới thiệu -->
          <div>
            <div class="flex items-center mb-4">
              <!-- <img src="/logo.svg" alt="hiStudy" class="h-8" /> -->
              <span class="text-2xl font-bold ml-2">GXE</span>
            </div>
            <p class="text-gray-600 mb-6"></p>
            <button
              class="whitespace-nowrap flex items-center px-4 py-2 rounded-full bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white transition-colors"
            >
              Contact
              <icons-arrow-up color="#005BE0" class="w-full ml-2" />
            </button>
          </div>

          <!-- Useful Links -->
          <div>
            <h3 class="text-xl font-bold mb-4">Useful Links</h3>
            <ul class="space-y-3">
              <li><a href="#" class="text-gray-600 hover:text-primary">Marketplace</a></li>
              <li><a href="#" class="text-gray-600 hover:text-primary">Gym Coachings</a></li>
              <li><a href="#" class="text-gray-600 hover:text-primary">Kindergarden</a></li>
              <li><a href="#" class="text-gray-600 hover:text-primary">University</a></li>
              <li><a href="#" class="text-gray-600 hover:text-primary">About Us</a></li>
            </ul>
          </div>

          <!-- Our Company -->
          <div>
            <h3 class="text-xl font-bold mb-4">Our Company</h3>
            <ul class="space-y-3">
              <li><a href="#" class="text-gray-600 hover:text-primary">Contact Us</a></li>
              <li><a href="#" class="text-gray-600 hover:text-primary">Technology</a></li>
              <li><a href="#" class="text-gray-600 hover:text-primary">Instructor</a></li>
              <li><a href="#" class="text-gray-600 hover:text-primary">Pricing</a></li>
              <li><a href="#" class="text-gray-600 hover:text-primary">Service</a></li>
            </ul>
          </div>

          <!-- Get Contact -->
          <div>
            <h3 class="text-xl font-bold mb-4">Get Contact</h3>
            <ul class="space-y-3">
              <li class="text-gray-600">Phone: (406) 555-0120</li>
              <li class="text-gray-600">E-mail: rainbow@example.com</li>
              <li class="text-gray-600">Location: North America, USA</li>
            </ul>
            <!-- Social Links -->
            <div class="flex space-x-4 mt-6">
              <a href="#" class="text-gray-600 hover:text-primary">
                <i class="pi pi-facebook"></i>
              </a>
              <a href="#" class="text-gray-600 hover:text-primary">
                <i class="pi pi-twitter"></i>
              </a>
              <a href="#" class="text-gray-600 hover:text-primary">
                <i class="pi pi-linkedin"></i>
              </a>
              <a href="#" class="text-gray-600 hover:text-primary">
                <i class="pi pi-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/store/modules/auth'
import { storeToRefs } from 'pinia'
import { ref, onMounted, onUnmounted } from 'vue'

const authStore = useAuthStore()
const { isAuthenticated } = storeToRefs(authStore)

const isScrolled = ref(false)

const checkScroll = () => {
  // Thay đổi giá trị này (100) để điều chỉnh khoảng cách scroll trước khi fixed
  isScrolled.value = window.scrollY > 150
}

onMounted(() => {
  window.addEventListener('scroll', checkScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll)
})

const handleLogout = async () => {
  try {
    await authStore.logout()
  } catch (error) {
    console.error('Logout failed:', error)
  }
}
</script>

<style scoped>
.header {
  /* Thêm padding cho body khi header fixed để tránh content bị đẩy lên đột ngột */
  &.fixed + * {
    padding-top: 4rem;
  }
}
.router-link-active{
  font-weight: 600;
}
</style>
