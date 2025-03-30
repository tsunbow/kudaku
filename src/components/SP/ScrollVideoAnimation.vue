<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Props定義
const props = defineProps({
  // ビデオソース（必須）
  videoSrc: {
    type: String,
    required: true,
  },
  // アニメーション完了の閾値（0〜1）
  completeThreshold: {
    type: Number,
    default: 0.9,
  },
  // スクロール感度の調整
  scrollSensitivity: {
    type: Number,
    default: 0.6,
  },
  // ブラーの最大値（px単位）
  maxBlur: {
    type: Number,
    default: 100,
  },
})

// 状態管理
const videoElement = ref(null)
let lastScrollY = 0
let ticking = false
let animationStarted = false

// スクロール処理
const handleScroll = () => {
  lastScrollY = window.scrollY

  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateVideoPosition()
      ticking = false
    })
    ticking = true
  }
}

// ビデオ位置の更新
const updateVideoPosition = () => {
  if (!videoElement.value) return

  // コンポーネントの親要素（ラッパー）の位置を取得
  const wrapper = videoElement.value.closest('.scroll-video-wrapper')
  if (!wrapper) return

  const rect = wrapper.getBoundingClientRect()
  const viewportHeight = window.innerHeight

  // セクションが見え始めるよりも前（上方向へのスクロール時）の判定を追加
  // scrollDirection変数を追加して、スクロール方向を判定
  const currentScrollY = window.scrollY
  const scrollingUp = currentScrollY < lastScrollY
  lastScrollY = currentScrollY

  // スクロール進行度に基づいてアニメーションを制御
  if (rect.top <= viewportHeight * 1.8) {
    // アニメーションが始まったフラグを立てる
    animationStarted = true

    // 進行度を計算（0〜1の値）
    const progress = Math.min(
      1,
      Math.max(
        0,
        1 - (rect.top + viewportHeight * 0.3) / (viewportHeight * props.scrollSensitivity),
      ),
    )

    // 指定された閾値以上進んだら、完全に表示する
    if (progress >= props.completeThreshold) {
      videoElement.value.style.transform = 'translateY(0)'
      // フィルターをクリア
      videoElement.value.style.filter = 'none'
    } else {
      // 通常のスクロールベースのアニメーション
      videoElement.value.style.transform = `translateY(${100 - progress * 100}%)`
      // 縦方向のみのブラー効果を適用（SVGフィルター経由）
      const blurValue = Math.floor(props.maxBlur - progress * props.maxBlur)
      videoElement.value.style.filter = `url('#vertical-blur-${blurValue}')`
    }
  } else if (animationStarted && scrollingUp && rect.top > viewportHeight) {
    // ここを変更: スクロールアップ時に、より早く判定
    // セクションが画面の半分より上に出たらアニメーションをリセット
    videoElement.value.style.transform = 'translateY(100%)'
    videoElement.value.style.filter = `url('#vertical-blur-${props.maxBlur}')`
    animationStarted = false
  } else if (!animationStarted) {
    // エリア外かつアニメーションが始まっていない場合は初期状態にする
    videoElement.value.style.transform = 'translateY(100%)'
    videoElement.value.style.filter = `url('#vertical-blur-${props.maxBlur}')`
  }
}

onMounted(() => {
  // 初期状態でビデオを下に配置し、ブラー効果を適用
  if (videoElement.value) {
    videoElement.value.style.transform = 'translateY(100%)'
    videoElement.value.style.filter = `url('#vertical-blur-${props.maxBlur}')`
  }

  // スクロールイベントリスナーを設定
  window.addEventListener('scroll', handleScroll, { passive: true })

  // ブラーフィルターの生成
  createBlurFilters()

  // 初回実行
  setTimeout(() => {
    updateVideoPosition()
  }, 100)
})

onUnmounted(() => {
  // イベントリスナーのクリーンアップ
  window.removeEventListener('scroll', handleScroll)

  // フィルター要素の削除
  removeBlurFilters()
})

// SVGブラーフィルターを動的に生成する関数
const createBlurFilters = () => {
  // すでに存在する場合は作成しない
  if (document.getElementById('vertical-blur-filters')) return

  // SVG要素を作成
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('id', 'vertical-blur-filters')
  svg.setAttribute('width', '0')
  svg.setAttribute('height', '0')
  svg.style.position = 'absolute'
  svg.style.visibility = 'hidden'

  // 0からmaxBlurまでのフィルターを生成
  for (let i = 0; i <= props.maxBlur; i += 1) {
    const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter')
    filter.setAttribute('id', `vertical-blur-${i}`)

    // 縦方向のみのブラー効果を実現するフィルター設定
    const feGaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur')
    feGaussianBlur.setAttribute('in', 'SourceGraphic')
    feGaussianBlur.setAttribute('stdDeviation', `0,${i * 0.5}`) // x方向は0、y方向のみブラー

    filter.appendChild(feGaussianBlur)
    svg.appendChild(filter)
  }

  // ドキュメントに追加
  document.body.appendChild(svg)
}

// フィルター要素を削除する関数
const removeBlurFilters = () => {
  const filtersElement = document.getElementById('vertical-blur-filters')
  if (filtersElement) {
    filtersElement.remove()
  }
}
</script>

<template>
  <div class="scroll-video-wrapper">
    <!-- ビデオ要素 -->
    <video ref="videoElement" class="scroll-video" autoplay loop muted playsinline>
      <source :src="videoSrc" type="video/mp4" />
    </video>

    <!-- スロットでコンテンツを受け取る -->
    <div class="slot-content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.scroll-video-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.scroll-video {
  height: 100%;
  left: 0;
  position: absolute;
  top: -300px;
  width: 100%;
  opacity: 0.9;
  object-fit: cover;
  transition:
    transform 0.2s ease-out,
    filter 0.2s ease-out;
  will-change: transform, filter;
}

.slot-content {
  position: relative;
  z-index: 2;
  height: 100%;
  width: 100%;
}
</style>
