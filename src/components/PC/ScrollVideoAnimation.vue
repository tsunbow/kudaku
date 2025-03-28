<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Props定義
const props = defineProps({
  // ビデオソース（必須）
  videoSrc: {
    type: String,
    required: true,
  },
  // アニメーション完了の閾値（0〜1）
  completeThreshold: {
    type: Number,
    default: 0.9,
  },
  // スクロール感度の調整
  scrollSensitivity: {
    type: Number,
    default: 0.6,
  },
  // ブラーの最大値（px単位）
  maxBlur: {
    type: Number,
    default: 100,
  },
})

// 状態管理
const videoElement = ref(null)
let lastScrollY = 0
let ticking = false
let animationStarted = false

// スクロール処理
const handleScroll = () => {
  lastScrollY = window.scrollY

  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateVideoPosition()
      ticking = false
    })
    ticking = true
  }
}

// ビデオ位置の更新
const updateVideoPosition = () => {
  if (!videoElement.value) return

  // コンポーネントの親要素（ラッパー）の位置を取得
  const wrapper = videoElement.value.closest('.scroll-video-wrapper')
  if (!wrapper) return

  const rect = wrapper.getBoundingClientRect()
  const viewportHeight = window.innerHeight

  // スクロール進行度に基づいてアニメーションを制御
  if (rect.top <= viewportHeight * 1.0 && rect.bottom >= 0) {
    // アニメーションが始まったフラグを立てる
    animationStarted = true

    // 進行度を計算（0〜1の値）
    const progress = Math.min(
      1,
      Math.max(0, 1 - rect.top / (viewportHeight * props.scrollSensitivity)),
    )

    // 指定された閾値以上進んだら、完全に表示する
    if (progress >= props.completeThreshold) {
      videoElement.value.style.transform = 'translateY(0)'
      videoElement.value.style.filter = 'blur(0)'
    } else {
      // 通常のスクロールベースのアニメーション
      videoElement.value.style.transform = `translateY(${100 - progress * 100}%)`
      videoElement.value.style.filter = `blur(${props.maxBlur - progress * props.maxBlur}px)`
    }
  } else if (!animationStarted) {
    // エリア外かつアニメーションが始まっていない場合は初期状態にする
    videoElement.value.style.transform = 'translateY(100%)'
    videoElement.value.style.filter = `blur(${props.maxBlur}px)`
  }
}

onMounted(() => {
  // 初期状態でビデオを下に配置し、ブラー効果を適用
  if (videoElement.value) {
    videoElement.value.style.transform = 'translateY(100%)'
    videoElement.value.style.filter = `blur(${props.maxBlur}px)`
  }

  // スクロールイベントリスナーを設定
  window.addEventListener('scroll', handleScroll, { passive: true })

  // 初回実行
  setTimeout(() => {
    updateVideoPosition()
  }, 100)
})

onUnmounted(() => {
  // イベントリスナーのクリーンアップ
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="scroll-video-wrapper">
    <!-- ビデオ要素 -->
    <video ref="videoElement" class="scroll-video" autoplay loop muted playsinline>
      <source :src="videoSrc" type="video/mp4" />
    </video>

    <!-- スロットでコンテンツを受け取る -->
    <div class="slot-content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.scroll-video-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.scroll-video {
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  opacity: 0.9;
  object-fit: cover;
  transition:
    transform 0.6s ease-out,
    filter 0.8s ease-out;
  will-change: transform, filter;
}

.slot-content {
  position: relative;
  z-index: 2;
  height: 100%;
  width: 100%;
}
</style>
