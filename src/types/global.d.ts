/** 通用分页结果类型 */
export type PageResult<T> = {
  /** 总条数 */
  counts: number
  /** 每页条数 */
  pageSize: number
  /** 总页数 */
  pages: number
  /** 页码 */
  page: number
  /** 数据 */
  items: T[]
}
/** 通用分页参数类型 */
export type PageParams = {
  /** 页码默认值1 */
  page: number
  /** 每页条数默认是10 */
  pageSize: number
}
/** 通用商品类型 */
export type GoodsItem = {
  // 商品描述
  desc: string
  // 商品id
  id: string
  // 商品名称
  name: string
  // 商品已下单数量
  orderNum: number
  // 商品图片
  picture: string
  // 商品价格
  price: number
  // 商品折扣
  discount: number
}
