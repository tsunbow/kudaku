<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import lottie from 'lottie-web'

const props = defineProps({
  src: {
    type: String,
    required: false,
    default: '',
  },
  type: {
    type: String,
    default: '',
    validator: (value) => ['image', 'video', 'lottie', ''].includes(value), // 'lottie'を追加
  },
  alt: {
    type: String,
    default: '',
  },
  additionalClass: {
    type: String,
    default: '',
  },
  // Video specific props
  controls: {
    type: Boolean,
    default: true,
  },
  autoplay: {
    type: Boolean,
    default: false,
  },
  loop: {
    type: Boolean,
    default: false,
  },
  muted: {
    type: Boolean,
    default: false,
  },
  playsinline: {
    type: Boolean,
    default: true,
  },
  videoType: {
    type: String,
    default: 'video/mp4',
  },
  // Lottie specific props
  jsonSrc: {
    type: Object,
    default: null,
  },
  // 初期描画時のアニメーション用プロパティ
  initialBlur: {
    type: Boolean,
    default: false,
  },
  initialBlurAmount: {
    type: Number,
    default: 20,
  },
  initialOpacity: {
    type: Number,
    default: 0,
  },
})

const isBlurred = ref(false)
const blurAmount = ref(props.initialBlur ? props.initialBlurAmount : 0)
const opacity = ref(props.initialBlur ? props.initialOpacity : 1)
const lottieContainer = ref(null)
let animation = null
let blurInterval = null

// スクロール処理とブラー効果の両立
const handleScroll = () => {
  // 初期アニメーションが完了している場合のみスクロールブラーを適用
  if (!blurInterval) {
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
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)

  // Lottieの初期化
  if (props.type === 'lottie' && props.jsonSrc && lottieContainer.value) {
    loadLottieAnimation()
  }

  // 初期表示時のブラーアニメーション
  if (props.initialBlur) {
    // 少し遅延させてアニメーション開始
    setTimeout(() => {
      opacity.value = 1
      // アニメーションで徐々にブラーを減少
      blurInterval = setInterval(() => {
        if (blurAmount.value <= 0) {
          clearInterval(blurInterval)
          blurAmount.value = 0
          blurInterval = null
          // スクロール位置に応じてブラーを適用
          handleScroll()
        } else {
          blurAmount.value -= 0.5
        }
      }, 30)
    }, 100)
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)

  // インターバルのクリーンアップ
  if (blurInterval) {
    clearInterval(blurInterval)
    blurInterval = null
  }

  // Lottieのクリーンアップ
  if (animation) {
    animation.destroy()
    animation = null
  }
})

// jsonSrcの変更を監視
watch(
  () => props.jsonSrc,
  () => {
    if (props.type === 'lottie' && props.jsonSrc) {
      loadLottieAnimation()
    }
  },
  { deep: true },
)

// Lottieアニメーションをロードする関数
const loadLottieAnimation = () => {
  if (animation) {
    animation.destroy()
  }

  if (lottieContainer.value && props.jsonSrc) {
    animation = lottie.loadAnimation({
      container: lottieContainer.value,
      renderer: 'svg',
      loop: props.loop,
      autoplay: props.autoplay,
      animationData: props.jsonSrc,
    })
  }
}
</script>

<template>
  <div :class="[{ 'blur-active': isBlurred }, additionalClass]" class="blur-container">
    <!-- 画像の場合 -->
    <img
      v-if="type === 'image'"
      class="blur-transition media-content"
      :alt="alt"
      :src="src"
      :style="{
        filter: `blur(${blurAmount}px)`,
        opacity: opacity,
      }"
    />

    <!-- 動画の場合 -->
    <video
      v-else-if="type === 'video'"
      class="blur-transition media-content"
      :style="{
        filter: `blur(${blurAmount}px)`,
        opacity: opacity,
      }"
      :controls="controls"
      :autoplay="autoplay"
      :loop="loop"
      :muted="muted"
      :playsinline="playsinline"
    >
      <source :src="src" :type="videoType" />
      Your browser does not support the video tag.
    </video>

    <!-- Lottieアニメーションの場合 -->
    <div
      v-else-if="type === 'lottie'"
      ref="lottieContainer"
      class="blur-transition lottie-container"
      :style="{
        filter: `blur(${blurAmount}px)`,
        opacity: opacity,
      }"
    ></div>

    <!-- その他のコンテンツの場合 -->
    <div
      v-else
      class="blur-transition content-wrapper"
      :style="{
        filter: `blur(${blurAmount}px)`,
        opacity: opacity,
      }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.blur-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.blur-transition {
  transition:
    filter 0.3s ease,
    opacity 1s ease;
  width: 100%;
  height: 100%;
  will-change: filter, opacity;
}

.blur-active {
  will-change: filter;
}

.content-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.media-content {
  object-fit: cover;
}

.lottie-container {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
