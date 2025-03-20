<!-- MouseFollower.vue - スクロール対応バージョン -->
<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

// 基本的なマウス位置の追跡
const position = ref({ x: 0, y: 0 })
const hoveredText = ref('')
const textWidth = ref(0)

// 対象となる要素のDOM要素とその位置情報を保存
const targetRect = ref(null)
const isInTargetArea = ref(false)

// スクロール位置の追跡
const scrollY = ref(0)
const isAtTopSection = ref(true) // ページ上部にいるかどうか

// テキスト要素のホバー状態
const textHoverState = ref(false)

// フォロワーの表示状態 - トップセクションにいる場合のみvideo-frame機能を有効化
const showDefaultFollower = computed(
  () => (!isInTargetArea.value || !isAtTopSection.value) && !textHoverState.value,
)
const showTextFollower = computed(() => !isInTargetArea.value && textHoverState.value)
const showVideoFollower = computed(() => isInTargetArea.value && isAtTopSection.value)

// トップセクションの高さ (hero要素の高さを基準にする)
const topSectionHeight = ref(631) // デフォルト値、後でDOM要素から取得

// テキストの幅を測定する関数
const measureTextWidth = (text) => {
  const measurer = document.createElement('div')
  measurer.style.position = 'absolute'
  measurer.style.visibility = 'hidden'
  measurer.style.whiteSpace = 'nowrap'
  measurer.style.fontFamily = 'ivyora-display, sans-serif'
  measurer.style.fontSize = '16px'
  measurer.textContent = text

  document.body.appendChild(measurer)
  const width = measurer.offsetWidth
  document.body.removeChild(measurer)

  return width
}

// 円のサイズを計算
const circleSize = computed(() => {
  if (!textHoverState.value) return { width: 24, height: 24 }

  // テキストの幅に基づいてサイズを計算
  const padding = 10 // テキストの左右のパディング
  const size = textWidth.value + padding

  // 最小サイズと最大サイズの制限
  const minSize = 80
  const maxSize = 200

  const finalSize = Math.min(Math.max(size, minSize), maxSize)

  return {
    width: finalSize,
    height: finalSize,
  }
})

// 対象エリアの位置情報をキャッシュする関数
const cacheTargetPosition = () => {
  // blur-container trimを対象に変更
  const targetElement = document.querySelector('.trim')
  if (targetElement) {
    targetRect.value = targetElement.getBoundingClientRect()
  }

  // hero要素の高さを取得してトップセクションの高さとして使用
  const heroElement = document.querySelector('.hero')
  if (heroElement) {
    topSectionHeight.value = heroElement.offsetHeight
  }
}

// 点が矩形内に含まれるかチェックする関数
const isPointInRect = (x, y, rect) => {
  if (!rect) return false
  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
}

// スクロール位置の更新とトップセクションにいるかの判定
const handleScroll = () => {
  scrollY.value = window.scrollY
  isAtTopSection.value = scrollY.value < topSectionHeight.value
}

// マウス移動ハンドラー - 遅延を最小限に
const handleMouseMove = (e) => {
  // アニメーションフレームでの更新を避け、直接更新して応答性を向上
  position.value = { x: e.clientX, y: e.clientY }

  // トップセクションにいる場合のみターゲットエリアをチェック
  if (isAtTopSection.value && targetRect.value) {
    isInTargetArea.value = isPointInRect(e.clientX, e.clientY, targetRect.value)
  } else {
    isInTargetArea.value = false
  }

  // ホバーしている要素をチェック (対象エリア外の場合のみ)
  if (!isInTargetArea.value || !isAtTopSection.value) {
    const hoveredElement = document.elementFromPoint(e.clientX, e.clientY)
    if (
      hoveredElement?.classList.contains('frame-6-text') ||
      hoveredElement?.classList.contains('frame-6-text-italic')
    ) {
      textHoverState.value = true
      hoveredText.value = hoveredElement.textContent
      textWidth.value = measureTextWidth(hoveredText.value)
    } else {
      textHoverState.value = false
      hoveredText.value = ''
    }
  } else {
    // 対象エリア内ではテキストホバーは無効
    textHoverState.value = false
    hoveredText.value = ''
  }
}

// 動画を再生する関数
const playVideo = () => {
  if (isInTargetArea.value && isAtTopSection.value) {
    window.open(
      'https://player.vimeo.com/video/1054903432?h=dc95ee2a5f&autoplay=1&loop=1',
      '_blank',
    )
  }
}

// ウィンドウリサイズ時に対象エリアの位置を再キャッシュ
const handleResize = () => {
  cacheTargetPosition()
  handleScroll() // スクロール位置も更新
}

onMounted(() => {
  // 初期位置のキャッシュ
  cacheTargetPosition()

  // 初期スクロール位置の設定
  handleScroll()

  // イベントリスナーを設定
  window.addEventListener('mousemove', handleMouseMove, { passive: true })
  window.addEventListener('resize', handleResize)
  window.addEventListener('scroll', handleScroll, { passive: true })

  // 対象エリアの位置を定期的に更新
  const intervalId = setInterval(() => {
    cacheTargetPosition()
    handleScroll()
  }, 1000)

  // クリーンアップ用に保存
  onUnmounted(() => {
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('resize', handleResize)
    window.removeEventListener('scroll', handleScroll)
    clearInterval(intervalId)
  })
})
</script>

<template>
  <div class="mouse-follower">
    <!-- 通常の赤い円のフォロワー -->
    <div
      v-show="showDefaultFollower"
      class="follower"
      :style="{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '24px',
        height: '24px',
      }"
    ></div>

    <!-- テキストホバー時のフォロワー -->
    <div
      v-show="showTextFollower"
      class="follower text-follower"
      :style="{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${circleSize.width}px`,
        height: `${circleSize.height}px`,
      }"
    >
      <span class="follower-text">{{ hoveredText }}</span>
    </div>

    <!-- 対象エリア上でのフォロワー - トランジションを削除して即時反応 -->
    <div
      v-show="showVideoFollower"
      class="movie-play-follower no-transition"
      :style="{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }"
      @click.stop="playVideo"
    >
      <div class="ellipse">
        <img class="vector" alt="Vector" src="@/assets/img/vector.png" />
        <div class="text-wrapper">Play Concept</div>
      </div>
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
  background-color: red;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    width 0.2s ease,
    height 0.2s ease;
}

.text-follower {
  /* テキスト表示用フォロワーのスタイル */
}

.follower-text {
  color: white;
  font-size: 16px;
  white-space: nowrap;
  text-align: center;
  font-family: ivyora-display, sans-serif;
  padding: 0 20px;
}

/* Movie play follower styles */
.movie-play-follower {
  position: absolute;
  transform: translate(-50%, -50%);
  z-index: 50;
  pointer-events: auto; /* クリックを可能にする */
  cursor: pointer;
}

/* トランジションを削除して即時反応させる */
.no-transition {
  transition: none !important;
}

.movie-play-follower .ellipse {
  width: 90px;
  height: 90px;
  border: 1px solid #d9d9d9;
  border-radius: 45px;
  position: relative;
}

.movie-play-follower .vector {
  width: 25px;
  height: 22px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}

.movie-play-follower .text-wrapper {
  color: #ffffff;
  font-family: ivyora-display, sans-serif;
  font-weight: 400;
  font-style: italic;
  font-size: 14px;
  letter-spacing: 0.42px;
  line-height: 16.1px;
  position: absolute;
  left: 5px;
  top: 98px;
}
</style>
