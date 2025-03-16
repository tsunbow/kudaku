<!-- VideoBlurWrapper.vue -->
<template>
  <div class="video-wrapper" :style="{ filter: `blur(${blurAmount}px)` }">
    <div class="video-frame">
      <BlurElement
        type="video"
        class="trim"
        :src="videoSrc"
        alt="trim"
        :loop="true"
        :muted="true"
        :autoplay="true"
        playsinline
        false
      />
      <div class="logo_kudaku">
        <BlurLogo class="group" :logoSrc="logoSrc" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import BlurElement from './BlurElement.vue'
import BlurLogo from './BlurLogo.vue'

const props = defineProps({
  videoSrc: {
    type: String,
    required: true,
  },
  logoSrc: {
    type: String,
    required: true,
  },
})

const blurAmount = ref(0)

const handleScroll = () => {
  const scrollPosition = window.scrollY
  const threshold = 100
  const maxBlur = 10

  if (scrollPosition > threshold) {
    const blur = Math.min(((scrollPosition - threshold) / 200) * maxBlur, maxBlur)
    blurAmount.value = blur
  } else {
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
.video-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  transition: filter 0.3s ease;
  will-change: filter;
}

.video-frame {
  position: relative;
  width: 46vw;
  height: 0;
  padding-bottom: 34.5vw;
  margin: 0 auto;
  overflow: hidden;
}

.trim {
  width: 134%;
  height: 105%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  object-fit: cover;
  border: none;
}

.logo_kudaku {
  width: 4.5vw;
  height: auto;
  position: absolute;
  top: 50%;
  left: 52%;
  transform: translate(-50%, -50%);
}
</style>
