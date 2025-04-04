<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 画像のimport
import x701 from '@/assets/img/70-1.png'
import x281 from '@/assets/img/28-1.png'
import x19 from '@/assets/img/1-9.png'
import x631 from '@/assets/img/63-1.png'
import x271 from '@/assets/img/27-1.png'
import x41 from '@/assets/img/4-1.png'

const sectionRef = ref(null)
const imageRefs = ref([])
const isVisible = ref(false)
let observer = null
let ticking = false
const initialOffsets = ref({})

const handleScroll = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateParallax()
      ticking = false
    })
    ticking = true
  }
}

const updateParallax = () => {
  if (!isVisible.value) return

  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const windowHeight = window.innerHeight

  for (const img of imageRefs.value) {
    if (!img) continue

    const speed = Number.parseFloat(img.dataset.speed)
    const initialOffset = initialOffsets.value[img.dataset.index] || 0
    const rect = img.getBoundingClientRect()

    if (rect.top < windowHeight && rect.bottom > 0) {
      const yPos = (scrollTop - initialOffset) * speed
      img.style.transform = `translate3d(0, ${yPos}px, 0)`
    }
  }
}

const initializeOffsets = () => {
  for (const img of imageRefs.value) {
    if (!img) continue
    initialOffsets.value[img.dataset.index] = img.offsetTop
  }
}

const observerCallback = (entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      isVisible.value = true
      initializeOffsets()
      updateParallax()
    }
  }
}

onMounted(() => {
  observer = new IntersectionObserver(observerCallback, {
    threshold: 0.1,
    rootMargin: '50px',
  })

  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }

  imageRefs.value = Array.from(document.querySelectorAll('.parallax-image'))

  setTimeout(() => {
    initializeOffsets()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener(
      'resize',
      () => {
        initializeOffsets()
        handleScroll()
      },
      { passive: true },
    )
  }, 100)
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleScroll)
})
</script>

<template>
  <section ref="sectionRef" class="scroll-reveal-section">
    <div class="content-wrapper" :class="{ 'is-visible': isVisible }">
      <!-- テキストコンテンツ -->
      <div class="text-content">
        <slot name="text"></slot>
      </div>

      <!-- パララックス画像 -->
      <div class="parallax-image element" ref="img1" data-speed="0.15" data-index="1">
        <img alt="Element" :src="x701" />
      </div>
      <div class="parallax-image element-2" ref="img2" data-speed="0.3" data-index="2">
        <img alt="Element" :src="x281" />
      </div>
      <div class="parallax-image element-3" ref="img3" data-speed="0.1" data-index="3">
        <img alt="Element" :src="x19" />
      </div>
      <div class="parallax-image element-4" ref="img4" data-speed="0.3" data-index="4">
        <img alt="Element" :src="x631" />
      </div>
      <div class="parallax-image element-5" ref="img5" data-speed="0.3" data-index="5">
        <img alt="Element" :src="x271" />
      </div>
      <div class="parallax-image element-6" ref="img6" data-speed="0.5" data-index="6">
        <img alt="Element" :src="x41" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.scroll-reveal-section {
  position: relative;
  width: 100%;
  overflow: visible;
}

.content-wrapper {
  position: relative;
  opacity: 0;
  transform: translateY(50px);
  transition:
    opacity 0.8s ease,
    transform 0.8s ease;
}

.content-wrapper.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.text-content {
  position: relative;
  z-index: 2;
}

.parallax-image {
  position: absolute;
  will-change: transform;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform: translate3d(0, 0, 0);
  object-fit: cover;
}

.element {
  right: 23%;
  object-fit: cover;
  top: 175px;
  width: 20%;
  z-index: 1;
}

.element-2 {
  right: 14%;
  object-fit: cover;
  top: 1970px;
  width: 35%;
  z-index: 1;
}

.element-3 {
  right: 0;
  object-fit: cover;
  top: 1828px;
  width: 21%;
  z-index: 1;
}

.element-4 {
  left: 20%;
  object-fit: cover;
  top: 920px;
  width: 23%;
  z-index: 1;
}

.element-5 {
  left: 13%;
  object-fit: cover;
  top: 2530px;
  width: 19%;
  z-index: 1;
}

.element-6 {
  right: 19%;
  object-fit: cover;
  top: 3000px;
  width: 42%;
  z-index: 1;
}
</style>
