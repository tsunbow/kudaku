<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const props = defineProps({
  logoSrc: {
    type: String,
    required: true,
  },
  initialBlur: {
    type: Number,
    default: 50, // かなり強いブラーを設定
  },
})

const logoRef = ref(null)
const isRevealed = ref(false)
const blurAmount = ref(props.initialBlur)
const isIntersecting = ref(false)
let observer = null

// 透明度を計算
const getOpacity = computed(() => {
  // ブラーが強い時は透明度も下げる
  const maxBlur = props.initialBlur
  const currentBlur = blurAmount.value
  const minOpacity = 0.1 // 最小透明度

  return minOpacity + ((maxBlur - currentBlur) / maxBlur) * (1 - minOpacity)
})

const calculateBlur = (ratio) => {
  // 要素が50%見えた時点から鮮明化を開始
  const revealThreshold = 0.9
  const progress = (ratio - revealThreshold) / (1 - revealThreshold)

  if (ratio >= revealThreshold) {
    // 50%以上見えている場合、徐々に鮮明化
    const newBlur = Math.max(props.initialBlur * (1 - progress), 0)
    blurAmount.value = newBlur
    isRevealed.value = true
  } else {
    // 50%未満の場合は完全にぼやけた状態を維持
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

  // 初期状態で強いブラーと低い透明度を設定
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
    :style="{
      filter: `blur(${blurAmount}px)`,
      opacity: getOpacity,
    }"
  />
</template>

<style scoped>
.reveal-logo {
  transition: all 0.5s ease-out;
  will-change: filter, opacity;
}

.reveal-active {
  /* アクティブ時の追加スタイル（必要に応じて） */
}
</style>
