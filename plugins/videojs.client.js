import 'video.js/dist/video-js.css'
import videojs from 'video.js'
import 'videojs-youtube'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('VideoPlayer', {
    props: {
      options: {
        type: Object,
        default() {
          return {
            techOrder: ['youtube'],
            autoplay: false,
            controls: true,
            responsive: true,
            fluid: true,
            sources: [{
              type: 'video/youtube',
              src: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
            }],
            youtube: {
              iv_load_policy: 3,
              modestbranding: 1,
              rel: 0,
              showinfo: 0,
              origin: window.location.origin
            }
          }
        }
      }
    },
    data() {
      return {
        player: null
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.player = videojs(this.$refs.videoPlayer, this.options)
      })
    },
    beforeUnmount() {
      if (this.player) {
        this.player.dispose()
      }
    }
  })
})
