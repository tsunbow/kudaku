<script setup>
import video from '@/assets/img/main_img.png'
import KU from '@/assets/img/KU1.svg'
import DA from '@/assets/img/DA.svg'
import KU2 from '@/assets/img/KU2.svg'
import creativeArea from '@/assets/img/creative-area.svg'
import bg from '@/assets/img/bg.png'
import logo_top from '@/assets/img/logo_top.svg'
import logo_red from '@/assets/img/logo_red.svg'
import x19 from '@/assets/img/1-9.png'
import layer from '@/assets/img/layer.png'
import x41 from '@/assets/img/4-1.png'
import x271 from '@/assets/img/27-1.png'
import x281 from '@/assets/img/28-1.png'
import x631 from '@/assets/img/63-1.png'
import x701 from '@/assets/img/70-1.png'
import vector from '@/assets/img/vector.png'

import MouseFollower from '@/components/MouseFollower.vue'
// import TextRevealAnimation from '@/components/TextRevealAnimation.vue'
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
        <div class="video-frame">
          <img class="trim" alt="Trim" :src="video" />
        </div>
        <img class="KU" alt="Ku" :src="KU" />
        <img class="DA" alt="Da" :src="DA" />
        <img class="KU2" alt="Ku" :src="KU2" />
        <img class="creative-area" alt="Creative area" :src="creativeArea" />
      </div>
      <div class="frame-6">
        <div class="frame-6-text">Statement</div>

        <div class="frame-6-text">Where We Are</div>

        <div class="frame-7">
          <div class="frame-6-text">Our Projects</div>
        </div>

        <div class="frame-6-text">Let’s Talk</div>

        <div class="frame-6-text">Play Concept</div>

        <div class="rectangle" />
      </div>
    </div>

    <div class="hero-play">
      <BlurLogo class="group" :logoSrc="logo_top" />
      <div class="movie-play">
        <div class="ellipse">
          <img class="vector" alt="Vector" :src="vector" />
        </div>
        <div class="text-wrapper">Play Concept</div>
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
          プロデューサー、映像作家、アートディレクター、写真家、空間デザイナーなどが交わり
          <br />
          クライアントとの自由な発想とコラボレーションで
          <br />
          心と人を動かすアウトプットを産み、愛されるブランドを育む。
        </div>

        <RevealLogo class="group-7" :logoSrc="logo_red" :initialBlur="10" :triggerOffset="3000" />
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
  /* background-image: url(./assets/img/noise.jpg); */
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
  height: 631px;
  top: 165px;
  z-index: 1;
}

.hero-play {
  position: absolute;
  width: 100%;
  height: 631px;
  top: 165px;
  z-index: 2;
}

.video-frame {
  align-items: flex-start;
  display: inline-flex;
  flex-direction: column;
  gap: 10px;
  left: 388px;
  position: absolute;
  top: 24px;
}

.trim {
  width: 664px;
  height: 498px;
  object-fit: cover;
  position: relative;
}

.KU {
  width: 517px;
  height: 379px;
  left: 0;
  position: absolute;
  top: 0;
}

.DA {
  width: 287px;
  height: 224px;
  position: absolute;
  left: 0;
  top: 297px;
}

.KU2 {
  width: 449px;
  height: 360px;
  position: absolute;
  left: 991px;
  top: 271px;
}

.creative-area {
  width: 116px;
  height: 56px;
  position: absolute;
  left: 1046px;
  top: 96px;
}

.group {
  height: 132px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}

.content-wrapper {
  position: relative;
  margin-top: 150px;
  z-index: 2;
  transform-style: preserve-3d;
}

.element {
  height: 447px;
  left: 1017px;
  object-fit: cover;
  position: absolute;
  top: 1175px;
  width: 295px;
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

.element-2 {
  height: 331px;
  left: 720px;
  object-fit: cover;
  position: absolute;
  top: 2168px;
  width: 510px;
}

.element-3 {
  height: 225px;
  left: 1138px;
  object-fit: cover;
  position: absolute;
  top: 2083px;
  width: 302px;
}

.element-4 {
  height: 299px;
  left: 289px;
  object-fit: cover;
  position: absolute;
  top: 1784px;
  width: 252px;
}

.element-5 {
  height: 403px;
  left: 176px;
  object-fit: cover;
  position: absolute;
  top: 2398px;
  width: 277px;
}

.element-6 {
  height: 528px;
  left: 555px;
  object-fit: cover;
  position: absolute;
  top: 2752px;
  width: 611px;
}

.overlap-10 {
  height: 1440px;
  left: 0;
  position: absolute;
  top: 3341px;
  width: 100vw;
}

.frame-4 {
  height: 2160px;
  left: 0;
  position: absolute;
  top: 0;
  width: 100vw;
  opacity: 0.9;
}

.element-7 {
  height: 400px;
  left: 434px;
  position: absolute;
  top: 1040px;
  width: 1006px;
}

.where-we-are-content {
  color: #ffffff;
  font-size: 255.4px;
  left: 676px;
  line-height: 0;
  position: absolute;
  top: 597px;
}

.span {
  font-family: nautica, sans-serif;
  font-size: 255.4px;
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
  left: 340px;
  letter-spacing: -1.6px;
  line-height: 30.4px;
  position: absolute;
  top: 867px;
  width: 715px;
}

.group-7 {
  color: red;
  height: 162px;
  left: 1163px;
  position: absolute;
  top: 927px;
  width: 72px;
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
  font-size: 160.9px;
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
  font-size: 114.3px;
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
  font-size: 32px;
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
  left: 1166px;
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
  font-size: 18px;
  letter-spacing: 0.54px;
  line-height: 20.7px;
  position: relative;
  text-align: center;
  white-space: nowrap;
  width: fit-content;
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
