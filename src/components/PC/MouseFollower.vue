<!-- MouseFollower.vue - 既存の動画要素を制御するアプローチ -->
<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const position = ref({ x: 0, y: 0 })
const hoveredText = ref('')
const isHovered = ref(false)
const textWidth = ref(0)
const isHoveringVideoFrame = ref(false) // video-frameのホバー状態

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

  // video-frame上にいるかどうかを判定
  isHoveringVideoFrame.value = hoveredElement?.closest('.video-frame') !== null

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

// 動画を再生する関数
const playVideo = () => {
  if (isHoveringVideoFrame.value) {
    // 別ウィンドウで動画を開く
    window.open(
      'https://player.vimeo.com/video/1054903432?h=dc95ee2a5f&autoplay=1&loop=1',
      '_blank',
    )
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
    <!-- 通常のマウスフォロワー - video-frame上では非表示 -->
    <div
      v-if="!isHoveringVideoFrame"
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

    <!-- video-frame上での専用フォロワー - クリック可能 -->
    <div
      v-if="isHoveringVideoFrame"
      class="movie-play-follower"
      :style="{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }"
      @click.stop="playVideo"
    >
      <div class="ellipse">
        <img class="vector" alt="Vector" src="@/assets/img/vector.png" />
        <div class="text-wrapper">Play Concept</div>
      </div>
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

/* Movie play follower styles */
.movie-play-follower {
  position: absolute;
  transform: translate(-50%, -50%);
  z-index: 50;
  transition: all 0.1s ease;
  pointer-events: auto; /* クリックを可能にする */
  cursor: pointer;
}

.movie-play-follower .ellipse {
  width: 90px;
  height: 90px;
  border: 1px solid #d9d9d9;
  border-radius: 45px;
  position: relative;
}

.movie-play-follower .vector {
  width: 25px;
  height: 22px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}

.movie-play-follower .text-wrapper {
  color: #ffffff;
  font-family: ivyora-display, sans-serif;
  font-weight: 400;
  font-style: italic;
  font-size: 14px;
  letter-spacing: 0.42px;
  line-height: 16.1px;
  position: absolute;
  left: 5px;
  top: 98px;
}
</style>
