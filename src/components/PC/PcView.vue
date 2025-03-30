<script setup>
import trim from '@/assets/video/trim.mp4'
import noise from '@/assets/video/noise.mp4'
import KU_JSON from '@/assets/lottie/KU1.json'
import DA_JSON from '@/assets/lottie/DA.json'
import KU2_JSON from '@/assets/lottie/KU2.json'
import creativeArea from '@/assets/img/creative-area.svg'
import logo_top from '@/assets/img/logo_top.svg'
import logo_red from '@/assets/img/logo_red.svg'
import layer from '@/assets/img/layer.png'
import vector from '@/assets/img/vector.png'
import lets_talk from '@/assets/img/letstalk_pc.svg'
import circle from '@/assets/img/letstalk_circle.svg'
import circle_hover from '@/assets/img/letstalk_circle_hover.svg'
import email_text from '@/assets/img/email_text.svg'
import copy_button from '@/assets/img/copy_button.svg'
import close_btn from '@/assets/img/close_button.svg'

import MouseFollower from '@/components/PC/MouseFollower.vue'
import BlurElement from '@/components/PC/BlurElement.vue'
import ScrollRevealDescription from '@/components/PC/ScrollRevealDescription.vue'
import ScrollRevealSection from '@/components/PC/ScrollRevealSection.vue'
import BlurLogo from '@/components/PC/BlurLogo.vue'
import RevealLogo from '@/components/PC/RevealLogo.vue'
// ScrollVideoAnimationコンポーネントの使用はやめて直接実装

import { ref, onMounted, onUnmounted } from 'vue'
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

// スクロール位置を監視する関数
const handleScroll = () => {
  if (!contentContainer.value) return

  const rect = contentContainer.value.getBoundingClientRect()
  const windowHeight = window.innerHeight

  // 要素がビューポート内に入ったかどうかを確認
  const isVisible =
    rect.top < windowHeight * 0.3 && // 要素の上部が画面の80%以内に入った
    rect.bottom > windowHeight * 0.2 // 要素の下部が画面の20%以上に残っている

  // 画面中央に近いほど1に近づくスコア（0〜1）を計算
  const elementCenter = rect.top + rect.height / 2
  const viewportCenter = windowHeight / 2
  const distanceFromCenter = Math.abs(elementCenter - viewportCenter)
  const maxDistance = windowHeight / 2 + rect.height / 2
  const centerScore = 1 - Math.min(1, distanceFromCenter / maxDistance)

  // 一定のスコア（0.3）を超えたら要素を表示し始める
  // 順番に表示するために少しずつ遅延を入れる
  isVideoVisible.value = centerScore > 0.3

  // 少し遅れて他の要素も表示
  setTimeout(() => {
    isElement7Visible.value = centerScore > 0.3
  }, 100)

  setTimeout(() => {
    isTextVisible.value = centerScore > 0.3
  }, 200)

  setTimeout(() => {
    isDescriptionVisible.value = centerScore > 0.3
  }, 300)

  setTimeout(() => {
    isLogoVisible.value = centerScore > 0.3
  }, 400)
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
              :src="trim"
              alt="trim"
              loop
              muted
              autoplay
              playsinline
              false
            />
            <div class="logo_kudaku">
              <BlurLogo class="group" :logoSrc="logo_top" />
            </div>
          </div>
          <BlurElement type="lottie" :jsonSrc="KU_JSON" :loop="false" :autoplay="true" class="KU" />
          <BlurElement type="lottie" :jsonSrc="DA_JSON" :loop="false" :autoplay="true" class="DA" />
          <BlurElement
            type="lottie"
            :jsonSrc="KU2_JSON"
            :loop="false"
            :autoplay="true"
            class="KU2"
          />
          <BlurElement type="image" class="creative-area" :src="creativeArea" alt="Creative area" />
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

    <div class="content-wrapper1">
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
          <source :src="noise" type="video/mp4" />
        </video>

        <!-- 他の要素 - クラスバインディングで表示/非表示を制御 -->
        <img class="element-7" :class="{ visible: isElement7Visible }" alt="Element" :src="layer" />

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
          クライアントとの自由な発想とコラボレーションで
          <br />
          心と人を動かすアウトプットを産み、愛されるブランドを育む。
        </div>

        <div class="logo_red" :class="{ visible: isLogoVisible }">
          <RevealLogo class="group-7" :logoSrc="logo_red" :initialBlur="10" :triggerOffset="3000" />
        </div>
      </div>
    </div>

    <div class="content-wrapper3">
      <div class="frame-5">
        <div class="overlap-11">
          <div class="group-8" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
            <div class="overlap-group-4">
              <img class="vector-2" alt="Vector" :src="vector" />
              <img class="letsTalk-text" alt="letsTalk" :src="lets_talk" @click="openModal" />
              <img
                :class="['letsTalk-circle', { 'letsTalk-circle-hover': isHovered }]"
                alt=""
                :src="isHovered ? circle_hover : circle"
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
      <img :src="email_text" alt="info@kudaku.tokyo" class="email-text" />
      <div class="copy-button-wrapper">
        <img
          :src="copy_button"
          class="copy-button"
          alt="copy"
          @click="copyEmailToClipboard"
          :class="{ 'button-clicked': isCopied }"
        />
        <span v-if="isCopied" class="copied-message">Copied!</span>
      </div>
      <img :src="close_btn" alt="閉じる" class="modal-close" @click="closeModal" />
    </div>
  </div>
</template>

<style scoped>
@import url('https://use.typekit.net/jnv8yhd.css');
@import url('https://use.typekit.net/azb1dqq.css');
@import url('https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@500&family=Zen+Old+Mincho&display=swap');

/* アニメーション関連のスタイル - 修正部分 */
.frame-4,
.element-7,
.where-we-are-content,
.text-wrapper-14,
.logo_red {
  opacity: 0;
  transform: translateY(50px);
  transition:
    opacity 0.6s ease-out,
    transform 0.8s ease-out;
  will-change: opacity, transform;
}

/* 表示状態のスタイル */
.visible {
  opacity: 1 !important;
  transform: translateY(0) !important;
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
  margin-top: 20vw;
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
  height: 3000px;
}

.content-wrapper2 {
  position: relative;
  z-index: 2;
  transform-style: preserve-3d;
  height: 2400px;
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
  font-size: calc(5vw - 48px);
  left: 16%;
  letter-spacing: -1.6px;
  line-height: 30px;
  position: absolute;
  top: 48%;
  width: 50vw;
}

.logo_red {
  color: red;
  right: 11%;
  position: absolute;
  top: 51%;
  width: 4.5vw;
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
  margin-bottom: 2px;
}

.frame-6 {
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  gap: 18px;
  right: 0;
  padding: 0px 7px;
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
