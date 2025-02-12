<!-- TextRevealAnimation.vue -->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const observer = ref(null)

// テキストノードを処理する関数
const createCharacterSpan = (char, isEmphasis = false) => {
  const span = document.createElement('span')
  span.textContent = char
  span.style.color = '#808080'
  span.style.display = 'inline-block'

  if (isEmphasis) {
    span.classList.add('emphasis-char')
  }

  return span
}

// テキストを文字配列に分割する関数
const splitText = (element) => {
  const spans = []
  const textNodes = Array.from(element.childNodes)

  textNodes.forEach((node) => {
    switch (true) {
      case node.nodeType === Node.TEXT_NODE: {
        const chars = node.textContent.split('')
        chars.forEach((char) => {
          const span = createCharacterSpan(char)
          spans.push(span)
          node.parentNode.insertBefore(span, node)
        })
        node.remove()
        break
      }
      case node.tagName === 'BR': {
        spans.push(node)
        break
      }
      case node.classList?.contains('emphasis'): {
        const chars = node.textContent.split('')
        chars.forEach((char) => {
          const span = createCharacterSpan(char, true)
          spans.push(span)
          node.parentNode.insertBefore(span, node)
        })
        node.remove()
        break
      }
    }
  })

  return spans
}

// 全てのテキストを処理してspanの配列を返す
const processAllText = (descriptionElement) => {
  const allSpans = []
  const textElements = descriptionElement.querySelectorAll('.description-text')

  textElements.forEach((element) => {
    const spans = splitText(element)
    allSpans.push(...spans)
  })

  return allSpans
}

// 文字のスタイルを更新する関数
const updateCharacterStyle = (span, isEmphasis) => {
  if (isEmphasis) {
    span.style.color = '#ff0000'
    span.style.transform = 'matrix(1, 0, -0.5, 0.87, 0, 0)'
  } else {
    span.style.color = '#ffffff'
  }
}

// アニメーションを開始する関数
const startAnimation = (spans) => {
  spans.forEach((span, index) => {
    if (span.tagName === 'BR') return

    setTimeout(() => {
      const isEmphasis = span.classList.contains('emphasis-char')
      updateCharacterStyle(span, isEmphasis)
    }, index * 50)
  })
}

// Intersection Observerのコールバック
const handleIntersection = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !entry.target.dataset.animated) {
      entry.target.dataset.animated = 'true'
      const spans = processAllText(entry.target)
      startAnimation(spans)
    }
  })
}

onMounted(() => {
  observer.value = new IntersectionObserver(handleIntersection, {
    threshold: 0.5,
  })

  const descriptionElement = document.querySelector('.description')
  if (descriptionElement) {
    observer.value.observe(descriptionElement)
  }
})

onUnmounted(() => {
  if (observer.value) {
    observer.value.disconnect()
    observer.value = null
  }
})
</script>

<template>
  <slot />
</template>

<style scoped>
.description-text span {
  transition: all 0.3s ease;
}

/* 通常文字のスタイル */
.normal-char {
  font-family: 'Zen Kaku Gothic New', serif;
  font-weight: 500;
  font-style: normal;
  font-size: 46px;
  letter-spacing: -4.6px;
  line-height: 64.4px;
}

/* 強調文字のスタイル */
.emphasis-char {
  font-family: 'Zen Old Mincho', serif;
  font-weight: 400;
  font-style: normal;
  font-size: 78px;
  display: inline-block;
  vertical-align: top;
  transform: matrix(1, 0, -0.5, 0.87, 0, 0);
}

/* 色の状態クラス */
.text-gray {
  color: #808080;
}

.text-white {
  color: #ffffff;
}

.text-red {
  color: #ff0000;
}
</style>
