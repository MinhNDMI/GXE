<template>
  <div class="container">
    <section class="banner">
      <div class="banner-content">
        <h1>This is banner</h1>
      </div>
    </section>
    <section class="course flex flex-col items-center gap-4 lg:px-10">
      <p class="text-2xl font-bold">Danh sách khóa học</p>
      <div class="course-list grid grid-cols-1 lg:grid-cols-4 gap-4 w-full">
        <div class="course-item min-w-[295px] bg-white rounded-lg p-4 flex flex-col gap-3 justify-center">
          <div class="w-full h-[172px] ">
            <img src="https://via.placeholder.com/150" alt="">
          </div>
          <p class="text-sm font-medium">Khóa học 1</p>
          <Rating/>
          <div class="flex gap-4 items-center">
            <p class="text-gray-1 text-sm">Lesson</p>
            <p class="text-gray-1 text-sm">Students</p>
          </div>
          <p class="text-gray-1 text-sm">description</p>
          <div class="flex gap-4 items-center">
            <p class="text-gray-1 text-lg font-bold line-through">$160.00</p>
            <p class="text-secondary text-lg font-bold">$44.00</p>
          </div>
        </div>
      </div>
    </section>
    <section>Tin tức</section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useBannerStore } from '~/store/modules/banner'

const bannerStore = useBannerStore()
const loading = ref(false)
const error = ref(null)

onMounted(async () => {
  await fetchBanner()
})

// Cách 2: Hoặc tạo function riêng để fetch data
const fetchBanner = async () => {
  try {
    loading.value = true
    const { data } = await bannerStore.getBanner()
    return data
  } catch (err) {
    error.value = err.message
    console.error('Failed to fetch banner:', err)
  } finally {
    loading.value = false
  }
}
</script>
