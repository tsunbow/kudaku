<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isLargeScreen = ref(window.innerWidth >= 390)

const handleResize = () => {
  isLargeScreen.value = window.innerWidth >= 390
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div class="responsive-container">
    <div v-if="!isLargeScreen">
      <slot name="small"></slot>
    </div>
    <div v-if="isLargeScreen">
      <slot name="large"></slot>
    </div>
  </div>
</template>
