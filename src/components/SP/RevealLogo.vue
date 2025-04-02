<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  logoSrc: {
    type: String,
    required: true,
  },
  initialBlur: {
    type: Number,
    default: 10,
  },
})

const logoRef = ref(null)
const isRevealed = ref(false)
const blurAmount = ref(props.initialBlur)
const isIntersecting = ref(false)
let observer = null

const calculateBlur = (ratio) => {
  // 要素が70%見えた時点から鮮明化を開始
  const revealThreshold = 0.7
  const progress = (ratio - revealThreshold) / (1 - revealThreshold)

  if (ratio >= revealThreshold) {
    // 70%以上見えている場合、徐々に鮮明化
    const newBlur = Math.max(props.initialBlur * (1 - progress), 0)
    blurAmount.value = newBlur
    isRevealed.value = true
  } else {
    // 70%未満の場合はぼやけた状態を維持
    blurAmount.value = props.initialBlur
    isRevealed.value = false
  }
}

onMounted(() => {
  // Intersection Observerの設定
  observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]
      isIntersecting.value = entry.isIntersecting
      calculateBlur(entry.intersectionRatio)
    },
    {
      // 0%から100%まで10%刻みで観察
      threshold: Array.from({ length: 11 }, (_, i) => i / 10),
    },
  )

  if (logoRef.value) {
    observer.observe(logoRef.value)
  }

  // 初期状態でぼやけた状態にする
  blurAmount.value = props.initialBlur
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<template>
  <img
    ref="logoRef"
    :class="['reveal-logo', { 'reveal-active': isRevealed }]"
    alt="Group"
    :src="logoSrc"
    :style="{ filter: `blur(${blurAmount}px)` }"
  />
</template>

<style scoped>
.reveal-logo {
  transition: filter 1.5s ease-out;
  will-change: filter;
}

.reveal-active {
  /* アクティブ時の追加スタイル（必要に応じて） */
}
</style>
