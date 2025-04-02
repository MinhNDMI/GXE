import { defineStore } from 'pinia'
import { apiService } from '~/services/api.service'
import { API_CONFIG } from '~/utils/api.config'
import { authService } from '~/services/auth.service'

// Mock data cho courses
const mockCourses = [
  {
    id: 1,
    title: 'JavaScript Cơ Bản',
    description: 'Khóa học lập trình JavaScript từ cơ bản đến nâng cao',
    thumbnail: 'https://img.youtube.com/vi/0SJE9dYdpps/maxresdefault.jpg',
    price: 99,
    oldPrice: 160,
    lessonCount: 12,
    lessons: [
      {
        id: '1',
        title: 'Giới thiệu JavaScript',
        duration: '10:15',
        videoUrl: 'https://www.youtube.com/watch?v=0SJE9dYdpps',
        videoId: '0SJE9dYdpps'
      },
      {
        id: '2',
        title: 'Biến và Kiểu dữ liệu',
        duration: '15:20',
        videoUrl: 'https://www.youtube.com/watch?v=PILhRHh_nJM',
        videoId: 'PILhRHh_nJM'
      }
    ]
  },
  {
    id: 2,
    title: 'Vue.js 3 Tutorial',
    description: 'Học Vue.js 3 qua các ví dụ thực tế',
    thumbnail: 'https://img.youtube.com/vi/FXpIoQ_rT_c/maxresdefault.jpg',
    price: 149,
    oldPrice: 200,
    lessonCount: 15,
    lessons: [
      {
        id: '1',
        title: 'Vue 3 Basics',
        duration: '12:30',
        videoUrl: 'https://www.youtube.com/watch?v=FXpIoQ_rT_c',
        videoId: 'FXpIoQ_rT_c'
      },
      {
        id: '2',
        title: 'Vue 3 Composition API',
        duration: '18:45',
        videoUrl: 'https://www.youtube.com/watch?v=bwItFdPt-6M',
        videoId: 'bwItFdPt-6M'
      }
    ]
  },
  {
    id: 3,
    title: 'Node.js Backend Development',
    description: 'Xây dựng backend với Node.js và Express',
    thumbnail: 'https://img.youtube.com/vi/Oe421EPjeBE/maxresdefault.jpg',
    price: 199,
    oldPrice: 250,
    lessonCount: 20,
    lessons: [
      {
        id: '1',
        title: 'Node.js Introduction',
        duration: '14:20',
        videoUrl: 'https://www.youtube.com/watch?v=Oe421EPjeBE',
        videoId: 'Oe421EPjeBE'
      },
      {
        id: '2',
        title: 'Express.js Basics',
        duration: '16:15',
        videoUrl: 'https://www.youtube.com/watch?v=SccSCuHhOw0',
        videoId: 'SccSCuHhOw0'
      }
    ]
  }
]

// Store definition
export const useCourseStore = defineStore('course', {
  state: () => ({
    courses: [],
    currentCourse: null,
    loading: false,
    error: null
  }),

  getters: {
    isLoading: (state) => state.loading,
    hasError: (state) => state.error !== null
  },

  actions: {
    async getCourses() {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      return { data: mockCourses }
    },

    async getCourseById(id) {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      const course = mockCourses.find(c => c.id === parseInt(id))
      if (!course) {
        throw new Error('Course not found')
      }
      return { data: course }
    },

    async getProgress(courseId) {
      // Simulate getting progress from localStorage
      const progress = localStorage.getItem(`course_${courseId}_progress`)
      return progress ? JSON.parse(progress) : {}
    },

    async saveProgress({ lessonId, courseId, progress, currentTime }) {
      // Simulate saving progress to localStorage
      const key = `course_${courseId}_progress`
      const currentProgress = localStorage.getItem(key)
      const updatedProgress = {
        ...(currentProgress ? JSON.parse(currentProgress) : {}),
        [lessonId]: { progress, currentTime }
      }
      localStorage.setItem(key, JSON.stringify(updatedProgress))
    },

    async markLessonComplete(lessonId) {
      // Simulate marking lesson as complete
      console.log(`Lesson ${lessonId} marked as complete`)
    }
  }
}) 