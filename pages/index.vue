<template>
  <div class="container w-full flex flex-col gap-5">
    <section class="banner p-5">
      <div class="banner-content h-[80vh] w-1/2 text-white">
        <h1 class="!text-5xl font-bold mb-10">Histudy Starter is a community for creative people</h1>
        <p>We just don't give our student only lecture but real life experience.</p>
      </div>
    </section>
    <section class="course flex flex-col items-center gap-4 lg:px-10">
      <p class="!text-5xl font-bold py-9">Danh sách khóa học</p>
      <div class="course-list grid grid-cols-1 lg:grid-cols-4 gap-4 w-full">
        <div
          v-for="course in courses"
          :key="course.id"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <NuxtLink :to="`/course/${course.id}`">
            <div class="relative pb-[56.25%]">
              <img
                :src="course.thumbnail || 'https://www.youtube.com/watch?v=FXpIoQ_rT_c'"
                :alt="course.title"
                class="absolute top-0 left-0 w-full h-full object-cover"
              />
            </div>
            <div class="p-4">
              <h2 class="text-xl font-semibold mb-2">{{ course.title }}</h2>
              <p class="text-gray-600 mb-4 line-clamp-2">{{ course.description }}</p>
              <div class="flex justify-between items-center">
                <div class="flex items-center gap-2">
                  <i class="pi pi-book text-gray-500"></i>
                  <span class="text-sm text-gray-500">{{ course.lessonCount }} bài học</span>
                </div>
                <div class="flex items-center gap-2">
                  <span v-if="course.oldPrice" class="text-gray-400 text-sm line-through">
                    ${{ course.oldPrice }}
                  </span>
                  <span class="text-primary font-bold">${{ course.price }}</span>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
    <section class=" gap-4 lg:px-10">Tin tức</section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useBannerStore } from '~/store/modules/banner'
import { useCourseStore } from '~/store/modules/course'


const bannerStore = useBannerStore()
const courseStore = useCourseStore()  
const loading = ref(false)
const error = ref(null)
const courses = ref([])

onMounted(async () => {
  // await fetchBanner()
  await fetchCourses()
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
    console.log('dá', data)
  }
}

const fetchCourses = async () => {
  try {
    loading.value = true
    const response = await courseStore.getCourses()
    courses.value = response.data
  } catch (err) {
    error.value = 'Không thể tải danh sách khóa học'
    toast.add({
      severity: 'error',
      summary: 'Lỗi',
      detail: 'Không thể tải danh sách khóa học',
      life: 3000,
    })
  } finally {
    loading.value = false
  }
}
</script>

<style>
.banner {
  background-image: url('https://rainbowthemes.net/themes/histudy/wp-content/uploads/2024/12/bg-image-19.webp');
  background-position: center;
  background-size: cover;
}
</style>
