import { defineNuxtPlugin } from '#app'
import DataTable from 'vue3-easy-data-table'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('DataTable', DataTable)
}) 