<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Loading state -->
    <div>
      <h1>Course</h1>
    </div>

    <template>
      <!-- Guest view -->
      <!-- <div v-if="!isAuthenticated" class="container mx-auto px-4 py-8">
        <div class="bg-white rounded-lg shadow-md p-6">
          <h1 class="text-2xl font-bold mb-6">{{ course?.title }}</h1>
          <p class="text-gray-600 mb-8">{{ course?.description }}</p>
          
          <div class="mb-8">
            <h2 class="text-xl font-semibold mb-4">Nội dung khóa học</h2>
            <CourseList-CourseContentList 
              :lessons="course?.lessons || []" 
              preview-only 
            />
          </div>

          <div class="text-center">
            <Button 
              label="Đăng nhập để học" 
              icon="pi pi-sign-in" 
              @click="navigateToLogin" 
            />
          </div>
        </div>
      </div> -->

      <!-- Authenticated view -->
      <div class="flex h-screen">
        <!-- Video section (80%) -->
        <div class="w-4/5 bg-black">
          <div v-if="currentLesson" class="h-full">
            <video
              ref="videoPlayer"
              class="video-js vjs-default-skin vjs-big-play-centered h-full w-full"
              controls
              preload="auto"
              data-setup='{
                "techOrder": ["youtube"],
                "sources": [{
                  "type": "video/youtube",
                  "src": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                }],
                "youtube": {
                  "iv_load_policy": 3,
                  "modestbranding": 1,
                  "origin": "http://localhost:5173"
                }
              }'
            ></video>
          </div>
          <div v-else class="flex items-center justify-center h-full text-white">
            <p>Chọn bài học để bắt đầu</p>
          </div>
        </div>

        <!-- Lesson list (20%) -->
        <div class="w-1/5 bg-white overflow-y-auto">
          <!-- <CourseContentList 
            :lessons="course?.lessons || []"
            :current-lesson-id="currentLesson?.id"
            :progress="lessonProgress"
            @select-lesson="handleLessonSelect"
          /> -->
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/store/modules/auth'
import { useCourseStore } from '~/store/modules/course'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import 'videojs-youtube'

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
const videoPlayer = ref(null)
const minWatchPercentage = 80

// Computed property để lấy YouTube ID
const getYoutubeId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

// Khởi tạo video player
const initializePlayer = () => {
  if (currentLesson.value) {
    const videoId = getYoutubeId(currentLesson.value.videoUrl)
    const options = {
      techOrder: ['youtube'],
      autoplay: false,
      controls: true,
      responsive: true,
      fluid: true,
      sources: [{
        type: 'video/youtube',
        src: `https://www.youtube.com/watch?v=${videoId}`
      }],
      youtube: {
        iv_load_policy: 3,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        origin: 'http://localhost:5173',
        customVars: {
          wmode: 'transparent'
        }
      }
    }

    if (player.value) {
      player.value.dispose()
    }

    try {
      player.value = videojs(videoPlayer.value, options)
      
      player.value.ready(function() {
        console.log('Player Ready')
        
        this.on('timeupdate', () => {
          const currentTime = this.currentTime()
          const duration = this.duration()
          const progress = (currentTime / duration) * 100
          saveProgress(currentTime, progress)
        })

        this.on('ended', () => {
          console.log('Video ended')
          handleVideoComplete()
        })
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
        courseId: course.value.id,
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
      const currentIndex = course.value.lessons.findIndex(
        lesson => lesson.id === currentLesson.value.id
      )
      
      if (currentIndex < course.value.lessons.length - 1) {
        currentLesson.value = course.value.lessons[currentIndex + 1]
      }
    } catch (error) {
      console.error('Error marking lesson as complete:', error)
    }
  }
}

const handleLessonSelect = (lesson) => {
  currentLesson.value = lesson
  if (player.value) {
    player.value.src({ type: 'video/mp4', src: lesson.videoUrl })
  }
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
  
  if (videoPlayer.value) {
    const options = {
      techOrder: ['youtube'],
      autoplay: false,
      controls: true,
      sources: [{
        type: 'video/youtube',
        src: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      }],
      youtube: {
        iv_load_policy: 3,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        origin: 'http://localhost:5173',
        customVars: {
          wmode: 'transparent'
        }
      }
    }
    
    try {
      player.value = videojs(videoPlayer.value, options)
    } catch (error) {
      console.error('Error initializing video player:', error)
    }
  }
})

onBeforeUnmount(() => {
  if (player.value) {
    player.value.dispose()
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
/* Custom CSS cho video player */
.video-js {
  width: 100%;
  height: 100%;
  min-height: 480px;
}

.vjs-default-skin {
  /* Tùy chỉnh giao diện player */
  --vjs-theme-color: #00a0d6;
}

.vjs-big-play-centered .vjs-big-play-button {
  /* Tùy chỉnh nút play chính giữa */
  background-color: rgba(0, 160, 214, 0.8);
  border-radius: 50%;
  border: none;
}
</style>

