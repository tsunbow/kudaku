<!-- MouseFollower.vue -->
<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const position = ref({ x: 0, y: 0 })
const hoveredText = ref('')
const isHovered = ref(false)
const textWidth = ref(0)

// テキストの幅を測定する関数
const measureTextWidth = (text) => {
  // 測定用の一時要素を作成
  const measurer = document.createElement('div')
  measurer.style.position = 'absolute'
  measurer.style.visibility = 'hidden'
  measurer.style.whiteSpace = 'nowrap'
  measurer.style.fontFamily = 'ivyora-display, sans-serif'
  measurer.style.fontSize = '16px'
  measurer.textContent = text

  document.body.appendChild(measurer)
  const width = measurer.offsetWidth
  document.body.removeChild(measurer)

  return width
}

// 円のサイズを計算
const circleSize = computed(() => {
  if (!isHovered.value) return { width: 24, height: 24 }

  // テキストの幅に基づいてサイズを計算
  const padding = 10 // テキストの左右のパディング
  const size = textWidth.value + padding

  // 最小サイズと最大サイズの制限
  const minSize = 80
  const maxSize = 200

  const finalSize = Math.min(Math.max(size, minSize), maxSize)

  return {
    width: finalSize,
    height: finalSize,
  }
})

const handleMouseMove = (e) => {
  position.value = { x: e.clientX, y: e.clientY }

  // ホバーしている要素を検知
  const hoveredElement = document.elementFromPoint(e.clientX, e.clientY)
  if (
    hoveredElement?.classList.contains('frame-6-text') ||
    hoveredElement?.classList.contains('frame-6-text-italic')
  ) {
    isHovered.value = true
    hoveredText.value = hoveredElement.textContent
    // テキストの幅を測定して保存
    textWidth.value = measureTextWidth(hoveredText.value)
  } else {
    isHovered.value = false
    hoveredText.value = ''
    textWidth.value = 0
  }
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<template>
  <div class="mouse-follower">
    <div
      class="follower"
      :class="{ 'is-hovered': isHovered }"
      :style="{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${circleSize.width}px`,
        height: `${circleSize.height}px`,
      }"
    >
      <span v-if="isHovered" class="follower-text">{{ hoveredText }}</span>
    </div>
  </div>
</template>

<style scoped>
.mouse-follower {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 50;
}

.follower {
  position: absolute;
  background-color: red;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    width 0.2s ease,
    height 0.2s ease;
}

.follower-text {
  color: white;
  font-size: 16px;
  white-space: nowrap;
  text-align: center;
  font-family: ivyora-display, sans-serif;
  padding: 0 20px;
}
</style>
