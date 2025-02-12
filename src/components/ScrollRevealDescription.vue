<script setup>
import { ref, onBeforeUnmount } from 'vue'
import x701 from '@/assets/img/70-1.png'
import x281 from '@/assets/img/28-1.png'
import x19 from '@/assets/img/1-9.png'
import x631 from '@/assets/img/63-1.png'
import x271 from '@/assets/img/27-1.png'
import x41 from '@/assets/img/4-1.png'

const descriptionItems = [
  {
    prefix: '私たちは問う.',
    breakLine: true,
    mainText: '誰かの顔色ではなく, そこに埋もれた',
    emphasisTexts: ['本質'],
    suffix: 'を.',
  },
  {
    prefix: '私たちは試す.',
    breakLine: true,
    mainText: '既成概念を取っ払って,道標となる',
    emphasisTexts: ['アプローチ'],
    suffix: 'を.',
  },
  {
    prefix: '私たちは進む.',
    breakLine: true,
    mainText: 'アンテナを張り巡らし,時代の',
    emphasisTexts: ['半歩先'],
    suffix: 'を.',
  },
  {
    prefix: '私たちは巻き込む.',
    breakLine: true,
    mainText: '領域や組織を超えたチームで,衝突を恐れない',
    emphasisTexts: ['議論'],
    suffix: 'を.',
  },
  {
    prefix: '私たちは願う.',
    breakLine: true,
    mainText: '産まれたアイデアが多くの人に',
    emphasisTexts: ['愛される'],
    suffix: 'ことを.',
  },
  {
    prefix: '私たちは並び歩む.',
    breakLine: true,
    mainText: 'クライアントと本音で',
    emphasisTexts: ['向きあい', '共有'],
    suffix: 'しながら.',
  },
  {
    prefix: '私たちは',
    breakLine: false,
    mainText: '',
    emphasisTexts: ['砕く'],
    suffix: '.',
  },
]

const isIntersecting = ref({})
const observers = ref([])
const elements = ref([])

const registerElement = (el, index) => {
  if (el) {
    elements.value[index] = el

    const observer = new IntersectionObserver(
      (entries) => {
        // biome-ignore lint/complexity/noForEach: <explanation>
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isIntersecting.value[index]) {
            isIntersecting.value[index] = true
          }
        })
      },
      {
        threshold: 0.5,
        rootMargin: '0px 0px -10% 0px',
      },
    )

    observer.observe(el)
    observers.value[index] = observer
  }
}

onBeforeUnmount(() => {
  // biome-ignore lint/complexity/noForEach: <explanation>
  observers.value.forEach((observer) => {
    if (observer) {
      observer.disconnect()
    }
  })
})
</script>

<template>
  <div class="description">
    <div
      v-for="(item, index) in descriptionItems"
      :key="index"
      class="description-text-container"
      :ref="(el) => registerElement(el, index)"
    >
      <!-- 背景テキスト (グレー) -->
      <div class="description-text">
        {{ item.prefix }}
        <br v-if="item.breakLine" />
        {{ item.mainText }}
        <template v-for="(emphasis, empIndex) in item.emphasisTexts" :key="empIndex">
          <span class="emphasis emphasis-back">{{ emphasis }}</span>
        </template>
        {{ item.suffix }}
      </div>

      <!-- 前面テキスト (白) -->
      <div
        class="description-text description-text-front"
        :style="{ width: isIntersecting[index] ? '100%' : '0%' }"
      >
        {{ item.prefix }}
        <br v-if="item.breakLine" />
        {{ item.mainText }}
        <template v-for="(emphasis, empIndex) in item.emphasisTexts" :key="empIndex">
          <span class="emphasis">{{ emphasis }}</span>
        </template>
        {{ item.suffix }}
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
  margin-top: 1000px;
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
  font-size: 46px;
  letter-spacing: -4.6px;
  line-height: 64.4px;
  white-space: nowrap;
}

.description-text-front {
  position: absolute;
  top: 0;
  left: 0;
  color: #ffffff;
  overflow: hidden;
  transition: width 2s ease;
}

.emphasis {
  color: #ff0000;
  font-family: 'Zen Old Mincho', serif;
  font-weight: 400;
  font-style: normal;
  transform: matrix(1, 0, -0.5, 0.87, 0, 0);
  font-size: 78px;
  display: inline-block;
  vertical-align: top;
}

.emphasis-back {
  color: rgba(255, 255, 255, 0.2);
}
</style>
