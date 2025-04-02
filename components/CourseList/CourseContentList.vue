<template>
  <div class="course-content-list">
    <div class="p-4 border-b">
      <h2 class="text-xl font-bold">Nội dung khóa học</h2>
    </div>
    
    <div class="divide-y">
      <div v-for="lesson in lessons" 
           :key="lesson.id"
           :class="[
             'p-4 cursor-pointer hover:bg-gray-50',
             currentLessonId === lesson.id ? 'bg-gray-100' : '',
             previewOnly ? 'pointer-events-none' : ''
           ]"
           @click="!previewOnly && $emit('select-lesson', lesson)"
      >
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <h3 class="font-medium">{{ lesson.title }}</h3>
            <p class="text-sm text-gray-500">{{ lesson.duration }}</p>
          </div>
          
          <div v-if="!previewOnly" class="ml-4 flex items-center">
            <template v-if="lessonProgress[lesson.id]">
              <i v-if="lessonProgress[lesson.id].progress >= 100" 
                 class="pi pi-check-circle text-green-500 text-lg"></i>
              <span v-else class="text-sm text-gray-500">
                {{ Math.round(lessonProgress[lesson.id].progress) }}%
              </span>
            </template>
            <i v-else class="pi pi-lock text-gray-400"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  lessons: {
    type: Array,
    required: true,
    default: () => []
  },
  currentLessonId: {
    type: String,
    default: null
  },
  previewOnly: {
    type: Boolean,
    default: false
  },
  lessonProgress: {
    type: Object,
    default: () => ({})
  }
})

defineEmits(['select-lesson'])
</script>
