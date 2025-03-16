<!-- Hero.vue -->
<script setup>
import { onMounted, ref, onUnmounted } from 'vue'

const parallaxOffset = ref(0)
const heroRef = ref(null)
const initialOffset = ref(0)

const handleScroll = () => {
  if (!heroRef.value) return

  const scrollPosition = window.scrollY
  const heroRect = heroRef.value.getBoundingClientRect()
  const heroCenter = heroRect.top + heroRect.height / 2
  const viewportCenter = window.innerHeight / 2

  // パララックス効果の強さを調整（0.5は効果の強さ）
  parallaxOffset.value = (heroCenter - viewportCenter) * 0.5

  // スクロール位置に基づいて不透明度を計算
  const opacity = Math.max(0, 1 - scrollPosition / (window.innerHeight * 0.8))
  heroRef.value.style.opacity = opacity
}

onMounted(() => {
  initialOffset.value = window.innerHeight * 0.1 // 初期オフセット（10vh）
  window.addEventListener('scroll', handleScroll)
  handleScroll() // 初期位置を設定
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="hero" ref="heroRef">
    <div
      class="hero-body"
      :style="{
        transform: `translateY(${parallaxOffset}px)`,
      }"
    >
      <div class="hero-content-wrapper">
        <!-- 既存のコンテンツ -->
        <div class="video-frame">
          <iframe
            v-if="isVideoLoaded"
            class="trim"
            :src="videoUrl"
            allow="autoplay; fullscreen; picture-in-picture"
            allowfullscreen
            loading="eager"
            importance="high"
          ></iframe>
          <div class="logo_kudaku">
            <BlurLogo class="group" :logoSrc="logo_top" />
          </div>
        </div>
        <BlurElement class="KU" :src="KU" alt="Ku" />
        <BlurElement class="DA" :src="DA" alt="Da" />
        <BlurElement class="KU2" :src="KU2" alt="Ku" />
        <BlurElement class="creative-area" :src="creativeArea" alt="Creative area" />
      </div>
    </div>
    <!-- 他の要素は同じ -->
  </div>
</template>

<style scoped>
.hero {
  height: 100vh;
  position: relative;
  overflow: hidden;
}

.hero-body {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  margin-top: 10vw;
  will-change: transform;
  transition: transform 0.1s ease-out;
}

/* 既存のスタイルは維持 */
.hero-content-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;
}

/* その他の既存のスタイル */
</style>
