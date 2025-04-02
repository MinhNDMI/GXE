import 'video.js/dist/video-js.css'
import videojs from 'video.js'
import 'videojs-youtube'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('VideoPlayer', {
    props: {
      options: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        player: null
      }
    },
    mounted() {
      this.player = videojs(this.$refs.videoPlayer, this.options)
    },
    beforeUnmount() {
      if (this.player) {
        this.player.dispose()
      }
    }
  })
})
