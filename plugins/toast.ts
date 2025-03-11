import { defineNuxtPlugin } from 'nuxt/app'
import Vue3Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Vue3Toastify, {
    autoClose: 3000,
    position: 'top-right',
    theme: 'dark',
    clearOnUrlChange: false,
    transition: 'slide',
    rtl: false,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: 'button',
    icon: true,
    newestOnTop: false,
    closeOnClick: true,
    limit: 3,
    maxToasts: 5,
    enableMultiContainer: false,
    containerClassName: 'toast-container',
    containerStyle: {
      zIndex: 9999
    },
    toastStyle: {
      background: '#333',
      color: '#fff',
    },
    bodyClassName: 'toast-body',
    bodyStyle: {
      fontSize: '14px',
      fontWeight: '400',
    },
    filterBeforeCreate: (toast, toasts) => {
      if (toasts.filter(t => t.type === toast.type).length !== 0) {
        return false
      }
    },
  })
}) 