<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import lottie from 'lottie-web'

const props = defineProps({
  // アニメーションデータ
  animationData: {
    type: Object,
    required: true,
  },
  // 追加のCSSクラス
  additionalClass: {
    type: String,
    default: '',
  },
  // ホバー時の追加クラス
  hoverClass: {
    type: String,
    default: '',
  },
  // 再生速度（1.0が標準）
  speed: {
    type: Number,
    default: 1.0,
  },
})

const lottieContainer = ref(null)
let animation = null
const isHovered = ref(false)

// ホバー状態のアニメーション
let forwardAnim = null
// 非ホバー状態のアニメーション
let backwardAnim = null

// 前のアニメーションを停止して新しいアニメーションをセットアップする
const setupAnimation = (isHover) => {
  // 既存のアニメーションがあれば破棄
  if (animation) {
    animation.destroy()
    animation = null
  }

  if (!lottieContainer.value) return

  // コンテナの中身をクリア
  lottieContainer.value.innerHTML = ''

  // アニメーションの設定
  const config = {
    container: lottieContainer.value,
    renderer: 'svg',
    loop: false,
    autoplay: true,
    animationData: props.animationData,
  }

  try {
    // 新しいアニメーションを作成
    animation = lottie.loadAnimation(config)
    animation.setSpeed(props.speed)

    if (isHover) {
      // ホバー状態なら正方向再生
      animation.setDirection(1)
      animation.goToAndPlay(0, true)
    } else {
      // 非ホバー状態なら逆方向再生
      animation.setDirection(-1)
      animation.goToAndPlay(animation.totalFrames - 1, true)
    }

    // アニメーション完了時のイベント
    animation.addEventListener('complete', () => {
      if (animation.playDirection === -1) {
        // 逆再生完了時は最初のフレームに設定
        animation.goToAndStop(0, true)
      }
    })
  } catch (error) {
    console.error('Error initializing Lottie animation:', error)
  }
}

// マウスイベントハンドラー
const handleMouseEnter = () => {
  if (isHovered.value) return // 既にホバー状態なら何もしない
  isHovered.value = true
  setupAnimation(true)
}

const handleMouseLeave = () => {
  if (!isHovered.value) return // 既に非ホバー状態なら何もしない
  isHovered.value = false
  setupAnimation(false)
}

onMounted(() => {
  // 初期状態のアニメーションをセットアップ（再生なし、最初のフレームで停止）
  if (!lottieContainer.value) return

  const config = {
    container: lottieContainer.value,
    renderer: 'svg',
    loop: false,
    autoplay: false,
    animationData: props.animationData,
  }

  try {
    animation = lottie.loadAnimation(config)
    animation.goToAndStop(0, true)
  } catch (error) {
    console.error('Error initializing initial Lottie animation:', error)
  }
})

onUnmounted(() => {
  // アニメーションのクリーンアップ
  if (animation) {
    animation.destroy()
    animation = null
  }
})
</script>

<template>
  <div
    ref="lottieContainer"
    class="hover-toggle-lottie"
    :class="[additionalClass, { [hoverClass]: isHovered }]"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  ></div>
</template>

<style scoped>
.hover-toggle-lottie {
  position: relative;
  width: 100%;
  height: 100%;
}

.hover-toggle-lottie svg {
  width: 100%;
  height: 100%;
}
</style>
