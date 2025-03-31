<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import trim from '@/assets/video/trim.mp4'
import noise from '@/assets/video/noise.mp4'
import KU_JSON from '@/assets/lottie/KU1.json'
import DA_JSON from '@/assets/lottie/DA.json'
import KU2_JSON from '@/assets/lottie/KU2.json'
import creativeArea from '@/assets/img/creative-area.svg'
import play_concept from '@/assets/img/play_concept_sp.svg'
import logo_top from '@/assets/img/logo_top.svg'
import logo_red from '@/assets/img/logo_red.svg'
import layer from '@/assets/img/layer.png'
import vector from '@/assets/img/vector.png'
import lets_talk from '@/assets/img/letstalk_sp.svg'
import email_text from '@/assets/img/email_text.svg'
import copy_button from '@/assets/img/copy_button.svg'
import close_btn from '@/assets/img/close_button.svg'

import BlurElement from '@/components/SP/BlurElement.vue'
import ScrollRevealDescription from '@/components/SP/ScrollRevealDescription.vue'
import ScrollRevealSection from '@/components/SP/ScrollRevealSection.vue'
import BlurLogo from '@/components/SP/BlurLogo.vue'
import RevealLogo from '@/components/SP/RevealLogo.vue'
// ScrollVideoAnimationコンポーネントの使用はやめて直接実装

// スクロールアニメーション関連の状態
const contentContainer = ref(null)
const contentWrapper1 = ref(null)
const isVideoVisible = ref(false)
const isElement7Visible = ref(false)
const isTextVisible = ref(false)
const isDescriptionVisible = ref(false)
const isLogoVisible = ref(false)
const isModalOpen = ref(false)
const isCopied = ref(false)
const emailAddress = 'info@kudaku.tokyo'
const videoUrl =
  'https://player.vimeo.com/video/1054903432?h=dc95ee2a5f&autoplay=1&loop=1&background=1'

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

// Vimeo動画を開く関数
const openVimeoVideo = () => {
  window.open(videoUrl, '_blank')
}

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
  <div class="sp">
    <div class="hero">
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
      <div class="hero-body">
        <BlurElement type="image" class="creative-area" :src="creativeArea" alt="Creative area" />
        <div class="hero-content-wrapper">
          <div class="logo_kudaku">
            <BlurLogo class="group" :logoSrc="logo_top" />
          </div>
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
          <BlurElement
            type="image"
            :src="play_concept"
            alt="play_concept"
            class="play-concept"
            @click="openVimeoVideo"
          />
        </div>
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
          少数精鋭チームにより、
          <br />
          全体像を把握・共有しながら細部にこだわっていく。
          <br />
          無駄をカットし、然るべき部分にリソースを配分する。
          <br />
          <br />
          <br />
          プロデューサー／映像作家／アートディレクター／写真家／
          <br />
          空間デザイナーなどが交わり、
          <br />
          クライアントとの自由な発想とコラボレーションで心と人を
          <br />
          動かすアウトプットを産み、愛されるブランドを育む。
          <br />
          <br />
          <br />
          砕区は、既存のやり方やルールに縛られない
          <br />
          クリエイティブ・エリア。
        </div>

        <div class="logo_red" :class="{ visible: isLogoVisible }">
          <RevealLogo class="group-7" :logoSrc="logo_red" :initialBlur="10" :triggerOffset="3000" />
        </div>
      </div>
    </div>

    <div class="content-wrapper3">
      <div class="frame-5">
        <div class="overlap-11">
          <div class="group-8">
            <div class="overlap-group-4">
              <img class="vector-2" alt="Vector" :src="vector" />
              <img class="letsTalk-text" alt="letsTalk" :src="lets_talk" @click="openModal" />
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

.sp {
  background-position: 50% 50%;
  background-size: cover;
  position: relative;
  width: 100vw;
}

.hero {
  height: 813px;
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
  margin-top: 60px;
}

.hero-content-wrapper {
  position: relative;
  width: 100%;
  margin: 0 auto;
}

.video-frame {
  position: relative;
  width: 54vw;
  height: 0;
  padding-bottom: 60vw;
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
  width: 17vw;
  height: auto;
  aspect-ratio: 116 / 56;
  position: absolute;
  left: 14%;
  top: 21vw;
}

.logo_kudaku {
  width: 11vw;
  height: auto;
  position: absolute;
  top: 30px;
  left: 88%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

.play-concept {
  position: absolute;
  bottom: 3%;
  left: 9%;
  width: 121px;
  height: 43px;
}

.content-wrapper1 {
  position: relative;
  z-index: 2;
  transform-style: preserve-3d;
  margin-top: -20px;
  height: 2110px;
}

.content-wrapper2 {
  position: relative;
  z-index: 2;
  transform-style: preserve-3d;
  height: 1400px;
}

.content-wrapper3 {
  position: relative;
  z-index: 2;
  transform-style: preserve-3d;
}

.overlap-10 {
  height: 1700px;
  width: 100vw;
  position: relative;
}

.frame-4 {
  height: 1700px;
  left: 0;
  position: absolute;
  width: 100vw;
  object-fit: cover;
}

.element-7 {
  position: absolute;
  height: 151px;
  width: 97vw;
  top: 38%;
  right: 0;
}

.where-we-are-content {
  color: #ffffff;
  font-size: 26vw;
  right: 0;
  line-height: 0;
  position: absolute;
  top: 20%;
}

.span {
  font-family: nautica, sans-serif;
  font-size: 26vw;
  font-style: normal;
  font-weight: 500;
}

.where-we-are-text {
  font-family: ivyora-display, sans-serif;
  font-style: normal;
  font-size: 100px;
  letter-spacing: 6px;
  line-height: 115%;
}
.weight-400 {
  font-weight: 400;
}

.margin-we {
  margin-left: 36px;
}

.lineHeight {
  line-height: 1.4;
}

.text-wrapper-14 {
  color: #ffffff;
  font-family: 'Zen Kaku Gothic New', serif;
  font-weight: 500;
  font-style: normal;
  font-size: 4.1vw;
  left: 0;
  letter-spacing: -3px;
  line-height: 140%;
  position: absolute;
  width: 96vw;
  top: 55%;
}
.logo_red {
  color: red;
  right: 20%;
  position: absolute;
  width: 8vw;
  top: 34%;
}

.frame-5 {
  background-image: url(@/assets/img/letstalk_bg_sp.png);
  background-position: 50% 50%;
  background-size: cover;
  height: 100vh;
  width: 100vw;
}

.overlap-11 {
  height: 180px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}

.vector-2 {
  width: 64vw;
  height: 46vw;
  position: absolute;
  left: 10%;
}

.group-8 {
  height: 162px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}

.overlap-group-4 {
  height: 178px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}

.letsTalk-text {
  position: absolute;
  width: 360.497px;
  height: 512.714px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  cursor: pointer;
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
  font-size: 6vw;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  letter-spacing: 1px;
  line-height: 24px;
  text-align: center;
  white-space: nowrap;
  margin-bottom: 5px;
}

.frame-6 {
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  gap: 12px;
  right: 0;
  padding: 0 7px;
  position: fixed;
  top: 5vw;
  width: 30vw;
  z-index: 20;
}

.frame-6-text {
  color: #ffffff;
  font-family: ivyora-display, sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: max(calc(7vw - 12px), 12px);
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
  font-size: max(calc(7vw - 12px), 12px);
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

/* SP用に追加した要素のスタイル */
@media screen and (max-width: 768px) {
  .KU {
    width: 86vw;
    top: -75%;
  }

  .DA {
    width: 39vw;
    top: calc(58vw + 14px);
  }

  .KU2 {
    width: 63vw;
    top: calc(53vw + 17px);
  }

  .logo_kudaku {
    width: 11vw;
  }
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
  width: 60vw;
  height: 20vw;
  margin-bottom: 1vw;
}
.copy-button-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.copy-button {
  width: 95.867px;
  height: 108.33px;
  cursor: pointer;
  transition: transform 0.2s;
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
  width: 18vw;
  height: 18vw;
}
</style>
