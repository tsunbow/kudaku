<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

defineProps({
  src: {
    type: String,
    required: false,
    default: '',
  },
  type: {
    type: String,
    default: '',
    validator: (value) => ['image', 'video', ''].includes(value),
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
</style>
