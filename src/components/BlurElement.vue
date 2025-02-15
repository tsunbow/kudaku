<!-- BlurElement.vue -->
<template>
  <div :class="{ 'blur-active': isBlurred }">
    <img
      class="blur-transition"
      :class="additionalClass"
      :alt="alt"
      :src="src"
      :style="{ filter: `blur(${blurAmount}px)` }"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: '',
  },
  additionalClass: {
    type: String,
    default: '',
  },
})
const isBlurred = ref(false)
const blurAmount = ref(0)

const handleScroll = () => {
  const scrollPosition = window.scrollY
  const threshold = 100
  const maxBlur = 10

  if (scrollPosition > threshold) {
    isBlurred.value = true
    const blur = Math.min(((scrollPosition - threshold) / 200) * maxBlur, maxBlur)
    blurAmount.value = blur
  } else {
    isBlurred.value = false
    blurAmount.value = 0
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.blur-transition {
  transition: filter 0.3s ease;
}

.blur-active {
  will-change: filter;
}
</style>
