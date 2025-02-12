<!-- BlurLogo.vue -->
<template>
  <img
    class="group blur-transition"
    :class="{ 'blur-active': isBlurred }"
    alt="Group"
    :src="logoSrc"
    :style="{ filter: `blur(${blurAmount}px)` }"
  />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  logoSrc: {
    type: String,
    required: true,
  },
})

const isBlurred = ref(false)
const blurAmount = ref(0)

const handleScroll = () => {
  const scrollPosition = window.scrollY
  const threshold = 100 // スクロールがこの値を超えるとぼやけ始める
  const maxBlur = 10 // 最大のぼやけ具合(px)

  if (scrollPosition > threshold) {
    isBlurred.value = true
    // スクロール量に応じてぼやけ具合を計算
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
