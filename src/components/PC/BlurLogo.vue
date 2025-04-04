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
const opacity = ref(1) // 透明度の追跡用に新しい参照変数を追加

const handleScroll = () => {
  const scrollPosition = window.scrollY
  const threshold = 1 // スクロールがこの値を超えるとぼやけ始める
  const maxBlur = 20 // 最大のぼやけ具合(px)
  const minOpacity = 0 // 最小の不透明度 (0に設定すると完全に透明になります)

  if (scrollPosition > threshold) {
    isBlurred.value = true
    // スクロール量に応じてぼやけ具合を計算
    const blurProgress = Math.min((scrollPosition - threshold) / 200, 1)
    blurAmount.value = blurProgress * maxBlur

    // 最大ぼかしに近づくにつれて透明度を下げる
    // blurProgressが1（最大ぼかし）の場合、opacityはminOpacityになる
    if (blurProgress >= 1) {
      opacity.value = minOpacity
    } else {
      // ぼかしの進行に合わせて透明度を線形に変化させる
      opacity.value = 1 - blurProgress * (1 - minOpacity)
    }
  } else {
    isBlurred.value = false
    blurAmount.value = 0
    opacity.value = 1
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <img
    class="group blur-transition"
    :class="{ 'blur-active': isBlurred }"
    alt="Group"
    :src="logoSrc"
    :style="{
      filter: `blur(${blurAmount}px)`,
      opacity: opacity,
    }"
  />
</template>

<style scoped>
.blur-transition {
  transition:
    filter 0.5s ease,
    opacity 0.5s ease;
}

.blur-active {
  will-change: filter, opacity;
}
</style>
