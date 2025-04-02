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
  videoType: {
    type: String,
    default: 'video/mp4',
  },
  // Lottie specific props
  jsonSrc: {
    type: Object,
    default: null,
  },
})

const isBlurred = ref(false)
const blurAmount = ref(0)
const lottieContainer = ref(null)
let animation = null

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

  // Lottieの初期化
  if (props.type === 'lottie' && props.jsonSrc && lottieContainer.value) {
    loadLottieAnimation()
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)

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
      :style="{ filter: `blur(${blurAmount}px)` }"
    />

    <!-- 動画の場合 -->
    <video
      v-else-if="type === 'video'"
      class="blur-transition media-content"
      :style="{ filter: `blur(${blurAmount}px)` }"
      :controls="false"
      :autoplay="autoplay"
      :loop="loop"
      :muted="muted"
    >
      <source :src="src" :type="videoType" />
      Your browser does not support the video tag.
    </video>

    <!-- Lottieアニメーションの場合 -->
    <div
      v-else-if="type === 'lottie'"
      ref="lottieContainer"
      class="blur-transition lottie-container"
      :style="{ filter: `blur(${blurAmount}px)` }"
    ></div>

    <!-- その他のコンテンツの場合 -->
    <div
      v-else
      class="blur-transition content-wrapper"
      :style="{ filter: `blur(${blurAmount}px)` }"
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
  transition: filter 0.3s ease;
  width: 100%;
  height: 100%;
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
