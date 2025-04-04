<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { CommonAssets, PCAssets } from '@/assets/assets.js'

import MouseFollower from '@/components/PC/MouseFollower.vue'
import BlurElement from '@/components/PC/BlurElement.vue'
import ScrollRevealDescription from '@/components/PC/ScrollRevealDescription.vue'
import ScrollRevealSection from '@/components/PC/ScrollRevealSection.vue'
import BlurLogo from '@/components/PC/BlurLogo.vue'
import RevealLogo from '@/components/PC/RevealLogo.vue'

const isHovered = ref(false)
const isModalOpen = ref(false)
const isCopied = ref(false)
const emailAddress = 'info@kudaku.tokyo'

// スクロールアニメーション関連の状態
const contentContainer = ref(null)
const isVideoVisible = ref(false)
const isElement7Visible = ref(false)
const isTextVisible = ref(false)
const isDescriptionVisible = ref(false)
const isLogoVisible = ref(false)

// モーダルを開く関数
const openModal = () => {
  isModalOpen.value = true
  document.body.style.overflow = 'hidden' // スクロールを無効化
}

// モーダルを閉じる関数
const closeModal = () => {
  isModalOpen.value = false
  document.body.style.overflow = '' // スクロールを有効化
}

// メールアドレスをクリップボードにコピーする関数
const copyEmailToClipboard = () => {
  navigator.clipboard.writeText(emailAddress)
  isCopied.value = true
  setTimeout(() => {
    isCopied.value = false
  }, 2000)
}

// content-wrapper1の参照を追加
const contentWrapper1 = ref(null)

// スクロール位置を監視する関数
const handleScroll = () => {
  if (!contentContainer.value || !contentWrapper1.value) return

  const containerRect = contentContainer.value.getBoundingClientRect()
  const wrapper1Rect = contentWrapper1.value.getBoundingClientRect()
  const windowHeight = window.innerHeight

  // content-wrapper1が完全に見えなくなったかどうかを確認
  // wrapper1Rectの下端（bottom）が画面の上端（0）より上になった場合
  const isWrapper1Hidden = wrapper1Rect.bottom <= 0

  // content-wrapper2が表示領域内に入ったかどうかを確認
  const isContainer2Visible = containerRect.top < windowHeight && containerRect.bottom > 0

  // content-wrapper1が見えなくなり、かつcontent-wrapper2が表示領域内に入っている場合
  if (isWrapper1Hidden && isContainer2Visible) {
    // ビデオの表示
    isVideoVisible.value = true

    // 少し遅れて他の要素も表示（順次表示）
    setTimeout(() => {
      isElement7Visible.value = true
    }, 200)

    setTimeout(() => {
      isTextVisible.value = true
    }, 400)

    setTimeout(() => {
      isDescriptionVisible.value = true
    }, 600)

    setTimeout(() => {
      isLogoVisible.value = true
    }, 800)
  } else if (!isContainer2Visible || !isWrapper1Hidden) {
    // content-wrapper2が画面外に出たり、content-wrapper1が再度表示されたら要素を非表示に戻す
    isVideoVisible.value = false
    isElement7Visible.value = false
    isTextVisible.value = false
    isDescriptionVisible.value = false
    isLogoVisible.value = false
  }
}

onMounted(() => {
  // スクロールイベントリスナーを追加
  window.addEventListener('scroll', handleScroll, { passive: true })
  // 初回ロード時にもチェック
  setTimeout(handleScroll, 500)
})

onUnmounted(() => {
  // イベントリスナーをクリーンアップ
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <MouseFollower />
  <div class="pc">
    <div class="hero">
      <div class="hero-body">
        <div class="hero-content-wrapper">
          <div class="video-frame">
            <BlurElement
              type="video"
              class="trim"
              :src="CommonAssets.trim"
              alt="trim"
              loop
              muted
              autoplay
              playsinline
              false
            />
            <div class="logo_kudaku">
              <BlurLogo class="group" :logoSrc="CommonAssets.logo_top" />
            </div>
          </div>
          <BlurElement
            type="lottie"
            :jsonSrc="CommonAssets.KU_JSON"
            :loop="false"
            :autoplay="true"
            class="KU"
          />
          <BlurElement
            type="lottie"
            :jsonSrc="CommonAssets.DA_JSON"
            :loop="false"
            :autoplay="true"
            class="DA"
          />
          <BlurElement
            type="lottie"
            :jsonSrc="CommonAssets.KU2_JSON"
            :loop="false"
            :autoplay="true"
            class="KU2"
          />
          <BlurElement
            type="image"
            class="creative-area"
            :src="CommonAssets.creativeArea"
            alt="Creative area"
          />
        </div>
      </div>
      <div class="frame-6">
        <div class="frame-6-text">Statement</div>
        <div class="frame-6-text">Where We Are</div>
        <div class="frame-7">
          <div class="frame-6-text frame-6-text-gray">Our Projects</div>
        </div>
        <div class="frame-6-text">Let's Talk</div>
        <a
          class="frame-6-text-italic"
          href="https://player.vimeo.com/video/1054903432?h=dc95ee2a5f&autoplay=1&loop=1&background=1"
          target="_blank"
          rel="noopener"
          >Play Concept</a
        >
      </div>
    </div>

    <div class="content-wrapper1" ref="contentWrapper1">
      <ScrollRevealSection>
        <template #text>
          <!-- ここにテキストコンテンツを配置 -->
          <ScrollRevealDescription />
        </template>
      </ScrollRevealSection>
    </div>

    <!-- 修正したcontent-wrapper2部分 -->
    <div class="content-wrapper2" ref="contentContainer">
      <div class="overlap-10">
        <!-- ビデオ要素 - クラスバインディングで表示/非表示を制御 -->
        <video class="frame-4" :class="{ visible: isVideoVisible }" autoplay loop muted playsinline>
          <source :src="CommonAssets.noise" type="video/mp4" />
        </video>

        <!-- 他の要素 - クラスバインディングで表示/非表示を制御 -->
        <img
          class="element-7"
          :class="{ visible: isElement7Visible }"
          alt="Element"
          :src="CommonAssets.layer"
        />

        <p class="where-we-are-content" :class="{ visible: isTextVisible }">
          <span class="where-we-are-text weight-400">
            <span class="span">W</span>
            <span class="where-we-are-text weight-400">here</span>
            <br />
            <span class="where-we-are-text margin-we weight-400">we</span>
            <br />
            <span class="where-we-are-text lineHeight style-italic"> . A</span>
            <span class="where-we-are-text weight-400">re</span>
          </span>
        </p>

        <div class="text-wrapper-14" :class="{ visible: isDescriptionVisible }">
          砕区は、既存のやり方やルールに縛られない
          <br />
          クリエイティブ・エリア。
          <br />
          <br />
          少数精鋭チームにより、
          <br />
          全体像を把握・共有しながら細部にこだわっていく。
          <br />
          無駄をカットし、然るべき部分にリソースを配分する。
          <br />
          <br />
          プロデューサー／映像作家／アートディレクター／写真家／空間デザイナーなどが交わり
          <br />
          クライアントとの自由な発想とコラボレーションで心と人を動かすアウトプットを産み、
          <br />
          愛されるブランドを育む。
        </div>

        <div class="logo_red" :class="{ visible: isLogoVisible }">
          <RevealLogo
            class="group-7"
            :logoSrc="CommonAssets.logo_red"
            :initialBlur="10"
            :triggerOffset="3000"
          />
        </div>
      </div>
    </div>

    <div class="content-wrapper3">
      <div class="frame-5">
        <div class="overlap-11">
          <div class="group-8" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
            <div class="overlap-group-4">
              <img class="vector-2" alt="Vector" :src="CommonAssets.vector" />
              <img
                class="letsTalk-text"
                alt="letsTalk"
                :src="PCAssets.lets_talk"
                @click="openModal"
              />
              <img
                :class="['letsTalk-circle', { 'letsTalk-circle-hover': isHovered }]"
                alt=""
                :src="isHovered ? PCAssets.circle_hover : PCAssets.circle"
              />
            </div>
          </div>
        </div>

        <div class="element-KUDAKU">©2025&nbsp;&nbsp;KUDAKU</div>
      </div>
    </div>
  </div>

  <!-- モーダル -->
  <div v-if="isModalOpen" class="modal-overlay">
    <div class="modal-content">
      <img :src="CommonAssets.email_text" alt="info@kudaku.tokyo" class="email-text" />
      <div class="copy-button-wrapper">
        <img
          :src="CommonAssets.copy_button"
          class="copy-button"
          alt="copy"
          @click="copyEmailToClipboard"
          :class="{ 'button-clicked': isCopied }"
        />
        <span v-if="isCopied" class="copied-message">Copied!</span>
      </div>
      <img :src="CommonAssets.close_btn" alt="閉じる" class="modal-close" @click="closeModal" />
    </div>
  </div>
</template>

<style scoped>
@import url('https://use.typekit.net/jnv8yhd.css');
@import url('https://use.typekit.net/azb1dqq.css');
@import url('https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@500&family=Zen+Old+Mincho&display=swap');

/* アニメーション関連のスタイル - ブラー効果追加 */
.frame-4,
.element-7,
.where-we-are-content,
.text-wrapper-14,
.logo_red {
  opacity: 0;
  transform: translateY(50px);
  filter: blur(10px);
  transition:
    opacity 0.6s ease-out,
    transform 0.8s ease-out,
    filter 0.6s ease-out;
  will-change: opacity, transform, filter;
}

/* 表示状態のスタイル */
.visible {
  opacity: 1 !important;
  transform: translateY(0) !important;
  filter: blur(0) !important;
}

/* 各要素ごとの個別ブラー効果 */
.frame-4 {
  filter: blur(15px);
  height: 2400px;
  left: 0;
  position: absolute;
  top: 0;
  width: 100vw;
  object-fit: cover;
}

.element-7 {
  filter: blur(8px);
}

.where-we-are-content {
  filter: blur(12px);
}

.text-wrapper-14 {
  filter: blur(5px);
}

.logo_red {
  filter: blur(10px);
}

/* 以下は既存のスタイル */
.pc {
  background-position: 50% 50%;
  background-size: cover;
  position: relative;
  width: 100vw;
}

.hero {
  height: 631px;
}

.hero-body {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  margin-top: 20vh;
}

.hero-content-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;
}
.video-frame {
  position: relative;
  width: 34vw;
  height: 0;
  padding-bottom: 34.5vw;
  margin: 0 auto;
}

.trim {
  width: 134%;
  height: 105%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  object-fit: cover;
  border: none;
}

.KU {
  width: 36vw;
  height: auto;
  aspect-ratio: 517 / 379;
  position: absolute;
  left: 0;
  top: -3%;
}

.DA {
  width: 20vw;
  height: auto;
  aspect-ratio: 287 / 224;
  position: absolute;
  left: 0;
  top: calc(18vw + 13px);
}

.KU2 {
  width: 31.2vw;
  height: auto;
  aspect-ratio: 449 / 360;
  position: absolute;
  right: 0;
  top: calc(16vw + 22px);
}

.creative-area {
  width: 8vw;
  height: auto;
  aspect-ratio: 116 / 56;
  position: absolute;
  right: 20%;
  top: 5vw;
}
.logo_kudaku {
  width: 4.5vw;
  max-width: 64px;
  height: auto;
  position: absolute;
  top: 50%;
  left: 52%;
  transform: translate(-50%, -50%);
}

.content-wrapper1 {
  position: relative;
  z-index: 2;
  transform-style: preserve-3d;
  margin-top: 150px;
  height: 3500px;
}

.content-wrapper2 {
  position: relative;
  z-index: 2;
  transform-style: preserve-3d;
  height: 2160px;
}

.content-wrapper3 {
  position: relative;
  z-index: 2;
  transform-style: preserve-3d;
}

.overlap-10 {
  height: 2400px;
  width: 100vw;
  position: relative;
}

.overlap-10::after {
  background: linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
}
.overlap-10::before {
  background: linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
}
.element-7 {
  height: 400px;
  right: 0;
  position: absolute;
  top: 56%;
  width: 74vw;
}

.where-we-are-content {
  color: #ffffff;
  font-size: 26vw;
  right: 4%;
  line-height: 0;
  position: absolute;
  top: 30%;
}

.span {
  font-family: nautica, sans-serif;
  font-size: 17vw;
  font-style: normal;
  font-weight: 500;
}

.where-we-are-text {
  font-family: ivyora-display, sans-serif;
  font-style: normal;
  font-size: 15vw;
  letter-spacing: 13px;
  line-height: 210px;
}
.weight-400 {
  font-weight: 400;
}

.margin-we {
  margin-left: 100px;
}

.lineHeight {
  line-height: 1.4;
}

.text-wrapper-14 {
  color: #ffffff;
  font-family: 'Zen Kaku Gothic New', serif;
  font-weight: 500;
  font-style: normal;
  font-size: 1.1vw;
  left: 22%;
  letter-spacing: -1.6px;
  line-height: 30px;
  position: absolute;
  top: 40%;
  width: 50vw;
}

.logo_red {
  color: red;
  right: 11%;
  position: absolute;
  top: 51%;
  width: 4.5vw;
  max-width: 64px;
}

.frame-5 {
  background-image: url(@/assets/img/2-9.png);
  background-position: 50% 50%;
  background-size: cover;
  height: 100vh;
  width: 100vw;
}

.overlap-11 {
  width: 510px;
  height: 180px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}

.vector-2 {
  width: 17vw;
  height: 12vw;
  position: absolute;
  right: 0;
  left: 0;
  margin: auto;
}

.group-8 {
  width: 35vw;
  height: 11vw;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}

.overlap-group-4 {
  position: relative;
}

.letsTalk-text {
  position: absolute;
  width: 35vw;
  height: 11vw;
  cursor: pointer;
  z-index: 10;
}

.letsTalk-circle {
  position: absolute;
  width: 28vw;
  height: 12vw;
  left: 10%;
  z-index: 5;
  pointer-events: none;
}

.letsTalk-circle-hover {
  position: absolute;
  width: 66vw;
  height: 48vw;
  top: 50%;
  left: 50%;
  transform: translate(-45%, -38%);
  z-index: 5;
  pointer-events: none;
}

.style-italic {
  font-family: ivyora-display, sans-serif;
  font-weight: 400;
  font-style: italic;
}

.element-KUDAKU {
  color: #ff0000;
  font-family: ivyora-display, sans-serif;
  font-weight: 500;
  font-style: italic;
  font-size: 2vw;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  letter-spacing: 1.6px;
  line-height: 36.8px;
  text-align: center;
  white-space: nowrap;
  margin-bottom: 10px;
}

.frame-6 {
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  gap: 18px;
  right: 0;
  padding: 0 7px;
  position: fixed;
  top: 56px;
  width: 227px;
  z-index: 20;
}

.frame-6-text {
  color: #ffffff;
  font-family: ivyora-display, sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: max(calc(5vw - 54px), 14px);
  letter-spacing: 0.54px;
  line-height: 20.7px;
  position: relative;
  text-align: center;
  white-space: nowrap;
  width: fit-content;
}

.frame-6-text-italic {
  color: #ffffff;
  font-family: ivyora-display, sans-serif;
  font-weight: 400;
  font-style: italic;
  font-size: max(calc(5vw - 54px), 14px);
  letter-spacing: 0.54px;
  line-height: 20.7px;
  position: relative;
  text-align: center;
  white-space: nowrap;
  width: fit-content;
}

.frame-6-text-gray {
  color: rgba(255, 255, 255, 0.5);
}

.frame-7 {
  align-items: flex-start;
  display: inline-flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 5px;
  position: relative;
}

/* モーダル関連のスタイル */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(@/assets/img/bg_color.png);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.email-text {
  width: 20vw;
  height: 4vw;
  margin-bottom: 1vw;
}
.copy-button-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.copy-button {
  width: 7vw;
  height: 8vw;
  cursor: pointer;
  transition: transform 0.2s;
}

.copy-button:hover {
  transform: scale(1.05);
}

.button-clicked {
  transform: scale(0.95);
}

.copied-message {
  position: absolute;
  bottom: -30px;
  color: white;
  font-family: ivyora-display, sans-serif;
  font-size: 16px;
  font-style: italic;
  opacity: 0;
  animation: fadeInOut 2s forwards;
}

@keyframes fadeInOut {
  0% {
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.modal-close {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  width: 4vw;
  height: 4vw;
}
</style>
