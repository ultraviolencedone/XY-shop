import type { GoodsItem } from './global'

/** 首页-广告区域数据类型 */
export type BannerItem = {
  /** 跳转链接 */
  hrefUrl: string
  /** id */
  id: string
  /** 图片链接 */
  imgUrl: string
  /** 跳转类型 */
  type: number
}
/** 首页-前台分类数据类型 */
export type CategoryItem = {
  // 图标url
  icon: string
  // id
  id: string
  // 分类名称
  name: string
}
/** 首页-热门推荐数据类型 */
export type HotItem = {
  // 商品描述
  alt: string
  // 商品id
  id: string
  // 商品图片
  pictures: string[]
  // 商品名称
  title: string
  // 商品类型
  type: number
}
/** 猜你喜欢数据类型 */
export type GuessItem = GoodsItem
