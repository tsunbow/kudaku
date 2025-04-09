<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  youtubeId: {
    type: String,
    default: 'HswPW0qeEkE',
  },
  // PC/SPモード判定用のプロパティ（指定しない場合はレスポンシブ対応）
  deviceMode: {
    type: String,
    default: 'responsive', // 'pc', 'sp', 'responsive'のいずれか
    validator: (value) => ['pc', 'sp', 'responsive'].includes(value),
  },
})

const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}

// ESCキーでモーダルを閉じる機能
const handleKeyDown = (e) => {
  if (e.key === 'Escape') {
    closeModal()
  }
}

// モーダル外のクリックで閉じる機能
const modalOverlay = ref(null)
const handleOverlayClick = (e) => {
  if (e.target === modalOverlay.value) {
    closeModal()
  }
}

// モーダルが開いている間はスクロールを無効化
watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  },
)

// 現在のビューポート幅によるデバイスモードの判定
const isMobileView = ref(false)

// ビューポートサイズの変更を監視
const updateViewportSize = () => {
  // deviceModeが'responsive'の場合のみ、ビューポート幅に基づいてモバイルビューを判定
  if (props.deviceMode === 'responsive') {
    isMobileView.value = window.innerWidth <= 768
  } else {
    // deviceModeが明示的に設定されている場合は、その値を使用
    isMobileView.value = props.deviceMode === 'sp'
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)

  // 初期表示時にビューポートサイズをチェック
  updateViewportSize()

  // ウィンドウのリサイズを監視（deviceModeが'responsive'の場合のみ）
  if (props.deviceMode === 'responsive') {
    window.addEventListener('resize', updateViewportSize)
  }
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)

  // レスポンシブモードの場合、リサイズイベントリスナーを削除
  if (props.deviceMode === 'responsive') {
    window.removeEventListener('resize', updateViewportSize)
  }

  // コンポーネントがアンマウントされる時にスクロールを元に戻す
  document.body.style.overflow = ''
})
</script>

<template>
  <div v-if="isOpen" class="youtube-modal-overlay" ref="modalOverlay" @click="handleOverlayClick">
    <div class="youtube-modal-content" :class="{ 'mobile-view': isMobileView }">
      <div class="youtube-modal-header">
        <button class="youtube-modal-close" @click="closeModal">×</button>
      </div>
      <div class="youtube-modal-body">
        <div class="youtube-video-container">
          <iframe
            :src="`https://www.youtube.com/embed/${youtubeId}?autoplay=0&mute=0`"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          >
          </iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.youtube-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.youtube-modal-content {
  width: 90%;
  max-width: 960px;
  background-color: transparent;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.youtube-modal-header {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
}

.youtube-modal-close {
  background: transparent;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.2s;
}

.youtube-modal-close:hover {
  opacity: 1;
}

.youtube-modal-body {
  flex-grow: 1;
}

.youtube-video-container {
  position: relative;
  padding-bottom: 56.25%; /* 16:9のアスペクト比 */
  height: 0;
  overflow: hidden;
}

.youtube-video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

/* モバイルビュー用のスタイル */
.mobile-view .youtube-modal-content {
  width: 95%;
}

.mobile-view .youtube-modal-close {
  font-size: 36px;
  padding: 10px 15px; /* タップしやすいようにパディングを増やす */
}

/* スマホ向けの追加スタイル - deviceModeがresponsiveの場合に適用 */
@media screen and (max-width: 768px) {
  .youtube-modal-content {
    width: 95%;
  }

  .youtube-modal-close {
    font-size: 36px;
    padding: 10px 15px;
  }

  /* さらに小さい画面サイズの場合 */
  @media screen and (max-width: 480px) {
    .youtube-modal-close {
      font-size: 40px;
      padding: 12px 18px;
    }
  }
}
</style>
