<script setup>
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

import MouseFollower from '@/components/MouseFollower.vue'
// import TextRevealAnimation from '@/components/TextRevealAnimation.vue'
import BlurElement from '@/components/BlurElement.vue'
import ScrollRevealDescription from '@/components/ScrollRevealDescription.vue'
import ScrollRevealSection from '@/components/ScrollRevealSection.vue'
import BlurLogo from '@/components/BlurLogo.vue'
import RevealLogo from '@/components/RevealLogo.vue'
</script>

<template>
  <MouseFollower />
  <div class="pc">
    <div class="hero">
      <div class="hero-body">
        <div class="hero-content-wrapper">
          <div class="video-frame">
            <img class="trim" :src="video" alt="Trim" />
            <div class="logo_kudaku">
              <BlurLogo class="group" :logoSrc="logo_top" />
            </div>
          </div>
          <BlurElement class="KU" :src="KU" alt="Ku" />
          <BlurElement class="DA" :src="DA" alt="Da" />
          <BlurElement class="KU2" :src="KU2" alt="Ku" />
          <BlurElement class="creative-area" :src="creativeArea" alt="Creative area" />
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
      <div class="frame-6">
        <div class="frame-6-text">Statement</div>

        <div class="frame-6-text">Where We Are</div>

        <div class="frame-7">
          <div class="frame-6-text frame-6-text-gray">Our Projects</div>
        </div>

        <div class="frame-6-text">Let’s Talk</div>

        <div class="frame-6-text">Play Concept</div>
      </div>
    </div>

    <div class="content-wrapper">
      <ScrollRevealSection>
        <template #text>
          <!-- ここにテキストコンテンツを配置 -->
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
                <span class="letsTalk-text spacing-comma">’</span>
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

<style>
@import url('https://use.typekit.net/jnv8yhd.css');
@import url('https://use.typekit.net/azb1dqq.css');
@import url('https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@500&family=Zen+Old+Mincho&display=swap');

.pc {
  background-position: 50% 50%;
  background-size: cover;
  height: 6031px;
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
  margin-top: 10vw;
}

/* コンテンツを包むラッパーを追加 */
.hero-content-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;
}

.video-frame {
  position: relative;
  width: 46vw; /* 664pxを画面幅に対する割合に変更 */
  margin: 0 auto;
}

.trim {
  width: 100%;
  height: auto;
  aspect-ratio: 664 / 498; /* 元の縦横比を維持 */
  object-fit: cover;
}

.KU {
  width: 36vw; /* 517pxを相対値に */
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
  width: 31.2vw; /* 449pxを相対値に */
  height: auto;
  aspect-ratio: 449 / 360;
  position: absolute;
  right: 0;
  top: calc(16vw + 22px);
}

.creative-area {
  width: 8vw; /* 116pxを相対値に */
  height: auto;
  aspect-ratio: 116 / 56;
  position: absolute;
  right: 20%;
  top: 5vw;
}
.logo_kudaku {
  width: 4.5vw; /* 132pxを相対値に */
  height: auto;
  position: absolute;
  top: 50%;
  left: 52%;
  transform: translate(-50%, -50%);
}
.group {
}

.content-wrapper {
  position: relative;
  margin-top: 150px;
  z-index: 2;
  transform-style: preserve-3d;
}

.movie-play {
  width: 92px;
  height: 108px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 330px;
  margin: auto;
}

.ellipse {
  width: 90px;
  height: 90px;
  border: 1px solid #d9d9d9;
  border-radius: 45px;
  position: relative;
}

.vector {
  width: 25px;
  height: 22px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}

.text-wrapper {
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

.overlap-10 {
  height: 1440px;
  left: 0;
  position: absolute;
  top: 2800px;
  width: 100vw;
}

.frame-4 {
  height: 1800px;
  left: 0;
  position: absolute;
  top: 0;
  width: 100vw;
  opacity: 0.9;
}

.element-7 {
  height: 400px;
  right: 0;
  position: absolute;
  top: 70%;
  width: 70vw;
}

.where-we-are-content {
  color: #ffffff;
  font-size: 26vw;
  right: 4%;
  line-height: 0;
  position: absolute;
  top: 597px;
}

.span {
  font-family: nautica, sans-serif;
  font-size: 26vw;
  font-style: normal;
  font-weight: 500;
  letter-spacing: -50px;
}

.where-we-are-text {
  font-family: ivyora-display, sans-serif;
  font-style: normal;
  font-size: 220px;
  letter-spacing: 14.52px;
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
  font-size: 16px;
  left: 16%;
  letter-spacing: -1.6px;
  line-height: 30.4px;
  position: absolute;
  top: 59%;
  width: 50vw;
}
.logo_red {
  color: red;
  right: 11%;
  position: absolute;
  top: 927px;
  width: 4.5vw;
}

.frame-5 {
  background-image: url(@/assets/img/2-9.png);
  background-position: 50% 50%;
  background-size: cover;
  height: 876px;
  left: 0;
  position: absolute;
  top: 5155px;
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
  width: 249px;
  height: 180px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}

.group-8 {
  width: 510px;
  height: 162px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}

.overlap-group-4 {
  width: 503px;
  height: 178px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}

.letsTalk-content {
  color: #ff0000;
  font-family: nautica, sans-serif;
  font-weight: 500;
  font-style: normal;
  font-size: 11vw;
  line-height: 185px;
  text-align: center;
  white-space: nowrap;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}

.letsTalk-text {
  font-size: 8vw;
  line-height: 131.4px;
}

.style-normal {
  font-family: ivyora-display, sans-serif;
  font-weight: 400;
  font-style: normal;
}

.style-italic {
  font-family: ivyora-display, sans-serif;
  font-weight: 400;
  font-style: italic;
}

.spacing-0 {
  letter-spacing: 0;
}

.spacing-comma {
  letter-spacing: 13.05px;
}

.spacing-lets {
  letter-spacing: -37.86px;
}

.spacing-t {
  letter-spacing: -44px;
}

.ellipse-2 {
  width: 406px;
  height: 150px;
  border: 1px solid #ff0000;
  border-radius: 203px / 89px;
  transform: matrix(1, 0, -0.7, 0.87, 0, 0);
  position: absolute;
  top: 65px;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
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

.rectangle {
  background-color: #ff0000;
  height: 3px;
  left: 145px;
  position: absolute;
  top: 99px;
  width: 75px;
}
</style>
