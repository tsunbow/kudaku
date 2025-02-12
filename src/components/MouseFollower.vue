<!-- MouseFollower.vue -->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const position = ref({ x: 0, y: 0 })
const hoveredText = ref('')
const isHovered = ref(false)

const handleMouseMove = (e) => {
  position.value = { x: e.clientX, y: e.clientY }

  // ホバーしている要素を検知
  const hoveredElement = document.elementFromPoint(e.clientX, e.clientY)
  if (hoveredElement?.classList.contains('frame-6-text')) {
    isHovered.value = true
    hoveredText.value = hoveredElement.textContent
  } else {
    isHovered.value = false
    hoveredText.value = ''
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
  width: 24px;
  height: 24px;
  background-color: red;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.follower.is-hovered {
  width: 80px;
  height: 80px;
  transition:
    width 0.2s,
    height 0.2s;
}

.follower-text {
  color: white;
  font-size: 12px;
  white-space: nowrap;
  text-align: center;
  font-family: ivyora-display, sans-serif;
}
</style>
