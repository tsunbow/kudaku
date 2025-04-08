// 共通アセット（Common Assets）
// ビデオアセット
import trim from '@/assets/video/trim.mp4'
import noise from '@/assets/video/noise.mp4'

// Lottieアニメーション
import KU_JSON from '@/assets/lottie/KU1.json'
import DA_JSON from '@/assets/lottie/DA.json'
import KU2_JSON from '@/assets/lottie/KU2.json'
import LINE_JSON from '@/assets/lottie/line.json'

// 共通画像アセット
import logo_top from '@/assets/img/logo_top.svg'
import logo_red from '@/assets/img/logo_red.svg'
import vector from '@/assets/img/vector.png'
import email_text from '@/assets/img/email_text.svg'
import copy_button from '@/assets/img/copy_button.svg'
import close_btn from '@/assets/img/close_button.svg'
import creativeArea from '@/assets/img/creative-area.svg'

// PC専用アセット
import play_concept from '@/assets/img/play_concept_pc.svg'
import circle_hover from '@/assets/lottie/talk_hover.json'
import circle_hover_out from '@/assets/lottie/talk_hover_out.json'

// SP専用アセット
import lets_talk_sp from '@/assets/img/letstalk_sp.svg'
import play_concept_sp from '@/assets/img/play_concept_sp.svg'

// 共通アセットのエクスポート
export const CommonAssets = {
  trim,
  noise,
  KU_JSON,
  DA_JSON,
  KU2_JSON,
  LINE_JSON,
  logo_top,
  logo_red,
  vector,
  email_text,
  copy_button,
  close_btn,
  creativeArea,
}

// PC用アセットのエクスポート
export const PCAssets = {
  play_concept: play_concept,
  circle_hover: circle_hover,
  circle_hover_out: circle_hover_out,
}

// SP用アセットのエクスポート
export const SPAssets = {
  lets_talk: lets_talk_sp,
  play_concept: play_concept_sp,
}
