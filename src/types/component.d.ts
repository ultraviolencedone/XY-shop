import XySwiper from '@/components/XySwiper.vue'
import XyGuess from '@/components/XyGuess.vue'
declare module 'vue' {
  export interface GlobalComponents {
    XySwiper: typeof XySwiper
    XyGuess: typeof XyGuess
  }
}
// 组件实例类型
export type XyGuessInstance = InstanceType<typeof XyGuess>
export type XySwiperInstance = InstanceType<typeof XySwiper>
