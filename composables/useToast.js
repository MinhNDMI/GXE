import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export const useToast = () => {
  const defaultOptions = {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  }

  const success = (message, options = {}) => {
    toast.success(message, { ...defaultOptions, ...options })
  }

  const error = (message, options = {}) => {
    toast.error(message, { ...defaultOptions, ...options })
  }

  const info = (message, options = {}) => {
    toast.info(message, { ...defaultOptions, ...options })
  }

  const warning = (message, options = {}) => {
    toast.warning(message, { ...defaultOptions, ...options })
  }

  const promise = async (promise, messages = {}, options = {}) => {
    return toast.promise(
      promise,
      {
        pending: messages.pending || 'Loading...',
        success: messages.success || 'Success!',
        error: messages.error || 'Error!',
      },
      { ...defaultOptions, ...options }
    )
  }

  return {
    success,
    error,
    info,
    warning,
    promise,
  }
} 