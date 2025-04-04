<template>
  <div class="course-content">
    <h2 class="text-lg sm:text-xl font-bold mb-2 sm:mb-4">Nội dung khóa học</h2>
    
    <div class="sections space-y-1">
      <div v-for="(section, index) in sections" :key="index" class="section bg-gray-50 rounded-lg">
        <!-- Section header -->
        <div 
          class="section-header p-3 sm:p-4 flex items-center justify-between cursor-pointer hover:bg-gray-100"
          @click="toggleSection(index)"
        >
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-base sm:text-lg font-medium truncate">{{ section.title }}</span>
              <span class="text-xs sm:text-sm text-gray-500 whitespace-nowrap">
                {{ section.completedCount }}/{{ section.lessons.length }} | {{ section.duration }}
              </span>
            </div>
          </div>
          <i :class="['pi text-lg sm:text-xl ml-2', section.isExpanded ? 'pi-chevron-up' : 'pi-chevron-down']"></i>
        </div>

        <!-- Section content -->
        <div v-show="section.isExpanded" class="section-content">
          <div 
            v-for="lesson in section.lessons" 
            :key="lesson.id"
            class="lesson p-2 sm:p-3 border-t border-gray-200 flex items-center gap-2 sm:gap-4 hover:bg-gray-100 cursor-pointer"
            :class="{
              'bg-blue-50': currentLessonId === lesson.id,
              'opacity-50 cursor-not-allowed': !canAccessLesson(lesson)
            }"
            @click="selectLesson(lesson)"
          >
            <!-- Lesson status icon -->
            <div class="status-icon flex items-center justify-center flex-shrink-0">
              <i v-if="isLessonCompleted(lesson.id)" class="pi pi-check-circle text-green-500"></i>
              <i v-else-if="currentLessonId === lesson.id" class="pi pi-play text-blue-500"></i>
              <i v-else-if="canAccessLesson(lesson)" class="pi pi-circle-fill text-gray-300"></i>
              <i v-else class="pi pi-lock text-gray-400"></i>
            </div>

            <!-- Lesson info -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <span class="font-medium truncate" :class="{ 'text-blue-600': currentLessonId === lesson.id }">
                  {{ lesson.title }}
                </span>
              </div>
              <div class="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                <i :class="getLessonTypeIcon(lesson.type)"></i>
                <span class="whitespace-nowrap">{{ lesson.duration }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  currentLessonId: {
    type: Number,
    default: null
  },
  progress: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['select-lesson'])

// Fake data structure
const sections = ref([
  {
    title: '1. Giới thiệu',
    isExpanded: true,
    duration: '07:28',
    completedCount: 3,
    lessons: [
      { id: 1, title: 'Giới thiệu khóa học', duration: '07:28', type: 'video', completed: true },
      { id: 2, title: 'Cài đặt môi trường', duration: '05:15', type: 'text', completed: true },
      { id: 3, title: 'Tổng quan', duration: '03:45', type: 'video', completed: true }
    ]
  },
  {
    title: '2. Biến, comments, built-in',
    isExpanded: false,
    duration: '31:03',
    completedCount: 2,
    lessons: [
      { id: 4, title: 'Sử dụng JavaScript với HTML', duration: '04:33', type: 'video', completed: true },
      { id: 5, title: 'Làm quen với màn thử thách', duration: '01:00', type: 'exercise', completed: true },
      { id: 6, title: 'Bắt đầu với một thử thách nhỏ', duration: '01:27', type: 'exercise', completed: false },
      { id: 7, title: 'Lưu ý khi học lập trình tại F8', duration: '03:00', type: 'video', completed: false }
    ]
  },
  {
    title: '3. Khái niệm và cách sử dụng',
    isExpanded: false,
    duration: '15:49',
    completedCount: 0,
    lessons: [
      { id: 8, title: 'Khái niệm biến và cách sử dụng', duration: '04:06', type: 'video', completed: false },
      { id: 9, title: 'Thực hành sử dụng biến', duration: '01:21', type: 'exercise', completed: false },
      { id: 10, title: 'Cú pháp comments là gì?', duration: '05:36', type: 'video', completed: false }
    ]
  }
])

// Methods
const toggleSection = (index) => {
  sections.value[index].isExpanded = !sections.value[index].isExpanded
}

const isLessonCompleted = (lessonId) => {
  const lesson = findLesson(lessonId)
  return lesson?.completed || false
}

const findLesson = (lessonId) => {
  for (const section of sections.value) {
    const lesson = section.lessons.find(l => l.id === lessonId)
    if (lesson) return lesson
  }
  return null
}

const canAccessLesson = (lesson) => {
  // Tìm bài học trước đó
  let foundCurrent = false
  for (const section of sections.value) {
    for (const l of section.lessons) {
      if (l.id === lesson.id) {
        foundCurrent = true
        break
      }
      // Nếu bài học trước chưa hoàn thành, không cho phép truy cập bài hiện tại
      if (!l.completed && !foundCurrent) {
        return false
      }
    }
    if (foundCurrent) break
  }
  return true
}

const getLessonTypeIcon = (type) => {
  switch (type) {
    case 'video':
      return 'pi pi-play-circle'
    case 'exercise':
      return 'pi pi-pencil'
    case 'text':
      return 'pi pi-file-edit'
    default:
      return 'pi pi-file'
  }
}

const selectLesson = (lesson) => {
  if (canAccessLesson(lesson)) {
    emit('select-lesson', lesson)
  }
}
</script>

<style scoped>
.section {
  border: 1px solid #e5e7eb;
}

.section-header {
  transition: background-color 0.2s;
}

.lesson {
  transition: all 0.2s;
}

.status-icon {
  min-width: 1.25rem;
}

@media (max-width: 640px) {
  .section-header {
    padding: 0.75rem;
  }

  .lesson {
    padding: 0.75rem;
  }

  .status-icon {
    min-width: 1rem;
  }
}
</style> 