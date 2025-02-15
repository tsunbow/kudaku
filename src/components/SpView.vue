<!-- SpView.vue -->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import video from '@/assets/img/main_img.png'
import KU from '@/assets/img/KU1.svg'
import DA from '@/assets/img/DA.svg'
import KU2 from '@/assets/img/KU2.svg'
import creativeArea from '@/assets/img/creative-area.svg'
import bg from '@/assets/img/bg.png'
import logo_top from '@/assets/img/logo_top.svg'
import logo_red from '@/assets/img/logo_red.svg'
import layer from '@/assets/img/layer.png'
import vector from '@/assets/img/vector.png'

// import MouseFollower from '@/components/MouseFollower.vue'
import BlurElement from '@/components/BlurElement.vue'
import ScrollRevealDescription from '@/components/ScrollRevealDescription.vue'
import ScrollRevealSection from '@/components/ScrollRevealSection.vue'
import BlurLogo from '@/components/BlurLogo.vue'
import RevealLogo from '@/components/RevealLogo.vue'

const menuOpen = ref(false)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}
</script>

<template>
  <div class="sp">
    <!-- ハンバーガーメニュー -->
    <button class="menu-button" @click="toggleMenu">
      <div class="menu-icon" :class="{ 'is-open': menuOpen }">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </button>

    <!-- メニュー内容 -->
    <div class="menu-content" :class="{ 'is-open': menuOpen }">
      <div class="menu-items">
        <div class="menu-item">Statement</div>
        <div class="menu-item">Where We Are</div>
        <div class="menu-item menu-item-gray">Our Projects</div>
        <div class="menu-item">Let's Talk</div>
        <div class="menu-item">Play Concept</div>
      </div>
    </div>

    <div class="hero">
      <div class="hero-body">
        <div class="hero-content-wrapper">
          <div class="video-frame">
            <img class="trim" :src="video" alt="Trim" />
            <div class="logo_kudaku">
              <BlurLogo class="group" :logoSrc="logo_top" />
            </div>
          </div>
          <BlurElement class="KU sp-KU" :src="KU" alt="Ku" />
          <BlurElement class="DA sp-DA" :src="DA" alt="Da" />
          <BlurElement class="KU2 sp-KU2" :src="KU2" alt="Ku" />
          <BlurElement
            class="creative-area sp-creative-area"
            :src="creativeArea"
            alt="Creative area"
          />
        </div>
      </div>

      <div class="hero-play">
        <div class="movie-play">
          <div class="ellipse">
            <img class="vector" alt="Vector" :src="vector" />
          </div>
          <div class="text-wrapper">Play Concept</div>
        </div>
      </div>
    </div>

    <div class="content-wrapper">
      <ScrollRevealSection>
        <template #text>
          <ScrollRevealDescription />
        </template>
      </ScrollRevealSection>

      <div class="overlap-10">
        <img class="frame-4" alt="Frame" :src="bg" />
        <img class="element-7" alt="Element" :src="layer" />

        <p class="where-we-are-content">
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

        <div class="text-wrapper-14">
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

        <div class="logo_red">
          <RevealLogo class="group-7" :logoSrc="logo_red" :initialBlur="10" :triggerOffset="3000" />
        </div>
      </div>

      <div class="frame-5">
        <div class="overlap-11">
          <img class="vector-2" alt="Vector" :src="vector" />
          <div class="group-8">
            <div class="overlap-group-4">
              <div class="letsTalk-content">
                <span>L</span>
                <span class="letsTalk-text style-normal spacing-0">e</span>
                <span class="letsTalk-text style-normal spacing-lets">t</span>
                <span class="letsTalk-text spacing-comma">'</span>
                <span class="letsTalk-text style-normal spacing-0">s </span>
                <span class="style-italic spacing-t">T</span>
                <span class="letsTalk-text style-normal spacing-0">alk</span>
                <div class="ellipse-2" />
              </div>
            </div>
          </div>
        </div>
        <div class="element-KUDAKU">©2025&nbsp;&nbsp;KUDAKU</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sp {
  background-position: 50% 50%;
  background-size: cover;
  position: relative;
  width: 100vw;
  overflow-x: hidden;
}

/* ハンバーガーメニュー */
.menu-button {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 100;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
}

.menu-icon {
  width: 30px;
  height: 20px;
  position: relative;
}

.menu-icon span {
  display: block;
  position: absolute;
  height: 2px;
  width: 100%;
  background: #ffffff;
  transition: all 0.3s ease;
}

.menu-icon span:nth-child(1) {
  top: 0;
}
.menu-icon span:nth-child(2) {
  top: 9px;
}
.menu-icon span:nth-child(3) {
  top: 18px;
}

.menu-icon.is-open span:nth-child(1) {
  transform: rotate(45deg);
  top: 9px;
}

.menu-icon.is-open span:nth-child(2) {
  opacity: 0;
}

.menu-icon.is-open span:nth-child(3) {
  transform: rotate(-45deg);
  top: 9px;
}

/* メニュー内容 */
.menu-content {
  position: fixed;
  top: 0;
  right: -100%;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.9);
  z-index: 90;
  transition: right 0.3s ease;
}

.menu-content.is-open {
  right: 0;
}

.menu-items {
  padding: 80px 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.menu-item {
  color: #ffffff;
  font-family: ivyora-display, sans-serif;
  font-size: 24px;
  text-align: center;
}

.menu-item-gray {
  color: rgba(255, 255, 255, 0.5);
}

/* ヒーローセクション */
.hero {
  height: 100vh;
  position: relative;
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
}

.hero-content-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;
}

.video-frame {
  position: relative;
  width: 90vw;
  margin: 0 auto;
  margin-top: 20vh;
}

.trim {
  width: 100%;
  height: auto;
  aspect-ratio: 664 / 498;
  object-fit: cover;
}

/* スマートフォン用の位置調整 */
.sp-KU {
  width: 80vw;
  top: 10vh;
  left: -10vw;
}

.sp-DA {
  width: 50vw;
  top: 40vh;
  left: -5vw;
}

.sp-KU2 {
  width: 70vw;
  top: 45vh;
  right: -10vw;
}

.sp-creative-area {
  width: 20vw;
  right: 5vw;
  top: 15vh;
}

.logo_kudaku {
  width: 15vw;
  position: absolute;
  top: 50%;
  left: 52%;
  transform: translate(-50%, -50%);
}

/* コンテンツセクション */
.content-wrapper {
  position: relative;
  margin-top: 150px;
  z-index: 2;
}

/* Where We Are セクション */
.where-we-are-content {
  font-size: 15vw;
  line-height: 1.2;
  margin-top: 50px;
}

.text-wrapper-14 {
  font-size: 14px;
  line-height: 1.8;
  width: 85vw;
  margin: 30px auto;
}

/* Let's Talk セクション */
.frame-5 {
  margin-top: 100px;
  padding: 50px 0;
}

.letsTalk-content {
  font-size: 12vw;
  text-align: center;
}

.element-KUDAKU {
  font-size: 16px;
  margin-top: 50px;
}

/* その他のスタイル調整は既存のものを継承 */
</style>
