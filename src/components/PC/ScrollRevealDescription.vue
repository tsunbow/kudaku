<script setup>
import { ref, onBeforeUnmount } from 'vue'

const descriptionSections = [
  {
    id: 0,
    lines: [
      { text: '私たちは問う.', isEmphasis: false },
      {
        text: '誰かの顔色ではなく, そこに埋もれた本質を.',
        isEmphasis: false,
        emphasisPart: { start: 18, end: 20 },
      },
    ],
  },

  {
    id: 1,
    lines: [
      { text: '私たちは試す.', isEmphasis: false },
      {
        text: '既成概念を取っ払って, 道標となるアプローチを.',
        isEmphasis: false,
        emphasisPart: { start: 17, end: 22 },
      },
    ],
  },

  {
    id: 2,
    lines: [
      { text: '私たちは進む.', isEmphasis: false },
      {
        text: 'アンテナを張り巡らし, 時代の半歩先を.',
        isEmphasis: false,
        emphasisPart: { start: 15, end: 18 },
      },
    ],
  },

  {
    id: 3,
    lines: [
      { text: '私たちは巻き込む.', isEmphasis: false },
      {
        text: '領域や組織を超えたチームで, 衝突を恐れない議論を.',
        isEmphasis: false,
        emphasisPart: { start: 22, end: 24 },
      },
    ],
  },

  {
    id: 4,
    lines: [
      { text: '私たちは願う.', isEmphasis: false },
      {
        text: '産まれたアイデアが多くの人に愛されることを.',
        isEmphasis: false,
        emphasisPart: { start: 14, end: 18 },
      },
    ],
  },

  {
    id: 5,
    lines: [
      { text: '私たちは並び歩む.', isEmphasis: false },
      {
        text: 'クライアントと本音で向き合い, 感性を共有しながら.',
        isEmphasis: false,
        emphasisParts: [
          { start: 10, end: 14 },
          { start: 19, end: 21 },
        ],
      },
    ],
  },

  {
    id: 6,
    lines: [{ text: '私たちは砕く.', isEmphasis: false, emphasisPart: { start: 4, end: 6 } }],
  },
]

const isIntersecting = ref({})
const observers = ref([])
const elements = ref({})

// 特定のテキスト部分を強調表示するヘルパー関数 - 複数箇所対応
const renderWithEmphasis = (text, emphasisParts) => {
  if (!emphasisParts || (Array.isArray(emphasisParts) && emphasisParts.length === 0)) return text

  // 単一のemphasisPartオブジェクトが渡された場合は配列に変換
  const parts = Array.isArray(emphasisParts) ? emphasisParts : [emphasisParts]

  // 強調部分とそれ以外の部分に分けるための配列
  const segments = []
  let lastEnd = 0

  // 強調部分を順番に処理
  parts.sort((a, b) => a.start - b.start)

  for (const part of parts) {
    if (part.start > lastEnd) {
      segments.push({
        text: text.substring(lastEnd, part.start),
        isEmphasis: false,
      })
    }

    // 強調部分
    segments.push({
      text: text.substring(part.start, part.end),
      isEmphasis: true,
    })

    lastEnd = part.end
  }

  // 最後の強調部分の後のテキスト
  if (lastEnd < text.length) {
    segments.push({
      text: text.substring(lastEnd),
      isEmphasis: false,
    })
  }

  return segments
}

const registerElement = (el, sectionId, lineIndex) => {
  if (el) {
    if (!elements.value[sectionId]) {
      elements.value[sectionId] = {}
    }
    elements.value[sectionId][lineIndex] = el

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            // Unique key for this line
            const key = `${sectionId}-${lineIndex}`
            if (!isIntersecting.value[key]) {
              isIntersecting.value[key] = true
            }
          }
        }
      },
      {
        threshold: 0.5,
        rootMargin: '0px 0px -30% 0px',
      },
    )

    observer.observe(el)
    observers.value.push(observer)
  }
}

onBeforeUnmount(() => {
  for (const observer of observers.value) {
    if (observer) {
      observer.disconnect()
    }
  }
})
</script>

<template>
  <div class="description">
    <div
      v-for="section in descriptionSections"
      :key="`section-${section.id}`"
      class="description-section"
    >
      <div
        v-for="(line, lineIndex) in section.lines"
        :key="`line-${section.id}-${lineIndex}`"
        class="description-text-container"
        :ref="(el) => registerElement(el, section.id, lineIndex)"
      >
        <!-- 背景テキスト (グレー) -->
        <div class="description-text">
          <template v-if="line.emphasisParts || line.emphasisPart">
            <template
              v-for="(segment, i) in renderWithEmphasis(
                line.text,
                line.emphasisParts || line.emphasisPart,
              )"
              :key="i"
            >
              <span v-if="segment.isEmphasis" class="emphasis emphasis-back">
                {{ segment.text }}
              </span>
              <template v-else>{{ segment.text }}</template>
            </template>
          </template>
          <template v-else>
            {{ line.text }}
          </template>
        </div>

        <!-- 前面テキスト (白/赤) -->
        <div
          class="description-text description-text-front"
          :style="{
            width: isIntersecting[`${section.id}-${lineIndex}`] ? '100%' : '0%',
          }"
        >
          <template v-if="line.emphasisParts || line.emphasisPart">
            <template
              v-for="(segment, i) in renderWithEmphasis(
                line.text,
                line.emphasisParts || line.emphasisPart,
              )"
              :key="i"
            >
              <span v-if="segment.isEmphasis" class="emphasis">
                {{ segment.text }}
              </span>
              <template v-else>{{ segment.text }}</template>
            </template>
          </template>
          <template v-else>
            {{ line.text }}
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.description {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 84px;
  width: 100vw;
  margin-top: 23%;
  position: relative;
  z-index: 10;
}

.description-text-container {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.description-text {
  color: rgba(255, 255, 255, 0.2);
  font-family: 'Zen Kaku Gothic New', serif;
  font-weight: 500;
  font-style: normal;
  font-size: max(3vw, 46px);
  letter-spacing: -4.6px;
  line-height: 64.4px;
  white-space: nowrap;
  min-height: 1.4em;
}

.description-text-front {
  position: absolute;
  top: 0;
  left: 0;
  color: #ffffff;
  overflow: hidden;
  transition: width 1.4s ease;
}

.emphasis {
  color: #ff0000;
  font-family: 'Zen Old Mincho', serif;
  font-weight: 400;
  font-style: normal;
  transform: matrix(1, 0, -0.5, 0.87, 0, 0);
  font-size: max(4vw, 46px);
  display: inline-block;
  vertical-align: top;
}

.emphasis-back {
  color: rgba(255, 255, 255, 0.2);
}
</style>
