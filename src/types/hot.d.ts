import type { GoodsItem, PageResult } from './global'

export type subTypeItem = {
  // id
  id: string
  // 导航标题
  title: string
  // 商品类型
  goodsItems: PageResult<GoodsItem>
}
export type HotResult = {
  // 导航图片
  bannerPicture: string
  // id
  id: strings
  // 子选项
  subTypes: Sub
  // 标题
  title: string
}
