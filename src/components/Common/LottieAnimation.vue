<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import lottie from 'lottie-web'

const props = defineProps({
  // アニメーションのJSONデータ
  jsonSrc: {
    type: Object,
    required: true,
  },
  // ループ再生するかどうか
  loop: {
    type: Boolean,
    default: false,
  },
  // 追加のCSSクラス
  additionalClass: {
    type: String,
    default: '',
  },
  // 表示判定のためのルートマージン
  rootMargin: {
    type: String,
    default: '0px',
  },
  // 表示判定のしきい値（0〜1の間）
  threshold: {
    type: Number,
    default: 0.2,
  },
  // アニメーションの再生速度（1.0が標準速度）
  speed: {
    type: Number,
    default: 1.0,
  },
  // 表示されてからアニメーション開始までの遅延（ミリ秒）
  delay: {
    type: Number,
    default: 0,
  },
})

const lottieContainer = ref(null)
let animation = null
const isInitialized = ref(false)
const isVisible = ref(false)
let observer = null
let delayTimeout = null

// Lottieアニメーションを初期化する関数
const initAnimation = () => {
  if (lottieContainer.value && props.jsonSrc && !isInitialized.value) {
    // 既存のアニメーションがあれば破棄
    if (animation) {
      animation.destroy()
    }

    // 新しいLottieアニメーションを作成
    animation = lottie.loadAnimation({
      container: lottieContainer.value,
      renderer: 'svg',
      loop: props.loop,
      autoplay: false, // 最初は自動再生しない
      animationData: props.jsonSrc,
    })

    // アニメーション速度を設定
    animation.setSpeed(props.speed)

    isInitialized.value = true
  }
}

// 要素の可視性が変化したときの処理
const handleVisibilityChange = (entries) => {
  const [entry] = entries
  const wasVisible = isVisible.value
  isVisible.value = entry.isIntersecting

  // 遅延タイマーをクリア
  if (delayTimeout) {
    clearTimeout(delayTimeout)
    delayTimeout = null
  }

  if (entry.isIntersecting) {
    // 要素が表示されたとき
    if (!isInitialized.value) {
      initAnimation()
    }

    // 指定された遅延後にアニメーションを開始
    if (props.delay > 0) {
      delayTimeout = setTimeout(() => {
        if (animation && isVisible.value) {
          animation.goToAndStop(0, true)
          animation.play()
        }
      }, props.delay)
    } else {
      // 遅延なしの場合は即時再生
      if (animation) {
        animation.goToAndStop(0, true)
        animation.play()
      }
    }
  } else {
    // 要素が非表示になったとき
    if (animation && !props.loop) {
      animation.stop()
    }
  }
}

// speedプロパティの変更を監視
watch(
  () => props.speed,
  (newSpeed) => {
    if (animation) {
      animation.setSpeed(newSpeed)
    }
  },
)

// jsonSrcの変更を監視
watch(
  () => props.jsonSrc,
  () => {
    // JSONデータが変更されたら、アニメーションを再初期化
    isInitialized.value = false
    if (isVisible.value) {
      initAnimation()
    }
  },
  { deep: true },
)

onMounted(() => {
  // Intersection Observerの初期化
  observer = new IntersectionObserver(handleVisibilityChange, {
    rootMargin: props.rootMargin,
    threshold: props.threshold,
  })

  // 対象要素の監視を開始
  if (lottieContainer.value) {
    observer.observe(lottieContainer.value)
  }
})

onUnmounted(() => {
  // 遅延タイマーのクリーンアップ
  if (delayTimeout) {
    clearTimeout(delayTimeout)
    delayTimeout = null
  }

  // アニメーションのクリーンアップ
  if (animation) {
    animation.destroy()
    animation = null
  }

  // Intersection Observerの解除
  if (observer) {
    observer.disconnect()
    observer = null
  }
})
</script>

<template>
  <div
    ref="lottieContainer"
    class="lottie-animation-container"
    :class="[additionalClass, { visible: isVisible }]"
  ></div>
</template>

<style scoped>
.lottie-animation-container {
  position: relative;
  width: 100%;
  height: 100%;
  opacity: 0;
  transform: translateY(50px);
  transition:
    opacity 0.6s ease-out,
    transform 0.8s ease-out;
  will-change: opacity, transform;
}

.lottie-animation-container.visible {
  opacity: 1;
  transform: translateY(0);
}

.lottie-animation-container svg {
  width: 100%;
  height: 100%;
}
</style>
