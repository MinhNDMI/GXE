import { toast } from 'vue3-toastify'

export const useToast = () => {
  const success = (message: string, options = {}) => {
    toast.success(message, {
      ...options,
      position: 'top-right',
      autoClose: 3000,
    })
  }

  const error = (message: string, options = {}) => {
    toast.error(message, {
      ...options,
      position: 'top-right',
      autoClose: 5000,
    })
  }

  const warning = (message: string, options = {}) => {
    toast.warning(message, {
      ...options,
      position: 'top-right',
      autoClose: 4000,
    })
  }

  const info = (message: string, options = {}) => {
    toast.info(message, {
      ...options,
      position: 'top-right',
      autoClose: 3000,
    })
  }

  const promise = async (promise: Promise<any>, messages: { pending: string; success: string; error: string }, options = {}) => {
    return toast.promise(promise, messages, {
      ...options,
      position: 'top-right',
      autoClose: 5000,
    })
  }

  return {
    success,
    error,
    warning,
    info,
    promise,
  }
} 