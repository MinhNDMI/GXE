<template>
  <div>
    <h1>Course</h1>
    <div v-for="item in banner" :key="item.id">
      <h2>{{ item.title }}</h2>
      <p>{{ item.description }}</p>
    </div>
  </div>
</template>
<script setup>
import { useBannerStore } from '~/store/modules/banner'

const bannerStore = useBannerStore()

const { data: banner } = await bannerStore.getBanner()

</script>
