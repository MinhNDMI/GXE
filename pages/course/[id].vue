<template>
  <div class="min-h-screen bg-gray-100 p-4">
    <!-- Loading state -->
    <div>
      <p class="text-2xl font-bold">Course</p>
    </div>

    <div>
      <!-- Authenticated view -->
      <div class="flex flex-col lg:flex-row gap-4">
        <!-- Video section -->
        <div class="w-full lg:!w-4/5 order-1 lg:order-1">
          <div v-if="currentLesson" class="w-full">
            <div class="plyr__video-embed" id="player">
              <iframe
                :src="getYoutubeEmbedUrl(currentLesson.videoUrl)"
                allowfullscreen
                allowtransparency
                allow="autoplay"
              ></iframe>
            </div>
          </div>
          <div v-else class="flex items-center justify-center h-full text-gray-600 bg-gray-200 rounded-lg p-8">
            <p>Chọn bài học để bắt đầu</p>
          </div>
        </div>

        <!-- Lesson list -->
        <div class="w-full lg:!w-1/5 bg-white rounded-lg shadow-sm order-2 lg:order-2 max-h-[calc(100vh-2rem)] overflow-y-auto">
          <CourseContentList 
            :current-lesson-id="currentLesson?.id"
            :progress="lessonProgress"
            @select-lesson="handleLessonSelect"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/store/modules/auth'
import { useCourseStore } from '~/store/modules/course'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'
import Plyr from 'plyr'
import 'plyr/dist/plyr.css'

const router = useRouter()
const authStore = useAuthStore()
const courseStore = useCourseStore()
const toast = useToast()

const { isAuthenticated } = storeToRefs(authStore)
const course = ref(null)
const currentLesson = ref({
  id: 1,
  title: 'Test Lesson',
  videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
})
const lessonProgress = ref({})
const loading = ref(false)
const error = ref(null)
const player = ref(null)

// Computed property để lấy YouTube ID
const getYoutubeId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

// Tạo URL embed cho YouTube
const getYoutubeEmbedUrl = (url) => {
  const videoId = getYoutubeId(url)
  return `https://www.youtube.com/embed/${videoId}?origin=http://localhost:5173&enablejsapi=1&widgetid=1`
}

// Khởi tạo video player
const initializePlayer = () => {
  if (currentLesson.value) {
    try {
      if (player.value) {
        player.value.destroy()
      }

      const options = {
        controls: [
          'play-large',
          'play',
          'progress',
          'current-time',
          'mute',
          'volume',
          'captions',
          'settings',
          'pip',
          'airplay',
          'fullscreen'
        ],
        youtube: {
          noCookie: true,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3
        }
      }

      player.value = new Plyr('#player', options)

      player.value.on('timeupdate', () => {
        const currentTime = player.value.currentTime
        const duration = player.value.duration
        const progress = (currentTime / duration) * 100
        saveProgress(currentTime, progress)
      })

      player.value.on('ended', () => {
        console.log('Video ended')
        handleVideoComplete()
      })
    } catch (error) {
      console.error('Error initializing video player:', error)
    }
  }
}

// Lưu tiến độ xem
const saveProgress = async (currentTime, progress) => {
  if (currentLesson.value) {
    try {
      await courseStore.saveProgress({
        lessonId: currentLesson.value.id,
        courseId: course.value?.id,
        progress,
        currentTime
      })
    } catch (error) {
      console.error('Error saving progress:', error)
    }
  }
}

// Xử lý khi video kết thúc
const handleVideoComplete = async () => {
  if (currentLesson.value) {
    try {
      await courseStore.markLessonComplete(currentLesson.value.id)
      toast.add({
        severity: 'success',
        summary: 'Hoàn thành',
        detail: 'Bài học đã hoàn thành!',
        life: 3000
      })

      // Find and switch to next lesson
      const currentIndex = course.value?.lessons?.findIndex(
        lesson => lesson.id === currentLesson.value.id
      )
      
      if (currentIndex < course.value?.lessons?.length - 1) {
        currentLesson.value = course.value.lessons[currentIndex + 1]
      }
    } catch (error) {
      console.error('Error marking lesson as complete:', error)
    }
  }
}

const handleLessonSelect = (lesson) => {
  currentLesson.value = lesson
  nextTick(() => {
    initializePlayer()
  })
}

const navigateToLogin = () => {
  router.push('/login')
}

const fetchCourseData = async () => {
  try {
    loading.value = true
    const { id } = useRoute().params
    const response = await courseStore.getCourseById(id)
    course.value = response.data
    
    if (isAuthenticated.value && course.value?.lessons?.length > 0) {
      currentLesson.value = course.value.lessons[0]
      await loadProgress()
    }
  } catch (err) {
    error.value = 'Không thể tải thông tin khóa học'
    toast.add({
      severity: 'error',
      summary: 'Lỗi',
      detail: 'Không thể tải thông tin khóa học',
      life: 3000
    })
  } finally {
    loading.value = false
  }
}

const loadProgress = async () => {
  try {
    const progress = await courseStore.getProgress(course.value.id)
    lessonProgress.value = progress
  } catch (err) {
    console.error('Failed to load progress:', err)
  }
} 

onMounted(async () => {
  await fetchCourseData()
  await nextTick()
  initializePlayer()
})

onBeforeUnmount(() => {
  if (player.value) {
    player.value.destroy()
  }
})

// Watch currentLesson để khởi tạo lại player khi bài học thay đổi
watch(currentLesson, () => {
  nextTick(() => {
    initializePlayer()
  })
})
</script>

<style>
/* Custom CSS cho Plyr */
.plyr {
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
  position: relative;
}

.plyr--video {
  background: #000;
  border-radius: 0.5rem;
  overflow: hidden;
}

.plyr__video-embed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.plyr__video-embed iframe {
  width: 100%;
  height: 100%;
  border: 0;
  position: absolute;
  top: 0;
  left: 0;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .plyr {
    min-height: 300px;
  }
}

@media (max-width: 640px) {
  .plyr {
    min-height: 240px;
  }
}
</style>

