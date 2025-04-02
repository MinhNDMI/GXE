<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Danh sách khóa học</h1>
    
    <!-- Loading state -->
    <div v-if="loading" class="flex justify-center">
      <ProgressSpinner />
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="text-red-500 text-center">
      {{ error }}
    </div>

    <!-- Course list -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="course in courses" 
           :key="course.id" 
           class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <NuxtLink :to="`/course/${course.id}`">
          <div class="relative pb-[56.25%]">
            <img :src="course.thumbnail || 'https://www.youtube.com/watch?v=FXpIoQ_rT_c'" 
                 :alt="course.title"
                 class="absolute top-0 left-0 w-full h-full object-cover">
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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCourseStore } from '~/store/modules/course'
import { useToast } from 'primevue/usetoast'

const courseStore = useCourseStore()
const toast = useToast()

const courses = ref([])
const loading = ref(false)
const error = ref(null)

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
      life: 3000
    })
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchCourses()
})
</script> 