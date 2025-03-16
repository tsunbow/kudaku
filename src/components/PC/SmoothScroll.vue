// SmoothScroll.vue
<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
  threshold: {
    type: Number,
    default: 0.1,
  },
})

const isTriggered = ref(false)
const sectionRef = ref(null)

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      // biome-ignore lint/complexity/noForEach: <explanation>
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isTriggered.value) {
          isTriggered.value = true
          smoothScrollToTarget()
        }
      })
    },
    {
      threshold: props.threshold,
    },
  )

  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }

  return () => {
    if (sectionRef.value) {
      observer.unobserve(sectionRef.value)
    }
  }
})

const smoothScrollToTarget = () => {
  const section = sectionRef.value
  if (!section) return

  // 要素の位置を取得
  const rect = section.getBoundingClientRect()
  const startPosition = window.pageYOffset
  const targetPosition = startPosition + rect.top

  const duration = 300
  const startTime = performance.now()

  function animation(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    // イージング関数（より穏やかな動き）
    const easing = (progress) => {
      return progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress
    }

    window.scrollTo({
      top: startPosition + (targetPosition - startPosition) * easing(progress),
      behavior: 'auto', // smoothはブラウザのデフォルトの動きと競合するため、autoを使用
    })

    if (progress < 1) {
      requestAnimationFrame(animation)
    }
  }

  requestAnimationFrame(animation)
}
</script>

<template>
  <div ref="sectionRef" class="smooth-scroll-trigger">
    <slot></slot>
  </div>
</template>

<style scoped>
.smooth-scroll-trigger {
  width: 100%;
  height: 100%;
}
</style>
